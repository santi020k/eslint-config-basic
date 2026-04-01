import { defineConfig } from 'vitepress'

const base = process.env.DOCS_BASE ?? '/'
const site = process.env.DOCS_SITE_URL ?? 'https://eslint.santi020k.me'

export default defineConfig({
  title: 'Santi020k ESLint',
  description: 'Composable ESLint 10+ flat-config documentation for the @santi020k/eslint-config-basic monorepo.',
  base,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#114d66' }],
    ['meta', { property: 'og:site_name', content: 'Santi020k ESLint' }],
    ['meta', { property: 'og:type', content: 'website' }]
  ],
  sitemap: {
    hostname: site
  },
  themeConfig: {
    siteTitle: 'Santi020k ESLint',
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Frameworks', link: '/frameworks/typescript' },
      { text: 'Tooling', link: '/tooling/overview' },
      { text: 'Packages', link: '/packages/basic' },
      { text: 'API', link: '/api/' },
      { text: 'GitHub', link: 'https://github.com/santi020k/eslint-config-basic' },
      { text: 'Website', link: 'https://santi020k.me' }
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
            { text: 'Playgrounds', link: '/guide/playgrounds' }
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
      message: 'Built by Santi020k. Repo and personal site linked throughout the docs.',
      copyright: 'MIT Licensed'
    }
  }
})
