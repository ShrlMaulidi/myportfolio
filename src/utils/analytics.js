// Umami analytics: tanpa cookie, ringan, dan otomatis melacak perpindahan halaman SPA.
// Aktif hanya kalau VITE_UMAMI_WEBSITE_ID diisi (di .env.production), jadi tidak jalan saat development.
export function initAnalytics() {
  const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;
  if (!websiteId || typeof document === 'undefined') return;

  const script = document.createElement('script');
  script.defer = true;
  script.src = import.meta.env.VITE_UMAMI_SRC || 'https://cloud.umami.is/script.js';
  script.dataset.websiteId = websiteId;
  script.dataset.domains = 'sahrulmaulidi.online';
  document.head.appendChild(script);
}

// Catat event khusus, contoh: trackEvent('download-cv', { from: 'beranda' })
export function trackEvent(name, data) {
  try {
    window.umami?.track(name, data);
  } catch {
    // analytics tidak boleh mengganggu website
  }
}
