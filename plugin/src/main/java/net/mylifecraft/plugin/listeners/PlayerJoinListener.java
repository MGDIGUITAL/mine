package net.mylifecraft.plugin.listeners;

import net.mylifecraft.plugin.MyLifeCraftPlugin;
import net.mylifecraft.plugin.delivery.DeliveryManager;
import org.bukkit.event.EventHandler;
import org.bukkit.event.EventPriority;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;

/**
 * Listener de conexión de jugadores.
 *
 * Cuando un jugador se conecta, consulta Supabase de forma asíncrona
 * para verificar si tiene pedidos pendientes y los entrega de inmediato.
 *
 * Esto resuelve el caso donde el jugador compró pero no estaba
 * conectado al momento del check periódico.
 */
public class PlayerJoinListener implements Listener {

    private final MyLifeCraftPlugin plugin;
    private final DeliveryManager deliveryManager;

    public PlayerJoinListener(MyLifeCraftPlugin plugin, DeliveryManager deliveryManager) {
        this.plugin = plugin;
        this.deliveryManager = deliveryManager;
    }

    @EventHandler(priority = EventPriority.MONITOR)
    public void onPlayerJoin(PlayerJoinEvent event) {
        // Verificación asíncrona para no bloquear el join
        plugin.getServer().getScheduler().runTaskAsynchronously(plugin, () ->
                deliveryManager.checkAndDeliverForPlayer(event.getPlayer())
        );
    }
}
