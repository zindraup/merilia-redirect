/**
 * MERILIA - Noyau partagé
 * Données des titres, icônes des plateformes et ouverture des liens d'écoute.
 * Chargé après config.js sur toutes les pages publiques : expose window.MERILIA.
 */
(function () {
  'use strict';

  const CONF = window.CONFIG || {};
  const ua = navigator.userAgent || navigator.vendor || window.opera || '';

  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isTikTok = /TikTok|ByteLocale|musical_ly/i.test(ua) || window.location.search.includes('tiktok');

  // ─── Icônes (une seule copie pour tout le site) ───────────────
  const ICONS = {
    spotify: '<svg viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.306c-.215.353-.674.464-1.027.249-2.863-1.748-6.467-2.144-10.712-1.173-.404.092-.81-.157-.903-.561-.092-.403.157-.809.561-.902 4.646-1.063 8.625-.615 11.832 1.34.353.215.464.674.249 1.027zm1.468-3.259c-.27.44-.847.579-1.287.308-3.277-2.014-8.273-2.597-12.149-1.42-.497.151-1.024-.131-1.174-.627-.151-.497.131-1.024.627-1.174 4.429-1.344 9.94-.693 13.676 1.605.44.271.579.848.308 1.288zm.139-3.391c-3.931-2.333-10.428-2.55-14.218-1.4c-.603.183-1.246-.168-1.429-.771-.183-.603.168-1.246.771-1.429 4.343-1.32 11.523-1.054 16.002 1.604.542.321.721 1.024.399 1.565-.321.543-1.024.722-1.565.401-.001 0-.001 0-.001 0z"/></svg>',
    apple: '<svg viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.82 1.11-1.96.99-3.1-.96.04-2.18.66-2.87 1.47-.61.71-1.15 1.87-1.01 2.99 1.09.08 2.22-.56 2.89-1.36z"/></svg>',
    appleNote: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>',
    youtube: '<svg viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>',
    deezer: '<svg viewBox="0 0 24 24"><path d="M19.125 15.656h4.875v3.469h-4.875v-3.469zm-6.375 0h4.875v3.469h-4.875v-3.469zm-6.375 0h4.875v3.469h-4.875v-3.469zm-6.375 0h4.875v3.469h-4.875v-3.469zm19.125-5.25h4.875v3.469h-4.875v-3.469zm-6.375 0h4.875v3.469h-4.875v-3.469zm-6.375 0h4.875v3.469h-4.875v-3.469zm-6.375 0h4.875v3.469h-4.875v-3.469zm19.125-5.25h4.875v3.469h-4.875v-3.469zm-6.375 0h4.875v3.469h-4.875v-3.469zm-6.375 10.5h4.875v3.469h-4.875v-3.469zm0-15.75h4.875v3.469h-4.875v-3.469zm-6.375 10.5h4.875v3.469h-4.875v-3.469z"/></svg>',
    amazon: '<svg viewBox="0 0 24 24"><text x="12" y="12.2" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="8.6" font-weight="800" letter-spacing="-0.2" stroke="none">music</text><path d="M3 15.2c5.4 3.6 12.6 3.6 18 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M17.6 13.9l3.6 1.1-1.4 3.4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    tidal: '<svg viewBox="0 0 24 24"><path d="M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996 4.004 12l4.004-4.004L12.012 12l-4.004 4.004 4.004 4.004 4.004-4.004L12.012 12l4.004-4.004-4.004-4.004zM16.042 7.996l3.979-3.979L24 7.996l-3.979 3.979z"/></svg>',
    qobuz: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>'
  };

  // Ordre d'affichage des plateformes
  const PLATFORMS = [
    { key: 'spotify', name: 'Spotify' },
    { key: 'apple', name: 'Apple Music' },
    { key: 'youtube', name: 'YouTube' },
    { key: 'deezer', name: 'Deezer' },
    { key: 'amazon', name: 'Amazon Music' },
    { key: 'tidal', name: 'Tidal' },
    { key: 'qobuz', name: 'Qobuz' }
  ];

  // ─── Données ─────────────────────────────────────────────────
  function time(rel) {
    const t = rel && rel.releaseDate ? new Date(rel.releaseDate).getTime() : NaN;
    return isNaN(t) ? null : t;
  }

  // Titres triés du plus récent au plus ancien (sans date = ancien titre)
  function releases() {
    return (CONF.releases || [])
      .map((r, i) => ({ r, i }))
      .sort((a, b) => {
        const ta = time(a.r), tb = time(b.r);
        if (ta === null && tb === null) return a.i - b.i;
        if (ta === null) return 1;
        if (tb === null) return -1;
        return tb - ta;
      })
      .map(x => x.r);
  }

  function isReleased(rel) {
    const t = time(rel);
    return t === null || Date.now() >= t;
  }

  function byId(id) {
    return (CONF.releases || []).find(r => r.id === id) || null;
  }

  function pageUrl(rel) {
    return `${rel.id}.html`;
  }

  function year(rel) {
    const t = time(rel);
    return t === null ? (rel.year || '') : String(new Date(t).getFullYear());
  }

  // Le titre mis en avant : le plus récent (même s'il est encore en pre-save)
  function featured() {
    return releases()[0] || null;
  }

  // ─── Liens d'écoute ──────────────────────────────────────────
  function cleanSpotify(url) {
    return url.replace(/\/intl-[a-z]{2}(-[a-z]{2})?\//i, '/');
  }

  // URL effective d'une plateforme (lien Spotify direct sur iOS)
  function linkFor(rel, key) {
    const links = (rel && rel.links) || {};
    if (key === 'spotify' && isIOS && links.spotify_ios) return cleanSpotify(links.spotify_ios);
    const url = links[key] || '';
    return url.trim();
  }

  function availablePlatforms(rel) {
    return PLATFORMS.filter(p => linkFor(rel, p.key));
  }

  /**
   * Ouvre une plateforme exactement comme la page Accélère (fonctionne sur
   * iPhone ET Android, y compris depuis les navigateurs intégrés) :
   * - Spotify sur iOS : navigation directe vers open.spotify.com (ouvre l'app)
   * - sinon : petit retour visuel puis window.open dans un nouvel onglet
   */
  function openPlatform(rel, key, el) {
    const url = linkFor(rel, key);
    if (!url) return;
    if (el) {
      if (el.classList.contains('success')) return;
      el.classList.add('success');
    }
    if (window.navigator.vibrate) window.navigator.vibrate(30);
    const reset = () => setTimeout(() => el && el.classList.remove('success'), 1000);

    if (key === 'spotify' && isIOS) {
      window.location.href = url;
      reset();
      return;
    }

    setTimeout(() => {
      window.open(url, '_blank');
      reset();
    }, 200);
  }

  // Branche un élément (lien, bouton, carte) sur openPlatform
  function bindPlatform(el, rel, key) {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openPlatform(rel, key, el);
    });
  }

  // ─── Utilitaires ─────────────────────────────────────────────
  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
    }
    return Promise.resolve(legacyCopy(text));
  }

  function legacyCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); } catch (err) { /* rien */ }
    document.body.removeChild(ta);
  }

  window.MERILIA = {
    config: CONF,
    artist: CONF.artist || 'MERILIA',
    isIOS,
    isTikTok,
    ICONS,
    PLATFORMS,
    releases,
    featured,
    byId,
    isReleased,
    releaseTime: time,
    pageUrl,
    year,
    linkFor,
    availablePlatforms,
    openPlatform,
    bindPlatform,
    esc,
    copyText
  };
})();
