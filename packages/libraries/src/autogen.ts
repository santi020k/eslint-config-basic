import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * AutoGen SDK ESLint configuration.
 */
export const autogen = (): TSESLint.FlatConfig.ConfigArray => [
  {
    files: GLOB_JS_TS_ALL,
    name: 'eslint-config-integrations/autogen',
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: [
              'autogen-agentchat/dist/*',
              'autogen-core/dist/*'
            ],
            message: 'Import AutoGen APIs from their designated package entry points instead of internals.'
          }
        ]
      }]
    }
  }
]
