// ============================================
// ⚙️ MERILIA CONFIGURATION
// Modifiez les valeurs ci-dessous pour chaque sortie.
// ============================================

const CONFIG = {
  artist: "MERILIA",

  // Nouveau single en pre-save ("Accélère")
  currentRelease: {
    title: "Accélère",
    badge: "NOUVEAU SINGLE - PRE-SAVE",
    cover: "cover_accelere.jpg",
    releaseDate: "2026-10-16T00:00:00",
    showSpotifyPreSave: false, // Afficher ou non l'option de pre-save Spotify après inscription (par défaut: false)
    spotifyPreSaveUrl: "",
    preSaveUrl: "",
    links: {
      spotify: "",
      spotify_ios: "",
      youtube: "",
      deezer: "",
      amazon: "",
      apple: "",
      tidal: "",
      qobuz: ""
    }
  },

  // Single précédent disponible à l'écoute ("Détail")
  previousRelease: {
    title: "Détail",
    badge: "DERNIER SINGLE DISPONIBLE",
    cover: "cover_detail.jpg",
    pageUrl: "detail.html",
    links: {
      spotify: "https://spotify.openinapp.co/jobgo",
      spotify_ios: "https://open.spotify.com/intl-fr/track/5mAttM1HkPnNVdEDfdYWfJ?si=3f9758e5b4834250",
      youtube: "https://youtube.openinapp.co/DETAIL",
      deezer: "https://deezer.openinapp.link/detail",
      amazon: "https://amzn.openinapp.link/6tv1d",
      apple: "https://applemusic.oia.bio/DETAIL-Applemusic",
      tidal: "https://tidal.openinapp.link/detail",
      qobuz: "https://qobuz.openinapp.link/DETAIL"
    }
  },

  // Single "Envie" (pour rétrocompatibilité des liens)
  envieRelease: {
    title: "Envie",
    badge: "SINGLE PRÉCÉDENT",
    cover: "cover_envie.jpg",
    pageUrl: "envie.html",
    links: {
      spotify: "https://spotify.openinapp.co/31xu3",
      spotify_ios: "https://open.spotify.com/intl-fr/track/0mNGJ5sdhPVdp7AQiwWz2y?si=33753fe9380c4f25",
      youtube: "https://yt.openinapp.co/c5d74",
      deezer: "https://openinapp.link/deezermeriliaenvie",
      amazon: "https://amzn.openinapp.link/ugxi2",
      apple: "https://applemusic.openinapp.co/od4mg",
      tidal: "https://openinapp.link/tidalenvie",
      qobuz: "https://openinapp.link/qobuz"
    }
  },

  socials: {
    instagram: "https://instagram.com/merilia_dnb",
    tiktok: "https://tiktok.com/@merilia_dnb"
  },

  // ============================================
  // 💿 DISCOGRAPHIE COMPLÈTE (Évolutive)
  // Le premier morceau avec `featured: true` (ou releases[0]) est mis en avant dans le Hero.
  // Les autres morceaux apparaissent automatiquement dans la section Discographie.
  // ============================================
  bio: "MERILIA évolue à la croisée de la pop et de la drum and bass. Inspirée par l’intensité de Mylène Farmer et l’énergie brute de la scène électro, elle façonne un univers aérien, dark et sensuel, où chaque morceau oscille entre vertige et apesanteur.",

  releases: [
    {
      id: "accelere",
      title: "Accélère",
      badge: "FUTURE SORTIE",
      cover: "cover_accelere.jpg",
      year: "2026",
      featured: true,
      status: "presave", // "presave" ou "available"
      releaseDate: "2026-10-16T00:00:00",
      pageUrl: "accelere.html",
      ctaLabel: "PRE-SAVE",
      links: {
        page: "accelere.html",
        spotify: "",
        youtube: "",
        deezer: "",
        apple: "",
        amazon: "",
        tidal: "",
        qobuz: ""
      }
    },
    {
      id: "detail",
      title: "Détail",
      badge: "SINGLE",
      cover: "cover_detail.jpg",
      year: "2026",
      featured: false,
      status: "available",
      pageUrl: "detail.html",
      ctaLabel: "ÉCOUTER",
      links: {
        page: "detail.html",
        spotify: "https://spotify.openinapp.co/jobgo",
        spotify_ios: "https://open.spotify.com/intl-fr/track/5mAttM1HkPnNVdEDfdYWfJ?si=3f9758e5b4834250",
        youtube: "https://youtube.openinapp.co/DETAIL",
        deezer: "https://deezer.openinapp.link/detail",
        amazon: "https://amzn.openinapp.link/6tv1d",
        apple: "https://applemusic.oia.bio/DETAIL-Applemusic",
        tidal: "https://tidal.openinapp.link/detail",
        qobuz: "https://qobuz.openinapp.link/DETAIL"
      }
    },
    {
      id: "envie",
      title: "Envie",
      badge: "SINGLE",
      cover: "cover_envie.jpg",
      year: "2026",
      featured: false,
      status: "available",
      pageUrl: "envie.html",
      ctaLabel: "ÉCOUTER",
      links: {
        page: "envie.html",
        spotify: "https://spotify.openinapp.co/31xu3",
        spotify_ios: "https://open.spotify.com/intl-fr/track/0mNGJ5sdhPVdp7AQiwWz2y?si=33753fe9380c4f25",
        youtube: "https://yt.openinapp.co/c5d74",
        deezer: "https://openinapp.link/deezermeriliaenvie",
        amazon: "https://amzn.openinapp.link/ugxi2",
        apple: "https://applemusic.openinapp.co/od4mg",
        tidal: "https://openinapp.link/tidalenvie",
        qobuz: "https://openinapp.link/qobuz"
      }
    }
  ],

  // Propriétés de rétrocompatibilité (conservées pour accelere.html, detail.html, envie.html)
  title: "Accélère",
  cover: "cover_accelere.jpg",
  links: {
    spotify: "https://spotify.openinapp.co/31xu3",
    spotify_ios: "https://open.spotify.com/intl-fr/track/0mNGJ5sdhPVdp7AQiwWz2y?si=33753fe9380c4f25",
    youtube: "https://yt.openinapp.co/c5d74",
    deezer: "https://openinapp.link/deezermeriliaenvie",
    amazon: "https://amzn.openinapp.link/ugxi2",
    apple: "https://applemusic.openinapp.co/od4mg",
    tidal: "https://openinapp.link/tidalenvie",
    qobuz: "https://openinapp.link/qobuz"
  }
};
