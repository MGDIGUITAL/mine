/**
 * AETHERCRAFT NETWORK - CLIENTE Y CONECTOR DE SUPABASE (FRONTEND)
 * Implementa consulta en tiempo real o fallback local si no se han configurado las claves.
 * Requiere importar el SDK de Supabase por CDN o bundler en entornos de producción.
 */

const SUPABASE_CONFIG = {
  url: 'https://yuesvfqiuxnphrqvwkll.supabase.co',
  anonKey: '' // Pegar aquí o inyectar la clave pública (anon key)
};

let supabaseClient = null;

/**
 * Inicializa el cliente Supabase de manera segura en el navegador
 */
export function initSupabase() {
  if (typeof window !== 'undefined' && window.supabase && SUPABASE_CONFIG.anonKey) {
    try {
      supabaseClient = window.supabase.createClient(
        SUPABASE_CONFIG.url,
        SUPABASE_CONFIG.anonKey
      );
      console.log('✅ Supabase conectado en tiempo real al proyecto yuesvfqiuxnphrqvwkll');
    } catch (error) {
      console.warn('⚠️ No se pudo inicializar Supabase:', error.message);
    }
  }
  return supabaseClient;
}

/**
 * Obtiene el top de jugadores desde la tabla leaderboard_stats con RLS activo
 * @param {string} category - 'kills' | 'economy' | 'time'
 * @returns {Promise<Array>} Lista de estadísticas formateada para renderTable
 */
export async function fetchLeaderboardFromSupabase(category = 'kills') {
  if (!supabaseClient) {
    return null; // Devuelve null para usar los datos de prueba locales (fallback)
  }

  try {
    const { data, error } = await supabaseClient
      .from('leaderboard_stats')
      .select(`
        score_value,
        score_display,
        category,
        season,
        players (
          username,
          clan_tag,
          rank_badge,
          is_online
        )
      `)
      .eq('category', category)
      .eq('season', 4)
      .order('score_value', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error al consultar leaderboard de Supabase:', error.message);
      return null;
    }

    return data.map((item, idx) => ({
      rank: idx + 1,
      name: item.players?.username || 'Anónimo',
      val: item.score_display,
      clan: item.players?.clan_tag || '[SOLO]',
      status: item.players?.is_online ? 'En Línea' : 'Desconectado'
    }));
  } catch (err) {
    console.error('Excepción en fetchLeaderboardFromSupabase:', err);
    return null;
  }
}
