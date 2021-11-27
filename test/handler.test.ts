import { handleRequest } from '../src/handler'
import makeServiceWorkerEnv from 'service-worker-mock'

declare var global: any

describe('handle', () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv())
    jest.resetModules()
  })

  test('redirect http', async () => {
    const result = await handleRequest(new Request('http://nna774.net/', { method: 'GET' }))
    expect(result.status).toEqual(301)
    expect(result.headers.get('Location')).toEqual('https://nna774.net/')
  })
  test('redirect blog', async () => {
    const result = await handleRequest(new Request('https://blog.nna774.net', { method: 'GET' }))
    expect(result.status).toEqual(301)
    expect(result.headers.get('Location')).toEqual('https://nna774.net/blog/')
  })
  test('redirect piet-89', async () => {
    const result = await handleRequest(new Request('https://nna774.net/piet/C89Book.pdf', { method: 'GET' }))
    expect(result.status).toEqual(302)
    expect(result.headers.get('Location')).toEqual('https://github.com/nna774/C89Book2/releases/download/v1.0/C89Book_honban.pdf')
  })
  test('redirect piet-91', async () => {
    const result = await handleRequest(new Request('https://nna774.net/piet/C91Book.pdf', { method: 'GET' }))
    expect(result.status).toEqual(302)
    expect(result.headers.get('Location')).toEqual('https://github.com/nna774/C91book/releases/download/1.0.1/C91Book.pdf')
  })
})
