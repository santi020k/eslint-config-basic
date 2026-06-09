import type PluginJest from 'eslint-plugin-jest'

import { defineLazyConfig, loadDefault } from '../lazy.js'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Jest ESLint configuration
 * Provides linting rules for Jest test files
 */
export const jest: Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('jest', async () => {
  const pluginJest = await loadDefault<typeof PluginJest>('eslint-plugin-jest')

  return [
    {
      files: [
        '**/*.test.{js,ts,jsx,tsx}',
        '**/*.spec.{js,ts,jsx,tsx}',
        '**/__tests__/**/*.{js,ts,jsx,tsx}'
      ],
      name: 'integrations/jest',
      plugins: {
        jest: pluginJest
      },
      rules: {
        ...pluginJest.configs['flat/recommended'].rules
      }
    }
  ]
})
