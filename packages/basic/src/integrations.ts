import {
  Extension,
  type FlatConfigArray,
  Format,
  Library,
  Testing,
  Tool
} from '@santi020k/eslint-config-core'
import {
  bestPractices,
  cspell,
  cypress,
  graphql,
  i18next,
  jest,
  jsdoc,
  jsonc,
  markdown,
  mdx,
  perfectionist,
  playwright,
  prettier,
  regexp,
  security,
  sonarjs,
  stencil,
  storybook,
  swagger,
  tailwind,
  tanstackQuery,
  tanstackRouter,
  testingLibrary,
  toml,
  unicorn,
  vitest,
  yaml
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
  if (tools.includes(Tool.Cspell)) configs.push(...await cspell)

  // Libraries
  if (libraries.includes(Library.Tailwind)) configs.push(...await tailwind)

  if (libraries.includes(Library.I18next)) configs.push(...await i18next)

  if (libraries.includes(Library.Stencil)) configs.push(...await stencil)

  if (libraries.includes(Library.TanstackQuery)) configs.push(...await tanstackQuery)

  if (libraries.includes(Library.TanstackRouter)) configs.push(...await tanstackRouter)

  if (libraries.includes(Library.Storybook)) configs.push(...await storybook)

  // Testing
  if (testing.includes(Testing.Vitest)) configs.push(...await vitest)

  if (testing.includes(Testing.Playwright)) configs.push(...await playwright)

  if (testing.includes(Testing.Jest)) configs.push(...await jest)

  if (testing.includes(Testing.Cypress)) configs.push(...await cypress)

  if (testing.includes(Testing.TestingLibrary)) configs.push(...await testingLibrary)

  // Formats
  if (formats.includes(Format.Mdx)) configs.push(...await mdx)

  if (formats.includes(Format.Markdown)) configs.push(...await markdown)

  if (formats.includes(Format.Jsonc)) configs.push(...await jsonc)

  if (formats.includes(Format.Yaml)) configs.push(...await yaml)

  if (formats.includes(Format.Toml)) configs.push(...await toml)

  if (formats.includes(Format.Graphql)) configs.push(...await graphql)

  // Extensions
  if (extensions.includes(Extension.BestPractices)) configs.push(...await bestPractices)

  if (extensions.includes(Extension.Regexp)) configs.push(...await regexp)

  if (extensions.includes(Extension.Unicorn)) configs.push(...await unicorn)

  if (extensions.includes(Extension.Sonarjs)) configs.push(...await sonarjs)

  if (extensions.includes(Extension.Security)) configs.push(...await security)

  if (extensions.includes(Extension.Perfectionist)) configs.push(...await perfectionist)

  // Standalone tools
  if (tools.includes(Tool.Jsdoc)) configs.push(...await jsdoc)

  if (tools.includes(Tool.Swagger)) configs.push(...await swagger)

  return configs
}

/**
 * Returns the Prettier configuration if selected.
 */
export const getPrettierConfig = async (tools: Tool[]): Promise<FlatConfigArray> => tools.includes(Tool.Prettier) ? await prettier : []
