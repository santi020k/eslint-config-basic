import pluginAngular from '@angular-eslint/eslint-plugin'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Angular ESLint configuration
 * Extends @angular-eslint recommended rules
 */
export const angularConfig: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config-angular/rules',
    files: ['**/*.ts'],
    plugins: {
      '@angular-eslint': pluginAngular
    },
    rules: {
      '@angular-eslint/component-class-suffix': 'error',
      '@angular-eslint/directive-class-suffix': 'error',
      '@angular-eslint/no-empty-lifecycle-method': 'warn',
      '@angular-eslint/no-output-native': 'warn',
      '@angular-eslint/use-lifecycle-interface': 'warn',
      '@angular-eslint/use-pipe-transform-interface': 'error'
    }
  }
]
