const CACHE_NAME = 'health-track-v2';
const STATIC_CACHE = 'health-track-static-v2';
const DYNAMIC_CACHE = 'health-track-dynamic-v2';
const OFFLINE_PAGE = '/offline.html';

// Assets to cache immediately on service worker install
const STATIC_ASSETS = [
  '/',
  '/dashboard',
  '/css/style.css',
  '/main.js',
  '/img/favicon.png',
  '/manifest.json',
  '/offline.html', // Fallback offline page
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js'
];

// URLs that should never be cached
const NEVER_CACHE = [
  '/auth/',
  '/auth/google',
  '/auth/google/callback',
  '/auth/logout',
  '/auth/status',
  '/debug'
];

// Install service worker and cache static assets
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing Service Worker...');
  
  // Skip waiting to ensure the new service worker activates immediately
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[Service Worker] Pre-caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch(error => {
        console.error('[Service Worker] Installation failed:', error);
      })
  );
});

// Activate and clean up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating Service Worker...');
  
  // Claim clients to ensure the service worker controls all pages immediately
  event.waitUntil(self.clients.claim());
  
  // Clean up old caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (
            cacheName !== STATIC_CACHE && 
            cacheName !== DYNAMIC_CACHE
          ) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Helper function to check if a URL should be cached
function shouldCache(url) {
  // Don't cache auth-related URLs
  for (const pattern of NEVER_CACHE) {
    if (url.includes(pattern)) {
      return false;
    }
  }
  
  // Don't cache query parameters (often used for authentication)
  if (url.includes('?')) {
    return false;
  }
  
  return true;
}

// Serve cached content when offline
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Handle same-origin requests
  if (url.origin === self.origin) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          // Cache hit - return response
          if (response) {
            return response;
          }
          
          // Make network request
          return fetch(request)
            .then(networkResponse => {
              // Check if valid response
              if (!networkResponse || networkResponse.status !== 200) {
                return networkResponse;
              }
              
              // Clone the response for caching
              const responseToCache = networkResponse.clone();
              
              // Cache the response if appropriate
              if (shouldCache(request.url)) {
                caches.open(DYNAMIC_CACHE)
                  .then(cache => {
                    cache.put(request, responseToCache);
                  })
                  .catch(error => {
                    console.error('[Service Worker] Dynamic caching failed:', error);
                  });
              }
              
              return networkResponse;
            })
            .catch(error => {
              console.log('[Service Worker] Fetch failed:', error);
              
              // For navigation requests, return the offline page
              if (request.mode === 'navigate') {
                return caches.match(OFFLINE_PAGE);
              }
              
              // For image requests, you could return a placeholder image
              // if (request.destination === 'image') {
              //   return caches.match('/img/offline-image.png');
              // }
              
              // Otherwise, just propagate the error
              throw error;
            });
        })
    );
  } else {
    // For cross-origin requests, try network first, then cache
    event.respondWith(
      fetch(request)
        .then(response => {
          // If the response is valid, clone and cache it
          if (response && response.status === 200 && shouldCache(request.url)) {
            const responseToCache = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then(cache => {
                cache.put(request, responseToCache);
              })
              .catch(error => {
                console.error('[Service Worker] Cross-origin caching failed:', error);
              });
          }
          return response;
        })
        .catch(error => {
          // If network fails, try to serve from cache
          console.log('[Service Worker] Cross-origin fetch failed:', error);
          return caches.match(request);
        })
    );
  }
});

// Handle service worker messages
self.addEventListener('message', event => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

// Create a simple offline page if it doesn't exist
self.addEventListener('install', event => {
  event.waitUntil(
    fetch('/offline.html')
      .catch(() => {
        // If offline.html doesn't exist, create it
        return caches.open(STATIC_CACHE)
          .then(cache => {
            const offlineHtml = `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>HealthTrack - Offline</title>
                <style>
                  body {
                    font-family: 'Inter', sans-serif;
                    margin: 0;
                    padding: 20px;
                    text-align: center;
                    background-color: #f5f5f5;
                    color: #333;
                  }
                  .container {
                    max-width: 600px;
                    margin: 50px auto;
                    padding: 20px;
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                  }
                  h1 {
                    color: #4361ee;
                  }
                  .icon {
                    font-size: 64px;
                    margin-bottom: 20px;
                    color: #4361ee;
                  }
                  .btn {
                    display: inline-block;
                    background-color: #4361ee;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 4px;
                    text-decoration: none;
                    margin-top: 20px;
                    transition: background-color 0.3s;
                  }
                  .btn:hover {
                    background-color: #3a56d4;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="icon">⚠️</div>
                  <h1>You're Offline</h1>
                  <p>It looks like you've lost your internet connection. Please check your network and try again.</p>
                  <p>Some features of HealthTrack are available offline, but you'll need to reconnect to access all functionality.</p>
                  <a href="/" class="btn">Try Again</a>
                </div>
              </body>
              </html>
            `;
            
            const offlineResponse = new Response(offlineHtml, {
              headers: { 'Content-Type': 'text/html' }
            });
            
            return cache.put('/offline.html', offlineResponse);
          });
      })
  );
}); 