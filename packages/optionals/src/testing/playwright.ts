import { defineLazyConfig, loadDefault, type PluginWithConfigs } from '../lazy.js'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Playwright ESLint configuration
 * Provides linting rules for Playwright end-to-end test files
 */
export const playwright: TSESLint.FlatConfig.ConfigArray = defineLazyConfig('playwright', () => {
  const pluginPlaywright = loadDefault<PluginWithConfigs<'flat/recommended'>>('eslint-plugin-playwright')

  return [
    {
      name: 'optionals/playwright',
      files: [
        '**/e2e/**/*.{js,ts,jsx,tsx}',
        '**/*.e2e.{js,ts,jsx,tsx}',
        '**/tests/e2e/**/*.{js,ts,jsx,tsx}',
        '**/playwright/**/*.{js,ts,jsx,tsx}'
      ],
      ...pluginPlaywright.configs['flat/recommended']
    }
  ]
})
