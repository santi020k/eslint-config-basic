import {
  coreConfig,
  createCoreConfig,
  detectProjectOptions,
  type EslintConfigOptions,
  type FlatConfigArray,
  gitignore,
  hasReactConfig,
  type ImportedFramework,
  NextMode,
  OptionalOption,
  PresetOption,
  RuntimeOption,
  SettingOption,
  ReactConfigKeys
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
  OptionalOption,
  SettingOption,
  RuntimeOption,
  PresetOption,
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
const resolvePreset = (preset: PresetOption): Partial<EslintConfigOptions> => {
  switch (preset) {
    case PresetOption.Basic:
      return { runtime: RuntimeOption.Universal }

    case PresetOption.Node:
      return {
        typescript: true,
        runtime: RuntimeOption.Node
      }

    case PresetOption.Browser:
      return {
        typescript: true,
        frameworks: { react: true },
        runtime: RuntimeOption.Browser
      }

    case PresetOption.All:
      return {
        typescript: true,
        optionals: Object.values(OptionalOption),
        runtime: RuntimeOption.Universal,
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
    optionals = (presetDefaults.optionals ?? detected.optionals ?? []),
    settings = (detected.settings ?? []),
    strict = options?.strict ?? false,
    runtime = (presetDefaults.runtime ?? detected.runtime ?? RuntimeOption.Universal),
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
  const uniqueOptionals = [...new Set(optionals)]
  const uniqueSettings = [...new Set(settings)]

  // React is needed if any React-based framework option is present
  const hasReact = hasReactConfig({ frameworks })

  // Gitignore is enabled by default unless NoGitignore is specified (#8)
  const useGitignore = !uniqueSettings.includes(SettingOption.NoGitignore)

  // Use runtime-aware core config
  const runtimeCoreConfig = runtime !== RuntimeOption.Universal ?
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
    ...(uniqueOptionals.includes(OptionalOption.Cspell) ? cspell : []),
    ...(uniqueOptionals.includes(OptionalOption.Tailwind) ? tailwind : []),
    ...(uniqueOptionals.includes(OptionalOption.Vitest) ? vitest : []),
    ...(uniqueOptionals.includes(OptionalOption.I18next) ? i18next : []),
    ...(uniqueOptionals.includes(OptionalOption.Stencil) ? stencil : []),
    ...(uniqueOptionals.includes(OptionalOption.Mdx) ? mdx : []),
    ...(uniqueOptionals.includes(OptionalOption.Regexp) ? regexp : []),
    ...(uniqueOptionals.includes(OptionalOption.Markdown) ? markdown : []),
    ...(uniqueOptionals.includes(OptionalOption.Unicorn) ? unicorn : []),
    ...(uniqueOptionals.includes(OptionalOption.Sonarjs) ? sonarjs : []),
    ...(uniqueOptionals.includes(OptionalOption.Playwright) ? playwright : []),
    ...(uniqueOptionals.includes(OptionalOption.Security) ? security : []),
    ...(uniqueOptionals.includes(OptionalOption.TanstackQuery) ? tanstackQuery : []),
    ...(uniqueOptionals.includes(OptionalOption.TanstackRouter) ? tanstackRouter : []),
    ...(uniqueOptionals.includes(OptionalOption.Perfectionist) ? perfectionist : []),
    ...(uniqueOptionals.includes(OptionalOption.Jsdoc) ? jsdoc : []),
    ...(uniqueOptionals.includes(OptionalOption.Swagger) ? swagger : []),
    ...(uniqueOptionals.includes(OptionalOption.Storybook) ? storybook : []),
    ...(uniqueOptionals.includes(OptionalOption.Jsonc) ? jsonc : []),
    ...(uniqueOptionals.includes(OptionalOption.Yaml) ? yaml : []),
    ...(uniqueOptionals.includes(OptionalOption.Toml) ? toml : []),

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

    ...(uniqueOptionals.includes(OptionalOption.Prettier) ? prettier : [])
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
