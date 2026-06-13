import { GLOB_JS_TS, GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'
import pluginTurbo from 'eslint-plugin-turbo'

/**
 * Turborepo ESLint configuration
 * Validates process.env usage against turbo.json
 */
export const turbo = (): TSESLint.FlatConfig.ConfigArray => [
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
