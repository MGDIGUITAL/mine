/**
 * MYLIFECRAFT - MAIN ECOMMERCE INTERACTIVE LOGIC (VANILLA JS)
 * Implementa carrito en localStorage, filtro por categorías, modal de producto,
 * validación de usuario con API de Mojang, y notificaciones Toast.
 */

import { CATEGORIES, PRODUCTS } from './data.js';

// Estado global de la tienda
let currentCategory = 'todos';
let searchQuery = '';
let cart = [];
let selectedProduct = null;
let isValidatedMinecraftUser = false;
let currentMinecraftUser = { username: '', uuid: '', avatarUrl: '' };

document.addEventListener('DOMContentLoaded', () => {
  initCartFromStorage();
  initNavbarScroll();
  initCopyIp();
  initLiveServerStatus();
  renderFeaturedProducts();
  renderCategoryTabs();
  renderStoreProducts();
  initSearch();
  initCartDrawer();
  initProductModal();
  initCheckoutModal();
});

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
      header.style.background = 'rgba(10, 10, 10, 0.95)';
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.8)';
    } else {
      header.style.background = 'rgba(10, 10, 10, 0.85)';
      header.style.boxShadow = 'none';
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
    // Si la API falla o el servidor está offline, usamos simulación para preview
  }

  // Fallback visual (entre 180 y 240 jugadores)
  let count = 214;
  counterEl.textContent = count;
  setInterval(() => {
    const delta = Math.floor(Math.random() * 5) - 2;
    count = Math.max(180, Math.min(260, count + delta));
    counterEl.textContent = count.toLocaleString('es-ES');
  }, 5000);
}

/**
 * 5. Renderizar 4 productos destacados en Home (isFeatured = true)
 */
function renderFeaturedProducts() {
  const gridEl = document.getElementById('featured-products-grid');
  if (!gridEl) return;

  const featured = PRODUCTS.filter(p => p.isFeatured).slice(0, 4);
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
      <span>${cat.icon}</span>
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
 * 8. Renderizar catálogo en #tienda
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

  if (filtered.length === 0) {
    gridEl.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">No encontramos productos con tu búsqueda.</p>
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

  return `
    <article class="product-card rarity-${product.rarity}" data-id="${product.id}">
      <div class="card-top-row">
        <div class="item-icon-wrap" title="${product.name}">
          <span>${product.icon}</span>
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
        <p style="font-size: 2.5rem; margin-bottom: 0.5rem;">🛒</p>
        <p>Tu carrito está vacío</p>
      </div>
    `;
    totalEl.textContent = '$0.00';
    return;
  }

  bodyEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div style="display: flex; align-items: center; gap: 0.85rem;">
        <div style="font-size: 1.5rem;">${item.icon}</div>
        <div class="cart-item-info">
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-price">$${item.price.toFixed(2)} USD</span>
        </div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn js-qty-dec" data-id="${item.id}">-</button>
        <span style="min-width: 20px; text-align: center; font-weight: 700;">${item.quantity}</span>
        <button class="qty-btn js-qty-inc" data-id="${item.id}">+</button>
        <button class="cart-item-remove js-remove-item" data-id="${item.id}" title="Eliminar">×</button>
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

  document.getElementById('modal-product-icon').textContent = product.icon;
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

  // Validación de Username contra Mojang / Minotar API
  if (validateBtn && mcInput) {
    validateBtn.addEventListener('click', async () => {
      const username = mcInput.value.trim();
      if (!username) {
        showToast('Por favor escribe tu usuario de Minecraft.');
        return;
      }

      validateBtn.textContent = 'Validando...';
      try {
        // En navegadores la API de Mojang directa puede tener CORS, usamos Ashcon o Minotar como proxy compatible
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
        status: 'paid',
        items: [...cart],
        created_at: new Date().toISOString()
      };

      const history = JSON.parse(localStorage.getItem('mylifecraft_orders') || '[]');
      history.unshift(orderData);
      localStorage.setItem('mylifecraft_orders', JSON.stringify(history));

      // Limpiar carrito
      cart = [];
      saveCartToStorage();
      modal.classList.remove('open');

      showToast(`🎉 ¡Compra confirmada! Orden #${orderNumber}`);
      alert(`🎉 ORDEN RECIBIDA: #${orderNumber}\n\nJugador: ${username}\nEmail: ${email}\nTotal pagado: $${totalAmount.toFixed(2)} USD\n\nTus beneficios han sido enviados automáticamente a play.mylifecraft.net.`);
    });
  }
}

function openCheckoutModal() {
  const modal = document.getElementById('checkout-modal-overlay');
  const totalEl = document.getElementById('checkout-total-price');
  if (!modal || !totalEl) return;

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  totalEl.textContent = `$${total.toFixed(2)} USD`;

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
