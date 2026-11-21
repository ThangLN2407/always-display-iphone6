var CACHE_NAME = 'standby-6s-v5';
var STATIC_ASSETS = [
  './',
  './index.html',
  './styles.css?v=5',
  './lunar.js?v=5',
  './app.js?v=5',
  './manifest.json?v=5',
  './icon.svg',
  './apple-touch-icon.png',
  './nosleep.mp4',
  './fonts/bvp-400-vn.woff2',
  './fonts/bvp-400-le.woff2',
  './fonts/bvp-400-lat.woff2',
  './fonts/bvp-500-vn.woff2',
  './fonts/bvp-500-le.woff2',
  './fonts/bvp-500-lat.woff2',
  './fonts/bvp-600-vn.woff2',
  './fonts/bvp-600-le.woff2',
  './fonts/bvp-600-lat.woff2',
  './fonts/bvp-700-vn.woff2',
  './fonts/bvp-700-le.woff2',
  './fonts/bvp-700-lat.woff2'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(STATIC_ASSETS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;

  var url = new URL(req.url);
  if (url.hostname.indexOf('open-meteo.com') !== -1) {
    event.respondWith(fetch(req));
    return;
  }

  // Fonts, icons & silent keep-awake video: Cache-first (immutable)
  if (
    url.pathname.indexOf('/fonts/') !== -1 ||
    url.pathname.indexOf('.svg') !== -1 ||
    url.pathname.indexOf('.png') !== -1 ||
    url.pathname.indexOf('.mp4') !== -1
  ) {
    event.respondWith(
      caches.match(req).then(function (cached) {
        if (cached) return cached;
        return fetch(req).then(function (res) {
          if (res && res.status === 200 && res.type === 'basic') {
            var clone = res.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(req, clone);
            });
          }
          return res;
        });
      })
    );
    return;
  }

  // App shell (HTML/CSS/JS): Network-first bypassing HTTP cache with offline fallback
  event.respondWith(
    fetch(req, { cache: 'no-cache' })
      .then(function (res) {
        if (res && res.status === 200 && res.type === 'basic') {
          var clone = res.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(req, clone);
          });
        }
        return res;
      })
      .catch(function () {
        return caches.match(req);
      })
  );
});
