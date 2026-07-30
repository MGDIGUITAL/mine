# AetherCraft Network — Sitio Web del Servidor Minecraft

Portal web profesional para **AetherCraft Network**, un servidor de Minecraft en español especializado en modos **Survival SMP (Economía & Protección)**, **SkyWars/PvP Competitivo** y **Mazmorras RPG**.

## Repositorio Vinculado
- **Directorio de Trabajo Local:** `d:\SERVIDOR MINE`
- **Repositorio Remoto Oficial:** `https://github.com/MGDIGUITAL/mine.git`
- **Rama Principal:** `main`

Cada vez que se abra o trabaje en la carpeta `d:\SERVIDOR MINE`, todas las modificaciones, componentes y funcionalidades se gestionarán y sincronizarán sobre este repositorio de GitHub.

---

## Arquitectura y Tecnologías

El sitio web está implementado siguiendo los estándares de diseño **UI/UX Pro Max** y el **Protocolo de Matías (Perfil 2 — TRABAJO)**:

- **Estructura (HTML5 Semántico):**
  - Jerarquía clara con etiquetas `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, y `<footer>`.
  - Optimización SEO (etiquetas `<title>`, `<meta name="description">`, un solo `<h1>` por página).
  - Íconos SVG nativos y escalables (sin emojis en elementos de interfaz).

- **Estilos (Vanilla CSS Moderno):**
  - Sistema de tokens y variables en `:root` (`css/styles.css`).
  - Paleta en tono oscuro obsidiana (`#06080d`) con acentos en verde esmeralda neón (`#10b981`), cian (`#06b6d4`) y oro (`#f59e0b`).
  - Efectos visuales avanzados: *Glassmorphism* (`backdrop-filter`), gradientes animados y bordes con iluminación radial.
  - Diseño responsivo adaptado a pantallas móviles, tablets y monitores de escritorio.

- **Lógica e Interactividad (Vanilla JavaScript):**
  - **Copia instantánea de IP (`mc.aethercraft.net`):** Botón interactivo con retroalimentación visual en el botón y notificación flotante (Toast alert).
  - **Leaderboard Dinámico:** Cambio de pestañas en tiempo real (Top Kills, Top Economía, Tiempo Jugado).
  - **Acordeón FAQ:** Navegación fluida para respuestas a preguntas frecuentes.
  - **Micro-interacciones:** Seguimiento del cursor con luz radial sobre las tarjetas en la cuadrícula Bento.
  - **Simulación de jugadores conectados:** Variación dinámica del contador en vivo para mostrar actividad.

---

## Estructura de Archivos

```
d:\SERVIDOR MINE/
├── css/
│   └── styles.css        # Sistema de diseño, variables CSS y estilos responsivos
├── js/
│   └── main.js           # Controladores interactivos (IP, Leaderboard, FAQ, micro-animaciones)
├── index.html            # Estructura principal del sitio web
└── README.md             # Documentación técnica y vinculación de repositorio
```

---

## Ejecución Local y Pruebas

Para previsualizar y probar el sitio web localmente:
1. Abrir `index.html` directamente en cualquier navegador web moderno, o
2. Ejecutar un servidor estático local en el puerto deseado:
   ```bash
   npx serve .
   ```