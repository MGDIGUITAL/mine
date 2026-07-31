package net.mylifecraft.plugin.delivery;

import net.mylifecraft.plugin.MyLifeCraftPlugin;
import org.bukkit.scheduler.BukkitRunnable;

/**
 * Tarea periódica que consulta Supabase cada N segundos
 * buscando pedidos pendientes de entrega.
 *
 * Se ejecuta en un hilo asíncrono para no bloquear el servidor.
 */
public class DeliveryTask extends BukkitRunnable {

    private final MyLifeCraftPlugin plugin;
    private final DeliveryManager deliveryManager;

    public DeliveryTask(MyLifeCraftPlugin plugin, DeliveryManager deliveryManager) {
        this.plugin = plugin;
        this.deliveryManager = deliveryManager;
    }

    @Override
    public void run() {
        try {
            deliveryManager.checkAndDeliverPending();
        } catch (Exception e) {
            plugin.getLogger().severe("Error en DeliveryTask: " + e.getMessage());
        }
    }
}
