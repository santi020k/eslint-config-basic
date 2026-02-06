import { describe, expect, it } from 'vitest'

import { coreConfig, rules } from '@santi020k/eslint-config-core'
import { reactConfig } from '@santi020k/eslint-config-react'
import { typescriptConfig } from '@santi020k/eslint-config-typescript'

describe('Core Rules', () => {
  it('should export rules object', () => {
    expect(typeof rules).toBe('object')
  })

  it('should include expected core rules', () => {
    // Check for actual rules exported from the core package
    expect(rules['@stylistic/indent']).toBeDefined()

    expect(rules['@stylistic/quotes']).toBeDefined()
  })

  it('should have config with stylistic rules', () => {
    const stylisticConfig = coreConfig.find(c => c.name === 'eslint-config/stylistic')

    expect(stylisticConfig).toBeDefined()
  })

  it('should have config with plugins', () => {
    const pluginsConfig = coreConfig.find(c => c.name === 'eslint-config/plugins')

    expect(pluginsConfig).toBeDefined()

    expect(pluginsConfig?.plugins).toBeDefined()
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
})
