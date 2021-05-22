// ensure service workers are supported
if (navigator.serviceWorker) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw_cached_site.js')
      .then(reg => console.log('Service Worker: Registered'))
      .catch(err => console.error(`Service Worker: Error: ${err}`))
  })
}