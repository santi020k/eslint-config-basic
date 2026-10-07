import { createServer } from 'node:net'

import { describe, expect, test } from 'vitest'

import { assertDocumentationPreview, assertPortAvailable } from '../../../apps/docs/scripts/lighthouse-server.mjs'

describe('Lighthouse preview isolation', () => {
  test('rejects an occupied port and accepts it after the existing server stops', async () => {
    const server = createServer()

    await new Promise<void>(resolve => {
      server.listen(0, '127.0.0.1', resolve)
    })

    const address = server.address()

    if (!address || typeof address === 'string') throw new Error('Expected a TCP listener')

    const url = `http://127.0.0.1:${address.port}/`

    try {
      await expect(assertPortAvailable(url)).rejects.toThrow('target port is unavailable')
    } finally {
      await new Promise<void>((resolve, reject) => {
        server.close(error => {
          if (error) reject(error)
          else resolve()
        })
      })
    }

    await expect(assertPortAvailable(url)).resolves.toBeUndefined()
  })

  test.each([
    '<link rel="canonical" href="https://eslint.santi020k.com/">',
    '<link href=\'https://eslint.santi020k.com/\' rel=\'canonical\'>'
  ])('accepts the documentation canonical independent of attribute order', html => {
    expect(() => {
      assertDocumentationPreview(html, 'https://eslint.santi020k.com/')
    }).not.toThrow()
  })

  test.each(['<html></html>', '<link rel="canonical" href="https://other.santi020k.com/">'])('rejects unrelated preview HTML', html => {
    expect(() => {
      assertDocumentationPreview(html, 'https://eslint.santi020k.com/')
    }).toThrow('Preview canonical URL')
  })
})
