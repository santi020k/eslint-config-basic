import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Enum for configuration options in ESLint
 */
export enum ConfigOption {
  Ts = 'ts',
  React = 'react',
  Next = 'next',
  Expo = 'expo',
  Astro = 'astro',
  Nest = 'nest',
  Vue = 'vue',
  Svelte = 'svelte',
  Solid = 'solid',
  Angular = 'angular'
}

/**
 * Next.js mode options
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
 */
export const ReactConfigs: ConfigOption[] = [
  ConfigOption.React,
  ConfigOption.Astro,
  ConfigOption.Next,
  ConfigOption.Expo
]

/**
 * ESLint configuration interface
 */
export interface EslintConfigOptions {
  config?: ConfigOption[]
  optionals?: OptionalOption[]
  settings?: SettingOption[]
  strict?: boolean
  runtime?: RuntimeOption
  preset?: PresetOption

  /** Next.js mode (Pages or App Router) */
  nextMode?: NextMode
}

/**
 * Type alias for ESLint flat config array
 */
export type FlatConfigArray = TSESLint.FlatConfig.ConfigArray
