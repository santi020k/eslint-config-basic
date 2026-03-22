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
    '**/*.svelte/*.tsx'
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
