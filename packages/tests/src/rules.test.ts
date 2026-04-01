import { describe, expect, it } from 'vitest'

import { coreConfig, rules } from '@santi020k/eslint-config-core'
import { reactConfig } from '@santi020k/eslint-config-react'
import { typescriptConfig } from '@santi020k/eslint-config-typescript'
import { getEffectiveRuleValue } from './test-utils.js'

describe('Core Rules', () => {
  it('should export rules object', () => {
    expect(typeof rules).toBe('object')
  })

  it('should include expected core rules', () => {
    // Check for actual rules exported from the core package
    expect(rules['@stylistic/indent']).toBeDefined()
    expect(rules['@stylistic/quotes']).toBeDefined()
  })

  it('should have correct effective values for core rules', () => {
    expect(getEffectiveRuleValue(coreConfig, '@stylistic/semi')).toEqual(['warn', 'never'])
    expect(getEffectiveRuleValue(coreConfig, '@stylistic/quotes')).toEqual(['warn', 'single'])
    expect(getEffectiveRuleValue(coreConfig, 'no-unused-vars')).toBeDefined()
  })

  it('should have config with stylistic rules', () => {
    const stylisticConfig = coreConfig.find(c => c.name === 'stylistic/recommended')
    expect(stylisticConfig).toBeDefined()
  })

  it('should have config with plugins', () => {
    const pluginsConfig = coreConfig.find(c => c.name === 'eslint-config/core-plugins')
    expect(pluginsConfig).toBeDefined()
  })
})

describe('TypeScript Rules', () => {
  it('should include TypeScript parser configuration', () => {
    const tsConfig = typescriptConfig.find(c => c.languageOptions?.parser)
    expect(tsConfig).toBeDefined()
  })

  it('should target TypeScript files', () => {
    const hasTypeScriptFiles = typescriptConfig.some(c => c.files?.some(pattern => typeof pattern === 'string' && pattern.includes('.ts')))
    expect(hasTypeScriptFiles).toBe(true)
  })

  it('should have correct effective values for TS rules', () => {
    // Note: Since we are using typescriptConfig directly, we can check its rules
    expect(getEffectiveRuleValue(typescriptConfig, '@typescript-eslint/no-explicit-any')).toBeDefined()
  })
})

describe('React Rules', () => {
  it('should include React plugin configuration', () => {
    const hasReactPlugin = reactConfig.some(c => c.plugins && ('react' in c.plugins || 'react-hooks' in c.plugins))
    expect(hasReactPlugin).toBe(true)
  })

  it('should have React version detection setting', () => {
    const hasReactSettings = reactConfig.some(c => (c.settings?.react as { version?: string } | undefined)?.version === 'detect')
    expect(hasReactSettings).toBe(true)
  })

  it('should have React Hooks rules enabled', () => {
    expect(getEffectiveRuleValue(reactConfig, 'react-hooks/rules-of-hooks')).toBe('error')
    expect(getEffectiveRuleValue(reactConfig, 'react-hooks/exhaustive-deps')).toBe('warn')
  })
})
