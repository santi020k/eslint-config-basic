# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> Accessibility >> page /guide/migration-v1-to-v2/ should have no accessibility violations in dark mode
- Location: tests/a11y.spec.ts:66:5

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 93

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
+                 "html": "<a href=\"/guide/migration-v1-to-v2/\" aria-current=\"page\" class=\"astro-ujldrfsy\"> <span class=\"astro-ujldrfsy\">Migrate from v1</span> <span class=\"sl-badge tip small  astro-ujldrfsy astro-246wmyaq\">Migration</span> </a>",
+                 "target": Array [
+                   "a[href$=\"migration-v1-to-v2/\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 1.94 (foreground color: #281745, background color: #5a0fdb, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"astro-ujldrfsy\">Migrate from v1</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"migration-v1-to-v2/\"] > .astro-ujldrfsy:nth-child(1)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#5a0fdb",
+               "contrastRatio": 1.94,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#281745",
+               "fontSize": "9.8pt (13px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 1.94 (foreground color: #281745, background color: #5a0fdb, font size: 9.8pt (13px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<a href=\"/guide/migration-v1-to-v2/\" aria-current=\"page\" class=\"astro-ujldrfsy\"> <span class=\"astro-ujldrfsy\">Migrate from v1</span> <span class=\"sl-badge tip small  astro-ujldrfsy astro-246wmyaq\">Migration</span> </a>",
+                 "target": Array [
+                   "a[href$=\"migration-v1-to-v2/\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 1.94 (foreground color: #281745, background color: #5a0fdb, font size: 9.8pt (13px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"sl-badge tip small  astro-ujldrfsy astro-246wmyaq\">Migration</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".tip",
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
              - link "What Changed" [ref=e174] [cursor=pointer]:
                - /url: "#what-changed"
            - listitem [ref=e175]:
              - link "Package Changes" [ref=e176] [cursor=pointer]:
                - /url: "#package-changes"
            - listitem [ref=e177]:
              - link "Config Changes" [ref=e178] [cursor=pointer]:
                - /url: "#config-changes"
            - listitem [ref=e179]:
              - link "Auto-Detection" [ref=e180] [cursor=pointer]:
                - /url: "#auto-detection"
            - listitem [ref=e181]:
              - link "New v2 Control Flags" [ref=e182] [cursor=pointer]:
                - /url: "#new-v2-control-flags"
            - listitem [ref=e183]:
              - link "New v2 Presets" [ref=e184] [cursor=pointer]:
                - /url: "#new-v2-presets"
            - listitem [ref=e185]:
              - link "Monorepo Projects" [ref=e186] [cursor=pointer]:
                - /url: "#monorepo-projects"
            - listitem [ref=e187]:
              - link "Migration CLI" [ref=e188] [cursor=pointer]:
                - /url: "#migration-cli"
            - listitem [ref=e189]:
              - link "Troubleshooting" [ref=e190] [cursor=pointer]:
                - /url: "#troubleshooting"
            - listitem [ref=e191]:
              - link "Keeping v1 Docs" [ref=e192] [cursor=pointer]:
                - /url: "#keeping-v1-docs"
      - main [ref=e194]:
        - heading "Migrating from v1 to v2" [level=1] [ref=e197]
        - generic [ref=e199]:
          - generic [ref=e200]:
            - paragraph [ref=e201]:
              - text: "Version 2 moves the npm-level public API to a single package:"
              - code [ref=e202]: "@santi020k/eslint-config-basic"
              - text: .
            - paragraph [ref=e203]: The internal architecture is still modular, but application projects no longer need to install or import separate framework config packages.
            - generic [ref=e204]:
              - heading "What Changed" [level=2] [ref=e205]
              - link "Section titled “What Changed”" [ref=e206] [cursor=pointer]:
                - /url: "#what-changed"
                - img [ref=e208]
                - generic [ref=e210]: Section titled “What Changed”
            - table [ref=e211]:
              - rowgroup [ref=e212]:
                - row "v1 v2" [ref=e213]:
                  - columnheader "v1" [ref=e214]
                  - columnheader "v2" [ref=e215]
              - rowgroup [ref=e216]:
                - row "Install basic plus framework config packages. Install only @santi020k/eslint-config-basic." [ref=e217]:
                  - cell "Install basic plus framework config packages." [ref=e218]:
                    - text: Install
                    - code [ref=e219]: basic
                    - text: plus framework config packages.
                  - cell "Install only @santi020k/eslint-config-basic." [ref=e220]:
                    - text: Install only
                    - code [ref=e221]: "@santi020k/eslint-config-basic"
                    - text: .
                - 'row "Import framework configs from @santi020k/eslint-config-react, @santi020k/eslint-config-next, etc. Use frameworks.<name>: true." [ref=e222]':
                  - cell "Import framework configs from @santi020k/eslint-config-react, @santi020k/eslint-config-next, etc." [ref=e223]:
                    - text: Import framework configs from
                    - code [ref=e224]: "@santi020k/eslint-config-react"
                    - text: ","
                    - code [ref=e225]: "@santi020k/eslint-config-next"
                    - text: ", etc."
                  - 'cell "Use frameworks.<name>: true." [ref=e226]':
                    - text: Use
                    - code [ref=e227]: "frameworks.<name>: true"
                    - text: .
                - row "Detected frameworks were informational. Detected frameworks are enabled by eslintConfig() by default." [ref=e228]:
                  - cell "Detected frameworks were informational." [ref=e229]
                  - cell "Detected frameworks are enabled by eslintConfig() by default." [ref=e230]:
                    - text: Detected frameworks are enabled by
                    - code [ref=e231]: eslintConfig()
                    - text: by default.
                - row "Next.js and Expo required an explicit React config. Next.js, Expo, and Remix automatically include React rules." [ref=e232]:
                  - cell "Next.js and Expo required an explicit React config." [ref=e233]
                  - cell "Next.js, Expo, and Remix automatically include React rules." [ref=e234]
                - row "Manual inspection required reading generated config. basic-eslint explain prints detected v2 inputs." [ref=e235]:
                  - cell "Manual inspection required reading generated config." [ref=e236]
                  - cell "basic-eslint explain prints detected v2 inputs." [ref=e237]:
                    - code [ref=e238]: basic-eslint explain
                    - text: prints detected v2 inputs.
                - row "Migration was fully manual. basic-eslint migrate reports v1-to-v2 changes to make." [ref=e239]:
                  - cell "Migration was fully manual." [ref=e240]
                  - cell "basic-eslint migrate reports v1-to-v2 changes to make." [ref=e241]:
                    - code [ref=e242]: basic-eslint migrate
                    - text: reports v1-to-v2 changes to make.
            - generic [ref=e243]:
              - heading "Package Changes" [level=2] [ref=e244]
              - link "Section titled “Package Changes”" [ref=e245] [cursor=pointer]:
                - /url: "#package-changes"
                - img [ref=e247]
                - generic [ref=e249]: Section titled “Package Changes”
            - paragraph [ref=e250]: "Remove direct framework config packages from application projects:"
            - figure "Terminal window" [ref=e252]:
              - generic [ref=e254]: Terminal window
              - region [ref=e255]:
                - code [ref=e256]:
                  - generic [ref=e258]: pnpm remove @santi020k/eslint-config-react @santi020k/eslint-config-next
                  - generic [ref=e260]: pnpm add -D @santi020k/eslint-config-basic@^2
              - button "Copy to clipboard" [ref=e262] [cursor=pointer]
            - paragraph [ref=e264]:
              - text: Keep
              - code [ref=e265]: eslint
              - text: ","
              - code [ref=e266]: typescript
              - text: ", React, Next.js, Vue, or other runtime framework packages as your project needs them. The migration only removes extra"
              - code [ref=e267]: "@santi020k/eslint-config-*"
              - text: framework config installs from app-level package manifests.
            - generic [ref=e268]:
              - heading "Config Changes" [level=2] [ref=e269]
              - link "Section titled “Config Changes”" [ref=e270] [cursor=pointer]:
                - /url: "#config-changes"
                - img [ref=e272]
                - generic [ref=e274]: Section titled “Config Changes”
            - paragraph [ref=e275]: "Before:"
            - figure [ref=e277]:
              - code [ref=e280]:
                - generic [ref=e282]: "import { eslintConfig } from '@santi020k/eslint-config-basic'"
                - generic [ref=e284]: import next from '@santi020k/eslint-config-next'
                - generic [ref=e286]: import react from '@santi020k/eslint-config-react'
                - generic [ref=e290]: "export default await eslintConfig({"
                - generic [ref=e292]: "frameworks: {"
                - generic [ref=e295]: next,
                - generic [ref=e298]: react
                - generic [ref=e301]: "}"
                - generic [ref=e304]: "})"
              - button "Copy to clipboard" [ref=e306] [cursor=pointer]
            - paragraph [ref=e308]: "After:"
            - figure [ref=e310]:
              - code [ref=e313]:
                - generic [ref=e315]: "import { defineConfig } from '@santi020k/eslint-config-basic'"
                - generic [ref=e319]: "export default await defineConfig({"
                - generic [ref=e321]: "frameworks: {"
                - generic [ref=e324]: "next: true"
                - generic [ref=e327]: "}"
                - generic [ref=e330]: "})"
              - button "Copy to clipboard" [ref=e332] [cursor=pointer]
            - paragraph [ref=e334]: "For React-only projects:"
            - figure [ref=e336]:
              - code [ref=e339]:
                - generic [ref=e341]: "import { defineConfig } from '@santi020k/eslint-config-basic'"
                - generic [ref=e345]: "export default await defineConfig({"
                - generic [ref=e347]: "frameworks: {"
                - generic [ref=e350]: "react: true"
                - generic [ref=e353]: "}"
                - generic [ref=e356]: "})"
              - button "Copy to clipboard" [ref=e358] [cursor=pointer]
            - generic [ref=e360]:
              - heading "Auto-Detection" [level=2] [ref=e361]
              - link "Section titled “Auto-Detection”" [ref=e362] [cursor=pointer]:
                - /url: "#auto-detection"
                - img [ref=e364]
                - generic [ref=e366]: Section titled “Auto-Detection”
            - paragraph [ref=e367]: "In v2, this is enough for most projects:"
            - figure [ref=e369]:
              - code [ref=e372]:
                - generic [ref=e374]: "import { defineConfig } from '@santi020k/eslint-config-basic'"
                - generic [ref=e378]: export default await defineConfig()
              - button "Copy to clipboard" [ref=e380] [cursor=pointer]
            - paragraph [ref=e382]:
              - text: The composer reads your dependencies and project structure, then enables supported bundled framework configs. Make the
              - code [ref=e383]: frameworks
              - text: object explicit when you want the config to stay independent from dependency detection.
            - generic [ref=e384]:
              - heading "New v2 Control Flags" [level=2] [ref=e385]
              - link "Section titled “New v2 Control Flags”" [ref=e386] [cursor=pointer]:
                - /url: "#new-v2-control-flags"
                - img [ref=e388]
                - generic [ref=e390]: Section titled “New v2 Control Flags”
            - paragraph [ref=e391]: "Use these options when migrating larger repos:"
            - figure [ref=e393]:
              - code [ref=e396]:
                - generic [ref=e398]: "import { defineConfig } from '@santi020k/eslint-config-basic'"
                - generic [ref=e402]: "export default await defineConfig({"
                - generic [ref=e404]: // disable if you want framework activation to be manual-only
                - generic [ref=e406]: "autoFrameworks: true,"
                - generic [ref=e411]: // disable all detection or tune specific detection categories
                - generic [ref=e413]: "detection: {"
                - generic [ref=e416]: "formats: true,"
                - generic [ref=e419]: "frameworks: true,"
                - generic [ref=e422]: "libraries: true,"
                - generic [ref=e425]: "runtime: true,"
                - generic [ref=e428]: "testing: true,"
                - generic [ref=e431]: "tools: true"
                - generic [ref=e434]: "},"
                - generic [ref=e439]: // monorepo/project root used for package + framework detection
                - generic [ref=e441]: "detectRootDir: process.cwd(),"
                - generic [ref=e446]: // default is 'merge' (detected + preset + explicit)
                - generic [ref=e448]: "optionMergeStrategy: 'merge',"
                - generic [ref=e453]: // parser/projectService root used by TypeScript ESLint internals
                - generic [ref=e455]: "tsconfigRootDir: process.cwd()"
                - generic [ref=e458]: "})"
              - button "Copy to clipboard" [ref=e460] [cursor=pointer]
            - generic [ref=e462]:
              - heading "New v2 Presets" [level=2] [ref=e463]
              - link "Section titled “New v2 Presets”" [ref=e464] [cursor=pointer]:
                - /url: "#new-v2-presets"
                - img [ref=e466]
                - generic [ref=e468]: Section titled “New v2 Presets”
            - paragraph [ref=e469]: "V2 adds practical presets for common release profiles:"
            - figure [ref=e471]:
              - code [ref=e474]:
                - generic [ref=e476]: "import { defineConfig, Preset } from '@santi020k/eslint-config-basic'"
                - generic [ref=e480]: "export default await defineConfig({"
                - generic [ref=e482]: "preset: Preset.App"
                - generic [ref=e485]: "})"
              - button "Copy to clipboard" [ref=e487] [cursor=pointer]
            - paragraph [ref=e489]:
              - text: Use
              - code [ref=e490]: Preset.Library
              - text: for published packages,
              - code [ref=e491]: Preset.App
              - text: for browser apps,
              - code [ref=e492]: Preset.CI
              - text: for stricter CI defaults, and
              - code [ref=e493]: Preset.Monorepo
              - text: as a root baseline for workspace repos.
            - generic [ref=e494]:
              - heading "Monorepo Projects" [level=2] [ref=e495]
              - link "Section titled “Monorepo Projects”" [ref=e496] [cursor=pointer]:
                - /url: "#monorepo-projects"
                - img [ref=e498]
                - generic [ref=e500]: Section titled “Monorepo Projects”
            - paragraph [ref=e501]: "V2 can scope subproject config to workspace folders:"
            - figure [ref=e503]:
              - region [ref=e505]:
                - code [ref=e506]:
                  - generic [ref=e508]: "import { defineConfig, Preset, Runtime } from '@santi020k/eslint-config-basic'"
                  - generic [ref=e512]: "export default await defineConfig({"
                  - generic [ref=e514]: "preset: Preset.Monorepo,"
                  - generic [ref=e517]: "projects: {"
                  - generic [ref=e520]: "'apps/api': {"
                  - generic [ref=e522]: "preset: Preset.Library,"
                  - generic [ref=e525]: "runtime: Runtime.Node"
                  - generic [ref=e528]: "},"
                  - generic [ref=e531]: "'apps/web': {"
                  - generic [ref=e533]: "frameworks: { next: true },"
                  - generic [ref=e536]: "preset: Preset.App"
                  - generic [ref=e539]: "}"
                  - generic [ref=e542]: "}"
                  - generic [ref=e545]: "})"
              - button "Copy to clipboard" [ref=e547] [cursor=pointer]
            - paragraph [ref=e549]: Each project entry gets its own detection root by default and the generated config entries are scoped to that folder.
            - generic [ref=e550]:
              - heading "Migration CLI" [level=2] [ref=e551]
              - link "Section titled “Migration CLI”" [ref=e552] [cursor=pointer]:
                - /url: "#migration-cli"
                - img [ref=e554]
                - generic [ref=e556]: Section titled “Migration CLI”
            - paragraph [ref=e557]: "Run the migration report before editing:"
            - figure "Terminal window" [ref=e559]:
              - generic [ref=e561]: Terminal window
              - code [ref=e563]:
                - generic [ref=e565]: npx @santi020k/eslint-config-basic migrate
              - button "Copy to clipboard" [ref=e567] [cursor=pointer]
            - paragraph [ref=e569]: "Then inspect the detected v2 shape:"
            - figure "Terminal window" [ref=e571]:
              - generic [ref=e573]: Terminal window
              - code [ref=e575]:
                - generic [ref=e577]: npx @santi020k/eslint-config-basic explain
              - button "Copy to clipboard" [ref=e579] [cursor=pointer]
            - paragraph [ref=e581]: "After migrating, you can generate a team-facing standards document:"
            - figure "Terminal window" [ref=e583]:
              - generic [ref=e585]: Terminal window
              - code [ref=e587]:
                - generic [ref=e589]: npx @santi020k/eslint-config-basic docs
              - button "Copy to clipboard" [ref=e591] [cursor=pointer]
            - generic [ref=e593]:
              - heading "Troubleshooting" [level=2] [ref=e594]
              - link "Section titled “Troubleshooting”" [ref=e595] [cursor=pointer]:
                - /url: "#troubleshooting"
                - img [ref=e597]
                - generic [ref=e599]: Section titled “Troubleshooting”
            - list [ref=e600]:
              - listitem [ref=e601]:
                - text: "Detected frameworks show up unexpectedly:"
                - list [ref=e602]:
                  - listitem [ref=e603]:
                    - text: Set
                    - code [ref=e604]: "autoFrameworks: false"
                    - text: and define
                    - code [ref=e605]: frameworks
                    - text: manually, or set
                    - code [ref=e606]: "detection.frameworks: false"
                    - text: .
              - listitem [ref=e607]:
                - text: "You only want explicit arrays (no detected merge):"
                - list [ref=e608]:
                  - listitem [ref=e609]:
                    - text: Set
                    - code [ref=e610]: "optionMergeStrategy: 'replace'"
                    - text: .
              - listitem [ref=e611]:
                - text: "Monorepo detection reads the wrong package:"
                - list [ref=e612]:
                  - listitem [ref=e613]:
                    - text: Set
                    - code [ref=e614]: detectRootDir
                    - text: to the app/package root with the intended
                    - code [ref=e615]: package.json
                    - text: .
              - listitem [ref=e616]:
                - text: "TypeScript parser looks in the wrong folder:"
                - list [ref=e617]:
                  - listitem [ref=e618]:
                    - text: Set
                    - code [ref=e619]: tsconfigRootDir
                    - text: to the package that owns the tsconfig.
            - generic [ref=e620]:
              - heading "Keeping v1 Docs" [level=2] [ref=e621]
              - link "Section titled “Keeping v1 Docs”" [ref=e622] [cursor=pointer]:
                - /url: "#keeping-v1-docs"
                - img [ref=e624]
                - generic [ref=e626]: Section titled “Keeping v1 Docs”
            - paragraph [ref=e627]:
              - text: The v1 docs remain available at
              - code [ref=e628]: /v1/
              - text: . The current root docs track v2. Future docs can be added the same way under versioned paths such as
              - code [ref=e629]: /v2.1/
              - text: or
              - code [ref=e630]: /v2.2.1/
              - text: when a release needs permanent documentation.
          - generic [ref=e631]:
            - generic [ref=e632]:
              - link "Edit page" [ref=e633] [cursor=pointer]:
                - /url: https://github.com/santi020k/eslint-config-basic/edit/main/packages/docs/src/content/docs/guide/migration-v1-to-v2.md
                - img [ref=e634]
                - text: Edit page
              - paragraph [ref=e636]:
                - text: "Last updated:"
                - time [ref=e637]: Jun 9, 2026
            - generic [ref=e638]:
              - link "Previous AI & Agents" [ref=e639] [cursor=pointer]:
                - /url: /guide/ai-agents/
                - img [ref=e640]
                - generic [ref=e642]:
                  - text: Previous
                  - text: AI & Agents
              - link "Next TypeScript" [ref=e643] [cursor=pointer]:
                - /url: /frameworks/typescript/
                - img [ref=e644]
                - generic [ref=e646]:
                  - text: Next
                  - text: TypeScript
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