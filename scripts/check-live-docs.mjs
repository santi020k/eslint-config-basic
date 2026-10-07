import { setTimeout } from 'node:timers/promises'

const verifySearchBundle = async bundle => {
  if (!bundle.headers.get('content-type')?.includes('javascript') || (await bundle.text()).length === 0) {
    throw new Error('Live documentation search bundle is missing or invalid.')
  }
}

const readEnglishIndex = entry => {
  const english = entry?.languages?.en

  if (typeof english?.hash !== 'string' || typeof english?.wasm !== 'string' || !(english.page_count > 0)) {
    throw new Error('Live documentation search index has no English pages.')
  }

  return english
}

const verifySearchAsset = async (asset, path) => {
  if (asset.headers.get('content-type')?.includes('text/html') || (await asset.arrayBuffer()).byteLength === 0) {
    throw new Error(`Live documentation search asset ${path} is missing or empty.`)
  }
}

const verifySearch = async get => {
  await verifySearchBundle(await get('/pagefind/pagefind.js'))

  const english = readEnglishIndex(await (await get('/pagefind/pagefind-entry.json')).json())

  for (const path of [`/pagefind/pagefind.${encodeURIComponent(english.hash)}.pf_meta`, `/pagefind/wasm.${encodeURIComponent(english.wasm)}.pagefind`]) {
    await verifySearchAsset(await get(path), path)
  }
}

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

  await verifySearch(get)

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
