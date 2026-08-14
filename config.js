// ============================================
// ⚙️ MERILIA CONFIGURATION
// Modifiez les valeurs ci-dessous pour chaque sortie.
// ============================================

const CONFIG = {
  artist: "MERILIA",

  // Nouveau single ("Détail")
  currentRelease: {
    title: "Détail",
    badge: "NOUVEAU SINGLE - PRE-SAVE",
    cover: "cover_detail.jpg",
    releaseDate: "2026-08-15T00:00:00",
    showSpotifyPreSave: false, // Afficher ou non l'option de pre-save Spotify après que l'utilisateur a rejoint la liste (par défaut: false)
    spotifyPreSaveUrl: "https://spotify.openinapp.co/31xu3",
    preSaveUrl: "https://spotify.openinapp.co/31xu3",
    spotifyIosUrl: "https://spotify.openinapp.co/5argt",
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

  // Titre précédent disponible à l'écoute ("Envie")
  previousRelease: {
    title: "Envie",
    badge: "SINGLE PRÉCÉDENT",
    cover: "cover_envie.jpg",
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

  // Propriétés de rétrocompatibilité
  title: "Détail",
  cover: "cover_detail.jpg",
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
