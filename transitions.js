/**
 * MERILIA — Fluid Page Transitions Engine
 * Gère le fondu d'entrée, de sortie et le préchargement des images de fond.
 */
(function () {
  // 1. Préchargement en mémoire cache de toutes les covers pour éliminer les saccades
  const covers = ['cover_accelere.jpg', 'cover_detail.jpg', 'cover_envie.jpg'];
  covers.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // 2. Affichage fluide de la page (Entrée)
  function showPage() {
    requestAnimationFrame(() => {
      document.body.classList.remove('page-leaving');
      document.body.classList.add('page-loaded');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showPage);
  } else {
    showPage();
  }

  // Support du retour arrière / historique du navigateur (bfcache)
  window.addEventListener('pageshow', showPage);

  // 3. Transition fluide vers la page suivante (Sortie)
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Ignorer les liens externes, les ancres et les nouveaux onglets
    if (
      link.target === '_blank' ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:')
    ) {
      return;
    }

    // Déclencher le fondu de sortie avant de charger la page
    e.preventDefault();
    document.body.classList.remove('page-loaded');
    document.body.classList.add('page-leaving');

    setTimeout(function () {
      window.location.href = href;
    }, 220);
  });
})();
