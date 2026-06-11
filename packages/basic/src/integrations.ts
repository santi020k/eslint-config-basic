import {
  Extension,
  type FlatConfigArray,
  Format,
  Library,
  Testing,
  Tool
} from '@santi020k/eslint-config-core'
import {
  a11y,
  aiSdk,
  autogen,
  bestPractices,
  biome,
  command,
  cspell,
  cypress,
  docker,
  drizzle,
  githubActions,
  googleGenAi,
  graphql,
  i18next,
  jest,
  jestDom,
  jsdoc,
  jsonc,
  langchain,
  llamaIndex,
  markdown,
  mastra,
  mcp,
  mdx,
  mikroOrm,
  nx,
  openAiAgents,
  packageJson,
  perfectionist,
  playwright,
  prettier,
  prisma,
  regexp,
  security,
  sequelize,
  sonarjs,
  stencil,
  storybook,
  swagger,
  tailwind,
  tanstackQuery,
  tanstackRouter,
  testingLibrary,
  toml,
  turbo,
  typeorm,
  unicorn,
  vitest,
  yaml,
  zod
} from '@santi020k/eslint-config-integrations'

/**
 * Gets integration configs based on selected options.
 * This function maintains the recommended ordering (e.g. Prettier last).
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

  if (libraries.includes(Library.Turbo)) configs.push(...turbo())

  // Testing
  if (testing.includes(Testing.Vitest)) configs.push(...await vitest())

  if (testing.includes(Testing.Playwright)) configs.push(...await playwright())

  if (testing.includes(Testing.Jest)) configs.push(...await jest())

  if (testing.includes(Testing.JestDom)) configs.push(...await jestDom())

  if (testing.includes(Testing.Cypress)) configs.push(...await cypress())

  if (testing.includes(Testing.TestingLibrary)) configs.push(...await testingLibrary())

  // Formats
  if (formats.includes(Format.Mdx)) configs.push(...await mdx())

  if (formats.includes(Format.Markdown)) configs.push(...await markdown())

  if (formats.includes(Format.PackageJson)) configs.push(...await packageJson())

  if (formats.includes(Format.Jsonc)) configs.push(...await jsonc())

  if (formats.includes(Format.Yaml)) configs.push(...await yaml())

  if (formats.includes(Format.Toml)) configs.push(...await toml())

  if (formats.includes(Format.Graphql)) configs.push(...await graphql())

  // Extensions
  if (extensions.includes(Extension.A11y)) configs.push(...a11y)

  if (extensions.includes(Extension.Biome)) configs.push(...biome)

  if (extensions.includes(Extension.BestPractices)) configs.push(...bestPractices)

  if (extensions.includes(Extension.Regexp)) configs.push(...await regexp())

  if (extensions.includes(Extension.Unicorn)) configs.push(...await unicorn())

  if (extensions.includes(Extension.Sonarjs)) configs.push(...await sonarjs())

  if (extensions.includes(Extension.Security)) configs.push(...await security())

  if (extensions.includes(Extension.Perfectionist)) configs.push(...await perfectionist())

  // Standalone tools
  if (tools.includes(Tool.Command)) configs.push(...await command())

  if (tools.includes(Tool.GithubActions)) configs.push(...await githubActions())

  if (tools.includes(Tool.Docker)) configs.push(...await docker())

  if (tools.includes(Tool.Nx)) configs.push(...await nx())

  if (tools.includes(Tool.Jsdoc)) configs.push(...await jsdoc())

  if (tools.includes(Tool.Swagger)) configs.push(...await swagger())

  return configs
}

/**
 * Returns the Prettier configuration if selected.
 */
export const getPrettierConfig = async (tools: Tool[]): Promise<FlatConfigArray> => tools.includes(Tool.Prettier) ? await prettier() : []
