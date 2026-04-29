import type PluginJest from 'eslint-plugin-jest'

import { defineLazyConfig, loadDefault } from '../lazy.js'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Jest ESLint configuration
 * Provides linting rules for Jest test files
 */
export const jest: TSESLint.FlatConfig.ConfigArray = defineLazyConfig('jest', () => {
  const pluginJest = loadDefault<typeof PluginJest>('eslint-plugin-jest')

  return [
    {
      name: 'optionals/jest',
      files: [
        '**/*.test.{js,ts,jsx,tsx}',
        '**/*.spec.{js,ts,jsx,tsx}',
        '**/__tests__/**/*.{js,ts,jsx,tsx}'
      ],
      plugins: {
        jest: pluginJest
      },
      rules: {
        ...pluginJest.configs['flat/recommended'].rules
      }
    }
  ]
})
