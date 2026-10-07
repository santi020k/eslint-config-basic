import { setTimeout } from 'node:timers/promises'

export const verifyLiveDocs = async ({ baseURL, expectedCommit, fetcher = fetch }) => {
  const get = async path => {
    const url = new URL(path, baseURL)

    url.searchParams.set('smoke', expectedCommit)

    const response = await fetcher(url, { signal: AbortSignal.timeout(15000), cache: 'no-store' })

    if (!response.ok) throw new Error(`Live docs ${url.pathname} returned HTTP ${response.status}.`)

    return response
  }

  const deployment = await (await get('/release-build.json')).json()

  if (deployment?.commit !== expectedCommit) throw new Error('Live docs belong to a different deployment commit.')

  for (const path of ['/', '/guide/installation/', '/guide/changelog/']) {
    const html = await (await get(path)).text()

    if (!html.includes('<h1') || !html.includes('santi020k')) {
      throw new Error(`Live docs ${path} did not return the expected documentation shell.`)
    }
  }

  const search = await (await get('/pagefind/pagefind.js')).text()

  if (search.length === 0) throw new Error('Live documentation search bundle is empty.')
}

if (process.argv[1]?.endsWith('check-live-docs.mjs')) {
  const baseURL = process.env.DOCS_SMOKE_URL
  const expectedCommit = process.env.DOCS_EXPECTED_COMMIT

  if (!baseURL || !expectedCommit) throw new Error('Set DOCS_SMOKE_URL and DOCS_EXPECTED_COMMIT.')

  for (let attempt = 1; ; attempt += 1) {
    try {
      await verifyLiveDocs({ baseURL, expectedCommit })

      break
    } catch (error) {
      if (attempt === 12) throw error

      console.log(`Live docs not ready (attempt ${attempt}/12); retrying in 10 seconds.`)

      await setTimeout(10000)
    }
  }

  console.log(`Verified live documentation and search for ${expectedCommit}.`)
}
