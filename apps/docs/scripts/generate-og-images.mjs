import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { collectAstroContentCards } from '@santi020k/og/astro'
import { definePresetConfig } from '@santi020k/og/presets'

const directory = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(directory, '..')

const sections = {
  api: 'API',
  frameworks: 'Framework',
  guide: 'Guide',
  packages: 'Package',
  tooling: 'Tooling'
}

const sectionFor = slug => {
  const segments = slug.split('/').filter(Boolean)
  const version = ['v1', 'v2'].includes(segments[0]) ? segments.shift() : undefined
  const section = sections[segments[0]] ?? 'Docs'

  if (!version) return section

  return segments.length === 0 ? `${version} Archive` : `${version} ${section}`
}

export default definePresetConfig({
  cards: () => collectAstroContentCards({
    directory: 'src/content/docs',
    map: entry => ({
      badge: sectionFor(entry.slug),
      ...(typeof entry.frontmatter.description === 'string' ?
        { description: entry.frontmatter.description } :
        {}),
      title: typeof entry.frontmatter.title === 'string' ?
        entry.frontmatter.title :
        path.basename(entry.slug),
      variant: 'docs'
    }),
    root
  }),
  clean: true,
  concurrency: 'auto',
  outputDirectory: 'public/og',
  preset: {
    brand: { domain: 'eslint.santi020k.com', name: 'ESLint Config' },
    theme: { accent: '#4b32c3', background: '#10121d', panel: '#1b2032' },
    variant: 'docs'
  },
  root
})
