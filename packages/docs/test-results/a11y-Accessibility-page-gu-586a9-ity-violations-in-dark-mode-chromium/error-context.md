# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> Accessibility >> page /guide/runtime/ should have no accessibility violations in dark mode
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
+                 "html": "<a href=\"/guide/runtime/\" aria-current=\"page\" class=\"astro-ujldrfsy\"> <span class=\"astro-ujldrfsy\">Runtime</span>  </a>",
+                 "target": Array [
+                   "a[href$=\"runtime/\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 1.94 (foreground color: #281745, background color: #5a0fdb, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"astro-ujldrfsy\">Runtime</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"runtime/\"] > .astro-ujldrfsy",
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
              - link "Available Runtimes" [ref=e174] [cursor=pointer]:
                - /url: "#available-runtimes"
            - listitem [ref=e175]:
              - link "Runtime Details" [ref=e176] [cursor=pointer]:
                - /url: "#runtime-details"
              - list [ref=e177]:
                - listitem [ref=e178]:
                  - link "Runtime.Universal (default)" [ref=e179] [cursor=pointer]:
                    - /url: "#runtimeuniversal-default"
                - listitem [ref=e180]:
                  - link "Runtime.Browser" [ref=e181] [cursor=pointer]:
                    - /url: "#runtimebrowser"
                - listitem [ref=e182]:
                  - link "Runtime.Node" [ref=e183] [cursor=pointer]:
                    - /url: "#runtimenode"
                - listitem [ref=e184]:
                  - link "Runtime.Worker" [ref=e185] [cursor=pointer]:
                    - /url: "#runtimeworker"
            - listitem [ref=e186]:
              - link "Auto-Detection" [ref=e187] [cursor=pointer]:
                - /url: "#auto-detection"
            - listitem [ref=e188]:
              - link "Runtime in Monorepos" [ref=e189] [cursor=pointer]:
                - /url: "#runtime-in-monorepos"
            - listitem [ref=e190]:
              - link "Related Pages" [ref=e191] [cursor=pointer]:
                - /url: "#related-pages"
      - main [ref=e193]:
        - heading "Runtime" [level=1] [ref=e196]
        - generic [ref=e198]:
          - generic [ref=e199]:
            - paragraph [ref=e200]:
              - text: The
              - code [ref=e201]: runtime
              - text: option controls which global variables are available during linting. Picking the wrong runtime leads to false positives for globals that are not available in your actual execution environment.
            - figure "eslint.config.mjs" [ref=e203]:
              - generic [ref=e205]: eslint.config.mjs
              - region [ref=e206]:
                - code [ref=e207]:
                  - generic [ref=e209]: "import { defineConfig, Runtime } from '@santi020k/eslint-config-basic'"
                  - generic [ref=e213]: "export default await defineConfig({"
                  - generic [ref=e215]: "runtime: Runtime.Node"
                  - generic [ref=e218]: "})"
              - button "Copy to clipboard" [ref=e220] [cursor=pointer]
            - generic [ref=e222]:
              - heading "Available Runtimes" [level=2] [ref=e223]
              - link "Section titled “Available Runtimes”" [ref=e224] [cursor=pointer]:
                - /url: "#available-runtimes"
                - img [ref=e226]
                - generic [ref=e228]: Section titled “Available Runtimes”
            - table [ref=e229]:
              - rowgroup [ref=e230]:
                - row "Runtime Enum Use It When" [ref=e231]:
                  - columnheader "Runtime" [ref=e232]
                  - columnheader "Enum" [ref=e233]
                  - columnheader "Use It When" [ref=e234]
              - rowgroup [ref=e235]:
                - row "Universal Runtime.Universal Full-stack projects, or when you are unsure — adds both Node.js and browser globals." [ref=e236]:
                  - cell "Universal" [ref=e237]
                  - cell "Runtime.Universal" [ref=e238]:
                    - code [ref=e239]: Runtime.Universal
                  - cell "Full-stack projects, or when you are unsure — adds both Node.js and browser globals." [ref=e240]
                - row "Browser Runtime.Browser Front-end-only code. Removes Node.js globals to prevent accidental server-side assumptions." [ref=e241]:
                  - cell "Browser" [ref=e242]
                  - cell "Runtime.Browser" [ref=e243]:
                    - code [ref=e244]: Runtime.Browser
                  - cell "Front-end-only code. Removes Node.js globals to prevent accidental server-side assumptions." [ref=e245]
                - row "Node Runtime.Node Back-end-only code (APIs, CLIs, scripts). Removes browser globals." [ref=e246]:
                  - cell "Node" [ref=e247]
                  - cell "Runtime.Node" [ref=e248]:
                    - code [ref=e249]: Runtime.Node
                  - cell "Back-end-only code (APIs, CLIs, scripts). Removes browser globals." [ref=e250]
                - row "Worker Runtime.Worker Edge runtimes, Cloudflare Workers, service workers — adds Fetch API and WinterCG globals instead." [ref=e251]:
                  - cell "Worker" [ref=e252]
                  - cell "Runtime.Worker" [ref=e253]:
                    - code [ref=e254]: Runtime.Worker
                  - cell "Edge runtimes, Cloudflare Workers, service workers — adds Fetch API and WinterCG globals instead." [ref=e255]
            - generic [ref=e256]:
              - heading "Runtime Details" [level=2] [ref=e257]
              - link "Section titled “Runtime Details”" [ref=e258] [cursor=pointer]:
                - /url: "#runtime-details"
                - img [ref=e260]
                - generic [ref=e262]: Section titled “Runtime Details”
            - generic [ref=e263]:
              - heading "Runtime.Universal (default)" [level=3] [ref=e264]:
                - code [ref=e265]: Runtime.Universal
                - text: (default)
              - link "Section titled “Runtime.Universal (default)”" [ref=e266] [cursor=pointer]:
                - /url: "#runtimeuniversal-default"
                - img [ref=e268]
                - generic [ref=e270]: Section titled “Runtime.Universal (default)”
            - paragraph [ref=e271]:
              - text: Adds
              - strong [ref=e272]: both
              - text: Node.js and browser globals. This is the default when no explicit runtime is set and auto-detection cannot determine a clear signal.
            - paragraph [ref=e273]: Use this when your project is truly full-stack and source files mix server and client code (for example a Remix app with API routes and React components in the same tree).
            - figure [ref=e275]:
              - region [ref=e277]:
                - code [ref=e278]:
                  - generic [ref=e280]: "import { defineConfig, Runtime } from '@santi020k/eslint-config-basic'"
                  - generic [ref=e284]: "export default await defineConfig({"
                  - generic [ref=e286]: "runtime: Runtime.Universal"
                  - generic [ref=e289]: "})"
              - button "Copy to clipboard" [ref=e291] [cursor=pointer]
            - generic [ref=e293]:
              - heading "Runtime.Browser" [level=3] [ref=e294]:
                - code [ref=e295]: Runtime.Browser
              - link "Section titled “Runtime.Browser”" [ref=e296] [cursor=pointer]:
                - /url: "#runtimebrowser"
                - img [ref=e298]
                - generic [ref=e300]: Section titled “Runtime.Browser”
            - paragraph [ref=e301]:
              - text: "Adds browser globals:"
              - code [ref=e302]: window
              - text: ","
              - code [ref=e303]: document
              - text: ","
              - code [ref=e304]: navigator
              - text: ","
              - code [ref=e305]: location
              - text: ","
              - code [ref=e306]: history
              - text: ","
              - code [ref=e307]: localStorage
              - text: ","
              - code [ref=e308]: fetch
              - text: ","
              - code [ref=e309]: XMLHttpRequest
              - text: ","
              - code [ref=e310]: CustomEvent
              - text: ", and the full DOM API surface."
            - paragraph [ref=e311]:
              - text: Does
              - strong [ref=e312]: not
              - text: include Node.js-specific globals like
              - code [ref=e313]: process
              - text: ","
              - code [ref=e314]: Buffer
              - text: ","
              - code [ref=e315]: __dirname
              - text: ", or"
              - code [ref=e316]: require
              - text: .
            - figure [ref=e318]:
              - region [ref=e320]:
                - code [ref=e321]:
                  - generic [ref=e323]: "import { defineConfig, Runtime } from '@santi020k/eslint-config-basic'"
                  - generic [ref=e327]: "export default await defineConfig({"
                  - generic [ref=e329]: "frameworks: { vue: true },"
                  - generic [ref=e332]: "runtime: Runtime.Browser"
                  - generic [ref=e335]: "})"
              - button "Copy to clipboard" [ref=e337] [cursor=pointer]
            - blockquote [ref=e339]:
              - paragraph [ref=e340]: "[!TIP] Most framework presets (React, Vue, Svelte, Solid, Angular, Astro) automatically narrow to Browser runtime. You usually do not need to set this explicitly for UI projects."
            - generic [ref=e341]:
              - heading "Runtime.Node" [level=3] [ref=e342]:
                - code [ref=e343]: Runtime.Node
              - link "Section titled “Runtime.Node”" [ref=e344] [cursor=pointer]:
                - /url: "#runtimenode"
                - img [ref=e346]
                - generic [ref=e348]: Section titled “Runtime.Node”
            - paragraph [ref=e349]:
              - text: "Adds Node.js globals:"
              - code [ref=e350]: process
              - text: ","
              - code [ref=e351]: Buffer
              - text: ","
              - code [ref=e352]: __dirname
              - text: ","
              - code [ref=e353]: __filename
              - text: ","
              - code [ref=e354]: require
              - text: ","
              - code [ref=e355]: module
              - text: ","
              - code [ref=e356]: exports
              - text: ","
              - code [ref=e357]: global
              - text: ","
              - code [ref=e358]: setTimeout
              - text: ","
              - code [ref=e359]: setInterval
              - text: ","
              - code [ref=e360]: setImmediate
              - text: ", and"
              - code [ref=e361]: clearImmediate
              - text: .
            - paragraph [ref=e362]:
              - text: Does
              - strong [ref=e363]: not
              - text: include browser DOM globals.
            - figure [ref=e365]:
              - region [ref=e367]:
                - code [ref=e368]:
                  - generic [ref=e370]: "import { defineConfig, Runtime } from '@santi020k/eslint-config-basic'"
                  - generic [ref=e374]: "export default await defineConfig({"
                  - generic [ref=e376]: "frameworks: { nest: true },"
                  - generic [ref=e379]: "runtime: Runtime.Node"
                  - generic [ref=e382]: "})"
              - button "Copy to clipboard" [ref=e384] [cursor=pointer]
            - paragraph [ref=e386]:
              - text: Use
              - code [ref=e387]: Runtime.Node
              - text: "for: Express / Fastify / Hono APIs, NestJS applications, CLI tools and scripts, and Node.js cron jobs."
            - generic [ref=e388]:
              - heading "Runtime.Worker" [level=3] [ref=e389]:
                - code [ref=e390]: Runtime.Worker
              - link "Section titled “Runtime.Worker”" [ref=e391] [cursor=pointer]:
                - /url: "#runtimeworker"
                - img [ref=e393]
                - generic [ref=e395]: Section titled “Runtime.Worker”
            - paragraph [ref=e396]:
              - text: "Adds service worker and Fetch API globals:"
              - code [ref=e397]: self
              - text: ","
              - code [ref=e398]: fetch
              - text: ","
              - code [ref=e399]: Request
              - text: ","
              - code [ref=e400]: Response
              - text: ","
              - code [ref=e401]: Headers
              - text: ","
              - code [ref=e402]: URL
              - text: ","
              - code [ref=e403]: URLSearchParams
              - text: ","
              - code [ref=e404]: ReadableStream
              - text: ","
              - code [ref=e405]: WritableStream
              - text: ","
              - code [ref=e406]: TransformStream
              - text: ","
              - code [ref=e407]: caches
              - text: ","
              - code [ref=e408]: crypto
              - text: ", and"
              - code [ref=e409]: CryptoKey
              - text: .
            - paragraph [ref=e410]:
              - text: Does
              - strong [ref=e411]: not
              - text: include
              - code [ref=e412]: window
              - text: (workers have no DOM access) and does
              - strong [ref=e413]: not
              - text: include Node.js-specific globals.
            - figure [ref=e415]:
              - region [ref=e417]:
                - code [ref=e418]:
                  - generic [ref=e420]: "import { defineConfig, Runtime } from '@santi020k/eslint-config-basic'"
                  - generic [ref=e424]: "export default await defineConfig({"
                  - generic [ref=e426]: "frameworks: { hono: true },"
                  - generic [ref=e429]: "runtime: Runtime.Worker"
                  - generic [ref=e432]: "})"
              - button "Copy to clipboard" [ref=e434] [cursor=pointer]
            - paragraph [ref=e436]:
              - text: Use
              - code [ref=e437]: Runtime.Worker
              - text: "for: Cloudflare Workers, Vercel Edge Functions, Next.js middleware, and Browser service workers."
            - generic [ref=e438]:
              - heading "Auto-Detection" [level=2] [ref=e439]
              - link "Section titled “Auto-Detection”" [ref=e440] [cursor=pointer]:
                - /url: "#auto-detection"
                - img [ref=e442]
                - generic [ref=e444]: Section titled “Auto-Detection”
            - paragraph [ref=e445]:
              - text: When no
              - code [ref=e446]: runtime
              - text: is set explicitly, auto-detection reads
              - code [ref=e447]: package.json
              - text: "and the project file tree for signals:"
            - table [ref=e448]:
              - rowgroup [ref=e449]:
                - row "Signal Detected Runtime" [ref=e450]:
                  - columnheader "Signal" [ref=e451]
                  - columnheader "Detected Runtime" [ref=e452]
              - rowgroup [ref=e453]:
                - row "Presence of next, astro, vite, solid-js, svelte, vue Browser" [ref=e454]:
                  - cell "Presence of next, astro, vite, solid-js, svelte, vue" [ref=e455]:
                    - text: Presence of
                    - code [ref=e456]: next
                    - text: ","
                    - code [ref=e457]: astro
                    - text: ","
                    - code [ref=e458]: vite
                    - text: ","
                    - code [ref=e459]: solid-js
                    - text: ","
                    - code [ref=e460]: svelte
                    - text: ","
                    - code [ref=e461]: vue
                  - cell "Browser" [ref=e462]:
                    - code [ref=e463]: Browser
                - row "Presence of express, fastify, nestjs, hono, koa Node" [ref=e464]:
                  - cell "Presence of express, fastify, nestjs, hono, koa" [ref=e465]:
                    - text: Presence of
                    - code [ref=e466]: express
                    - text: ","
                    - code [ref=e467]: fastify
                    - text: ","
                    - code [ref=e468]: nestjs
                    - text: ","
                    - code [ref=e469]: hono
                    - text: ","
                    - code [ref=e470]: koa
                  - cell "Node" [ref=e471]:
                    - code [ref=e472]: Node
                - row "Presence of @cloudflare/workers-types, wrangler, @vercel/edge Worker" [ref=e473]:
                  - cell "Presence of @cloudflare/workers-types, wrangler, @vercel/edge" [ref=e474]:
                    - text: Presence of
                    - code [ref=e475]: "@cloudflare/workers-types"
                    - text: ","
                    - code [ref=e476]: wrangler
                    - text: ","
                    - code [ref=e477]: "@vercel/edge"
                  - cell "Worker" [ref=e478]:
                    - code [ref=e479]: Worker
                - row "No clear signal Universal" [ref=e480]:
                  - cell "No clear signal" [ref=e481]
                  - cell "Universal" [ref=e482]:
                    - code [ref=e483]: Universal
            - paragraph [ref=e484]:
              - text: "Detection precedence (highest wins):"
              - code [ref=e485]: Worker > Node > Browser > Universal
              - text: .
            - paragraph [ref=e486]:
              - text: Use
              - code [ref=e487]: "detection: { runtime: false }"
              - text: to disable runtime auto-detection and rely solely on your explicit
              - code [ref=e488]: runtime
              - text: option.
            - generic [ref=e489]:
              - heading "Runtime in Monorepos" [level=2] [ref=e490]
              - link "Section titled “Runtime in Monorepos”" [ref=e491] [cursor=pointer]:
                - /url: "#runtime-in-monorepos"
                - img [ref=e493]
                - generic [ref=e495]: Section titled “Runtime in Monorepos”
            - paragraph [ref=e496]:
              - text: Use the
              - code [ref=e497]: projects
              - text: "option to assign different runtimes to different workspace packages:"
            - figure [ref=e499]:
              - region [ref=e501]:
                - code [ref=e502]:
                  - generic [ref=e504]: "import { defineConfig, Preset, Runtime } from '@santi020k/eslint-config-basic'"
                  - generic [ref=e508]: "export default await defineConfig({"
                  - generic [ref=e510]: "preset: Preset.Monorepo,"
                  - generic [ref=e513]: "projects: {"
                  - generic [ref=e516]: "'apps/edge-api': { runtime: Runtime.Worker },"
                  - generic [ref=e518]: "'apps/web': { frameworks: { next: true }, runtime: Runtime.Browser },"
                  - generic [ref=e520]: "'packages/cli': { runtime: Runtime.Node },"
                  - generic [ref=e522]: "'packages/sdk': { runtime: Runtime.Universal }"
                  - generic [ref=e524]: "}"
                  - generic [ref=e527]: "})"
              - button "Copy to clipboard" [ref=e529] [cursor=pointer]
            - generic [ref=e531]:
              - heading "Related Pages" [level=2] [ref=e532]
              - link "Section titled “Related Pages”" [ref=e533] [cursor=pointer]:
                - /url: "#related-pages"
                - img [ref=e535]
                - generic [ref=e537]: Section titled “Related Pages”
            - list [ref=e538]:
              - listitem [ref=e539]:
                - link "Presets" [ref=e540] [cursor=pointer]:
                  - /url: /guide/presets
                - text: — preset defaults per runtime
              - listitem [ref=e541]:
                - link "Monorepo" [ref=e542] [cursor=pointer]:
                  - /url: /guide/monorepo
                - text: — per-package runtime scoping
              - listitem [ref=e543]:
                - link "Configuration" [ref=e544] [cursor=pointer]:
                  - /url: /guide/configuration
                - text: — full option reference
          - generic [ref=e545]:
            - generic [ref=e546]:
              - link "Edit page" [ref=e547] [cursor=pointer]:
                - /url: https://github.com/santi020k/eslint-config-basic/edit/main/packages/docs/src/content/docs/guide/runtime.md
                - img [ref=e548]
                - text: Edit page
              - paragraph [ref=e550]:
                - text: "Last updated:"
                - time [ref=e551]: Jun 11, 2026
            - generic [ref=e552]:
              - link "Previous Presets" [ref=e553] [cursor=pointer]:
                - /url: /guide/presets/
                - img [ref=e554]
                - generic [ref=e556]:
                  - text: Previous
                  - text: Presets
              - link "Next Monorepo" [ref=e557] [cursor=pointer]:
                - /url: /guide/monorepo/
                - img [ref=e558]
                - generic [ref=e560]:
                  - text: Next
                  - text: Monorepo
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