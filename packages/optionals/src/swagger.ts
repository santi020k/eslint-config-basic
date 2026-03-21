import { plugin as nestjsTypedPlugin } from '@darraghor/eslint-plugin-nestjs-typed'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Swagger/NestJS documentation ESLint configuration
 * Provides rules from the nestjs-typed plugin for Swagger decorator validation
 */
export const swagger: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'optionals/swagger',
    plugins: {
      '@darraghor/nestjs-typed': nestjsTypedPlugin as TSESLint.FlatConfig.Plugin
    },
    rules: {
      '@darraghor/nestjs-typed/api-method-should-specify-api-response': 'warn',
      '@darraghor/nestjs-typed/api-property-returning-array-should-set-array': 'warn'
    }
  }
]
