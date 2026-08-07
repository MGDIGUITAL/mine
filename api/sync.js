// ==========================================
// MYLIFECRAFT NETWORK — VERCEL SERVERLESS API
// Ruta: /api/sync
// Descripción: Endpoint de verificación de salud y sincronización con Supabase para el plugin de Minecraft
// ==========================================

const SUPABASE_URL = process.env.SUPABASE_URL || "https://uohimxtozomctjntemth.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvaGlteHRvem9tY3RqbnRlbXRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMzY4MTcsImV4cCI6MjA1NjgxMjgxN30.T26r2t4hTqLd7qT7-9E4vU88vYvX65V_H_z-k98KkF8";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Verificar conectividad con Supabase consultando conteo de cola
    const response = await fetch(`${SUPABASE_URL}/rest/v1/pending_deliveries?select=status`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error en conexión con Supabase: ${response.status}`);
    }

    const rows = await response.json();
    const pendingCount = rows.filter(r => r.status === 'pending').length;
    const deliveredCount = rows.filter(r => r.status === 'delivered').length;

    return res.status(200).json({
      success: true,
      server: "MyLifeCraft Paper 1.21 Network",
      database_status: "ONLINE",
      sync_time: new Date().toISOString(),
      stats: {
        total_orders: rows.length,
        pending_deliveries: pendingCount,
        delivered_orders: deliveredCount
      }
    });
  } catch (err) {
    console.error('Error GET /api/sync:', err);
    return res.status(500).json({
      success: false,
      server: "MyLifeCraft Paper 1.21 Network",
      database_status: "OFFLINE_OR_UNREACHABLE",
      error: err.message,
      sync_time: new Date().toISOString()
    });
  }
}
