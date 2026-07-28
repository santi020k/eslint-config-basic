/**
 * Pre-build OG image generator for the ESLint Config documentation site.
 *
 * Reads all Starlight content from `src/content/docs/`, generates a branded
 * 1200×630 OG image per page, and writes them to `public/og/` as static files.
 *
 * Run via `pnpm run generate:og` or as part of `docs:build`.
 * Set FORCE_OG=1 to regenerate images that already exist.
 */

import fs, { promises as fsp } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Worker } from 'node:worker_threads'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DOCS_DIR = path.resolve(__dirname, '..')
const CONTENT_DIR = path.join(DOCS_DIR, 'src', 'content', 'docs')
const OUT_DIR = path.join(DOCS_DIR, 'public', 'og')
const WORKER_SCRIPT = new URL('./og-render-worker.mjs', import.meta.url)
const FORCE = process.env.FORCE_OG === '1'
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const trimOuterSlashes = value => value.replace(/^\/+|\/+$/g, '')

const safeDecodeURIComponent = value => {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

const getOgSlug = pathname => trimOuterSlashes(pathname)
  .split('/')
  .filter(Boolean)
  .map(segment => encodeURIComponent(safeDecodeURIComponent(segment)).replaceAll('%', '~'))
  .join('--')

const getOgFileName = pathname => `${getOgSlug(pathname) || 'index'}.webp`

const extractFrontmatterField = (content, field) => {
  const re = new RegExp(`^${field}:\\s*["']?(.+?)["']?\\s*$`, 'm')
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
  const frontmatter = frontmatterMatch ? frontmatterMatch[1] : ''
  const match = frontmatter.match(re)

  if (!match) return null

  return match[1].replace(/^["']|["']$/g, '').trim()
}

const SECTION_MAP = {
  api: 'API',
  frameworks: 'Framework',
  guide: 'Guide',
  packages: 'Package',
  tooling: 'Tooling'
}

const getSectionFromPathname = pathname => {
  const segments = trimOuterSlashes(pathname).split('/').filter(Boolean)

  if (segments.length === 0) return 'Docs'

  if (segments[0] === 'v1' || segments[0] === 'v2') {
    const version = segments[0]
    const sub = segments[1]

    return sub ? `${version} ${SECTION_MAP[sub] ?? 'Docs'}` : `${version} Archive`
  }

  return SECTION_MAP[segments[0]] ?? 'Docs'
}

const collectDocFiles = dir => {
  if (!fs.existsSync(dir)) return []

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const entryPath = path.join(dir, entry.name)

    if (entry.isDirectory()) return collectDocFiles(entryPath)

    const isDoc = entry.name.endsWith('.md') || entry.name.endsWith('.mdx')

    return isDoc ? [entryPath] : []
  })
}

const filePathToPathname = filePath => {
  const relative = path.relative(CONTENT_DIR, filePath).replaceAll(path.sep, '/')
  const withoutExt = relative.replace(/\.mdx?$/, '')

  const slug = withoutExt === 'index' || withoutExt.endsWith('/index') ?
    withoutExt.replace(/\/?index$/, '') :
    withoutExt

  return slug ? `/${slug}/` : '/'
}

// ---------------------------------------------------------------------------
// Spec collection
// ---------------------------------------------------------------------------

const collectSpecs = () => {
  const specs = []

  for (const filePath of collectDocFiles(CONTENT_DIR)) {
    const content = fs.readFileSync(filePath, 'utf8')
    const title = extractFrontmatterField(content, 'title') ?? path.basename(filePath, path.extname(filePath))
    const description = extractFrontmatterField(content, 'description') ?? undefined
    const pathname = filePathToPathname(filePath)
    const section = getSectionFromPathname(pathname)

    specs.push({
      outFile: path.join(OUT_DIR, getOgFileName(pathname)),
      props: { description, section, title }
    })
  }

  return specs
}

// ---------------------------------------------------------------------------
// Worker pool
// ---------------------------------------------------------------------------

class OgRenderPool {
  constructor(workerCount) {
    this.workerCount = workerCount

    this.workers = []

    this.available = []

    this.waiting = []

    this.inFlight = new Map()

    this.nextId = 1
  }

  async start() {
    for (let i = 0; i < this.workerCount; i++) {
      const w = new Worker(WORKER_SCRIPT, { type: 'module' })

      w.on('message', msg => this.onMessage(w, msg))

      w.on('error', err => this.onWorkerError(w, err))

      this.workers.push(w)

      this.available.push(w)
    }
  }

  onMessage(worker, msg) {
    const entry = this.inFlight.get(msg.id)

    if (!entry) return

    this.inFlight.delete(msg.id)

    this.available.push(worker)

    if (msg.ok) {
      entry.resolve(Buffer.from(msg.buffer))
    } else {
      entry.reject(new Error(msg.message ?? 'OG worker render failed'))
    }

    this.pump()
  }

  onWorkerError(worker, err) {
    const idx = this.workers.indexOf(worker)

    if (idx !== -1) this.workers.splice(idx, 1)

    for (const [id, entry] of this.inFlight) {
      if (entry.worker === worker) {
        this.inFlight.delete(id)

        entry.reject(err instanceof Error ? err : new Error(String(err)))

        break
      }
    }

    this.pump()
  }

  pump() {
    while (this.waiting.length > 0 && this.available.length > 0) {
      const job = this.waiting.shift()
      const worker = this.available.pop()
      const id = this.nextId++

      if (!job || !worker) break

      this.inFlight.set(id, { reject: job.reject, resolve: job.resolve, worker })

      worker.postMessage({ id, props: job.props })
    }
  }

  render(props) {
    return new Promise((resolve, reject) => {
      this.waiting.push({ props, reject, resolve })

      this.pump()
    })
  }

  async shutdown() {
    await Promise.all(this.workers.map(w => w.terminate()))

    this.workers = []

    this.available = []
  }
}

const generateOne = async (pool, { outFile, props }) => {
  const buffer = await pool.render(props)

  await fsp.mkdir(path.dirname(outFile), { recursive: true })

  await fsp.writeFile(outFile, buffer)

  process.stdout.write(`  write ${path.relative(DOCS_DIR, outFile)}\n`)
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

const generateAll = async () => {
  const start = performance.now()
  const specs = collectSpecs()

  const pendingSpecs = FORCE ?
    specs :
    specs.filter(s => !fs.existsSync(s.outFile))

  const configured = Math.min(16, os.availableParallelism())
  const pendingCount = pendingSpecs.length
  const poolSize = pendingCount === 0 ? 0 : Math.min(configured, pendingCount)
  let pool = null

  try {
    if (poolSize > 0) {
      pool = new OgRenderPool(poolSize)

      await pool.start()
    }

    console.log(
      `\n🖼  Generating ${pendingCount}/${specs.length} OG images (workers=${poolSize})…\n`
    )

    if (pendingCount > 0) {
      await Promise.all(pendingSpecs.map(spec => generateOne(pool, spec)))
    }
  } finally {
    if (pool) await pool.shutdown()
  }

  const elapsed = ((performance.now() - start) / 1000).toFixed(2)

  console.log(`\n✅ Done in ${elapsed}s\n`)
}

await generateAll()
