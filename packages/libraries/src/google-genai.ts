import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Google GenAI SDK ESLint configuration.
 */
export const googleGenAi = (): TSESLint.FlatConfig.ConfigArray => [
  {
    files: GLOB_JS_TS_ALL,
    name: 'eslint-config-integrations/google-genai',
    rules: {
      'no-restricted-imports': ['error', {
        paths: [
          {
            message: 'Use the new @google/genai SDK instead of the legacy @google/generative-ai SDK.',
            name: '@google/generative-ai'
          }
        ],
        patterns: [
          {
            group: [
              '@google/genai/dist/*',
              '@google/genai/src/*'
            ],
            message: 'Import Google GenAI SDK APIs directly from "@google/genai" instead of internals.'
          }
        ]
      }]
    }
  }
]
