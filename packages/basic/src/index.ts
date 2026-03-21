import {
  coreConfig,
  createCoreConfig,
  detectProjectOptions,
  type EslintConfigOptions,
  Extension,
  type FlatConfigArray,
  Format,
  gitignore,
  hasReactConfig,
  type ImportedFramework,
  Library,
  NextMode,
  Preset,
  Runtime,
  Setting,
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
import { typescriptConfig } from '@santi020k/eslint-config-typescript'
import type { TSESLint } from '@typescript-eslint/utils'

// Re-export core types and utilities
export {
  Library,
  Tool,
  Extension,
  Setting,
  Runtime,
  Preset,
  Testing,
  Format,
  NextMode,
  ReactConfigKeys,
  hasReactConfig,
  coreConfig,
  createCoreConfig,
  getGlobalsForRuntime,
  jsConfig,
  gitignore,
  detectProjectOptions
} from '@santi020k/eslint-config-core'

export type { FlatConfigArray, EslintConfigOptions, ImportedFramework }

// Re-export framework configs
export { typescriptConfig, tsConfig } from '@santi020k/eslint-config-typescript'

// Re-export optionals
export {
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
 * Resolves an imported framework (either array or default export) into a config array.
 */
const resolveFramework = (framework?: ImportedFramework): FlatConfigArray => {
  if (!framework || typeof framework === 'boolean') return []

  return Array.isArray(framework) ? framework : framework.default
}

/**
 * Resolves a preset into options
 */
const resolvePreset = (preset: Preset): Partial<EslintConfigOptions> => {
  switch (preset) {
    case Preset.Basic:
      return { runtime: Runtime.Universal }

    case Preset.Node:
      return {
        typescript: true,
        runtime: Runtime.Node
      }

    case Preset.Browser:
      return {
        typescript: true,
        frameworks: { react: true },
        runtime: Runtime.Browser
      }

    case Preset.All:
      return {
        typescript: true,
        libraries: Object.values(Library),
        tools: Object.values(Tool),
        testing: Object.values(Testing),
        formats: Object.values(Format),
        extensions: Object.values(Extension),
        runtime: Runtime.Universal,
        frameworks: {
          react: true,
          next: true,
          astro: true,
          vue: true,
          svelte: true,
          solid: true,
          angular: true
        }
      }

    default:
      return {}
  }
}

/**
 * Generates the ESLint configuration array, applying configurations
 * and optional settings based on the input configuration.
 *
 * @param {EslintConfigOptions} options - Configuration and optional settings
 * @returns {FlatConfigArray} The final ESLint configuration array
 */
export const eslintConfig = (options?: EslintConfigOptions): FlatConfigArray => {
  const detected: Partial<EslintConfigOptions> = options === undefined ? detectProjectOptions() : {}
  const presetDefaults = options?.preset ? resolvePreset(options.preset) : {}

  const {
    typescript = (presetDefaults.typescript ?? detected.typescript ?? false),
    libraries = (presetDefaults.libraries ?? detected.libraries ?? []),
    testing = (presetDefaults.testing ?? detected.testing ?? []),
    formats = (presetDefaults.formats ?? detected.formats ?? []),
    tools = (presetDefaults.tools ?? detected.tools ?? []),
    extensions = (presetDefaults.extensions ?? detected.extensions ?? []),
    settings = (detected.settings ?? []),
    strict = options?.strict ?? false,
    runtime = (presetDefaults.runtime ?? detected.runtime ?? Runtime.Universal),
    nextMode = (presetDefaults.nextMode ?? detected.nextMode ?? NextMode.Pages),

    frameworks = { ...presetDefaults.frameworks, ...options?.frameworks }
  } = options ?? {}

  const {
    react: reactParamRaw = frameworks.react,
    next: nextParamRaw = frameworks.next,
    astro: astroParamRaw = frameworks.astro,
    expo: expoParamRaw = frameworks.expo,
    nest: nestParamRaw = frameworks.nest,
    vue: vueParamRaw = frameworks.vue,
    svelte: svelteParamRaw = frameworks.svelte,
    solid: solidParamRaw = frameworks.solid,
    angular: angularParamRaw = frameworks.angular
  } = frameworks

  const reactParam = resolveFramework(reactParamRaw)
  const nextParam = resolveFramework(nextParamRaw)
  const astroParam = resolveFramework(astroParamRaw)
  const expoParam = resolveFramework(expoParamRaw)
  const nestParam = resolveFramework(nestParamRaw)
  const vueParam = resolveFramework(vueParamRaw)
  const svelteParam = resolveFramework(svelteParamRaw)
  const solidParam = resolveFramework(solidParamRaw)
  const angularParam = resolveFramework(angularParamRaw)
  // Deduplicate entries
  const uniqueLibraries = [...new Set(libraries)]
  const uniqueTesting = [...new Set(testing)]
  const uniqueFormats = [...new Set(formats)]
  const uniqueTools = [...new Set(tools)]
  const uniqueExtensions = [...new Set(extensions)]
  const uniqueSettings = [...new Set(settings)]
  // React is needed if any React-based framework option is present
  const hasReact = hasReactConfig({ frameworks })
  // Gitignore is enabled by default unless NoGitignore is specified (#8)
  const useGitignore = !uniqueSettings.includes(Setting.NoGitignore)

  // Use runtime-aware core config
  const runtimeCoreConfig = runtime !== Runtime.Universal ?
    createCoreConfig(runtime) :
    coreConfig

  return (([
    // Settings
    ...(useGitignore ? gitignore : []),

    // Core JS config with runtime-aware globals
    ...runtimeCoreConfig,

    // React config (included if any React-based framework is used/passed)
    ...(hasReact ? reactParam : []),

    // Framework-specific configs (Modularized)
    ...(typescript ? typescriptConfig : []),
    ...nextParam,

    // Next.js App Router overrides (#12)
    ...(frameworks.next && nextMode === NextMode.AppRouter ?
      [
        {
          name: 'eslint-config-next/app-router-overrides',
          files: ['app/**/*.{ts,tsx}'],
          rules: {
            '@next/next/no-html-link-for-pages': 'off'
          }
        } as TSESLint.FlatConfig.Config
      ] :
      []),

    ...astroParam,
    ...expoParam,
    ...nestParam,
    ...vueParam,
    ...svelteParam,
    ...solidParam,
    ...angularParam,

    // Optionals (Still synchronous as they are direct dependencies)
    ...(uniqueTools.includes(Tool.Cspell) ? cspell : []),
    ...(uniqueLibraries.includes(Library.Tailwind) ? tailwind : []),
    ...(uniqueTesting.includes(Testing.Vitest) ? vitest : []),
    ...(uniqueLibraries.includes(Library.I18next) ? i18next : []),
    ...(uniqueLibraries.includes(Library.Stencil) ? stencil : []),
    ...(uniqueFormats.includes(Format.Mdx) ? mdx : []),
    ...(uniqueExtensions.includes(Extension.Regexp) ? regexp : []),
    ...(uniqueFormats.includes(Format.Markdown) ? markdown : []),
    ...(uniqueExtensions.includes(Extension.Unicorn) ? unicorn : []),
    ...(uniqueExtensions.includes(Extension.Sonarjs) ? sonarjs : []),
    ...(uniqueTesting.includes(Testing.Playwright) ? playwright : []),
    ...(uniqueExtensions.includes(Extension.Security) ? security : []),
    ...(uniqueLibraries.includes(Library.TanstackQuery) ? tanstackQuery : []),
    ...(uniqueLibraries.includes(Library.TanstackRouter) ? tanstackRouter : []),
    ...(uniqueExtensions.includes(Extension.Perfectionist) ? perfectionist : []),
    ...(uniqueTools.includes(Tool.Jsdoc) ? jsdoc : []),
    ...(uniqueTools.includes(Tool.Swagger) ? swagger : []),
    ...(uniqueLibraries.includes(Library.Storybook) ? storybook : []),
    ...(uniqueFormats.includes(Format.Jsonc) ? jsonc : []),
    ...(uniqueFormats.includes(Format.Yaml) ? yaml : []),
    ...(uniqueFormats.includes(Format.Toml) ? toml : []),

    // Global overrides for non-TS files to prevent typed rules errors (#15)
    // Must be BEFORE Prettier to allow Prettier to override formatting
    {
      name: 'eslint-config-basic/typed-rules-overrides',
      files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs', '**/*.md', '**/*.mdx', '**/*.astro/*.js', '**/*.astro/*.ts'],
      rules: {
        '@typescript-eslint/await-thenable': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/require-await': 'off'
      }
    } as TSESLint.FlatConfig.Config,

    ...(uniqueTools.includes(Tool.Prettier) ? prettier : [])
  ] as TSESLint.FlatConfig.ConfigArray).map((config: TSESLint.FlatConfig.Config) => {
    if (strict && config.rules) {
      const strictRules: TSESLint.FlatConfig.Rules = Object.fromEntries(
        Object.entries(config.rules).map(([key, value]) => {
          if (value === 'warn') return [key, 'error']

          return [key, value]
        })
      )

      return { ...config, rules: strictRules }
    }

    return config
  })) as FlatConfigArray
}
