import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'

const base = process.env.DOCS_BASE ?? '/'
const site = process.env.DOCS_SITE_URL ?? 'https://eslint.santi020k.com'
const siteName = 'ESLint Config'

const siteDescription =
  'Production-ready ESLint flat-config documentation for JavaScript and TypeScript teams using React, Next.js, Astro, Vue, Svelte, Solid, Angular, NestJS, Hono, Expo, Qwik, Remix, and opt-in integrations.'

const siteKeywords =
  'ESLint flat config, JavaScript linting, TypeScript linting, React ESLint, Next.js ESLint, Astro ESLint, Vue ESLint, Svelte ESLint, Solid ESLint, Angular ESLint, NestJS ESLint, Hono ESLint, Expo ESLint, Qwik ESLint, Remix ESLint, developer experience'

const socialImage = new URL('/cover.webp', site).toString()

const sidebar = [
  {
    label: 'Versions',
    items: [
      { label: 'Current (v2)', link: '/' },
      { label: 'Archive (v1)', link: '/v1/' }
    ]
  },
  {
    label: 'Start Here',
    items: [
      { label: 'Overview', link: '/' },
      { label: 'Getting Started', slug: 'guide/getting-started' },
      { label: 'Installation', slug: 'guide/installation' },
      { label: 'Configuration', slug: 'guide/configuration' },
      { label: 'Migration v1 to v2', slug: 'guide/migration-v1-to-v2' }
    ]
  },
  {
    label: 'Frameworks',
    items: [
      { label: 'TypeScript', slug: 'frameworks/typescript' },
      { label: 'React', slug: 'frameworks/react' },
      { label: 'Next.js', slug: 'frameworks/next' },
      { label: 'Astro', slug: 'frameworks/astro' },
      { label: 'Vue', slug: 'frameworks/vue' },
      { label: 'Svelte', slug: 'frameworks/svelte' },
      { label: 'Solid', slug: 'frameworks/solid' },
      { label: 'Angular', slug: 'frameworks/angular' },
      { label: 'NestJS', slug: 'frameworks/nest' },
      { label: 'Hono', slug: 'frameworks/hono' },
      { label: 'Expo', slug: 'frameworks/expo' },
      { label: 'Qwik', slug: 'frameworks/qwik' },
      { label: 'Remix', slug: 'frameworks/remix' }
    ]
  },
  {
    label: 'Tooling',
    items: [
      { label: 'Overview', slug: 'tooling/overview' },
      { label: 'Libraries', slug: 'tooling/libraries' },
      { label: 'Testing', slug: 'tooling/testing' },
      { label: 'Formats', slug: 'tooling/formats' },
      { label: 'Tools', slug: 'tooling/tools' },
      { label: 'Extensions', slug: 'tooling/extensions' }
    ]
  },
  {
    label: 'Packages and API',
    items: [
      { label: 'Basic', slug: 'packages/basic' },
      { label: 'Core', slug: 'packages/core' },
      { label: 'Integrations', slug: 'packages/integrations' },
      { label: 'Playground', slug: 'packages/playground' },
      { label: 'Tests', slug: 'packages/tests' },
      { label: 'API Overview', slug: 'api' },
      { label: 'Generated Reference', slug: 'api/reference' }
    ]
  },
  {
    label: 'v1 Archive',
    collapsed: true,
    items: [
      { label: 'v1 Overview', slug: 'v1' },
      { label: 'v1 Getting Started', slug: 'v1/guide/getting-started' },
      { label: 'v1 Configuration', slug: 'v1/guide/configuration' },
      { label: 'v1 Frameworks', slug: 'v1/frameworks/typescript' },
      { label: 'v1 Tooling', slug: 'v1/tooling/overview' },
      { label: 'v1 Packages', slug: 'v1/packages/basic' },
      { label: 'v1 API', slug: 'v1/api' }
    ]
  }
]

export default defineConfig({
  site,
  base,
  integrations: [
    starlight({
      title: siteName,
      description: siteDescription,
      favicon: '/favicon.svg',
      logo: {
        light: './src/assets/logo-santi020k.svg',
        dark: './src/assets/logo-santi020k-dark.svg',
        alt: 'Santi020k'
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/santi020k/eslint-config-basic'
        }
      ],
      editLink: {
        baseUrl: 'https://github.com/santi020k/eslint-config-basic/edit/main/packages/docs/'
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3
      },
      lastUpdated: true,
      credits: false,
      customCss: ['./src/styles/starlight.css'],
      sidebar,
      head: [
        { tag: 'meta', attrs: { name: 'application-name', content: siteName } },
        { tag: 'meta', attrs: { name: 'author', content: 'Santiago Molina' } },
        { tag: 'meta', attrs: { name: 'keywords', content: siteKeywords } },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#6319BE' } },
        { tag: 'meta', attrs: { property: 'og:image', content: socialImage } },
        { tag: 'meta', attrs: { property: 'og:image:alt', content: 'Santi020k ESLint cover artwork' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: socialImage } }
      ]
    })
  ]
})
