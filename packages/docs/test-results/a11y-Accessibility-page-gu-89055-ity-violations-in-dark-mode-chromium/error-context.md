# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> Accessibility >> page /guide/presets/ should have no accessibility violations in dark mode
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
+                 "html": "<a href=\"/guide/presets/\" aria-current=\"page\" class=\"astro-ujldrfsy\"> <span class=\"astro-ujldrfsy\">Presets</span>  </a>",
+                 "target": Array [
+                   "a[href$=\"presets/\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 1.94 (foreground color: #281745, background color: #5a0fdb, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"astro-ujldrfsy\">Presets</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"presets/\"] > .astro-ujldrfsy",
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
              - link "Available Presets" [ref=e174] [cursor=pointer]:
                - /url: "#available-presets"
            - listitem [ref=e175]:
              - link "What Each Preset Enables" [ref=e176] [cursor=pointer]:
                - /url: "#what-each-preset-enables"
              - list [ref=e177]:
                - listitem [ref=e178]:
                  - link "Preset.Basic" [ref=e179] [cursor=pointer]:
                    - /url: "#presetbasic"
                - listitem [ref=e180]:
                  - link "Preset.Node" [ref=e181] [cursor=pointer]:
                    - /url: "#presetnode"
                - listitem [ref=e182]:
                  - link "Preset.Browser" [ref=e183] [cursor=pointer]:
                    - /url: "#presetbrowser"
                - listitem [ref=e184]:
                  - link "Preset.Worker" [ref=e185] [cursor=pointer]:
                    - /url: "#presetworker"
                - listitem [ref=e186]:
                  - link "Preset.Library" [ref=e187] [cursor=pointer]:
                    - /url: "#presetlibrary"
                - listitem [ref=e188]:
                  - link "Preset.App" [ref=e189] [cursor=pointer]:
                    - /url: "#presetapp"
                - listitem [ref=e190]:
                  - link "Preset.CI" [ref=e191] [cursor=pointer]:
                    - /url: "#presetci"
                - listitem [ref=e192]:
                  - link "Preset.Monorepo" [ref=e193] [cursor=pointer]:
                    - /url: "#presetmonorepo"
                - listitem [ref=e194]:
                  - link "Preset.All" [ref=e195] [cursor=pointer]:
                    - /url: "#presetall"
            - listitem [ref=e196]:
              - link "Presets and Frameworks" [ref=e197] [cursor=pointer]:
                - /url: "#presets-and-frameworks"
            - listitem [ref=e198]:
              - link "Overriding Preset Defaults" [ref=e199] [cursor=pointer]:
                - /url: "#overriding-preset-defaults"
            - listitem [ref=e200]:
              - link "Related Pages" [ref=e201] [cursor=pointer]:
                - /url: "#related-pages"
      - main [ref=e203]:
        - heading "Presets" [level=1] [ref=e206]
        - generic [ref=e208]:
          - generic [ref=e209]:
            - paragraph [ref=e210]:
              - text: Presets are named bundles of default options that give a project a sensible starting point without requiring every option to be listed explicitly. A preset sets defaults for
              - code [ref=e211]: typescript
              - text: ","
              - code [ref=e212]: runtime
              - text: ","
              - code [ref=e213]: tools
              - text: ","
              - code [ref=e214]: extensions
              - text: ", and"
              - code [ref=e215]: strict
              - text: — you can override any of those on top of it.
            - figure "eslint.config.mjs" [ref=e217]:
              - generic [ref=e219]: eslint.config.mjs
              - code [ref=e221]:
                - generic [ref=e223]: "import { defineConfig, Preset } from '@santi020k/eslint-config-basic'"
                - generic [ref=e227]: "export default await defineConfig({"
                - generic [ref=e229]: "preset: Preset.App"
                - generic [ref=e232]: "})"
              - button "Copy to clipboard" [ref=e234] [cursor=pointer]
            - generic [ref=e236]:
              - heading "Available Presets" [level=2] [ref=e237]
              - link "Section titled “Available Presets”" [ref=e238] [cursor=pointer]:
                - /url: "#available-presets"
                - img [ref=e240]
                - generic [ref=e242]: Section titled “Available Presets”
            - table [ref=e243]:
              - rowgroup [ref=e244]:
                - row "Preset Enum Best For" [ref=e245]:
                  - columnheader "Preset" [ref=e246]
                  - columnheader "Enum" [ref=e247]
                  - columnheader "Best For" [ref=e248]
              - rowgroup [ref=e249]:
                - row "Basic Preset.Basic Plain JavaScript projects with no TypeScript." [ref=e250]:
                  - cell "Basic" [ref=e251]
                  - cell "Preset.Basic" [ref=e252]:
                    - code [ref=e253]: Preset.Basic
                  - cell "Plain JavaScript projects with no TypeScript." [ref=e254]
                - row "Node Preset.Node TypeScript packages running in Node.js (CLIs, scripts, APIs)." [ref=e255]:
                  - cell "Node" [ref=e256]
                  - cell "Preset.Node" [ref=e257]:
                    - code [ref=e258]: Preset.Node
                  - cell "TypeScript packages running in Node.js (CLIs, scripts, APIs)." [ref=e259]
                - row "Browser Preset.Browser TypeScript apps running in the browser without a meta-framework." [ref=e260]:
                  - cell "Browser" [ref=e261]
                  - cell "Preset.Browser" [ref=e262]:
                    - code [ref=e263]: Preset.Browser
                  - cell "TypeScript apps running in the browser without a meta-framework." [ref=e264]
                - row "Worker Preset.Worker Edge runtimes, service workers, and Cloudflare Workers." [ref=e265]:
                  - cell "Worker" [ref=e266]
                  - cell "Preset.Worker" [ref=e267]:
                    - code [ref=e268]: Preset.Worker
                  - cell "Edge runtimes, service workers, and Cloudflare Workers." [ref=e269]
                - row "Library Preset.Library Published npm packages — adds Prettier and tightens type-safety rules." [ref=e270]:
                  - cell "Library" [ref=e271]
                  - cell "Preset.Library" [ref=e272]:
                    - code [ref=e273]: Preset.Library
                  - cell "Published npm packages — adds Prettier and tightens type-safety rules." [ref=e274]
                - row "App Preset.App Browser applications — TypeScript + Prettier + Vitest by default." [ref=e275]:
                  - cell "App" [ref=e276]
                  - cell "Preset.App" [ref=e277]:
                    - code [ref=e278]: Preset.App
                  - cell "Browser applications — TypeScript + Prettier + Vitest by default." [ref=e279]
                - row "CI Preset.CI Stricter severities for CI environments (warnings become errors)." [ref=e280]:
                  - cell "CI" [ref=e281]
                  - cell "Preset.CI" [ref=e282]:
                    - code [ref=e283]: Preset.CI
                  - cell "Stricter severities for CI environments (warnings become errors)." [ref=e284]
                - row "Monorepo Preset.Monorepo Root config for workspace repositories with mixed project types." [ref=e285]:
                  - cell "Monorepo" [ref=e286]
                  - cell "Preset.Monorepo" [ref=e287]:
                    - code [ref=e288]: Preset.Monorepo
                  - cell "Root config for workspace repositories with mixed project types." [ref=e289]
                - row "All Preset.All TypeScript + all bundled integrations. Useful for audits and evaluation." [ref=e290]:
                  - cell "All" [ref=e291]
                  - cell "Preset.All" [ref=e292]:
                    - code [ref=e293]: Preset.All
                  - cell "TypeScript + all bundled integrations. Useful for audits and evaluation." [ref=e294]
            - generic [ref=e295]:
              - heading "What Each Preset Enables" [level=2] [ref=e296]
              - link "Section titled “What Each Preset Enables”" [ref=e297] [cursor=pointer]:
                - /url: "#what-each-preset-enables"
                - img [ref=e299]
                - generic [ref=e301]: Section titled “What Each Preset Enables”
            - generic [ref=e302]:
              - heading "Preset.Basic" [level=3] [ref=e303]:
                - code [ref=e304]: Preset.Basic
              - link "Section titled “Preset.Basic”" [ref=e305] [cursor=pointer]:
                - /url: "#presetbasic"
                - img [ref=e307]
                - generic [ref=e309]: Section titled “Preset.Basic”
            - paragraph [ref=e310]: The minimum viable config — core JavaScript rules only. No TypeScript, no runtime globals beyond ECMAScript standard. Use this as a base when you want full manual control over everything else.
            - figure [ref=e312]:
              - code [ref=e315]:
                - generic [ref=e317]: "import { defineConfig, Preset } from '@santi020k/eslint-config-basic'"
                - generic [ref=e321]: "export default await defineConfig({ preset: Preset.Basic })"
              - button "Copy to clipboard" [ref=e323] [cursor=pointer]
            - generic [ref=e325]:
              - heading "Preset.Node" [level=3] [ref=e326]:
                - code [ref=e327]: Preset.Node
              - link "Section titled “Preset.Node”" [ref=e328] [cursor=pointer]:
                - /url: "#presetnode"
                - img [ref=e330]
                - generic [ref=e332]: Section titled “Preset.Node”
            - paragraph [ref=e333]:
              - text: TypeScript enabled, Node.js globals active (
              - code [ref=e334]: process
              - text: ","
              - code [ref=e335]: __dirname
              - text: ", Buffer, etc.). Suitable for CLIs, build scripts, and server-side packages that run directly in Node."
            - figure [ref=e337]:
              - code [ref=e340]:
                - generic [ref=e342]: "import { defineConfig, Preset } from '@santi020k/eslint-config-basic'"
                - generic [ref=e346]: "export default await defineConfig({ preset: Preset.Node })"
              - button "Copy to clipboard" [ref=e348] [cursor=pointer]
            - generic [ref=e350]:
              - heading "Preset.Browser" [level=3] [ref=e351]:
                - code [ref=e352]: Preset.Browser
              - link "Section titled “Preset.Browser”" [ref=e353] [cursor=pointer]:
                - /url: "#presetbrowser"
                - img [ref=e355]
                - generic [ref=e357]: Section titled “Preset.Browser”
            - paragraph [ref=e358]:
              - text: TypeScript enabled, browser globals active (
              - code [ref=e359]: window
              - text: ","
              - code [ref=e360]: document
              - text: ","
              - code [ref=e361]: navigator
              - text: ", etc.). Use for front-end code that does not use a full meta-framework — for example a vanilla TypeScript library or a standalone Vite project."
            - figure [ref=e363]:
              - code [ref=e366]:
                - generic [ref=e368]: "import { defineConfig, Preset } from '@santi020k/eslint-config-basic'"
                - generic [ref=e372]: "export default await defineConfig({ preset: Preset.Browser })"
              - button "Copy to clipboard" [ref=e374] [cursor=pointer]
            - generic [ref=e376]:
              - heading "Preset.Worker" [level=3] [ref=e377]:
                - code [ref=e378]: Preset.Worker
              - link "Section titled “Preset.Worker”" [ref=e379] [cursor=pointer]:
                - /url: "#presetworker"
                - img [ref=e381]
                - generic [ref=e383]: Section titled “Preset.Worker”
            - paragraph [ref=e384]:
              - text: TypeScript enabled, service worker and Fetch API globals active (
              - code [ref=e385]: self
              - text: ","
              - code [ref=e386]: fetch
              - text: ","
              - code [ref=e387]: Request
              - text: ","
              - code [ref=e388]: Response
              - text: ","
              - code [ref=e389]: caches
              - text: ", etc.). Use for Cloudflare Workers, edge functions, or any runtime that matches the WinterCG API surface."
            - figure [ref=e391]:
              - code [ref=e394]:
                - generic [ref=e396]: "import { defineConfig, Preset } from '@santi020k/eslint-config-basic'"
                - generic [ref=e400]: "export default await defineConfig({ preset: Preset.Worker })"
              - button "Copy to clipboard" [ref=e402] [cursor=pointer]
            - generic [ref=e404]:
              - heading "Preset.Library" [level=3] [ref=e405]:
                - code [ref=e406]: Preset.Library
              - link "Section titled “Preset.Library”" [ref=e407] [cursor=pointer]:
                - /url: "#presetlibrary"
                - img [ref=e409]
                - generic [ref=e411]: Section titled “Preset.Library”
            - paragraph [ref=e412]: TypeScript enabled, Prettier applied, strict type-safety rules tightened. Designed for packages you publish to npm where you want a consistent, well-typed public API and no leftover debug output.
            - figure [ref=e414]:
              - code [ref=e417]:
                - generic [ref=e419]: "import { defineConfig, Preset } from '@santi020k/eslint-config-basic'"
                - generic [ref=e423]: "export default await defineConfig({ preset: Preset.Library })"
              - button "Copy to clipboard" [ref=e425] [cursor=pointer]
            - generic [ref=e427]:
              - heading "Preset.App" [level=3] [ref=e428]:
                - code [ref=e429]: Preset.App
              - link "Section titled “Preset.App”" [ref=e430] [cursor=pointer]:
                - /url: "#presetapp"
                - img [ref=e432]
                - generic [ref=e434]: Section titled “Preset.App”
            - paragraph [ref=e435]:
              - text: TypeScript enabled, browser globals, Prettier applied, Vitest included. The recommended starting point for any single-page application or web app — pair with a
              - code [ref=e436]: frameworks
              - text: option to add React, Next.js, Vue, or another UI layer.
            - figure [ref=e438]:
              - code [ref=e441]:
                - generic [ref=e443]: "import { defineConfig, Preset } from '@santi020k/eslint-config-basic'"
                - generic [ref=e447]: "export default await defineConfig({"
                - generic [ref=e449]: "frameworks: { next: true },"
                - generic [ref=e452]: "preset: Preset.App"
                - generic [ref=e455]: "})"
              - button "Copy to clipboard" [ref=e457] [cursor=pointer]
            - generic [ref=e459]:
              - heading "Preset.CI" [level=3] [ref=e460]:
                - code [ref=e461]: Preset.CI
              - link "Section titled “Preset.CI”" [ref=e462] [cursor=pointer]:
                - /url: "#presetci"
                - img [ref=e464]
                - generic [ref=e466]: Section titled “Preset.CI”
            - paragraph [ref=e467]: Same as the project’s detected/explicit defaults, but with all warnings promoted to errors. Drop this into a CI-specific config or use it as your single config if you prefer zero-warning builds everywhere.
            - figure [ref=e469]:
              - code [ref=e472]:
                - generic [ref=e474]: "import { defineConfig, Preset } from '@santi020k/eslint-config-basic'"
                - generic [ref=e478]: "export default await defineConfig({ preset: Preset.CI })"
              - button "Copy to clipboard" [ref=e480] [cursor=pointer]
            - blockquote [ref=e482]:
              - paragraph [ref=e483]:
                - text: "[!TIP]"
                - code [ref=e484]: Preset.CI
                - text: is equivalent to setting
                - code [ref=e485]: "strict: true"
                - text: — but using the preset keeps the intent explicit and readable.
            - generic [ref=e486]:
              - heading "Preset.Monorepo" [level=3] [ref=e487]:
                - code [ref=e488]: Preset.Monorepo
              - link "Section titled “Preset.Monorepo”" [ref=e489] [cursor=pointer]:
                - /url: "#presetmonorepo"
                - img [ref=e491]
                - generic [ref=e493]: Section titled “Preset.Monorepo”
            - paragraph [ref=e494]:
              - text: Universal TypeScript defaults for a workspace root that lints many packages at once. Works best with the
              - code [ref=e495]: projects
              - text: option so individual workspace packages can narrow their own preset and runtime.
            - figure [ref=e497]:
              - region [ref=e499]:
                - code [ref=e500]:
                  - generic [ref=e502]: "import { defineConfig, Preset, Runtime } from '@santi020k/eslint-config-basic'"
                  - generic [ref=e506]: "export default await defineConfig({"
                  - generic [ref=e508]: "preset: Preset.Monorepo,"
                  - generic [ref=e511]: "projects: {"
                  - generic [ref=e514]: "'apps/api': { preset: Preset.Node, runtime: Runtime.Node },"
                  - generic [ref=e516]: "'apps/web': { frameworks: { next: true }, preset: Preset.App }"
                  - generic [ref=e518]: "}"
                  - generic [ref=e521]: "})"
              - button "Copy to clipboard" [ref=e523] [cursor=pointer]
            - paragraph [ref=e525]:
              - text: See the
              - link "Monorepo guide" [ref=e526] [cursor=pointer]:
                - /url: /guide/monorepo
              - text: for a full walk-through.
            - generic [ref=e527]:
              - heading "Preset.All" [level=3] [ref=e528]:
                - code [ref=e529]: Preset.All
              - link "Section titled “Preset.All”" [ref=e530] [cursor=pointer]:
                - /url: "#presetall"
                - img [ref=e532]
                - generic [ref=e534]: Section titled “Preset.All”
            - paragraph [ref=e535]: Enables TypeScript and every bundled optional integration (all tools, libraries, testing frameworks, formats, and extensions). Intended for exploration and auditing — not recommended as a long-term production config because it includes integrations your project may not actually use.
            - figure [ref=e537]:
              - code [ref=e540]:
                - generic [ref=e542]: "import { defineConfig, Preset } from '@santi020k/eslint-config-basic'"
                - generic [ref=e546]: "export default await defineConfig({ preset: Preset.All })"
              - button "Copy to clipboard" [ref=e548] [cursor=pointer]
            - generic [ref=e550]:
              - heading "Presets and Frameworks" [level=2] [ref=e551]
              - link "Section titled “Presets and Frameworks”" [ref=e552] [cursor=pointer]:
                - /url: "#presets-and-frameworks"
                - img [ref=e554]
                - generic [ref=e556]: Section titled “Presets and Frameworks”
            - paragraph [ref=e557]:
              - text: Presets do not activate framework configs. Frameworks come from auto-detection (enabled by default) or an explicit
              - code [ref=e558]: frameworks
              - text: option. You can always add a
              - code [ref=e559]: frameworks
              - text: "key alongside any preset:"
            - figure [ref=e561]:
              - code [ref=e564]:
                - generic [ref=e566]: "import { defineConfig, Preset } from '@santi020k/eslint-config-basic'"
                - generic [ref=e570]: "export default await defineConfig({"
                - generic [ref=e572]: "frameworks: { svelte: true },"
                - generic [ref=e575]: "preset: Preset.Browser"
                - generic [ref=e578]: "})"
              - button "Copy to clipboard" [ref=e580] [cursor=pointer]
            - generic [ref=e582]:
              - heading "Overriding Preset Defaults" [level=2] [ref=e583]
              - link "Section titled “Overriding Preset Defaults”" [ref=e584] [cursor=pointer]:
                - /url: "#overriding-preset-defaults"
                - img [ref=e586]
                - generic [ref=e588]: Section titled “Overriding Preset Defaults”
            - paragraph [ref=e589]:
              - text: Any explicit option you pass overrides the preset default for that field. List options (
              - code [ref=e590]: libraries
              - text: ","
              - code [ref=e591]: testing
              - text: ","
              - code [ref=e592]: formats
              - text: ","
              - code [ref=e593]: tools
              - text: ","
              - code [ref=e594]: extensions
              - text: ) are merged with preset defaults under
              - code [ref=e595]: "optionMergeStrategy: 'merge'"
              - text: (the default). Use
              - code [ref=e596]: "optionMergeStrategy: 'replace'"
              - text: when you want your explicit lists to fully replace what the preset provides.
            - generic [ref=e597]:
              - heading "Related Pages" [level=2] [ref=e598]
              - link "Section titled “Related Pages”" [ref=e599] [cursor=pointer]:
                - /url: "#related-pages"
                - img [ref=e601]
                - generic [ref=e603]: Section titled “Related Pages”
            - list [ref=e604]:
              - listitem [ref=e605]:
                - link "Configuration" [ref=e606] [cursor=pointer]:
                  - /url: /guide/configuration
                - text: — full option reference
              - listitem [ref=e607]:
                - link "Runtime" [ref=e608] [cursor=pointer]:
                  - /url: /guide/runtime
                - text: — runtime enum values
              - listitem [ref=e609]:
                - link "Monorepo" [ref=e610] [cursor=pointer]:
                  - /url: /guide/monorepo
                - text: — using presets across workspace packages
          - generic [ref=e611]:
            - generic [ref=e612]:
              - link "Edit page" [ref=e613] [cursor=pointer]:
                - /url: https://github.com/santi020k/eslint-config-basic/edit/main/packages/docs/src/content/docs/guide/presets.md
                - img [ref=e614]
                - text: Edit page
              - paragraph [ref=e616]:
                - text: "Last updated:"
                - time [ref=e617]: Jun 11, 2026
            - generic [ref=e618]:
              - link "Previous Configuration" [ref=e619] [cursor=pointer]:
                - /url: /guide/configuration/
                - img [ref=e620]
                - generic [ref=e622]:
                  - text: Previous
                  - text: Configuration
              - link "Next Runtime" [ref=e623] [cursor=pointer]:
                - /url: /guide/runtime/
                - img [ref=e624]
                - generic [ref=e626]:
                  - text: Next
                  - text: Runtime
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