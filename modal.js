/**
 * MERILIA — Pre-Save Modal Component
 * Modale universelle de pré-sauvegarde (Instagram / SMS) partagée entre les pages.
 * 
 * Inclus automatiquement :
 * - Les styles CSS isolés et animations (shake, fade, transitions fluides)
 * - La structure HTML du formulaire et de l'état de succès
 * - La bascule dynamique Instagram / SMS avec focus immédiat du curseur
 * - La soumission vers Google Apps Script
 * - La mémorisation de l'état validé jusqu'au rechargement de page (F5)
 * - L'API globale : window.openPreSaveModal(release) & window.closeModal()
 */

(function () {
  'use strict';

  // 1. Injection des styles CSS de la modale
  const MODAL_CSS = `
    /* ============================================
       MODALE PRE-SAVE UNIVERSELLE (MERILIA)
       ============================================ */
    .modal-ov {
      position: fixed;
      inset: 0;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0);
      pointer-events: none;
      transition: background .4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .modal-ov.active {
      background: rgba(0, 0, 0, 0.7);
      pointer-events: auto;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    .modal-card {
      width: 92%;
      max-width: 420px;
      background: var(--bg2, #0e0e12);
      border: 1px solid var(--card-border, rgba(255, 255, 255, 0.08));
      border-radius: 28px;
      padding: 32px 24px;
      transform: translate(-50%, -40%) scale(0.92);
      opacity: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transition: all .4s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.85);
      max-height: 90vh;
      overflow-y: auto;
      box-sizing: border-box;
    }

    .modal-ov.active .modal-card {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }

    .modal-card.keyboard-up {
      transform: translate(-50%, -65%) scale(1) !important;
    }

    .modal-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--silver-dim, rgba(192, 192, 204, 0.1));
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
    }

    .modal-icon svg {
      width: 22px;
      height: 22px;
      fill: none;
      stroke: var(--silver-bright, #eeeef4);
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .modal-title-text {
      font-size: 20px;
      font-weight: 800;
      color: #fff;
      margin-bottom: 6px;
      text-align: center;
      font-family: var(--font, sans-serif);
    }

    .modal-text {
      font-size: 13.5px;
      line-height: 1.5;
      color: var(--t2, rgba(240, 240, 248, 0.75));
      margin-bottom: 24px;
      text-align: center;
      font-family: var(--font, sans-serif);
    }

    .option-toggle {
      display: flex;
      background: rgba(255, 255, 255, 0.04);
      padding: 4px;
      border-radius: 14px;
      margin-bottom: 20px;
      border: 1px solid var(--card-border, rgba(255, 255, 255, 0.08));
    }

    .option-btn {
      flex: 1;
      padding: 10px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--t3, rgba(220, 220, 230, 0.45));
      cursor: pointer;
      border-radius: 10px;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      border: none;
      background: transparent;
      font-family: var(--font, sans-serif);
    }

    .option-btn.active {
      background: rgba(255, 255, 255, 0.12);
      color: var(--silver-bright, #eeeef4);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    .input-group {
      margin-bottom: 20px;
      text-align: left;
    }

    .input-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--t3, rgba(220, 220, 230, 0.45));
      margin-bottom: 8px;
      display: block;
      font-weight: 600;
      font-family: var(--font, sans-serif);
    }

    .handle-input-wrap {
      position: relative;
      width: 100%;
    }

    .handle-input {
      width: 100%;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--card-border, rgba(255, 255, 255, 0.08));
      border-radius: 14px;
      padding: 16px 16px 16px 36px;
      color: #fff;
      font-family: var(--font, sans-serif);
      font-size: 15px;
      outline: none;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      box-sizing: border-box;
    }

    .handle-input::placeholder {
      color: rgba(255, 255, 255, 0.25);
    }

    .handle-input:focus {
      border-color: var(--silver-bright, #eeeef4);
      background: rgba(255, 255, 255, 0.07);
      box-shadow: 0 0 15px var(--silver-glow, rgba(192, 192, 204, 0.25));
    }

    .at-prefix {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--t3, rgba(220, 220, 230, 0.45));
      font-weight: 600;
      pointer-events: none;
    }

    .handle-input.error-input {
      border-color: #ff4d4d !important;
      box-shadow: 0 0 15px rgba(255, 77, 77, 0.4) !important;
      background: rgba(255, 77, 77, 0.05);
    }

    .modal-card .cta-btn {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      max-width: 100%;
      padding: 18px 24px;
      font-family: var(--font, sans-serif);
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #060608;
      background: linear-gradient(135deg, #999, var(--silver-light, #e2e2ee), #fff, var(--silver-light, #e2e2ee), #999);
      background-size: 400% 400%;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      outline: none;
      overflow: hidden;
      transition: all .35s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 8px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.6);
    }

    .modal-card .cta-btn:hover {
      transform: translateY(-2px) scale(1.01);
    }

    .modal-card .cta-btn:active {
      transform: translateY(1px) scale(.98);
    }

    .success-state {
      display: none;
      text-align: center;
      padding: 16px 0;
    }

    .success-state h3 {
      font-size: 22px;
      margin-bottom: 10px;
      color: var(--silver-bright, #eeeef4);
      font-family: var(--font, sans-serif);
    }

    .success-state p {
      color: var(--t2, rgba(240, 240, 248, 0.75));
      font-size: 14px;
      line-height: 1.5;
      font-family: var(--font, sans-serif);
    }

    .success-icon {
      width: 58px;
      height: 58px;
      background: var(--silver-bright, #eeeef4);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      animation: scaleIn .5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }

    .success-icon svg {
      width: 30px;
      height: 30px;
      fill: none;
      stroke: var(--bg, #060608);
      stroke-width: 3;
    }

    .spotify-prompt {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid var(--card-border, rgba(255, 255, 255, 0.08));
      display: none;
    }

    .btn-spotify {
      background: linear-gradient(135deg, #1db954, #1ed760, #1db954) !important;
      color: #000 !important;
      box-shadow: 0 4px 20px rgba(29, 185, 84, 0.3) !important;
      margin-top: 10px;
    }

    .btn-later {
      background: transparent !important;
      border: 1px solid var(--card-border, rgba(255, 255, 255, 0.08)) !important;
      color: var(--t3, rgba(220, 220, 230, 0.45)) !important;
      box-shadow: none !important;
      margin-top: 8px;
      font-size: 11px !important;
      padding: 12px 20px !important;
      cursor: pointer;
      border-radius: 50px;
      font-family: var(--font, sans-serif);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .btn-later:hover {
      border-color: var(--t2, rgba(240, 240, 248, 0.75)) !important;
      color: var(--t2, rgba(240, 240, 248, 0.75)) !important;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-8px); }
      75% { transform: translateX(8px); }
    }
    @keyframes scaleIn {
      0% { transform: scale(0); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  // 2. Structure HTML de la modale
  const MODAL_HTML = `
    <div class="modal-ov" id="modal" role="dialog" aria-modal="true" aria-hidden="true">
      <div class="modal-card">
        <div class="modal-icon" id="modal-main-icon">
          <svg viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="var(--silver-bright, #eeeef4)" stroke="none" />
          </svg>
        </div>

        <div id="modal-content">
          <h3 class="modal-title-text" style="text-align: center;">Rejoindre la liste</h3>
          <p class="modal-text" id="modal-desc">
            Laisse ton Instagram ou numéro pour recevoir le lien de <strong>Accélère</strong> dès la sortie.
          </p>

          <div class="option-toggle">
            <button type="button" class="option-btn active" id="btn-mode-ig">Instagram</button>
            <button type="button" class="option-btn" id="btn-mode-sms">SMS</button>
          </div>

          <div class="input-group" id="ig-group">
            <label class="input-label">Ton Instagram</label>
            <div class="handle-input-wrap">
              <span class="at-prefix">@</span>
              <input type="text" id="handle-input" class="handle-input" placeholder="ton_pseudo" autocomplete="off"
                autocapitalize="none" autocorrect="off" spellcheck="false">
            </div>
          </div>

          <div class="input-group" id="phone-group" style="display: none;">
            <label class="input-label">Ton Numéro (FR)</label>
            <div class="handle-input-wrap">
              <input type="tel" id="phone-input" class="handle-input" placeholder="06 12 34 56 78" style="padding-left: 16px;">
            </div>
          </div>

          <button class="cta-btn" id="modal-submit-btn" type="button" style="max-width: 100%; width: 100%;">
            Confirmer la pre-save
          </button>
        </div>

        <div id="modal-success" class="success-state">
          <div class="success-icon">
            <svg viewBox="0 0 24 24">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h3>T'es bien inscrit(e) !</h3>
          <p id="success-message">Tu recevras le lien direct vers <strong>Accélère</strong> en avant-première dès sa sortie. 🔥</p>

          <div id="spotify-prompt" class="spotify-prompt">
            <p style="font-size: 13px; color: var(--t2, #ccc); margin-bottom: 14px;">Veux-tu aussi ajouter <strong class="modal-track-name">Accélère</strong> directement sur ton Spotify ?</p>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; width: 100%;">
              <button class="cta-btn btn-spotify" id="btn-spotify-presave" style="max-width: 100%; width: 100%;">Pre-save sur Spotify</button>
              <button class="cta-btn btn-later" id="btn-spotify-close">Fermer</button>
            </div>
          </div>

          <button class="cta-btn btn-later" id="btn-success-close" style="margin-top: 16px; display: none; width: 100%; max-width: 100%;">Fermer</button>
        </div>
      </div>
    </div>
  `;

  const ICONS = {
    ig: `<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="var(--silver-bright, #eeeef4)" stroke="none"/></svg>`,
    sms: `<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
  };

  const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbyKzkcj_uCQzfkTubH6LJ9H_Q67q0x4SKi_5qnlpc6QfKcIgbvPrnBgZvov7v9hyqm8/exec';

  let isBackdropClick = false;
  let isSubmitted = false;
  let currentMode = 'ig';
  let activeRelease = null;

  // Initialisation du DOM et des écouteurs
  function initPreSaveModal() {
    // 1. Injecter les styles s'ils ne sont pas déjà présents
    if (!document.getElementById('merilia-presave-modal-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'merilia-presave-modal-styles';
      styleEl.textContent = MODAL_CSS;
      document.head.appendChild(styleEl);
    }

    // 2. Injecter la modale si elle n'existe pas déjà
    let modal = document.getElementById('modal');
    if (!modal) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = MODAL_HTML.trim();
      modal = wrapper.firstElementChild;
      document.body.appendChild(modal);
    }

    // Éléments du DOM
    const card = modal.querySelector('.modal-card');
    const modalMainIcon = document.getElementById('modal-main-icon');
    const modalContent = document.getElementById('modal-content');
    const modalSuccess = document.getElementById('modal-success');
    const modalDesc = document.getElementById('modal-desc');
    const btnIg = document.getElementById('btn-mode-ig');
    const btnSms = document.getElementById('btn-mode-sms');
    const igGroup = document.getElementById('ig-group');
    const phoneGroup = document.getElementById('phone-group');
    const handleInput = document.getElementById('handle-input');
    const phoneInput = document.getElementById('phone-input');
    const modalSubmitBtn = document.getElementById('modal-submit-btn');
    const successMsg = document.getElementById('success-message');
    const spotifyPrompt = document.getElementById('spotify-prompt');
    const btnSpotifyPresave = document.getElementById('btn-spotify-presave');
    const btnSpotifyClose = document.getElementById('btn-spotify-close');
    const btnSuccessClose = document.getElementById('btn-success-close');

    // Récupérer le release par défaut (config.js si disponible)
    function resolveRelease(rel) {
      if (rel && typeof rel === 'object') return rel;
      if (typeof CONFIG !== 'undefined' && CONFIG.currentRelease) return CONFIG.currentRelease;
      return { title: 'Accélère', sheet: 'ACCELERE' };
    }

    function updateTextsForRelease(rel) {
      const title = rel.title || 'Accélère';
      if (currentMode === 'ig') {
        modalDesc.innerHTML = `Laisse ton Instagram pour recevoir le lien de <strong>${title}</strong> dès la sortie.`;
      } else {
        modalDesc.innerHTML = `Laisse ton numéro pour recevoir le rappel de <strong>${title}</strong> par SMS dès la sortie.`;
      }
      if (successMsg) {
        successMsg.innerHTML = `Tu recevras le lien direct vers <strong>${title}</strong> en avant-première dès sa sortie. 🔥`;
      }
      modal.querySelectorAll('.modal-track-name').forEach(el => el.textContent = title);
    }

    // Bascule Instagram
    btnIg.addEventListener('click', () => {
      currentMode = 'ig';
      btnIg.classList.add('active');
      btnSms.classList.remove('active');
      igGroup.style.display = 'block';
      phoneGroup.style.display = 'none';
      modalMainIcon.innerHTML = ICONS.ig;
      updateTextsForRelease(activeRelease || resolveRelease());
      handleInput.focus();
      const len = handleInput.value.length;
      handleInput.setSelectionRange?.(len, len);
    });

    // Bascule SMS
    btnSms.addEventListener('click', () => {
      currentMode = 'sms';
      btnIg.classList.remove('active');
      btnSms.classList.add('active');
      igGroup.style.display = 'none';
      phoneGroup.style.display = 'block';
      modalMainIcon.innerHTML = ICONS.sms;
      updateTextsForRelease(activeRelease || resolveRelease());
      phoneInput.focus();
      const len = phoneInput.value.length;
      phoneInput.setSelectionRange?.(len, len);
    });

    // Gestion des entrées texte
    [handleInput, phoneInput].forEach(inp => {
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          inp.blur();
          submitPreSave();
        }
      });

      inp.addEventListener('focus', () => {
        if (window.innerWidth < 640) card.classList.add('keyboard-up');
      });

      inp.addEventListener('blur', () => {
        card.classList.remove('keyboard-up');
      });

      inp.addEventListener('input', () => {
        inp.classList.remove('error-input');
      });
    });

    // Soumission du formulaire
    modalSubmitBtn.addEventListener('click', submitPreSave);

    function submitPreSave() {
      let value = '';
      const inputEl = currentMode === 'ig' ? handleInput : phoneInput;

      if (currentMode === 'ig') {
        value = handleInput.value.trim().toLowerCase().replace(/^@/, '');
      } else {
        const rawPhone = phoneInput.value.trim().replace(/[\s\-\.]/g, '');
        const phoneRegex = /^(?:(?:\+|00)33|0)[67]\d{8}$/;
        value = phoneRegex.test(rawPhone) ? rawPhone : '';
      }

      if (!value) {
        inputEl.classList.add('error-input');
        inputEl.focus();
        modalSubmitBtn.style.animation = 'shake 0.4s ease';
        setTimeout(() => modalSubmitBtn.style.animation = '', 400);
        return;
      }

      modalSubmitBtn.textContent = 'Envoi en cours...';
      modalSubmitBtn.style.opacity = '0.7';
      modalSubmitBtn.style.pointerEvents = 'none';

      const rel = activeRelease || resolveRelease();
      const sheetName = rel.sheet || (rel.id ? rel.id.toUpperCase() : (rel.title ? rel.title.toUpperCase() : 'ACCELERE'));

      const payload = {
        contact: value,
        method: currentMode,
        track: rel.title || 'Accélère',
        sheet: sheetName,
        date: new Date().toLocaleString()
      };

      if (SHEET_API_URL) {
        fetch(SHEET_API_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify(payload)
        }).catch(e => console.error('[PreSave API Error]', e));
      }

      setTimeout(() => {
        isSubmitted = true;
        modalMainIcon.style.display = 'none';
        modalContent.style.display = 'none';
        modalSuccess.style.display = 'block';

        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const isTikTok = /TikTok|ByteLocale/i.test(userAgent) || window.location.search.includes('tiktok');
        const showSpotify = Boolean(rel.showSpotifyPreSave) && !isTikTok;

        if (showSpotify && spotifyPrompt) {
          setTimeout(() => {
            spotifyPrompt.style.display = 'block';
            spotifyPrompt.style.animation = 'fadeIn .5s cubic-bezier(0.16, 1, 0.3, 1) both';

            if (btnSpotifyPresave) {
              btnSpotifyPresave.onclick = () => {
                const url = rel.spotifyPreSaveUrl || rel.preSaveUrl || 'https://spotify.openinapp.co/31xu3';
                window.open(url, '_blank');
                closeModal();
              };
            }
          }, 400);
        } else {
          if (spotifyPrompt) spotifyPrompt.style.display = 'none';
          if (btnSuccessClose) btnSuccessClose.style.display = 'block';
        }
      }, 600);
    }

    // Fermeture
    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      card.classList.remove('keyboard-up');
      isBackdropClick = false;
    }

    if (btnSuccessClose) btnSuccessClose.addEventListener('click', closeModal);
    if (btnSpotifyClose) btnSpotifyClose.addEventListener('click', closeModal);

    modal.addEventListener('mousedown', (e) => {
      if (e.target === modal) isBackdropClick = true;
    });

    modal.addEventListener('mouseup', (e) => {
      if (e.target === modal && isBackdropClick) closeModal();
      isBackdropClick = false;
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    // Ouverture publique de la modale
    window.openPreSaveModal = function (rel) {
      activeRelease = resolveRelease(rel);
      updateTextsForRelease(activeRelease);

      // Si l'utilisateur s'est déjà inscrit pendant cette session, maintenir l'écran de validation
      if (isSubmitted) {
        modalMainIcon.style.display = 'none';
        modalContent.style.display = 'none';
        modalSuccess.style.display = 'block';
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        return;
      }

      // Réinitialiser le formulaire
      currentMode = 'ig';
      btnIg.classList.add('active');
      btnSms.classList.remove('active');
      igGroup.style.display = 'block';
      phoneGroup.style.display = 'none';
      modalMainIcon.style.display = 'flex';
      modalMainIcon.innerHTML = ICONS.ig;
      modalContent.style.display = 'block';
      modalSuccess.style.display = 'none';
      handleInput.value = '';
      phoneInput.value = '';
      handleInput.classList.remove('error-input');
      phoneInput.classList.remove('error-input');
      modalSubmitBtn.textContent = 'Confirmer la pre-save';
      modalSubmitBtn.style.opacity = '';
      modalSubmitBtn.style.pointerEvents = '';

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');

      setTimeout(() => {
        if (!isSubmitted) {
          handleInput.focus();
          const len = handleInput.value.length;
          handleInput.setSelectionRange?.(len, len);
        }
      }, 350);
    };

    window.closeModal = closeModal;
    window.closePreSaveModal = closeModal;
  }

  // Initialisation dès que le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreSaveModal);
  } else {
    initPreSaveModal();
  }
})();
