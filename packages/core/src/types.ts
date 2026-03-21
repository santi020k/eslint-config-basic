import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Enum for Next.js mode options
 */
export enum NextMode {
  Pages = 'pages',
  AppRouter = 'app-router'
}

/**
 * Enum for optional features that can be included in ESLint
 */
export enum OptionalOption {
  Cspell = 'cspell',
  Tailwind = 'tailwind',
  Vitest = 'vitest',
  I18next = 'i18next',
  Mdx = 'mdx',
  Markdown = 'markdown',
  Stencil = 'stencil',
  Prettier = 'prettier',
  Regexp = 'regexp',
  Unicorn = 'unicorn',
  Sonarjs = 'sonarjs',
  Playwright = 'playwright',
  Security = 'security',
  TanstackQuery = 'tanstack-query',
  TanstackRouter = 'tanstack-router',
  Perfectionist = 'perfectionist',
  Jsdoc = 'jsdoc',
  Swagger = 'swagger',
  Storybook = 'storybook',
  Jsonc = 'jsonc',
  Yaml = 'yaml',
  Toml = 'toml'
}

/**
 * Enum for settings options in ESLint
 */
export enum SettingOption {
  Gitignore = 'gitignore',
  NoGitignore = 'no-gitignore'
}

/**
 * Enum for runtime environment presets
 */
export enum RuntimeOption {

  /** Only Node.js globals (process, __dirname, etc.) */
  Node = 'node',

  /** Only Browser globals (window, document, etc.) */
  Browser = 'browser',

  /** Both Node.js and Browser globals (default) */
  Universal = 'universal'
}

/**
 * Enum for named presets
 */
export enum PresetOption {

  /** Core JS config only */
  Basic = 'basic',

  /** All configs + all optionals */
  All = 'all',

  /** Core + TS + Node runtime */
  Node = 'node',

  /** Core + TS + React + Browser runtime */
  Browser = 'browser'
}

/**
 * Array of configurations that require React
 * Note: These are now used internally for auto-detection and globals
 */
export const ReactConfigKeys = [
  'react',
  'next',
  'expo'
] as const

/**
 * Type to handle both direct config arrays and imported modules with a default export.
 * Also allows a boolean flag for auto-detection/enabling without passing the config object.
 */
export type ImportedFramework = FlatConfigArray | { default: FlatConfigArray } | boolean

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
  /** Enable TypeScript support with optional settings */
  typescript?: boolean | TsOptions

  /** List of optional pluggable configurations */
  optionals?: OptionalOption[]

  /** List of global settings and behavioral flags */
  settings?: SettingOption[]

  /** If true, all 'warn' rules are promoted to 'error' */
  strict?: boolean

  /** Runtime environment preset (Node, Browser, Universal) */
  runtime?: RuntimeOption

  /** High-level configuration preset */
  preset?: PresetOption

  /** Next.js specific routing mode */
  nextMode?: NextMode

  /**
   * Framework and library specific configurations.
   * If a value is provided, its rules and globals are automatically enabled.
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
  }
}

/**
 * Type alias for ESLint flat config array
 */
export type FlatConfigArray = TSESLint.FlatConfig.ConfigArray
