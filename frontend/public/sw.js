const CACHE_VERSION = "mvw-v1";
const STATIC_CACHE = "mvw-static-v1";
const PAGES_CACHE = "mvw-pages-v1";

const PRECACHE_URLS = [
  '/new',
  '/documents',
  '/templates',
  '/settings',
  '/offline',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PAGES_CACHE).then((cache) => {
      // precache, ignoring individual failures
      return Promise.allSettled(PRECACHE_URLS.map(url => cache.add(url)));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== PAGES_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  if (request.method !== 'GET') return;
  
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return;
  
  // Static assets (Cache first, then network)
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.ico')
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        
        return fetch(request).then((networkResponse) => {
          if (networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, responseToCache));
          }
          return networkResponse;
        }).catch(() => new Response('', { status: 404 }));
      })
    );
    return;
  }
  
  // Page navigations (Stale-while-revalidate)
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const networkFetch = fetch(request).then((networkResponse) => {
          if (networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(PAGES_CACHE).then((cache) => cache.put(request, responseToCache));
          }
          return networkResponse;
        }).catch(async () => {
          if (!cachedResponse) {
            const cache = await caches.open(PAGES_CACHE);
            return cache.match('/offline') || new Response("Offline", { status: 503 });
          }
          return cachedResponse;
        });
        
        return cachedResponse || networkFetch;
      })
    );
    return;
  }

  // RSC / data requests (Network first with short timeout, then cache)
  if (request.headers.get('RSC') === '1' || url.searchParams.has('_rsc')) {
    event.respondWith(
      new Promise((resolve) => {
        const timeoutId = setTimeout(() => {
          caches.match(request).then((res) => {
            if (res) resolve(res);
          });
        }, 3000);

        fetch(request).then((networkResponse) => {
          clearTimeout(timeoutId);
          if (networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(PAGES_CACHE).then((cache) => cache.put(request, responseToCache));
          }
          resolve(networkResponse);
        }).catch(() => {
          clearTimeout(timeoutId);
          caches.match(request).then((res) => {
            if (res) resolve(res);
            else resolve(new Response('', { status: 503 }));
          });
        });
      })
    );
    return;
  }

});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
