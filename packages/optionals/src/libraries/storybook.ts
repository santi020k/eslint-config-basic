import type PluginStorybook from 'eslint-plugin-storybook'

import { defineLazyConfig, loadDefault } from '../lazy.js'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Storybook ESLint configuration
 * Provides rules for Storybook story best practices
 */
export const storybook: TSESLint.FlatConfig.ConfigArray = defineLazyConfig('storybook', () => {
  const pluginStorybook = loadDefault<typeof PluginStorybook>('eslint-plugin-storybook')

  return [
    ...(pluginStorybook.configs['flat/recommended'])
  ]
})
