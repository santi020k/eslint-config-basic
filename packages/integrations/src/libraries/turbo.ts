import { GLOB_JS_TS, GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'

import type { TSESLint } from '@typescript-eslint/utils'
import type PluginTurbo from 'eslint-plugin-turbo'

import { defineLazyConfig, loadDefault } from '../lazy.js'

/**
 * Turborepo ESLint configuration
 * Validates process.env usage against turbo.json
 */
export const turbo: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('turbo', async () => {
  const pluginTurbo = await loadDefault<typeof PluginTurbo>('eslint-plugin-turbo')

  return [
    {
      files: GLOB_JS_TS_ALL,
      name: 'eslint-config-turbo/plugins',
      plugins: {
        turbo: pluginTurbo
      }
    },
    {
      files: GLOB_JS_TS,
      name: 'eslint-config-turbo/rules',
      rules: {
        'turbo/no-undeclared-env-vars': 'error'
      }
    }
  ]
})
