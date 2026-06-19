import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * LlamaIndex.TS ESLint configuration.
 */
export const llamaIndex = (): TSESLint.FlatConfig.ConfigArray => [
  {
    files: GLOB_JS_TS_ALL,
    name: 'eslint-config-integrations/llamaindex',
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: [
              'llamaindex/dist/*',
              'llamaindex/dist/**',
              'llamaindex/src/*',
              'llamaindex/src/**',
              '@llamaindex/*/dist/*',
              '@llamaindex/*/dist/**',
              '@llamaindex/*/src/*',
              '@llamaindex/*/src/**'
            ],
            message: 'Import LlamaIndex APIs from documented package entry points (e.g. "llamaindex" or "@llamaindex/core") instead of source or distribution internals.'
          }
        ]
      }]
    }
  }
]
