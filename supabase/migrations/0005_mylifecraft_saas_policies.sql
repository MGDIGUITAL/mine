-- ============================================================================
-- MYLIFECRAFT - MIGRACIÓN 0005: Políticas para SaaS Staff y Consulta de Clientes
-- ============================================================================
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================================

-- 1. AGREGAR COLUMNA ROL A LOS USUARIOS (player | staff | admin)
ALTER TABLE public.user_profiles 
  ADD COLUMN IF NOT EXISTS role text DEFAULT 'player' 
  CHECK (role IN ('player', 'staff', 'admin'));

-- 2. INSERTAR USUARIO STAFF OFICIAL PARA EL SAAS
INSERT INTO public.user_profiles (username, email, password_hash, avatar_url, role)
VALUES 
  ('StaffAdmin', 'staff@mylifecraft.net', 'staff123', 'https://minotar.net/helm/Steve/64.png', 'staff'),
  ('AdminGeneral', 'admin@mylifecraft.net', 'admin123', 'https://minotar.net/helm/Notch/64.png', 'admin')
ON CONFLICT (email) DO UPDATE 
  SET role = EXCLUDED.role;

-- 3. PERMITIR CONSULTA PÚBLICA EN pending_deliveries PARA ESTADO.HTML Y SAAS.HTML
DROP POLICY IF EXISTS "Public select pending_deliveries" ON public.pending_deliveries;
CREATE POLICY "Public select pending_deliveries"
  ON public.pending_deliveries
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public update pending_deliveries" ON public.pending_deliveries;
CREATE POLICY "Public update pending_deliveries"
  ON public.pending_deliveries
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 4. PERMITIR CONSULTA PÚBLICA EN active_grants PARA ESTADO.HTML Y SAAS.HTML
DROP POLICY IF EXISTS "Public select active_grants" ON public.active_grants;
CREATE POLICY "Public select active_grants"
  ON public.active_grants
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public update active_grants" ON public.active_grants;
CREATE POLICY "Public update active_grants"
  ON public.active_grants
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 5. PERMITIR CONSULTA EN ORDENES PARA EL PANEL SAAS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public select orders" ON public.orders;
CREATE POLICY "Public select orders"
  ON public.orders
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- ============================================================================
-- FIN DE MIGRACIÓN 0005
-- ============================================================================
