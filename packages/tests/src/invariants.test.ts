import { describe, expect, it } from 'vitest'

import { extractConfigNames, getEffectiveRuleValue } from './test-utils.js'

import { eslintConfig, Library, Tool } from '@santi020k/eslint-config-basic'

describe('Configuration invariants', () => {
  it('keeps gitignore before core plugin setup', () => {
    const names = extractConfigNames(eslintConfig({}))
    const gitignoreIndex = names.findIndex(name => name.includes('gitignore'))
    const corePluginsIndex = names.indexOf('eslint-config/core-plugins')

    expect(gitignoreIndex).toBeGreaterThanOrEqual(0)
    expect(corePluginsIndex).toBeGreaterThanOrEqual(0)
    expect(gitignoreIndex).toBeLessThan(corePluginsIndex)
  })

  it('keeps prettier as the final config block when enabled', () => {
    const names = extractConfigNames(eslintConfig({
      libraries: [Library.Tailwind],
      tools: [Tool.Prettier]
    }))

    expect(names.at(-1)).toBe('eslint-config/prettier')
  })

  it('places typescript setup after core config blocks', () => {
    const names = extractConfigNames(eslintConfig({ typescript: true }))
    const corePluginsIndex = names.indexOf('eslint-config/core-plugins')
    const tsSetupIndex = names.indexOf('eslint-config-typescript/setup')

    expect(corePluginsIndex).toBeGreaterThanOrEqual(0)
    expect(tsSetupIndex).toBeGreaterThanOrEqual(0)
    expect(corePluginsIndex).toBeLessThan(tsSetupIndex)
  })

  it('promotes warning-level rules to errors when strict mode is enabled', () => {
    const config = eslintConfig({
      strict: true,
      frameworks: {
        react: [
          {
            name: 'strict-fixture',
            rules: { 'no-console': 'warn' }
          }
        ]
      }
    })

    expect(getEffectiveRuleValue(config, 'no-console')).toBe('error')
  })
})
