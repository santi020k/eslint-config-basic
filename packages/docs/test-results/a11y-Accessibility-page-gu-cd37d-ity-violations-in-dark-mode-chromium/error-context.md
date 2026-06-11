# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> Accessibility >> page /guide/configuration/ should have no accessibility violations in dark mode
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
+                 "html": "<a href=\"/guide/configuration/\" aria-current=\"page\" class=\"astro-ujldrfsy\"> <span class=\"astro-ujldrfsy\">Configuration</span>  </a>",
+                 "target": Array [
+                   "a[aria-current=\"page\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 1.94 (foreground color: #281745, background color: #5a0fdb, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"astro-ujldrfsy\">Configuration</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[aria-current=\"page\"] > .astro-ujldrfsy",
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
              - link "Mental Model" [ref=e174] [cursor=pointer]:
                - /url: "#mental-model"
            - listitem [ref=e175]:
              - link "Core Composition Model" [ref=e176] [cursor=pointer]:
                - /url: "#core-composition-model"
            - listitem [ref=e177]:
              - link "Presets" [ref=e178] [cursor=pointer]:
                - /url: "#presets"
            - listitem [ref=e179]:
              - link "Frameworks" [ref=e180] [cursor=pointer]:
                - /url: "#frameworks"
            - listitem [ref=e181]:
              - link "Configuration Priority" [ref=e182] [cursor=pointer]:
                - /url: "#configuration-priority"
            - listitem [ref=e183]:
              - link "Detection Controls" [ref=e184] [cursor=pointer]:
                - /url: "#detection-controls"
            - listitem [ref=e185]:
              - link "Additional global ignores" [ref=e186] [cursor=pointer]:
                - /url: "#additional-global-ignores"
              - list [ref=e187]:
                - listitem [ref=e188]:
                  - link "Default ignores" [ref=e189] [cursor=pointer]:
                    - /url: "#default-ignores"
            - listitem [ref=e190]:
              - link "Detection and Root Directories" [ref=e191] [cursor=pointer]:
                - /url: "#detection-and-root-directories"
            - listitem [ref=e192]:
              - link "Monorepo Projects" [ref=e193] [cursor=pointer]:
                - /url: "#monorepo-projects"
            - listitem [ref=e194]:
              - link "Full Example" [ref=e195] [cursor=pointer]:
                - /url: "#full-example"
            - listitem [ref=e196]:
              - link "Common Patterns" [ref=e197] [cursor=pointer]:
                - /url: "#common-patterns"
              - list [ref=e198]:
                - listitem [ref=e199]:
                  - link "Fullstack Remix + Tailwind" [ref=e200] [cursor=pointer]:
                    - /url: "#fullstack-remix--tailwind"
                - listitem [ref=e201]:
                  - link "Astro + Svelte + Vitest" [ref=e202] [cursor=pointer]:
                    - /url: "#astro--svelte--vitest"
            - listitem [ref=e203]:
              - link "Strict Mode" [ref=e204] [cursor=pointer]:
                - /url: "#strict-mode"
            - listitem [ref=e205]:
              - link "Settings" [ref=e206] [cursor=pointer]:
                - /url: "#settings"
            - listitem [ref=e207]:
              - link "Related Pages" [ref=e208] [cursor=pointer]:
                - /url: "#related-pages"
            - listitem [ref=e209]:
              - link "Schema" [ref=e210] [cursor=pointer]:
                - /url: "#schema"
      - main [ref=e212]:
        - heading "Configuration" [level=1] [ref=e215]
        - generic [ref=e217]:
          - generic [ref=e218]:
            - paragraph [ref=e219]:
              - text: "The main package composes the final flat config array from one public install:"
              - code [ref=e220]: "@santi020k/eslint-config-basic"
              - text: .
            - generic [ref=e221]:
              - heading "Mental Model" [level=2] [ref=e222]
              - link "Section titled “Mental Model”" [ref=e223] [cursor=pointer]:
                - /url: "#mental-model"
                - img [ref=e225]
                - generic [ref=e227]: Section titled “Mental Model”
            - list [ref=e228]:
              - listitem [ref=e229]:
                - text: Start with
                - code [ref=e230]: eslintConfig()
                - text: .
              - listitem [ref=e231]: Let project detection enable TypeScript, frameworks, runtime, and supported tooling.
              - listitem [ref=e232]: Make options explicit when you want stable, reviewable config.
              - listitem [ref=e233]: Use booleans for bundled framework configs.
              - listitem [ref=e234]: Use enums for integrations.
              - listitem [ref=e235]:
                - text: Use
                - code [ref=e236]: optionMergeStrategy
                - text: when you want strict replace behavior.
              - listitem [ref=e237]:
                - text: Use
                - code [ref=e238]: detection
                - text: for granular auto-detection control.
              - listitem [ref=e239]:
                - text: Use
                - code [ref=e240]: projects
                - text: for package-aware monorepo configuration.
              - listitem [ref=e241]:
                - text: Use
                - code [ref=e242]: ignores
                - text: for extra global ignore globs alongside the composed config (same as a leading flat-config object with only
                - code [ref=e243]: ignores
                - text: ).
            - generic [ref=e244]:
              - heading "Core Composition Model" [level=2] [ref=e245]
              - link "Section titled “Core Composition Model”" [ref=e246] [cursor=pointer]:
                - /url: "#core-composition-model"
                - img [ref=e248]
                - generic [ref=e250]: Section titled “Core Composition Model”
            - figure [ref=e252]:
              - region [ref=e254]:
                - code [ref=e255]:
                  - generic [ref=e257]: "import { defineConfig, Extension, Format, Library, Runtime, Testing, Tool } from '@santi020k/eslint-config-basic'"
                  - generic [ref=e261]: "export default await defineConfig({"
                  - generic [ref=e263]: "detectRootDir: process.cwd(),"
                  - generic [ref=e266]: "extensions: [Extension.Unicorn, Extension.Security],"
                  - generic [ref=e269]: "formats: [Format.Markdown, Format.Mdx],"
                  - generic [ref=e272]: "frameworks: {"
                  - generic [ref=e275]: "react: true"
                  - generic [ref=e278]: "},"
                  - generic [ref=e281]: "libraries: [Library.Tailwind, Library.I18next],"
                  - generic [ref=e284]: "optionMergeStrategy: 'merge',"
                  - generic [ref=e287]: "runtime: Runtime.Browser,"
                  - generic [ref=e290]: "testing: [Testing.Vitest],"
                  - generic [ref=e293]: "tools: [Tool.Prettier],"
                  - generic [ref=e296]: "typescript: true"
                  - generic [ref=e299]: "})"
              - button "Copy to clipboard" [ref=e301] [cursor=pointer]
            - generic [ref=e303]:
              - heading "Presets" [level=2] [ref=e304]
              - link "Section titled “Presets”" [ref=e305] [cursor=pointer]:
                - /url: "#presets"
                - img [ref=e307]
                - generic [ref=e309]: Section titled “Presets”
            - table [ref=e310]:
              - rowgroup [ref=e311]:
                - row "Preset Meaning" [ref=e312]:
                  - columnheader "Preset" [ref=e313]
                  - columnheader "Meaning" [ref=e314]
              - rowgroup [ref=e315]:
                - row "Basic Core JavaScript rules only." [ref=e316]:
                  - cell "Basic" [ref=e317]:
                    - code [ref=e318]: Basic
                  - cell "Core JavaScript rules only." [ref=e319]
                - row "Node Core + TypeScript + Node globals." [ref=e320]:
                  - cell "Node" [ref=e321]:
                    - code [ref=e322]: Node
                  - cell "Core + TypeScript + Node globals." [ref=e323]
                - row "Browser Core + TypeScript + Browser globals." [ref=e324]:
                  - cell "Browser" [ref=e325]:
                    - code [ref=e326]: Browser
                  - cell "Core + TypeScript + Browser globals." [ref=e327]
                - row "Worker Core + TypeScript + worker globals." [ref=e328]:
                  - cell "Worker" [ref=e329]:
                    - code [ref=e330]: Worker
                  - cell "Core + TypeScript + worker globals." [ref=e331]
                - row "Library TypeScript package/library defaults with Prettier and best-practice rules." [ref=e332]:
                  - cell "Library" [ref=e333]:
                    - code [ref=e334]: Library
                  - cell "TypeScript package/library defaults with Prettier and best-practice rules." [ref=e335]
                - row "App Browser app defaults with TypeScript, Prettier, and Vitest." [ref=e336]:
                  - cell "App" [ref=e337]:
                    - code [ref=e338]: App
                  - cell "Browser app defaults with TypeScript, Prettier, and Vitest." [ref=e339]
                - row "CI Universal TypeScript defaults with CI strict severities." [ref=e340]:
                  - cell "CI" [ref=e341]:
                    - code [ref=e342]: CI
                  - cell "Universal TypeScript defaults with CI strict severities." [ref=e343]
                - row "Monorepo Mixed-workspace defaults for package-aware configs." [ref=e344]:
                  - cell "Monorepo" [ref=e345]:
                    - code [ref=e346]: Monorepo
                  - cell "Mixed-workspace defaults for package-aware configs." [ref=e347]
                - row "All TypeScript plus all bundled integrations." [ref=e348]:
                  - cell "All" [ref=e349]:
                    - code [ref=e350]: All
                  - cell "TypeScript plus all bundled integrations." [ref=e351]
            - paragraph [ref=e352]:
              - text: Presets do not force a framework. Frameworks come from project detection or the
              - code [ref=e353]: frameworks
              - text: option.
            - generic [ref=e354]:
              - heading "Frameworks" [level=2] [ref=e355]
              - link "Section titled “Frameworks”" [ref=e356] [cursor=pointer]:
                - /url: "#frameworks"
                - img [ref=e358]
                - generic [ref=e360]: Section titled “Frameworks”
            - figure [ref=e362]:
              - region [ref=e364]:
                - code [ref=e365]:
                  - generic [ref=e367]: "import { defineConfig, NextMode } from '@santi020k/eslint-config-basic'"
                  - generic [ref=e371]: "export default await defineConfig({"
                  - generic [ref=e373]: "frameworks: {"
                  - generic [ref=e376]: "next: true"
                  - generic [ref=e379]: "},"
                  - generic [ref=e382]: "nextMode: NextMode.AppRouter"
                  - generic [ref=e385]: "})"
              - button "Copy to clipboard" [ref=e387] [cursor=pointer]
            - paragraph [ref=e389]: Next.js, Expo, and Remix automatically include React rules. You can still pass imported config arrays or factories for advanced cases, but app configs should prefer booleans.
            - table [ref=e390]:
              - rowgroup [ref=e391]:
                - row "Framework Option" [ref=e392]:
                  - columnheader "Framework" [ref=e393]
                  - columnheader "Option" [ref=e394]
              - rowgroup [ref=e395]:
                - row "React frameworks.react" [ref=e396]:
                  - cell "React" [ref=e397]
                  - cell "frameworks.react" [ref=e398]:
                    - code [ref=e399]: frameworks.react
                - row "Next.js frameworks.next" [ref=e400]:
                  - cell "Next.js" [ref=e401]
                  - cell "frameworks.next" [ref=e402]:
                    - code [ref=e403]: frameworks.next
                - row "Astro frameworks.astro" [ref=e404]:
                  - cell "Astro" [ref=e405]
                  - cell "frameworks.astro" [ref=e406]:
                    - code [ref=e407]: frameworks.astro
                - row "Vue frameworks.vue" [ref=e408]:
                  - cell "Vue" [ref=e409]
                  - cell "frameworks.vue" [ref=e410]:
                    - code [ref=e411]: frameworks.vue
                - row "Svelte frameworks.svelte" [ref=e412]:
                  - cell "Svelte" [ref=e413]
                  - cell "frameworks.svelte" [ref=e414]:
                    - code [ref=e415]: frameworks.svelte
                - row "Solid frameworks.solid" [ref=e416]:
                  - cell "Solid" [ref=e417]
                  - cell "frameworks.solid" [ref=e418]:
                    - code [ref=e419]: frameworks.solid
                - row "Angular frameworks.angular" [ref=e420]:
                  - cell "Angular" [ref=e421]
                  - cell "frameworks.angular" [ref=e422]:
                    - code [ref=e423]: frameworks.angular
                - row "NestJS frameworks.nest" [ref=e424]:
                  - cell "NestJS" [ref=e425]
                  - cell "frameworks.nest" [ref=e426]:
                    - code [ref=e427]: frameworks.nest
                - row "Hono frameworks.hono" [ref=e428]:
                  - cell "Hono" [ref=e429]
                  - cell "frameworks.hono" [ref=e430]:
                    - code [ref=e431]: frameworks.hono
                - row "Expo frameworks.expo" [ref=e432]:
                  - cell "Expo" [ref=e433]
                  - cell "frameworks.expo" [ref=e434]:
                    - code [ref=e435]: frameworks.expo
                - row "Qwik frameworks.qwik" [ref=e436]:
                  - cell "Qwik" [ref=e437]
                  - cell "frameworks.qwik" [ref=e438]:
                    - code [ref=e439]: frameworks.qwik
                - row "Remix frameworks.remix" [ref=e440]:
                  - cell "Remix" [ref=e441]
                  - cell "frameworks.remix" [ref=e442]:
                    - code [ref=e443]: frameworks.remix
                - row "Vite frameworks.vite" [ref=e444]:
                  - cell "Vite" [ref=e445]
                  - cell "frameworks.vite" [ref=e446]:
                    - code [ref=e447]: frameworks.vite
                - row "Slidev frameworks.slidev" [ref=e448]:
                  - cell "Slidev" [ref=e449]
                  - cell "frameworks.slidev" [ref=e450]:
                    - code [ref=e451]: frameworks.slidev
            - generic [ref=e452]:
              - heading "Configuration Priority" [level=2] [ref=e453]
              - link "Section titled “Configuration Priority”" [ref=e454] [cursor=pointer]:
                - /url: "#configuration-priority"
                - img [ref=e456]
                - generic [ref=e458]: Section titled “Configuration Priority”
            - paragraph [ref=e459]: "Scalars always follow this order:"
            - list [ref=e460]:
              - listitem [ref=e461]:
                - text: Explicit options passed to
                - code [ref=e462]: "eslintConfig({})"
                - text: .
              - listitem [ref=e463]: Preset defaults.
              - listitem [ref=e464]:
                - text: Auto-detection from
                - code [ref=e465]: package.json
                - text: ","
                - code [ref=e466]: tsconfig.json
                - text: ", and project structure."
            - paragraph [ref=e467]:
              - text: List options (
              - code [ref=e468]: libraries
              - text: ","
              - code [ref=e469]: testing
              - text: ","
              - code [ref=e470]: formats
              - text: ","
              - code [ref=e471]: tools
              - text: ","
              - code [ref=e472]: extensions
              - text: ) and
              - code [ref=e473]: frameworks
              - text: "use:"
            - list [ref=e474]:
              - listitem [ref=e475]:
                - code [ref=e476]: "optionMergeStrategy: 'merge'"
                - text: "(default): detected + preset + explicit are combined and deduplicated."
              - listitem [ref=e477]:
                - code [ref=e478]: "optionMergeStrategy: 'replace'"
                - text: ": explicit values replace preset/detected values."
            - paragraph [ref=e479]:
              - text: Use
              - code [ref=e480]: "autoFrameworks: false"
              - text: when you want manual framework control only (no detected framework auto-enable).
            - generic [ref=e481]:
              - heading "Detection Controls" [level=2] [ref=e482]
              - link "Section titled “Detection Controls”" [ref=e483] [cursor=pointer]:
                - /url: "#detection-controls"
                - img [ref=e485]
                - generic [ref=e487]: Section titled “Detection Controls”
            - paragraph [ref=e488]:
              - text: Use
              - code [ref=e489]: "detection: false"
              - text: to disable all auto-detection, or pass an object to disable specific categories while keeping the rest automatic.
            - figure [ref=e491]:
              - region [ref=e493]:
                - code [ref=e494]:
                  - generic [ref=e496]: "import { defineConfig, Library, Testing } from '@santi020k/eslint-config-basic'"
                  - generic [ref=e500]: "export default await defineConfig({"
                  - generic [ref=e502]: "detection: {"
                  - generic [ref=e505]: "formats: true,"
                  - generic [ref=e508]: "frameworks: true,"
                  - generic [ref=e511]: "libraries: false,"
                  - generic [ref=e514]: "testing: false,"
                  - generic [ref=e517]: "tools: true"
                  - generic [ref=e520]: "},"
                  - generic [ref=e523]: "libraries: [Library.Tailwind],"
                  - generic [ref=e526]: "testing: [Testing.Vitest]"
                  - generic [ref=e529]: "})"
              - button "Copy to clipboard" [ref=e531] [cursor=pointer]
            - paragraph [ref=e533]:
              - text: Supported detection keys are
              - code [ref=e534]: typescript
              - text: ","
              - code [ref=e535]: frameworks
              - text: ","
              - code [ref=e536]: libraries
              - text: ","
              - code [ref=e537]: testing
              - text: ","
              - code [ref=e538]: formats
              - text: ","
              - code [ref=e539]: tools
              - text: ","
              - code [ref=e540]: extensions
              - text: ","
              - code [ref=e541]: runtime
              - text: ", and"
              - code [ref=e542]: nextMode
              - text: .
            - generic [ref=e543]:
              - heading "Additional global ignores" [level=2] [ref=e544]
              - link "Section titled “Additional global ignores”" [ref=e545] [cursor=pointer]:
                - /url: "#additional-global-ignores"
                - img [ref=e547]
                - generic [ref=e549]: Section titled “Additional global ignores”
            - paragraph [ref=e550]:
              - text: Pass
              - code [ref=e551]: ignores
              - text: when you want repo-specific globs inside
              - code [ref=e552]: eslintConfig()
              - text: instead of a separate array entry. Patterns behave like ESLint flat config global ignores (relative to the ESLint working directory). They are not merged from presets or auto-detection. For
              - code [ref=e553]: projects
              - text: sub-configs, patterns are not rewritten with the subfolder prefix; use paths that make sense from the config file’s working directory.
            - figure [ref=e555]:
              - code [ref=e558]:
                - generic [ref=e560]: "import { defineConfig } from '@santi020k/eslint-config-basic'"
                - generic [ref=e564]: "export default await defineConfig({"
                - generic [ref=e566]: "ignores: ['dist/**', 'packages/*/dist/**', 'coverage/**']"
                - generic [ref=e569]: "})"
              - button "Copy to clipboard" [ref=e571] [cursor=pointer]
            - generic [ref=e573]:
              - heading "Default ignores" [level=3] [ref=e574]
              - link "Section titled “Default ignores”" [ref=e575] [cursor=pointer]:
                - /url: "#default-ignores"
                - img [ref=e577]
                - generic [ref=e579]: Section titled “Default ignores”
            - paragraph [ref=e580]:
              - text: The composed config ships a default ignore block (
              - code [ref=e581]: dist
              - text: ","
              - code [ref=e582]: build
              - text: ","
              - code [ref=e583]: coverage
              - text: ", framework output folders,"
              - code [ref=e584]: node_modules
              - text: ", and similar). It also ignores AI coding-assistant artifact folders —"
              - code [ref=e585]: .agent
              - text: ","
              - code [ref=e586]: .agents
              - text: ","
              - code [ref=e587]: .aider*
              - text: ","
              - code [ref=e588]: .claude
              - text: ","
              - code [ref=e589]: .clinerules
              - text: ","
              - code [ref=e590]: .codex
              - text: ","
              - code [ref=e591]: .copilot
              - text: ","
              - code [ref=e592]: .cursor
              - text: ","
              - code [ref=e593]: .gemini
              - text: ","
              - code [ref=e594]: .kiro
              - text: ","
              - code [ref=e595]: .opencode
              - text: ","
              - code [ref=e596]: .roo
              - text: ", and"
              - code [ref=e597]: .windsurf
              - text: — so generated agent rules and skills are never linted as source code. Disable the whole block with
              - code [ref=e598]: "settings: [Setting.NoDefaultIgnores]"
              - text: .
            - generic [ref=e599]:
              - heading "Detection and Root Directories" [level=2] [ref=e600]
              - link "Section titled “Detection and Root Directories”" [ref=e601] [cursor=pointer]:
                - /url: "#detection-and-root-directories"
                - img [ref=e603]
                - generic [ref=e605]: Section titled “Detection and Root Directories”
            - list [ref=e606]:
              - listitem [ref=e607]:
                - code [ref=e608]: detectRootDir
                - text: ": root used to detect dependencies, framework folders, and project files."
              - listitem [ref=e609]:
                - code [ref=e610]: tsconfigRootDir
                - text: ": root passed to TypeScript parser options."
            - paragraph [ref=e611]: "In monorepos these can differ. Example:"
            - figure [ref=e613]:
              - code [ref=e616]:
                - generic [ref=e618]: "import { defineConfig } from '@santi020k/eslint-config-basic'"
                - generic [ref=e622]: "export default await defineConfig({"
                - generic [ref=e624]: "detectRootDir: process.cwd(),"
                - generic [ref=e627]: "tsconfigRootDir: new URL('.', import.meta.url).pathname"
                - generic [ref=e630]: "})"
              - button "Copy to clipboard" [ref=e632] [cursor=pointer]
            - generic [ref=e634]:
              - heading "Monorepo Projects" [level=2] [ref=e635]
              - link "Section titled “Monorepo Projects”" [ref=e636] [cursor=pointer]:
                - /url: "#monorepo-projects"
                - img [ref=e638]
                - generic [ref=e640]: Section titled “Monorepo Projects”
            - paragraph [ref=e641]:
              - text: Use
              - code [ref=e642]: projects
              - text: to scope package-specific presets and integrations to workspace folders.
            - figure [ref=e644]:
              - region [ref=e646]:
                - code [ref=e647]:
                  - generic [ref=e649]: "import { defineConfig, Preset, Runtime } from '@santi020k/eslint-config-basic'"
                  - generic [ref=e653]: "export default await defineConfig({"
                  - generic [ref=e655]: "preset: Preset.Monorepo,"
                  - generic [ref=e658]: "projects: {"
                  - generic [ref=e661]: "'apps/api': {"
                  - generic [ref=e663]: "preset: Preset.Library,"
                  - generic [ref=e666]: "runtime: Runtime.Node"
                  - generic [ref=e669]: "},"
                  - generic [ref=e672]: "'apps/web': {"
                  - generic [ref=e674]: "frameworks: { next: true },"
                  - generic [ref=e677]: "preset: Preset.App"
                  - generic [ref=e680]: "}"
                  - generic [ref=e683]: "}"
                  - generic [ref=e686]: "})"
              - button "Copy to clipboard" [ref=e688] [cursor=pointer]
            - paragraph [ref=e690]: Each project key is treated as a folder relative to the repo root. The generated project entries are scoped to that folder.
            - generic [ref=e691]:
              - heading "Full Example" [level=2] [ref=e692]
              - link "Section titled “Full Example”" [ref=e693] [cursor=pointer]:
                - /url: "#full-example"
                - img [ref=e695]
                - generic [ref=e697]: Section titled “Full Example”
            - figure [ref=e699]:
              - region [ref=e701]:
                - code [ref=e702]:
                  - generic [ref=e704]: "import { defineConfig, Extension, Format, Library, Testing, Tool } from '@santi020k/eslint-config-basic'"
                  - generic [ref=e708]: "export default await defineConfig({"
                  - generic [ref=e710]: "extensions: ["
                  - generic [ref=e713]: Extension.Unicorn,
                  - generic [ref=e715]: Extension.Sonarjs,
                  - generic [ref=e717]: Extension.Perfectionist,
                  - generic [ref=e719]: Extension.Security,
                  - generic [ref=e721]: Extension.Regexp,
                  - generic [ref=e723]: Extension.BestPractices
                  - generic [ref=e725]: "],"
                  - generic [ref=e728]: "formats: ["
                  - generic [ref=e731]: Format.Mdx,
                  - generic [ref=e733]: Format.Markdown,
                  - generic [ref=e735]: Format.Jsonc,
                  - generic [ref=e737]: Format.Graphql,
                  - generic [ref=e739]: Format.Yaml,
                  - generic [ref=e741]: Format.Toml
                  - generic [ref=e743]: "],"
                  - generic [ref=e746]: "frameworks: {"
                  - generic [ref=e749]: "next: true,"
                  - generic [ref=e752]: "react: true"
                  - generic [ref=e755]: "},"
                  - generic [ref=e758]: "libraries: ["
                  - generic [ref=e761]: Library.AiSdk,
                  - generic [ref=e763]: Library.OpenAiAgents,
                  - generic [ref=e765]: Library.Mastra,
                  - generic [ref=e767]: Library.Mcp,
                  - generic [ref=e769]: Library.Tailwind,
                  - generic [ref=e771]: Library.TanstackQuery,
                  - generic [ref=e773]: Library.TanstackRouter,
                  - generic [ref=e775]: Library.Storybook,
                  - generic [ref=e777]: Library.I18next,
                  - generic [ref=e779]: Library.Prisma,
                  - generic [ref=e781]: Library.Drizzle,
                  - generic [ref=e783]: Library.Typeorm,
                  - generic [ref=e785]: Library.MikroOrm,
                  - generic [ref=e787]: Library.Sequelize
                  - generic [ref=e789]: "],"
                  - generic [ref=e792]: "strict: true,"
                  - generic [ref=e795]: "testing: ["
                  - generic [ref=e798]: Testing.Vitest,
                  - generic [ref=e800]: Testing.Playwright,
                  - generic [ref=e802]: Testing.TestingLibrary,
                  - generic [ref=e804]: Testing.Cypress
                  - generic [ref=e806]: "],"
                  - generic [ref=e809]: "tools: ["
                  - generic [ref=e812]: Tool.Prettier,
                  - generic [ref=e814]: Tool.Cspell,
                  - generic [ref=e816]: Tool.Jsdoc,
                  - generic [ref=e818]: Tool.Swagger
                  - generic [ref=e820]: "],"
                  - generic [ref=e823]: "typescript: true"
                  - generic [ref=e826]: "})"
              - button "Copy to clipboard" [ref=e828] [cursor=pointer]
            - generic [ref=e830]:
              - heading "Common Patterns" [level=2] [ref=e831]
              - link "Section titled “Common Patterns”" [ref=e832] [cursor=pointer]:
                - /url: "#common-patterns"
                - img [ref=e834]
                - generic [ref=e836]: Section titled “Common Patterns”
            - generic [ref=e837]:
              - heading "Fullstack Remix + Tailwind" [level=3] [ref=e838]
              - link "Section titled “Fullstack Remix + Tailwind”" [ref=e839] [cursor=pointer]:
                - /url: "#fullstack-remix--tailwind"
                - img [ref=e841]
                - generic [ref=e843]: Section titled “Fullstack Remix + Tailwind”
            - figure [ref=e845]:
              - region [ref=e847]:
                - code [ref=e848]:
                  - generic [ref=e850]: "import { defineConfig, Library } from '@santi020k/eslint-config-basic'"
                  - generic [ref=e854]: "export default await defineConfig({"
                  - generic [ref=e856]: "frameworks: { remix: true },"
                  - generic [ref=e859]: "libraries: [Library.Tailwind]"
                  - generic [ref=e862]: "})"
              - button "Copy to clipboard" [ref=e864] [cursor=pointer]
            - generic [ref=e866]:
              - heading "Astro + Svelte + Vitest" [level=3] [ref=e867]
              - link "Section titled “Astro + Svelte + Vitest”" [ref=e868] [cursor=pointer]:
                - /url: "#astro--svelte--vitest"
                - img [ref=e870]
                - generic [ref=e872]: Section titled “Astro + Svelte + Vitest”
            - figure [ref=e874]:
              - region [ref=e876]:
                - code [ref=e877]:
                  - generic [ref=e879]: "import { defineConfig, Testing } from '@santi020k/eslint-config-basic'"
                  - generic [ref=e883]: "export default await defineConfig({"
                  - generic [ref=e885]: "frameworks: { astro: true, svelte: true },"
                  - generic [ref=e888]: "testing: [Testing.Vitest]"
                  - generic [ref=e891]: "})"
              - button "Copy to clipboard" [ref=e893] [cursor=pointer]
            - generic [ref=e895]:
              - heading "Strict Mode" [level=2] [ref=e896]
              - link "Section titled “Strict Mode”" [ref=e897] [cursor=pointer]:
                - /url: "#strict-mode"
                - img [ref=e899]
                - generic [ref=e901]: Section titled “Strict Mode”
            - figure [ref=e903]:
              - code [ref=e906]:
                - generic [ref=e908]: "import { defineConfig } from '@santi020k/eslint-config-basic'"
                - generic [ref=e912]: "export default await defineConfig({"
                - generic [ref=e914]: "strict: true"
                - generic [ref=e917]: "})"
              - button "Copy to clipboard" [ref=e919] [cursor=pointer]
            - paragraph [ref=e921]: "Strict mode accepts profiles:"
            - table [ref=e922]:
              - rowgroup [ref=e923]:
                - row "Value Behavior" [ref=e924]:
                  - columnheader "Value" [ref=e925]
                  - columnheader "Behavior" [ref=e926]
              - rowgroup [ref=e927]:
                - row "false or 'recommended' Keep recommended rule severities." [ref=e928]:
                  - cell "false or 'recommended'" [ref=e929]:
                    - code [ref=e930]: "false"
                    - text: or
                    - code [ref=e931]: "'recommended'"
                  - cell "Keep recommended rule severities." [ref=e932]
                - row "true or 'ci' Promote warnings to errors." [ref=e933]:
                  - cell "true or 'ci'" [ref=e934]:
                    - code [ref=e935]: "true"
                    - text: or
                    - code [ref=e936]: "'ci'"
                  - cell "Promote warnings to errors." [ref=e937]
                - row "'pedantic' Promote warnings and enable built-in best-practice rules." [ref=e938]:
                  - cell "'pedantic'" [ref=e939]:
                    - code [ref=e940]: "'pedantic'"
                  - cell "Promote warnings and enable built-in best-practice rules." [ref=e941]
            - generic [ref=e942]:
              - heading "Settings" [level=2] [ref=e943]
              - link "Section titled “Settings”" [ref=e944] [cursor=pointer]:
                - /url: "#settings"
                - img [ref=e946]
                - generic [ref=e948]: Section titled “Settings”
            - paragraph [ref=e949]: Gitignore integration is enabled by default.
            - figure [ref=e951]:
              - region [ref=e953]:
                - code [ref=e954]:
                  - generic [ref=e956]: "import { defineConfig, Setting } from '@santi020k/eslint-config-basic'"
                  - generic [ref=e960]: "export default await defineConfig({"
                  - generic [ref=e962]: "settings: [Setting.NoGitignore]"
                  - generic [ref=e965]: "})"
              - button "Copy to clipboard" [ref=e967] [cursor=pointer]
            - generic [ref=e969]:
              - heading "Related Pages" [level=2] [ref=e970]
              - link "Section titled “Related Pages”" [ref=e971] [cursor=pointer]:
                - /url: "#related-pages"
                - img [ref=e973]
                - generic [ref=e975]: Section titled “Related Pages”
            - list [ref=e976]:
              - listitem [ref=e977]:
                - link "Installation" [ref=e978] [cursor=pointer]:
                  - /url: /guide/installation
              - listitem [ref=e979]:
                - link "v1 to v2 Migration" [ref=e980] [cursor=pointer]:
                  - /url: /guide/migration-v1-to-v2
              - listitem [ref=e981]:
                - link "Framework Guides" [ref=e982] [cursor=pointer]:
                  - /url: /frameworks/typescript
              - listitem [ref=e983]:
                - link "Integrations" [ref=e984] [cursor=pointer]:
                  - /url: /tooling/overview
            - generic [ref=e985]:
              - heading "Schema" [level=2] [ref=e986]
              - link "Section titled “Schema”" [ref=e987] [cursor=pointer]:
                - /url: "#schema"
                - img [ref=e989]
                - generic [ref=e991]: Section titled “Schema”
            - paragraph [ref=e992]:
              - text: This repo can generate a JSON schema for
              - code [ref=e993]: EslintConfigOptions
              - text: ":"
            - figure "Terminal window" [ref=e995]:
              - generic [ref=e997]: Terminal window
              - code [ref=e999]:
                - generic [ref=e1001]: pnpm run build:schema
              - button "Copy to clipboard" [ref=e1003] [cursor=pointer]
            - paragraph [ref=e1005]:
              - text: The output file is
              - code [ref=e1006]: eslint-config-schema.json
              - text: at the repository root.
          - generic [ref=e1007]:
            - generic [ref=e1008]:
              - link "Edit page" [ref=e1009] [cursor=pointer]:
                - /url: https://github.com/santi020k/eslint-config-basic/edit/main/packages/docs/src/content/docs/guide/configuration.md
                - img [ref=e1010]
                - text: Edit page
              - paragraph [ref=e1012]:
                - text: "Last updated:"
                - time [ref=e1013]: Jun 11, 2026
            - generic [ref=e1014]:
              - link "Previous Installation" [ref=e1015] [cursor=pointer]:
                - /url: /guide/installation/
                - img [ref=e1016]
                - generic [ref=e1018]:
                  - text: Previous
                  - text: Installation
              - link "Next Presets" [ref=e1019] [cursor=pointer]:
                - /url: /guide/presets/
                - img [ref=e1020]
                - generic [ref=e1022]:
                  - text: Next
                  - text: Presets
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