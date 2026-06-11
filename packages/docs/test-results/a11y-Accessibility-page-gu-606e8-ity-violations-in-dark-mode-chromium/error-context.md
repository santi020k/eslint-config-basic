# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> Accessibility >> page /guide/getting-started/ should have no accessibility violations in dark mode
- Location: tests/a11y.spec.ts:66:5

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 58

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#5a0fdb",
+               "contrastRatio": 1.94,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#281745",
+               "fontSize": "10.5pt (14px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 1.94 (foreground color: #281745, background color: #5a0fdb, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<a href=\"/guide/getting-started/\" aria-current=\"page\" class=\"astro-ujldrfsy\"> <span class=\"astro-ujldrfsy\">Quick Start</span>  </a>",
+                 "target": Array [
+                   "a[aria-current=\"page\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 1.94 (foreground color: #281745, background color: #5a0fdb, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"astro-ujldrfsy\">Quick Start</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[aria-current=\"page\"] > span",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
+ ]
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
    - navigation "Main":
      - list [ref=e34]:
        - listitem [ref=e35]:
          - group [ref=e36]:
            - generic "Current Docs (v2)" [ref=e37] [cursor=pointer]:
              - generic [ref=e38]: Current Docs (v2)
              - img [ref=e39]
            - list [ref=e41]:
              - listitem [ref=e42]:
                - group [ref=e43]:
                  - generic "Getting Started" [ref=e44] [cursor=pointer]:
                    - generic [ref=e45]: Getting Started
                    - img [ref=e46]
                  - list [ref=e48]:
                    - listitem [ref=e49]:
                      - link "Introduction" [ref=e50] [cursor=pointer]:
                        - /url: /
                    - listitem [ref=e51]:
                      - link "Quick Start" [ref=e52] [cursor=pointer]:
                        - /url: /guide/getting-started/
                    - listitem [ref=e53]:
                      - link "Installation" [ref=e54] [cursor=pointer]:
                        - /url: /guide/installation/
                    - listitem [ref=e55]:
                      - link "Configuration" [ref=e56] [cursor=pointer]:
                        - /url: /guide/configuration/
                    - listitem [ref=e57]:
                      - link "Presets" [ref=e58] [cursor=pointer]:
                        - /url: /guide/presets/
                    - listitem [ref=e59]:
                      - link "Runtime" [ref=e60] [cursor=pointer]:
                        - /url: /guide/runtime/
                    - listitem [ref=e61]:
                      - link "Monorepo" [ref=e62] [cursor=pointer]:
                        - /url: /guide/monorepo/
                    - listitem [ref=e63]:
                      - link "AI & Agents Beta" [ref=e64] [cursor=pointer]:
                        - /url: /guide/ai-agents/
                        - text: AI & Agents
                        - generic [ref=e65]: Beta
                    - listitem [ref=e66]:
                      - link "Migrate from v1 Migration" [ref=e67] [cursor=pointer]:
                        - /url: /guide/migration-v1-to-v2/
                        - text: Migrate from v1
                        - generic [ref=e68]: Migration
              - listitem [ref=e69]:
                - group [ref=e70]:
                  - generic "Frameworks" [ref=e71] [cursor=pointer]:
                    - generic [ref=e72]: Frameworks
                    - img [ref=e73]
                  - list [ref=e75]:
                    - listitem [ref=e76]:
                      - link "TypeScript Core" [ref=e77] [cursor=pointer]:
                        - /url: /frameworks/typescript/
                        - text: TypeScript
                        - generic [ref=e78]: Core
                    - listitem [ref=e79]:
                      - link "React" [ref=e80] [cursor=pointer]:
                        - /url: /frameworks/react/
                    - listitem [ref=e81]:
                      - link "Next.js" [ref=e82] [cursor=pointer]:
                        - /url: /frameworks/next/
                    - listitem [ref=e83]:
                      - link "Astro" [ref=e84] [cursor=pointer]:
                        - /url: /frameworks/astro/
                    - listitem [ref=e85]:
                      - link "Vue" [ref=e86] [cursor=pointer]:
                        - /url: /frameworks/vue/
                    - listitem [ref=e87]:
                      - link "Svelte" [ref=e88] [cursor=pointer]:
                        - /url: /frameworks/svelte/
                    - listitem [ref=e89]:
                      - link "Solid" [ref=e90] [cursor=pointer]:
                        - /url: /frameworks/solid/
                    - listitem [ref=e91]:
                      - link "Angular" [ref=e92] [cursor=pointer]:
                        - /url: /frameworks/angular/
                    - listitem [ref=e93]:
                      - link "NestJS" [ref=e94] [cursor=pointer]:
                        - /url: /frameworks/nest/
                    - listitem [ref=e95]:
                      - link "Hono" [ref=e96] [cursor=pointer]:
                        - /url: /frameworks/hono/
                    - listitem [ref=e97]:
                      - link "Expo" [ref=e98] [cursor=pointer]:
                        - /url: /frameworks/expo/
                    - listitem [ref=e99]:
                      - link "Qwik" [ref=e100] [cursor=pointer]:
                        - /url: /frameworks/qwik/
                    - listitem [ref=e101]:
                      - link "Remix" [ref=e102] [cursor=pointer]:
                        - /url: /frameworks/remix/
                    - listitem [ref=e103]:
                      - link "Vite" [ref=e104] [cursor=pointer]:
                        - /url: /frameworks/vite/
                    - listitem [ref=e105]:
                      - link "Slidev" [ref=e106] [cursor=pointer]:
                        - /url: /frameworks/slidev/
              - listitem [ref=e107]:
                - group [ref=e108]:
                  - generic "Tooling & Integrations" [ref=e109] [cursor=pointer]:
                    - generic [ref=e110]: Tooling & Integrations
                    - img [ref=e111]
                  - list [ref=e113]:
                    - listitem [ref=e114]:
                      - link "Ecosystem Overview" [ref=e115] [cursor=pointer]:
                        - /url: /tooling/overview/
                    - listitem [ref=e116]:
                      - link "Testing Tools" [ref=e117] [cursor=pointer]:
                        - /url: /tooling/testing/
                    - listitem [ref=e118]:
                      - link "Formatters" [ref=e119] [cursor=pointer]:
                        - /url: /tooling/formats/
                    - listitem [ref=e120]:
                      - link "Libraries" [ref=e121] [cursor=pointer]:
                        - /url: /tooling/libraries/
                    - listitem [ref=e122]:
                      - link "Utilities" [ref=e123] [cursor=pointer]:
                        - /url: /tooling/tools/
                    - listitem [ref=e124]:
                      - link "Extensions" [ref=e125] [cursor=pointer]:
                        - /url: /tooling/extensions/
              - listitem [ref=e126]:
                - group [ref=e127]:
                  - generic "Architecture & API" [ref=e128] [cursor=pointer]:
                    - generic [ref=e129]: Architecture & API
                    - img [ref=e130]
                  - list [ref=e132]:
                    - listitem [ref=e133]:
                      - link "Architecture Notes" [ref=e134] [cursor=pointer]:
                        - /url: /guide/architecture/
                    - listitem [ref=e135]:
                      - link "Development Guide" [ref=e136] [cursor=pointer]:
                        - /url: /guide/development/
                    - listitem [ref=e137]:
                      - link "Inspector" [ref=e138] [cursor=pointer]:
                        - /url: /guide/inspector/
                    - listitem [ref=e139]:
                      - link "Playgrounds" [ref=e140] [cursor=pointer]:
                        - /url: /guide/playgrounds/
                    - listitem [ref=e141]:
                      - link "CLI Reference" [ref=e142] [cursor=pointer]:
                        - /url: /guide/cli/
                    - listitem [ref=e143]:
                      - link "Core Config Main" [ref=e144] [cursor=pointer]:
                        - /url: /packages/basic/
                        - text: Core Config
                        - generic [ref=e145]: Main
                    - listitem [ref=e146]:
                      - link "Base Rules" [ref=e147] [cursor=pointer]:
                        - /url: /packages/core/
                    - listitem [ref=e148]:
                      - link "Integrations" [ref=e149] [cursor=pointer]:
                        - /url: /packages/integrations/
                    - listitem [ref=e150]:
                      - link "Playground" [ref=e151] [cursor=pointer]:
                        - /url: /packages/playground/
                    - listitem [ref=e152]:
                      - link "Testing Suite" [ref=e153] [cursor=pointer]:
                        - /url: /packages/tests/
                    - listitem [ref=e154]:
                      - link "API Reference" [ref=e155] [cursor=pointer]:
                        - /url: /api/
                    - listitem [ref=e156]:
                      - link "Generated Types" [ref=e157] [cursor=pointer]:
                        - /url: /api/reference/
                    - listitem [ref=e158]:
                      - link "Troubleshooting New" [ref=e159] [cursor=pointer]:
                        - /url: /guide/troubleshooting/
                        - text: Troubleshooting
                        - generic [ref=e160]: New
        - listitem
    - generic [ref=e162]:
      - complementary [ref=e163]:
        - navigation "On this page" [ref=e168]:
          - heading "On this page" [level=2] [ref=e169]
          - list [ref=e170]:
            - listitem [ref=e171]:
              - link "Overview" [ref=e172] [cursor=pointer]:
                - /url: "#_top"
            - listitem [ref=e173]:
              - link "Requirements" [ref=e174] [cursor=pointer]:
                - /url: "#requirements"
            - listitem [ref=e175]:
              - link "Setup Process" [ref=e176] [cursor=pointer]:
                - /url: "#setup-process"
            - listitem [ref=e177]:
              - link "Understand the Architecture" [ref=e178] [cursor=pointer]:
                - /url: "#understand-the-architecture"
            - listitem [ref=e179]:
              - link "Pick the Right Starting Point" [ref=e180] [cursor=pointer]:
                - /url: "#pick-the-right-starting-point"
            - listitem [ref=e181]:
              - link "Next Steps" [ref=e182] [cursor=pointer]:
                - /url: "#next-steps"
      - main [ref=e184]:
        - heading "Getting Started" [level=1] [ref=e187]
        - generic [ref=e189]:
          - generic [ref=e190]:
            - paragraph [ref=e191]:
              - text: This library is a DX-first, composable ESLint 9/10+ flat-config toolkit for JavaScript and TypeScript teams. In v2, application projects install
              - link "@santi020k/eslint-config-basic" [ref=e192] [cursor=pointer]:
                - /url: https://www.npmjs.com/package/@santi020k/eslint-config-basic
                - code [ref=e193]: "@santi020k/eslint-config-basic"
              - text: and enable bundled framework configs directly from it.
            - generic [ref=e194]:
              - heading "Requirements" [level=2] [ref=e195]
              - link "Section titled “Requirements”" [ref=e196] [cursor=pointer]:
                - /url: "#requirements"
                - img [ref=e198]
                - generic [ref=e200]: Section titled “Requirements”
            - list [ref=e201]:
              - listitem [ref=e202]:
                - text: Node.js
                - code [ref=e203]: ">=22.18.0"
              - listitem [ref=e204]:
                - text: ESLint
                - code [ref=e205]: 9+
            - generic [ref=e206]:
              - heading "Setup Process" [level=2] [ref=e207]
              - link "Section titled “Setup Process”" [ref=e208] [cursor=pointer]:
                - /url: "#setup-process"
                - img [ref=e210]
                - generic [ref=e212]: Section titled “Setup Process”
            - list [ref=e213]:
              - listitem [ref=e214]:
                - paragraph [ref=e215]:
                  - strong [ref=e216]: Install the Base Package
                - paragraph [ref=e217]: The smallest install is the main package itself. It brings a supported ESLint version automatically.
                - generic [ref=e218]:
                  - tablist [ref=e220]:
                    - tab "pnpm" [selected] [ref=e221] [cursor=pointer]
                    - tab "npm" [ref=e222] [cursor=pointer]
                    - tab "yarn" [ref=e223] [cursor=pointer]
                    - tab "bun" [ref=e224] [cursor=pointer]
                  - tabpanel "pnpm" [ref=e225]:
                    - figure "Terminal window" [ref=e227]:
                      - generic [ref=e229]: Terminal window
                      - code [ref=e231]:
                        - generic [ref=e233]: pnpm add -D @santi020k/eslint-config-basic
                      - button "Copy to clipboard" [ref=e235] [cursor=pointer]
              - listitem [ref=e237]:
                - paragraph [ref=e238]:
                  - strong [ref=e239]: Create Configuration File
                - paragraph [ref=e240]:
                  - text: Create an
                  - code [ref=e241]: eslint.config.mjs
                  - text: file, or
                  - code [ref=e242]: eslint.config.js
                  - text: if your project uses
                  - code [ref=e243]: "\"type\": \"module\""
                  - text: .
                - figure "eslint.config.mjs" [ref=e245]:
                  - generic [ref=e247]: eslint.config.mjs
                  - code [ref=e249]:
                    - generic [ref=e251]: "import { defineConfig } from '@santi020k/eslint-config-basic'"
                    - generic [ref=e255]: export default await defineConfig()
                  - button "Copy to clipboard" [ref=e257] [cursor=pointer]
            - generic [ref=e259]:
              - heading "Understand the Architecture" [level=2] [ref=e260]
              - link "Section titled “Understand the Architecture”" [ref=e261] [cursor=pointer]:
                - /url: "#understand-the-architecture"
                - img [ref=e263]
                - generic [ref=e265]: Section titled “Understand the Architecture”
            - generic [ref=e266]:
              - article [ref=e267]:
                - paragraph [ref=e268]:
                  - img [ref=e269]
                  - generic [ref=e272]: Unified Entry
                - paragraph [ref=e274]:
                  - code [ref=e275]: "@santi020k/eslint-config-basic"
                  - text: is the main package. You no longer need to install framework configs directly.
              - article [ref=e276]:
                - paragraph [ref=e277]:
                  - img [ref=e278]
                  - generic [ref=e280]: Enum Based Toggles
                - paragraph [ref=e282]: Integrations are enabled through enums from the main package instead of scattered config objects.
              - article [ref=e283]:
                - paragraph [ref=e284]:
                  - img [ref=e285]
                  - generic [ref=e287]: Flexible Versions
                - paragraph [ref=e289]:
                  - text: ESLint can still be installed manually if you want to pin it yourself, as long as you stay on
                  - code [ref=e290]: ^9
                  - text: or
                  - code [ref=e291]: ^10
                  - text: .
            - generic [ref=e292]:
              - heading "Pick the Right Starting Point" [level=2] [ref=e293]
              - link "Section titled “Pick the Right Starting Point”" [ref=e294] [cursor=pointer]:
                - /url: "#pick-the-right-starting-point"
                - img [ref=e296]
                - generic [ref=e298]: Section titled “Pick the Right Starting Point”
            - paragraph [ref=e299]: "Use the links below to navigate based on your immediate needs:"
            - list [ref=e300]:
              - listitem [ref=e301]:
                - strong [ref=e302]:
                  - link "Configuration" [ref=e303] [cursor=pointer]:
                    - /url: /guide/configuration
                  - text: ":"
                - text: When you want to compose the config manually.
              - listitem [ref=e304]:
                - strong [ref=e305]:
                  - link "CLI" [ref=e306] [cursor=pointer]:
                    - /url: /guide/cli
                  - text: ":"
                - text: When you want a generated starting file.
              - listitem [ref=e307]:
                - strong [ref=e308]:
                  - link "Frameworks" [ref=e309] [cursor=pointer]:
                    - /url: /frameworks/typescript
                  - text: ":"
                - text: When you already know the application stack.
              - listitem [ref=e310]:
                - strong [ref=e311]:
                  - link "Integrations" [ref=e312] [cursor=pointer]:
                    - /url: /tooling/overview
                  - text: ":"
                - text: When the main need is integrating Tailwind, Vitest, Prettier, or similar packages.
              - listitem [ref=e313]:
                - strong [ref=e314]:
                  - link "Packages" [ref=e315] [cursor=pointer]:
                    - /url: /packages/basic
                  - text: ":"
                - text: When you want to understand how the monorepo is organized.
            - generic [ref=e316]:
              - heading "Next Steps" [level=2] [ref=e317]
              - link "Section titled “Next Steps”" [ref=e318] [cursor=pointer]:
                - /url: "#next-steps"
                - img [ref=e320]
                - generic [ref=e322]: Section titled “Next Steps”
            - list [ref=e323]:
              - listitem [ref=e324]:
                - text: Continue with
                - strong [ref=e325]:
                  - link "Detailed Installation" [ref=e326] [cursor=pointer]:
                    - /url: /guide/installation
              - listitem [ref=e327]:
                - text: Review
                - strong [ref=e328]:
                  - link "Configuration Options" [ref=e329] [cursor=pointer]:
                    - /url: /guide/configuration
              - listitem [ref=e330]:
                - text: Use the
                - strong [ref=e331]:
                  - link "CLI generator" [ref=e332] [cursor=pointer]:
                    - /url: /guide/cli
                - text: if you want scaffolding
              - listitem [ref=e333]:
                - text: Jump to
                - strong [ref=e334]:
                  - link "Framework Guides" [ref=e335] [cursor=pointer]:
                    - /url: /frameworks/typescript
          - generic [ref=e336]:
            - generic [ref=e337]:
              - link "Edit page" [ref=e338] [cursor=pointer]:
                - /url: https://github.com/santi020k/eslint-config-basic/edit/main/packages/docs/src/content/docs/guide/getting-started.mdx
                - img [ref=e339]
                - text: Edit page
              - paragraph [ref=e341]:
                - text: "Last updated:"
                - time [ref=e342]: Jun 11, 2026
            - generic [ref=e343]:
              - link "Previous Introduction" [ref=e344] [cursor=pointer]:
                - /url: /
                - img [ref=e345]
                - generic [ref=e347]:
                  - text: Previous
                  - text: Introduction
              - link "Next Installation" [ref=e348] [cursor=pointer]:
                - /url: /guide/installation/
                - img [ref=e349]
                - generic [ref=e351]:
                  - text: Next
                  - text: Installation
```

# Test source

```ts
  1  | import { AxeBuilder } from '@axe-core/playwright'
  2  | import { expect, type Page } from '@playwright/test'
  3  | 
  4  | interface AllowedViolation {
  5  |   htmlIncludes?: string
  6  |   id: string
  7  |   targetIncludes?: string
  8  | }
  9  | 
  10 | const matchesAllowedNode = (
  11 |   node: { html: string, target: readonly unknown[] },
  12 |   allowedViolation: AllowedViolation
  13 | ) => {
  14 |   const matchesHtml = allowedViolation.htmlIncludes ?
  15 |     node.html.includes(allowedViolation.htmlIncludes) :
  16 |     true
  17 | 
  18 |   const { targetIncludes } = allowedViolation
  19 | 
  20 |   const matchesTarget = targetIncludes ?
  21 |     node.target.some(target => String(target).includes(targetIncludes)) :
  22 |     true
  23 | 
  24 |   return matchesHtml && matchesTarget
  25 | }
  26 | 
  27 | /**
  28 |  * Performs an axe-core accessibility scan on the current page and asserts that there are no
  29 |  * unexpected violations.
  30 |  */
  31 | export const expectNoUnexpectedAccessibilityViolations = async (
  32 |   page: Page,
  33 |   allowedViolations: AllowedViolation[] = []
  34 | ) => {
  35 |   // Wait for finite CSS animations to finish so axe-core measures final rendered
  36 |   // colors, not composited mid-animation values (e.g. opacity fade-ins blending
  37 |   // brand purple with the page background would report false contrast failures).
  38 |   await page.evaluate(async () => {
  39 |     await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => {
  40 |       resolve()
  41 |     })))
  42 | 
  43 |     const finiteAnimations = document.getAnimations().filter(
  44 |       a => a.effect?.getTiming().iterations !== Infinity
  45 |     )
  46 | 
  47 |     await Promise.all(finiteAnimations.map(a => a.finished.catch(() => { /* noop */ })))
  48 |   })
  49 | 
  50 |   const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
  51 | 
  52 |   const unexpectedViolations = accessibilityScanResults.violations.flatMap(violation => {
  53 |     const unexpectedNodes = violation.nodes.filter(
  54 |       node => !allowedViolations.some(
  55 |         allowedViolation => violation.id === allowedViolation.id && matchesAllowedNode(node, allowedViolation)
  56 |       )
  57 |     )
  58 | 
  59 |     if (unexpectedNodes.length === 0) {
  60 |       return []
  61 |     }
  62 | 
  63 |     return [{ ...violation, nodes: unexpectedNodes }]
  64 |   })
  65 | 
> 66 |   expect(unexpectedViolations).toEqual([])
     |                                ^ Error: expect(received).toEqual(expected) // deep equality
  67 | }
  68 | 
```