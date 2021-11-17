type RedirectTo = {
  to: string
  relative?: boolean
  code: number
}

const redirectMap = new Map<string, RedirectTo>([
  [
    '/blog/2015/12/19/factory_girl.html',
    {
      relative: true,
      to: '/blog/2015/12/19/factory-girl.html',
      code: 301,
    },
  ],
  [
    '/piet/C89Book.pdf',
    {
      to: 'https://github.com/nna774/C89Book2/releases/download/v1.0/C89Book_honban.pdf',
      code: 302,
    },
  ],
  [
    '/piet/C91Book.pdf',
    {
      to: 'https://github.com/nna774/C91book/releases/download/1.0.1/C91Book.pdf',
      code: 302,
    },
  ],
])

function redirect(origin: string, r: RedirectTo): Response {
  if (r.relative) {
    return Response.redirect(origin + r.to, r.code)
  }
  return Response.redirect(r.to, r.code)
}

async function handleRequest(request: Request): Promise<Response> {
  const requestURL = new URL(request.url)
  const path = requestURL.pathname
  const redirectTo = redirectMap.get(path)
  if (redirectTo) {
    return redirect(requestURL.origin, redirectTo)
  }
  // If request not in map, return the original request
  return fetch(request)
}

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})
