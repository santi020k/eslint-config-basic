import { createServer } from 'node:net'

export const assertPortAvailable = url => new Promise((resolve, reject) => {
  const target = new URL(url)
  const probe = createServer()

  probe.once('error', error => {
    reject(new Error(`Lighthouse target port is unavailable: ${url}`, { cause: error }))
  })

  probe.listen(Number(target.port), target.hostname, () => {
    probe.close(error => {
      if (error) reject(error)
      else resolve()
    })
  })
})

export const assertDocumentationPreview = (html, expectedCanonical) => {
  const link = /<link\b(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/iu.exec(html)

  if (link?.[1] !== expectedCanonical) {
    throw new Error(`Preview canonical URL must be ${expectedCanonical}; received ${link?.[1] ?? 'none'}.`)
  }
}
