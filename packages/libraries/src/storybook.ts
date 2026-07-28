import type { TSESLint } from '@typescript-eslint/utils'
import type PluginStorybook from 'eslint-plugin-storybook'

import { defineLazyConfig, loadDefault } from './lazy.js'

/**
 * Storybook ESLint configuration
 * Provides rules for Storybook story best practices
 */
export const storybook: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('storybook', async () => {
  const pluginStorybook = await loadDefault<typeof PluginStorybook>('eslint-plugin-storybook')

  return [
    ...(pluginStorybook.configs['flat/recommended'])
  ]
})
