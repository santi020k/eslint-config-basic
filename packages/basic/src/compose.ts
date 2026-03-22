import type { FlatConfigArray } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

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
export const applyStrictMode = (configs: FlatConfigArray, strict: boolean): FlatConfigArray => {
  if (!strict) return configs

  return configs.map((config: TSESLint.FlatConfig.Config) => {
    if (config.rules) {
      const strictRules = Object.fromEntries(
        Object.entries(config.rules).map(([key, value]) => [key, promoteRuleSeverity(value)])
      ) as TSESLint.FlatConfig.Rules

      return { ...config, rules: strictRules }
    }

    return config
  }) as FlatConfigArray
}

import tsEslint from 'typescript-eslint'

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
    '**/*.md/*.ts',
    '**/*.md/*.tsx',
    '**/*.mdx/*.ts',
    '**/*.mdx/*.tsx',
    '**/*.astro/*.js',
    '**/*.astro/*.ts',
    '**/*.vue/*.ts',
    '**/*.vue/*.tsx',
    '**/*.svelte/*.ts',
    '**/*.svelte/*.tsx',
    '**/.vitepress/**/*.ts',
    '**/.vitepress/**/*.mts',
    '**/.vitepress/**/*.tsx',
    '**/.vitepress/**/*.js',
    '**/.vitepress/**/*.mjs',
    '**/.vitepress/**/*.jsx'
  ],
  languageOptions: {
    parserOptions: {
      project: null,
      program: null,
      projectService: false,
      allowDefaultProject: true
    }
  },
  rules: {
    ...tsEslint.configs.disableTypeChecked.rules,
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'off'
  }
} as TSESLint.FlatConfig.Config)
