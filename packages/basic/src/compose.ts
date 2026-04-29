import type { FlatConfigArray } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

export type NormalizedStrictMode = 'recommended' | 'ci' | 'pedantic'

export const normalizeStrictMode = (strict: boolean | NormalizedStrictMode | undefined): NormalizedStrictMode => {
  if (strict === true) return 'ci'

  if (strict === 'ci' || strict === 'pedantic') return strict

  return 'recommended'
}

const promoteRuleSeverity = (
  value: TSESLint.FlatConfig.RuleEntry | undefined
): TSESLint.FlatConfig.RuleEntry | undefined => {
  if (value === undefined) return undefined

  if (value === 'warn' || value === 1) return 'error'

  if (Array.isArray(value) && (value[0] === 'warn' || value[0] === 1)) {
    return ['error', ...value.slice(1)] as TSESLint.FlatConfig.RuleEntry
  }

  return value
}

/**
 * Applies strict mode by promoting all 'warn' rules to 'error'.
 */
export const applyStrictMode = (
  configs: FlatConfigArray,
  strict: boolean | NormalizedStrictMode | undefined
): FlatConfigArray => {
  const strictMode = normalizeStrictMode(strict)

  if (strictMode === 'recommended') return configs

  return configs.map((config: TSESLint.FlatConfig.Config) => {
    if (config.rules) {
      const strictRules = Object.fromEntries(
        Object.entries(config.rules).map(([key, value]) => [key, promoteRuleSeverity(value)])
      )

      return { ...config, rules: strictRules }
    }

    return config
  })
}
