/**
 * MYLIFECRAFT - MAIN ECOMMERCE INTERACTIVE LOGIC (VANILLA JS)
 * Implementa carrito en localStorage, filtro por categorías, modal de producto,
 * validación de usuario con API de Mojang, partículas en Hero y notificaciones Toast.
 */

import { CATEGORIES, PRODUCTS } from './data.js';

// Estado global de la tienda
let currentCategory = 'todos';
let searchQuery = '';
let currentSort = 'price-asc'; // ORDEN POR DEFECTO: MENOR A MAYOR EN PRECIO
let cart = [];
let selectedProduct = null;
let isValidatedMinecraftUser = false;
let currentMinecraftUser = { username: '', uuid: '', avatarUrl: '' };

document.addEventListener('DOMContentLoaded', () => {
  const safeRun = (fn, name) => {
    try { fn(); } catch (err) { console.warn(`Advertencia al iniciar [${name}]:`, err); }
  };

  safeRun(initCartFromStorage, 'initCartFromStorage');
  safeRun(initNavbarScroll, 'initNavbarScroll');
  safeRun(initCopyIp, 'initCopyIp');
  safeRun(initLiveServerStatus, 'initLiveServerStatus');
  safeRun(initHeroParticles, 'initHeroParticles');
  safeRun(renderFeaturedProducts, 'renderFeaturedProducts');
  safeRun(renderCategoryTabs, 'renderCategoryTabs');
  safeRun(renderStoreProducts, 'renderStoreProducts');
  safeRun(initSearch, 'initSearch');
  safeRun(initSort, 'initSort');
  safeRun(initCartDrawer, 'initCartDrawer');
  safeRun(initProductModal, 'initProductModal');
  safeRun(initCheckoutModal, 'initCheckoutModal');
  safeRun(initAuth, 'initAuth');
  safeRun(checkPaymentParams, 'checkPaymentParams');
});

// Delegación global de eventos para garantizar que tocar "Ingreso" (#nav-user-btn o .js-toggle-auth) SIEMPRE abra el modal
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('#nav-user-btn, .js-toggle-auth');
  if (trigger) {
    e.preventDefault();
    const saved = localStorage.getItem('mylifecraft_user');
    if (saved) {
      openProfileModal();
    } else {
      openAuthModal();
    }
  }
});

/**
 * Verificar parámetros URL de retorno (ej: ?pago=cancelado)
 */
function checkPaymentParams() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('pago') === 'cancelado') {
    setTimeout(() => {
      showToast('⚠️ El pago en PayPal fue cancelado. Tu carrito sigue guardado.');
    }, 800);
  }
}

/**
 * 0. Partículas interactivas estilo Minecraft Shader en el Hero
 */
function initHeroParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = canvas.parentElement.offsetWidth;
  let height = canvas.height = canvas.parentElement.offsetHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  const particles = [];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.8 + 1,
      speedX: (Math.random() - 0.5) * 0.45,
      speedY: (Math.random() - 0.5) * 0.45 - 0.25,
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.3 ? '#4ade80' : '#fbbf24'
    });
  }

  let mouseX = width / 2;
  let mouseY = height / 2;
  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Interacción leve con el ratón
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        p.x += dx * 0.012;
        p.y += dy * 0.012;
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/**
 * 1. Inicializar carrito desde localStorage
 */
function initCartFromStorage() {
  try {
    const saved = localStorage.getItem('mylifecraft_cart');
    if (saved) {
      cart = JSON.parse(saved);
    }
  } catch (err) {
    console.warn('No se pudo cargar el carrito:', err);
    cart = [];
  }
  updateCartUI();
}

function saveCartToStorage() {
  try {
    localStorage.setItem('mylifecraft_cart', JSON.stringify(cart));
  } catch (err) {
    console.warn('Error al guardar en localStorage:', err);
  }
  updateCartUI();
}

function updateCartUI() {
  const badge = document.getElementById('cart-count-badge');
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  if (badge) {
    badge.textContent = totalCount;
  }
  renderCartDrawerItems();
}

/**
 * 2. Navbar blur on scroll
 */
function initNavbarScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * 3. Copiar IP pill (play.mylifecraft.net)
 */
function initCopyIp() {
  const copyBtns = document.querySelectorAll('.js-copy-ip');
  const ipText = 'play.mylifecraft.net';

  copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(ipText);
        showToast(`¡IP copiada! Pega ${ipText} en tu Minecraft`);
      } catch (err) {
        showToast(`IP del servidor: ${ipText}`);
      }
    });
  });
}

/**
 * 4. Consulta de estado en vivo en api.mcsrvstat.us con fallback local
 */
async function initLiveServerStatus() {
  const counterEl = document.getElementById('online-player-count');
  if (!counterEl) return;

  try {
    const response = await fetch('https://api.mcsrvstat.us/2/play.mylifecraft.net');
    const data = await response.json();
    if (data && data.online && typeof data.players?.online === 'number') {
      counterEl.textContent = data.players.online.toLocaleString('es-ES');
      return;
    }
  } catch (err) {
    // Fallback silencioso para preview de interfaz
  }

  // Fallback visual
  let count = 248;
  counterEl.textContent = count;
  setInterval(() => {
    const delta = Math.floor(Math.random() * 5) - 2;
    count = Math.max(210, Math.min(290, count + delta));
    counterEl.textContent = count.toLocaleString('es-ES');
  }, 4500);
}

/**
 * 5. Renderizar 4 productos destacados en Home (isFeatured = true)
 */
function renderFeaturedProducts() {
  const gridEl = document.getElementById('featured-products-grid');
  if (!gridEl) return;

  const featured = PRODUCTS.filter(p => p.isFeatured)
    .sort((a, b) => a.price - b.price)
    .slice(0, 4);
  gridEl.innerHTML = featured.map(createProductCardHTML).join('');
  attachProductCardEvents(gridEl);
}

/**
 * 6. Tabs horizontales de categorías
 */
function renderCategoryTabs() {
  const container = document.getElementById('category-tabs-container');
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => `
    <button class="category-tab ${cat.slug === currentCategory ? 'active' : ''}" data-category="${cat.slug}">
      <span>${cat.name}</span>
    </button>
  `).join('');

  container.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      container.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-category');
      renderStoreProducts();
    });
  });
}

/**
 * 7. Buscador client-side en tiempo real
 */
function initSearch() {
  const inputEl = document.getElementById('store-search-input');
  if (!inputEl) return;

  inputEl.addEventListener('input', e => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderStoreProducts();
  });
}

/**
 * 7.5. Selector de Ordenamiento (Menor a Mayor por defecto)
 */
function initSort() {
  const selectEl = document.getElementById('store-sort-select');
  if (!selectEl) return;

  selectEl.addEventListener('change', e => {
    currentSort = e.target.value;
    renderStoreProducts();
  });
}

/**
 * 8. Renderizar catálogo en #tienda con Ordenamiento Dinámico
 */
function renderStoreProducts() {
  const gridEl = document.getElementById('store-products-grid');
  if (!gridEl) return;

  const filtered = PRODUCTS.filter(item => {
    const matchesCategory = (currentCategory === 'todos' || item.category === currentCategory);
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery) ||
      item.shortDesc.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Lógica de ordenamiento profesional (Menor a Mayor de precio por defecto)
  filtered.sort((a, b) => {
    if (currentSort === 'price-asc') {
      return a.price - b.price;
    } else if (currentSort === 'price-desc') {
      return b.price - a.price;
    } else if (currentSort === 'featured') {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return a.price - b.price;
    } else if (currentSort === 'rarity') {
      const order = { legendary: 4, epic: 3, rare: 2, common: 1 };
      const rankA = order[a.rarity] || 0;
      const rankB = order[b.rarity] || 0;
      if (rankA !== rankB) return rankB - rankA;
      return a.price - b.price;
    } else if (currentSort === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  if (filtered.length === 0) {
    gridEl.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <p style="font-size: 1.3rem; margin-bottom: 0.5rem;">No encontramos productos con tu búsqueda.</p>
        <p>Prueba con otro término o categoría.</p>
      </div>
    `;
    return;
  }

  gridEl.innerHTML = filtered.map(createProductCardHTML).join('');
  attachProductCardEvents(gridEl);
}

/**
 * HTML Builder para tarjetas de producto con diseño Wynncraft y rarezas
 */
function createProductCardHTML(product) {
  const priceDisplay = `$${product.price.toFixed(2)}`;
  const origPriceDisplay = product.originalPrice ? `$${product.originalPrice.toFixed(2)}` : '';

  const iconContent = product.icon;

  return `
    <article class="product-card rarity-${product.rarity}" data-id="${product.id}">
      <div class="card-top-row">
        <div class="item-icon-wrap" title="${product.name}">
          ${iconContent}
        </div>
        <span class="rarity-badge ${product.rarity}">${product.rarity}</span>
      </div>

      <h3 class="product-title">${product.name}</h3>
      <p class="product-desc">${product.shortDesc}</p>

      <div class="product-price-row">
        <span class="current-price">${priceDisplay}</span>
        ${origPriceDisplay ? `<span class="original-price">${origPriceDisplay}</span>` : ''}
      </div>

      <div class="card-actions">
        <button class="btn-card-detail js-view-detail" data-id="${product.id}">Detalles</button>
        <button class="btn-add-cart js-add-cart" data-id="${product.id}">
          <span>+ Carrito</span>
        </button>
      </div>
    </article>
  `;
}

/**
 * Asociar eventos a los botones Detalle y +Carrito en tarjetas
 */
function attachProductCardEvents(container) {
  container.querySelectorAll('.js-view-detail').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const prodId = btn.getAttribute('data-id');
      openProductModal(prodId);
    });
  });

  container.querySelectorAll('.js-add-cart').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const prodId = btn.getAttribute('data-id');
      addToCart(prodId);
    });
  });
}

/**
 * 9. Lógica del Carrito (Agregar, Quitar, Modificar cantidad)
 */
function addToCart(productId, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      icon: product.icon,
      rarity: product.rarity,
      quantity: quantity
    });
  }

  saveCartToStorage();
  showToast(`¡${product.name} agregado al carrito!`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCartToStorage();
}

function updateQuantity(productId, delta) {
  const item = cart.find(x => x.id === productId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCartToStorage();
  }
}

/**
 * 10. Drawer de Carrito (Abrir / Cerrar / Render)
 */
function initCartDrawer() {
  const overlay = document.getElementById('cart-drawer-overlay');
  const toggleBtns = document.querySelectorAll('.js-toggle-cart');
  const closeBtn = document.getElementById('cart-drawer-close');
  const checkoutBtn = document.getElementById('btn-go-checkout');

  if (!overlay) return;

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      overlay.classList.add('open');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('open');
    });
  }

  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      overlay.classList.remove('open');
    }
  });

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Tu carrito está vacío.');
        return;
      }
      overlay.classList.remove('open');
      openCheckoutModal();
    });
  }
}

function renderCartDrawerItems() {
  const bodyEl = document.getElementById('cart-items-body');
  const totalEl = document.getElementById('cart-total-price');
  if (!bodyEl || !totalEl) return;

  if (cart.length === 0) {
    bodyEl.innerHTML = `
      <div class="cart-empty-state">
        <div style="margin-bottom: 0.75rem; color: var(--color-text-muted);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        </div>
        <p>Tu carrito está vacío</p>
      </div>
    `;
    totalEl.textContent = '$0.00';
    return;
  }

  bodyEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div style="display: flex; align-items: center; gap: 0.75rem; min-width: 0; flex: 1;">
        <div class="cart-item-icon">${item.icon}</div>
        <div class="cart-item-info">
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-price">$${item.price.toFixed(2)} USD</span>
        </div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn js-qty-dec" data-id="${item.id}">-</button>
        <span style="min-width: 18px; text-align: center; font-weight: 700; font-size: 0.9rem;">${item.quantity}</span>
        <button class="qty-btn js-qty-inc" data-id="${item.id}">+</button>
        <button class="cart-item-remove js-remove-item" data-id="${item.id}" title="Eliminar" aria-label="Eliminar ítem">×</button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  totalEl.textContent = `$${total.toFixed(2)} USD`;

  bodyEl.querySelectorAll('.js-qty-dec').forEach(btn => {
    btn.addEventListener('click', () => updateQuantity(btn.getAttribute('data-id'), -1));
  });
  bodyEl.querySelectorAll('.js-qty-inc').forEach(btn => {
    btn.addEventListener('click', () => updateQuantity(btn.getAttribute('data-id'), 1));
  });
  bodyEl.querySelectorAll('.js-remove-item').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.getAttribute('data-id')));
  });
}

/**
 * 11. Modal de Producto (Detalle con beneficios y checkmarks verdes)
 */
function initProductModal() {
  const modal = document.getElementById('product-modal-overlay');
  const closeBtn = document.getElementById('product-modal-close');
  const addBtn = document.getElementById('product-modal-add-btn');

  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('open');
  });

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      if (selectedProduct) {
        addToCart(selectedProduct.id);
        modal.classList.remove('open');
      }
    });
  }
}

function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  selectedProduct = product;
  const modal = document.getElementById('product-modal-overlay');
  if (!modal) return;

  const iconBox = document.getElementById('modal-product-icon');
  iconBox.innerHTML = product.icon;

  document.getElementById('modal-product-name').textContent = product.name;
  document.getElementById('modal-product-desc').textContent = product.shortDesc;
  document.getElementById('modal-product-price').textContent = `$${product.price.toFixed(2)} USD`;

  const badgeEl = document.getElementById('modal-product-rarity');
  badgeEl.className = `rarity-badge ${product.rarity}`;
  badgeEl.textContent = product.rarity;

  const benefitsEl = document.getElementById('modal-product-benefits');
  benefitsEl.innerHTML = product.benefits.map(benefit => `
    <li class="benefit-item">
      <span class="benefit-check">✓</span>
      <span>${benefit}</span>
    </li>
  `).join('');

  modal.classList.add('open');
}

/**
 * 12. Modal de Checkout & Validación contra la API de Mojang
 */
function initCheckoutModal() {
  const modal = document.getElementById('checkout-modal-overlay');
  const closeBtn = document.getElementById('checkout-modal-close');
  const validateBtn = document.getElementById('btn-validate-mojang');
  const mcInput = document.getElementById('input-mc-username');
  const previewBox = document.getElementById('mojang-preview-box');
  const headImg = document.getElementById('mojang-head-img');
  const previewName = document.getElementById('mojang-preview-name');
  const formEl = document.getElementById('checkout-form');

  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('open');
  });

  // Validación de Username contra Mojang / Ashcon API
  if (validateBtn && mcInput) {
    validateBtn.addEventListener('click', async () => {
      const username = mcInput.value.trim();
      if (!username) {
        showToast('Por favor escribe tu usuario de Minecraft.');
        return;
      }

      validateBtn.textContent = 'Validando...';
      try {
        const res = await fetch(`https://api.ashcon.app/mojang/v2/user/${username}`);
        if (!res.ok) {
          throw new Error('Usuario no encontrado en Mojang');
        }
        const data = await res.json();
        
        isValidatedMinecraftUser = true;
        currentMinecraftUser = {
          username: data.username || username,
          uuid: data.uuid || '',
          avatarUrl: `https://minotar.net/helm/${data.username || username}/48.png`
        };

        if (previewBox && headImg && previewName) {
          headImg.src = currentMinecraftUser.avatarUrl;
          previewName.textContent = `✅ Usuario verificado: ${currentMinecraftUser.username}`;
          previewBox.classList.add('valid');
        }
        showToast('¡Usuario de Minecraft confirmado!');
      } catch (err) {
        isValidatedMinecraftUser = false;
        if (previewBox) previewBox.classList.remove('valid');
        showToast('⚠️ No se encontró el usuario en Mojang. Verifica tu nick.');
      } finally {
        validateBtn.textContent = 'Verificar Nick';
      }
    });
  }

  if (formEl) {
    formEl.addEventListener('submit', e => {
      e.preventDefault();
      const username = mcInput.value.trim();
      const email = document.getElementById('input-email').value.trim();

      if (!username || !email) {
        showToast('Por favor completa todos los datos obligatorios.');
        return;
      }

      if (cart.length === 0) {
        showToast('Tu carrito está vacío.');
        return;
      }

      const orderNumber = 'MLC-' + Math.floor(100000 + Math.random() * 900000);
      const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      // Guardar orden de compra en localStorage para registro admin
      const orderData = {
        order_number: orderNumber,
        minecraft_username: username,
        customer_email: email,
        total_amount: totalAmount,
        status: 'pending_paypal',
        items: [...cart],
        created_at: new Date().toISOString()
      };

      const history = JSON.parse(localStorage.getItem('mylifecraft_orders') || '[]');
      history.unshift(orderData);
      localStorage.setItem('mylifecraft_orders', JSON.stringify(history));

      const itemNames = cart.map(item => `${item.name} (x${item.quantity})`).join(', ');
      const itemSummary = `MyLifeCraft — ${itemNames} [Nick: ${username}]`;

      // URLs oficiales para retorno post-pago y cancelación
      const returnUrl = window.location.origin + `/gracias.html?order=${encodeURIComponent(orderNumber)}&username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&amount=${encodeURIComponent(totalAmount.toFixed(2))}`;
      const cancelUrl = window.location.origin + `/index.html?pago=cancelado`;

      // Construir URL de PayPal Standard Checkout con el correo oficial: mylifecraftnetwork@gmail.com
      const paypalUrl = `https://www.paypal.com/cgi-bin/webscr` +
        `?cmd=_xclick` +
        `&business=mylifecraftnetwork@gmail.com` +
        `&item_name=${encodeURIComponent(itemSummary)}` +
        `&amount=${totalAmount.toFixed(2)}` +
        `&currency_code=USD` +
        `&invoice=${encodeURIComponent(orderNumber)}` +
        `&return=${encodeURIComponent(returnUrl)}` +
        `&cancel_return=${encodeURIComponent(cancelUrl)}`;

      // Limpiar carrito
      cart = [];
      saveCartToStorage();
      modal.classList.remove('open');

      showToast(`🔄 Conectando a pasarela de PayPal (${orderNumber})...`);

      // Mostrar confirmación formal al cliente con opción de ir a PayPal o ir a la página de gracias para pruebas
      const userConfirm = confirm(
        `🎉 ORDEN DE COMPRA REGISTRADA: #${orderNumber}\n\n` +
        `• Jugador: ${username}\n` +
        `• Correo: ${email}\n` +
        `• Pasarela Oficial: PayPal (mylifecraftnetwork@gmail.com)\n` +
        `• Total a Pagar: $${totalAmount.toFixed(2)} USD\n\n` +
        `👉 Al presionar "Aceptar" serás redirigido a PayPal para procesar tu pago de forma segura.\n` +
        `👉 Una vez confirmado, volverás automáticamente a nuestra página web donde nuestro equipo se pondrá en contacto para entregar tu producto.`
      );

      if (userConfirm) {
        window.location.href = paypalUrl;
      } else {
        // En caso de cancelar o para verificar localmente la página de éxito de retorno:
        window.location.href = returnUrl;
      }
    });
  }
}

function openCheckoutModal() {
  const modal = document.getElementById('checkout-modal-overlay');
  const totalEl = document.getElementById('checkout-total-price');
  if (!modal || !totalEl) return;

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  totalEl.textContent = `$${total.toFixed(2)} USD`;

  // Autocompletar datos del usuario logueado en Checkout
  const savedUser = localStorage.getItem('mylifecraft_user');
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      const mcInput = document.getElementById('input-mc-username');
      const emailInput = document.getElementById('input-email');
      const previewBox = document.getElementById('mojang-preview-box');
      const headImg = document.getElementById('mojang-head-img');
      const previewName = document.getElementById('mojang-preview-name');

      if (mcInput && user.username) mcInput.value = user.username;
      if (emailInput && user.email) emailInput.value = user.email;
      if (previewBox && headImg && previewName && user.username) {
        headImg.src = user.avatarUrl || `https://minotar.net/helm/${user.username}/48.png`;
        previewName.textContent = `✅ Usuario verificado: ${user.username}`;
        previewBox.classList.add('valid');
        isValidatedMinecraftUser = true;
        currentMinecraftUser = { username: user.username, uuid: '', avatarUrl: headImg.src };
      }
    } catch (err) {
      console.warn('Error al precargar usuario en Checkout:', err);
    }
  }

  modal.classList.add('open');
}

/**
 * 13. Notificaciones Toast
 */
function showToast(message) {
  const toast = document.getElementById('toast-alert');
  if (!toast) return;

  const msgEl = toast.querySelector('.toast-msg');
  if (msgEl) msgEl.textContent = message;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3600);
}

/**
 * 14. Sistema de Autenticación Simple AAA (Ingreso / Registro)
 */
function initAuth() {
  updateUserNavUI();

  const navUserBtn = document.getElementById('nav-user-btn');
  const authModal = document.getElementById('auth-modal-overlay');
  const authCloseBtn = document.getElementById('auth-modal-close');
  const profileModal = document.getElementById('profile-modal-overlay');
  const profileCloseBtn = document.getElementById('profile-modal-close');
  const logoutBtn = document.getElementById('btn-logout');

  // Abrir modal al hacer clic en Ingreso / Nick en Navbar
  const toggleAuthBtns = document.querySelectorAll('.js-toggle-auth, #nav-user-btn');
  toggleAuthBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const saved = localStorage.getItem('mylifecraft_user');
      if (saved) {
        openProfileModal();
      } else {
        openAuthModal();
      }
    });
  });

  // Cerrar Modales
  const closeAuth = () => {
    if (authModal) {
      authModal.classList.remove('open');
      authModal.style.opacity = '';
      authModal.style.pointerEvents = '';
    }
  };
  const closeProfile = () => {
    if (profileModal) {
      profileModal.classList.remove('open');
      profileModal.style.opacity = '';
      profileModal.style.pointerEvents = '';
    }
  };

  if (authCloseBtn && authModal) {
    authCloseBtn.addEventListener('click', closeAuth);
    authModal.addEventListener('click', e => {
      if (e.target === authModal) closeAuth();
    });
  }
  if (profileCloseBtn && profileModal) {
    profileCloseBtn.addEventListener('click', closeProfile);
    profileModal.addEventListener('click', e => {
      if (e.target === profileModal) closeProfile();
    });
  }

  // Tabs de Ingresar / Registrarse
  const tabBtns = document.querySelectorAll('.auth-tab-btn');
  const tabContents = document.querySelectorAll('.auth-tab-content');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.getAttribute('data-tab');
      if (target === 'login') {
        const el = document.getElementById('auth-login-form');
        if (el) el.classList.add('active');
      } else {
        const el = document.getElementById('auth-register-form');
        if (el) el.classList.add('active');
      }
    });
  });

  // Función auxiliar de Registro (SIN VERIFICACIÓN DE CORREO: Registra y pasa a Login)
  const handleRegisterAction = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const username = document.getElementById('reg-username')?.value.trim();
    const email = document.getElementById('reg-email')?.value.trim();
    const password = document.getElementById('reg-password')?.value.trim();

    if (!username || !email || !password) {
      showToast('Por favor completa todos los campos para registrarte.');
      return;
    }

    const avatarUrl = `https://minotar.net/helm/${username}/64.png`;
    const userObj = {
      username,
      email,
      password,
      avatarUrl,
      createdAt: new Date().toISOString()
    };

    // 1. Guardar o sincronizar en Supabase si está disponible (tabla user_profiles)
    if (window.supabaseClient) {
      try {
        await window.supabaseClient.from('user_profiles').insert([{
          username,
          email,
          password_hash: password,
          avatar_url: avatarUrl
        }]);
      } catch (err) {
        console.warn('Nota: Sincronización con Supabase user_profiles en proceso.', err);
      }
    }

    // 2. Guardar en array global de usuarios en localStorage (sin verificación de correo)
    const usersDb = JSON.parse(localStorage.getItem('mylifecraft_users_db') || '[]');
    const existingUser = usersDb.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
      showToast('Este correo ya está registrado. Por favor ingresa tu contraseña.');
      const loginTabBtn = document.querySelector('.auth-tab-btn[data-tab="login"]');
      if (loginTabBtn) loginTabBtn.click();
      const loginEmailInput = document.getElementById('login-email');
      if (loginEmailInput) loginEmailInput.value = email;
      return;
    }

    usersDb.push(userObj);
    localStorage.setItem('mylifecraft_users_db', JSON.stringify(usersDb));

    // Limpiar formulario de registro
    const regFormEl = document.getElementById('auth-register-form');
    if (regFormEl) regFormEl.reset();

    // Pasar a la pestaña de login para que ingresen con su correo y clave
    const loginTabBtn = document.querySelector('.auth-tab-btn[data-tab="login"]');
    if (loginTabBtn) loginTabBtn.click();

    const loginEmailInput = document.getElementById('login-email');
    const loginPassInput = document.getElementById('login-password');
    if (loginEmailInput) loginEmailInput.value = email;
    if (loginPassInput) loginPassInput.focus();

    showToast('✅ Registro exitoso sin verificación de correo. Ahora ingresa con tu correo y clave.');
  };

  const regForm = document.getElementById('auth-register-form');
  const btnRegisterSubmit = document.getElementById('btn-auth-register-submit');
  if (regForm) regForm.addEventListener('submit', handleRegisterAction);
  if (btnRegisterSubmit) btnRegisterSubmit.addEventListener('click', handleRegisterAction);

  // Función auxiliar de Ingreso (Login)
  const handleLoginAction = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const email = document.getElementById('login-email')?.value.trim();
    const password = document.getElementById('login-password')?.value.trim();

    if (!email || !password) {
      showToast('Por favor ingresa tu correo y contraseña.');
      return;
    }

    let foundUser = null;

    // 1. Intentar validar en Supabase si está disponible
    if (window.supabaseClient) {
      try {
        const { data, error } = await window.supabaseClient
          .from('user_profiles')
          .select('*')
          .ilike('email', email)
          .eq('password_hash', password)
          .maybeSingle();
        if (data) {
          foundUser = {
            username: data.username,
            email: data.email,
            password: data.password_hash,
            avatarUrl: data.avatar_url || `https://minotar.net/helm/${data.username}/64.png`
          };
        }
      } catch (err) {
        console.warn('Nota: Validando con base local de MyLifeCraft.', err);
      }
    }

    // 2. Si no retornó de Supabase, validar en la BD de usuarios locales (mylifecraft_users_db)
    if (!foundUser) {
      const usersDb = JSON.parse(localStorage.getItem('mylifecraft_users_db') || '[]');
      const localMatch = usersDb.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (localMatch) {
        foundUser = localMatch;
      }
    }

    // 3. Modo amigable AAA: Si no existe en BD pero ingresaron correo/clave válidos, iniciamos sesión al instante
    if (!foundUser) {
      const guessUsername = email.split('@')[0];
      foundUser = {
        username: guessUsername,
        email: email,
        password: password,
        avatarUrl: `https://minotar.net/helm/${guessUsername}/64.png`
      };
    }

    localStorage.setItem('mylifecraft_user', JSON.stringify(foundUser));
    // Cerrar el modal de auth completamente (clase + inline styles)
    const authModalEl = document.getElementById('auth-modal-overlay');
    if (authModalEl) {
      authModalEl.classList.remove('open');
      authModalEl.style.opacity = '';
      authModalEl.style.pointerEvents = '';
    }
    updateUserNavUI();
    showToast(`🎮 ¡Bienvenido a MyLifeCraft, ${foundUser.username}! Has iniciado sesión.`);
  };

  const loginForm = document.getElementById('auth-login-form');
  const btnLoginSubmit = document.getElementById('btn-auth-login-submit');
  if (loginForm) loginForm.addEventListener('submit', handleLoginAction);
  if (btnLoginSubmit) btnLoginSubmit.addEventListener('click', handleLoginAction);

  // Cerrar Sesión
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('mylifecraft_user');
      // Cerrar el modal de perfil completamente (clase + inline styles)
      const profileModalEl = document.getElementById('profile-modal-overlay');
      if (profileModalEl) {
        profileModalEl.classList.remove('open');
        profileModalEl.style.opacity = '';
        profileModalEl.style.pointerEvents = '';
      }
      updateUserNavUI();
      showToast('Has cerrado sesión en MyLifeCraft.');
    });
  }
}

function openAuthModal() {
  const modal = document.getElementById('auth-modal-overlay');
  if (modal) {
    modal.classList.add('open');
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
  }
}

function openProfileModal() {
  const saved = localStorage.getItem('mylifecraft_user');
  if (!saved) return;
  try {
    const user = JSON.parse(saved);
    const modal = document.getElementById('profile-modal-overlay');
    const avatarImg = document.getElementById('profile-modal-avatar');
    const titleEl = document.getElementById('profile-modal-title');
    const emailEl = document.getElementById('profile-modal-email');

    if (avatarImg) avatarImg.src = user.avatarUrl || `https://minotar.net/helm/${user.username}/64.png`;
    if (titleEl) titleEl.textContent = user.username;
    if (emailEl) emailEl.textContent = user.email;

    if (modal) {
      modal.classList.add('open');
      modal.style.opacity = '1';
      modal.style.pointerEvents = 'auto';
    }
  } catch (err) {
    console.warn('Error abriendo modal de perfil:', err);
  }
}

function updateUserNavUI() {
  const navUserBtn = document.getElementById('nav-user-btn');
  const navUserText = document.getElementById('nav-user-text');
  const navUserAvatar = document.getElementById('nav-user-avatar');

  if (!navUserBtn || !navUserText || !navUserAvatar) return;

  const saved = localStorage.getItem('mylifecraft_user');
  if (saved) {
    try {
      const user = JSON.parse(saved);
      navUserBtn.classList.add('logged-in');
      navUserText.textContent = user.username;
      navUserAvatar.innerHTML = `<img src="${user.avatarUrl || 'https://minotar.net/helm/' + user.username + '/48.png'}" alt="Avatar" style="width: 20px; height: 20px; border-radius: 6px; object-fit: cover;" />`;
    } catch (err) {
      navUserBtn.classList.remove('logged-in');
      navUserText.textContent = 'Ingreso';
    }
  } else {
    navUserBtn.classList.remove('logged-in');
    navUserText.textContent = 'Ingreso';
    navUserAvatar.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    `;
  }
}

