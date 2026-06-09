import { groups } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Astro-specific ESLint options
 */
export interface AstroOptions {

  [key: string]: unknown

  /** If true, includes React-specific overrides for .astro files */
  hasReact?: boolean

  /** If true, includes SolidJS-specific sorting groups and JSX overrides */
  hasSolid?: boolean

  /** If true, includes Svelte-specific sorting groups */
  hasSvelte?: boolean

  /** If true, includes Vue-specific sorting groups */
  hasVue?: boolean

  /**
   * Optional tsconfig root passed through from the main config composer.
   * This keeps Astro parser project lookup stable when projectService is disabled.
   */
  tsconfigRootDir?: string
}

/**
 * Generates Astro-specific rules based on enabled frameworks
 */
export const getRules = (options: AstroOptions = {}): TSESLint.Linter.RulesRecord => {
  const {
    hasReact = false,
    hasSolid = false,
    hasSvelte = false,
    hasVue = false
  } = options

  const frameworkGroups: string[][] = []

  if (hasReact) {
    frameworkGroups.push(['^react', '^react-dom'])
  }

  if (hasSolid) {
    frameworkGroups.push(['^solid-js'])
  }

  if (hasVue) {
    frameworkGroups.push(['^vue'])
  }

  if (hasSvelte) {
    frameworkGroups.push(['^svelte'])
  }

  const baseRules: TSESLint.Linter.RulesRecord = {
    '@stylistic/comma-dangle': ['warn', 'never'],
    '@stylistic/jsx-indent': 'off',
    '@stylistic/jsx-indent-props': 'off',
    '@stylistic/jsx-one-expression-per-line': 'off',
    '@stylistic/jsx-tag-spacing': 'off',
    '@stylistic/quote-props': ['warn', 'as-needed'],
    // Astro template expressions can confuse this rule in otherwise valid markup.
    '@typescript-eslint/no-unsafe-return': 'off',
    // Disable rules that conflict with Astro's template syntax or are handled by the parser
    'no-unused-vars': 'off',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ...frameworkGroups,
          ['^(astro)(/.*|$)?'],
          ...groups
        ]
      }
    ]
  }

  // JSX-specific rules shared by React and Solid when used in .astro files
  const jsxRules: TSESLint.Linter.RulesRecord = (hasReact || hasSolid) ?
    {
      'react/destructuring-assignment': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.astro'] }],
      'react/jsx-key': 'off',
      'react/jsx-no-undef': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-unescaped-entities': 'off',
      'react/no-unknown-property': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off'
    } :
    {}

  return {
    ...baseRules,
    ...jsxRules
  }
}

// Legacy export for backwards compatibility (defaults to no frameworks for safety)
export const rules = getRules()
