// Service Worker for Countdown Calendar PWA
const CACHE_NAME = 'countdown-calendar-v1';
const RUNTIME_CACHE = 'countdown-calendar-runtime';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/styles.css',
  '/js/config.js',
  '/js/utils.js',
  '/js/calendar.js',
  '/js/notifications.js',
  '/js/pwa.js',
  '/js/app.js',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png'
];

// Install Event
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching static assets');
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.error('Error caching static assets:', err);
        return cache.addAll(STATIC_ASSETS.filter(asset => asset !== '/'));
      });
    })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Network First, then Cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome extensions and external requests
  if (url.protocol === 'chrome-extension:' || url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Clone and cache successful responses
        if (response && response.status === 200) {
          const cache = caches.open(RUNTIME_CACHE);
          cache.then((c) => c.put(request, response.clone()));
        }
        return response;
      })
      .catch(() => {
        // Fall back to cache on network failure
        return caches.match(request).then((response) => {
          if (response) {
            return response;
          }
          // Return offline page for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          return new Response('Offline - Resource not found', { status: 404 });
        });
      })
  );
});

// Background Sync for notifications
self.addEventListener('sync', (event) => {
  console.log('Background sync event:', event.tag);
  if (event.tag === 'sync-notification') {
    event.waitUntil(syncNotification());
  }
});

// Handle Push Notifications
self.addEventListener('push', (event) => {
  console.log('Push notification received');
  let notificationData = {
    title: 'Countdown Calendar',
    body: 'Check your daily motivation!',
    icon: '/assets/icons/icon-192x192.png',
    badge: '/assets/icons/icon-96x96.png',
    tag: 'countdown-notification',
    requireInteraction: false
  };

  if (event.data) {
    try {
      notificationData = { ...notificationData, ...event.data.json() };
    } catch (e) {
      notificationData.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, notificationData)
  );
});

// Handle Notification Click
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked');
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});

// Handle Notification Close
self.addEventListener('notificationclose', (event) => {
  console.log('Notification closed');
});

// Sync Notification Function
async function syncNotification() {
  try {
    const today = new Date();
    const startDate = new Date(2026, 0, 1); // 01 JAN 2026
    const endDate = new Date(2027, 4, 1); // 01 MAY 2027
    
    if (today >= startDate && today <= endDate) {
      const daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
      const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
      const daysRemaining = totalDays - daysPassed;
      
      const quotes = await getQuotes();
      const quote = quotes[daysPassed % quotes.length];
      
      return self.registration.showNotification('Daily Motivation! 🌟', {
        body: quote.text,
        tag: 'countdown-daily',
        icon: '/assets/icons/icon-192x192.png',
        badge: '/assets/icons/icon-96x96.png',
        data: {
          daysPassed,
          daysRemaining,
          totalDays
        }
      });
    }
  } catch (error) {
    console.error('Error in sync notification:', error);
  }
}

// Get Quotes
async function getQuotes() {
  return [
    { text: "The only way to do great work is to love what you do. - Steve Jobs", author: "Steve Jobs" },
    { text: "Believe you can and you're halfway there. - Theodore Roosevelt", author: "Theodore Roosevelt" },
    { text: "Success is not final, failure is not fatal. - Winston Churchill", author: "Winston Churchill" },
    { text: "You are never too old to set another goal or to dream a new dream. - C.S. Lewis", author: "C.S. Lewis" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb", author: "Chinese Proverb" },
    { text: "Your limitation—it's only your imagination. - Unknown", author: "Unknown" },
    { text: "Great things never come from comfort zones. - Unknown", author: "Unknown" },
    { text: "Dream it. Wish it. Do it. - Unknown", author: "Unknown" },
    { text: "Success doesn't just find you. You have to go out and get it. - Unknown", author: "Unknown" },
    { text: "The harder you work for something, the greater you'll feel when you achieve it. - Unknown", author: "Unknown" },
    { text: "Dream bigger. Do bigger. - Unknown", author: "Unknown" },
    { text: "Don't stop when you're tired. Stop when you're done. - Unknown", author: "Unknown" },
    { text: "Wake up with determination. Go to bed with satisfaction. - Unknown", author: "Unknown" },
    { text: "Do something today that your future self will thank you for. - Sean Patrick Flanery", author: "Sean Patrick Flanery" },
    { text: "Little things make big days. - Unknown", author: "Unknown" },
    { text: "It's going to be hard, but hard does not mean impossible. - Unknown", author: "Unknown" },
    { text: "Don't wait for opportunity. Create it. - Unknown", author: "Unknown" },
    { text: "Sometimes we're tested not to show our weaknesses, but to discover our strengths. - Unknown", author: "Unknown" },
    { text: "The key to success is to focus on goals, not obstacles. - Unknown", author: "Unknown" },
    { text: "Dream it. Believe it. Build it. - Unknown", author: "Unknown" }
  ];
}
