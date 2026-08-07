// ==========================================
// MYLIFECRAFT NETWORK — VERCEL SERVERLESS API
// Ruta: /api/orders
// Descripción: Crea y lista pedidos en la cola 'pending_deliveries' de Supabase
// ==========================================

const SUPABASE_URL = process.env.SUPABASE_URL || "https://uohimxtozomctjntemth.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvaGlteHRvem9tY3RqbnRlbXRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMzY4MTcsImV4cCI6MjA1NjgxMjgxN30.T26r2t4hTqLd7qT7-9E4vU88vYvX65V_H_z-k98KkF8";

export default async function handler(req, res) {
  // Configurar cabeceras CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 1. GET: Consultar órdenes por nick o listar todas las órdenes recientes
  if (req.method === 'GET') {
    const { nick, limit = 50 } = req.query;

    try {
      let url = `${SUPABASE_URL}/rest/v1/pending_deliveries?select=*&order=created_at.desc&limit=${limit}`;
      if (nick) {
        url += `&nick=ilike.${encodeURIComponent(nick)}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error en Supabase GET: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return res.status(200).json({
        success: true,
        count: data.length,
        orders: data,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error('Error GET /api/orders:', err);
      return res.status(500).json({
        success: false,
        error: 'No se pudieron consultar los pedidos en Supabase.',
        details: err.message
      });
    }
  }

  // 2. POST: Crear un nuevo pedido en la cola de entregas de Minecraft
  if (req.method === 'POST') {
    try {
      const { nick, product_name, duration_type, category, command } = req.body;

      if (!nick || !product_name) {
        return res.status(400).json({
          success: false,
          error: 'Faltan campos obligatorios: nick y product_name son necesarios.'
        });
      }

      // Generar código de orden seguro ORD-XXXXX
      const orderNumber = 'ORD-' + Math.floor(10000 + Math.random() * 90000);
      let cmd = command;

      // Si no viene comando, inferir según categoría o nombre
      if (!cmd) {
        if (category === 'monedas' || product_name.toLowerCase().includes('monedas')) {
          const match = product_name.match(/([\d,]+)/);
          const amt = match ? match[1].replace(/,/g, '') : '10000';
          cmd = `/eco give ${nick} ${amt}`;
        } else if (category === 'llaves' || product_name.toLowerCase().includes('llave')) {
          cmd = `/crate key give ${nick} infierno 10`;
        } else {
          // Asumir Rango VIP / MVP / ELITE / LEYENDA
          const lower = product_name.toLowerCase();
          let rank = 'vip';
          if (lower.includes('mvp')) rank = 'mvp';
          if (lower.includes('elite')) rank = 'elite';
          if (lower.includes('leyenda')) rank = 'leyenda';
          if (lower.includes('ultra')) rank = 'ultra';
          cmd = `/lp user ${nick} parent set ${rank}`;
        }
      }

      const newDelivery = {
        order_number: orderNumber,
        nick: nick,
        product_name: product_name,
        duration_type: duration_type || 'permanent',
        category: category || 'rango',
        command_to_execute: cmd,
        status: 'pending',
        created_at: new Date().toISOString()
      };

      const response = await fetch(`${SUPABASE_URL}/rest/v1/pending_deliveries`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(newDelivery)
      });

      if (!response.ok) {
        throw new Error(`Error en Supabase POST: ${response.status} ${response.statusText}`);
      }

      const inserted = await response.json();
      return res.status(201).json({
        success: true,
        message: '¡Pedido registrado con éxito en la cola de Minecraft!',
        order: inserted[0] || newDelivery
      });
    } catch (err) {
      console.error('Error POST /api/orders:', err);
      return res.status(500).json({
        success: false,
        error: 'No se pudo crear el pedido en el backend de Supabase.',
        details: err.message
      });
    }
  }

  return res.status(405).json({ error: 'Método HTTP no permitido. Usa GET o POST.' });
}
