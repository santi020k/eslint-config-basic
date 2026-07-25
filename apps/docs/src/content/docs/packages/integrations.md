---
title: "Integrations Package"
description: "Package: @santi020k/eslint-config-integrations"
---

Package: [`@santi020k/eslint-config-integrations`](https://www.npmjs.com/package/@santi020k/eslint-config-integrations)

This package contains the integrations consumed by the main package through the `libraries`, `testing`, `formats`, `tools`, and `extensions` options.

Plugin implementations are installed with this package. Host libraries such as Tailwind, Zod, GraphQL, Storybook, and Oxlint are optional peers because integrations are only enabled when the consuming project uses them. Install the corresponding host library before enabling one of those integrations explicitly.

## Categories

- Libraries: AI SDK, OpenAI Agents SDK, Mastra, MCP, LangChain, LlamaIndex, Google Gen AI, AutoGen, Tailwind, I18next, Storybook, Stencil, TanStack Query, TanStack Router, TypeORM, Prisma, Drizzle, MikroORM, Sequelize, and Zod.
- Testing: Vitest, Jest, Cypress, Playwright, Testing Library.
- Formats: Markdown, MDX, JSONC, YAML, TOML, GraphQL.
- Tools: Prettier, CSpell, JSDoc (with TSDoc), Swagger.
- Extensions: RegExp, Unicorn, SonarJS, Security, Perfectionist, BestPractices, A11y, Biome.

## How to Use It

Most projects use the main package and enable integrations through enums rather than importing `@santi020k/eslint-config-integrations` directly.

```js
import { defineConfig, Extension, Library, Testing, Tool } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  extensions: [Extension.Unicorn],
  libraries: [Library.Tailwind],
  testing: [Testing.Vitest],
  tools: [Tool.Prettier]
})
```

## Repository Links

- Source Package: [packages/integrations](https://github.com/santi020k/eslint-config-basic/tree/main/packages/integrations)
- Playground Root: [packages/playground](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground)

## Related Pages

- [Basic Package](/packages/basic)
- [Integrations Overview](/tooling/overview)
- [Libraries](/tooling/libraries)
- [Testing](/tooling/testing)
- [Formats](/tooling/formats)
- [Tools](/tooling/tools)
- [Extensions](/tooling/extensions)
