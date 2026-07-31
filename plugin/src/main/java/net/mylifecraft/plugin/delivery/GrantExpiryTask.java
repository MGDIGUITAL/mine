package net.mylifecraft.plugin.delivery;

import net.mylifecraft.plugin.MyLifeCraftPlugin;
import org.bukkit.scheduler.BukkitRunnable;

/**
 * Tarea periódica que revoca rangos/beneficios expirados (mensuales).
 *
 * Se ejecuta cada 60 segundos en hilo asíncrono.
 * Consulta active_grants donde expires_at < NOW() y is_active = true.
 */
public class GrantExpiryTask extends BukkitRunnable {

    private final MyLifeCraftPlugin plugin;
    private final DeliveryManager deliveryManager;

    public GrantExpiryTask(MyLifeCraftPlugin plugin, DeliveryManager deliveryManager) {
        this.plugin = plugin;
        this.deliveryManager = deliveryManager;
    }

    @Override
    public void run() {
        try {
            deliveryManager.revokeExpiredGrants();
        } catch (Exception e) {
            plugin.getLogger().severe("Error en GrantExpiryTask: " + e.getMessage());
        }
    }
}
