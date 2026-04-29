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
 * Enum for Next.js mode options
 */
export enum NextMode {
  Pages = 'pages',
  AppRouter = 'app-router'
}

/**
 * Enum for application-level runtime dependencies and styling
 */
export enum Library {
  Tailwind = 'tailwind',
  I18next = 'i18next',
  Stencil = 'stencil',
  TanstackQuery = 'tanstack-query',
  TanstackRouter = 'tanstack-router',
  Storybook = 'storybook'
}

/**
 * Enum for testing frameworks and environments
 */
export enum Testing {
  Vitest = 'vitest',
  Playwright = 'playwright',
  Jest = 'jest',
  Cypress = 'cypress',
  TestingLibrary = 'testing-library'
}

/**
 * Enum for linting non-JS/TS file formats
 */
export enum Format {
  Mdx = 'mdx',
  Markdown = 'markdown',
  Jsonc = 'jsonc',
  Yaml = 'yaml',
  Toml = 'toml',
  Graphql = 'graphql'
}

/**
 * Enum for integrating external standalone utilities
 */
export enum Tool {
  Prettier = 'prettier',
  Cspell = 'cspell',
  Jsdoc = 'jsdoc',
  Swagger = 'swagger'
}

/**
 * Enum for specialized ESLint extensions and strict rule sets
 */
export enum Extension {
  Regexp = 'regexp',
  Unicorn = 'unicorn',
  Sonarjs = 'sonarjs',
  Security = 'security',
  Perfectionist = 'perfectionist',

  /**
   * Built-in best-practice rules: no-console, no-alert, cyclomatic complexity,
   * max nesting depth. No extra dependencies required.
   */
  BestPractices = 'best-practices'
}

/**
 * Enum for settings options in ESLint
 */
export enum Setting {
  Gitignore = 'gitignore',
  NoGitignore = 'no-gitignore'
}

/**
 * Enum for runtime environment presets
 */
export enum Runtime {

  /** Only Node.js globals (process, __dirname, etc.) */
  Node = 'node',

  /** Only Browser globals (window, document, etc.) */
  Browser = 'browser',

  /** Service Worker and Fetch API globals for edge runtimes */
  Worker = 'worker',

  /** Both Node.js and Browser globals (default) */
  Universal = 'universal'
}

/**
 * Enum for named presets
 */
export enum Preset {

  /** Core JS config only */
  Basic = 'basic',

  /** All configs + all optionals */
  All = 'all',

  /** Core + TS + Node runtime */
  Node = 'node',

  /** Core + TS + Browser runtime */
  Browser = 'browser',

  /** Core + TS + Worker runtime */
  Worker = 'worker'
}

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
 * Type to handle both direct config arrays and imported modules with a default export.
 * User-facing framework options should always pass imported config arrays/modules explicitly
 * — boolean values are not accepted and will throw a descriptive error.
 */
export type ImportedFramework =
  FlatConfigArray |
  { default: FlatConfigArray | ((options?: Record<string, unknown>) => FlatConfigArray) } |
  ((options?: Record<string, unknown>) => FlatConfigArray) |
  true

/**
 * Framework names that can be auto-detected by `detectProjectOptions`.
 * These are informational only — you still need to import and pass the actual
 * framework config via `frameworks.<name>` in `eslintConfig()`.
 */
export type DetectedFrameworkName =
  | 'react' |
  'next' |
  'astro' |
  'expo' |
  'vue' |
  'svelte' |
  'solid' |
  'angular' |
  'nest' |
  'hono' |
  'qwik' |
  'remix'

/**
 * TypeScript configuration options
 */
export interface TsOptions {
  project?: boolean | string | string[]
}

/**
 * ESLint configuration interface
 */
export interface EslintConfigOptions {

  /**
   * Root directory of the project.
   * Required if multiple candidate TSConfigRootDirs are present.
   */
  tsconfigRootDir?: string

  /** Enable TypeScript support with optional settings */
  typescript?: boolean | TsOptions

  /** List of application-level dependencies configurations */
  libraries?: Library[]

  /** List of testing frameworks and testing environments */
  testing?: Testing[]

  /** Additional non-JS/TS file formats to lint */
  formats?: Format[]

  /** List of integrations for external standalone tools */
  tools?: Tool[]

  /** List of specialized ESLint rules and extensions */
  extensions?: Extension[]

  /** List of global settings and behavioral flags */
  settings?: Setting[]

  /** If true, all 'warn' rules are promoted to 'error' */
  strict?: boolean

  /** Runtime environment preset (Node, Browser, Universal) */
  runtime?: Runtime

  /** High-level configuration preset */
  preset?: Preset

  /** Next.js specific routing mode */
  nextMode?: NextMode

  /**
   * Framework and library specific configurations.
   *
   * Set a framework to `true` to use the bundled v2 config from
   * `@santi020k/eslint-config-basic`, or pass a config array/factory when you
   * need to override the bundled config.
   */
  frameworks?: {
    react?: ImportedFramework
    next?: ImportedFramework
    astro?: ImportedFramework
    expo?: ImportedFramework
    vue?: ImportedFramework
    svelte?: ImportedFramework
    solid?: ImportedFramework
    angular?: ImportedFramework
    nest?: ImportedFramework
    hono?: ImportedFramework
    qwik?: ImportedFramework
    remix?: ImportedFramework
  }

  /**
   * Frameworks detected from package.json by `detectProjectOptions()`.
   * In v2, `eslintConfig()` enables these bundled framework configs by default.
   */
  detectedFrameworks?: DetectedFrameworkName[]
}

/**
 * Type alias for ESLint flat config array
 */
export type FlatConfigArray = TSESLint.FlatConfig.ConfigArray
