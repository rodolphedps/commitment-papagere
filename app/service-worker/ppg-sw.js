/* eslint-disable */
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    event.waitUntil(
      self.skipWaiting()
        .then(() => self.clients.claim())
        .then(() => sendMessage('force-reload'))
    );
  }
});

function sendMessage(message) {
  return self.clients.matchAll().then(clients => {
    clients.forEach(client => client.postMessage({ message: message }));
  });
}

// Cache the Google Fonts stylesheets with a stale while revalidate strategy.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  }),
);

// Cache the Google Fonts webfont files with a cache first strategy for 1 year.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
      }),
    ],
  }),
);

// Cache images with a stale while revalidate strategy.
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'images',
  }),
);

// Cache ui-avatars with a cache first strategy for 1 year.
workbox.routing.registerRoute(
  /^https:\/\/ui-avatars\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'ui-avatars-image',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
      }),
    ],
  }),
);

// Make JS and CSS fast by returning the assets from the cache, while making sure they are updated in the background for the next use.
workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  workbox.strategies.staleWhileRevalidate(),
);

