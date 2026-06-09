import pluginVue from 'eslint-plugin-vue'

import { getGlobalsForRuntime, GLOB_JS_TS, Runtime } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

export interface SlidevConfigOptions {
  [key: string]: unknown
  runtime?: Runtime
}

/**
 * Slidev ESLint configuration for Vue-powered presentation decks.
 */
export const createSlidevConfig = (
  options: SlidevConfigOptions = {}
): TSESLint.FlatConfig.ConfigArray => {
  const runtime = options.runtime ?? Runtime.Browser

  const disabledVueMarkdownRules = Object.fromEntries(
    Object.keys(pluginVue.rules).map(ruleName => [`vue/${ruleName}`, 'off'])
  ) as TSESLint.Linter.RulesRecord

  return [
    {
      files: GLOB_JS_TS,
      languageOptions: {
        globals: getGlobalsForRuntime(runtime)
      },
      name: 'eslint-config-slidev/runtime'
    },
    {
      files: ['**/slides.md', '**/pages/**/*.md'],
      name: 'eslint-config-slidev/deck-markdown',
      rules: {
        ...disabledVueMarkdownRules,
        '@stylistic/max-len': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off'
      }
    },
    {
      files: ['**/setup/**/*.{js,mjs,cjs,ts,mts,cts}', '**/vite.config.{js,mjs,cjs,ts,mts,cts}'],
      languageOptions: {
        globals: getGlobalsForRuntime(Runtime.Node)
      },
      name: 'eslint-config-slidev/setup-files',
      rules: {
        'n/no-extraneous-import': 'off',
        'n/no-unpublished-import': 'off'
      }
    }
  ]
}

export const slidevConfig = createSlidevConfig()

export { createSlidevConfig as slidev }

export default slidevConfig
