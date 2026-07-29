import { GLOB_TS } from '@santi020k/eslint-config-core'

import type NestjsTyped from '@darraghor/eslint-plugin-nestjs-typed'
import type { TSESLint } from '@typescript-eslint/utils'

import { defineLazyConfig, loadModule } from './lazy.js'

/**
 * Swagger/NestJS documentation ESLint configuration
 * Provides rules from the nestjs-typed plugin for Swagger decorator validation
 */
export const swagger: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('swagger', async () => {
  const { plugin: nestjsTypedPlugin } = await loadModule<typeof NestjsTyped>('@darraghor/eslint-plugin-nestjs-typed')

  return [
    {
      files: GLOB_TS,
      name: 'integrations/swagger',
      plugins: {
        '@darraghor/nestjs-typed': nestjsTypedPlugin
      },
      rules: {
        '@darraghor/nestjs-typed/api-method-should-specify-api-response': 'warn',
        '@darraghor/nestjs-typed/api-property-returning-array-should-set-array': 'warn'
      }
    }
  ]
})
