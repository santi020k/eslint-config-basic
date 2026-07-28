import type { TSESLint } from '@typescript-eslint/utils'

import { defineLazyConfig, loadDefault, type PluginWithConfigs } from './lazy.js'

/**
 * Playwright ESLint configuration
 * Provides linting rules for Playwright end-to-end test files
 */
export const playwright: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('playwright', async () => {
  const pluginPlaywright = await loadDefault<PluginWithConfigs<'flat/recommended'>>('eslint-plugin-playwright')

  return [
    {
      files: [
        '**/e2e/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        '**/tests/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        '**/tests/e2e/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        '**/*.e2e.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        '**/*.e2e.spec.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        '**/*.playwright.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        '**/*.playwright.spec.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        '**/playwright/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
      ],
      name: 'integrations/playwright',
      ...pluginPlaywright.configs['flat/recommended']
    }
  ]
})
