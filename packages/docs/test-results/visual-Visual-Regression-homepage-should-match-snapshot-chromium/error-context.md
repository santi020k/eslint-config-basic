# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual.spec.ts >> Visual Regression >> homepage should match snapshot
- Location: tests/visual.spec.ts:8:3

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  Expected an image 1280px by 2160px, received 1280px by 2128px. 124217 pixels (ratio 0.05 of all image pixels) are different.

  Snapshot: homepage.png

Call log:
  - Expect "toHaveScreenshot(homepage.png)" with timeout 10000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - Expected an image 1280px by 2160px, received 1280px by 2128px. 124217 pixels (ratio 0.05 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - Expected an image 1280px by 2160px, received 1280px by 2128px. 124217 pixels (ratio 0.05 of all image pixels) are different.

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#_top"
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e5]:
        - link "Santi020k ESLint Config ESLint Config" [ref=e7] [cursor=pointer]:
          - /url: /
          - img "Santi020k ESLint Config" [ref=e8]
          - generic [ref=e9]: ESLint Config
        - button "Search" [ref=e12] [cursor=pointer]:
          - img [ref=e13]
          - generic [ref=e15]: Search
          - generic [ref=e16]:
            - generic [ref=e17]: ⌘
            - generic [ref=e18]: K
        - generic [ref=e19]:
          - generic "Select docs version" [ref=e20]:
            - combobox "Select docs version" [ref=e21]:
              - option "v2" [selected]
              - option "v1"
            - text: ▾
          - link "GitHub" [ref=e23] [cursor=pointer]:
            - /url: https://github.com/santi020k/eslint-config-basic
            - generic [ref=e24]: GitHub
            - img [ref=e25]
          - generic [ref=e28]:
            - generic [ref=e29]: Select theme
            - img
            - combobox "Select theme" [ref=e30] [cursor=pointer]:
              - option "Dark"
              - option "Light"
              - option "Auto" [selected]
            - img
    - main [ref=e34]:
      - generic [ref=e36]:
        - generic [ref=e37]:
          - generic [ref=e39]:
            - generic [ref=e40]:
              - img [ref=e42]
              - generic [ref=e48]: "@santi020k/eslint-config-basic"
            - generic [ref=e49]:
              - generic [ref=e50]: $ pnpm lint
              - generic [ref=e52]: 0 errors - strict mode ready
              - generic [ref=e53]: flat config composed in CI
            - generic [ref=e54]:
              - generic [ref=e55]: Base JavaScript + TypeScript
              - generic [ref=e56]: Framework guides and presets
              - generic [ref=e57]: Testing, formats, libraries, extensions
          - generic [ref=e58]:
            - generic [ref=e59]:
              - heading "Santi020k ESLint Config" [level=1] [ref=e60]
              - generic [ref=e61]: Stop wrestling with configuration. Compose intelligent, strict, and framework-aware ESLint rules across React, Next.js, Astro, Vue, Svelte, and 10+ modern frameworks instantly.
            - generic [ref=e62]:
              - link "Start with the guide" [ref=e63] [cursor=pointer]:
                - /url: /guide/getting-started
                - text: Start with the guide
                - img [ref=e64]
              - link "Configure manually" [ref=e66] [cursor=pointer]:
                - /url: /guide/configuration
              - link "Migrate from v1" [ref=e67] [cursor=pointer]:
                - /url: /guide/migration-v1-to-v2
        - generic [ref=e68]:
          - paragraph [ref=e69]: "import { Card, CardGrid, LinkCard, Icon } from ‘@astrojs/starlight/components’;"
          - generic [ref=e70]:
            - heading "BUILT FOR REAL REPOSITORIES" [level=2] [ref=e71]
            - generic [ref=e72]:
              - generic [ref=e73]:
                - strong [ref=e74]: ESLint 9/10+
                - generic [ref=e75]: flat config
              - generic [ref=e76]:
                - strong [ref=e77]: "15"
                - generic [ref=e78]: framework guides
              - generic [ref=e79]:
                - strong [ref=e80]: "26"
                - generic [ref=e81]: optional integrations
              - generic [ref=e82]:
                - strong [ref=e83]: CI
                - generic [ref=e84]: rollout patterns
          - generic [ref=e85]:
            - heading "Developer Experience First" [level=2] [ref=e86]
            - generic [ref=e87]:
              - link "01 - Install Seamlessly Wrangle the base package and get a robust, working flat config before setup becomes a bottleneck." [ref=e88] [cursor=pointer]:
                - /url: /guide/getting-started
                - strong [ref=e91]: 01 - Install Seamlessly
                - generic [ref=e92]: Wrangle the base package and get a robust, working flat config before setup becomes a bottleneck.
              - link "02 - Compose Deliberately Choose strict modes, project auto-detection, specific framework layers, and integrations without bloat." [ref=e93] [cursor=pointer]:
                - /url: /guide/configuration
                - strong [ref=e96]: 02 - Compose Deliberately
                - generic [ref=e97]: Choose strict modes, project auto-detection, specific framework layers, and integrations without bloat.
              - link "03 - Rollout Predictably Use playground fixtures and CI-friendly checks before enforcing rules into production repositories." [ref=e98] [cursor=pointer]:
                - /url: /guide/playgrounds
                - strong [ref=e101]: 03 - Rollout Predictably
                - generic [ref=e102]: Use playground fixtures and CI-friendly checks before enforcing rules into production repositories.
          - generic [ref=e103]:
            - heading "Seamless Ecosystem Integrations" [level=2] [ref=e104]
            - generic [ref=e105]:
              - link "TypeScript" [ref=e106] [cursor=pointer]:
                - /url: /frameworks/typescript
                - generic [ref=e107]: TypeScript
              - link "React" [ref=e108] [cursor=pointer]:
                - /url: /frameworks/react
                - generic [ref=e109]: React
              - link "Next.js" [ref=e110] [cursor=pointer]:
                - /url: /frameworks/next
                - generic [ref=e111]: Next.js
              - link "Astro" [ref=e112] [cursor=pointer]:
                - /url: /frameworks/astro
                - generic [ref=e113]: Astro
              - link "Vue" [ref=e114] [cursor=pointer]:
                - /url: /frameworks/vue
                - generic [ref=e115]: Vue
              - link "Svelte" [ref=e116] [cursor=pointer]:
                - /url: /frameworks/svelte
                - generic [ref=e117]: Svelte
              - link "Solid" [ref=e118] [cursor=pointer]:
                - /url: /frameworks/solid
                - generic [ref=e119]: Solid
              - link "Angular" [ref=e120] [cursor=pointer]:
                - /url: /frameworks/angular
                - generic [ref=e121]: Angular
              - link "NestJS" [ref=e122] [cursor=pointer]:
                - /url: /frameworks/nest
                - generic [ref=e123]: NestJS
              - link "Hono" [ref=e124] [cursor=pointer]:
                - /url: /frameworks/hono
                - generic [ref=e125]: Hono
              - link "Expo" [ref=e126] [cursor=pointer]:
                - /url: /frameworks/expo
                - generic [ref=e127]: Expo
              - link "Qwik" [ref=e128] [cursor=pointer]:
                - /url: /frameworks/qwik
                - generic [ref=e129]: Qwik
              - link "Remix" [ref=e130] [cursor=pointer]:
                - /url: /frameworks/remix
                - generic [ref=e131]: Remix
              - link "Vite" [ref=e132] [cursor=pointer]:
                - /url: /frameworks/vite
                - generic [ref=e133]: Vite
              - link "Slidev" [ref=e134] [cursor=pointer]:
                - /url: /frameworks/slidev
                - generic [ref=e135]: Slidev
          - generic [ref=e136]:
            - heading "Deep Dive Documentation" [level=2] [ref=e137]
            - generic [ref=e138]:
              - link "TypeScript-First Architecture Compose language, import, and runtime rules dynamically without locking every team into identical stacks." [ref=e139] [cursor=pointer]:
                - /url: /frameworks/typescript
                - strong [ref=e142]: TypeScript-First Architecture
                - generic [ref=e143]: Compose language, import, and runtime rules dynamically without locking every team into identical stacks.
              - link "Granular Tooling Add Prettier, Jest, Vitest, Playwright, Tailwind, and GraphQL integrations precisely where they belong." [ref=e144] [cursor=pointer]:
                - /url: /tooling/overview
                - strong [ref=e147]: Granular Tooling
                - generic [ref=e148]: Add Prettier, Jest, Vitest, Playwright, Tailwind, and GraphQL integrations precisely where they belong.
              - link "Automated Scaffolding Generate starter configurations, inspect underlying choices, and simplify monorepo linting via the CLI." [ref=e149] [cursor=pointer]:
                - /url: /guide/cli
                - strong [ref=e152]: Automated Scaffolding
                - generic [ref=e153]: Generate starter configurations, inspect underlying choices, and simplify monorepo linting via the CLI.
          - generic [ref=e154]:
            - heading "Project Reference" [level=2] [ref=e155]
            - generic [ref=e156]:
              - link "Package Boundaries Understand the core module, internal framework packages, integrations, playgrounds, and the testing suite." [ref=e157] [cursor=pointer]:
                - /url: /packages/basic
                - strong [ref=e160]: Package Boundaries
                - generic [ref=e161]: Understand the core module, internal framework packages, integrations, playgrounds, and the testing suite.
              - link "Generated API Reference Consult the TypeDoc reference when standard guides are not enough for complex implementation details." [ref=e162] [cursor=pointer]:
                - /url: /api/
                - strong [ref=e165]: Generated API Reference
                - generic [ref=e166]: Consult the TypeDoc reference when standard guides are not enough for complex implementation details.
              - link "Version 1 Legacy Archive Keep older projects unblocked and stable while newly developed work transitions through the v2 migration path." [ref=e167] [cursor=pointer]:
                - /url: /v1/
                - strong [ref=e170]: Version 1 Legacy Archive
                - generic [ref=e171]: Keep older projects unblocked and stable while newly developed work transitions through the v2 migration path.
        - generic [ref=e172]:
          - generic [ref=e173]:
            - link "Edit page" [ref=e174] [cursor=pointer]:
              - /url: https://github.com/santi020k/eslint-config-basic/edit/main/packages/docs/src/content/docs/index.md
              - img [ref=e175]
              - text: Edit page
            - paragraph [ref=e177]:
              - text: "Last updated:"
              - time [ref=e178]: Jun 11, 2026
          - link "Next Quick Start" [ref=e180] [cursor=pointer]:
            - /url: /guide/getting-started/
            - img [ref=e181]
            - generic [ref=e183]:
              - text: Next
              - text: Quick Start
```

# Test source

```ts
  1  | import { shouldRunVisualSnapshots, visualSnapshotSkipReason } from './helpers/visual-regression.js'
  2  | 
  3  | import { expect, test } from '@playwright/test'
  4  | 
  5  | test.describe('Visual Regression', () => {
  6  |   test.skip(!shouldRunVisualSnapshots, visualSnapshotSkipReason)
  7  | 
  8  |   test('homepage should match snapshot', async ({ page }) => {
  9  |     await page.goto('/')
  10 |     await page.waitForLoadState('networkidle')
  11 | 
  12 |     // Hide dynamic elements if necessary (e.g., date-based content)
  13 |     // await page.addStyleTag({ content: '.last-updated { display: none; }' })
  14 | 
> 15 |     await expect(page).toHaveScreenshot('homepage.png', {
     |                        ^ Error: expect(page).toHaveScreenshot(expected) failed
  16 |       fullPage: true,
  17 |       mask: [
  18 |         // Mask the "Last updated" section as it changes on every commit
  19 |         page.locator('.sl-flex.last-updated')
  20 |       ]
  21 |     })
  22 |   })
  23 | 
  24 |   test('dark mode homepage should match snapshot', async ({ page }) => {
  25 |     await page.goto('/')
  26 |     await page.emulateMedia({ colorScheme: 'dark' })
  27 |     await page.waitForLoadState('networkidle')
  28 | 
  29 |     await expect(page).toHaveScreenshot('homepage-dark.png', {
  30 |       fullPage: true,
  31 |       mask: [
  32 |         page.locator('.sl-flex.last-updated')
  33 |       ]
  34 |     })
  35 |   })
  36 | })
  37 | 
```