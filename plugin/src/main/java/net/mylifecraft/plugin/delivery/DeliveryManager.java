package net.mylifecraft.plugin.delivery;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import net.mylifecraft.plugin.MyLifeCraftPlugin;
import net.mylifecraft.plugin.api.SupabaseClient;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

/**
 * DeliveryManager — Núcleo de la entrega automática.
 *
 * Se encarga de:
 * 1. Consultar pedidos pendientes en Supabase
 * 2. Ejecutar comandos en el servidor para cada producto
 * 3. Marcar entregas como completadas
 * 4. Registrar rangos con expiración (mensual/permanente)
 * 5. Revocar rangos expirados
 */
public class DeliveryManager {

    private final MyLifeCraftPlugin plugin;
    private final SupabaseClient supabase;

    public DeliveryManager(MyLifeCraftPlugin plugin) {
        this.plugin = plugin;
        this.supabase = new SupabaseClient(plugin);
    }

    // ─────────────────────────────────────────────
    // CONSULTA Y ENTREGA DE PEDIDOS PENDIENTES
    // ─────────────────────────────────────────────

    /**
     * Busca en Supabase pedidos con status='pending' e intenta entregarlos.
     * Se llama desde DeliveryTask (hilo asíncrono).
     */
    public void checkAndDeliverPending() {
        List<JsonObject> pending = supabase.fetchRows(
                "pending_deliveries",
                "status=eq.pending&order=created_at.asc"
        );

        if (!pending.isEmpty()) {
            plugin.getLogger().info("📦 " + pending.size() + " entrega(s) pendiente(s) encontrada(s).");
        }

        for (JsonObject delivery : pending) {
            String deliveryId = delivery.get("id").getAsString();
            String username = delivery.get("minecraft_username").getAsString();
            int attempts = delivery.has("attempts") && !delivery.get("attempts").isJsonNull()
                    ? delivery.get("attempts").getAsInt() : 0;
            int maxAttempts = plugin.getConfig().getInt("delivery.max_attempts", 5);

            if (attempts >= maxAttempts) {
                markAsFailed(deliveryId, "Máximo de intentos alcanzado (" + maxAttempts + ")");
                continue;
            }

            // Incrementar intentos
            JsonObject attemptsUpdate = new JsonObject();
            attemptsUpdate.addProperty("attempts", attempts + 1);
            supabase.patchRow("pending_deliveries", "id=eq." + deliveryId, attemptsUpdate);

            Player onlinePlayer = Bukkit.getPlayerExact(username);
            if (onlinePlayer != null && onlinePlayer.isOnline()) {
                // Jugador en línea → entrega inmediata
                deliver(delivery, onlinePlayer);
            }
            // Si no está en línea, la entrega quedará pendiente hasta que se conecte
        }
    }

    /**
     * Verifica y entrega pedidos pendientes para un jugador específico.
     * Se llama desde PlayerJoinListener cuando un jugador se conecta.
     */
    public void checkAndDeliverForPlayer(Player player) {
        String username = player.getName();

        List<JsonObject> pending = supabase.fetchRows(
                "pending_deliveries",
                "status=eq.pending&minecraft_username=eq." + username
        );

        if (pending.isEmpty()) return;

        boolean notifyPlayer = plugin.getConfig().getBoolean("delivery.notify_player", true);
        if (notifyPlayer && pending.size() > 0) {
            String welcomeMsg = plugin.getConfig().getString(
                    "messages.delivery_welcome",
                    "&6🎁 &fTienes &e{count}&f entrega(s) pendiente(s). ¡Se entregarán ahora!"
            ).replace("{count}", String.valueOf(pending.size()));
            player.sendMessage(colorize(welcomeMsg));
        }

        // Pequeño delay para que el jugador termine de cargar chunks
        Bukkit.getScheduler().runTaskLater(plugin, () -> {
            for (JsonObject delivery : pending) {
                deliver(delivery, player);
            }
        }, 60L); // 3 segundos de delay
    }

    // ─────────────────────────────────────────────
    // ENTREGA INDIVIDUAL
    // ─────────────────────────────────────────────

    /**
     * Ejecuta los comandos de un pedido para el jugador dado.
     * Siempre se ejecuta en el hilo principal de Bukkit (thread-safe).
     */
    private void deliver(JsonObject delivery, Player player) {
        String deliveryId = delivery.get("id").getAsString();
        String productName = delivery.get("product_name").getAsString();
        String durationType = delivery.has("duration_type") && !delivery.get("duration_type").isJsonNull()
                ? delivery.get("duration_type").getAsString() : "permanent";

        JsonArray commands = delivery.has("commands") && !delivery.get("commands").isJsonNull()
                ? delivery.get("commands").getAsJsonArray()
                : new JsonArray();

        plugin.getLogger().info("▶ Entregando '" + productName + "' a " + player.getName()
                + " [" + durationType + "]");

        // Ejecutar comandos en el hilo principal
        Bukkit.getScheduler().runTask(plugin, () -> {
            for (int i = 0; i < commands.size(); i++) {
                String cmd = commands.get(i).getAsString()
                        .replace("{player}", player.getName())
                        .replace("{uuid}", player.getUniqueId().toString());

                // Quitar la barra inicial si viene incluida
                if (cmd.startsWith("/")) cmd = cmd.substring(1);

                boolean success = Bukkit.dispatchCommand(Bukkit.getConsoleSender(), cmd);
                plugin.getLogger().info("   cmd: /" + cmd + " → " + (success ? "✓" : "✗"));
            }

            // Marcar como entregado en Supabase (asíncrono para no bloquear el hilo principal)
            String finalDeliveryId = deliveryId;
            String finalProductName = productName;
            String finalDurationType = durationType;

            Bukkit.getScheduler().runTaskAsynchronously(plugin, () -> {
                markAsDelivered(finalDeliveryId);
                registerGrant(delivery, player);

                // Notificar al jugador
                if (plugin.getConfig().getBoolean("delivery.notify_player", true)) {
                    String successMsg = plugin.getConfig().getString(
                            "messages.delivery_success",
                            "&a✅ &f¡Tu compra de &e{product}&f ha sido entregada!"
                    ).replace("{product}", finalProductName);

                    Bukkit.getScheduler().runTask(plugin, () ->
                            player.sendMessage(colorize(successMsg))
                    );
                }
            });
        });
    }

    // ─────────────────────────────────────────────
    // REGISTRO DE RANGOS (active_grants)
    // ─────────────────────────────────────────────

    /**
     * Registra el rango entregado en active_grants para rastrear expiración.
     */
    private void registerGrant(JsonObject delivery, Player player) {
        String durationType = delivery.has("duration_type") && !delivery.get("duration_type").isJsonNull()
                ? delivery.get("duration_type").getAsString() : "permanent";

        String expiresAt = null;
        if (!durationType.equals("permanent")) {
            int days = delivery.has("duration_days") && !delivery.get("duration_days").isJsonNull()
                    ? delivery.get("duration_days").getAsInt() : 30;
            expiresAt = Instant.now().plus(days, ChronoUnit.DAYS).toString();
        }

        JsonObject grant = new JsonObject();
        grant.addProperty("delivery_id", delivery.get("id").getAsString());
        grant.addProperty("minecraft_username", player.getName());
        grant.addProperty("product_slug", delivery.has("product_slug") ? delivery.get("product_slug").getAsString() : "unknown");
        grant.addProperty("product_name", delivery.get("product_name").getAsString());
        grant.addProperty("duration_type", durationType);
        grant.add("revoke_commands", delivery.has("revoke_commands") ? delivery.get("revoke_commands") : new JsonArray());
        grant.addProperty("is_active", true);
        if (expiresAt != null) {
            grant.addProperty("expires_at", expiresAt);
        }

        supabase.insertRow("active_grants", grant);
    }

    // ─────────────────────────────────────────────
    // REVOCACIÓN DE RANGOS EXPIRADOS
    // ─────────────────────────────────────────────

    /**
     * Busca rangos expirados en active_grants y los revoca ejecutando
     * los comandos de revocación (ej: /lp user {player} parent remove vip).
     * Se llama desde GrantExpiryTask cada minuto.
     */
    public void revokeExpiredGrants() {
        String now = Instant.now().toString();
        List<JsonObject> expired = supabase.fetchRows(
                "active_grants",
                "is_active=eq.true&expires_at=lt." + now
        );

        for (JsonObject grant : expired) {
            String grantId = grant.get("id").getAsString();
            String username = grant.get("minecraft_username").getAsString();
            String productName = grant.get("product_name").getAsString();

            JsonArray revokeCommands = grant.has("revoke_commands") && !grant.get("revoke_commands").isJsonNull()
                    ? grant.get("revoke_commands").getAsJsonArray()
                    : new JsonArray();

            plugin.getLogger().info("⏰ Rango expirado: '" + productName + "' de " + username + ". Revocando...");

            // Ejecutar comandos de revocación en hilo principal
            Bukkit.getScheduler().runTask(plugin, () -> {
                for (int i = 0; i < revokeCommands.size(); i++) {
                    String cmd = revokeCommands.get(i).getAsString()
                            .replace("{player}", username);
                    if (cmd.startsWith("/")) cmd = cmd.substring(1);
                    Bukkit.dispatchCommand(Bukkit.getConsoleSender(), cmd);
                }

                // Notificar al jugador si está en línea
                Player online = Bukkit.getPlayerExact(username);
                if (online != null && plugin.getConfig().getBoolean("delivery.notify_player", true)) {
                    String msg = plugin.getConfig().getString(
                            "messages.delivery_expired_notify",
                            "&c⏰ &fTu rango &e{product}&c ha expirado. ¡Renuévalo en la tienda!"
                    ).replace("{product}", productName);
                    online.sendMessage(colorize(msg));
                }
            });

            // Marcar como inactivo en Supabase
            JsonObject update = new JsonObject();
            update.addProperty("is_active", false);
            supabase.patchRow("active_grants", "id=eq." + grantId, update);
        }
    }

    // ─────────────────────────────────────────────
    // ENTREGA MANUAL (comando /mlc deliver)
    // ─────────────────────────────────────────────

    /**
     * Fuerza la entrega de todos los pedidos pendientes de un jugador.
     * Usado por admins con /mlc deliver <jugador>.
     */
    public int forceDeliverPlayer(String username) {
        Player player = Bukkit.getPlayerExact(username);
        if (player == null) return -1; // jugador no está en línea

        List<JsonObject> pending = supabase.fetchRows(
                "pending_deliveries",
                "status=eq.pending&minecraft_username=eq." + username
        );

        for (JsonObject delivery : pending) {
            deliver(delivery, player);
        }
        return pending.size();
    }

    /**
     * Retorna el conteo de pedidos pendientes totales.
     */
    public int getPendingCount() {
        return supabase.fetchRows("pending_deliveries", "status=eq.pending").size();
    }

    /**
     * Retorna los active_grants de un jugador específico.
     */
    public List<JsonObject> getPlayerGrants(String username) {
        return supabase.fetchRows("active_grants", "minecraft_username=eq." + username + "&is_active=eq.true");
    }

    // ─────────────────────────────────────────────
    // HELPERS INTERNOS
    // ─────────────────────────────────────────────

    private void markAsDelivered(String deliveryId) {
        JsonObject update = new JsonObject();
        update.addProperty("status", "delivered");
        update.addProperty("delivered_at", Instant.now().toString());
        supabase.patchRow("pending_deliveries", "id=eq." + deliveryId, update);

        // También actualizar la orden madre
        List<JsonObject> delivery = supabase.fetchRows("pending_deliveries", "id=eq." + deliveryId);
        if (!delivery.isEmpty() && delivery.get(0).has("order_id")) {
            String orderId = delivery.get(0).get("order_id").getAsString();
            JsonObject orderUpdate = new JsonObject();
            orderUpdate.addProperty("status", "delivered");
            supabase.patchRow("orders", "id=eq." + orderId, orderUpdate);
        }
    }

    private void markAsFailed(String deliveryId, String reason) {
        plugin.getLogger().warning("✗ Entrega " + deliveryId + " marcada como fallida: " + reason);
        JsonObject update = new JsonObject();
        update.addProperty("status", "failed");
        supabase.patchRow("pending_deliveries", "id=eq." + deliveryId, update);
    }

    /** Convierte códigos de color tipo &a → §a para el chat de Minecraft */
    private String colorize(String text) {
        return text.replace("&", "§");
    }
}
