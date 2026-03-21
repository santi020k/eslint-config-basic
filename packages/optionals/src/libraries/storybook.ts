import pluginStorybook from 'eslint-plugin-storybook'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Storybook ESLint configuration
 * Provides rules for Storybook story best practices
 */
export const storybook: TSESLint.FlatConfig.ConfigArray = [
  ...(pluginStorybook.configs['flat/recommended'])
]
