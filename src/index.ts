const version = 'redirector/0.1.0\n'
const showVersionPath = '/__info/version'
const canonicalOrigin = 'https://nna774.net'

type Key = {
  origin?: string
  path: string
}

type RedirectTo = {
  to: string
  relative?: boolean
  code: number
}

function makeMap(
  xs: Array<{ k: Key; r: RedirectTo }>,
): Map<string, RedirectTo> {
  return new Map<string, RedirectTo>(
    xs.map((x) => {
      const k = x.k
      const url = (k.origin || canonicalOrigin) + k.path
      return [url, x.r]
    }),
  )
}

const redirectMap = makeMap([
  {
    k: { path: '/blog/2015/12/19/factory_girl.html' },
    r: {
      relative: true,
      to: '/blog/2015/12/19/factory-girl.html',
      code: 301,
    },
  },
  {
    k: { path: '/piet/C89Book.pdf' },
    r: {
      to: 'https://github.com/nna774/C89Book2/releases/download/v1.0/C89Book_honban.pdf',
      code: 302,
    },
  },
  {
    k: { path: '/piet/C91Book.pdf' },
    r: {
      to: 'https://github.com/nna774/C91book/releases/download/1.0.1/C91Book.pdf',
      code: 302,
    },
  },
  {
    k: { origin: 'https://blog.nna774.net', path: '/' },
    r: {
      to: canonicalOrigin + '/blog/',
      code: 301,
    },
  },
])

function redirect(req: Request, to: RedirectTo): Response {
  const origin = new URL(req.url).origin
  if (to.relative) {
    return Response.redirect(origin + to.to, to.code)
  }
  return Response.redirect(to.to, to.code)
}

async function handleRequest(request: Request): Promise<Response> {
  const redirectTo = redirectMap.get(request.url)
  if (redirectTo) {
    return redirect(request, redirectTo)
  }

  // 特に指定のないorigin揺れは、canonicalに正規化。
  const requestURL = new URL(request.url)
  if (requestURL.origin !== canonicalOrigin) {
    return Response.redirect(canonicalOrigin + requestURL.pathname, 301)
  }
  if (requestURL.pathname === showVersionPath) {
    return new Response(version)
  }

  // If request not in map, return the original request
  return fetch(request)
}

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})
