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

const buildFrameworkGroups = (
  hasReact: boolean,
  hasSolid: boolean,
  hasVue: boolean,
  hasSvelte: boolean
): string[][] => {
  const groups: string[][] = []

  if (hasReact) groups.push(['^react', '^react-dom'])

  if (hasSolid) groups.push(['^solid-js'])

  if (hasVue) groups.push(['^vue'])

  if (hasSvelte) groups.push(['^svelte'])

  return groups
}

/**
 * Generates Astro-specific rules based on enabled frameworks
 */
export const getRules = (options?: AstroOptions): TSESLint.Linter.RulesRecord => {
  const hasReact = options?.hasReact === true
  const hasSolid = options?.hasSolid === true
  const hasSvelte = options?.hasSvelte === true
  const hasVue = options?.hasVue === true
  const frameworkGroups = buildFrameworkGroups(hasReact, hasSolid, hasVue, hasSvelte)

  const baseRules: TSESLint.Linter.RulesRecord = {
    '@stylistic/comma-dangle': ['warn', 'never'],
    // The generic indent fixer treats Astro template boundaries as JavaScript
    // and can alternate closing tags with jsx-closing-tag-location.
    '@stylistic/indent': 'off',
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
      '@eslint-react/dom-no-unknown-property': 'off',
      '@eslint-react/no-missing-key': 'off'
    } :
    {}

  return {
    ...baseRules,
    ...jsxRules
  }
}
