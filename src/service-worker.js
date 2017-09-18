/**
 * Check out https://googlechrome.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./sw-toolbox.js');

// self.toolbox.options.cache = {
//   name: 'ionic-cache'
// };

// pre-cache our key assets
// self.toolbox.precache(
//   [
//     './build/main.js',
//     './build/vendor.js',
//     './build/main.css',
//     './build/polyfills.js',
//     'index.html',
//     'manifest.json'
//   ]
// );

// dynamically cache any other local assets
// self.toolbox.router.any('/*', self.toolbox.cacheFirst);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
// self.toolbox.router.default = self.toolbox.networkFirst;

const CACHE_DOMAINS = [
    "http://localhost:8100"
    // "api.api.ai"
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(preLoad());
});

self.addEventListener('updatefound', (event) => {
    self.skipWaiting();
    console.log('Update Found...');
    event.waitUntil(preLoad());
});

const preLoad = function() {
    console.log('Chat box Install Event processing');
    return caches.open('chat-box-offline').then(function(cache) {
        console.log('[Chat box] Cached index and offline page during Install');
        return cache.addAll(['/offline.html', '/index.html']);
    });
};

self.addEventListener('activate', function(event) {
    // Message to simply show the lifecycle flow
    console.log('[activate] Activating service worker!');

    // Claim the service work for this client, forcing `controllerchange` event
    console.log('[activate] Claiming this service worker!');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
    console.log('The service worker is serving the asset.');
    event.respondWith(checkResponse(event.request).catch(function() {
        return returnFromCache(event.request)
    }));
    new Promise((res, rej) => {
        return res(CACHE_DOMAINS.filter((d, i) => {
            return event.request.url.indexOf(d) > -1 ? d : null;
        }));
    }).then((s) => {
        if (s && s.length) {
            event.waitUntil(addToCache(event.request));
        }
    });
});

self.addEventListener('push', (e) => {
    var body;

    if (e.data) {
        try {
            body = JSON.parse(e.data.text()).message;
        } catch (error) {
            body = e.data.text();
        }
    } else {
        body = 'Push message no payload';
    }

    var options = {
        body: body,
        icon: 'favicon.ico',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [{
                action: 'explore',
                title: 'Explore this new world',
                icon: 'favicon.ico'
            },
            {
                action: 'close',
                title: `I don't want any of this`,
                icon: 'favicon.ico'
            },
        ]
    };
    e.waitUntil(
        self.registration.showNotification('Chat box', options)
    );
});

function getEndpoint() {
    return self.registration.pushManager.getSubscription()
        .then(function(subscription) {
            if (subscription) {
                return subscription.endpoint;
            }
            throw new Error('User not subscribed');
        });
}

const checkResponse = (request) => {
    return new Promise(function(fulfill, reject) {
        fetch(request).then(function(response) {
            if (response.status !== 404) {
                fulfill(response);
            } else {
                reject();
            }
        }, reject);
    });
};

const addToCache = function(request) {
    return caches.open('chat-box-offline').then(function(cache) {
        return fetch(request).then(function(response) {
            console.log('[Chat box] add page to offline => ' + response.url);
            return cache.put(request, response);
        });
    });
};

const returnFromCache = function(request) {
    return caches.open('chat-box-offline').then(function(cache) {
        return cache.match(request).then(function(matching) {
            if (!matching || matching.status === 404) {
                return cache.match('offline.html');
            } else {
                return matching;
            }
        });
    });
};