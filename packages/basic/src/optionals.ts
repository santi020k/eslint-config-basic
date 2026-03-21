import {
  Extension,
  type FlatConfigArray,
  Format,
  Library,
  Testing,
  Tool
} from '@santi020k/eslint-config-core'
import {
  cspell,
  i18next,
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
  toml,
  unicorn,
  vitest,
  yaml
} from '@santi020k/eslint-config-optionals'

/**
 * Gets the optional configurations based on selected options.
 * This function maintains the recommended ordering (e.g. Prettier last).
 */
export const getOptionalConfigs = (
  libraries: Library[],
  tools: Tool[],
  testing: Testing[],
  formats: Format[],
  extensions: Extension[]
): FlatConfigArray => {
  const configs: FlatConfigArray = []

  // Tools (Except Prettier which goes last)
  if (tools.includes(Tool.Cspell)) configs.push(...cspell)

  // Libraries
  if (libraries.includes(Library.Tailwind)) configs.push(...tailwind)

  if (libraries.includes(Library.I18next)) configs.push(...i18next)

  if (libraries.includes(Library.Stencil)) configs.push(...stencil)

  if (libraries.includes(Library.TanstackQuery)) configs.push(...tanstackQuery)

  if (libraries.includes(Library.TanstackRouter)) configs.push(...tanstackRouter)

  if (libraries.includes(Library.Storybook)) configs.push(...storybook)

  // Testing
  if (testing.includes(Testing.Vitest)) configs.push(...vitest)

  if (testing.includes(Testing.Playwright)) configs.push(...playwright)

  // Formats
  if (formats.includes(Format.Mdx)) configs.push(...mdx)

  if (formats.includes(Format.Markdown)) configs.push(...markdown)

  if (formats.includes(Format.Jsonc)) configs.push(...jsonc)

  if (formats.includes(Format.Yaml)) configs.push(...yaml)

  if (formats.includes(Format.Toml)) configs.push(...toml)

  // Extensions
  if (extensions.includes(Extension.Regexp)) configs.push(...regexp)

  if (extensions.includes(Extension.Unicorn)) configs.push(...unicorn)

  if (extensions.includes(Extension.Sonarjs)) configs.push(...sonarjs)

  if (extensions.includes(Extension.Security)) configs.push(...security)

  if (extensions.includes(Extension.Perfectionist)) configs.push(...perfectionist)

  // Standalone Tools
  if (tools.includes(Tool.Jsdoc)) configs.push(...jsdoc)

  if (tools.includes(Tool.Swagger)) configs.push(...swagger)

  return configs
}

/**
 * Returns the Prettier configuration if selected.
 */
export const getPrettierConfig = (tools: Tool[]): FlatConfigArray => tools.includes(Tool.Prettier) ? prettier : []
