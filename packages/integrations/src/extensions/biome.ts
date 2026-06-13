import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'

import type { TSESLint } from '@typescript-eslint/utils'
import biomeConfig from 'eslint-config-biome'

/**
 * Biome extension configurations
 * Disables rules that conflict with Biome formatting and linting.
 */
export const biome: TSESLint.FlatConfig.ConfigArray = [
  {
    files: GLOB_JS_TS_ALL,
    name: 'eslint-config-integrations/biome',
    rules: {
      ...biomeConfig.rules
    }
  }
]
