import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Mastra agent framework ESLint configuration.
 */
export const mastra = (): TSESLint.FlatConfig.ConfigArray => [
  {
    files: GLOB_JS_TS_ALL,
    name: 'eslint-config-integrations/mastra',
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: [
              '@mastra/*/dist/*',
              '@mastra/*/dist/**',
              '@mastra/*/src/*',
              '@mastra/*/src/**',
              '@mastra/core/dist/*',
              '@mastra/core/dist/**',
              '@mastra/core/src/*',
              '@mastra/core/src/**'
            ],
            message: 'Import Mastra APIs from documented package entry points instead of source or distribution internals.'
          }
        ]
      }]
    }
  }
]
