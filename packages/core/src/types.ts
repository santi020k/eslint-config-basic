import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Global file patterns for JavaScript-compatible files
 */
export const GLOB_JS = ['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.jsx']

export const GLOB_TS = ['**/*.ts', '**/*.mts', '**/*.cts', '**/*.tsx']

export const GLOB_JS_TS = [...GLOB_JS, ...GLOB_TS]
export const GLOB_VUE = ['**/*.vue']
export const GLOB_SVELTE = ['**/*.svelte']
export const GLOB_ASTRO = ['**/*.astro']
export const GLOB_SLOT = [...GLOB_VUE, ...GLOB_SVELTE, ...GLOB_ASTRO]
export const GLOB_JS_TS_ALL = [...GLOB_JS_TS, ...GLOB_SLOT]

export const GLOB_VIRTUAL_TS = [
  '**/*.astro/*.ts',
  '**/*.astro/*.tsx',
  '**/*.vue/*.ts',
  '**/*.vue/*.tsx',
  '**/*.svelte/*.ts',
  '**/*.svelte/*.tsx',
  '**/*.md/*.ts',
  '**/*.md/*.tsx',
  '**/*.mdx/*.ts',
  '**/*.mdx/*.tsx',
  '**/.vitepress/**/*.ts',
  '**/.vitepress/**/*.mts'
]

/**
 * Enum for specialized ESLint extensions and strict rule sets
 */
export enum Extension {

  /**
   * Built-in best-practice rules: no-console, no-alert, cyclomatic complexity,
   * max nesting depth. No extra dependencies required.
   */
  BestPractices = 'best-practices',
  Perfectionist = 'perfectionist',
  Regexp = 'regexp',
  Security = 'security',
  Sonarjs = 'sonarjs',

  Unicorn = 'unicorn'
}

/**
 * Enum for linting non-JS/TS file formats
 */
export enum Format {
  Graphql = 'graphql',
  Jsonc = 'jsonc',
  Markdown = 'markdown',
  Mdx = 'mdx',
  Toml = 'toml',
  Yaml = 'yaml'
}

/**
 * Enum for application-level runtime dependencies and styling
 */
export enum Library {
  AiSdk = 'ai-sdk',
  Drizzle = 'drizzle',
  I18next = 'i18next',
  Langchain = 'langchain',
  LlamaIndex = 'llamaindex',
  Mastra = 'mastra',
  Mcp = 'mcp',
  MikroOrm = 'mikro-orm',
  OpenAiAgents = 'openai-agents',
  Prisma = 'prisma',
  Sequelize = 'sequelize',
  Stencil = 'stencil',
  Storybook = 'storybook',
  Tailwind = 'tailwind',
  TanstackQuery = 'tanstack-query',
  TanstackRouter = 'tanstack-router',
  Typeorm = 'typeorm'
}

/**
 * Enum for Next.js mode options
 */
export enum NextMode {
  AppRouter = 'app-router',
  Pages = 'pages'
}

/**
 * Enum for named presets
 */
export enum Preset {

  /** All configs + all optionals */
  All = 'all',

  /** Browser application defaults with TypeScript and Prettier */
  App = 'app',

  /** Core JS config only */
  Basic = 'basic',

  /** Core + TS + Browser runtime */
  Browser = 'browser',

  /** CI-oriented defaults with strict severities */
  CI = 'ci',

  /** TypeScript package/library defaults for published packages */
  Library = 'library',

  /** Monorepo-friendly defaults for mixed workspaces */
  Monorepo = 'monorepo',

  /** Core + TS + Node runtime */
  Node = 'node',

  /** Core + TS + Worker runtime */
  Worker = 'worker'
}

/**
 * Enum for runtime environment presets
 */
export enum Runtime {

  /** Only Browser globals (window, document, etc.) */
  Browser = 'browser',

  /** Only Node.js globals (process, __dirname, etc.) */
  Node = 'node',

  /** Both Node.js and Browser globals (default) */
  Universal = 'universal',

  /** Service Worker and Fetch API globals for edge runtimes */
  Worker = 'worker'
}

/**
 * Enum for settings options in ESLint
 */
export enum Setting {

  /** Default behavior — accepted for symmetry with `NoDefaultIgnores`; passing it changes nothing. */
  DefaultIgnores = 'default-ignores',

  /** Default behavior — accepted for symmetry with `NoGitignore`; passing it changes nothing. */
  Gitignore = 'gitignore',

  /** Disable the built-in default ignore globs (dist, build, coverage, etc.). */
  NoDefaultIgnores = 'no-default-ignores',

  /** Disable automatic `.gitignore`-based ignores. */
  NoGitignore = 'no-gitignore'
}

/**
 * Enum for testing frameworks and environments
 */
export enum Testing {
  Cypress = 'cypress',
  Jest = 'jest',
  Playwright = 'playwright',
  TestingLibrary = 'testing-library',
  Vitest = 'vitest'
}

/**
 * Enum for integrating external standalone utilities
 */
export enum Tool {
  Cspell = 'cspell',
  Jsdoc = 'jsdoc',
  Prettier = 'prettier',
  Swagger = 'swagger'
}

/**
 * Controls automatic project detection by category.
 */
export interface DetectionOptions {
  extensions?: boolean
  formats?: boolean
  frameworks?: boolean
  libraries?: boolean
  nextMode?: boolean
  runtime?: boolean
  testing?: boolean
  tools?: boolean
  typescript?: boolean
}

/**
 * Severity profiles for teams adopting the config progressively.
 */
export type StrictMode = 'ci' | 'pedantic' | 'recommended' | boolean

/**
 * Array of configurations that require React
 * Note: These are now used internally for auto-detection and globals
 */
export const ReactConfigKeys = [
  'react',
  'next',
  'expo',
  'remix'
] as const

/**
 * Framework names that can be auto-detected by `detectProjectOptions`.
 * These are informational only — you still need to import and pass the actual
 * framework config via `frameworks.<name>` in `eslintConfig()`.
 */
export type DetectedFrameworkName =
  | 'angular' |
  'astro' |
  'expo' |
  'hono' |
  'nest' |
  'next' |
  'qwik' |
  'react' |
  'remix' |
  'slidev' |
  'solid' |
  'svelte' |
  'vite' |
  'vue'

/**
 * ESLint configuration interface
 */
export interface EslintConfigOptions {

  /**
   * Enables bundled framework configs detected from dependencies.
   * Disable this when you want manual framework control only.
   */
  autoFrameworks?: boolean

  /**
   * Frameworks detected from package.json by `detectProjectOptions()`.
   * In v2, `eslintConfig()` enables these bundled framework configs by default.
   */
  detectedFrameworks?: DetectedFrameworkName[]

  /**
   * Enables or disables automatic project detection by category.
   * Use `false` to disable all detection, or an object for granular control.
   */
  detection?: boolean | DetectionOptions

  /**
   * Root directory used for automatic project detection.
   * Defaults to `process.cwd()`.
   */
  detectRootDir?: string

  /** List of specialized ESLint rules and extensions */
  extensions?: Extension[]

  /** Additional non-JS/TS file formats to lint */
  formats?: Format[]

  /**
   * Framework and library specific configurations.
   *
   * Set a framework to `true` to use the bundled v2 config from
   * `@santi020k/eslint-config-basic`, or pass a config array/factory when you
   * need to override the bundled config.
   */
  frameworks?: {
    angular?: ImportedFramework
    astro?: ImportedFramework
    expo?: ImportedFramework
    hono?: ImportedFramework
    nest?: ImportedFramework
    next?: ImportedFramework
    qwik?: ImportedFramework
    react?: ImportedFramework
    remix?: ImportedFramework
    slidev?: ImportedFramework
    solid?: ImportedFramework
    svelte?: ImportedFramework
    vite?: ImportedFramework
    vue?: ImportedFramework
  }

  /**
   * Extra global ignore globs (flat config `ignores` only, no `files`).
   * Patterns are relative to ESLint's working directory, like a manual ignore block.
   * Not merged from presets or detection. For `projects` entries, patterns are not
   * auto-prefixed with the subproject path; use repo-root-relative globs when needed.
   */
  ignores?: string[]

  /** List of application-level dependencies configurations */
  libraries?: Library[]

  /** Next.js specific routing mode */
  nextMode?: NextMode

  /**
   * Controls how explicit arrays/frameworks combine with auto-detected and preset values.
   * - `merge` (default): union detected + preset + explicit values
   * - `replace`: explicit values fully replace detected/preset values
   */
  optionMergeStrategy?: 'merge' | 'replace'

  /** High-level configuration preset */
  preset?: Preset

  /**
   * Package-aware subproject configuration for monorepos.
   * Each key is a workspace-relative folder and each value is scoped to that folder.
   */
  projects?: Record<string, Omit<EslintConfigOptions, 'projects'>>

  /** Runtime environment preset (Node, Browser, Universal) */
  runtime?: Runtime

  /** List of global settings and behavioral flags */
  settings?: Setting[]

  /**
   * Severity profile.
   * - `false` / `recommended`: keep recommended severities
   * - `true` / `ci`: promote warnings to errors
   * - `pedantic`: promote warnings and enable built-in best-practice rules
   */
  strict?: StrictMode

  /** List of testing frameworks and testing environments */
  testing?: Testing[]

  /** List of integrations for external standalone tools */
  tools?: Tool[]

  /**
   * Root directory of the project.
   * Required if multiple candidate TSConfigRootDirs are present.
   */
  tsconfigRootDir?: string

  /** Enable TypeScript support with optional settings */
  typescript?: boolean
}

/**
 * Type alias for ESLint flat config array
 */
export type FlatConfigArray = TSESLint.FlatConfig.ConfigArray

/**
 * Type for framework option values: `true` enables the bundled v2 config,
 * or pass a config array, a factory function, or an imported module with a
 * default export. Any other value throws a descriptive `TypeError`
 * (see `resolveFramework` in `@santi020k/eslint-config-basic`).
 */
export type ImportedFramework =
  ((options?: Record<string, unknown>) => FlatConfigArray) |
  FlatConfigArray |
  true |
  { default: ((options?: Record<string, unknown>) => FlatConfigArray) | FlatConfigArray }


