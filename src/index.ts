import { handleRequest } from '../src/handler'
import { wellKnownHander } from './well-known'

addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  const wellKnownPath = '/.well-known/'

  if (url.pathname.startsWith(wellKnownPath)) {
    return event.respondWith(wellKnownHander(event.request))
  }
  event.respondWith(handleRequest(event.request))
})
