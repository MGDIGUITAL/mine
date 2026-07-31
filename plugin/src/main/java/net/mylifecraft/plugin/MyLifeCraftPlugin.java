package net.mylifecraft.plugin;

import net.mylifecraft.plugin.commands.MyLifeCraftCommand;
import net.mylifecraft.plugin.delivery.DeliveryManager;
import net.mylifecraft.plugin.delivery.DeliveryTask;
import net.mylifecraft.plugin.delivery.GrantExpiryTask;
import net.mylifecraft.plugin.listeners.PlayerJoinListener;
import org.bukkit.plugin.java.JavaPlugin;

/**
 * MyLifeCraft Plugin — Clase Principal
 *
 * Automatiza la entrega de productos comprados en la tienda web.
 * Se comunica con Supabase via REST API para obtener pedidos pendientes
 * y ejecuta los comandos correspondientes en el servidor.
 */
public final class MyLifeCraftPlugin extends JavaPlugin {

    private static MyLifeCraftPlugin instance;
    private DeliveryManager deliveryManager;

    @Override
    public void onEnable() {
        instance = this;

        // Guardar configuración por defecto si no existe
        saveDefaultConfig();

        // Validar que la service_key esté configurada
        String serviceKey = getConfig().getString("supabase.service_key", "");
        if (serviceKey.isEmpty() || serviceKey.equals("PEGAR_AQUI_TU_SERVICE_ROLE_KEY")) {
            getLogger().severe("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            getLogger().severe("⚠️  MyLifeCraft Plugin - CONFIGURACIÓN REQUERIDA");
            getLogger().severe("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            getLogger().severe("Debes configurar la 'service_key' de Supabase");
            getLogger().severe("en plugins/MyLifeCraftPlugin/config.yml");
            getLogger().severe("Supabase Dashboard → Project Settings → API → service_role");
            getLogger().severe("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            getServer().getPluginManager().disablePlugin(this);
            return;
        }

        // Inicializar el manager de entregas
        deliveryManager = new DeliveryManager(this);

        // Registrar tareas periódicas
        int checkInterval = getConfig().getInt("delivery.check_interval_seconds", 30);
        long ticks = checkInterval * 20L; // segundos → ticks (20 ticks = 1 segundo)

        new DeliveryTask(this, deliveryManager)
                .runTaskTimerAsynchronously(this, 100L, ticks); // espera 5s al inicio

        new GrantExpiryTask(this, deliveryManager)
                .runTaskTimerAsynchronously(this, 200L, 20L * 60); // cada 1 minuto

        // Registrar listeners
        getServer().getPluginManager().registerEvents(
                new PlayerJoinListener(this, deliveryManager), this
        );

        // Registrar comando /mlc
        getCommand("mlc").setExecutor(new MyLifeCraftCommand(this, deliveryManager));
        getCommand("mlc").setTabCompleter(new MyLifeCraftCommand(this, deliveryManager));

        getLogger().info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        getLogger().info("✅ MyLifeCraft Plugin v" + getDescription().getVersion() + " activado.");
        getLogger().info("   Intervalo de entrega: cada " + checkInterval + " segundos");
        getLogger().info("   Supabase: " + getConfig().getString("supabase.url"));
        getLogger().info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    }

    @Override
    public void onDisable() {
        getLogger().info("MyLifeCraft Plugin desactivado.");
    }

    public static MyLifeCraftPlugin getInstance() {
        return instance;
    }

    public DeliveryManager getDeliveryManager() {
        return deliveryManager;
    }
}
