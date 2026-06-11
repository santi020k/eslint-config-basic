self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      await self.registration.unregister()

      const clients = await self.clients.matchAll()

      for (const client of clients) {
        client.navigate(client.url)
      }
    })()
  )
})
