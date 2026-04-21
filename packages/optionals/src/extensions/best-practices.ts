import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Best-practices ESLint configuration
 *
 * Adds commonly-recommended quality rules that go beyond stylistic formatting:
 * - `no-console`    — warn when console.* calls are left in production code
 * - `no-alert`      — error on browser alert / confirm / prompt
 * - `complexity`    — warn when cyclomatic complexity exceeds 10
 * - `max-depth`     — warn when block nesting exceeds 4 levels
 *
 * All rules use built-in ESLint only; no extra dependencies are required.
 */
export const bestPractices: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config/best-practices',
    files: GLOB_JS_TS,
    rules: {

      /** Warn on console usage so developers remember to remove debug output. */
      'no-console': 'warn',

      /** Disallow browser dialogs — use proper UI instead. */
      'no-alert': 'error',

      /**
       * Warn when a function's cyclomatic complexity exceeds 10.
       * Complex functions are harder to test and understand.
       */
      complexity: ['warn', { max: 10 }],

      /**
       * Warn when blocks are nested more than 4 levels deep.
       * Deep nesting is a common sign that logic should be extracted.
       */
      'max-depth': ['warn', { max: 4 }]
    }
  }
]
