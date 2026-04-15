const CACHE_NAME = 'davincii-card-v8';
const ASSETS = [
  '/davincii-card/',
  '/davincii-card/index.html',
  '/davincii-card/manifest.json',
  '/davincii-card/icons/icon-192.png',
  '/davincii-card/icons/icon-512.png',
  '/davincii-card/Anand_Sompura_DaVincii.vcf'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
