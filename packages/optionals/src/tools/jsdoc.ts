import { defineLazyConfig, loadDefault, type PluginWithConfigs } from '../lazy.js'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * JSDoc ESLint configuration
 * Provides rules for TSDoc/JSDoc validation and formatting.
 */
export const jsdoc: TSESLint.FlatConfig.ConfigArray = defineLazyConfig('jsdoc', () => {
  const pluginJsdoc = loadDefault<PluginWithConfigs<'flat/recommended-error'>>('eslint-plugin-jsdoc')

  return [
    {
      name: 'eslint-config-optionals/jsdoc',
      plugins: {
        jsdoc: pluginJsdoc
      },
      rules: {
        ...pluginJsdoc.configs['flat/recommended-error'].rules
      }
    }
  ]
})
