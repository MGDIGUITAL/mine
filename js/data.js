/**
 * MYLIFECRAFT - CATÁLOGO DE PRODUCTOS & CATEGORÍAS
 * Precargado exactamente con las especificaciones y seed de prompt_mylifecraft_final.md
 */

export const CATEGORIES = [
  { id: 'todos', name: 'Todos', slug: 'todos', icon: '🛒' },
  { id: 'rangos', name: 'Rangos', slug: 'rangos', icon: '👑', desc: 'Rangos VIP con beneficios exclusivos' },
  { id: 'monedas', name: 'Monedas', slug: 'monedas', icon: '💰', desc: 'Paquetes de monedas del servidor' },
  { id: 'llaves', name: 'Llaves', slug: 'llaves', icon: '🗝️', desc: 'Llaves para abrir cofres especiales' },
  { id: 'kits', name: 'Kits', slug: 'kits', icon: '⚔️', desc: 'Sets de equipamiento para comenzar' },
  { id: 'cosmeticos', name: 'Cosméticos', slug: 'cosmeticos', icon: '✨', desc: 'Personaliza tu personaje' }
];

export const PRODUCTS = [
  // RANGOS
  {
    id: 'prod-vip',
    name: 'VIP',
    slug: 'vip',
    category: 'rangos',
    price: 4.99,
    originalPrice: null,
    rarity: 'rare',
    icon: '👑',
    shortDesc: 'Acceso a comandos exclusivos y prefijo en chat',
    benefits: [
      'Prefijo [VIP] en chat',
      'Acceso a /fly en lobby',
      'Kit VIP mensual',
      '1 home extra',
      'Color en el chat'
    ],
    isFeatured: true
  },
  {
    id: 'prod-vip-plus',
    name: 'VIP+',
    slug: 'vip-plus',
    category: 'rangos',
    price: 8.99,
    originalPrice: 12.99,
    rarity: 'epic',
    icon: '💎',
    shortDesc: 'Todo VIP más kits y partículas exclusivas',
    benefits: [
      'Todo lo del rango VIP',
      'Kit VIP+ mensual',
      'Partículas decorativas',
      '3 homes',
      'Nick personalizado',
      'Acceso anticipado a eventos'
    ],
    isFeatured: true
  },
  {
    id: 'prod-mvp',
    name: 'MVP',
    slug: 'mvp',
    category: 'rangos',
    price: 14.99,
    originalPrice: null,
    rarity: 'epic',
    icon: '🛡️',
    shortDesc: 'Rango premium con comandos avanzados',
    benefits: [
      'Todo lo del rango VIP+',
      'Slot prioritario en el servidor',
      'Comando /heal y /feed',
      '5 homes',
      'Mascota básica',
      'Partículas premium'
    ],
    isFeatured: false
  },
  {
    id: 'prod-mvp-plus',
    name: 'MVP+',
    slug: 'mvp-plus',
    category: 'rangos',
    price: 24.99,
    originalPrice: 34.99,
    rarity: 'legendary',
    icon: '⚡',
    shortDesc: 'El rango máximo con acceso total al servidor',
    benefits: [
      'Acceso total al servidor',
      'Mascota exclusiva MVP+',
      'Nick con colores personalizados',
      'Homes ilimitados',
      'Efecto de entrada especial',
      'Soporte prioritario',
      'Acceso a beta de nuevas funciones'
    ],
    isFeatured: true
  },

  // MONEDAS
  {
    id: 'prod-1000-coins',
    name: '1.000 Coins',
    slug: '1000-coins',
    category: 'monedas',
    price: 1.99,
    originalPrice: null,
    rarity: 'common',
    icon: '🪙',
    shortDesc: 'Paquete básico de monedas del servidor',
    benefits: ['1.000 monedas en tu cuenta', 'Entrega inmediata'],
    isFeatured: false
  },
  {
    id: 'prod-5000-coins',
    name: '5.000 Coins',
    slug: '5000-coins',
    category: 'monedas',
    price: 7.99,
    originalPrice: 9.99,
    rarity: 'rare',
    icon: '💰',
    shortDesc: 'Paquete estándar con bonus incluido',
    benefits: ['5.000 monedas + 500 de bonus', 'Total: 5.500 monedas', 'Entrega inmediata'],
    isFeatured: false
  },
  {
    id: 'prod-15000-coins',
    name: '15.000 Coins',
    slug: '15000-coins',
    category: 'monedas',
    price: 19.99,
    originalPrice: 29.99,
    rarity: 'epic',
    icon: '💼',
    shortDesc: 'Paquete premium con gran bonus',
    benefits: ['15.000 monedas + 3.000 de bonus', 'Total: 18.000 monedas', 'Entrega inmediata'],
    isFeatured: false
  },
  {
    id: 'prod-50000-coins',
    name: '50.000 Coins',
    slug: '50000-coins',
    category: 'monedas',
    price: 59.99,
    originalPrice: 99.99,
    rarity: 'legendary',
    icon: '🏆',
    shortDesc: 'Paquete máximo con el mejor valor',
    benefits: ['50.000 monedas + 15.000 de bonus', 'Total: 65.000 monedas', 'Entrega inmediata', 'Mejor precio por moneda'],
    isFeatured: false
  },

  // LLAVES
  {
    id: 'prod-llave-comun',
    name: 'Llave Común',
    slug: 'llave-comun',
    category: 'llaves',
    price: 0.99,
    originalPrice: null,
    rarity: 'common',
    icon: '🗝️',
    shortDesc: 'Abre cofres comunes con ítems básicos',
    benefits: ['1 llave común', 'Ítems del crate básico'],
    isFeatured: false
  },
  {
    id: 'prod-llave-rara',
    name: 'Llave Rara',
    slug: 'llave-rara',
    category: 'llaves',
    price: 1.99,
    originalPrice: null,
    rarity: 'rare',
    icon: '🔑',
    shortDesc: 'Abre cofres raros con mejores recompensas',
    benefits: ['1 llave rara', 'Ítems exclusivos del crate raro'],
    isFeatured: false
  },
  {
    id: 'prod-llave-epica',
    name: 'Llave Épica',
    slug: 'llave-epica',
    category: 'llaves',
    price: 3.49,
    originalPrice: null,
    rarity: 'epic',
    icon: '🗝️',
    shortDesc: 'Las mejores recompensas en un solo cofre',
    benefits: ['1 llave épica', 'Recompensas épicas garantizadas', 'Posibilidad de ítem legendario'],
    isFeatured: false
  },
  {
    id: 'prod-pack-5-llaves-raras',
    name: 'Pack x5 Llaves Raras',
    slug: 'pack-5-llaves-raras',
    category: 'llaves',
    price: 7.99,
    originalPrice: 9.99,
    rarity: 'rare',
    icon: '🎁',
    shortDesc: 'Cinco llaves raras a precio especial',
    benefits: ['5 llaves raras', 'Ahorro del 20%', 'Entrega inmediata'],
    isFeatured: false
  },

  // KITS
  {
    id: 'prod-kit-starter',
    name: 'Kit Starter',
    slug: 'kit-starter',
    category: 'kits',
    price: 1.49,
    originalPrice: null,
    rarity: 'common',
    icon: '⛏️',
    shortDesc: 'Herramientas encantadas para comenzar bien',
    benefits: ['Set de herramientas de hierro encantadas', 'Comida x64', 'Antorchas x64', 'Uso único'],
    isFeatured: false
  },
  {
    id: 'prod-kit-guerrero',
    name: 'Kit Guerrero',
    slug: 'kit-guerrero',
    category: 'kits',
    price: 4.99,
    originalPrice: null,
    rarity: 'rare',
    icon: '⚔️',
    shortDesc: 'Armadura completa de diamante lista para batalla',
    benefits: ['Armadura completa de diamante encantada', 'Espada de diamante', 'Arco con flechas x64', 'Comida x64', 'Uso único'],
    isFeatured: false
  },
  {
    id: 'prod-kit-elite',
    name: 'Kit Élite',
    slug: 'kit-elite',
    category: 'kits',
    price: 9.99,
    originalPrice: 14.99,
    rarity: 'epic',
    icon: '🛡️',
    shortDesc: 'El mejor equipamiento del servidor',
    benefits: ['Armadura completa de netherite encantada', 'Espada de netherite encantada', 'Tridente encantado', 'Élitros', 'Comida x128', 'Uso único'],
    isFeatured: false
  },

  // COSMÉTICOS
  {
    id: 'prod-trail-fuego',
    name: 'Trail Fuego',
    slug: 'trail-fuego',
    category: 'cosmeticos',
    price: 2.49,
    originalPrice: null,
    rarity: 'rare',
    icon: '🔥',
    shortDesc: 'Deja un rastro de llamas al caminar',
    benefits: ['Trail de partículas de fuego', 'Permanente', 'Activar/desactivar con /trail'],
    isFeatured: false
  },
  {
    id: 'prod-trail-hielo',
    name: 'Trail Hielo',
    slug: 'trail-hielo',
    category: 'cosmeticos',
    price: 2.49,
    originalPrice: null,
    rarity: 'rare',
    icon: '❄️',
    shortDesc: 'Camina dejando un rastro de cristales de hielo',
    benefits: ['Trail de partículas de hielo', 'Permanente', 'Activar/desactivar con /trail'],
    isFeatured: false
  },
  {
    id: 'prod-pet-dragon',
    name: 'Pet Dragón',
    slug: 'pet-dragon',
    category: 'cosmeticos',
    price: 7.99,
    originalPrice: null,
    rarity: 'legendary',
    icon: '🐉',
    shortDesc: 'Mascota dragón exclusiva que te sigue por el servidor',
    benefits: ['Mascota dragón bebé permanente', 'Personalizable con /pet', 'Exclusivo del servidor'],
    isFeatured: true
  }
];
