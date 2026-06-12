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
   * Accessibility (a11y) rules for JSX and Vue
   */
  A11y = 'a11y',

  /**
   * Built-in best-practice rules: no-console, no-alert, cyclomatic complexity,
   * max nesting depth. No extra dependencies required.
   */
  BestPractices = 'best-practices',

  /**
   * Disables formatting rules that conflict with Biome
   */
  Biome = 'biome',

  /**
   * Import boundary rules for common app, workspace, and generated-code edges.
   */
  Boundaries = 'boundaries',

  /**
   * Browser compatibility checks against the project browserslist
   */
  Compat = 'compat',

  /**
   * Simplifies negated logical expressions (De Morgan's laws)
   */
  DeMorgan = 'de-morgan',

  /**
   * Suggests lighter or native alternatives to heavy dependencies
   */
  Depend = 'depend',

  /**
   * Node.js rules from eslint-plugin-n for server-side codebases
   */
  Node = 'node',

  /**
   * Disables rules already covered by Oxlint for hybrid linting setups
   */
  Oxlint = 'oxlint',
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
  Css = 'css',
  Graphql = 'graphql',
  Html = 'html',
  Jsonc = 'jsonc',
  Markdown = 'markdown',
  Mdx = 'mdx',
  PackageJson = 'package-json',
  Toml = 'toml',
  Yaml = 'yaml'
}

/**
 * Enum for application-level runtime dependencies and styling
 */
export enum Library {
  AiSdk = 'ai-sdk',
  Autogen = 'autogen',
  Drizzle = 'drizzle',
  GoogleGenAi = 'google-genai',
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
  Turbo = 'turbo',
  Typeorm = 'typeorm',
  Zod = 'zod'
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

  /** Bun runtime globals */
  Bun = 'bun',

  /** Cloudflare Workers globals */
  Cloudflare = 'cloudflare',

  /** Deno runtime globals */
  Deno = 'deno',

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

  /** Default behavior — accepted for symmetry with `NoGeneratedCodeIgnores`; passing it changes nothing. */
  GeneratedCodeIgnores = 'generated-code-ignores',

  /** Default behavior — accepted for symmetry with `NoGitignore`; passing it changes nothing. */
  Gitignore = 'gitignore',

  /** Disable the built-in default ignore globs (dist, build, coverage, etc.). */
  NoDefaultIgnores = 'no-default-ignores',

  /** Disable generated-code ignore globs. */
  NoGeneratedCodeIgnores = 'no-generated-code-ignores',

  /** Disable automatic `.gitignore`-based ignores. */
  NoGitignore = 'no-gitignore'
}

/**
 * Enum for testing frameworks and environments
 */
export enum Testing {
  Cypress = 'cypress',
  Jest = 'jest',
  JestDom = 'jest-dom',
  Playwright = 'playwright',
  TestingLibrary = 'testing-library',
  Vitest = 'vitest'
}

/**
 * Enum for integrating external standalone utilities
 */
export enum Tool {
  Command = 'command',
  Cspell = 'cspell',
  Docker = 'docker',
  GithubActions = 'github-actions',
  Jsdoc = 'jsdoc',
  Nx = 'nx',
  Pnpm = 'pnpm',
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
  projects?: boolean
  runtime?: boolean
  testing?: boolean
  tools?: boolean
  typescript?: boolean
}
export type ExtensionName = `${Extension}`
export type ExtensionOption = Extension | ExtensionName
export type FormatName = `${Format}`
export type FormatOption = Format | FormatName
export type LibraryName = `${Library}`
export type LibraryOption = Library | LibraryName
export type NextModeName = `${NextMode}`
export type NextModeOption = NextMode | NextModeName

/**
 * Simple opt-in/opt-out map for optional configs. Keys match the public enum
 * string values, so both `features: { zod: true }` and `libraries: [Library.Zod]`
 * resolve to the same underlying config.
 */
export type OptionalConfigMap = Partial<Record<OptionalConfigName, boolean>>
export type OptionalConfigName =
  ExtensionName |
  FormatName |
  LibraryName |
  TestingName |
  ToolName
export type PresetName = `${Preset}`
export type PresetOption = Preset | PresetName
export type RuntimeName = `${Runtime}`
export type RuntimeOption = Runtime | RuntimeName
export type SettingName = `${Setting}`
export type SettingOption = Setting | SettingName
/**
 * Severity profiles for teams adopting the config progressively.
 */
export type StrictMode = 'ci' | 'pedantic' | 'recommended' | boolean

export type TestingName = `${Testing}`

export type TestingOption = Testing | TestingName

export type ToolName = `${Tool}`

export type ToolOption = Tool | ToolName

export type TypeScriptMode = 'off' | 'strict' | 'syntax' | 'type-aware'

export interface TypeScriptOptions {
  mode?: TypeScriptMode
  projectService?: boolean
  tsconfigRootDir?: string
}

/**
 * Array of configurations that require React
 * Note: These are now used internally for auto-detection and globals
 */
export const ReactConfigKeys = [
  'react',
  'next',
  'expo',
  'react-router',
  'remix',
  'tanstack-start'
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
  'lit' |
  'nest' |
  'next' |
  'nuxt' |
  'qwik' |
  'react' |
  'react-router' |
  'remix' |
  'slidev' |
  'solid' |
  'svelte' |
  'tanstack-start' |
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
  extensions?: ExtensionOption[]

  /**
   * Simple optional-config switchboard. Enables or disables entries from
   * `extensions`, `formats`, `libraries`, `testing`, and `tools` using their
   * string names. `integrations` is an alias for the same map.
   */
  features?: OptionalConfigMap

  /** Additional non-JS/TS file formats to lint */
  formats?: FormatOption[]

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
    lit?: ImportedFramework
    nest?: ImportedFramework
    next?: ImportedFramework
    nuxt?: ImportedFramework
    qwik?: ImportedFramework
    react?: ImportedFramework

    /** New name for Remix projects on React Router v7+. */
    'react-router'?: ImportedFramework

    /** @deprecated Remix merged into React Router v7 — use `react-router` instead. */
    remix?: ImportedFramework
    slidev?: ImportedFramework
    solid?: ImportedFramework
    svelte?: ImportedFramework

    /** TanStack Start (React/Solid full-stack framework). */
    'tanstack-start'?: ImportedFramework
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
  integrations?: OptionalConfigMap

  libraries?: LibraryOption[]

  /** Next.js specific routing mode */
  nextMode?: NextModeOption

  /**
   * Controls how explicit arrays/frameworks combine with auto-detected and preset values.
   * - `merge` (default): union detected + preset + explicit values
   * - `replace`: explicit values fully replace detected/preset values
   */
  optionMergeStrategy?: 'merge' | 'replace'

  /** High-level configuration preset */
  preset?: PresetOption

  /**
   * Package-aware subproject configuration for monorepos.
   * Each key is a workspace-relative folder and each value is scoped to that folder.
   */
  projects?: Record<string, Omit<EslintConfigOptions, 'projects'>>

  /** Runtime environment preset (Node, Browser, Universal) */
  runtime?: RuntimeOption

  /** List of global settings and behavioral flags */
  settings?: SettingOption[]

  /**
   * Severity profile.
   * - `false` / `recommended`: keep recommended severities
   * - `true` / `ci`: promote warnings to errors
   * - `pedantic`: promote warnings and enable built-in best-practice rules
   */
  strict?: StrictMode

  /** List of testing frameworks and testing environments */
  testing?: TestingOption[]

  /** List of integrations for external standalone tools */
  tools?: ToolOption[]

  /**
   * Root directory of the project.
   * Required if multiple candidate TSConfigRootDirs are present.
   */
  tsconfigRootDir?: string

  /** Enable TypeScript support with optional settings */
  typescript?: boolean | TypeScriptMode | TypeScriptOptions
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
