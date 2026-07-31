package net.mylifecraft.plugin.commands;

import com.google.gson.JsonObject;
import net.mylifecraft.plugin.MyLifeCraftPlugin;
import net.mylifecraft.plugin.delivery.DeliveryManager;
import org.bukkit.Bukkit;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.command.TabCompleter;
import org.bukkit.entity.Player;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Comando /mlc para administración del plugin.
 *
 * Subcomandos:
 *   /mlc status           → Muestra pedidos pendientes totales
 *   /mlc deliver <nick>   → Fuerza la entrega al jugador (debe estar en línea)
 *   /mlc grants <nick>    → Lista los rangos activos de un jugador
 *   /mlc reload           → Recarga config.yml
 *   /mlc check            → Dispara el check manual de pedidos pendientes
 */
public class MyLifeCraftCommand implements CommandExecutor, TabCompleter {

    private final MyLifeCraftPlugin plugin;
    private final DeliveryManager deliveryManager;

    private static final String PREFIX = "§6[§eMyLifeCraft§6] §f";
    private static final String NO_PERM = "§c§l✗ §r§cNo tienes permiso para usar este comando.";

    public MyLifeCraftCommand(MyLifeCraftPlugin plugin, DeliveryManager deliveryManager) {
        this.plugin = plugin;
        this.deliveryManager = deliveryManager;
    }

    @Override
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
        if (!sender.hasPermission("mylifecraft.admin")) {
            sender.sendMessage(NO_PERM);
            return true;
        }

        if (args.length == 0) {
            sendHelp(sender);
            return true;
        }

        switch (args[0].toLowerCase()) {

            case "status" -> {
                sender.sendMessage(PREFIX + "§eBuscando pedidos pendientes en Supabase...");
                Bukkit.getScheduler().runTaskAsynchronously(plugin, () -> {
                    int count = deliveryManager.getPendingCount();
                    sender.sendMessage(PREFIX + "§fPedidos pendientes: §e" + count);
                    if (count == 0) sender.sendMessage(PREFIX + "§a✅ ¡Todo entregado!");
                });
            }

            case "deliver" -> {
                if (args.length < 2) {
                    sender.sendMessage(PREFIX + "§cUso: /mlc deliver <nick>");
                    return true;
                }
                String targetName = args[1];
                Player target = Bukkit.getPlayerExact(targetName);
                if (target == null) {
                    sender.sendMessage(PREFIX + "§c✗ El jugador §e" + targetName + "§c no está en línea.");
                    return true;
                }
                sender.sendMessage(PREFIX + "§fEntregando pedidos pendientes a §e" + targetName + "§f...");
                Bukkit.getScheduler().runTaskAsynchronously(plugin, () -> {
                    int delivered = deliveryManager.forceDeliverPlayer(targetName);
                    if (delivered == 0) {
                        sender.sendMessage(PREFIX + "§e" + targetName + "§f no tiene pedidos pendientes.");
                    } else {
                        sender.sendMessage(PREFIX + "§a✅ §f" + delivered + " entrega(s) procesada(s) para §e" + targetName + "§f.");
                    }
                });
            }

            case "grants" -> {
                if (args.length < 2) {
                    sender.sendMessage(PREFIX + "§cUso: /mlc grants <nick>");
                    return true;
                }
                String targetName = args[1];
                sender.sendMessage(PREFIX + "§fBuscando rangos activos de §e" + targetName + "§f...");
                Bukkit.getScheduler().runTaskAsynchronously(plugin, () -> {
                    List<JsonObject> grants = deliveryManager.getPlayerGrants(targetName);
                    if (grants.isEmpty()) {
                        sender.sendMessage(PREFIX + "§e" + targetName + "§f no tiene rangos activos registrados.");
                        return;
                    }
                    sender.sendMessage(PREFIX + "§eRangos activos de §f" + targetName + "§e:");
                    for (JsonObject grant : grants) {
                        String product = grant.has("product_name") ? grant.get("product_name").getAsString() : "?";
                        String type = grant.has("duration_type") ? grant.get("duration_type").getAsString() : "?";
                        String expires = grant.has("expires_at") && !grant.get("expires_at").isJsonNull()
                                ? grant.get("expires_at").getAsString().substring(0, 10)
                                : "Permanente";
                        sender.sendMessage("  §7• §f" + product + " §8[" + type + "] §7Expira: §e" + expires);
                    }
                });
            }

            case "reload" -> {
                plugin.reloadConfig();
                String msg = plugin.getConfig().getString(
                        "messages.reload_success", "&a✔ &aConfiguración recargada."
                ).replace("&", "§");
                sender.sendMessage(PREFIX + msg);
                plugin.getLogger().info("Configuración recargada por " + sender.getName());
            }

            case "check" -> {
                sender.sendMessage(PREFIX + "§fEjecutando revisión manual de pedidos...");
                Bukkit.getScheduler().runTaskAsynchronously(plugin, () -> {
                    deliveryManager.checkAndDeliverPending();
                    sender.sendMessage(PREFIX + "§a✅ Revisión completada.");
                });
            }

            default -> sendHelp(sender);
        }

        return true;
    }

    private void sendHelp(CommandSender sender) {
        sender.sendMessage("§6§l━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        sender.sendMessage("§e§lMyLifeCraft Plugin §7v" + plugin.getDescription().getVersion());
        sender.sendMessage("§6§l━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        sender.sendMessage("  §e/mlc status         §7→ Pedidos pendientes");
        sender.sendMessage("  §e/mlc deliver §f<nick> §7→ Forzar entrega a jugador");
        sender.sendMessage("  §e/mlc grants §f<nick>  §7→ Ver rangos activos de un jugador");
        sender.sendMessage("  §e/mlc check          §7→ Revisar pedidos ahora");
        sender.sendMessage("  §e/mlc reload         §7→ Recargar configuración");
        sender.sendMessage("§6§l━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    }

    @Override
    public List<String> onTabComplete(CommandSender sender, Command cmd, String alias, String[] args) {
        if (!sender.hasPermission("mylifecraft.admin")) return Collections.emptyList();

        if (args.length == 1) {
            return Arrays.asList("status", "deliver", "grants", "check", "reload")
                    .stream()
                    .filter(s -> s.startsWith(args[0].toLowerCase()))
                    .collect(Collectors.toList());
        }

        if (args.length == 2 && (args[0].equalsIgnoreCase("deliver") || args[0].equalsIgnoreCase("grants"))) {
            return Bukkit.getOnlinePlayers().stream()
                    .map(Player::getName)
                    .filter(name -> name.toLowerCase().startsWith(args[1].toLowerCase()))
                    .collect(Collectors.toList());
        }

        return Collections.emptyList();
    }
}
