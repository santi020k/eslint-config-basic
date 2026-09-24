import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { pathnameOutput } from '@santi020k/og'
import { collectContentCards } from '@santi020k/og/content'
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
  cards: () => collectContentCards({
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
    output: entry => pathnameOutput(`/${entry.slug.toLowerCase()}/`),
    route: entry => `/${entry.slug.toLowerCase()}/`,
    root
  }),
  clean: true,
  concurrency: 'auto',
  outputDirectory: 'public/og',
  routeManifest: { file: 'public/og/manifest.json', publicPath: '/og' },
  preset: {
    brand: {
      domain: 'eslint.santi020k.com',
      logo: 'public/logo-square.svg',
      name: 'ESLint Config'
    },
    theme: {
      accent: '#a56ef7',
      background: '#110c1d',
      foreground: '#dfdde3',
      muted: '#b6b2bd',
      panel: '#1c1528'
    },
    variant: 'docs'
  },
  root
})
