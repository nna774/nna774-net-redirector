async function wellKnownHander(request: Request): Promise<Response> {
  const url = new URL(request.url)
  if (url.pathname === '/.well-known/hello') {
    return new Response('hello')
  }

  return fetch(request)
}

export { wellKnownHander }
