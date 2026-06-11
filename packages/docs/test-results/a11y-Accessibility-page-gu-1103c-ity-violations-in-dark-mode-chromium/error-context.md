# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> Accessibility >> page /guide/installation/ should have no accessibility violations in dark mode
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
+                 "html": "<a href=\"/guide/installation/\" aria-current=\"page\" class=\"astro-ujldrfsy\"> <span class=\"astro-ujldrfsy\">Installation</span>  </a>",
+                 "target": Array [
+                   "a[aria-current=\"page\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 1.94 (foreground color: #281745, background color: #5a0fdb, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"astro-ujldrfsy\">Installation</span>",
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
              - link "Install" [ref=e176] [cursor=pointer]:
                - /url: "#install"
            - listitem [ref=e177]:
              - link "Minimal Config" [ref=e178] [cursor=pointer]:
                - /url: "#minimal-config"
            - listitem [ref=e179]:
              - link "Explicit Frameworks" [ref=e180] [cursor=pointer]:
                - /url: "#explicit-frameworks"
            - listitem [ref=e181]:
              - link "Ignoring paths" [ref=e182] [cursor=pointer]:
                - /url: "#ignoring-paths"
            - listitem [ref=e183]:
              - link "Framework Matrix" [ref=e184] [cursor=pointer]:
                - /url: "#framework-matrix"
            - listitem [ref=e185]:
              - link "Integrations" [ref=e186] [cursor=pointer]:
                - /url: "#integrations"
            - listitem [ref=e187]:
              - link "Migration" [ref=e188] [cursor=pointer]:
                - /url: "#migration"
      - main [ref=e190]:
        - heading "Installation" [level=1] [ref=e193]
        - generic [ref=e195]:
          - generic [ref=e196]:
            - generic [ref=e197]:
              - heading "Requirements" [level=2] [ref=e198]
              - link "Section titled “Requirements”" [ref=e199] [cursor=pointer]:
                - /url: "#requirements"
                - img [ref=e201]
                - generic [ref=e203]: Section titled “Requirements”
            - list [ref=e204]:
              - listitem [ref=e205]:
                - text: Node.js
                - code [ref=e206]: ">=22.18.0"
              - listitem [ref=e207]:
                - text: ESLint
                - code [ref=e208]: 9+
                - text: or
                - code [ref=e209]: 10+
            - generic [ref=e210]:
              - heading "Install" [level=2] [ref=e211]
              - link "Section titled “Install”" [ref=e212] [cursor=pointer]:
                - /url: "#install"
                - img [ref=e214]
                - generic [ref=e216]: Section titled “Install”
            - paragraph [ref=e217]: "In v2, application projects install one public package:"
            - figure "pnpm" [ref=e219]:
              - generic [ref=e221]: pnpm
              - code [ref=e223]:
                - generic [ref=e225]: pnpm add -D @santi020k/eslint-config-basic
              - button "Copy to clipboard" [ref=e227] [cursor=pointer]
            - figure "npm" [ref=e230]:
              - generic [ref=e232]: npm
              - code [ref=e234]:
                - generic [ref=e236]: npm install -D @santi020k/eslint-config-basic
              - button "Copy to clipboard" [ref=e238] [cursor=pointer]
            - figure "yarn" [ref=e241]:
              - generic [ref=e243]: yarn
              - code [ref=e245]:
                - generic [ref=e247]: yarn add -D @santi020k/eslint-config-basic
              - button "Copy to clipboard" [ref=e249] [cursor=pointer]
            - figure "bun" [ref=e252]:
              - generic [ref=e254]: bun
              - code [ref=e256]:
                - generic [ref=e258]: bun add -d @santi020k/eslint-config-basic
              - button "Copy to clipboard" [ref=e260] [cursor=pointer]
            - paragraph [ref=e262]:
              - text: That package brings the framework config packages used by the composer. You no longer install
              - code [ref=e263]: "@santi020k/eslint-config-react"
              - text: ","
              - code [ref=e264]: "@santi020k/eslint-config-next"
              - text: ", or another framework config package in normal application projects."
            - generic [ref=e265]:
              - heading "Minimal Config" [level=2] [ref=e266]
              - link "Section titled “Minimal Config”" [ref=e267] [cursor=pointer]:
                - /url: "#minimal-config"
                - img [ref=e269]
                - generic [ref=e271]: Section titled “Minimal Config”
            - figure [ref=e273]:
              - code [ref=e276]:
                - generic [ref=e278]: "import { defineConfig } from '@santi020k/eslint-config-basic'"
                - generic [ref=e282]: export default await defineConfig()
              - button "Copy to clipboard" [ref=e284] [cursor=pointer]
            - paragraph [ref=e286]: The composer detects TypeScript, frameworks, runtime, and supported optional tooling from your project. You can keep the config minimal or make any choice explicit.
            - generic [ref=e287]:
              - heading "Explicit Frameworks" [level=2] [ref=e288]
              - link "Section titled “Explicit Frameworks”" [ref=e289] [cursor=pointer]:
                - /url: "#explicit-frameworks"
                - img [ref=e291]
                - generic [ref=e293]: Section titled “Explicit Frameworks”
            - paragraph [ref=e294]: "Use booleans when you want to enable framework configs manually:"
            - figure [ref=e296]:
              - code [ref=e299]:
                - generic [ref=e301]: "import { defineConfig } from '@santi020k/eslint-config-basic'"
                - generic [ref=e305]: "export default await defineConfig({"
                - generic [ref=e307]: "frameworks: {"
                - generic [ref=e310]: "next: true,"
                - generic [ref=e313]: "react: true"
                - generic [ref=e316]: "},"
                - generic [ref=e319]: "typescript: true"
                - generic [ref=e322]: "})"
              - button "Copy to clipboard" [ref=e324] [cursor=pointer]
            - paragraph [ref=e326]: Next.js, Expo, and Remix automatically include React rules when needed.
            - generic [ref=e327]:
              - heading "Ignoring paths" [level=2] [ref=e328]
              - link "Section titled “Ignoring paths”" [ref=e329] [cursor=pointer]:
                - /url: "#ignoring-paths"
                - img [ref=e331]
                - generic [ref=e333]: Section titled “Ignoring paths”
            - paragraph [ref=e334]:
              - text: Skip linting build artifacts or generated folders by passing
              - link "ignores" [ref=e335] [cursor=pointer]:
                - /url: /guide/configuration#additional-global-ignores
                - code [ref=e336]: ignores
              - text: "on"
              - code [ref=e337]: eslintConfig()
              - text: —same effect as a leading flat-config block that only sets
              - code [ref=e338]: ignores
              - text: ", without wrapping the export in an extra array."
            - figure [ref=e340]:
              - code [ref=e343]:
                - generic [ref=e345]: "import { defineConfig } from '@santi020k/eslint-config-basic'"
                - generic [ref=e349]: "export default await defineConfig({"
                - generic [ref=e351]: "ignores: ['dist/**', 'coverage/**']"
                - generic [ref=e354]: "})"
              - button "Copy to clipboard" [ref=e356] [cursor=pointer]
            - paragraph [ref=e358]:
              - text: See
              - link "Configuration" [ref=e359] [cursor=pointer]:
                - /url: /guide/configuration#additional-global-ignores
              - text: for presets, monorepo
              - code [ref=e360]: projects
              - text: ", and ESLint working-directory notes."
            - generic [ref=e361]:
              - heading "Framework Matrix" [level=2] [ref=e362]
              - link "Section titled “Framework Matrix”" [ref=e363] [cursor=pointer]:
                - /url: "#framework-matrix"
                - img [ref=e365]
                - generic [ref=e367]: Section titled “Framework Matrix”
            - table [ref=e368]:
              - rowgroup [ref=e369]:
                - row "Project Type Package To Install Enable With" [ref=e370]:
                  - columnheader "Project Type" [ref=e371]
                  - columnheader "Package To Install" [ref=e372]
                  - columnheader "Enable With" [ref=e373]
              - rowgroup [ref=e374]:
                - row "JavaScript @santi020k/eslint-config-basic eslintConfig()" [ref=e375]:
                  - cell "JavaScript" [ref=e376]
                  - cell "@santi020k/eslint-config-basic" [ref=e377]:
                    - code [ref=e378]: "@santi020k/eslint-config-basic"
                  - cell "eslintConfig()" [ref=e379]:
                    - code [ref=e380]: eslintConfig()
                - 'row "TypeScript @santi020k/eslint-config-basic typescript: true or auto-detection" [ref=e381]':
                  - cell "TypeScript" [ref=e382]
                  - cell "@santi020k/eslint-config-basic" [ref=e383]:
                    - code [ref=e384]: "@santi020k/eslint-config-basic"
                  - 'cell "typescript: true or auto-detection" [ref=e385]':
                    - code [ref=e386]: "typescript: true"
                    - text: or auto-detection
                - 'row "React @santi020k/eslint-config-basic frameworks.react: true" [ref=e387]':
                  - cell "React" [ref=e388]
                  - cell "@santi020k/eslint-config-basic" [ref=e389]:
                    - code [ref=e390]: "@santi020k/eslint-config-basic"
                  - 'cell "frameworks.react: true" [ref=e391]':
                    - code [ref=e392]: "frameworks.react: true"
                - 'row "Next.js @santi020k/eslint-config-basic frameworks.next: true" [ref=e393]':
                  - cell "Next.js" [ref=e394]
                  - cell "@santi020k/eslint-config-basic" [ref=e395]:
                    - code [ref=e396]: "@santi020k/eslint-config-basic"
                  - 'cell "frameworks.next: true" [ref=e397]':
                    - code [ref=e398]: "frameworks.next: true"
                - 'row "Astro @santi020k/eslint-config-basic frameworks.astro: true" [ref=e399]':
                  - cell "Astro" [ref=e400]
                  - cell "@santi020k/eslint-config-basic" [ref=e401]:
                    - code [ref=e402]: "@santi020k/eslint-config-basic"
                  - 'cell "frameworks.astro: true" [ref=e403]':
                    - code [ref=e404]: "frameworks.astro: true"
                - 'row "Vue @santi020k/eslint-config-basic frameworks.vue: true" [ref=e405]':
                  - cell "Vue" [ref=e406]
                  - cell "@santi020k/eslint-config-basic" [ref=e407]:
                    - code [ref=e408]: "@santi020k/eslint-config-basic"
                  - 'cell "frameworks.vue: true" [ref=e409]':
                    - code [ref=e410]: "frameworks.vue: true"
                - 'row "Svelte @santi020k/eslint-config-basic frameworks.svelte: true" [ref=e411]':
                  - cell "Svelte" [ref=e412]
                  - cell "@santi020k/eslint-config-basic" [ref=e413]:
                    - code [ref=e414]: "@santi020k/eslint-config-basic"
                  - 'cell "frameworks.svelte: true" [ref=e415]':
                    - code [ref=e416]: "frameworks.svelte: true"
                - 'row "Solid @santi020k/eslint-config-basic frameworks.solid: true" [ref=e417]':
                  - cell "Solid" [ref=e418]
                  - cell "@santi020k/eslint-config-basic" [ref=e419]:
                    - code [ref=e420]: "@santi020k/eslint-config-basic"
                  - 'cell "frameworks.solid: true" [ref=e421]':
                    - code [ref=e422]: "frameworks.solid: true"
                - 'row "Angular @santi020k/eslint-config-basic frameworks.angular: true" [ref=e423]':
                  - cell "Angular" [ref=e424]
                  - cell "@santi020k/eslint-config-basic" [ref=e425]:
                    - code [ref=e426]: "@santi020k/eslint-config-basic"
                  - 'cell "frameworks.angular: true" [ref=e427]':
                    - code [ref=e428]: "frameworks.angular: true"
                - 'row "NestJS @santi020k/eslint-config-basic frameworks.nest: true" [ref=e429]':
                  - cell "NestJS" [ref=e430]
                  - cell "@santi020k/eslint-config-basic" [ref=e431]:
                    - code [ref=e432]: "@santi020k/eslint-config-basic"
                  - 'cell "frameworks.nest: true" [ref=e433]':
                    - code [ref=e434]: "frameworks.nest: true"
                - 'row "Hono @santi020k/eslint-config-basic frameworks.hono: true" [ref=e435]':
                  - cell "Hono" [ref=e436]
                  - cell "@santi020k/eslint-config-basic" [ref=e437]:
                    - code [ref=e438]: "@santi020k/eslint-config-basic"
                  - 'cell "frameworks.hono: true" [ref=e439]':
                    - code [ref=e440]: "frameworks.hono: true"
                - 'row "Qwik @santi020k/eslint-config-basic frameworks.qwik: true" [ref=e441]':
                  - cell "Qwik" [ref=e442]
                  - cell "@santi020k/eslint-config-basic" [ref=e443]:
                    - code [ref=e444]: "@santi020k/eslint-config-basic"
                  - 'cell "frameworks.qwik: true" [ref=e445]':
                    - code [ref=e446]: "frameworks.qwik: true"
                - 'row "Remix @santi020k/eslint-config-basic frameworks.remix: true" [ref=e447]':
                  - cell "Remix" [ref=e448]
                  - cell "@santi020k/eslint-config-basic" [ref=e449]:
                    - code [ref=e450]: "@santi020k/eslint-config-basic"
                  - 'cell "frameworks.remix: true" [ref=e451]':
                    - code [ref=e452]: "frameworks.remix: true"
                - 'row "Expo @santi020k/eslint-config-basic frameworks.expo: true" [ref=e453]':
                  - cell "Expo" [ref=e454]
                  - cell "@santi020k/eslint-config-basic" [ref=e455]:
                    - code [ref=e456]: "@santi020k/eslint-config-basic"
                  - 'cell "frameworks.expo: true" [ref=e457]':
                    - code [ref=e458]: "frameworks.expo: true"
                - 'row "Vite @santi020k/eslint-config-basic frameworks.vite: true" [ref=e459]':
                  - cell "Vite" [ref=e460]
                  - cell "@santi020k/eslint-config-basic" [ref=e461]:
                    - code [ref=e462]: "@santi020k/eslint-config-basic"
                  - 'cell "frameworks.vite: true" [ref=e463]':
                    - code [ref=e464]: "frameworks.vite: true"
                - 'row "Slidev @santi020k/eslint-config-basic frameworks.slidev: true" [ref=e465]':
                  - cell "Slidev" [ref=e466]
                  - cell "@santi020k/eslint-config-basic" [ref=e467]:
                    - code [ref=e468]: "@santi020k/eslint-config-basic"
                  - 'cell "frameworks.slidev: true" [ref=e469]':
                    - code [ref=e470]: "frameworks.slidev: true"
            - generic [ref=e471]:
              - heading "Integrations" [level=2] [ref=e472]
              - link "Section titled “Integrations”" [ref=e473] [cursor=pointer]:
                - /url: "#integrations"
                - img [ref=e475]
                - generic [ref=e477]: Section titled “Integrations”
            - paragraph [ref=e478]: "Optional integrations still use the same categories:"
            - table [ref=e479]:
              - rowgroup [ref=e480]:
                - row "Category Configure Through Documentation" [ref=e481]:
                  - columnheader "Category" [ref=e482]
                  - columnheader "Configure Through" [ref=e483]
                  - columnheader "Documentation" [ref=e484]
              - rowgroup [ref=e485]:
                - row "Libraries libraries Libraries" [ref=e486]:
                  - cell "Libraries" [ref=e487]
                  - cell "libraries" [ref=e488]:
                    - code [ref=e489]: libraries
                  - cell "Libraries" [ref=e490]:
                    - link "Libraries" [ref=e491] [cursor=pointer]:
                      - /url: /tooling/libraries
                - row "Testing testing Testing" [ref=e492]:
                  - cell "Testing" [ref=e493]
                  - cell "testing" [ref=e494]:
                    - code [ref=e495]: testing
                  - cell "Testing" [ref=e496]:
                    - link "Testing" [ref=e497] [cursor=pointer]:
                      - /url: /tooling/testing
                - row "Formats formats Formats" [ref=e498]:
                  - cell "Formats" [ref=e499]
                  - cell "formats" [ref=e500]:
                    - code [ref=e501]: formats
                  - cell "Formats" [ref=e502]:
                    - link "Formats" [ref=e503] [cursor=pointer]:
                      - /url: /tooling/formats
                - row "Tools tools Tools" [ref=e504]:
                  - cell "Tools" [ref=e505]
                  - cell "tools" [ref=e506]:
                    - code [ref=e507]: tools
                  - cell "Tools" [ref=e508]:
                    - link "Tools" [ref=e509] [cursor=pointer]:
                      - /url: /tooling/tools
                - row "Extensions extensions Extensions" [ref=e510]:
                  - cell "Extensions" [ref=e511]
                  - cell "extensions" [ref=e512]:
                    - code [ref=e513]: extensions
                  - cell "Extensions" [ref=e514]:
                    - link "Extensions" [ref=e515] [cursor=pointer]:
                      - /url: /tooling/extensions
            - generic [ref=e516]:
              - heading "Migration" [level=2] [ref=e517]
              - link "Section titled “Migration”" [ref=e518] [cursor=pointer]:
                - /url: "#migration"
                - img [ref=e520]
                - generic [ref=e522]: Section titled “Migration”
            - paragraph [ref=e523]:
              - text: If you are upgrading from v1, read the
              - link "v1 to v2 migration guide" [ref=e524] [cursor=pointer]:
                - /url: /guide/migration-v1-to-v2
              - text: ". The short version is: remove extra"
              - code [ref=e525]: "@santi020k/eslint-config-*"
              - text: framework installs from your app and replace imported framework values with
              - code [ref=e526]: "true"
              - text: .
          - generic [ref=e527]:
            - generic [ref=e528]:
              - link "Edit page" [ref=e529] [cursor=pointer]:
                - /url: https://github.com/santi020k/eslint-config-basic/edit/main/packages/docs/src/content/docs/guide/installation.md
                - img [ref=e530]
                - text: Edit page
              - paragraph [ref=e532]:
                - text: "Last updated:"
                - time [ref=e533]: Jun 11, 2026
            - generic [ref=e534]:
              - link "Previous Quick Start" [ref=e535] [cursor=pointer]:
                - /url: /guide/getting-started/
                - img [ref=e536]
                - generic [ref=e538]:
                  - text: Previous
                  - text: Quick Start
              - link "Next Configuration" [ref=e539] [cursor=pointer]:
                - /url: /guide/configuration/
                - img [ref=e540]
                - generic [ref=e542]:
                  - text: Next
                  - text: Configuration
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