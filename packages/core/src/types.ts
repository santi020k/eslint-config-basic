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
  Nest = 'nest'
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
  Stencil = 'stencil'
}

/**
 * Enum for settings options in ESLint
 */
export enum SettingOption {
  Gitignore = 'gitignore'
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
}

/**
 * Type alias for ESLint flat config array
 */
export type FlatConfigArray = TSESLint.FlatConfig.ConfigArray
