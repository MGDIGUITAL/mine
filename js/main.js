/**
 * AETHERCRAFT NETWORK - MAIN INTERACTIVE LOGIC
 * Includes IP copying, Leaderboard tabs, FAQ Accordions, and Micro-animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initCopyIpButton();
  initLeaderboardTabs();
  initFaqAccordion();
  initBentoHoverGlow();
  initLivePlayerCounter();
});

/**
 * 1. Navbar blur/shadow effect on scroll
 */
function initNavbarScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * 2. Server IP Copy to Clipboard with Toast Notification & button feedback
 */
function initCopyIpButton() {
  const copyBtns = document.querySelectorAll('.js-copy-ip');
  const ipText = 'mc.aethercraft.net'; // Default customizable server IP
  const toast = document.getElementById('toast-notification');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(ipText);
        showToast(`¡IP copiada! Pega ${ipText} en tu Minecraft`);
        
        // Micro-animation feedback on button
        const originalText = btn.innerHTML;
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>¡Copiada!</span>`;
        btn.style.background = '#34d399';
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
        }, 2200);
      } catch (err) {
        showToast('Error al copiar. Dirección: ' + ipText);
      }
    });
  });

  function showToast(message) {
    if (!toast) return;
    const msgEl = toast.querySelector('.toast-message');
    if (msgEl) msgEl.textContent = message;
    
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
}

/**
 * 3. Dynamic Leaderboard Tabs (Top Kills, Riqueza, Tiempo Jugado)
 */
function initLeaderboardTabs() {
  const tabButtons = document.querySelectorAll('.js-leaderboard-tab');
  const tableBody = document.getElementById('leaderboard-body');
  if (!tabButtons.length || !tableBody) return;

  const leaderboardData = {
    kills: [
      { rank: 1, name: 'ShadowVortex', val: '14,892 Kills', clan: '[ÉLITE]', status: 'En Línea' },
      { rank: 2, name: 'Kira_Mc', val: '12,401 Kills', clan: '[WAR]', status: 'En Línea' },
      { rank: 3, name: 'Zentronix', val: '9,850 Kills', clan: '[AETHER]', status: 'Desconectado' },
      { rank: 4, name: 'PauPau_99', val: '8,120 Kills', clan: '[WAR]', status: 'En Línea' },
      { rank: 5, name: 'LordTitan', val: '7,440 Kills', clan: '[SOLO]', status: 'En Línea' }
    ],
    economy: [
      { rank: 1, name: 'AetherKing', val: '$2,450,000 USDm', clan: '[BANCO]', status: 'En Línea' },
      { rank: 2, name: 'ShadowVortex', val: '$1,890,500 USDm', clan: '[ÉLITE]', status: 'En Línea' },
      { rank: 3, name: 'DiamondHunter', val: '$1,200,000 USDm', clan: '[MINER]', status: 'En Línea' },
      { rank: 4, name: 'Kira_Mc', val: '$980,000 USDm', clan: '[WAR]', status: 'En Línea' },
      { rank: 5, name: 'RedstoneGod', val: '$745,000 USDm', clan: '[TECH]', status: 'Desconectado' }
    ],
    time: [
      { rank: 1, name: 'Zentronix', val: '1,420 Horas', clan: '[AETHER]', status: 'Desconectado' },
      { rank: 2, name: 'LordTitan', val: '1,190 Horas', clan: '[SOLO]', status: 'En Línea' },
      { rank: 3, name: 'ShadowVortex', val: '980 Horas', clan: '[ÉLITE]', status: 'En Línea' },
      { rank: 4, name: 'MysticMage', val: '865 Horas', clan: '[MAGIC]', status: 'En Línea' },
      { rank: 5, name: 'Kira_Mc', val: '810 Horas', clan: '[WAR]', status: 'En Línea' }
    ]
  };

  function renderTable(type) {
    const data = leaderboardData[type] || leaderboardData.kills;
    tableBody.innerHTML = data.map(item => `
      <tr>
        <td>
          <span class="rank-badge rank-${item.rank}">${item.rank}</span>
        </td>
        <td>
          <div class="player-info">
            <div class="player-avatar" style="background-image: url('https://minotar.net/avatar/${item.name}/36.png'); background-size: cover;"></div>
            <div>
              <strong>${item.name}</strong>
              <span style="color: var(--text-muted); font-size: 0.8rem; margin-left: 0.4rem;">${item.clan}</span>
            </div>
          </div>
        </td>
        <td style="color: var(--accent-emerald); font-weight: 700;">${item.val}</td>
        <td>
          <span style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: ${item.status === 'En Línea' ? '#10b981' : '#64748b'};">
            <span style="width: 6px; height: 6px; border-radius: 50%; background: currentColor;"></span>
            ${item.status}
          </span>
        </td>
      </tr>
    `).join('');
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tabType = btn.getAttribute('data-tab');
      renderTable(tabType);
    });
  });

  // Render default table
  renderTable('kills');
}

/**
 * 4. FAQ Accordion behavior
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all others
      faqItems.forEach(el => {
        el.classList.remove('active');
        const ans = el.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/**
 * 5. Bento Card Mouse-tracking Radial Glow
 */
function initBentoHoverGlow() {
  const cards = document.querySelectorAll('.bento-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * 6. Simulate slight variation in live online players to give a dynamic feel
 */
function initLivePlayerCounter() {
  const counterEl = document.getElementById('live-player-count');
  if (!counterEl) return;

  let baseCount = 1248;
  setInterval(() => {
    const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
    baseCount = Math.max(1200, Math.min(1350, baseCount + delta));
    counterEl.textContent = baseCount.toLocaleString('es-ES');
  }, 4000);
}
