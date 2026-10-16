/**
 * MERILIA - Page titre (gabarit unique)
 * Chaque page <titre>.html contient <body data-release="id"> et charge ce script.
 * - Avant la date de sortie : compte à rebours + pre-save (modal.js)
 * - À 0 : la page bascule toute seule sur les liens d'écoute
 * - En dessous : redirections vers les autres titres (depuis config.js)
 */
(function () {
  'use strict';

  const M = window.MERILIA;
  const esc = M.esc;
  const ICONS = M.ICONS;
  const MAX_OTHER_CARDS = 3; // au-delà, le lien "Site Officiel & Discographie" prend le relais

  const releaseId = document.body.dataset.release;
  const root = document.getElementById('release-root');
  let countdownTimer = null;

  function arrowSvg(size) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
  }

  function divider(label) {
    return `
      <div class="section-divider">
        <div class="line"></div>
        <span class="badge">${esc(label)}</span>
        <div class="line"></div>
      </div>`;
  }

  // ─── HERO ────────────────────────────────────────────────────
  function heroHtml(rel, released) {
    const cover = `
      <div class="cover-circle">
        <img src="${esc(rel.cover)}" alt="${esc(M.artist)} - ${esc(rel.title)}" id="cover-img">
      </div>
      <h1 class="artist-name" id="artist-name">${esc(M.artist)}</h1>
      <p class="track-title" id="track-title">${esc(rel.title)}</p>`;

    if (!released) {
      return `
        <div class="release-badge" id="release-badge"><span>NOUVEAU SINGLE - PRE-SAVE</span></div>
        ${cover}
        <p class="headline">DISPONIBLE DANS</p>
        <div class="countdown" id="countdown" aria-live="polite">
          ${['d', 'h', 'm', 's'].map((k, i) => `
            ${i ? '<span class="cd-sep">:</span>' : ''}
            <div class="cd-unit">
              <div class="cd-box"><span class="cd-val" id="cd-${k}">--</span></div>
              <span class="cd-label">${{ d: 'Jours', h: 'Heures', m: 'Minutes', s: 'Secondes' }[k]}</span>
            </div>`).join('')}
        </div>
        <div class="cta-wrap">
          <button class="cta-btn" id="cta-btn" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>PRÉ-SAUVEGARDER "${esc(rel.title.toUpperCase())}"</span>
          </button>
        </div>`;
    }

    const order = ['spotify', 'apple', 'youtube', 'deezer', 'tidal', 'qobuz', 'amazon'];
    const platforms = order
      .map(k => M.PLATFORMS.find(p => p.key === k))
      .filter(p => M.linkFor(rel, p.key));
    const list = platforms.length
      ? `<div class="platform-list">
          ${platforms.map(p => `
            <div class="platform-item" data-platform="${p.key}" id="btn-${p.key}" role="button" tabindex="0" aria-label="Écouter sur ${p.name}" style="cursor:pointer;">
              <div class="platform-icon-box">
                <div class="platform-icon">
                  ${p.key === 'apple' ? ICONS.appleNote : ICONS[p.key]}
                </div>
              </div>
              <div class="platform-name">${p.name}</div>
              <span class="platform-item-action">ÉCOUTER</span>
            </div>`).join('')}
        </div>`
      : `<p class="links-pending">Le titre vient de sortir 🔥<br>Les liens d'écoute arrivent dans quelques instants.</p>`;

    return `
      ${cover}
      <p class="headline">ÉCOUTER MAINTENANT</p>
      ${list}`;
  }

  // ─── AUTRES TITRES ───────────────────────────────────────────
  function promoCardHtml(other) {
    const upcoming = !M.isReleased(other);
    return `
      <a href="${esc(M.pageUrl(other))}" class="promo-card" aria-label="Découvrir ${esc(other.title)}">
        <div class="promo-header">
          <div class="promo-cover-thumb">
            <img src="${esc(other.cover)}" alt="${esc(M.artist)} - ${esc(other.title)}">
          </div>
          <div class="promo-info">
            <span class="promo-tag">${upcoming ? 'BIENTÔT DISPONIBLE' : 'NOUVEAU SINGLE'}</span>
            <h2 class="promo-title">${esc(other.title)}</h2>
            <p class="promo-subtitle">${esc(M.artist)}</p>
          </div>
        </div>
        <div class="promo-btn">${upcoming ? 'PRE-SAVE' : 'ÉCOUTER'}</div>
      </a>`;
  }

  function previousCardHtml(other) {
    const pills = ['spotify', 'youtube', 'deezer', 'apple']
      .filter(k => M.linkFor(other, k))
      .map(k => {
        const p = M.PLATFORMS.find(x => x.key === k);
        const icon = k === 'apple'
          ? ICONS.appleNote.replace('stroke-width="2.5"', 'stroke-width="2.2"')
          : ICONS[k];
        return `
          <a href="${esc(M.linkFor(other, k))}" target="_blank" class="platform-pill" data-platform="${k}" data-release="${esc(other.id)}">
            <div class="platform-pill-icon">${icon}</div>
            <span class="platform-pill-name">${p.name}</span>
            <span class="platform-pill-action">ÉCOUTER</span>
          </a>`;
      }).join('');

    return `
      <section class="previous-release-card" aria-label="Écouter le titre ${esc(other.title)}">
        <a href="${esc(M.pageUrl(other))}" class="prev-header-link" title="Ouvrir la page du titre ${esc(other.title)}">
          <div class="prev-cover-thumb">
            <img src="${esc(other.cover)}" alt="${esc(M.artist)} - ${esc(other.title)}">
          </div>
          <div class="prev-info">
            <span class="prev-tag">SINGLE</span>
            <h2 class="prev-title">${esc(other.title)}</h2>
            <p class="prev-subtitle">${esc(M.artist)}</p>
          </div>
          <div class="prev-action-btn">
            <span>PAGE</span>
            ${arrowSvg(12)}
          </div>
        </a>
        ${pills ? `<div class="prev-platforms-grid">${pills}</div>` : ''}
      </section>`;
  }

  function othersHtml(rel, released) {
    const all = M.releases(); // du plus récent au plus ancien
    const myIndex = all.findIndex(r => r.id === rel.id);
    let html = '';

    // 1. Le titre le plus récent du site (si ce n'est pas celui-ci) → carte promo en haut
    const newest = myIndex > 0 ? all[0] : null;
    if (newest) {
      html += divider(M.isReleased(newest) ? 'NOUVEAU SINGLE' : 'PROCHAIN SINGLE') + promoCardHtml(newest);
    }

    // 2. Les autres titres déjà sortis → cartes avec liens d'écoute directs
    const previous = all
      .filter(r => r.id !== rel.id && r !== newest && M.isReleased(r))
      .slice(0, MAX_OTHER_CARDS);

    let firstOlder = true;
    previous.forEach(r => {
      let label = 'AUTRE SINGLE';
      if (!released && r === previous[0]) {
        label = `EN ATTENDANT "${rel.title.toUpperCase()}"`;
      } else if (firstOlder && all.indexOf(r) > myIndex) {
        label = 'SINGLE PRÉCÉDENT';
        firstOlder = false;
      }
      html += divider(label) + previousCardHtml(r);
    });

    return html;
  }

  function footerHtml() {
    const s = M.config.socials || {};
    return `
      <a href="index.html" class="site-link-card" aria-label="Visiter le site officiel de ${esc(M.artist)}">
        <span>Site Officiel &amp; Discographie</span>
        ${arrowSvg(14)}
      </a>

      <footer class="footer">
        <div class="social-links">
          ${s.instagram ? `<a href="${esc(s.instagram)}" class="social-link" target="_blank" rel="noopener" aria-label="Instagram">
            <svg class="social-icon" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>` : ''}
          ${s.tiktok ? `<a href="${esc(s.tiktok)}" class="social-link" target="_blank" rel="noopener" aria-label="TikTok">
            <svg class="social-icon" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.36-.54.38-.89.98-1.03 1.64-.14.65-.01 1.34.33 1.91.43.72 1.21 1.2 2.04 1.24.89.07 1.83-.23 2.45-.88.6-.61.85-1.48.83-2.33-.03-4.75-.01-9.51-.02-14.26z"/></svg>
          </a>` : ''}
        </div>
      </footer>`;
  }

  // ─── COMPORTEMENTS ───────────────────────────────────────────
  function bindPlatformList(rel) {
    root.querySelectorAll('.platform-item').forEach(btn => {
      const key = btn.dataset.platform;
      btn.addEventListener('click', () => M.openPlatform(rel, key, btn));
      btn.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          M.openPlatform(rel, key, btn);
        }
      });
      // Glisser vers la droite = écouter (comme avant)
      let startX = 0;
      btn.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
      btn.addEventListener('touchmove', e => {
        if (e.touches[0].clientX - startX > 70) M.openPlatform(rel, key, btn);
      }, { passive: true });
    });

    root.querySelectorAll('.platform-pill').forEach(pill => {
      const other = M.byId(pill.dataset.release);
      if (other) M.bindPlatform(pill, other, pill.dataset.platform);
    });
  }

  // Masque "ÉCOUTER" quand la place manque
  function updateActionVisibility() {
    root.querySelectorAll('.platform-item').forEach(item => {
      const nameEl = item.querySelector('.platform-name');
      const actionEl = item.querySelector('.platform-item-action');
      const iconBox = item.querySelector('.platform-icon-box');
      if (!nameEl || !actionEl) return;
      const cs = iconBox ? getComputedStyle(iconBox) : null;
      const iconW = iconBox ? iconBox.offsetWidth + parseInt(cs.marginLeft) + parseInt(cs.marginRight) : 90;
      const available = item.clientWidth - iconW;
      item.classList.toggle('hide-action', available < nameEl.scrollWidth + actionEl.scrollWidth + 28 + 16 + 8);
    });
    root.querySelectorAll('.platform-pill').forEach(pill => {
      pill.classList.toggle('hide-action', pill.clientWidth < 135);
    });
  }

  function startCountdown(rel) {
    const target = M.releaseTime(rel);
    const els = { d: 'cd-d', h: 'cd-h', m: 'cd-m', s: 'cd-s' };
    Object.keys(els).forEach(k => { els[k] = document.getElementById(els[k]); });
    const prev = {};

    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        clearInterval(countdownTimer);
        render(); // bascule automatique sur les liens d'écoute
        return;
      }
      const vals = {
        d: String(Math.floor(diff / 864e5)).padStart(2, '0'),
        h: String(Math.floor((diff % 864e5) / 36e5)).padStart(2, '0'),
        m: String(Math.floor((diff % 36e5) / 6e4)).padStart(2, '0'),
        s: String(Math.floor((diff % 6e4) / 1e3)).padStart(2, '0')
      };
      for (const k in vals) {
        if (vals[k] !== prev[k]) {
          els[k].textContent = vals[k];
          els[k].classList.remove('tick');
          void els[k].offsetWidth;
          els[k].classList.add('tick');
          prev[k] = vals[k];
        }
      }
    }

    tick();
    countdownTimer = setInterval(tick, 1000);
  }

  function bindPreSave(rel) {
    const ctaBtn = document.getElementById('cta-btn');
    if (!ctaBtn) return;
    ctaBtn.addEventListener('click', function (e) {
      const r = document.createElement('span');
      r.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const sz = Math.max(rect.width, rect.height);
      r.style.width = r.style.height = sz + 'px';
      r.style.left = (e.clientX - rect.left - sz / 2) + 'px';
      r.style.top = (e.clientY - rect.top - sz / 2) + 'px';
      this.appendChild(r);
      r.addEventListener('animationend', () => r.remove());
      setTimeout(() => { if (window.openPreSaveModal) window.openPreSaveModal(rel); }, 120);
    });
  }

  // ─── MODALE TIKTOK ───────────────────────────────────────────
  function setupTikTok(rel, released) {
    if (!M.isTikTok) return;
    const ttModal = document.getElementById('tt-modal');
    if (!ttModal) return;
    const full = `${M.artist.toUpperCase()} - ${rel.title}`;
    document.getElementById('tt-modal-heading').textContent = released ? 'Prêt à écouter ' : 'Prêt(e) pour ';
    document.getElementById('tt-track-name-title').textContent = `'${rel.title}'`;
    document.getElementById('tt-track-display').textContent = full;

    if (ttModal.dataset.bound) return;
    ttModal.dataset.bound = '1';

    const close = () => {
      ttModal.classList.remove('active');
      ttModal.setAttribute('aria-hidden', 'true');
    };
    setTimeout(() => {
      ttModal.classList.add('active');
      ttModal.setAttribute('aria-hidden', 'false');
    }, 800);

    document.getElementById('tt-modal-close').addEventListener('click', close);
    ttModal.addEventListener('click', e => { if (e.target === ttModal) close(); });

    const copyBtn = document.getElementById('tt-copy-btn');
    const copyText = document.getElementById('tt-copy-text');
    copyBtn.addEventListener('click', () => {
      M.copyText(full).then(() => {
        copyBtn.classList.add('copied');
        copyText.textContent = 'Copié ! ✅';
        if (window.navigator.vibrate) window.navigator.vibrate([40, 40]);
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyText.textContent = 'Copier le titre';
        }, 3000);
      });
    });
  }

  // ─── RENDU ───────────────────────────────────────────────────
  function render() {
    const rel = M.byId(releaseId);
    if (!rel) {
      window.location.replace('index.html');
      return;
    }

    const released = M.isReleased(rel);
    document.title = `${M.artist} - ${rel.title} | ${released ? 'Écouter maintenant' : 'Pre-Save Single'}`;
    root.classList.toggle('is-upcoming', !released);
    root.innerHTML = heroHtml(rel, released) + othersHtml(rel, released) + footerHtml();

    bindPlatformList(rel);
    if (!released) {
      bindPreSave(rel);
      startCountdown(rel);
    }
    setupTikTok(rel, released);
    setTimeout(updateActionVisibility, 200);
  }

  window.addEventListener('resize', updateActionVisibility);
  render();
})();
