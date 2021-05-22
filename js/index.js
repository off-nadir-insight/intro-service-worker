// ensure service workers are supported
if (navigator.serviceWorker) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/js/sw_cached_pages.js')
      .then(reg => console.log('Service Worker: Registered'))
      .catch(err => console.error(`Service Worker: Error: ${err}`))
  })
}