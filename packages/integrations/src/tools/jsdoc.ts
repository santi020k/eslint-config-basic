import { defineLazyConfig, loadDefault, type PluginWithConfigs } from '../lazy.js'

import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * JSDoc ESLint configuration
 * Provides rules for TSDoc/JSDoc validation and formatting.
 */
export const jsdoc: TSESLint.FlatConfig.ConfigArray = defineLazyConfig('jsdoc', () => {
  const pluginJsdoc = loadDefault<PluginWithConfigs<'flat/recommended-error'>>('eslint-plugin-jsdoc')

  return [
    {
      files: GLOB_JS_TS,
      name: 'eslint-config-integrations/jsdoc',
      plugins: {
        jsdoc: pluginJsdoc
      },
      rules: {
        ...pluginJsdoc.configs['flat/recommended-error'].rules
      }
    }
  ]
})
