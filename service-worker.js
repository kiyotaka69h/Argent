// Nom du cache
const CACHE_NAME = "job-argent-cache-v1";

// Fichiers à mettre en cache
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/service-worker.js",
  "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
  "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=1200&q=80"
];

// Installation du service worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Cache ouvert ✅");
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation du service worker
self.addEventListener("activate", event => {
  console.log("Service Worker activé 🚀");
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("Ancien cache supprimé :", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Interception des requêtes
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si trouvé dans le cache, retourner le cache
        if (response) {
          return response;
        }
        // Sinon, faire une requête réseau
        return fetch(event.request);
      })
  );
});
