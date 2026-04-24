const CACHE_STATIC = "fendy-static-v2.4";
const CACHE_DYNAMIC = "fendy-dynamic-v2.4";

const STATIC_FILES = [
  "/",
  "/index.html",
  "/manifest.json",
  "/logo.png",
  "/bg.jpg",
  "/kategori.csv",
  "/brand.csv",
  "/produk.csv",
  
  // 🔴 TAMBAHAN IKLAN
  "/iklan1.jpg",
  "/iklan2.jpg",
  "/iklan3.jpg",
  "/iklan4.jpg",
  "/iklan5.jpg",
  "/iklan6.jpg",
  "/iklan7.jpg",
  "/iklan8.jpg",
  "/iklan9.jpg",
  "/iklan10.jpg",
  "/iklan11.jpg",
  "/iklan12.jpg",
  "/iklan13.jpg",
  "/iklan14.jpg",
  "/iklan15.jpg",
];

// ================= INSTALL =================
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then(cache => cache.addAll(STATIC_FILES))
  );
  self.skipWaiting();
});

// ================= ACTIVATE =================
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_STATIC && key !== CACHE_DYNAMIC) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// ================= FETCH =================
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(res => {
        return caches.open(CACHE_DYNAMIC).then(cache => {
          cache.put(event.request, res.clone());
          return res;
        });
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

// ================= MESSAGE (AUTO UPDATE) =================
self.addEventListener("message", event => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});