import { describe, expect, it } from 'vitest'

import { extractConfigNames, extractRuleNames } from './test-utils.js'

import angular from '@santi020k/eslint-config-angular'
import { eslintConfig, Extension, Format, Library, Testing, Tool } from '@santi020k/eslint-config-basic'
import qwik from '@santi020k/eslint-config-qwik'
import react from '@santi020k/eslint-config-react'
import svelte from '@santi020k/eslint-config-svelte'
import vue from '@santi020k/eslint-config-vue'

describe('Deep Rule Assertions (#5)', () => {
  it('should include React-specific rules when React is enabled', () => {
    const config = eslintConfig({ frameworks: { react } })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('react/jsx-pascal-case')

    expect(rules).toContain('react/self-closing-comp')

    expect(rules).toContain('react-hooks/exhaustive-deps')
  })

  it('should include TypeScript rules when typescript is enabled', () => {
    const config = eslintConfig({ typescript: true })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('@typescript-eslint/no-explicit-any')

    expect(rules).toContain('@typescript-eslint/no-unused-vars')
  })

  it('should include core stylistic rules in all configs', () => {
    const config = eslintConfig({})
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('@stylistic/indent')

    expect(rules).toContain('@stylistic/quotes')

    expect(rules).toContain('@stylistic/semi')
  })

  it('should include config entry names', () => {
    const config = eslintConfig({ typescript: true })
    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names).toContain('@eslint/js/recommended')

    expect(names).toContain('eslint-config-typescript/standard-rules')
  })

  it('should NOT include React rules when only typescript is enabled', () => {
    const config = eslintConfig({ typescript: true })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).not.toContain('react/jsx-pascal-case')

    expect(rules).not.toContain('react-hooks/exhaustive-deps')
  })

  it('should include unicorn rules when Unicorn optional is enabled', () => {
    const config = eslintConfig({
      extensions: [Extension.Unicorn]
    })

    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('unicorn/better-regex')

    expect(rules).toContain('unicorn/prefer-array-flat-map')
  })

  it('should include sonarjs rules when Sonarjs optional is enabled', () => {
    const config = eslintConfig({
      extensions: [Extension.Sonarjs]
    })

    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('sonarjs/no-duplicate-string')

    expect(rules).toContain('sonarjs/cognitive-complexity')
  })

  it('should include prettier config when Prettier optional is enabled', () => {
    const config = eslintConfig({
      tools: [Tool.Prettier]
    })

    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names).toContain('eslint-config/prettier')
  })

  it('should include regexp rules when Regexp optional is enabled', () => {
    const config = eslintConfig({
      extensions: [Extension.Regexp]
    })

    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('regexp/no-super-linear-backtracking')

    expect(rules).toContain('regexp/no-useless-escape')
  })

  it('should include Vue rules when Vue is enabled', () => {
    const config = eslintConfig({ frameworks: { vue } })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('vue/multi-word-component-names')

    expect(rules).toContain('vue/html-self-closing')
  })

  it('should include playwright rules when Playwright optional is enabled', () => {
    const config = eslintConfig({
      testing: [Testing.Playwright]
    })

    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names).toContain('optionals/playwright')
  })
})

describe('Framework Rule Assertions — Svelte, Angular, Qwik', () => {
  it('should include Svelte-specific rules when Svelte is enabled', () => {
    const config = eslintConfig({ frameworks: { svelte } })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('svelte/no-at-html-tags')

    expect(rules).toContain('svelte/require-each-key')
  })

  it('should include Angular-specific rules when Angular is enabled', () => {
    const config = eslintConfig({ frameworks: { angular } })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('@angular-eslint/component-class-suffix')

    expect(rules).toContain('@angular-eslint/directive-class-suffix')

    expect(rules).toContain('@angular-eslint/no-empty-lifecycle-method')
  })

  it('should include Qwik-specific rules when Qwik is enabled', () => {
    const config = eslintConfig({ frameworks: { qwik } })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('qwik/valid-lexical-scope')

    expect(rules).toContain('qwik/use-method-usage')

    expect(rules).toContain('qwik/no-react-props')
  })

  it('should NOT include Svelte rules when Svelte is not enabled', () => {
    const config = eslintConfig({ typescript: true })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).not.toContain('svelte/no-at-html-tags')
  })

  it('should NOT include Angular rules when Angular is not enabled', () => {
    const config = eslintConfig({ typescript: true })
    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).not.toContain('@angular-eslint/component-class-suffix')
  })
})

describe('Optional Rule Assertions — Testing', () => {
  it('should include Jest rules when Jest optional is enabled', () => {
    const config = eslintConfig({
      testing: [Testing.Jest]
    })

    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names).toContain('optionals/jest')
  })

  it('should include Cypress rules when Cypress optional is enabled', () => {
    const config = eslintConfig({
      testing: [Testing.Cypress]
    })

    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names).toContain('optionals/cypress')
  })

  it('should include Testing Library rules when TestingLibrary optional is enabled', () => {
    const config = eslintConfig({
      testing: [Testing.TestingLibrary]
    })

    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('testing-library/await-async-queries')

    expect(rules).toContain('testing-library/no-debugging-utils')
  })

  it('should include all testing optionals simultaneously', () => {
    const config = eslintConfig({
      testing: [Testing.Vitest, Testing.Jest, Testing.Playwright, Testing.Cypress, Testing.TestingLibrary]
    })

    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names).toContain('optionals/jest')
    expect(names).toContain('optionals/cypress')
    expect(names).toContain('optionals/playwright')
    expect(names).toContain('optionals/testing-library')
  })
})

describe('Optional Rule Assertions — Libraries', () => {
  it('should include tailwind config when Tailwind library is enabled', () => {
    const config = eslintConfig({
      libraries: [Library.Tailwind]
    })

    const rules = extractRuleNames(config as Record<string, unknown>[])

    // better-tailwindcss plugin is used; check for one of its rules
    expect(rules.some(r => r.startsWith('better-tailwindcss/'))).toBe(true)
  })

  it('should include i18next rules when i18next library is enabled', () => {
    const config = eslintConfig({
      libraries: [Library.I18next]
    })

    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('i18next/no-literal-string')
  })

  it('should include TanStack Router rules when TanstackRouter library is enabled', () => {
    const config = eslintConfig({
      libraries: [Library.TanstackRouter]
    })

    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names.some(n => n.toLowerCase().includes('tanstack'))).toBe(true)
  })

  it('should include Storybook config when Storybook library is enabled', () => {
    const config = eslintConfig({
      libraries: [Library.Storybook]
    })

    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names.some(n => n.toLowerCase().includes('storybook'))).toBe(true)
  })

  it('should include Stencil rules when Stencil library is enabled', () => {
    const config = eslintConfig({
      libraries: [Library.Stencil]
    })

    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('@stencil-community/async-methods')
  })

  it('should include TanStack Query rules when TanstackQuery library is enabled', () => {
    const config = eslintConfig({
      libraries: [Library.TanstackQuery]
    })

    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules.some(r => r.startsWith('@tanstack/query/'))).toBe(true)
  })
})

describe('Optional Rule Assertions — Tools', () => {
  it('should include CSpell rules when CSpell tool is enabled', () => {
    const config = eslintConfig({
      tools: [Tool.Cspell]
    })

    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('@cspell/spellchecker')
  })

  it('should include JSDoc rules when Jsdoc tool is enabled', () => {
    const config = eslintConfig({
      tools: [Tool.Jsdoc]
    })

    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('jsdoc/check-access')
  })

  it('should include Swagger rules when Swagger tool is enabled', () => {
    const config = eslintConfig({
      tools: [Tool.Swagger]
    })

    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names.some(n => n.toLowerCase().includes('swagger'))).toBe(true)
  })
})

describe('Optional Rule Assertions — Formats', () => {
  it('should include YAML rules when Yaml format is enabled', () => {
    const config = eslintConfig({
      formats: [Format.Yaml]
    })

    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('yml/no-empty-mapping-value')
  })

  it('should include JSONC rules when Jsonc format is enabled', () => {
    const config = eslintConfig({
      formats: [Format.Jsonc]
    })

    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('jsonc/sort-keys')
  })

  it('should include Markdown rules when Markdown format is enabled', () => {
    const config = eslintConfig({
      formats: [Format.Markdown]
    })

    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('markdown/fenced-code-language')

    expect(rules).toContain('markdown/no-empty-links')
  })

  it('should include MDX config when Mdx format is enabled', () => {
    const config = eslintConfig({
      formats: [Format.Mdx]
    })

    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names.some(n => n.toLowerCase().includes('mdx'))).toBe(true)
  })

  it('should include TOML config when Toml format is enabled', () => {
    const config = eslintConfig({
      formats: [Format.Toml]
    })

    const rules = extractRuleNames(config as Record<string, unknown>[])

    // eslint-plugin-toml rules use the 'toml/' prefix
    expect(rules.some(r => r.startsWith('toml/'))).toBe(true)
  })

  it('should include GraphQL config when Graphql format is enabled', () => {
    const config = eslintConfig({
      formats: [Format.Graphql]
    })

    const names = extractConfigNames(config as Record<string, unknown>[])

    expect(names).toContain('optionals/graphql/schema')

    expect(names).toContain('optionals/graphql/operations')
  })
})

describe('Optional Rule Assertions — Extensions', () => {
  it('should include Perfectionist rules when Perfectionist extension is enabled', () => {
    const config = eslintConfig({
      extensions: [Extension.Perfectionist]
    })

    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('perfectionist/sort-imports')
  })

  it('should include Security rules when Security extension is enabled', () => {
    const config = eslintConfig({
      extensions: [Extension.Security]
    })

    const rules = extractRuleNames(config as Record<string, unknown>[])

    expect(rules).toContain('security/detect-object-injection')
  })
})
