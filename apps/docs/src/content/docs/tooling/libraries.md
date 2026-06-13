---
title: "Libraries"
description: "The libraries option enables integrations that usually correspond to major project dependencies."
---

The `libraries` option enables integrations that usually correspond to major project dependencies.

| Integration | Enum | Use It When | Auto-Detected |
| :--- | :--- | :--- | :--- |
| AI SDK | `Library.AiSdk` | The project uses Vercel AI SDK or provider packages such as `ai` / `@ai-sdk/openai`. | Yes |
| OpenAI Agents SDK | `Library.OpenAiAgents` | The project uses OpenAI's TypeScript Agents SDK. | Yes |
| Mastra | `Library.Mastra` | The project uses Mastra agents, workflows, tools, or memory. | Yes |
| Model Context Protocol | `Library.Mcp` | The project uses the MCP TypeScript SDK. | Yes |
| LangChain | `Library.Langchain` | The project uses LangChain.js (`langchain` or `@langchain/*` packages). | Yes |
| LlamaIndex | `Library.LlamaIndex` | The project uses LlamaIndex.TS (`llamaindex` or `@llamaindex/*` packages). | Yes |
| Google Gen AI | `Library.GoogleGenAi` | The project uses the official Google Gen AI SDK. | Yes |
| AutoGen | `Library.Autogen` | The project uses Microsoft AutoGen (`@microsoft/autogen*` packages). | Yes |
| Turborepo | `Library.Turbo` | The project uses Turborepo. | Yes |
| Zod | `Library.Zod` | The project uses Zod schema validation. | Yes |
| TypeORM | `Library.Typeorm` | The project uses TypeORM entities, repositories, data sources, subscribers, or migrations. | Yes |
| Prisma | `Library.Prisma` | The project uses Prisma Client or Prisma CLI. | Yes |
| Drizzle ORM | `Library.Drizzle` | The project uses Drizzle ORM schemas, queries, or migrations. | Yes |
| MikroORM | `Library.MikroOrm` | The project uses MikroORM entities, repositories, or migrations. | Yes |
| Sequelize | `Library.Sequelize` | The project uses Sequelize models, repositories, or migrations. | Yes |
| Tailwind CSS | `Library.Tailwind` | The project uses Tailwind CSS. | Yes |
| I18next | `Library.I18next` | The project uses I18next. | Yes |
| Stencil | `Library.Stencil` | The project uses Stencil. | Yes |
| TanStack Query | `Library.TanstackQuery` | The project uses TanStack Query. | Yes |
| TanStack Router | `Library.TanstackRouter` | The project uses TanStack Router. | Yes |
| Storybook | `Library.Storybook` | The project uses Storybook. | Yes |

## Example

```js
import { defineConfig, Library } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  libraries: [Library.AiSdk, Library.OpenAiAgents, Library.Mastra, Library.Mcp, Library.Typeorm, Library.Prisma, Library.Tailwind, Library.Storybook]
})
```

## Notes

- The library integrations stay optional, so projects only install and enable what they use.
- Detection helps the CLI and zero-argument config path, but you can still choose the final composition explicitly.

## AI and Agent Tooling

`Library.AiSdk` enables security-focused rules for Vercel AI SDK calls such as `generateText`, `streamText`, tool definitions, output validation, token limits, abort signals, and unsafe prompt handling.

`Library.OpenAiAgents` adds import safety rules for `@openai/agents` projects so agent workflows use the dedicated SDK package and avoid source or distribution internals.

`Library.Mastra` adds import safety rules for Mastra projects so agents, workflows, tools, and memory integrations stay on documented package entry points.

`Library.Mcp` adds import safety rules for `@modelcontextprotocol/sdk` projects so MCP servers and clients use documented SDK entry points instead of package internals.

`Library.Langchain` adds import safety rules for LangChain.js projects so chains, agents, and retrievers import from documented `langchain` and `@langchain/*` entry points instead of source or distribution internals.

`Library.LlamaIndex` adds import safety rules for LlamaIndex.TS projects so indexes, retrievers, and query engines import from documented `llamaindex` and `@llamaindex/*` entry points instead of package internals.

`Library.GoogleGenAi` adds import safety rules for `@google/genai` projects to ensure proper module imports.

`Library.Autogen` adds import safety rules for Microsoft AutoGen projects.

`Library.Turbo` validates that environment variables used in source code are properly declared in your Turborepo `turbo.json` configuration.

`Library.Zod` enables Zod-specific rules for robust schema validation patterns.

## ORM Integrations

The ORM integrations are dependency-free ESLint flat configs. They use stable core rules instead of loading ORM-specific plugins, because several ORM ESLint plugins are either unavailable, not maintained for ESLint 10 flat config, or too framework-specific for a shared base preset.

### TypeORM

`Library.Typeorm` catches legacy TypeORM global helpers such as `getRepository` and `getConnection`, nudging code toward `DataSource`, `EntityManager`, or injected `Repository` instances. It also blocks TypeORM subpath imports so entities and migrations stay on the documented `typeorm` entry point.

```js
import { defineConfig, Library } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  libraries: [Library.Typeorm],
  tsconfigRootDir: import.meta.dirname
})
```

### Prisma

`Library.Prisma` blocks imports from generated runtime internals such as `@prisma/client/runtime/*` and `.prisma/client/*`. Application code should import Prisma Client APIs from `@prisma/client`.

### Drizzle ORM

`Library.Drizzle` protects public driver, schema, migration, and query APIs by rejecting internal session, migrator, and query-builder module imports.

### MikroORM

`Library.MikroOrm` blocks imports from unstable `@mikro-orm/core` internals such as entity, platform, unit-of-work, and utility submodules.

### Sequelize

`Library.Sequelize` blocks `sequelize/lib/*`, `sequelize/types/*`, and non-semver internal `@sequelize/core` modules so applications use the public Sequelize package surface.

## Tailwind CSS Performance (v4)

Tailwind CSS v4 uses a heavy initialization process in its worker threads. In monorepos or complex projects, this can cause ESLint to time out with an error like `Atomics.wait() failed: timed-out`.

To fix this, it is highly recommended to provide an explicit `entryPoint` in your ESLint settings. This prevents the plugin from searching your entire workspace for a Tailwind configuration.

### How to configure

You can pass the `entryPoint` by appending a configuration object to the array returned by `eslintConfig`:

```js
import { Library } from '@santi020k/eslint-config-basic'

export default [
  ...eslintConfig({
    libraries: [Library.Tailwind]
  }),
  {
    name: 'project/tailwind-settings',
    settings: {
      'better-tailwindcss': {
        // Point this to your main CSS file (v4) or tailwind.config.js (v3)
        entryPoint: './src/index.css'
      }
    }
  }
]
```

> [!TIP]
> If you are still experiencing timeouts after setting the `entryPoint`, you can increase the internal worker timeout by setting the `SYNCKIT_TIMEOUT` environment variable (e.g., `SYNCKIT_TIMEOUT=60000 eslint .`).

## Repository Examples

- Library Playgrounds: [packages/playground/libraries](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/libraries)
- Integrations Package Source: [packages/integrations](https://github.com/santi020k/eslint-config-basic/tree/main/packages/integrations)
