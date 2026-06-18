import {
  defineConfig,
  type Extension,
  type Format,
  type Library,
  Preset,
  Runtime,
  type Testing,
  type Tool
} from '@santi020k/eslint-config-lite'

import { describe, expect, test } from 'vitest'

const noDetectRootDir = '/__eslint-config-basic_lite_tests_no_detect__'

const baseOptions = {
  autoFrameworks: false,
  detection: false,
  detectRootDir: noDetectRootDir,
  extensions: [] as Extension[],
  formats: [] as Format[],
  frameworks: {},
  libraries: [] as Library[],
  optionMergeStrategy: 'replace' as const,
  testing: [] as Testing[],
  tools: [] as Tool[],
  typescript: false
}

const getRuleValues = (config: Awaited<ReturnType<typeof defineConfig>>) => (
  config
    .filter(c => 'rules' in c && c.rules)
    .flatMap(c => Object.values(c.rules ?? {}))
)

describe('resolvePreset', () => {
  test.each([
    Preset.All,
    Preset.App,
    Preset.Basic,
    Preset.Browser,
    Preset.CI,
    Preset.Library,
    Preset.Monorepo,
    Preset.Node,
    Preset.Worker
  ])('resolves %s preset without error', async preset => {
    const config = await defineConfig({ ...baseOptions, preset })
    expect(Array.isArray(config)).toBe(true)
    expect(config.length).toBeGreaterThan(0)
  })
})

describe('resolveFramework', () => {
  test('handles an empty config array directly', async () => {
    const config = await defineConfig({ ...baseOptions, frameworks: { vite: [] } })
    expect(Array.isArray(config)).toBe(true)
  })

  test('handles a non-empty config array directly', async () => {
    const marker = { files: ['**/__lite_array_test__.js'], rules: {} }
    const config = await defineConfig({ ...baseOptions, frameworks: { vite: [marker] } })
    expect(config).toContainEqual(expect.objectContaining({ files: ['**/__lite_array_test__.js'] }))
  })

  test('calls a sync factory function', async () => {
    const marker = { files: ['**/__lite_factory_test__.js'], rules: {} }
    const config = await defineConfig({ ...baseOptions, frameworks: { vite: () => [marker] } })
    expect(config).toContainEqual(expect.objectContaining({ files: ['**/__lite_factory_test__.js'] }))
  })

  test('calls an async factory function', async () => {
    const marker = { files: ['**/__lite_async_factory_test__.js'], rules: {} }
    const config = await defineConfig({ ...baseOptions, frameworks: { vite: async () => [marker] } })
    expect(config).toContainEqual(expect.objectContaining({ files: ['**/__lite_async_factory_test__.js'] }))
  })

  test('calls a default-export factory function', async () => {
    const marker = { files: ['**/__lite_default_fn_test__.js'], rules: {} }
    const mod = { default: () => [marker] }
    const config = await defineConfig({ ...baseOptions, frameworks: { vue: mod as unknown as typeof mod.default } })
    expect(config).toContainEqual(expect.objectContaining({ files: ['**/__lite_default_fn_test__.js'] }))
  })

  test('returns a default-export config array', async () => {
    const marker = { files: ['**/__lite_default_arr_test__.js'], rules: {} }
    const mod = { default: [marker] }
    const config = await defineConfig({ ...baseOptions, frameworks: { vue: mod as unknown as typeof mod.default } })
    expect(config).toContainEqual(expect.objectContaining({ files: ['**/__lite_default_arr_test__.js'] }))
  })

  test('loads a bundled config via true', async () => {
    const config = await defineConfig({ ...baseOptions, frameworks: { vite: true } })
    expect(Array.isArray(config)).toBe(true)
    expect(config.length).toBeGreaterThan(0)
  })
})

describe('applyStrictMode via defineConfig', () => {
  test('strict true escalates warn to error', async () => {
    const config = await defineConfig({ ...baseOptions, strict: true })
    const values = getRuleValues(config)
    expect(values).not.toContain('warn')
    expect(values).not.toContain(1)
  })

  test('strict ci escalates warn to error', async () => {
    const config = await defineConfig({ ...baseOptions, strict: 'ci' })
    const values = getRuleValues(config)
    expect(values).not.toContain('warn')
  })

  test('strict pedantic escalates warn to error', async () => {
    const config = await defineConfig({ ...baseOptions, strict: 'pedantic' })
    const values = getRuleValues(config)
    expect(values).not.toContain('warn')
  })

  test('strict recommended leaves rules unchanged', async () => {
    const config = await defineConfig({ ...baseOptions, strict: 'recommended' })
    expect(config.length).toBeGreaterThan(0)
  })

  test('config items without rules are passed through unchanged', async () => {
    const config = await defineConfig({ ...baseOptions, strict: true })
    const noRuleEntries = config.filter(c => !('rules' in c) || !c.rules)
    expect(noRuleEntries.length).toBeGreaterThan(0)
  })

  test('array-style warn rules like ["warn", opts] are escalated to error', async () => {
    const config = await defineConfig({ ...baseOptions, strict: true })
    const arrayWarnRules = config
      .filter(c => 'rules' in c && c.rules)
      .flatMap(c => Object.values(c.rules ?? {}))
      .filter(r => Array.isArray(r) && (r[0] === 'warn' || r[0] === 1))
    expect(arrayWarnRules).toHaveLength(0)
  })
})

describe('defineConfig with runtime', () => {
  test('Node runtime resolves correctly', async () => {
    const config = await defineConfig({ ...baseOptions, runtime: Runtime.Node })
    expect(Array.isArray(config)).toBe(true)
  })

  test('Browser runtime resolves correctly', async () => {
    const config = await defineConfig({ ...baseOptions, runtime: Runtime.Browser })
    expect(Array.isArray(config)).toBe(true)
  })
})
