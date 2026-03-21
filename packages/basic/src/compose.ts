import type { FlatConfigArray } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Applies strict mode by promoting all 'warn' rules to 'error'.
 */
export const applyStrictMode = (configs: FlatConfigArray, strict: boolean): FlatConfigArray => {
  if (!strict) return configs

  return configs.map((config: TSESLint.FlatConfig.Config) => {
    if (config.rules) {
      const strictRules: TSESLint.FlatConfig.Rules = Object.fromEntries(
        Object.entries(config.rules).map(([key, value]) => {
          if (value === 'warn') return [key, 'error']

          return [key, value]
        })
      )

      return { ...config, rules: strictRules }
    }

    return config
  }) as FlatConfigArray
}

/**
 * Returns global overrides for non-TS files to prevent typed rules errors (#15).
 */
export const getTypedRulesOverrides = (): TSESLint.FlatConfig.Config => ({
  name: 'eslint-config-basic/typed-rules-overrides',
  files: [
    '**/*.js',
    '**/*.jsx',
    '**/*.mjs',
    '**/*.cjs',
    '**/*.md',
    '**/*.mdx',
    '**/*.astro/*.js',
    '**/*.astro/*.ts'
  ],
  rules: {
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/require-await': 'off'
  }
} as TSESLint.FlatConfig.Config)
