import { createRequire } from 'node:module'
import { defineConfig } from 'vitepress'

const require = createRequire(import.meta.url)
const docsPkg = require('../package.json') as { version: string }
const base = process.env.DOCS_BASE ?? '/'
const site = process.env.DOCS_SITE_URL ?? 'https://eslint.santi020k.com'
const siteName = 'Santi020k ESLint'

const siteDescription =
  'DX-first ESLint 9/10+ flat-config docs for JavaScript and TypeScript teams using React, Next.js, Astro, Vue, Svelte, Solid, Angular, NestJS, Expo, Qwik, Remix, and optional tooling.'

const siteKeywords =
  'ESLint flat config, JavaScript linting, TypeScript linting, React ESLint, Next.js ESLint, Astro ESLint, Vue ESLint, Svelte ESLint, Solid ESLint, Angular ESLint, NestJS ESLint, Expo ESLint, Qwik ESLint, Remix ESLint, developer experience'

const socialImage = new URL('/cover.webp', site).toString()

const websiteSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  description: siteDescription,
  inLanguage: 'en-US',
  name: siteName,
  url: site
})

const softwareSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'SoftwareSourceCode',
  author: {
    '@type': 'Person',
    name: 'Santiago Molina',
    url: 'https://santi020k.com'
  },
  codeRepository: 'https://github.com/santi020k/eslint-config-basic',
  description: siteDescription,
  keywords: siteKeywords,
  license: 'https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE',
  name: '@santi020k/eslint-config-basic',
  programmingLanguage: ['JavaScript', 'TypeScript'],
  url: site
})

const resolveCanonicalPath = (relativePath: string): string => {
  const normalizedPath = relativePath.replaceAll('\\', '/')

  if (normalizedPath === 'index.md') {
    return '/'
  }

  if (normalizedPath.endsWith('/index.md')) {
    return `/${normalizedPath.slice(0, -'/index.md'.length)}/`
  }

  return `/${normalizedPath.replace(/\.md$/, '')}`
}

export default defineConfig({
  title: siteName,
  titleTemplate: ':title | Santi020k ESLint',
  description: siteDescription,
  base,
  cleanUrls: true,
  lastUpdated: true,
  useWebFonts: false,
  head: [
    ['link', { rel: 'icon', href: '/favicon.png', type: 'image/png' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'application-name', content: siteName }],
    ['meta', { name: 'author', content: 'Santiago Molina' }],
    ['meta', { name: 'color-scheme', content: 'light dark' }],
    ['meta', { name: 'keywords', content: siteKeywords }],
    ['meta', { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' }],
    ['meta', { name: 'theme-color', content: '#faf9fb' }],
    ['meta', { property: 'og:image', content: socialImage }],
    ['meta', { property: 'og:image:alt', content: 'Santi020k ESLint cover artwork' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:site_name', content: siteName }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:creator', content: '@santi020k' }],
    ['meta', { name: 'twitter:image', content: socialImage }],
    ['meta', { name: 'twitter:image:alt', content: 'Santi020k ESLint cover artwork' }],
    ['meta', { name: 'twitter:site', content: '@santi020k' }],
    ['script', { type: 'application/ld+json' }, websiteSchema],
    ['script', { type: 'application/ld+json' }, softwareSchema]
  ],
  sitemap: {
    hostname: site
  },
  transformHead({ description, pageData, title }) {
    if (pageData.isNotFound) {
      return [['meta', { name: 'robots', content: 'noindex, nofollow' }]]
    }

    const canonicalUrl = new URL(resolveCanonicalPath(pageData.relativePath), site).toString()

    return [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:title', content: title }]
    ]
  },
  themeConfig: {
    logo: {
      alt: 'Santi020k ESLint emblem',
      src: '/cover.webp'
    },
    siteTitle: siteName,
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Frameworks', link: '/frameworks/typescript' },
      { text: 'Tooling', link: '/tooling/overview' },
      { text: 'Packages', link: '/packages/basic' },
      { text: 'API', link: '/api/' },
      { text: 'Changelog', link: '/guide/changelog' },
      {
        text: 'More',
        items: [
          { text: 'GitHub', link: 'https://github.com/santi020k/eslint-config-basic' },
          { text: 'NPM', link: 'https://www.npmjs.com/package/@santi020k/eslint-config-basic' },
          { text: 'Website', link: 'https://santi020k.com' }
        ]
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Configuration', link: '/guide/configuration' },
            { text: 'CLI', link: '/guide/cli' },
            { text: 'Inspector', link: '/guide/inspector' },
            { text: 'Playgrounds', link: '/guide/playgrounds' },
            { text: 'Changelog', link: '/guide/changelog' }
          ]
        }
      ],
      '/frameworks/': [
        {
          text: 'Framework Guides',
          items: [
            { text: 'TypeScript', link: '/frameworks/typescript' },
            { text: 'React', link: '/frameworks/react' },
            { text: 'Next.js', link: '/frameworks/next' },
            { text: 'Astro', link: '/frameworks/astro' },
            { text: 'Vue', link: '/frameworks/vue' },
            { text: 'Svelte', link: '/frameworks/svelte' },
            { text: 'Solid', link: '/frameworks/solid' },
            { text: 'Angular', link: '/frameworks/angular' },
            { text: 'NestJS', link: '/frameworks/nest' },
            { text: 'Expo', link: '/frameworks/expo' },
            { text: 'Qwik', link: '/frameworks/qwik' },
            { text: 'Remix', link: '/frameworks/remix' }
          ]
        }
      ],
      '/tooling/': [
        {
          text: 'Optional Tooling',
          items: [
            { text: 'Overview', link: '/tooling/overview' },
            { text: 'Libraries', link: '/tooling/libraries' },
            { text: 'Testing', link: '/tooling/testing' },
            { text: 'Formats', link: '/tooling/formats' },
            { text: 'Tools', link: '/tooling/tools' },
            { text: 'Extensions', link: '/tooling/extensions' }
          ]
        }
      ],
      '/packages/': [
        {
          text: 'Package Docs',
          items: [
            { text: 'Basic', link: '/packages/basic' },
            { text: 'Core', link: '/packages/core' },
            { text: 'Optionals', link: '/packages/optionals' },
            { text: 'Playground', link: '/packages/playground' },
            { text: 'Tests', link: '/packages/tests' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api/' },
            { text: 'Generated Reference Index', link: '/api/reference/' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/santi020k/eslint-config-basic' }
    ],
    outline: {
      level: [2, 3]
    },
    editLink: {
      pattern: 'https://github.com/santi020k/eslint-config-basic/edit/main/packages/docs/:path',
      text: 'Edit this page on GitHub'
    },
    docFooter: {
      prev: 'Previous',
      next: 'Next'
    },
    footer: {
      message: `Documentation site v${docsPkg.version} for @santi020k/eslint-config-basic`,
      copyright: 'Designed by Santiago Molina · MIT Licensed'
    }
  }
})
