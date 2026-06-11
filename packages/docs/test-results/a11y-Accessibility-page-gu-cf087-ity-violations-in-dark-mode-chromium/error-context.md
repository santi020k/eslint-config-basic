# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> Accessibility >> page /guide/ai-agents/ should have no accessibility violations in dark mode
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
+                 "html": "<a href=\"/guide/ai-agents/\" aria-current=\"page\" class=\"astro-ujldrfsy\"> <span class=\"astro-ujldrfsy\">AI &amp; Agents</span> <span class=\"sl-badge caution small  astro-ujldrfsy astro-246wmyaq\">Beta</span> </a>",
+                 "target": Array [
+                   "a[href$=\"ai-agents/\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 1.94 (foreground color: #281745, background color: #5a0fdb, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"astro-ujldrfsy\">AI &amp; Agents</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"ai-agents/\"] > span:nth-child(1)",
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
+                 "html": "<a href=\"/guide/ai-agents/\" aria-current=\"page\" class=\"astro-ujldrfsy\"> <span class=\"astro-ujldrfsy\">AI &amp; Agents</span> <span class=\"sl-badge caution small  astro-ujldrfsy astro-246wmyaq\">Beta</span> </a>",
+                 "target": Array [
+                   "a[href$=\"ai-agents/\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 1.94 (foreground color: #281745, background color: #5a0fdb, font size: 9.8pt (13px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"sl-badge caution small  astro-ujldrfsy astro-246wmyaq\">Beta</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".caution",
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
              - link "AI Library Integrations" [ref=e174] [cursor=pointer]:
                - /url: "#ai-library-integrations"
              - list [ref=e175]:
                - listitem [ref=e176]:
                  - link "Supported AI Libraries" [ref=e177] [cursor=pointer]:
                    - /url: "#supported-ai-libraries"
                - listitem [ref=e178]:
                  - link "What Each Integration Covers" [ref=e179] [cursor=pointer]:
                    - /url: "#what-each-integration-covers"
            - listitem [ref=e180]:
              - link "AI Coding Assistant Support" [ref=e181] [cursor=pointer]:
                - /url: "#ai-coding-assistant-support"
              - list [ref=e182]:
                - listitem [ref=e183]:
                  - link "Machine-Readable Context Files" [ref=e184] [cursor=pointer]:
                    - /url: "#machine-readable-context-files"
                - listitem [ref=e185]:
                  - link "Generating Agent Standards" [ref=e186] [cursor=pointer]:
                    - /url: "#generating-agent-standards"
                - listitem [ref=e187]:
                  - link "Supported AI Tools" [ref=e188] [cursor=pointer]:
                    - /url: "#supported-ai-tools"
                - listitem [ref=e189]:
                  - link "CLI Flags" [ref=e190] [cursor=pointer]:
                    - /url: "#cli-flags"
                - listitem [ref=e191]:
                  - link "CI Integration" [ref=e192] [cursor=pointer]:
                    - /url: "#ci-integration"
                - listitem [ref=e193]:
                  - link "Default Ignored Folders" [ref=e194] [cursor=pointer]:
                    - /url: "#default-ignored-folders"
            - listitem [ref=e195]:
              - link "Related Pages" [ref=e196] [cursor=pointer]:
                - /url: "#related-pages"
      - main [ref=e198]:
        - heading "AI & Agents" [level=1] [ref=e201]
        - generic [ref=e203]:
          - generic [ref=e204]:
            - paragraph [ref=e205]: "This page covers two distinct AI-related concerns in this package:"
            - list [ref=e206]:
              - listitem [ref=e207]:
                - strong [ref=e208]: AI library integrations
                - text: — ESLint rules for projects that use AI SDKs and agent frameworks such as Vercel AI SDK, OpenAI Agents, Mastra, MCP, LangChain, and LlamaIndex.
              - listitem [ref=e209]:
                - strong [ref=e210]: AI coding assistant support
                - text: — how the package integrates with AI coding tools (Cursor, Claude Code, GitHub Copilot, Gemini, Windsurf, and others) through agent standards files and machine-readable context documents.
            - separator [ref=e211]
            - generic [ref=e212]:
              - heading "AI Library Integrations" [level=2] [ref=e213]
              - link "Section titled “AI Library Integrations”" [ref=e214] [cursor=pointer]:
                - /url: "#ai-library-integrations"
                - img [ref=e216]
                - generic [ref=e218]: Section titled “AI Library Integrations”
            - paragraph [ref=e219]:
              - text: Enable rules for AI and agent libraries through the
              - code [ref=e220]: libraries
              - text: option.
            - figure "eslint.config.mjs" [ref=e222]:
              - generic [ref=e224]: eslint.config.mjs
              - region [ref=e225]:
                - code [ref=e226]:
                  - generic [ref=e228]: "import { defineConfig, Library } from '@santi020k/eslint-config-basic'"
                  - generic [ref=e232]: "export default await defineConfig({"
                  - generic [ref=e234]: "libraries: ["
                  - generic [ref=e237]: Library.AiSdk,
                  - generic [ref=e239]: Library.OpenAiAgents,
                  - generic [ref=e241]: Library.Mastra,
                  - generic [ref=e243]: Library.Mcp,
                  - generic [ref=e245]: Library.Langchain,
                  - generic [ref=e247]: Library.LlamaIndex
                  - generic [ref=e249]: "]"
                  - generic [ref=e252]: "})"
              - button "Copy to clipboard" [ref=e254] [cursor=pointer]
            - paragraph [ref=e256]:
              - text: All AI library integrations are
              - strong [ref=e257]: auto-detected
              - text: from
              - code [ref=e258]: package.json
              - text: dependencies, so no explicit option is needed when the package is already installed.
            - generic [ref=e259]:
              - heading "Supported AI Libraries" [level=3] [ref=e260]
              - link "Section titled “Supported AI Libraries”" [ref=e261] [cursor=pointer]:
                - /url: "#supported-ai-libraries"
                - img [ref=e263]
                - generic [ref=e265]: Section titled “Supported AI Libraries”
            - paragraph [ref=e266]:
              - text: "| Integration | Enum | Package Signals | Auto-Detected | | :--- | :--- | :--- | :--- | | Vercel AI SDK |"
              - code [ref=e267]: Library.AiSdk
              - text: "|"
              - code [ref=e268]: ai
              - text: ","
              - code [ref=e269]: "@ai-sdk/*"
              - text: "| Yes | | OpenAI Agents SDK |"
              - code [ref=e270]: Library.OpenAiAgents
              - text: "|"
              - code [ref=e271]: "@openai/agents"
              - text: "| Yes | | Mastra |"
              - code [ref=e272]: Library.Mastra
              - text: "|"
              - code [ref=e273]: "@mastra/*"
              - text: ","
              - code [ref=e274]: mastra
              - text: "| Yes | | Model Context Protocol |"
              - code [ref=e275]: Library.Mcp
              - text: "|"
              - code [ref=e276]: "@modelcontextprotocol/sdk"
              - text: "| Yes | | LangChain |"
              - code [ref=e277]: Library.Langchain
              - text: "|"
              - code [ref=e278]: langchain
              - text: ","
              - code [ref=e279]: "@langchain/*"
              - text: "| Yes | | LlamaIndex |"
              - code [ref=e280]: Library.LlamaIndex
              - text: "|"
              - code [ref=e281]: llamaindex
              - text: ","
              - code [ref=e282]: "@llamaindex/*"
              - text: "| Yes |"
            - generic [ref=e283]:
              - heading "What Each Integration Covers" [level=3] [ref=e284]
              - link "Section titled “What Each Integration Covers”" [ref=e285] [cursor=pointer]:
                - /url: "#what-each-integration-covers"
                - img [ref=e287]
                - generic [ref=e289]: Section titled “What Each Integration Covers”
            - generic [ref=e290]:
              - heading "Vercel AI SDK (Library.AiSdk)" [level=4] [ref=e291]:
                - text: Vercel AI SDK (
                - code [ref=e292]: Library.AiSdk
                - text: )
              - link "Section titled “Vercel AI SDK (Library.AiSdk)”" [ref=e293] [cursor=pointer]:
                - /url: "#vercel-ai-sdk-libraryaisdk"
                - img [ref=e295]
                - generic [ref=e297]: Section titled “Vercel AI SDK (Library.AiSdk)”
            - paragraph [ref=e298]: "Adds security-focused rules for AI SDK call patterns:"
            - list [ref=e299]:
              - listitem [ref=e300]:
                - text: Requires abort signals on long-running
                - code [ref=e301]: generateText
                - text: and
                - code [ref=e302]: streamText
                - text: calls.
              - listitem [ref=e303]: Flags unsafe prompt handling and missing output validation.
              - listitem [ref=e304]: Warns on missing token limits to prevent runaway inference costs.
              - listitem [ref=e305]: Enforces consistent use of typed tool definitions.
            - generic [ref=e306]:
              - heading "OpenAI Agents SDK (Library.OpenAiAgents)" [level=4] [ref=e307]:
                - text: OpenAI Agents SDK (
                - code [ref=e308]: Library.OpenAiAgents
                - text: )
              - link "Section titled “OpenAI Agents SDK (Library.OpenAiAgents)”" [ref=e309] [cursor=pointer]:
                - /url: "#openai-agents-sdk-libraryopenaiagents"
                - img [ref=e311]
                - generic [ref=e313]: Section titled “OpenAI Agents SDK (Library.OpenAiAgents)”
            - paragraph [ref=e314]:
              - text: Keeps
              - code [ref=e315]: "@openai/agents"
              - text: "imports on documented public entry points:"
            - list [ref=e316]:
              - listitem [ref=e317]:
                - text: Blocks imports from
                - code [ref=e318]: "@openai/agents/src/*"
                - text: or distribution internals.
              - listitem [ref=e319]: Prevents direct access to unstable submodule paths.
            - generic [ref=e320]:
              - heading "Mastra (Library.Mastra)" [level=4] [ref=e321]:
                - text: Mastra (
                - code [ref=e322]: Library.Mastra
                - text: )
              - link "Section titled “Mastra (Library.Mastra)”" [ref=e323] [cursor=pointer]:
                - /url: "#mastra-librarymastra"
                - img [ref=e325]
                - generic [ref=e327]: Section titled “Mastra (Library.Mastra)”
            - paragraph [ref=e328]: "Enforces clean import boundaries for Mastra agent, workflow, tool, and memory APIs:"
            - list [ref=e329]:
              - listitem [ref=e330]: Blocks internal subpath imports that may change across releases.
              - listitem [ref=e331]: Keeps agent, workflow, and memory integrations on their documented entry points.
            - generic [ref=e332]:
              - heading "Model Context Protocol (Library.Mcp)" [level=4] [ref=e333]:
                - text: Model Context Protocol (
                - code [ref=e334]: Library.Mcp
                - text: )
              - link "Section titled “Model Context Protocol (Library.Mcp)”" [ref=e335] [cursor=pointer]:
                - /url: "#model-context-protocol-librarymcp"
                - img [ref=e337]
                - generic [ref=e339]: Section titled “Model Context Protocol (Library.Mcp)”
            - paragraph [ref=e340]:
              - text: Guards the
              - code [ref=e341]: "@modelcontextprotocol/sdk"
              - text: "package surface:"
            - list [ref=e342]:
              - listitem [ref=e343]: Prevents imports from internal SDK modules.
              - listitem [ref=e344]: Keeps MCP server and client code on stable documented APIs.
            - generic [ref=e345]:
              - heading "LangChain (Library.Langchain)" [level=4] [ref=e346]:
                - text: LangChain (
                - code [ref=e347]: Library.Langchain
                - text: )
              - link "Section titled “LangChain (Library.Langchain)”" [ref=e348] [cursor=pointer]:
                - /url: "#langchain-librarylangchain"
                - img [ref=e350]
                - generic [ref=e352]: Section titled “LangChain (Library.Langchain)”
            - paragraph [ref=e353]:
              - text: Enforces public API usage for
              - code [ref=e354]: langchain
              - text: and
              - code [ref=e355]: "@langchain/*"
              - text: ":"
            - list [ref=e356]:
              - listitem [ref=e357]:
                - text: Blocks imports from
                - code [ref=e358]: langchain/src/*
                - text: or distribution internals.
              - listitem [ref=e359]: Ensures chains, agents, and retrievers import from documented entry points.
            - generic [ref=e360]:
              - heading "LlamaIndex (Library.LlamaIndex)" [level=4] [ref=e361]:
                - text: LlamaIndex (
                - code [ref=e362]: Library.LlamaIndex
                - text: )
              - link "Section titled “LlamaIndex (Library.LlamaIndex)”" [ref=e363] [cursor=pointer]:
                - /url: "#llamaindex-libraryllamaindex"
                - img [ref=e365]
                - generic [ref=e367]: Section titled “LlamaIndex (Library.LlamaIndex)”
            - paragraph [ref=e368]:
              - text: Protects public API boundaries for
              - code [ref=e369]: llamaindex
              - text: and
              - code [ref=e370]: "@llamaindex/*"
              - text: ":"
            - list [ref=e371]:
              - listitem [ref=e372]: Blocks imports from unstable internal module paths.
              - listitem [ref=e373]: Keeps indexes, retrievers, and query engines on documented exports.
            - separator [ref=e374]
            - generic [ref=e375]:
              - heading "AI Coding Assistant Support" [level=2] [ref=e376]
              - link "Section titled “AI Coding Assistant Support”" [ref=e377] [cursor=pointer]:
                - /url: "#ai-coding-assistant-support"
                - img [ref=e379]
                - generic [ref=e381]: Section titled “AI Coding Assistant Support”
            - paragraph [ref=e382]: "This package ships two types of AI-focused artifacts that help coding assistants understand and maintain the project:"
            - list [ref=e383]:
              - listitem [ref=e384]:
                - strong [ref=e385]: Machine-readable context files
                - text: (
                - code [ref=e386]: llms.txt
                - text: ","
                - code [ref=e387]: llms-full.txt
                - text: ) — static documents at the repository root that AI tools can read to understand the project architecture.
              - listitem [ref=e388]:
                - strong [ref=e389]: Generated agent standards
                - text: — tool-specific rule files created from your active ESLint config by the
                - code [ref=e390]: generate-skill
                - text: CLI command.
            - generic [ref=e391]:
              - heading "Machine-Readable Context Files" [level=3] [ref=e392]
              - link "Section titled “Machine-Readable Context Files”" [ref=e393] [cursor=pointer]:
                - /url: "#machine-readable-context-files"
                - img [ref=e395]
                - generic [ref=e397]: Section titled “Machine-Readable Context Files”
            - paragraph [ref=e398]: "The repository root ships two Markdown files targeted at AI assistants:"
            - paragraph [ref=e399]:
              - text: "| File | Purpose | | :--- | :--- | |"
              - link "llms.txt" [ref=e400] [cursor=pointer]:
                - /url: https://github.com/santi020k/eslint-config-basic/blob/main/llms.txt
                - code [ref=e401]: llms.txt
              - text: "| Quick project overview, architecture summary, commands, and integration list. | |"
              - link "llms-full.txt" [ref=e402] [cursor=pointer]:
                - /url: https://github.com/santi020k/eslint-config-basic/blob/main/llms-full.txt
                - code [ref=e403]: llms-full.txt
              - text: "| Deep technical context: dependency graph, technical decisions, virtual file patterns, and development workflows. |"
            - paragraph [ref=e404]:
              - text: These files follow the emerging
              - link "llms.txt standard" [ref=e405] [cursor=pointer]:
                - /url: https://llmstxt.org/
                - code [ref=e406]: llms.txt
                - text: standard
              - text: and are intended for use with AI assistants and code completion tools that support project-level context injection.
            - generic [ref=e407]:
              - heading "Generating Agent Standards" [level=3] [ref=e408]
              - link "Section titled “Generating Agent Standards”" [ref=e409] [cursor=pointer]:
                - /url: "#generating-agent-standards"
                - img [ref=e411]
                - generic [ref=e413]: Section titled “Generating Agent Standards”
            - paragraph [ref=e414]:
              - text: The
              - code [ref=e415]: generate-skill
              - text: CLI command reads your active ESLint configuration and writes tool-specific standards files so AI coding assistants know what rules your project enforces.
            - list [ref=e416]:
              - listitem [ref=e417]:
                - paragraph [ref=e418]:
                  - strong [ref=e419]: Run the command once
                  - text: "to generate or update standards files for all detected AI tools:"
                - generic [ref=e420]:
                  - tablist [ref=e422]:
                    - tab "pnpm" [selected] [ref=e423] [cursor=pointer]
                    - tab "npm" [ref=e424] [cursor=pointer]
                    - tab "yarn" [ref=e425] [cursor=pointer]
                    - tab "bun" [ref=e426] [cursor=pointer]
                  - tabpanel "pnpm" [ref=e427]:
                    - figure "Terminal window" [ref=e429]:
                      - generic [ref=e431]: Terminal window
                      - code [ref=e433]:
                        - generic [ref=e435]: pnpm dlx @santi020k/eslint-config-basic generate-skill
                      - button "Copy to clipboard" [ref=e437] [cursor=pointer]
              - listitem [ref=e439]:
                - paragraph [ref=e440]:
                  - strong [ref=e441]: Commit the generated files
                  - text: alongside your ESLint config. They are stored in tool-specific folders that each assistant already reads.
              - listitem [ref=e442]:
                - paragraph [ref=e443]:
                  - strong [ref=e444]: Keep them fresh
                  - text: — re-run after changing your ESLint config, or use
                  - code [ref=e445]: "--check"
                  - text: in CI to catch stale files automatically.
            - blockquote [ref=e446]:
              - paragraph [ref=e447]:
                - text: "[!NOTE]"
                - code [ref=e448]: generate-skill
                - text: only writes to folders that already exist. It never creates tool folders for tools you do not use. Use
                - code [ref=e449]: "--create"
                - text: to scaffold a root
                - code [ref=e450]: AGENTS.md
                - text: when the project has none.
            - generic [ref=e451]:
              - heading "Supported AI Tools" [level=3] [ref=e452]
              - link "Section titled “Supported AI Tools”" [ref=e453] [cursor=pointer]:
                - /url: "#supported-ai-tools"
                - img [ref=e455]
                - generic [ref=e457]: Section titled “Supported AI Tools”
            - paragraph [ref=e458]:
              - text: "| Tool | Standards File Location | Format | | :--- | :--- | :--- | | Claude Code |"
              - code [ref=e459]: .claude/commands/
              - text: "| Markdown | | Cursor |"
              - code [ref=e460]: .cursor/rules/
              - text: "| MDC front-matter | | GitHub Copilot |"
              - code [ref=e461]: .copilot/instructions/
              - text: ","
              - code [ref=e462]: .github/copilot-instructions.md
              - text: "| Markdown / guarded section | | Gemini |"
              - code [ref=e463]: .gemini/styleguide.md
              - text: "| Markdown | | Windsurf |"
              - code [ref=e464]: .windsurf/rules/
              - text: "| Markdown + front-matter | | Cline |"
              - code [ref=e465]: .clinerules/
              - text: "| Markdown | | Roo Code |"
              - code [ref=e466]: .roo/rules/
              - text: "| Markdown | | Kiro |"
              - code [ref=e467]: .kiro/steering/
              - text: "| Markdown +"
              - code [ref=e468]: "inclusion: always"
              - text: front-matter | | Aider |
              - code [ref=e469]: .aider/
              - text: "| Markdown | | Generic agents |"
              - code [ref=e470]: .agent/skills/
              - text: ","
              - code [ref=e471]: .agents/skills/
              - text: "| Markdown + front-matter | | AGENTS.md standard | root"
              - code [ref=e472]: AGENTS.md
              - text: "| Guarded section appended/updated |"
            - generic [ref=e473]:
              - heading "CLI Flags" [level=3] [ref=e474]
              - link "Section titled “CLI Flags”" [ref=e475] [cursor=pointer]:
                - /url: "#cli-flags"
                - img [ref=e477]
                - generic [ref=e479]: Section titled “CLI Flags”
            - paragraph [ref=e480]:
              - text: "| Flag | Behavior | | :--- | :--- | |"
              - emphasis [ref=e481]: (none)
              - text: "| Write or update files for all detected tool folders. | |"
              - code [ref=e482]: "--force"
              - text: "| Overwrite existing files even if they appear up to date. | |"
              - code [ref=e483]: "--check"
              - text: "| CI mode — compare existing files against freshly generated content, exit 1 when any file is stale or missing. | |"
              - code [ref=e484]: "--create"
              - text: "| Scaffold a root"
              - code [ref=e485]: AGENTS.md
              - text: when none exists. |
            - generic [ref=e486]:
              - heading "CI Integration" [level=3] [ref=e487]
              - link "Section titled “CI Integration”" [ref=e488] [cursor=pointer]:
                - /url: "#ci-integration"
                - img [ref=e490]
                - generic [ref=e492]: Section titled “CI Integration”
            - paragraph [ref=e493]:
              - text: Use
              - code [ref=e494]: "--check"
              - text: "as a CI step or pre-push hook to ensure agent standards never drift from the actual config:"
            - figure "CI example" [ref=e496]:
              - generic [ref=e498]: CI example
              - code [ref=e500]:
                - generic [ref=e502]: npx @santi020k/eslint-config-basic generate-skill --check
              - button "Copy to clipboard" [ref=e504] [cursor=pointer]
            - paragraph [ref=e506]:
              - text: This exits with code
              - code [ref=e507]: "1"
              - text: when any standards file is missing or out of date, making stale agent rules a blocking CI failure.
            - generic [ref=e508]:
              - heading "Default Ignored Folders" [level=3] [ref=e509]
              - link "Section titled “Default Ignored Folders”" [ref=e510] [cursor=pointer]:
                - /url: "#default-ignored-folders"
                - img [ref=e512]
                - generic [ref=e514]: Section titled “Default Ignored Folders”
            - paragraph [ref=e515]: "The composed ESLint config automatically ignores AI coding-assistant artifact folders so agent rule files and skill definitions are never linted as source code:"
            - figure [ref=e517]:
              - code [ref=e520]:
                - generic [ref=e522]: .agent .agents .aider* .claude .clinerules .codex
                - generic [ref=e524]: .copilot .cursor .gemini .kiro .opencode .roo
                - generic [ref=e526]: .windsurf
              - button "Copy to clipboard" [ref=e528] [cursor=pointer]
            - paragraph [ref=e530]:
              - text: Disable this block with
              - code [ref=e531]: "settings: [Setting.NoDefaultIgnores]"
              - text: .
            - separator [ref=e532]
            - generic [ref=e533]:
              - heading "Related Pages" [level=2] [ref=e534]
              - link "Section titled “Related Pages”" [ref=e535] [cursor=pointer]:
                - /url: "#related-pages"
                - img [ref=e537]
                - generic [ref=e539]: Section titled “Related Pages”
            - list [ref=e540]:
              - listitem [ref=e541]:
                - link "CLI Reference" [ref=e542] [cursor=pointer]:
                  - /url: /guide/cli
                - text: — full
                - code [ref=e543]: generate-skill
                - text: flag reference and all other CLI commands.
              - listitem [ref=e544]:
                - link "Libraries" [ref=e545] [cursor=pointer]:
                  - /url: /tooling/libraries
                - text: — complete AI library integration reference with ORM and UI library integrations.
              - listitem [ref=e546]:
                - link "Configuration" [ref=e547] [cursor=pointer]:
                  - /url: /guide/configuration
                - text: — full
                - code [ref=e548]: defineConfig()
                - text: option reference.
          - generic [ref=e549]:
            - generic [ref=e550]:
              - link "Edit page" [ref=e551] [cursor=pointer]:
                - /url: https://github.com/santi020k/eslint-config-basic/edit/main/packages/docs/src/content/docs/guide/ai-agents.mdx
                - img [ref=e552]
                - text: Edit page
              - paragraph [ref=e554]:
                - text: "Last updated:"
                - time [ref=e555]: Jun 11, 2026
            - generic [ref=e556]:
              - link "Previous Monorepo" [ref=e557] [cursor=pointer]:
                - /url: /guide/monorepo/
                - img [ref=e558]
                - generic [ref=e560]:
                  - text: Previous
                  - text: Monorepo
              - link "Next Migrate from v1" [ref=e561] [cursor=pointer]:
                - /url: /guide/migration-v1-to-v2/
                - img [ref=e562]
                - generic [ref=e564]:
                  - text: Next
                  - text: Migrate from v1
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