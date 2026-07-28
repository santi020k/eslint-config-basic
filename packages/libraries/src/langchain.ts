import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * LangChain.js ESLint configuration.
 */
export const langchain = (): TSESLint.FlatConfig.ConfigArray => [
  {
    files: GLOB_JS_TS_ALL,
    name: 'eslint-config-integrations/langchain',
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: [
              'langchain/dist/*',
              'langchain/dist/**',
              'langchain/src/*',
              'langchain/src/**',
              '@langchain/*/dist/*',
              '@langchain/*/dist/**',
              '@langchain/*/src/*',
              '@langchain/*/src/**'
            ],
            message: 'Import LangChain APIs from documented package entry points (e.g. "@langchain/core/messages") instead of source or distribution internals.'
          }
        ]
      }]
    }
  }
]
