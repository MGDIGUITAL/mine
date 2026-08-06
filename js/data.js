/**
 * MYLIFECRAFT - OFFICIAL PRODUCT & CATEGORY CATALOG (UI/UX PRO MAX)
 * Sin emojis - 100% activos visuales profesionales (AI Voxel Icons & SVG).
 * Precios oficiales y catálogo 100% sincronizado con mylifecraft.craftingstore.net
 * (56 Productos en total divididos en 10 Secciones + Todos).
 */

export const CATEGORIES = [
  {
    id: 'todos',
    name: 'Todos',
    slug: 'todos',
    icon: '<img src="img/icon-ranks.png" alt="Todos" class="category-icon-ai" />',
    description: 'Catálogo completo de ítems, rangos, pases y protecciones de MyLifeCraft.'
  },
  {
    id: 'peluches',
    name: 'PELUCHES',
    slug: 'peluches',
    icon: '<img src="img/dragon-pet.png" alt="Peluches" class="category-icon-ai" />',
    description: 'Peluches coleccionables físicos y mascotas exclusivas en el juego.'
  },
  {
    id: 'mylifepass',
    name: 'MYLIFEPASS',
    slug: 'mylifepass',
    icon: '<img src="img/vip-badge.png" alt="MyLifePass" class="category-icon-ai" />',
    description: 'Pase de batalla de temporada con recompensas y fragmentos de kit.'
  },
  {
    id: 'rangos-mensuales',
    name: 'Rangos Mensuales',
    slug: 'rangos-mensuales',
    icon: '<img src="img/icon-ranks.png" alt="Rangos Mensuales" class="category-icon-ai" />',
    description: 'Rangos VIP, ELITE, ULTRA, OMEGA, SUPREMO y LEYENDA por 30 días.'
  },
  {
    id: 'rangos-permanentes',
    name: 'Rangos permanentes',
    slug: 'rangos-permanentes',
    icon: '<img src="img/vip-badge.png" alt="Rangos Permanentes" class="category-icon-ai" />',
    description: 'Rangos de prestigio para toda la vida en tu cuenta sin pagos recurrentes.'
  },
  {
    id: 'ascender-rango',
    name: 'Ascender mi rango',
    slug: 'ascender-rango',
    icon: '<img src="img/icon-ranks.png" alt="Ascender Rango" class="category-icon-ai" />',
    description: 'Actualiza tu rango actual abonando únicamente la diferencia de precio.'
  },
  {
    id: 'kits',
    name: 'Kits',
    slug: 'kits',
    icon: '<img src="img/icon-kits.png" alt="Kits" class="category-icon-ai" />',
    description: 'Equipamiento completo de combate y supervivencia para tus aventuras.'
  },
  {
    id: 'pets',
    name: 'Pets',
    slug: 'pets',
    icon: '<img src="img/dragon-pet.png" alt="Pets" class="category-icon-ai" />',
    description: 'Mascotas legendarias con partículas y aura que te siguen a todas partes.'
  },
  {
    id: 'llaves',
    name: 'Llaves',
    slug: 'llaves',
    icon: '<img src="img/icon-keys.png" alt="Llaves" class="category-icon-ai" />',
    description: 'Llaves para cofres místicos con recompensas épicas y legendarias.'
  },
  {
    id: 'protecciones',
    name: 'Protecciones',
    slug: 'protecciones',
    icon: '<img src="img/icon-cosmetics.png" alt="Protecciones" class="category-icon-ai" />',
    description: 'Piedras de protección de territorios y parcelas para tus construcciones.'
  },
  {
    id: 'otros',
    name: 'Otros',
    slug: 'otros',
    icon: '<img src="img/icon-coins.png" alt="Otros" class="category-icon-ai" />',
    description: 'Piñatas festivas, tags personalizados y más.'
  }
];

export const PRODUCTS = [
  // ==========================================
  // 1. CATEGORÍA: PELUCHES (1 producto)
  // ==========================================
  {
    id: 'prod-peluche-carta',
    name: 'PELUCHE + CARTA PERSONALIZADA + extras',
    slug: 'peluche-carta-personalizada',
    category: 'peluches',
    price: 9.99,
    originalPrice: 14.99,
    rarity: 'legendary',
    icon: '<img src="img/dragon-pet.png" alt="Peluche Oficial" />',
    shortDesc: 'Peluche físico oficial de MyLifeCraft con carta firmada personalizada y extras exclusivos.',
    isFeatured: true,
    benefits: [
      'Peluche oficial MyLifeCraft coleccionable',
      'Carta personalizada firmada por la administración del servidor',
      'Extras y cosméticos exclusivos en tu cuenta del servidor',
      'Insignia especial de coleccionista en Discord y juego'
    ],
    commands: ['/pet give {player} plush_bundle']
  },

  // ==========================================
  // 2. CATEGORÍA: MYLIFEPASS (4 productos)
  // ==========================================
  {
    id: 'prod-pass-t9',
    name: 'PASE PREMIUN - TEMPORADA 9: CYBER PUNK',
    slug: 'pase-premium-t9-cyberpunk',
    category: 'mylifepass',
    price: 11.99,
    originalPrice: 15.99,
    rarity: 'legendary',
    icon: '<img src="img/vip-badge.png" alt="MyLifePass T9" />',
    shortDesc: 'Pase de temporada Cyber Punk con acceso a las 100 recompensas premium del servidor.',
    isFeatured: true,
    benefits: [
      'Acceso instantáneo a la ruta Premium del Pase Temporada 9: Cyber Punk',
      'Mascota y cosméticos temáticos Cyber Punk en Survival Vanilla',
      'Recompensas exclusivas por cada nivel desbloqueado',
      'Multiplicador de experiencia permanente durante la temporada'
    ],
    commands: ['/pass grant {player} season_9_premium']
  },
  {
    id: 'prod-frag-1',
    name: 'Fragmento De Kit',
    slug: 'fragmento-de-kit',
    tebexId: 7146961,
    category: 'mylifepass',
    price: 3.99,
    originalPrice: null,
    rarity: 'rare',
    icon: '<img src="img/icon-kits.png" alt="Fragmento de Kit" />',
    shortDesc: 'Un fragmento de kit para forjar equipamiento especial en el servidor.',
    isFeatured: false,
    benefits: [
      '1 Fragmento de Kit acreditado a tu inventario',
      'Usable en la herrería y crafteo de kits del servidor',
      'Compatible con Survival Vanilla'
    ],
    commands: ['/kit fragment give {player} 1']
  },
  {
    id: 'prod-frag-10',
    name: 'x10 Fragmento De Kit + 1 GRATIS',
    slug: '10-fragmentos-kit-1-gratis',
    tebexId: 7146964,
    category: 'mylifepass',
    price: 37.99,
    originalPrice: 43.99,
    rarity: 'epic',
    icon: '<img src="img/icon-kits.png" alt="x10 Fragmentos +1 Gratis" />',
    shortDesc: 'Pack de 10 fragmentos de kit con 1 fragmento adicional totalmente gratis.',
    isFeatured: false,
    benefits: [
      '10 Fragmentos de Kit base + 1 Fragmento GRATIS de bono',
      'Total acreditado en el acto: 11 Fragmentos de Kit',
      'Ahorra un 10% en comparación con la compra individual'
    ],
    commands: ['/kit fragment give {player} 11']
  },
  {
    id: 'prod-frag-20',
    name: 'x20 Fragmento De Kit + 2 GRATIS',
    slug: '20-fragmentos-kit-2-gratis',
    tebexId: 7146970,
    category: 'mylifepass',
    price: 75.99,
    originalPrice: 87.99,
    rarity: 'legendary',
    icon: '<img src="img/icon-kits.png" alt="x20 Fragmentos +2 Gratis" />',
    shortDesc: 'Pack supremo de 20 fragmentos de kit más 2 adicionales de regalo.',
    isFeatured: false,
    benefits: [
      '20 Fragmentos de Kit base + 2 Fragmentos GRATIS de bono',
      'Total acreditado en el acto: 22 Fragmentos de Kit',
      'Ideal para coleccionar los mejores kits de toda la temporada'
    ],
    commands: ['/kit fragment give {player} 22']
  },

  // ==========================================
  // 3. CATEGORÍA: RANGOS MENSUALES (6 productos)
  // ==========================================
  {
    id: 'prod-vip-30d',
    name: 'VIP (30 días)',
    slug: 'vip-30-dias',
    tebexId: 7143652,
    category: 'rangos-mensuales',
    price: 3.99,
    originalPrice: 4.99,
    rarity: 'rare',
    icon: '<img src="img/VIP.jpg" alt="VIP 30 días" />',
    shortDesc: '30 días de membresía VIP con prefijo en chat, kit mensual y beneficios de vuelo en lobby.',
    isFeatured: false,
    benefits: [
      'Prefijo real [VIP] en el chat del servidor por 30 días',
      'Acceso a comando /fly dentro de lobbies',
      'Kit VIP de suministros mensuales',
      '1 Home extra de teletransporte'
    ],
    commands: ['/lp user {player} parent addtemp vip 30d']
  },
  {
    id: 'prod-elite-30d',
    name: 'ELITE (30 días)',
    slug: 'elite-30-dias',
    tebexId: 7143658,
    category: 'rangos-mensuales',
    price: 7.99,
    originalPrice: 9.99,
    rarity: 'rare',
    icon: '<img src="img/ELITE.jpg" alt="ELITE 30 días" />',
    shortDesc: '30 días de membresía ELITE con más homes, kits mejorados y ventajas en Survival.',
    isFeatured: false,
    benefits: [
      'Prefijo [ELITE] en el chat del servidor por 30 días',
      'Kit ELITE exclusivo y comandos de comodidad',
      '3 Homes de teletransporte instantáneo',
      'Acceso a zonas VIP del servidor'
    ],
    commands: ['/lp user {player} parent addtemp elite 30d']
  },
  {
    id: 'prod-ultra-30d',
    name: 'ULTRA (30 DIAS)',
    slug: 'ultra-30-dias',
    tebexId: 7143660,
    category: 'rangos-mensuales',
    price: 11.99,
    originalPrice: 14.99,
    rarity: 'epic',
    icon: '<img src="img/ULTRA.jpg" alt="ULTRA 30 días" />',
    shortDesc: '30 días de membresía ULTRA con permisos avanzados y comandos adicionales.',
    isFeatured: false,
    benefits: [
      'Prefijo [ULTRA] en chat y TAB por 30 días',
      'Kit ULTRA con armamento y herramientas mejoradas',
      'Comandos de personalización visual para tu personaje',
      '5 Homes de teletransporte'
    ],
    commands: ['/lp user {player} parent addtemp ultra 30d']
  },
  {
    id: 'prod-omega-30d',
    name: 'OMEGA (30 días)',
    slug: 'omega-30-dias',
    tebexId: 7143665,
    category: 'rangos-mensuales',
    price: 16.99,
    originalPrice: 19.99,
    rarity: 'epic',
    icon: '<img src="img/OMEGA.jpg" alt="OMEGA 30 días" />',
    shortDesc: '30 días de membresía OMEGA con ventajas exclusivas y prioridad de conexión.',
    isFeatured: false,
    benefits: [
      'Prefijo prestigioso [OMEGA] en el servidor por 30 días',
      'Prioridad de entrada en servidores llenos',
      'Kit OMEGA con armadura especial de alta durabilidad',
      'Comandos de aura y efectos visuales'
    ],
    commands: ['/lp user {player} parent addtemp omega 30d']
  },
  {
    id: 'prod-supremo-30d',
    name: 'SUPREMO (30 días)',
    slug: 'supremo-30-dias',
    tebexId: 7143678,
    category: 'rangos-mensuales',
    price: 24.99,
    originalPrice: 29.99,
    rarity: 'legendary',
    icon: '<img src="img/SUPREMO.jpg" alt="SUPREMO 30 días" />',
    shortDesc: '30 días del rango SUPREMO con acceso total a comandos de curación y soporte especial.',
    isFeatured: false,
    benefits: [
      'Prefijo dorado [SUPREMO] durante 30 días',
      'Comandos de recuperación /heal y /feed de forma rápida',
      'Slots prioritarios y teletransporte instantáneo',
      'Atención preferencial en los canales de soporte'
    ],
    commands: ['/lp user {player} parent addtemp supremo 30d']
  },
  {
    id: 'prod-leyenda-30d',
    name: 'LEYENDA (30 dias)',
    slug: 'leyenda-30-dias',
    tebexId: 7143685,
    category: 'rangos-mensuales',
    price: 39.99,
    originalPrice: 49.99,
    rarity: 'legendary',
    icon: '<img src="img/LEYENDA.jpg" alt="LEYENDA 30 días" />',
    shortDesc: '30 días del rango máximo LEYENDA con privilegios supremos y cosméticos exclusivos.',
    isFeatured: true,
    benefits: [
      'El rango más codiciado [LEYENDA] en modo mensual por 30 días',
      'Acceso a todos los privilegios de los rangos anteriores',
      'Efectos de entrada real y nombre en degradado de color',
      'Homes ilimitados durante el periodo activo'
    ],
    commands: ['/lp user {player} parent addtemp leyenda 30d']
  },

  // ==========================================
  // 4. CATEGORÍA: RANGOS PERMANENTES (6 productos)
  // ==========================================
  {
    id: 'prod-vip-perm',
    name: 'VIP PERMANENTE',
    slug: 'vip-permanente',
    tebexId: 7143687,
    category: 'rangos-permanentes',
    price: 14.99,
    originalPrice: 19.99,
    rarity: 'rare',
    icon: '<img src="img/VIP.jpg" alt="VIP Permanente" />',
    shortDesc: 'Rango VIP para siempre en tu cuenta: prefijo en chat, kit mensual perpetuo y ventajas básicas.',
    isFeatured: true,
    benefits: [
      'Prefijo real [VIP] en el chat general para siempre',
      'Acceso al comando /fly dentro de lobbies de por vida',
      'Kit VIP de suministros disponible todos los meses sin vencimiento',
      '1 Home extra de teletransporte'
    ],
    commands: ['/lp user {player} parent set vip']
  },
  {
    id: 'prod-elite-perm',
    name: 'ELITE PERMANENTE',
    slug: 'elite-permanente',
    tebexId: 7143688,
    category: 'rangos-permanentes',
    price: 29.99,
    originalPrice: 39.99,
    rarity: 'rare',
    icon: '<img src="img/ELITE.jpg" alt="ELITE Permanente" />',
    shortDesc: 'Rango ELITE de por vida con kits avanzados, homes adicionales y sin cobros mensuales.',
    isFeatured: false,
    benefits: [
      'Rango [ELITE] para siempre en todas las modalidades',
      '3 Homes de teletransporte instantáneo permanentes',
      'Kit ELITE perpetuo todos los meses',
      'Colores de chat personalizados'
    ],
    commands: ['/lp user {player} parent set elite']
  },
  {
    id: 'prod-ultra-perm',
    name: 'ULTRA PERMANENTE',
    slug: 'ultra-permanente',
    tebexId: 7143689,
    category: 'rangos-permanentes',
    price: 44.99,
    originalPrice: 54.99,
    rarity: 'epic',
    icon: '<img src="img/ULTRA.jpg" alt="ULTRA Permanente" />',
    shortDesc: 'Rango ULTRA permanente para dominar tu aventura en Survival Vanilla.',
    isFeatured: false,
    benefits: [
      'Prefijo [ULTRA] de por vida en tu cuenta',
      'Kit ULTRA permanente y 5 homes de teletransporte',
      'Permiso para cambiar nombre visual con /nick',
      'Prioridad de acceso en eventos oficiales'
    ],
    commands: ['/lp user {player} parent set ultra']
  },
  {
    id: 'prod-omega-perm',
    name: 'OMEGA PERMANENTE',
    slug: 'omega-permanente',
    tebexId: 7143690,
    category: 'rangos-permanentes',
    price: 62.99,
    originalPrice: 79.99,
    rarity: 'epic',
    icon: '<img src="img/OMEGA.jpg" alt="OMEGA Permanente" />',
    shortDesc: 'Rango OMEGA de por vida con partículas decorativas y privilegios de clan.',
    isFeatured: true,
    benefits: [
      'Rango [OMEGA] ilimitado y permanente en toda la network',
      'Kit OMEGA con armamento superior para siempre',
      'Efectos de aura y partículas desbloqueados en tu perfil',
      'Conexión asegurada al servidor aunque esté lleno'
    ],
    commands: ['/lp user {player} parent set omega']
  },
  {
    id: 'prod-supremo-perm',
    name: 'SUPREMO PERMANENTE',
    slug: 'supremo-permanente',
    tebexId: 7143691,
    category: 'rangos-permanentes',
    price: 124.99,
    originalPrice: 149.99,
    rarity: 'legendary',
    icon: '<img src="img/SUPREMO.jpg" alt="SUPREMO Permanente" />',
    shortDesc: 'Prestigio SUPREMO permanente, comandos /heal y /feed ilimitados y prioridad 24/7.',
    isFeatured: false,
    benefits: [
      'Prefijo [SUPREMO] para siempre en el servidor',
      'Comandos /heal y /feed para curarte en el juego',
      'Homes ilimitados de teletransporte instantáneo',
      'Kit SUPREMO y acceso anticipado a nuevas actualizaciones'
    ],
    commands: ['/lp user {player} parent set supremo']
  },
  {
    id: 'prod-leyenda-perm',
    name: 'LEYENDA PERMANENTE',
    slug: 'leyenda-permanente',
    tebexId: 7143692,
    category: 'rangos-permanentes',
    price: 159.99,
    originalPrice: 199.99,
    rarity: 'legendary',
    icon: '<img src="img/LEYENDA.jpg" alt="LEYENDA Permanente" />',
    shortDesc: 'El estatus máximo de MyLifeCraft para toda la vida: acceso total, insignia LEYENDA y mascota exclusiva.',
    isFeatured: true,
    benefits: [
      'El máximo rango de MyLifeCraft [LEYENDA] de forma permanente para toda la vida',
      'Acceso a la totalidad de comandos y privilegios del servidor',
      'Insignia y nombre en degradado especial en el chat y TAB',
      'Soporte directo con categoría Prioridad Máxima en Discord',
      'Efecto de anuncio global cada vez que entras al servidor'
    ],
    commands: ['/lp user {player} parent set leyenda']
  },

  // ==========================================
  // 5. CATEGORÍA: ASCENDER MI RANGO (5 productos)
  // ==========================================
  {
    id: 'prod-upg-vip-elite',
    name: 'VIP → ELITE',
    slug: 'upgrade-vip-a-elite',
    tebexId: 7143708,
    category: 'ascender-rango',
    price: 14.99,
    originalPrice: null,
    rarity: 'rare',
    icon: '<img src="img/icon-ranks.png" alt="VIP a ELITE" />',
    shortDesc: 'Ascenso de rango VIP a ELITE permanente pagando únicamente la diferencia.',
    isFeatured: false,
    benefits: [
      'Sube de nivel tu rango permanente de VIP a ELITE',
      'Recibe al instante todos los nuevos comandos y kits del nivel ELITE',
      'Mantenimiento automático de tu historial en el servidor'
    ],
    commands: ['/lp user {player} parent set elite']
  },
  {
    id: 'prod-upg-elite-ultra',
    name: 'ELITE → ULTRA',
    slug: 'upgrade-elite-a-ultra',
    tebexId: 7143709,
    category: 'ascender-rango',
    price: 14.99,
    originalPrice: null,
    rarity: 'epic',
    icon: '<img src="img/icon-ranks.png" alt="ELITE a ULTRA" />',
    shortDesc: 'Ascenso de rango ELITE a ULTRA permanente con activación instantánea.',
    isFeatured: false,
    benefits: [
      'Actualiza tu cuenta de ELITE a ULTRA permanente',
      'Desbloquea 5 homes, comando /nick y kits avanzados',
      'Sin pérdida de progreso ni cobros duplicados'
    ],
    commands: ['/lp user {player} parent set ultra']
  },
  {
    id: 'prod-upg-ultra-omega',
    name: 'ULTRA → OMEGA',
    slug: 'upgrade-ultra-a-omega',
    tebexId: 7143710,
    category: 'ascender-rango',
    price: 17.99,
    originalPrice: null,
    rarity: 'epic',
    icon: '<img src="img/vip-badge.png" alt="ULTRA a OMEGA" />',
    shortDesc: 'Ascenso de rango ULTRA a OMEGA permanente con todos los nuevos beneficios.',
    isFeatured: false,
    benefits: [
      'Asciende tu estatus de ULTRA a OMEGA de forma permanente',
      'Aura decorativa, prioridad de conexión y kit OMEGA incluidos',
      'Entrega en 60 segundos por sistema RCON'
    ],
    commands: ['/lp user {player} parent set omega']
  },
  {
    id: 'prod-upg-omega-supremo',
    name: 'OMEGA → SUPREMO',
    slug: 'upgrade-omega-a-supremo',
    tebexId: 7143711,
    category: 'ascender-rango',
    price: 21.99,
    originalPrice: null,
    rarity: 'legendary',
    icon: '<img src="img/vip-badge.png" alt="OMEGA a SUPREMO" />',
    shortDesc: 'Ascenso de rango OMEGA a SUPREMO permanente con privilegios avanzados.',
    isFeatured: false,
    benefits: [
      'Paso al penúltimo escalón del servidor: de OMEGA a SUPREMO permanente',
      'Comandos de recuperación /heal y /feed desbloqueados',
      'Atención prioritaria y estatus dorado en chat'
    ],
    commands: ['/lp user {player} parent set supremo']
  },
  {
    id: 'prod-upg-supremo-leyenda',
    name: 'SUPREMO → LEYENDA',
    slug: 'upgrade-supremo-a-leyenda',
    tebexId: 7143712,
    category: 'ascender-rango',
    price: 30.20,
    originalPrice: 39.99,
    rarity: 'legendary',
    icon: '<img src="img/vip-badge.png" alt="SUPREMO a LEYENDA" />',
    shortDesc: 'El salto final al rango máximo LEYENDA permanente del servidor.',
    isFeatured: true,
    benefits: [
      'Corona tu aventura en MyLifeCraft subiendo de SUPREMO a LEYENDA permanente',
      'Obtén el 100% de los privilegios, comandos y cosméticos del servidor',
      'Anuncio global al conectar y degradado exclusivo de LEYENDA'
    ],
    commands: ['/lp user {player} parent set leyenda']
  },

  // ==========================================
  // 6. CATEGORÍA: KITS (7 productos)
  // ==========================================
  {
    id: 'prod-kit-san-valentin',
    name: 'KIT SAN VALENTIN',
    slug: 'kit-san-valentin',
    category: 'kits',
    price: 13.99,
    originalPrice: 17.99,
    rarity: 'legendary',
    icon: '<img src="https://cdn.craftingstore.net/rPPmDHlLQ1/65204d4dc66908ab785e93b1a70942ae/5crnfamghzdiku3gn5uv.png" alt="Kit San Valentín" />',
    shortDesc: 'Kit especial de edición limitada de San Valentín con armadura y armas exclusivas.',
    isFeatured: true,
    benefits: [
      'Armadura encantada con temática visual de San Valentín',
      'Espada y arco con partículas de corazones al golpear',
      'Suministros especiales y comida dorada festiva',
      'Ítem de colección limitado a temporada'
    ],
    commands: ['/kit give {player} san_valentin']
  },
  {
    id: 'prod-kit-samurai',
    name: 'Kit Samurai',
    slug: 'kit-samurai',
    tebexId: 7146980,
    category: 'kits',
    price: 8.99,
    originalPrice: 11.99,
    rarity: 'epic',
    icon: '<img src="https://cdn.craftingstore.net/rPPmDHlLQ1/65204d4dc66908ab785e93b1a70942ae/vyw7clakbu5ey05czvde.png" alt="Kit Samurai" />',
    shortDesc: 'Equipamiento samurái con katana encantada y armadura estilizada.',
    isFeatured: false,
    benefits: [
      'Armadura estilo Samurái con alta protección física',
      'Katana especial con velocidad de ataque y daño crítico',
      'Ideal para combates cuerpo a cuerpo en Survival Vanilla'
    ],
    commands: ['/kit give {player} samurai']
  },
  {
    id: 'prod-kit-unicornio',
    name: 'Kit Unicornio',
    slug: 'kit-unicornio',
    tebexId: 7146988,
    category: 'kits',
    price: 8.99,
    originalPrice: 11.99,
    rarity: 'epic',
    icon: '<img src="https://cdn.craftingstore.net/rPPmDHlLQ1/65204d4dc66908ab785e93b1a70942ae/0lydnhi71umg1ssespt0.png" alt="Kit Unicornio" />',
    shortDesc: 'Kit místico con efectos visuales de arcoíris y herramientas encantadas.',
    isFeatured: false,
    benefits: [
      'Armadura encantada con destellos de arcoíris',
      'Herramientas mágicas con alta eficiencia en minería',
      'Partículas estelares al correr'
    ],
    commands: ['/kit give {player} unicornio']
  },
  {
    id: 'prod-kit-necros',
    name: 'Kit Necros',
    slug: 'kit-necros',
    tebexId: 7146994,
    category: 'kits',
    price: 9.99,
    originalPrice: 13.99,
    rarity: 'epic',
    icon: '<img src="https://cdn.craftingstore.net/rPPmDHlLQ1/65204d4dc66908ab785e93b1a70942ae/mkmet1440nvyxemxzfdp.png" alt="Kit Necros" />',
    shortDesc: 'Set de combate oscuro del nigromante con alta durabilidad.',
    isFeatured: false,
    benefits: [
      'Armadura oscura de nigromante resistente al fuego y proyectiles',
      'Guadaña / Espada Necros con efecto de marchitar (Wither)',
      '64 Manzanas doradas de combate'
    ],
    commands: ['/kit give {player} necros']
  },
  {
    id: 'prod-kit-warden',
    name: 'Kit Warden',
    slug: 'kit-warden',
    tebexId: 7147000,
    category: 'kits',
    price: 9.99,
    originalPrice: 13.99,
    rarity: 'legendary',
    icon: '<img src="https://cdn.craftingstore.net/rPPmDHlLQ1/65204d4dc66908ab785e93b1a70942ae/lnspxohjkeaxu2gfgnmn.jpg" alt="Kit Warden" />',
    shortDesc: 'Forjado con la resistencia del Warden del Deep Dark con encantamientos pesados.',
    isFeatured: false,
    benefits: [
      'Armadura de nivel Warden con resistencia máxima a explosiones y golpes',
      'Arma sónica con empuje y gran impacto',
      'Efectos visuales del Deep Dark'
    ],
    commands: ['/kit give {player} warden']
  },
  {
    id: 'prod-kit-ufo',
    name: 'Kit UFO',
    slug: 'kit-ufo',
    tebexId: 7147003,
    category: 'kits',
    price: 10.99,
    originalPrice: 14.99,
    rarity: 'legendary',
    icon: '<img src="https://cdn.craftingstore.net/rPPmDHlLQ1/65204d4dc66908ab785e93b1a70942ae/ldhseayrshn7h55hxinp.png" alt="Kit UFO" />',
    shortDesc: 'Equipamiento tecnológico alienígena con velocidad y salto en combate.',
    isFeatured: false,
    benefits: [
      'Armadura tecnológica con bonificaciones de agilidad y salto',
      'Arco / Blaster UFO con proyectiles de gravedad',
      'Élitros espaciales reforzados'
    ],
    commands: ['/kit give {player} ufo']
  },
  {
    id: 'prod-kit-meca-estelar',
    name: 'Kit Meca Estelar',
    slug: 'kit-meca-estelar',
    tebexId: 7147006,
    category: 'kits',
    price: 11.99,
    originalPrice: 15.99,
    rarity: 'legendary',
    icon: '<img src="https://cdn.craftingstore.net/rPPmDHlLQ1/65204d4dc66908ab785e93b1a70942ae/mkmet1440nvyxemxzfdp.png" alt="Kit Meca Estelar" />',
    shortDesc: 'Armadura futurista Meca Estelar con máxima protección del servidor.',
    isFeatured: true,
    benefits: [
      'Armadura suprema Meca Estelar con encantamientos máximos del servidor',
      'Espada láser estelar con Aspecto Ígneo II y Filo V',
      '128 Manzanas doradas encantadas y suministros de reparación'
    ],
    commands: ['/kit give {player} meca_estelar']
  },

  // ==========================================
  // 7. CATEGORÍA: PETS (10 productos)
  // ==========================================
  {
    id: 'prod-pet-abejita',
    name: 'Abejita',
    slug: 'abejita',
    tebexId: 7147022,
    category: 'pets',
    price: 0.99,
    originalPrice: null,
    rarity: 'common',
    icon: '<img src="img/dragon-pet.png" alt="Pet Abejita" />',
    shortDesc: 'Mascota abeja que te acompaña polinizando a tu alrededor en el servidor.',
    isFeatured: false,
    benefits: [
      'Mascota Abejita amigable que vuela junto a ti',
      'Partículas de miel y polen al desplazarte',
      'Personalizable en el menú de mascotas'
    ],
    commands: ['/pet give {player} bee']
  },
  {
    id: 'prod-pet-jabali',
    name: 'Jabalí',
    slug: 'jabali',
    tebexId: 7147432,
    category: 'pets',
    price: 2.99,
    originalPrice: null,
    rarity: 'rare',
    icon: '<img src="img/icon-cosmetics.png" alt="Pet Jabalí" />',
    shortDesc: 'Compañero jabalí leal y animado para tus expediciones por Survival.',
    isFeatured: false,
    benefits: [
      'Mascota Jabalí permanente en tu inventario de mascotas',
      'Animación de caminata y trote a tu lado',
      'Compatible con Survival Vanilla'
    ],
    commands: ['/pet give {player} boar']
  },
  {
    id: 'prod-pet-ave-artico',
    name: 'AVE SKIN ÁRTICO',
    slug: 'ave-skin-artico',
    tebexId: 7147501,
    category: 'pets',
    price: 2.99,
    originalPrice: null,
    rarity: 'rare',
    icon: '<img src="img/icon-cosmetics.png" alt="Ave Ártico" />',
    shortDesc: 'Ave rapaz con skin invernal ártica que vuela sobre tu hombro.',
    isFeatured: false,
    benefits: [
      'Mascota Ave de presa con diseño blanco invernal',
      'Efecto de copos de nieve en su aleteo',
      'Te acompaña fielmente en tu aventura'
    ],
    commands: ['/pet give {player} arctic_bird']
  },
  {
    id: 'prod-pet-ave-desertica',
    name: 'AVE SKIN DESÉRTICA',
    slug: 'ave-skin-desertica',
    tebexId: 7147516,
    category: 'pets',
    price: 2.99,
    originalPrice: null,
    rarity: 'rare',
    icon: '<img src="img/icon-cosmetics.png" alt="Ave Desértica" />',
    shortDesc: 'Ave rapaz adaptada al calor del desierto que te sigue en Survival Vanilla.',
    isFeatured: false,
    benefits: [
      'Mascota Ave con plumaje arena y dorado del desierto',
      'Partículas solares en movimiento',
      'Desbloqueado para todas las modalidades'
    ],
    commands: ['/pet give {player} desert_bird']
  },
  {
    id: 'prod-pet-ave-ender',
    name: 'AVE SKIN ENDER',
    slug: 'ave-skin-ender',
    tebexId: 7147530,
    category: 'pets',
    price: 2.99,
    originalPrice: null,
    rarity: 'rare',
    icon: '<img src="img/icon-cosmetics.png" alt="Ave Ender" />',
    shortDesc: 'Ave mística con partículas del End y ojos púrpura brillante.',
    isFeatured: false,
    benefits: [
      'Mascota Ave del End con estela púrpura de teletransporte',
      'Ojos brillantes en la oscuridad',
      'Aspecto elegante para jugadores de prestigio'
    ],
    commands: ['/pet give {player} ender_bird']
  },
  {
    id: 'prod-pet-ave-sculk',
    name: 'AVE DE SCULK',
    slug: 'ave-de-sculk',
    tebexId: 7147537,
    category: 'pets',
    price: 3.99,
    originalPrice: null,
    rarity: 'epic',
    icon: '<img src="img/icon-cosmetics.png" alt="Ave Sculk" />',
    shortDesc: 'Mascota ave infestada de Sculk con pulsos sonoros característicos.',
    isFeatured: false,
    benefits: [
      'Mascota Ave infundida con la energía del Sculk',
      'Efectos visuales de ondas sonoras al volar',
      'Diseño exclusivo del bioma Deep Dark'
    ],
    commands: ['/pet give {player} sculk_bird']
  },
  {
    id: 'prod-pet-chimuelo',
    name: 'Chimuelo',
    slug: 'chimuelo',
    tebexId: 7147607,
    category: 'pets',
    price: 5.99,
    originalPrice: 8.99,
    rarity: 'legendary',
    icon: '<img src="img/dragon-pet.png" alt="Pet Chimuelo" />',
    shortDesc: 'El legendario dragón nocturno Chimuelo como fiel compañero in-game.',
    isFeatured: true,
    benefits: [
      'Mascota dragón nocturno Chimuelo con vuelo ágil a tu lado',
      'Efectos de plasma y aura oscura azulada',
      'Uno de los compañeros más queridos y codiciados de MyLifeCraft',
      'Nombre personalizable con /pet'
    ],
    commands: ['/pet give {player} toothless']
  },
  {
    id: 'prod-pet-arcangel',
    name: 'Arcangel',
    slug: 'arcangel',
    tebexId: 7147546,
    category: 'pets',
    price: 7.99,
    originalPrice: 10.99,
    rarity: 'legendary',
    icon: '<img src="img/icon-cosmetics.png" alt="Pet Arcangel" />',
    shortDesc: 'Mascota angelical con alas de luz sagrada que ilumina tu camino.',
    isFeatured: false,
    benefits: [
      'Compañero Arcángel celestial flotando con alas radiantes',
      'Ilumina y deja partículas doradas sagradas',
      'Estatus legendario en Survival Vanilla'
    ],
    commands: ['/pet give {player} archangel']
  },
  {
    id: 'prod-pet-necromancer',
    name: 'Necromancer',
    slug: 'necromancer',
    tebexId: 7147615,
    category: 'pets',
    price: 7.99,
    originalPrice: 10.99,
    rarity: 'legendary',
    icon: '<img src="img/icon-cosmetics.png" alt="Pet Necromancer" />',
    shortDesc: 'Nigromante en miniatura que invoca chispas oscuras a tu paso.',
    isFeatured: false,
    benefits: [
      'Mascota Nigromante con báculo mágico y animaciones únicas',
      'Aura escarlata y púrpura misteriosa',
      'Compañero perfecto para portadores de kits oscuros'
    ],
    commands: ['/pet give {player} necromancer']
  },
  {
    id: 'prod-pet-vampiro',
    name: 'Vampiro',
    slug: 'vampiro',
    category: 'pets',
    price: 8.99,
    originalPrice: 11.99,
    rarity: 'legendary',
    icon: '<img src="img/icon-cosmetics.png" alt="Pet Vampiro" />',
    shortDesc: 'Mascota vampiro aristócrata que te acompaña con aura escarlata.',
    isFeatured: false,
    benefits: [
      'Mascota Vampiro que flota a tu alrededor en el servidor',
      'Efecto de murciélagos y destellos escarlata',
      'Diseño gótico y distinguido para tu cuenta'
    ],
    commands: ['/pet give {player} vampire']
  },

  // ==========================================
  // 8. CATEGORÍA: LLAVES (11 productos)
  // ==========================================
  {
    id: 'prod-llave-vulcano',
    name: 'x10 llaves vulcano',
    slug: '10-llaves-vulcano',
    category: 'llaves',
    price: 1.99,
    originalPrice: null,
    rarity: 'common',
    icon: '<img src="img/icon-keys.png" alt="x10 Llaves Vulcano" />',
    shortDesc: '10 llaves para el cofre Vulcano con ítems de fuego y lava.',
    isFeatured: false,
    benefits: [
      '10 Llaves para el Crate Vulcano del spawn',
      'Armas encantadas de fuego y bloques térmicos',
      'Apertura garantizada sin ítems vacíos'
    ],
    commands: ['/crate key give {player} vulcano 10']
  },
  {
    id: 'prod-llave-arcoiris',
    name: 'x10 llaves arcoiris',
    slug: '10-llaves-arcoiris',
    category: 'llaves',
    price: 2.99,
    originalPrice: null,
    rarity: 'rare',
    icon: '<img src="img/icon-keys.png" alt="x10 Llaves Arcoiris" />',
    shortDesc: '10 llaves para el cofre Arcoíris cargado de tintes y cosméticos.',
    isFeatured: false,
    benefits: [
      '10 Llaves para el Crate Arcoíris',
      'Cosméticos coloridos, bloques decorativos y estelas',
      'Alta variedad de premios y dinero del servidor'
    ],
    commands: ['/crate key give {player} rainbow 10']
  },
  {
    id: 'prod-llave-helada',
    name: 'x10 llaves helada',
    slug: '10-llaves-helada',
    category: 'llaves',
    price: 2.99,
    originalPrice: null,
    rarity: 'rare',
    icon: '<img src="img/icon-keys.png" alt="x10 Llaves Heladas" />',
    shortDesc: '10 llaves para el cofre Helado con recursos invernales y hielo eterno.',
    isFeatured: false,
    benefits: [
      '10 Llaves para el Crate Helado en el servidor',
      'Armaduras resistentes al frío y herramientas de hielo',
      'Posibilidad de obtener mascotas árticas'
    ],
    commands: ['/crate key give {player} frost 10']
  },
  {
    id: 'prod-llave-bosque-10',
    name: 'x10 llaves bosque',
    slug: '10-llaves-bosque',
    category: 'llaves',
    price: 2.99,
    originalPrice: null,
    rarity: 'rare',
    icon: '<img src="img/icon-keys.png" alt="x10 Llaves Bosque" />',
    shortDesc: '10 llaves para el cofre Bosque con materiales orgánicos y árboles.',
    isFeatured: false,
    benefits: [
      '10 Llaves para el Crate Bosque',
      'Maderas raras, bloques de naturaleza y herramientas Eficiencia III',
      'Ideal para constructores y exploradores'
    ],
    commands: ['/crate key give {player} forest 10']
  },
  {
    id: 'prod-llave-bosque-20',
    name: 'x20 llaves bosque',
    slug: '20-llaves-bosque',
    category: 'llaves',
    price: 5.49,
    originalPrice: 6.49,
    rarity: 'epic',
    icon: '<img src="img/icon-keys.png" alt="x20 Llaves Bosque" />',
    shortDesc: '20 llaves del cofre Bosque a precio promocional.',
    isFeatured: false,
    benefits: [
      '20 Llaves para el Crate Bosque',
      'Mayor probabilidad de premio mayor',
      'Ahorro por paquete mediano'
    ],
    commands: ['/crate key give {player} forest 20']
  },
  {
    id: 'prod-llave-bosque-30',
    name: 'x30 llaves bosque',
    slug: '30-llaves-bosque',
    category: 'llaves',
    price: 7.99,
    originalPrice: 9.99,
    rarity: 'epic',
    icon: '<img src="img/icon-keys.png" alt="x30 Llaves Bosque" />',
    shortDesc: '30 llaves del cofre Bosque para máxima probabilidad de premio mayor.',
    isFeatured: false,
    benefits: [
      '30 Llaves para el Crate Bosque del servidor',
      'El mejor precio por llave en la categoría bosque',
      'Aperturas múltiples para compartir o coleccionar'
    ],
    commands: ['/crate key give {player} forest 30']
  },
  {
    id: 'prod-llave-mortal',
    name: 'x10 llaves mortal',
    slug: '10-llaves-mortal',
    category: 'llaves',
    price: 1.99,
    originalPrice: null,
    rarity: 'rare',
    icon: '<img src="img/icon-keys.png" alt="x10 Llaves Mortales" />',
    shortDesc: '10 llaves para el cofre Mortal con armamento para PvP.',
    isFeatured: false,
    benefits: [
      '10 Llaves para el Crate Mortal en el spawn',
      'Espadas, pociones de combate y armaduras encantadas',
      'Preparación perfecta para batallas de clan'
    ],
    commands: ['/crate key give {player} mortal 10']
  },
  {
    id: 'prod-llave-minero',
    name: 'x10 llaves minero',
    slug: '10-llaves-minero',
    category: 'llaves',
    price: 1.99,
    originalPrice: null,
    rarity: 'rare',
    icon: '<img src="img/icon-keys.png" alt="x10 Llaves Minero" />',
    shortDesc: '10 llaves para el cofre Minero con minerales y picos de alta eficiencia.',
    isFeatured: false,
    benefits: [
      '10 Llaves para el Crate Minero',
      'Bloques de diamante, netherite y picos con Fortuna III',
      'Acelera la economía y minería de tu territorio'
    ],
    commands: ['/crate key give {player} miner 10']
  },
  {
    id: 'prod-llave-infierno-10',
    name: 'x10 llaves infierno',
    slug: '10-llaves-infierno',
    category: 'llaves',
    price: 3.99,
    originalPrice: null,
    rarity: 'epic',
    icon: '<img src="img/icon-keys.png" alt="x10 Llaves Infierno" />',
    shortDesc: '10 llaves para el cofre Infierno del Nether con recompensas exclusivas.',
    isFeatured: false,
    benefits: [
      '10 Llaves para el Crate Infierno del servidor',
      'Ítems de Netherite, varitas de fuego y tesoros supremos',
      'Crate de alto valor con premios épicos'
    ],
    commands: ['/crate key give {player} inferno 10']
  },
  {
    id: 'prod-llave-infierno-20',
    name: 'x20 llaves infierno',
    slug: '20-llaves-infierno',
    category: 'llaves',
    price: 6.99,
    originalPrice: 8.49,
    rarity: 'legendary',
    icon: '<img src="img/icon-keys.png" alt="x20 Llaves Infierno" />',
    shortDesc: '20 llaves del cofre Infierno con descuento especial por pack.',
    isFeatured: false,
    benefits: [
      '20 Llaves para el Crate Infierno',
      'Probabilidad duplicada de ítems legendarios y dinero',
      'Ahorro en pack avanzado'
    ],
    commands: ['/crate key give {player} inferno 20']
  },
  {
    id: 'prod-llave-infierno-30',
    name: 'x30 llaves infierno',
    slug: '30-llaves-infierno',
    category: 'llaves',
    price: 9.49,
    originalPrice: 12.99,
    rarity: 'legendary',
    icon: '<img src="img/icon-keys.png" alt="x30 Llaves Infierno" />',
    shortDesc: '30 llaves del cofre Infierno con máxima recompensa e ítems supremos.',
    isFeatured: true,
    benefits: [
      '30 Llaves para el Crate Infierno con el mejor valor de la tienda',
      'Sesión masiva de apertura de cofres para ti o tu clan',
      'Probabilidad garantizada de obtener recompensas top'
    ],
    commands: ['/crate key give {player} inferno 30']
  },

  // ==========================================
  // 9. CATEGORÍA: PROTECCIONES (4 productos)
  // ==========================================
  {
    id: 'prod-prot-16x16',
    name: 'Protección 16x16',
    slug: 'proteccion-16x16',
    category: 'protecciones',
    price: 1.99,
    originalPrice: null,
    rarity: 'common',
    icon: '<img src="img/icon-cosmetics.png" alt="Protección 16x16" />',
    shortDesc: 'Piedra de protección de 16x16 bloques para tu casa o cofre inicial en Survival.',
    isFeatured: false,
    benefits: [
      'Zona protegida básica de 16x16 bloques en Survival Vanilla',
      'Protege tus cofres, puertas y hornos contra intrusos',
      'Fácil colocación y gestión de permisos con /ps'
    ],
    commands: ['/ps give {player} 16x16 1']
  },
  {
    id: 'prod-prot-32x32',
    name: 'Protección 32x32',
    slug: 'proteccion-32x32',
    category: 'protecciones',
    price: 3.99,
    originalPrice: null,
    rarity: 'rare',
    icon: '<img src="img/icon-cosmetics.png" alt="Protección 32x32" />',
    shortDesc: 'Piedra de protección de 32x32 bloques con control de amigos y permisos.',
    isFeatured: false,
    benefits: [
      'Área protegida de 32x32 bloques para casas medianas o cultivos',
      'Permite agregar amigos como constructores autorizados',
      'Sistema anti-griefing y explosiones de Creeper'
    ],
    commands: ['/ps give {player} 32x32 1']
  },
  {
    id: 'prod-prot-64x64',
    name: 'Protección 64x64',
    slug: 'proteccion-64x64',
    category: 'protecciones',
    price: 6.99,
    originalPrice: 8.99,
    rarity: 'epic',
    icon: '<img src="img/icon-cosmetics.png" alt="Protección 64x64" />',
    shortDesc: 'Piedra de protección de 64x64 bloques ideal para gremios de tamaño medio.',
    isFeatured: false,
    benefits: [
      'Área grande de 64x64 bloques para aldeas de jugadores o bases de clan',
      'Control total de banderas PvP y generación de mobs',
      'Seguridad absoluta 24/7 para tus construcciones'
    ],
    commands: ['/ps give {player} 64x64 1']
  },
  {
    id: 'prod-prot-100x100',
    name: 'Protección 100x100',
    slug: 'proteccion-100x100',
    category: 'protecciones',
    price: 7.99,
    originalPrice: 10.99,
    rarity: 'legendary',
    icon: '<img src="img/icon-cosmetics.png" alt="Protección 100x100" />',
    shortDesc: 'El máximo rango de protección 100x100 bloques para ciudadelas y fortalezas.',
    isFeatured: true,
    benefits: [
      'El tamaño máximo de protección de 100x100 bloques en Survival',
      'Espacio gigantesco para fortalezas, granjas automáticas y ciudadelas',
      'Gestión jerárquica de permisos para alcaldes y habitantes',
      'Máxima seguridad y protección contra cualquier ataque'
    ],
    commands: ['/ps give {player} 100x100 1']
  },

  // ==========================================
  // 10. CATEGORÍA: OTROS (2 productos)
  // ==========================================
  {
    id: 'prod-pinata',
    name: 'x1 Piñata',
    slug: '1-pinata',
    category: 'otros',
    price: 1.99,
    originalPrice: null,
    rarity: 'rare',
    icon: '<img src="img/icon-coins.png" alt="x1 Piñata" />',
    shortDesc: 'Una piñata festiva para abrir en el servidor con premios para todos en el área.',
    isFeatured: false,
    benefits: [
      '1 Piñata festiva invocable en el lobby o spawn del servidor',
      'Al golpearla suelta recompensas, monedas y dulces para los jugadores cercanos',
      'Ideal para celebrar con amigos o eventos de clan'
    ],
    commands: ['/pinata give {player} 1']
  },
  {
    id: 'prod-tags-permanente',
    name: 'Tags personalizados PERMANENTE',
    slug: 'tags-personalizados-permanente',
    category: 'otros',
    price: 11.99,
    originalPrice: 15.99,
    rarity: 'legendary',
    icon: '<img src="img/icon-cosmetics.png" alt="Tags Personalizados" />',
    shortDesc: 'Desbloquea los tags y títulos personalizados en el chat y TAB de por vida.',
    isFeatured: true,
    benefits: [
      'Acceso permanente e ilimitado al sistema de Tags y títulos (/tag)',
      'Personaliza tu color, prefijo o sufijo en la lista de jugadores y chat',
      'Diferénciate con un estilo único sin fecha de vencimiento',
      'Compatible en Survival Vanilla'
    ],
    commands: ['/lp user {player} permission set mylifecraft.customtag']
  }
];
