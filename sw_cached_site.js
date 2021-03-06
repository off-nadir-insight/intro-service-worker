const cacheName = 'v3'

// call install event
self.addEventListener('install', event => {
  console.log('Service Worker: Installed')
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
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching')

  // if live site is available, load live site, otherwise, load cache
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // make clone of response
        const resClone = res.clone()
        // open cache
        caches
          .open(cacheName)
          .then(cache => {
            // add response to cache
            cache.put(e.request, resClone)
          })
        return res
      }).catch(err => caches.match(e.request).then(res => res))
  )
})