-- ============================================================================
-- MYLIFECRAFT - TABLA DE USUARIOS / JUGADORES (SUPABASE / POSTGRESQL)
-- Registro e Ingreso Ligero sin Verificación de Correo
-- ============================================================================

create extension if not exists "pgcrypto";

-- 1. CREACIÓN DE TABLA: user_profiles
create table if not exists public.user_profiles (
  id uuid primary key default gen_random_uuid(),
  username text not null,               -- Nick exacto en el servidor de Minecraft
  email text not null unique,           -- Correo electrónico para comprobantes de pago
  password_hash text not null,          -- Contraseña del jugador
  avatar_url text,                      -- Cabeza del Skin (minotar.net/helm/{username}/64.png)
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. HABILITAR ROW LEVEL SECURITY (RLS)
alter table public.user_profiles enable row level security;

-- 3. POLÍTICAS RLS (Permitir consulta, registro y actualización a la tienda)
drop policy if exists "Public read user_profiles" on public.user_profiles;
create policy "Public read user_profiles"
  on public.user_profiles
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Public insert user_profiles" on public.user_profiles;
create policy "Public insert user_profiles"
  on public.user_profiles
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Public update user_profiles" on public.user_profiles;
create policy "Public update user_profiles"
  on public.user_profiles
  for update
  to anon, authenticated
  using (true)
  with check (true);

-- 4. ÍNDICES DE BÚSQUEDA RÁPIDA
create index if not exists idx_user_profiles_email on public.user_profiles (email);
create index if not exists idx_user_profiles_username on public.user_profiles (username);

-- 5. USUARIO DE PRUEBA OFICIAL (STEVE / NOTCH)
insert into public.user_profiles (username, email, password_hash, avatar_url)
values 
  ('Steve', 'steve@mylifecraft.net', '123456', 'https://minotar.net/helm/Steve/64.png'),
  ('Notch', 'notch@mylifecraft.net', '123456', 'https://minotar.net/helm/Notch/64.png')
on conflict (email) do nothing;
