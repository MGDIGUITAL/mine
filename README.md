# MyLifeCraft Network — Portal de Comercio Electrónico & Comunidad

Bienvenido al repositorio oficial del sitio web de **MyLifeCraft**, el servidor de Minecraft en español diseñado con una experiencia **UI/UX Pro Max** inmersiva (inspirada en la estética de *Wynncraft*).

---

## 💎 Características del Sitio

- **Diseño Oscuro Inmersivo:** Paleta negra y esmeralda con fondos sutiles de Minecraft, tipografía **Ubuntu** y sistema de rareza visual para ítems (`common`, `rare`, `epic`, `legendary`) con animaciones de brillo y resplandor.
- **Tienda Completa en Tiempo Real:** Catálogo de 56 productos oficiales y precios exactos en USD sincronizados con la tienda oficial de MyLifeCraft (`mylifecraft.craftingstore.net`), divididos en 10 categorías de Survival (`PELUCHES`, `MYLIFEPASS`, `Rangos Mensuales`, `Rangos permanentes`, `Ascender mi rango`, `Kits`, `Pets`, `Llaves`, `Protecciones` y `Otros`), además de la pestaña `Todos`, con búsqueda client-side instantánea.
- **Carrito de Compras Persistente:** Cajón interactivo (*Cart Drawer*) con almacenamiento en `localStorage`, controles de cantidad y cálculo de total en vivo.
- **Verificación Oficial de Mojang / Minotar:** El formulario de *Checkout* valida los nombres de usuario del servidor en tiempo real mostrando el avatar (*player head*) del jugador en Minecraft.
- **Conexión a Supabase (PostgreSQL):** Incluye esquema y semillas de base de datos preparadas con **Row Level Security (RLS)** y mejores prácticas en `supabase/migrations/0002_mylifecraft_ecommerce_schema.sql`.
- **Copiado de IP en un Clic:** Botón con notificación *Toast* que copia la dirección `play.mylifecraft.net` directamente al portapapeles.
- **Contador Dinámico de Jugadores:** Consulta en vivo a la API `api.mcsrvstat.us` con respaldo local en caso de inactividad del servidor.

---

## 🛠️ Estructura del Proyecto

```text
d:\SERVIDOR MINE/
├── index.html                  # Portal principal SPA con Hero, Tienda, FAQ, Modales y Carrito
├── css/
│   └── styles.css              # Sistema de diseño y variables CSS estilo Wynncraft
├── js/
│   ├── data.js                 # Catálogo de los 19 productos y 5 categorías oficiales
│   ├── main.js                 # Lógica interactiva: Carrito, Validación Mojang, Búsqueda y Toasts
│   └── supabase-client.js      # Conector frontend para lectura/escritura en Supabase
├── supabase/
│   └── migrations/             # Migraciones SQL y datos de prueba para Supabase
│       ├── 0001_initial_aethercraft_schema.sql
│       └── 0002_mylifecraft_ecommerce_schema.sql
├── .env.example                # Plantilla segura de variables de entorno
└── README.md                   # Documentación oficial del repositorio
```

---

## 🚀 Cómo Ejecutar Localmente

Al estar construido en **Vanilla HTML5, CSS y ES6 Modules**, el proyecto no requiere compilación ni dependencias pesadas:
1. Abrir el archivo `index.html` mediante una extensión como **Live Server** en Visual Studio Code o servir la carpeta con cualquier servidor estático local (`npx serve .`).
2. Para aplicar la base de datos remota, ejecutar el script `0002_mylifecraft_ecommerce_schema.sql` en el panel de **SQL Editor** en Supabase.