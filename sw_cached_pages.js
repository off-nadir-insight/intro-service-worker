const cacheName = 'v1'

const cacheAssets = [
  'index.html',
  'about.html',
  '/css/style.css',
  '/js/index.js'
]

// call install event
self.addEventListener('install', event => {
  console.log('Service Worker: Installed')

  // wait until promise is finished, then gets rid of service worker
  event.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching files')
        cache.addAll(cacheAssets)
      })
      .then(() => self.skipWaiting())
  )
})

// call activate event
self.addEventListener('activate', event => {
  console.log('Service Worker: Activated')

  // remove unwanted caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing old cache')
            return caches.delete(cache)
          }
        })
      )
    })
  )
})

// call fetch event
self.addEventListener('fetch', event => {
  console.log(event)
  console.log('Service Worker: Fetching')

  // if live site is available, load live site, otherwise, load cache
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  )
})

// issue: not seeing fetch event triggers, offline mode not using cache, further investigation here