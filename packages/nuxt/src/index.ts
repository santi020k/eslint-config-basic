import { getGlobalsForRuntime, GLOB_JS_TS, GLOB_VUE, Runtime } from '@santi020k/eslint-config-core'

import pluginNuxt from '@nuxt/eslint-plugin'
import type { TSESLint } from '@typescript-eslint/utils'

const NUXT_SERVER_FILES = [
  '**/server/**/*.{js,mjs,cjs,ts,mts,cts}',
  '**/nuxt.config.{js,mjs,cjs,ts,mts,cts}'
]

/**
 * Nuxt ESLint configuration
 * Adds Nuxt-specific rules from `@nuxt/eslint-plugin`. Pair it with the Vue
 * config (auto-detection enables both when Nuxt is detected).
 */
export const nuxt: TSESLint.FlatConfig.ConfigArray = [
  {
    files: [...GLOB_JS_TS, ...GLOB_VUE],
    name: 'eslint-config-nuxt/rules',
    plugins: {
      nuxt: pluginNuxt as unknown as TSESLint.FlatConfig.Plugins[string]
    },
    rules: {
      'nuxt/prefer-import-meta': 'error'
    }
  },
  {
    files: NUXT_SERVER_FILES,
    languageOptions: {
      globals: getGlobalsForRuntime(Runtime.Node)
    },
    name: 'eslint-config-nuxt/server-runtime'
  }
]

export default nuxt
