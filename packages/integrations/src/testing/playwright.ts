import { defineLazyConfig, loadDefault, type PluginWithConfigs } from '../lazy.js'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Playwright ESLint configuration
 * Provides linting rules for Playwright end-to-end test files
 */
export const playwright: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('playwright', async () => {
  const pluginPlaywright = await loadDefault<PluginWithConfigs<'flat/recommended'>>('eslint-plugin-playwright')

  return [
    {
      files: [
        '**/e2e/**/*.{js,ts,jsx,tsx}',
        '**/tests/e2e/**/*.{js,ts,jsx,tsx}',
        '**/*.e2e.{js,ts,jsx,tsx}',
        '**/*.e2e.spec.{js,ts,jsx,tsx}',
        '**/playwright/**/*.{js,ts,jsx,tsx}'
      ],
      name: 'integrations/playwright',
      ...pluginPlaywright.configs['flat/recommended']
    }
  ]
})
