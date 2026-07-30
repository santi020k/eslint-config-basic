import { defineConfig, Library, Tool } from '@santi020k/eslint-config-basic'
import { describe, expect, test } from 'vitest'

import { extractConfigNames, getEffectiveRuleValue } from './test-utils.js'

describe('Configuration invariants', () => {
  test('keeps gitignore before core plugin setup', async () => {
    const names = extractConfigNames(await defineConfig({}))
    const gitignoreIndex = names.findIndex(name => name.includes('gitignore'))
    const corePluginsIndex = names.indexOf('eslint-config/core-plugins')

    expect(gitignoreIndex).toBeGreaterThanOrEqual(0)
    expect(corePluginsIndex).toBeGreaterThanOrEqual(0)
    expect(gitignoreIndex).toBeLessThan(corePluginsIndex)
  })

  test('keeps prettier as the final config block when enabled', async () => {
    const names = extractConfigNames(await defineConfig({
      libraries: [Library.Tailwind],
      tools: [Tool.Prettier]
    }))

    expect(names.at(-1)).toBe('eslint-config/prettier')
  })

  test('places typescript setup after core config blocks', async () => {
    const names = extractConfigNames(await defineConfig({ typescript: true }))
    const corePluginsIndex = names.indexOf('eslint-config/core-plugins')
    const tsSetupIndex = names.indexOf('eslint-config-typescript/setup')

    expect(corePluginsIndex).toBeGreaterThanOrEqual(0)
    expect(tsSetupIndex).toBeGreaterThanOrEqual(0)
    expect(corePluginsIndex).toBeLessThan(tsSetupIndex)
  })

  test('promotes warning-level rules to errors when strict mode is enabled', async () => {
    const config = await defineConfig({
      frameworks: {
        react: [
          {
            name: 'strict-fixture',
            rules: { 'no-console': 'warn' }
          }
        ]
      },
      strict: true
    })

    expect(getEffectiveRuleValue(config, 'no-console')).toBe('error')
  })
})
