const CACHE_NAME = "orleans-direct-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./assets/css/styles.css",
  "./assets/js/theme-init.js",
  "./assets/js/main.js",
  "./assets/js/scrollreveal.min.js",
  "./assets/vendor/remixicon/fonts/remixicon.css",
  "./assets/vendor/remixicon/fonts/remixicon.woff2",
  "./assets/img/favicon/site.webmanifest",
  "./assets/img/favicon/favicon-32x32.png",
  "./assets/img/favicon/favicon-16x16.png",
  "./assets/img/favicon/apple-touch-icon.png",
  "./assets/img/favicon/android-chrome-192x192.png",
  "./assets/img/favicon/android-chrome-512x512.png",
  "./assets/img/cropped-logo-blue.png",
  "./assets/img/cropped-logo-white.png",
  "./assets/img/delivery-made-simple.png",
  "./assets/img/process-payment.png",
  "./assets/img/service-001.png",
  "./assets/img/service-002.png",
  "./assets/img/service-003.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      ),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then((networkResponse) => {
        if (
          !networkResponse ||
          networkResponse.status !== 200 ||
          networkResponse.type !== "basic"
        ) {
          return networkResponse;
        }

        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });

        return networkResponse;
      });
    }),
  );
});
