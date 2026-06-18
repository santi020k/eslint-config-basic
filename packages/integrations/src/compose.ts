import {
  Extension,
  type FlatConfigArray,
  Format,
  Library,
  Testing,
  Tool
} from '@santi020k/eslint-config-core'

import { a11y } from './extensions/a11y.js'
import { bestPractices } from './extensions/best-practices.js'
import { biome } from './extensions/biome.js'
import { boundaries } from './extensions/boundaries.js'
import { compat } from './extensions/compat.js'
import { deMorgan } from './extensions/de-morgan.js'
import { depend } from './extensions/depend.js'
import { noOnlyTests } from './extensions/no-only-tests.js'
import { node } from './extensions/node.js'
import { oxlint } from './extensions/oxlint.js'
import { perfectionist } from './extensions/perfectionist.js'
import { regexp } from './extensions/regexp.js'
import { security } from './extensions/security.js'
import { sonarjs } from './extensions/sonarjs.js'
import { unicorn } from './extensions/unicorn.js'
import { css } from './formats/css.js'
import { graphql } from './formats/graphql.js'
import { html } from './formats/html.js'
import { jsonc } from './formats/jsonc.js'
import { markdown } from './formats/markdown.js'
import { mdx } from './formats/mdx.js'
import { packageJson } from './formats/package-json.js'
import { toml } from './formats/toml.js'
import { yaml } from './formats/yaml.js'
import { aiSdk } from './libraries/ai.js'
import { autogen } from './libraries/autogen.js'
import { googleGenAi } from './libraries/google-genai.js'
import { i18next } from './libraries/i18next.js'
import { langchain } from './libraries/langchain.js'
import { llamaIndex } from './libraries/llamaindex.js'
import { mastra } from './libraries/mastra.js'
import { mcp } from './libraries/mcp.js'
import { openAiAgents } from './libraries/openai-agents.js'
import { drizzle, mikroOrm, prisma, sequelize, typeorm } from './libraries/orm.js'
import { stencil } from './libraries/stencil.js'
import { storybook } from './libraries/storybook.js'
import { tailwind } from './libraries/tailwind.js'
import { tanstackQuery, tanstackRouter } from './libraries/tanstack.js'
import { turbo } from './libraries/turbo.js'
import { zod } from './libraries/zod.js'
import { cypress } from './testing/cypress.js'
import { jest } from './testing/jest.js'
import { jestDom } from './testing/jest-dom.js'
import { playwright } from './testing/playwright.js'
import { testingLibrary } from './testing/testing-library.js'
import { vitest } from './testing/vitest.js'
import { command } from './tools/command.js'
import { cspell } from './tools/cspell.js'
import { docker } from './tools/docker.js'
import { githubActions } from './tools/github-actions.js'
import { jsdoc } from './tools/jsdoc.js'
import { nx } from './tools/nx.js'
import { pnpm } from './tools/pnpm.js'
import { prettier } from './tools/prettier.js'
import { swagger } from './tools/swagger.js'

const addIf = async (
  flag: boolean,
  loader: () => FlatConfigArray | Promise<FlatConfigArray>
): Promise<FlatConfigArray> => flag ? loader() : []

/**
 * Gets integration configs based on selected options.
 * This function maintains the recommended ordering (e.g. Prettier last).
 * @param libraries - List of libraries to configure
 * @param tools - List of tools to configure
 * @param testing - List of testing frameworks to configure
 * @param formats - List of file formats to configure
 * @param extensions - List of extensions to configure
 * @returns The resolved flat configurations
 */
export const getIntegrationConfigs = async (
  libraries: Library[],
  tools: Tool[],
  testing: Testing[],
  formats: Format[],
  extensions: Extension[]
): Promise<FlatConfigArray> => (await Promise.all([
  // Tools (Except Prettier which goes last)
  addIf(tools.includes(Tool.Cspell), cspell),
  // Libraries
  addIf(libraries.includes(Library.AiSdk), aiSdk),
  addIf(libraries.includes(Library.Mcp), () => mcp()),
  addIf(libraries.includes(Library.Mastra), () => mastra()),
  addIf(libraries.includes(Library.OpenAiAgents), () => openAiAgents()),
  addIf(libraries.includes(Library.GoogleGenAi), () => googleGenAi()),
  addIf(libraries.includes(Library.Autogen), () => autogen()),
  addIf(libraries.includes(Library.Langchain), () => langchain()),
  addIf(libraries.includes(Library.LlamaIndex), () => llamaIndex()),
  addIf(libraries.includes(Library.Typeorm), () => typeorm()),
  addIf(libraries.includes(Library.Prisma), () => prisma()),
  addIf(libraries.includes(Library.Drizzle), () => drizzle()),
  addIf(libraries.includes(Library.MikroOrm), () => mikroOrm()),
  addIf(libraries.includes(Library.Sequelize), () => sequelize()),
  addIf(libraries.includes(Library.Tailwind), tailwind),
  addIf(libraries.includes(Library.I18next), i18next),
  addIf(libraries.includes(Library.Stencil), stencil),
  addIf(libraries.includes(Library.TanstackQuery), tanstackQuery),
  addIf(libraries.includes(Library.TanstackRouter), tanstackRouter),
  addIf(libraries.includes(Library.Storybook), storybook),
  addIf(libraries.includes(Library.Zod), zod),
  addIf(libraries.includes(Library.Turbo), turbo),
  // Testing
  addIf(testing.includes(Testing.Vitest), vitest),
  addIf(testing.includes(Testing.Playwright), playwright),
  addIf(testing.includes(Testing.Jest), jest),
  addIf(testing.includes(Testing.JestDom), jestDom),
  addIf(testing.includes(Testing.Cypress), cypress),
  addIf(testing.includes(Testing.TestingLibrary), testingLibrary),
  // Formats
  addIf(formats.includes(Format.Css), css),
  addIf(formats.includes(Format.Html), html),
  addIf(formats.includes(Format.Mdx), mdx),
  addIf(formats.includes(Format.Markdown), markdown),
  addIf(formats.includes(Format.PackageJson), packageJson),
  addIf(formats.includes(Format.Jsonc), jsonc),
  addIf(formats.includes(Format.Yaml), yaml),
  addIf(formats.includes(Format.Toml), toml),
  addIf(formats.includes(Format.Graphql), graphql),
  // Extensions
  addIf(extensions.includes(Extension.A11y), a11y),
  addIf(extensions.includes(Extension.Biome), biome),
  addIf(extensions.includes(Extension.Boundaries), () => boundaries),
  addIf(extensions.includes(Extension.BestPractices), () => bestPractices),
  addIf(extensions.includes(Extension.Regexp), regexp),
  addIf(extensions.includes(Extension.Unicorn), unicorn),
  addIf(extensions.includes(Extension.Sonarjs), sonarjs),
  addIf(extensions.includes(Extension.Security), security),
  addIf(extensions.includes(Extension.Perfectionist), perfectionist),
  addIf(extensions.includes(Extension.Node), node),
  addIf(extensions.includes(Extension.Compat), compat),
  addIf(extensions.includes(Extension.DeMorgan), deMorgan),
  addIf(extensions.includes(Extension.Depend), depend),
  addIf(extensions.includes(Extension.NoOnlyTests), noOnlyTests),
  // Oxlint goes after other extensions so its rule disables win
  addIf(extensions.includes(Extension.Oxlint), oxlint),
  // Standalone tools
  addIf(tools.includes(Tool.Command), command),
  addIf(tools.includes(Tool.GithubActions), githubActions),
  addIf(tools.includes(Tool.Docker), docker),
  addIf(tools.includes(Tool.Nx), nx),
  addIf(tools.includes(Tool.Pnpm), pnpm),
  addIf(tools.includes(Tool.Jsdoc), jsdoc),
  addIf(tools.includes(Tool.Swagger), swagger)
])).flat()

/**
 * Returns the Prettier configuration if selected.
 * @param tools - The tools to configure
 * @returns The prettier config or an empty array
 */
export const getPrettierConfig = async (tools: Tool[]): Promise<FlatConfigArray> => tools.includes(Tool.Prettier) ? await prettier() : []
