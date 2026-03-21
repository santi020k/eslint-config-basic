import type { TSESLint } from '@typescript-eslint/utils'

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
  Perfectionist = 'perfectionist'
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
