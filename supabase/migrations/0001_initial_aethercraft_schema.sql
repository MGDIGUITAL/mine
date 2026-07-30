-- ============================================================================
-- AETHERCRAFT NETWORK - ESQUEMA INICIAL DE SUPABASE (POSTGRESQL)
-- Implementado según Supabase Postgres Best Practices & Protocolo de Matías
-- ============================================================================

-- 1. Habilitar extensión pgcrypto para UUIDs (si no está activa)
create extension if not exists "pgcrypto";

-- ============================================================================
-- TABLA: players (Registro de jugadores del servidor)
-- ============================================================================
create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  minecraft_uuid varchar(36) not null unique,
  username varchar(32) not null unique,
  rank_badge varchar(16) not null default 'MIEMBRO', -- 'VIP', 'MVP+', 'LEYENDA', 'MIEMBRO'
  clan_tag varchar(16),
  avatar_url text,
  is_online boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- TABLA: leaderboard_stats (Estadísticas en vivo de PvP, Economía y Tiempo)
-- ============================================================================
create table if not exists public.leaderboard_stats (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  category varchar(32) not null, -- 'kills', 'economy', 'time'
  score_value bigint not null default 0,
  score_display varchar(64) not null, -- e.g. "14,892 Kills", "$2,450,000 USDm", "1,420 Horas"
  season integer not null default 4,
  updated_at timestamptz not null default now(),
  constraint uq_player_category_season unique (player_id, category, season)
);

-- ============================================================================
-- TABLA: server_news (Anuncios y noticias para el portal)
-- ============================================================================
create table if not exists public.server_news (
  id uuid primary key default gen_random_uuid(),
  title varchar(160) not null,
  slug varchar(180) not null unique,
  summary text not null,
  content text not null,
  category varchar(32) not null default 'ACTUALIZACIÓN',
  author_name varchar(64) not null default 'Equipo AetherCraft',
  is_published boolean not null default true,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- ============================================================================
-- TABLA: store_packages (Rangos y paquetes de la tienda)
-- ============================================================================
create table if not exists public.store_packages (
  id uuid primary key default gen_random_uuid(),
  package_code varchar(32) not null unique, -- 'VIP', 'MVP', 'LEYENDA'
  name varchar(64) not null,
  price_usd numeric(8, 2) not null,
  billing_period varchar(32) not null default 'permanente', -- 'mensual', 'permanente'
  features jsonb not null default '[]'::jsonb,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  display_order integer not null default 1,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- ÍNDICES (Optimización del Rendimiento - Supabase Best Practices)
-- ============================================================================
create index if not exists idx_players_username on public.players(username);
create index if not exists idx_players_is_online on public.players(is_online);
create index if not exists idx_leaderboard_category_score on public.leaderboard_stats(category, score_value desc);
create index if not exists idx_leaderboard_player_id on public.leaderboard_stats(player_id);
create index if not exists idx_server_news_published on public.server_news(is_published, published_at desc);
create index if not exists idx_store_packages_active_order on public.store_packages(is_active, display_order asc);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) - Seguridad por Defecto
-- ============================================================================
alter table public.players enable row level security;
alter table public.leaderboard_stats enable row level security;
alter table public.server_news enable row level security;
alter table public.store_packages enable row level security;

-- Políticas de Lectura Pública (Permitir SELECT a roles anon y authenticated)
create policy "Lectura pública de jugadores" on public.players
  for select to anon, authenticated
  using (true);

create policy "Lectura pública del leaderboard" on public.leaderboard_stats
  for select to anon, authenticated
  using (true);

create policy "Lectura de noticias publicadas" on public.server_news
  for select to anon, authenticated
  using (is_published = true);

create policy "Lectura de paquetes activos" on public.store_packages
  for select to anon, authenticated
  using (is_active = true);

-- Políticas de Escritura (Sólo el rol de servicio / service_role tiene acceso de modificación por defecto)
-- No se otorgan permisos de INSERT/UPDATE/DELETE a 'anon' para evitar vulnerabilidades inyectadas.

-- ============================================================================
-- DATOS DE PRUEBA (SEED DATA - TEMPORADA 4)
-- ============================================================================
insert into public.players (id, minecraft_uuid, username, rank_badge, clan_tag, is_online)
values
  ('11111111-1111-1111-1111-111111111111', 'c06f890c-3965-4d0a-9d66-5125ddcc829d', 'ShadowVortex', 'MVP+', '[ÉLITE]', true),
  ('22222222-2222-2222-2222-222222222222', 'e17f901c-4076-4e1b-ae77-6236eecc930e', 'Kira_Mc', 'VIP', '[WAR]', true),
  ('33333333-3333-3333-3333-333333333333', 'f28f012d-5187-4f2c-bf88-7347ffdd041f', 'Zentronix', 'LEYENDA', '[AETHER]', false),
  ('44444444-4444-4444-4444-444444444444', 'a39f123e-6298-403d-cf99-845800ee1520', 'AetherKing', 'LEYENDA', '[BANCO]', true),
  ('55555555-5555-5555-5555-555555555555', 'b40f234f-7309-414e-d000-956911ff2631', 'LordTitan', 'MVP+', '[SOLO]', true)
on conflict (minecraft_uuid) do nothing;

insert into public.leaderboard_stats (player_id, category, score_value, score_display, season)
values
  ('11111111-1111-1111-1111-111111111111', 'kills', 14892, '14,892 Kills', 4),
  ('22222222-2222-2222-2222-222222222222', 'kills', 12401, '12,401 Kills', 4),
  ('33333333-3333-3333-3333-333333333333', 'kills', 9850, '9,850 Kills', 4),
  ('44444444-4444-4444-4444-444444444444', 'economy', 2450000, '$2,450,000 USDm', 4),
  ('11111111-1111-1111-1111-111111111111', 'economy', 1890500, '$1,890,500 USDm', 4),
  ('33333333-3333-3333-3333-333333333333', 'time', 1420, '1,420 Horas', 4)
on conflict (player_id, category, season) do nothing;
