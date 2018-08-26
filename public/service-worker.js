CACHE = {static: "app_static_cache", dynamic: "app_dynamic_cache"};
CAHCE_NAME = [
    '/',
    '/home',
    '/signin',
    '/signup',
    '/post-ad',
    '/profile',
    '/message',
    
    // CSS
    '/css/style.css',
    '/css/materialize.min.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons',

    // JS
    '/js/app.js',
    '/js/app-bootstrap.js',
    '/js/materialize.min.js',
    '/js/jquery.min.js',
    '/js/helper.js',
    '/js/user.js',
    "/js/localforage.min.js",

    // IMAGES
    'img/logo.png',
    'img/icons/icon-72x72.png',
    'img/icons/icon-96x96.png',
    'img/icons/icon-128x128.png',
    'img/icons/icon-144x144.png',
    'img/icons/icon-152x152.png',
    'img/icons/icon-152x152.png',
    'img/icons/icon-192x192.png',
    'img/icons/icon-384x384.png',
    'img/icons/icon-512x512.png',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE.static).then(cache => {
            return cache.addAll(CAHCE_NAME);
        })
    );
});

self.addEventListener('fetch', event => {
    console.log(event.request.url)
    event.respondWith(
        caches.match(event.request).then(res => {
            return res || fetch(event.request);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE.static) {
                        console.log("[ServiceWorker] Removing old cache", key);
                        return caches.delete(key);
                    }
                })
            )
        })
    )
});