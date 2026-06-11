# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> Accessibility >> page /guide/monorepo/ should have no accessibility violations in dark mode
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
+                 "html": "<a href=\"/guide/monorepo/\" aria-current=\"page\" class=\"astro-ujldrfsy\"> <span class=\"astro-ujldrfsy\">Monorepo</span>  </a>",
+                 "target": Array [
+                   "a[href$=\"monorepo/\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 1.94 (foreground color: #281745, background color: #5a0fdb, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"astro-ujldrfsy\">Monorepo</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"monorepo/\"] > .astro-ujldrfsy",
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
              - link "Minimal Setup" [ref=e174] [cursor=pointer]:
                - /url: "#minimal-setup"
            - listitem [ref=e175]:
              - link "Scoping Packages with projects" [ref=e176] [cursor=pointer]:
                - /url: "#scoping-packages-with-projects"
            - listitem [ref=e177]:
              - link "Detection Roots" [ref=e178] [cursor=pointer]:
                - /url: "#detection-roots"
            - listitem [ref=e179]:
              - link "Turborepo / pnpm Workspaces Pattern" [ref=e180] [cursor=pointer]:
                - /url: "#turborepo--pnpm-workspaces-pattern"
            - listitem [ref=e181]:
              - link "Merge Strategy" [ref=e182] [cursor=pointer]:
                - /url: "#merge-strategy"
            - listitem [ref=e183]:
              - link "Ignoring Paths" [ref=e184] [cursor=pointer]:
                - /url: "#ignoring-paths"
            - listitem [ref=e185]:
              - link "Troubleshooting" [ref=e186] [cursor=pointer]:
                - /url: "#troubleshooting"
            - listitem [ref=e187]:
              - link "Related Pages" [ref=e188] [cursor=pointer]:
                - /url: "#related-pages"
      - main [ref=e190]:
        - heading "Monorepo" [level=1] [ref=e193]
        - generic [ref=e195]:
          - generic [ref=e196]:
            - paragraph [ref=e197]:
              - text: This package has first-class monorepo support through the
              - code [ref=e198]: projects
              - text: option and the
              - code [ref=e199]: Monorepo
              - text: preset. A single
              - code [ref=e200]: eslint.config.mjs
              - text: at the repo root can scope different presets, runtimes, and frameworks to each workspace package.
            - generic [ref=e201]:
              - heading "Minimal Setup" [level=2] [ref=e202]
              - link "Section titled “Minimal Setup”" [ref=e203] [cursor=pointer]:
                - /url: "#minimal-setup"
                - img [ref=e205]
                - generic [ref=e207]: Section titled “Minimal Setup”
            - figure "eslint.config.mjs" [ref=e209]:
              - generic [ref=e211]: eslint.config.mjs
              - code [ref=e213]:
                - generic [ref=e215]: "import { defineConfig, Preset } from '@santi020k/eslint-config-basic'"
                - generic [ref=e219]: "export default await defineConfig({"
                - generic [ref=e221]: "preset: Preset.Monorepo"
                - generic [ref=e224]: "})"
              - button "Copy to clipboard" [ref=e226] [cursor=pointer]
            - paragraph [ref=e228]:
              - code [ref=e229]: Preset.Monorepo
              - text: sets universal TypeScript defaults that work as a safe base across mixed project types. Auto-detection reads the root
              - code [ref=e230]: package.json
              - text: and project structure to activate frameworks and integrations found there.
            - generic [ref=e231]:
              - heading "Scoping Packages with projects" [level=2] [ref=e232]:
                - text: Scoping Packages with
                - code [ref=e233]: projects
              - link "Section titled “Scoping Packages with projects”" [ref=e234] [cursor=pointer]:
                - /url: "#scoping-packages-with-projects"
                - img [ref=e236]
                - generic [ref=e238]: Section titled “Scoping Packages with projects”
            - paragraph [ref=e239]:
              - text: Use
              - code [ref=e240]: projects
              - text: to assign different options to workspace folders. Each key is a path relative to the repo root and each value is a partial
              - code [ref=e241]: EslintConfigOptions
              - text: object.
            - figure "eslint.config.mjs" [ref=e243]:
              - generic [ref=e245]: eslint.config.mjs
              - region [ref=e246]:
                - code [ref=e247]:
                  - generic [ref=e249]: "import { defineConfig, Preset, Runtime } from '@santi020k/eslint-config-basic'"
                  - generic [ref=e253]: "export default await defineConfig({"
                  - generic [ref=e255]: "preset: Preset.Monorepo,"
                  - generic [ref=e258]: "projects: {"
                  - generic [ref=e261]: "'apps/api': {"
                  - generic [ref=e263]: "preset: Preset.Node,"
                  - generic [ref=e266]: "runtime: Runtime.Node"
                  - generic [ref=e269]: "},"
                  - generic [ref=e272]: "'apps/web': {"
                  - generic [ref=e274]: "frameworks: { next: true },"
                  - generic [ref=e277]: "preset: Preset.App"
                  - generic [ref=e280]: "},"
                  - generic [ref=e283]: "'packages/cli': {"
                  - generic [ref=e285]: "preset: Preset.Library,"
                  - generic [ref=e288]: "runtime: Runtime.Node"
                  - generic [ref=e291]: "},"
                  - generic [ref=e294]: "'packages/ui': {"
                  - generic [ref=e296]: "frameworks: { react: true },"
                  - generic [ref=e299]: "preset: Preset.Library"
                  - generic [ref=e302]: "}"
                  - generic [ref=e305]: "}"
                  - generic [ref=e308]: "})"
              - button "Copy to clipboard" [ref=e310] [cursor=pointer]
            - paragraph [ref=e312]:
              - text: Each project entry generates ESLint config entries scoped to that folder — rules and globals from
              - code [ref=e313]: apps/api
              - text: only apply to files under
              - code [ref=e314]: apps/api/
              - text: .
            - generic [ref=e315]:
              - heading "Detection Roots" [level=2] [ref=e316]
              - link "Section titled “Detection Roots”" [ref=e317] [cursor=pointer]:
                - /url: "#detection-roots"
                - img [ref=e319]
                - generic [ref=e321]: Section titled “Detection Roots”
            - paragraph [ref=e322]: "By default each project entry uses its own folder as the detection root. You can override this:"
            - figure [ref=e324]:
              - code [ref=e327]:
                - generic [ref=e329]: "import { defineConfig, Preset } from '@santi020k/eslint-config-basic'"
                - generic [ref=e333]: "export default await defineConfig({"
                - generic [ref=e335]: "detectRootDir: process.cwd(),"
                - generic [ref=e338]: "preset: Preset.Monorepo,"
                - generic [ref=e341]: "tsconfigRootDir: import.meta.dirname"
                - generic [ref=e344]: "})"
              - button "Copy to clipboard" [ref=e346] [cursor=pointer]
            - list [ref=e348]:
              - listitem [ref=e349]:
                - code [ref=e350]: detectRootDir
                - text: — where to read
                - code [ref=e351]: package.json
                - text: for auto-detection of frameworks, integrations, and runtime.
              - listitem [ref=e352]:
                - code [ref=e353]: tsconfigRootDir
                - text: — where the TypeScript parser looks for
                - code [ref=e354]: tsconfig.json
                - text: /
                - code [ref=e355]: tsconfig.base.json
                - text: .
            - paragraph [ref=e356]:
              - text: "In large monorepos these may differ:"
              - code [ref=e357]: detectRootDir
              - text: typically points to the package being linted, while
              - code [ref=e358]: tsconfigRootDir
              - text: points to the root
              - code [ref=e359]: tsconfig.base.json
              - text: .
            - generic [ref=e360]:
              - heading "Turborepo / pnpm Workspaces Pattern" [level=2] [ref=e361]
              - link "Section titled “Turborepo / pnpm Workspaces Pattern”" [ref=e362] [cursor=pointer]:
                - /url: "#turborepo--pnpm-workspaces-pattern"
                - img [ref=e364]
                - generic [ref=e366]: Section titled “Turborepo / pnpm Workspaces Pattern”
            - paragraph [ref=e367]: "For repos using Turborepo with pnpm workspaces, the recommended pattern is:"
            - figure "eslint.config.mjs" [ref=e369]:
              - generic [ref=e371]: eslint.config.mjs
              - region [ref=e372]:
                - code [ref=e373]:
                  - generic [ref=e375]: "import { defineConfig, Preset, Runtime } from '@santi020k/eslint-config-basic'"
                  - generic [ref=e379]: "export default await defineConfig({"
                  - generic [ref=e381]: "detectRootDir: process.cwd(),"
                  - generic [ref=e384]: "preset: Preset.Monorepo,"
                  - generic [ref=e387]: "projects: {"
                  - generic [ref=e390]: "'apps/dashboard': { frameworks: { next: true }, preset: Preset.App },"
                  - generic [ref=e392]: "'apps/marketing': { frameworks: { astro: true }, preset: Preset.App },"
                  - generic [ref=e394]: "'packages/api': { preset: Preset.Node, runtime: Runtime.Node },"
                  - generic [ref=e396]: "'packages/core': { preset: Preset.Library, runtime: Runtime.Universal },"
                  - generic [ref=e398]: "'workers/auth': { preset: Preset.Library, runtime: Runtime.Worker }"
                  - generic [ref=e400]: "},"
                  - generic [ref=e403]: "tsconfigRootDir: import.meta.dirname"
                  - generic [ref=e406]: "})"
              - button "Copy to clipboard" [ref=e408] [cursor=pointer]
            - generic [ref=e410]:
              - heading "Merge Strategy" [level=2] [ref=e411]
              - link "Section titled “Merge Strategy”" [ref=e412] [cursor=pointer]:
                - /url: "#merge-strategy"
                - img [ref=e414]
                - generic [ref=e416]: Section titled “Merge Strategy”
            - paragraph [ref=e417]:
              - text: By default, project-level
              - code [ref=e418]: libraries
              - text: ","
              - code [ref=e419]: testing
              - text: ","
              - code [ref=e420]: formats
              - text: ","
              - code [ref=e421]: tools
              - text: ", and"
              - code [ref=e422]: extensions
              - text: are
              - strong [ref=e423]: merged
              - text: with root-level values (
              - code [ref=e424]: "optionMergeStrategy: 'merge'"
              - text: ). Use
              - code [ref=e425]: "'replace'"
              - text: "at the project level when a specific package should override the root completely:"
            - figure [ref=e427]:
              - region [ref=e429]:
                - code [ref=e430]:
                  - generic [ref=e432]: "import { defineConfig, Preset, Testing } from '@santi020k/eslint-config-basic'"
                  - generic [ref=e436]: "export default await defineConfig({"
                  - generic [ref=e438]: "preset: Preset.Monorepo,"
                  - generic [ref=e441]: "projects: {"
                  - generic [ref=e444]: "'apps/e2e': {"
                  - generic [ref=e446]: "optionMergeStrategy: 'replace',"
                  - generic [ref=e449]: "testing: [Testing.Playwright]"
                  - generic [ref=e452]: "}"
                  - generic [ref=e455]: "},"
                  - generic [ref=e458]: "testing: [Testing.Vitest]"
                  - generic [ref=e461]: "})"
              - button "Copy to clipboard" [ref=e463] [cursor=pointer]
            - generic [ref=e465]:
              - heading "Ignoring Paths" [level=2] [ref=e466]
              - link "Section titled “Ignoring Paths”" [ref=e467] [cursor=pointer]:
                - /url: "#ignoring-paths"
                - img [ref=e469]
                - generic [ref=e471]: Section titled “Ignoring Paths”
            - paragraph [ref=e472]:
              - text: Pass
              - code [ref=e473]: ignores
              - text: "at the root level to exclude generated folders across the whole repo:"
            - figure [ref=e475]:
              - code [ref=e478]:
                - generic [ref=e480]: "import { defineConfig, Preset } from '@santi020k/eslint-config-basic'"
                - generic [ref=e484]: "export default await defineConfig({"
                - generic [ref=e486]: "ignores: ["
                - generic [ref=e489]: "'dist/**',"
                - generic [ref=e491]: "'packages/*/dist/**',"
                - generic [ref=e493]: "'apps/*/dist/**',"
                - generic [ref=e495]: "'coverage/**',"
                - generic [ref=e497]: "'.turbo/**'"
                - generic [ref=e499]: "],"
                - generic [ref=e502]: "preset: Preset.Monorepo"
                - generic [ref=e505]: "})"
              - button "Copy to clipboard" [ref=e507] [cursor=pointer]
            - blockquote [ref=e509]:
              - paragraph [ref=e510]:
                - text: "[!NOTE] Patterns in"
                - code [ref=e511]: ignores
                - text: are relative to ESLint’s working directory. They are not automatically prefixed with the
                - code [ref=e512]: projects
                - text: subfolder paths — use repo-root-relative globs when needed.
            - generic [ref=e513]:
              - heading "Troubleshooting" [level=2] [ref=e514]
              - link "Section titled “Troubleshooting”" [ref=e515] [cursor=pointer]:
                - /url: "#troubleshooting"
                - img [ref=e517]
                - generic [ref=e519]: Section titled “Troubleshooting”
            - paragraph [ref=e520]:
              - strong [ref=e521]: Detected frameworks bleed between packages
            - paragraph [ref=e522]:
              - text: Set
              - code [ref=e523]: "detection.frameworks: false"
              - text: at the root and rely on the explicit
              - code [ref=e524]: frameworks
              - text: "object:"
            - figure [ref=e526]:
              - code [ref=e529]:
                - generic [ref=e531]: "import { defineConfig } from '@santi020k/eslint-config-basic'"
                - generic [ref=e535]: "export default await defineConfig({"
                - generic [ref=e537]: "projects: {"
                - generic [ref=e540]: "'apps/api': {"
                - generic [ref=e542]: "detection: { frameworks: false },"
                - generic [ref=e545]: "typescript: true"
                - generic [ref=e548]: "}"
                - generic [ref=e551]: "}"
                - generic [ref=e554]: "})"
              - button "Copy to clipboard" [ref=e556] [cursor=pointer]
            - paragraph [ref=e558]:
              - strong [ref=e559]: TypeScript parser rejects files from another package
            - paragraph [ref=e560]:
              - text: Each package needs its own
              - code [ref=e561]: tsconfig.json
              - text: that covers the files ESLint will process. Set
              - code [ref=e562]: tsconfigRootDir
              - text: "to the package folder:"
            - figure [ref=e564]:
              - code [ref=e567]:
                - generic [ref=e569]: "import { defineConfig } from '@santi020k/eslint-config-basic'"
                - generic [ref=e573]: "export default await defineConfig({"
                - generic [ref=e575]: "projects: {"
                - generic [ref=e578]: "'packages/ui': {"
                - generic [ref=e580]: "frameworks: { react: true },"
                - generic [ref=e583]: "tsconfigRootDir: './packages/ui'"
                - generic [ref=e586]: "}"
                - generic [ref=e589]: "}"
                - generic [ref=e592]: "})"
              - button "Copy to clipboard" [ref=e594] [cursor=pointer]
            - paragraph [ref=e596]:
              - strong [ref=e597]:
                - text: The
                - code [ref=e598]: doctor
                - text: command reports missing
                - code [ref=e599]: projects
                - text: scoping
            - paragraph [ref=e600]:
              - text: Run
              - code [ref=e601]: npx @santi020k/eslint-config-basic doctor
              - text: — it detects workspace packages that are not represented in
              - code [ref=e602]: projects
              - text: and suggests which ones to add.
            - generic [ref=e603]:
              - heading "Related Pages" [level=2] [ref=e604]
              - link "Section titled “Related Pages”" [ref=e605] [cursor=pointer]:
                - /url: "#related-pages"
                - img [ref=e607]
                - generic [ref=e609]: Section titled “Related Pages”
            - list [ref=e610]:
              - listitem [ref=e611]:
                - link "Presets" [ref=e612] [cursor=pointer]:
                  - /url: /guide/presets
                - text: — available preset values and what each enables
              - listitem [ref=e613]:
                - link "Runtime" [ref=e614] [cursor=pointer]:
                  - /url: /guide/runtime
                - text: — runtime enum and auto-detection rules
              - listitem [ref=e615]:
                - link "Configuration" [ref=e616] [cursor=pointer]:
                  - /url: /guide/configuration
                - text: — full option reference
              - listitem [ref=e617]:
                - link "CLI" [ref=e618] [cursor=pointer]:
                  - /url: /guide/cli
                - text: —
                - code [ref=e619]: doctor
                - text: and
                - code [ref=e620]: inspect
                - text: commands for diagnosing monorepo setups
          - generic [ref=e621]:
            - generic [ref=e622]:
              - link "Edit page" [ref=e623] [cursor=pointer]:
                - /url: https://github.com/santi020k/eslint-config-basic/edit/main/packages/docs/src/content/docs/guide/monorepo.md
                - img [ref=e624]
                - text: Edit page
              - paragraph [ref=e626]:
                - text: "Last updated:"
                - time [ref=e627]: Jun 11, 2026
            - generic [ref=e628]:
              - link "Previous Runtime" [ref=e629] [cursor=pointer]:
                - /url: /guide/runtime/
                - img [ref=e630]
                - generic [ref=e632]:
                  - text: Previous
                  - text: Runtime
              - link "Next AI & Agents" [ref=e633] [cursor=pointer]:
                - /url: /guide/ai-agents/
                - img [ref=e634]
                - generic [ref=e636]:
                  - text: Next
                  - text: AI & Agents
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