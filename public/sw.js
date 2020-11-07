var CACHE_NAME = 'spotifeels';

var urlsToCache = [
    '/',
    '/logo1.png',
    '/logo2.png',
    '/logo3.png',
    '/logo4.png',
    '/logo5.png',
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});