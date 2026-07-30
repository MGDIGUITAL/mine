/**
 * MYLIFECRAFT - OFFICIAL PRODUCT & CATEGORY CATALOG (UI/UX PRO MAX)
 * Sin emojis - 100% activos visuales profesionales (AI Voxel Icons & SVG).
 */

export const CATEGORIES = [
  {
    id: 'rangos',
    name: 'Rangos VIP',
    slug: 'rangos',
    icon: '<img src="img/icon-ranks.png" alt="Rangos VIP" class="category-icon-ai" />',
    description: 'Rangos de prestigio con ventajas exclusivas y prefijo real en chat.'
  },
  {
    id: 'monedas',
    name: 'Monedas',
    slug: 'monedas',
    icon: '<img src="img/icon-coins.png" alt="Monedas" class="category-icon-ai" />',
    description: 'Paquetes de monedas para la economía dinámica del servidor.'
  },
  {
    id: 'llaves',
    name: 'Llaves Crate',
    slug: 'llaves',
    icon: '<img src="img/icon-keys.png" alt="Llaves Crate" class="category-icon-ai" />',
    description: 'Llaves místicas para abrir cofres con recompensas legendarias.'
  },
  {
    id: 'kits',
    name: 'Kits de Batalla',
    slug: 'kits',
    icon: '<img src="img/icon-kits.png" alt="Kits" class="category-icon-ai" />',
    description: 'Equipamiento completo de combate y supervivencia.'
  },
  {
    id: 'cosmeticos',
    name: 'Cosméticos & Pets',
    slug: 'cosmeticos',
    icon: '<img src="img/icon-cosmetics.png" alt="Cosméticos" class="category-icon-ai" />',
    description: 'Personaliza tu personaje con estelas, alas y mascotas épicas.'
  }
];

export const PRODUCTS = [
  // CATEGORÍA: RANGOS
  {
    id: 'prod-vip',
    name: 'Rango VIP',
    slug: 'vip',
    category: 'rangos',
    price: 4.99,
    originalPrice: 6.99,
    rarity: 'rare',
    icon: '<img src="img/icon-ranks.png" alt="VIP Crown" />',
    shortDesc: 'Acceso a comandos exclusivos, prefijo en chat y kit mensual.',
    isFeatured: true,
    benefits: [
      'Prefijo real [VIP] en el chat general',
      'Acceso al comando /fly dentro de lobbies',
      'Kit VIP de suministros mensuales',
      '1 Home extra de teletransporte',
      'Colores personalizados en chat'
    ],
    commands: ['/lp user {player} parent set vip']
  },
  {
    id: 'prod-vip-plus',
    name: 'Rango VIP+',
    slug: 'vip-plus',
    category: 'rangos',
    price: 8.99,
    originalPrice: 12.99,
    rarity: 'epic',
    icon: '<img src="img/vip-badge.png" alt="VIP+ Crown" />',
    shortDesc: 'Todo lo incluido en VIP más partículas decorativas y 3 homes.',
    isFeatured: true,
    benefits: [
      'Todo lo incluido en el Rango VIP',
      'Kit VIP+ exclusivo mensual',
      'Efectos de partículas alrededor de tu personaje',
      '3 Homes de teletransporte instantáneo',
      'Nick de color personalizable con /nick',
      'Acceso anticipado a nuevos eventos y minijuegos'
    ],
    commands: ['/lp user {player} parent set vip_plus']
  },
  {
    id: 'prod-mvp',
    name: 'Rango MVP',
    slug: 'mvp',
    category: 'rangos',
    price: 14.99,
    originalPrice: 19.99,
    rarity: 'epic',
    icon: '<img src="img/icon-ranks.png" alt="MVP Crown" />',
    shortDesc: 'Rango de alto prestigio con comandos de recuperación y slots prioritarios.',
    isFeatured: false,
    benefits: [
      'Todo lo incluido en el Rango VIP+',
      'Slot de conexión garantizado aunque el servidor esté lleno',
      'Comandos de recuperación: /heal y /feed cada 30 min',
      '5 Homes de teletransporte',
      'Mascota básica de acompañamiento',
      'Partículas de aura exclusivas de MVP'
    ],
    commands: ['/lp user {player} parent set mvp']
  },
  {
    id: 'prod-mvp-plus',
    name: 'Rango MVP+',
    slug: 'mvp-plus',
    category: 'rangos',
    price: 24.99,
    originalPrice: 34.99,
    rarity: 'legendary',
    icon: '<img src="img/vip-badge.png" alt="MVP+ Crown" />',
    shortDesc: 'El rango máximo de MyLifeCraft con privilegios y homes ilimitados.',
    isFeatured: true,
    benefits: [
      'Acceso total a todos los privilegios del servidor',
      'Mascota real exclusiva del nivel MVP+',
      'Nombre de jugador en degradado dorado esmeralda',
      'Homes ilimitados y teletransporte sin tiempo de espera',
      'Efecto de entrada real al unirse al servidor',
      'Atención de soporte en Discord categoría Prioridad Máxima',
      'Acceso a beta privada de nuevas modalidades de juego'
    ],
    commands: ['/lp user {player} parent set mvp_plus']
  },

  // CATEGORÍA: MONEDAS
  {
    id: 'prod-1000-coins',
    name: '1.000 Monedas',
    slug: '1000-coins',
    category: 'monedas',
    price: 1.99,
    originalPrice: null,
    rarity: 'common',
    icon: '<img src="img/icon-coins.png" alt="1000 Coins" />',
    shortDesc: 'Paquete inicial de monedas para comercio y tiendas de jugadores.',
    isFeatured: false,
    benefits: [
      '1.000 Monedas acreditadas de inmediato',
      'Usables en casas de subasta (/ah) y tiendas locales',
      'Sin fecha de expiración'
    ],
    commands: ['/eco give {player} 1000']
  },
  {
    id: 'prod-5000-coins',
    name: '5.000 Monedas (+Bonus)',
    slug: '5000-coins',
    category: 'monedas',
    price: 7.99,
    originalPrice: 9.99,
    rarity: 'rare',
    icon: '<img src="img/icon-coins.png" alt="5000 Coins" />',
    shortDesc: 'Paquete estándar con bono extra de 500 monedas de regalo.',
    isFeatured: true,
    benefits: [
      '5.000 Monedas base + 500 de bono gratuito',
      'Total acreditado al instante: 5.500 Monedas',
      'Ideal para adquirir propiedades e ítems raros'
    ],
    commands: ['/eco give {player} 5500']
  },
  {
    id: 'prod-15000-coins',
    name: '15.000 Monedas (+3K Bonus)',
    slug: '15000-coins',
    category: 'monedas',
    price: 19.99,
    originalPrice: 24.99,
    rarity: 'epic',
    icon: '<img src="img/icon-coins.png" alt="15000 Coins" />',
    shortDesc: 'Paquete avanzado para líderes de clan e inversionistas del servidor.',
    isFeatured: false,
    benefits: [
      '15.000 Monedas base + 3.000 de bono gratuito',
      'Total acreditado al instante: 18.000 Monedas',
      'Ahorro del 20% respecto a paquetes individuales'
    ],
    commands: ['/eco give {player} 18000']
  },
  {
    id: 'prod-50000-coins',
    name: '50.000 Monedas (+15K Bonus)',
    slug: '50000-coins',
    category: 'monedas',
    price: 59.99,
    originalPrice: 79.99,
    rarity: 'legendary',
    icon: '<img src="img/icon-coins.png" alt="50000 Coins" />',
    shortDesc: 'La máxima reserva económica para dominar el comercio del servidor.',
    isFeatured: false,
    benefits: [
      '50.000 Monedas base + 15.000 de bono gratuito',
      'Total acreditado al instante: 65.000 Monedas',
      'El mejor valor por moneda de toda la tienda',
      'Insignia especial de magnate económico en tu perfil'
    ],
    commands: ['/eco give {player} 65000']
  },

  // CATEGORÍA: LLAVES CRATE
  {
    id: 'prod-key-common',
    name: 'Llave Crate Común',
    slug: 'llave-comun',
    category: 'llaves',
    price: 0.99,
    originalPrice: null,
    rarity: 'common',
    icon: '<img src="img/icon-keys.png" alt="Llave Común" />',
    shortDesc: 'Abre el cofre místico común con recursos de construcción y armas básicas.',
    isFeatured: false,
    benefits: [
      '1 Llave para el Crate Común en el spawn',
      'Garantía de ítem útil sin premios vacíos'
    ],
    commands: ['/crate key give {player} common 1']
  },
  {
    id: 'prod-key-rare',
    name: 'Llave Crate Rara',
    slug: 'llave-rara',
    category: 'llaves',
    price: 1.99,
    originalPrice: null,
    rarity: 'rare',
    icon: '<img src="img/icon-keys.png" alt="Llave Rara" />',
    shortDesc: 'Abre el cofre raro con probabilidad de armaduras encantadas y esmeraldas.',
    isFeatured: false,
    benefits: [
      '1 Llave para el Crate Raro',
      'Alta probabilidad de libros encantados y armaduras',
      'Posibilidad de ganar dinero en efectivo en el juego'
    ],
    commands: ['/crate key give {player} rare 1']
  },
  {
    id: 'prod-key-epic',
    name: 'Llave Crate Épica',
    slug: 'llave-epica',
    category: 'llaves',
    price: 3.49,
    originalPrice: 4.99,
    rarity: 'epic',
    icon: '<img src="img/icon-keys.png" alt="Llave Épica" />',
    shortDesc: 'Las recompensas épicas más codiciadas en una sola apertura mística.',
    isFeatured: true,
    benefits: [
      '1 Llave para el Crate Épico del servidor',
      'Recompensas épicas garantizadas en el 100% de aperturas',
      'Probabilidad del 15% de obtener un ítem legendario exclusivo'
    ],
    commands: ['/crate key give {player} epic 1']
  },
  {
    id: 'prod-pack-5-rare-keys',
    name: 'Pack x5 Llaves Raras',
    slug: 'pack-5-llaves-raras',
    category: 'llaves',
    price: 7.99,
    originalPrice: 9.99,
    rarity: 'rare',
    icon: '<img src="img/icon-keys.png" alt="Pack 5 Llaves Raras" />',
    shortDesc: 'Cinco llaves raras a un precio rebajado para multiplicar tus recompensas.',
    isFeatured: false,
    benefits: [
      '5 Llaves Raras entregadas en tu inventario',
      'Ahorras un 20% en comparación con la compra individual',
      'Ideal para sesiones de apertura en grupo'
    ],
    commands: ['/crate key give {player} rare 5']
  },

  // CATEGORÍA: KITS DE BATALLA
  {
    id: 'prod-kit-starter',
    name: 'Kit de Inicio',
    slug: 'kit-starter',
    category: 'kits',
    price: 1.49,
    originalPrice: null,
    rarity: 'common',
    icon: '<img src="img/icon-kits.png" alt="Kit Starter" />',
    shortDesc: 'Herramientas de hierro encantadas y suministros para tus primeros días.',
    isFeatured: false,
    benefits: [
      'Set completo de herramientas de hierro con Eficiencia II',
      '64 Filetes cocinados para exploración',
      '64 Antorchas y suministros básicos',
      'Entrega inmediata en tu inventario'
    ],
    commands: ['/kit give {player} starter']
  },
  {
    id: 'prod-kit-warrior',
    name: 'Kit Guerrero Real',
    slug: 'kit-guerrero',
    category: 'kits',
    price: 4.99,
    originalPrice: 6.99,
    rarity: 'rare',
    icon: '<img src="img/icon-kits.png" alt="Kit Guerrero" />',
    shortDesc: 'Armadura completa de diamante encantada lista para combates PvE y PvP.',
    isFeatured: true,
    benefits: [
      'Armadura completa de Diamante con Protección III',
      'Espada de Diamante con Filo III y Aspecto Ígneo I',
      'Arco encantado con Poder IV y 64 flechas',
      '64 Manzanas doradas de regeneración'
    ],
    commands: ['/kit give {player} guerrero']
  },
  {
    id: 'prod-kit-elite',
    name: 'Kit Élite de Netherite',
    slug: 'kit-elite',
    category: 'kits',
    price: 9.99,
    originalPrice: 14.99,
    rarity: 'epic',
    icon: '<img src="img/icon-kits.png" alt="Kit Élite" />',
    shortDesc: 'El equipamiento supremo forjado en netherite para la máxima resistencia.',
    isFeatured: false,
    benefits: [
      'Armadura completa de Netherite con Protección IV e Irrompible III',
      'Espada de Netherite con Filo V y Saqueo III',
      'Tridente encantado con Lealtad III y Empalar V',
      'Élitros duraderos para volar por el mundo',
      '128 Manzanas doradas encantadas'
    ],
    commands: ['/kit give {player} elite']
  },

  // CATEGORÍA: COSMÉTICOS & PETS
  {
    id: 'prod-trail-fire',
    name: 'Estela de Llamas',
    slug: 'trail-fuego',
    category: 'cosmeticos',
    price: 2.49,
    originalPrice: null,
    rarity: 'rare',
    icon: '<img src="img/icon-cosmetics.png" alt="Trail Fuego" />',
    shortDesc: 'Deja un rastro incandescente de llamas y chispas al caminar o correr.',
    isFeatured: false,
    benefits: [
      'Efecto de partículas de fuego continuo a tus pies',
      'Desbloqueo permanente en el menú de cosméticos (/cosmetics)',
      'Compatible con todos los rangos y modos de juego'
    ],
    commands: ['/cosmetic trail give {player} fire']
  },
  {
    id: 'prod-trail-ice',
    name: 'Estela Gélida de Hielo',
    slug: 'trail-hielo',
    category: 'cosmeticos',
    price: 2.49,
    originalPrice: null,
    rarity: 'rare',
    icon: '<img src="img/icon-cosmetics.png" alt="Trail Hielo" />',
    shortDesc: 'Camina dejando tras de ti un rastro de cristales de hielo mágicos.',
    isFeatured: false,
    benefits: [
      'Efecto de cristales gélidos y copos de nieve al desplazarte',
      'Desbloqueo permanente en tu cuenta',
      'Actívalo o desactívalo a voluntad con /trail'
    ],
    commands: ['/cosmetic trail give {player} ice']
  },
  {
    id: 'prod-pet-dragon',
    name: 'Mascota Dragón Esmeralda',
    slug: 'pet-dragon',
    category: 'cosmeticos',
    price: 7.99,
    originalPrice: 11.99,
    rarity: 'legendary',
    icon: '<img src="img/dragon-pet.png" alt="Pet Dragón" />',
    shortDesc: 'Mascota dragón bebé en estilo vóxel que te acompaña por todo el servidor.',
    isFeatured: true,
    benefits: [
      'Mascota Dragón Esmeralda permanente en tu perfil',
      'Te sigue en cada lobby y mundo de supervivencia',
      'Emite partículas de aura esmeralda y destellos dorados',
      'Nombre y comportamiento personalizables con el comando /pet',
      'Ítem exclusivo y codiciado de MyLifeCraft'
    ],
    commands: ['/pet give {player} dragon']
  }
];
