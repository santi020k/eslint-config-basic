import pluginAngular from '@angular-eslint/eslint-plugin'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Angular ESLint configuration
 * Extends @angular-eslint recommended rules
 */
export const angularConfig: TSESLint.FlatConfig.ConfigArray = [
  {
    files: ['**/*.ts'],
    name: 'eslint-config-angular/rules',
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

export default angularConfig
