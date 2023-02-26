const hostMeta =
  `<?xml version="1.0" encoding="UTF-8"?>
<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
  <Link rel="lrdd" template="https://s.nna774.net/.well-known/webfinger?resource={uri}"/>
</XRD>
`
const hostMetaContentType = 'application/xrd+xml; charset=utf-8'

async function wellKnownHander(request: Request): Promise<Response> {
  const url = new URL(request.url)
  if (url.pathname === '/.well-known/hello') {
    return new Response('hello')
  }
  if (url.pathname === '/.well-known/host-meta') {
    return new Response(hostMeta, {headers: {'content-type': hostMetaContentType}})
  }

  return fetch(request)
}

export { wellKnownHander }
