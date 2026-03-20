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
  Vue = 'vue'
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
  Jsdoc = 'jsdoc'
}

/**
 * Enum for settings options in ESLint
 */
export enum SettingOption {
  Gitignore = 'gitignore',
  NoGitignore = 'no-gitignore'
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
}

/**
 * Type alias for ESLint flat config array
 */
export type FlatConfigArray = TSESLint.FlatConfig.ConfigArray
