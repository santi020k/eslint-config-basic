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
import { compat } from './extensions/compat.js'
import { deMorgan } from './extensions/de-morgan.js'
import { depend } from './extensions/depend.js'
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
): Promise<FlatConfigArray> => {
  const configs: FlatConfigArray = []

  // Tools (Except Prettier which goes last)
  if (tools.includes(Tool.Cspell)) configs.push(...await cspell())

  // Libraries
  if (libraries.includes(Library.AiSdk)) configs.push(...await aiSdk())

  if (libraries.includes(Library.Mcp)) configs.push(...mcp())

  if (libraries.includes(Library.Mastra)) configs.push(...mastra())

  if (libraries.includes(Library.OpenAiAgents)) configs.push(...openAiAgents())

  if (libraries.includes(Library.GoogleGenAi)) configs.push(...googleGenAi())

  if (libraries.includes(Library.Autogen)) configs.push(...autogen())

  if (libraries.includes(Library.Langchain)) configs.push(...langchain())

  if (libraries.includes(Library.LlamaIndex)) configs.push(...llamaIndex())

  if (libraries.includes(Library.Typeorm)) configs.push(...typeorm())

  if (libraries.includes(Library.Prisma)) configs.push(...prisma())

  if (libraries.includes(Library.Drizzle)) configs.push(...drizzle())

  if (libraries.includes(Library.MikroOrm)) configs.push(...mikroOrm())

  if (libraries.includes(Library.Sequelize)) configs.push(...sequelize())

  if (libraries.includes(Library.Tailwind)) configs.push(...await tailwind())

  if (libraries.includes(Library.I18next)) configs.push(...await i18next())

  if (libraries.includes(Library.Stencil)) configs.push(...await stencil())

  if (libraries.includes(Library.TanstackQuery)) configs.push(...await tanstackQuery())

  if (libraries.includes(Library.TanstackRouter)) configs.push(...await tanstackRouter())

  if (libraries.includes(Library.Storybook)) configs.push(...await storybook())

  if (libraries.includes(Library.Zod)) configs.push(...await zod())

  if (libraries.includes(Library.Turbo)) configs.push(...await turbo())

  // Testing
  if (testing.includes(Testing.Vitest)) configs.push(...await vitest())

  if (testing.includes(Testing.Playwright)) configs.push(...await playwright())

  if (testing.includes(Testing.Jest)) configs.push(...await jest())

  if (testing.includes(Testing.JestDom)) configs.push(...await jestDom())

  if (testing.includes(Testing.Cypress)) configs.push(...await cypress())

  if (testing.includes(Testing.TestingLibrary)) configs.push(...await testingLibrary())

  // Formats
  if (formats.includes(Format.Css)) configs.push(...await css())

  if (formats.includes(Format.Html)) configs.push(...await html())

  if (formats.includes(Format.Mdx)) configs.push(...await mdx())

  if (formats.includes(Format.Markdown)) configs.push(...await markdown())

  if (formats.includes(Format.PackageJson)) configs.push(...await packageJson())

  if (formats.includes(Format.Jsonc)) configs.push(...await jsonc())

  if (formats.includes(Format.Yaml)) configs.push(...await yaml())

  if (formats.includes(Format.Toml)) configs.push(...await toml())

  if (formats.includes(Format.Graphql)) configs.push(...await graphql())

  // Extensions
  if (extensions.includes(Extension.A11y)) configs.push(...await a11y())

  if (extensions.includes(Extension.Biome)) configs.push(...await biome())

  if (extensions.includes(Extension.BestPractices)) configs.push(...bestPractices)

  if (extensions.includes(Extension.Regexp)) configs.push(...await regexp())

  if (extensions.includes(Extension.Unicorn)) configs.push(...await unicorn())

  if (extensions.includes(Extension.Sonarjs)) configs.push(...await sonarjs())

  if (extensions.includes(Extension.Security)) configs.push(...await security())

  if (extensions.includes(Extension.Perfectionist)) configs.push(...await perfectionist())

  if (extensions.includes(Extension.Node)) configs.push(...await node())

  if (extensions.includes(Extension.Compat)) configs.push(...await compat())

  if (extensions.includes(Extension.DeMorgan)) configs.push(...await deMorgan())

  if (extensions.includes(Extension.Depend)) configs.push(...await depend())

  // Oxlint goes after other extensions so its rule disables win
  if (extensions.includes(Extension.Oxlint)) configs.push(...await oxlint())

  // Standalone tools
  if (tools.includes(Tool.Command)) configs.push(...await command())

  if (tools.includes(Tool.GithubActions)) configs.push(...await githubActions())

  if (tools.includes(Tool.Docker)) configs.push(...await docker())

  if (tools.includes(Tool.Nx)) configs.push(...await nx())

  if (tools.includes(Tool.Pnpm)) configs.push(...await pnpm())

  if (tools.includes(Tool.Jsdoc)) configs.push(...await jsdoc())

  if (tools.includes(Tool.Swagger)) configs.push(...await swagger())

  return configs
}

/**
 * Returns the Prettier configuration if selected.
 * @param tools - The tools to configure
 * @returns The prettier config or an empty array
 */
export const getPrettierConfig = async (tools: Tool[]): Promise<FlatConfigArray> => tools.includes(Tool.Prettier) ? await prettier() : []
