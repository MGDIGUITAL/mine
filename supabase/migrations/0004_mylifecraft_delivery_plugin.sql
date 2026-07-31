-- ============================================================================
-- MYLIFECRAFT - MIGRACIÓN 0004: Tablas de Entrega Automática del Plugin
-- ============================================================================
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================================

-- 1. TABLA: pending_deliveries
--    Cola de entregas pendientes que el plugin consume cada 30 segundos.
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.pending_deliveries (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id             uuid REFERENCES public.orders(id) ON DELETE CASCADE,
  order_number         text NOT NULL,
  minecraft_username   text NOT NULL,
  minecraft_uuid       text,
  product_slug         text NOT NULL,
  product_name         text NOT NULL,
  -- Los comandos a ejecutar, ej: ["/lp user {player} parent set vip"]
  commands             jsonb NOT NULL DEFAULT '[]',
  -- Comandos para revocar cuando expire (solo para mensuales)
  revoke_commands      jsonb NOT NULL DEFAULT '[]',
  -- Tipo de duración: 'permanent' | 'monthly' | 'custom'
  duration_type        text CHECK (duration_type IN ('permanent', 'monthly', 'custom')) DEFAULT 'permanent',
  -- Días de duración (NULL = permanente, 30 = mensual)
  duration_days        int,
  -- Estado de la entrega
  status               text CHECK (status IN ('pending', 'delivered', 'failed')) DEFAULT 'pending',
  delivered_at         timestamptz,
  -- Intentos fallidos antes de marcar como 'failed'
  attempts             int DEFAULT 0,
  created_at           timestamptz DEFAULT now()
);

-- 2. TABLA: active_grants
--    Registro de rangos/beneficios activos con fecha de expiración.
--    El plugin la usa para revocar rangos cuando expiran.
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.active_grants (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_id          uuid REFERENCES public.pending_deliveries(id) ON DELETE SET NULL,
  minecraft_username   text NOT NULL,
  product_slug         text NOT NULL,
  product_name         text NOT NULL,
  duration_type        text NOT NULL DEFAULT 'permanent',
  -- NULL = nunca expira (permanente)
  expires_at           timestamptz,
  -- Comandos para revocar al expirar, ej: ["/lp user {player} parent remove vip"]
  revoke_commands      jsonb NOT NULL DEFAULT '[]',
  is_active            boolean DEFAULT true,
  granted_at           timestamptz DEFAULT now()
);

-- ============================================================================
-- 3. ÍNDICES para rendimiento
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_pending_deliveries_status
  ON public.pending_deliveries(status);

CREATE INDEX IF NOT EXISTS idx_pending_deliveries_username
  ON public.pending_deliveries(minecraft_username);

CREATE INDEX IF NOT EXISTS idx_active_grants_username
  ON public.active_grants(minecraft_username);

CREATE INDEX IF NOT EXISTS idx_active_grants_expires
  ON public.active_grants(expires_at) WHERE is_active = true;

-- ============================================================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ============================================================================
ALTER TABLE public.pending_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.active_grants ENABLE ROW LEVEL SECURITY;

-- Anon/authenticated pueden INSERTAR (el frontend crea pedidos al pagar)
CREATE POLICY "Anon insert pending_deliveries"
  ON public.pending_deliveries FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Solo el service_role puede LEER y ACTUALIZAR (el plugin usa service_role key)
-- El plugin usa service_role key que bypasea RLS automáticamente
-- (No necesitamos política de SELECT/UPDATE aquí porque service_role las bypasea)

-- ============================================================================
-- 5. ACTUALIZAR TABLA orders: agregar campo duration_type si no existe
-- ============================================================================
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS duration_type text DEFAULT 'permanent',
  ADD COLUMN IF NOT EXISTS duration_days int;

-- ============================================================================
-- FIN DE MIGRACIÓN 0004
-- ============================================================================
