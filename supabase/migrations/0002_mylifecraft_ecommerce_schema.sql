-- ============================================================================
-- MYLIFECRAFT - ESQUEMA ECOMMERCE & SEED DE PRODUCTOS (SUPABASE / POSTGRESQL)
-- Generado a partir de prompt_mylifecraft_final.md para MyLifeCraft
-- ============================================================================

create extension if not exists "pgcrypto";

-- ============================================================================
-- 1. TABLA: categories
-- ============================================================================
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  icon text,
  display_order int default 0,
  created_at timestamptz default now()
);

-- ============================================================================
-- 2. TABLA: products
-- ============================================================================
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  short_description text,
  price decimal(10,2) not null,
  original_price decimal(10,2),
  category_id uuid references public.categories(id),
  rarity text check (rarity in ('common','rare','epic','legendary')) default 'common',
  icon_url text,
  is_active boolean default true,
  is_featured boolean default false,
  benefits jsonb default '[]',
  commands jsonb default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================================
-- 3. TABLA: orders
-- ============================================================================
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  customer_email text not null,
  minecraft_username text not null,
  minecraft_uuid text,
  status text check (status in ('pending','paid','delivered','failed','refunded')) default 'pending',
  total_amount decimal(10,2) not null,
  currency text default 'USD',
  payment_provider text,
  payment_id text,
  payment_data jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================================
-- 4. TABLA: order_items
-- ============================================================================
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  product_name text not null,
  product_price decimal(10,2) not null,
  quantity int not null default 1
);

-- ============================================================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ============================================================================
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "Public read categories" on public.categories for select to anon, authenticated using (true);
create policy "Public read products" on public.products for select to anon, authenticated using (is_active = true);
create policy "Public insert orders" on public.orders for insert to anon, authenticated with check (true);
create policy "Public insert order_items" on public.order_items for insert to anon, authenticated with check (true);

-- ============================================================================
-- 6. SEED DATA - CATEGORÍAS & PRODUCTOS
-- ============================================================================

-- Categorías
insert into public.categories (name, slug, description, icon, display_order) values
('Rangos', 'rangos', 'Rangos VIP con beneficios exclusivos', '👑', 1),
('Monedas', 'monedas', 'Paquetes de monedas del servidor', '💰', 2),
('Llaves', 'llaves', 'Llaves para abrir cofres especiales', '🗝️', 3),
('Kits', 'kits', 'Sets de equipamiento para comenzar', '⚔️', 4),
('Cosméticos', 'cosmeticos', 'Personaliza tu personaje', '✨', 5)
on conflict (slug) do nothing;

-- Rangos
insert into public.products (name, slug, short_description, price, category_id, rarity, is_featured, benefits, commands)
select 'VIP', 'vip', 'Acceso a comandos exclusivos y prefijo en chat', 4990,
  id, 'rare', true,
  '["Prefijo [VIP] en chat","Acceso a /fly en lobby","Kit VIP mensual","1 home extra","Color en el chat"]'::jsonb,
  '["/lp user {player} parent set vip"]'::jsonb
from public.categories where slug = 'rangos'
on conflict (slug) do nothing;

insert into public.products (name, slug, short_description, price, original_price, category_id, rarity, is_featured, benefits, commands)
select 'VIP+', 'vip-plus', 'Todo VIP más kits y partículas exclusivas', 8990, 12990,
  id, 'epic', true,
  '["Todo lo del rango VIP","Kit VIP+ mensual","Partículas decorativas","3 homes","Nick personalizado","Acceso anticipado a eventos"]'::jsonb,
  '["/lp user {player} parent set vip_plus"]'::jsonb
from public.categories where slug = 'rangos'
on conflict (slug) do nothing;

insert into public.products (name, slug, short_description, price, category_id, rarity, is_featured, benefits, commands)
select 'MVP', 'mvp', 'Rango premium con comandos avanzados', 14990,
  id, 'epic', false,
  '["Todo lo del rango VIP+","Slot prioritario en el servidor","Comando /heal y /feed","5 homes","Mascota básica","Partículas premium"]'::jsonb,
  '["/lp user {player} parent set mvp"]'::jsonb
from public.categories where slug = 'rangos'
on conflict (slug) do nothing;

insert into public.products (name, slug, short_description, price, original_price, category_id, rarity, is_featured, benefits, commands)
select 'MVP+', 'mvp-plus', 'El rango máximo con acceso total', 24990, 34990,
  id, 'legendary', true,
  '["Acceso total al servidor","Mascota exclusiva MVP+","Nick con colores personalizados","Homes ilimitados","Efecto de entrada especial","Soporte prioritario","Acceso a beta de nuevas funciones"]'::jsonb,
  '["/lp user {player} parent set mvp_plus"]'::jsonb
from public.categories where slug = 'rangos'
on conflict (slug) do nothing;

-- Monedas
insert into public.products (name, slug, short_description, price, category_id, rarity, benefits, commands)
select '1.000 Coins', '1000-coins', 'Paquete básico de monedas del servidor', 1990,
  id, 'common',
  '["1.000 monedas en tu cuenta","Entrega inmediata"]'::jsonb,
  '["/eco give {player} 1000"]'::jsonb
from public.categories where slug = 'monedas'
on conflict (slug) do nothing;

insert into public.products (name, slug, short_description, price, original_price, category_id, rarity, is_featured, benefits, commands)
select '5.000 Coins', '5000-coins', 'Paquete estándar con bonus incluido', 7990, 9950,
  id, 'rare', true,
  '["5.000 monedas + 500 de bonus","Total: 5.500 monedas","Entrega inmediata"]'::jsonb,
  '["/eco give {player} 5500"]'::jsonb
from public.categories where slug = 'monedas'
on conflict (slug) do nothing;

insert into public.products (name, slug, short_description, price, original_price, category_id, rarity, is_featured, benefits, commands)
select '15.000 Coins', '15000-coins', 'Paquete premium con gran bonus', 19990, 29850,
  id, 'epic', false,
  '["15.000 monedas + 3.000 de bonus","Total: 18.000 monedas","Entrega inmediata"]'::jsonb,
  '["/eco give {player} 18000"]'::jsonb
from public.categories where slug = 'monedas'
on conflict (slug) do nothing;

insert into public.products (name, slug, short_description, price, original_price, category_id, rarity, benefits, commands)
select '50.000 Coins', '50000-coins', 'Paquete máximo con el mejor valor', 59990, 99750,
  id, 'legendary',
  '["50.000 monedas + 15.000 de bonus","Total: 65.000 monedas","Entrega inmediata","Mejor precio por moneda"]'::jsonb,
  '["/eco give {player} 65000"]'::jsonb
from public.categories where slug = 'monedas'
on conflict (slug) do nothing;

-- Llaves
insert into public.products (name, slug, short_description, price, category_id, rarity, benefits, commands)
select 'Llave Común', 'llave-comun', 'Abre cofres comunes con ítems básicos', 990,
  id, 'common',
  '["1 llave común","Ítems del crate básico"]'::jsonb,
  '["/crate key give {player} common 1"]'::jsonb
from public.categories where slug = 'llaves'
on conflict (slug) do nothing;

insert into public.products (name, slug, short_description, price, category_id, rarity, benefits, commands)
select 'Llave Rara', 'llave-rara', 'Abre cofres raros con mejores recompensas', 1990,
  id, 'rare',
  '["1 llave rara","Ítems exclusivos del crate raro"]'::jsonb,
  '["/crate key give {player} rare 1"]'::jsonb
from public.categories where slug = 'llaves'
on conflict (slug) do nothing;

insert into public.products (name, slug, short_description, price, category_id, rarity, is_featured, benefits, commands)
select 'Llave Épica', 'llave-epica', 'Las mejores recompensas en un solo cofre', 3490,
  id, 'epic', true,
  '["1 llave épica","Recompensas épicas garantizadas","Posibilidad de ítem legendario"]'::jsonb,
  '["/crate key give {player} epic 1"]'::jsonb
from public.categories where slug = 'llaves'
on conflict (slug) do nothing;

insert into public.products (name, slug, short_description, price, original_price, category_id, rarity, benefits, commands)
select 'Pack x5 Llaves Raras', 'pack-5-llaves-raras', 'Cinco llaves raras a precio especial', 7990, 9950,
  id, 'rare',
  '["5 llaves raras","Ahorro del 20%","Entrega inmediata"]'::jsonb,
  '["/crate key give {player} rare 5"]'::jsonb
from public.categories where slug = 'llaves'
on conflict (slug) do nothing;

-- Kits
insert into public.products (name, slug, short_description, price, category_id, rarity, benefits, commands)
select 'Kit Starter', 'kit-starter', 'Herramientas encantadas para comenzar bien', 1490,
  id, 'common',
  '["Set de herramientas de hierro encantadas","Comida x64","Antorchas x64","Uso único"]'::jsonb,
  '["/kit give {player} starter"]'::jsonb
from public.categories where slug = 'kits'
on conflict (slug) do nothing;

insert into public.products (name, slug, short_description, price, category_id, rarity, is_featured, benefits, commands)
select 'Kit Guerrero', 'kit-guerrero', 'Armadura completa de diamante lista para batalla', 4990,
  id, 'rare', true,
  '["Armadura completa de diamante encantada","Espada de diamante","Arco con flechas x64","Comida x64","Uso único"]'::jsonb,
  '["/kit give {player} guerrero"]'::jsonb
from public.categories where slug = 'kits'
on conflict (slug) do nothing;

insert into public.products (name, slug, short_description, price, original_price, category_id, rarity, benefits, commands)
select 'Kit Élite', 'kit-elite', 'El mejor equipamiento del servidor', 9990, 14990,
  id, 'epic',
  '["Armadura completa de netherite encantada","Espada de netherite encantada","Tridente encantado","Élitros","Comida x128","Uso único"]'::jsonb,
  '["/kit give {player} elite"]'::jsonb
from public.categories where slug = 'kits'
on conflict (slug) do nothing;

-- Cosméticos
insert into public.products (name, slug, short_description, price, category_id, rarity, benefits, commands)
select 'Trail Fuego', 'trail-fuego', 'Deja un rastro de llamas al caminar', 2490,
  id, 'rare',
  '["Trail de partículas de fuego","Permanente","Activar/desactivar con /trail"]'::jsonb,
  '["/cosmetic trail give {player} fire"]'::jsonb
from public.categories where slug = 'cosmeticos'
on conflict (slug) do nothing;

insert into public.products (name, slug, short_description, price, category_id, rarity, benefits, commands)
select 'Trail Hielo', 'trail-hielo', 'Camina dejando un rastro de cristales de hielo', 2490,
  id, 'rare',
  '["Trail de partículas de hielo","Permanente","Activar/desactivar con /trail"]'::jsonb,
  '["/cosmetic trail give {player} ice"]'::jsonb
from public.categories where slug = 'cosmeticos'
on conflict (slug) do nothing;

insert into public.products (name, slug, short_description, price, category_id, rarity, is_featured, benefits, commands)
select 'Pet Dragón', 'pet-dragon', 'Mascota dragón exclusiva que te sigue por el servidor', 7990,
  id, 'legendary', true,
  '["Mascota dragón bebé permanente","Personalizable con /pet","Exclusivo del servidor"]'::jsonb,
  '["/pet give {player} dragon"]'::jsonb
from public.categories where slug = 'cosmeticos'
on conflict (slug) do nothing;
