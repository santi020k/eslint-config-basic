// cspell:words Fenix RoadScore KinJar
import type { EslintConfigOptions } from '@santi020k/eslint-config-basic'

interface ConsumerScenario {
  expectedScopes: { hasReact: boolean, hasWorkerGlobals: boolean, testingLibraryImports?: string }[]
  ignoredMobile: boolean
  files: Record<string, string>
  lintTargets: string[]
  name: string
  options: EslintConfigOptions
  requiredRules: string[]
}

/** Minimal public-contract reproductions of consumer layouts; no private source or application data. */
export const consumerScenarios: ConsumerScenario[] = [
  {
    expectedScopes: [{ hasReact: false, hasWorkerGlobals: false }, { hasReact: true, hasWorkerGlobals: false }],
    ignoredMobile: false,
    files: {
      'apps/docs/src/page.astro': "---\nconst label: { text: string } = { text: 'Lumen' }\n---\n<h1>{label.text}</h1>\n",
      'packages/components/src/Button.tsx': 'export const Button = () => <button type="button">Hello</button>\n'
    },
    lintTargets: ['apps/docs/src/page.astro', 'packages/components/src/Button.tsx'],
    name: 'Lumen mixed Astro and React workspace',
    options: {
      detection: false,
      projects: {
        'apps/docs': { frameworks: { astro: true }, typescript: 'syntax' },
        'packages/components': { frameworks: { react: true }, typescript: 'syntax' }
      },
      typescript: false
    },
    requiredRules: []
  },
  {
    expectedScopes: [{ hasReact: false, hasWorkerGlobals: false }, { hasReact: false, hasWorkerGlobals: false }],
    ignoredMobile: true,
    files: {
      'apps/mobile/src/App.tsx': 'this file belongs to the independent Expo lint command',
      'apps/web/src/page.astro': "---\nconst label: string = 'RoadScore'\n---\n<h1>{label}</h1>\n",
      'apps/web/src/check.ts': 'export const result = await 1\n',
      'apps/web/tsconfig.json': '{"compilerOptions":{"strict":true,"target":"ESNext","module":"ESNext"},"include":["src/**/*"]}'
    },
    lintTargets: ['apps/web/src/page.astro', 'apps/web/src/check.ts'],
    name: 'RoadScore and KinJar independently linted mobile app',
    options: {
      detection: false,
      ignores: ['apps/mobile/**'],
      projects: { 'apps/web': { frameworks: { astro: true }, typescript: 'type-aware' } },
      typescript: false
    },
    requiredRules: ['@typescript-eslint/await-thenable']
  },
  {
    expectedScopes: [{ hasReact: false, hasWorkerGlobals: false, testingLibraryImports: 'off' }, { hasReact: false, hasWorkerGlobals: false }],
    ignoredMobile: false,
    files: {
      'tests/browser/home.spec.ts': "import { test } from '@playwright/test'\ntest('home', async ({ page }) => {\n  await page.getByText('Ready')\n})\n",
      'tests/unit/library.spec.ts': "import { screen } from '@testing-library/dom'\nexport const element = await screen.getByText('Ready')\n"
    },
    lintTargets: ['tests/browser/home.spec.ts', 'tests/unit/library.spec.ts'],
    name: 'Website Playwright and Testing Library suite',
    options: {
      detection: false,
      testing: ['playwright', 'testing-library'],
      testingFiles: { playwright: ['tests/browser/**/*.spec.ts'] },
      typescript: 'syntax'
    },
    requiredRules: ['testing-library/no-await-sync-queries']
  },
  {
    expectedScopes: [{ hasReact: true, hasWorkerGlobals: false }, { hasReact: false, hasWorkerGlobals: true }],
    ignoredMobile: false,
    files: {
      'apps/client/src/Button.tsx': 'export const Button = () => <button type="button">Pay</button>\n',
      'apps/server/src/index.ts': 'export const response = new Response(\'ready\')\n'
    },
    lintTargets: ['apps/client/src/Button.tsx', 'apps/server/src/index.ts'],
    name: 'Fenix React and Hono runtime scopes',
    options: {
      detection: false,
      projects: {
        'apps/client': { frameworks: { react: true }, runtime: 'browser', typescript: 'syntax' },
        'apps/server': { frameworks: { hono: true }, runtime: 'cloudflare', typescript: 'syntax' }
      },
      typescript: false
    },
    requiredRules: []
  }
]
