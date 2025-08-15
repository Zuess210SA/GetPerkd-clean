// Get Perk'd PWA Service Worker - Performance Optimized
const CACHE_NAME = 'perkd-v1.0.0';
const STATIC_CACHE = 'perkd-static-v1';
const API_CACHE = 'perkd-api-v1';
const IMAGE_CACHE = 'perkd-images-v1';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/static/js/main.js',
  '/static/css/main.css',
  '/favicon.ico'
];

// Cache strategies by resource type
const CACHE_STRATEGIES = {
  // Static assets - cache first (fastest for repeat visits)
  static: {
    pattern: /\.(js|css|woff2?|ttf|eot|svg)$/,
    strategy: 'cacheFirst',
    cache: STATIC_CACHE,
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  },
  
  // Images - cache first with fallback
  images: {
    pattern: /\.(png|jpg|jpeg|gif|webp|ico)$/,
    strategy: 'cacheFirst',
    cache: IMAGE_CACHE,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  },
  
  // API responses - stale while revalidate for fresh data
  api: {
    pattern: /\/api\//,
    strategy: 'staleWhileRevalidate',
    cache: API_CACHE,
    maxAge: 5 * 60 * 1000 // 5 minutes
  },
  
  // HTML pages - network first for fresh content
  pages: {
    pattern: /\.html$|^(?!.*\.).*$/,
    strategy: 'networkFirst',
    cache: CACHE_NAME,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
};

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => {
        self.skipWaiting();
      })
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => {
              return name !== CACHE_NAME && 
                     name !== STATIC_CACHE && 
                     name !== API_CACHE && 
                     name !== IMAGE_CACHE;
            })
            .map((name) => caches.delete(name))
        );
      })
      .then(() => {
        self.clients.claim();
      })
  );
});

// Fetch event - apply caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip external domains (except trusted CDNs)
  if (url.origin !== self.location.origin && 
      !url.hostname.includes('supabase.co') &&
      !url.hostname.includes('onesignal.com')) {
    return;
  }

  // Find matching strategy
  let strategy = null;
  for (const [key, config] of Object.entries(CACHE_STRATEGIES)) {
    if (config.pattern.test(url.pathname + url.search)) {
      strategy = config;
      break;
    }
  }

  if (!strategy) return;

  // Apply the appropriate caching strategy
  event.respondWith(
    applyCacheStrategy(request, strategy)
  );
});

// Cache strategy implementations
async function applyCacheStrategy(request, strategy) {
  const cache = await caches.open(strategy.cache);
  
  switch (strategy.strategy) {
    case 'cacheFirst':
      return cacheFirst(request, cache, strategy);
    
    case 'networkFirst':
      return networkFirst(request, cache, strategy);
    
    case 'staleWhileRevalidate':
      return staleWhileRevalidate(request, cache, strategy);
    
    default:
      return fetch(request);
  }
}

// Cache first strategy - fastest for static assets
async function cacheFirst(request, cache, strategy) {
  const cached = await cache.match(request);
  
  if (cached && !isExpired(cached, strategy.maxAge)) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return cached || new Response('Offline', { status: 503 });
  }
}

// Network first strategy - fresh content when available
async function networkFirst(request, cache, strategy) {
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

// Stale while revalidate - serve cached, update in background
async function staleWhileRevalidate(request, cache, strategy) {
  const cached = await cache.match(request);
  
  // Always try to fetch fresh data in background
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.status === 200) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);
  
  // Return cached version immediately if available
  if (cached && !isExpired(cached, strategy.maxAge)) {
    fetchPromise; // Update cache in background
    return cached;
  }
  
  // Wait for network if no cache or expired
  return fetchPromise || cached || new Response('Offline', { status: 503 });
}

// Check if cached response is expired
function isExpired(response, maxAge) {
  const dateHeader = response.headers.get('date');
  if (!dateHeader) return false;
  
  const cachedTime = new Date(dateHeader).getTime();
  return (Date.now() - cachedTime) > maxAge;
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle offline actions when connection is restored
  // This can include syncing saved deals, redemptions, etc.
}

// Push notification handling
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      data: data.data || {},
      actions: data.actions || []
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const urlToOpen = event.notification.data.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then((windowClients) => {
        // Check if app is already open
        for (const client of windowClients) {
          if (client.url.includes(self.location.origin)) {
            return client.focus();
          }
        }
        // Open new window if not already open
        return clients.openWindow(urlToOpen);
      })
  );
});