import {
  defineConfig,
  type DetectedFrameworkName,
  type EslintConfigOptions,
  Extension,
  Format,
  Library,
  Testing,
  Tool
} from '@santi020k/eslint-config-basic'

import { describe, expect, test } from 'vitest'

const noDetectRootDir = '/__eslint-config-basic_contract_tests_no_detect__'

const createBaseOptions = (): EslintConfigOptions => ({
  autoFrameworks: false,
  detection: false,
  detectRootDir: noDetectRootDir,
  extensions: [],
  formats: [],
  frameworks: {},
  libraries: [],
  optionMergeStrategy: 'replace',
  testing: [],
  tools: [],
  typescript: false
})

const countConfigs = async (options: EslintConfigOptions): Promise<number> => (await defineConfig(options)).length

describe('eslintConfig enum contracts', () => {
  test('maps all library enums to optional configs', async () => {
    const baseLength = await countConfigs(createBaseOptions())

    for (const library of Object.values(Library)) {
      const configLength = await countConfigs({
        ...createBaseOptions(),
        libraries: [library]
      })

      expect(configLength, `Library "${library}" is not mapped`).toBeGreaterThan(baseLength)
    }
  })

  test('maps all testing enums to optional configs', async () => {
    const baseLength = await countConfigs(createBaseOptions())

    for (const testing of Object.values(Testing)) {
      const configLength = await countConfigs({
        ...createBaseOptions(),
        testing: [testing]
      })

      expect(configLength, `Testing "${testing}" is not mapped`).toBeGreaterThan(baseLength)
    }
  })

  test('maps all format enums to optional configs', async () => {
    const baseLength = await countConfigs(createBaseOptions())

    for (const format of Object.values(Format)) {
      const configLength = await countConfigs({
        ...createBaseOptions(),
        formats: [format]
      })

      expect(configLength, `Format "${format}" is not mapped`).toBeGreaterThan(baseLength)
    }
  })

  test('maps all extension enums to optional configs', async () => {
    const baseLength = await countConfigs(createBaseOptions())

    for (const extension of Object.values(Extension)) {
      const configLength = await countConfigs({
        ...createBaseOptions(),
        extensions: [extension]
      })

      expect(configLength, `Extension "${extension}" is not mapped`).toBeGreaterThan(baseLength)
    }
  })

  test('maps all tool enums to optional configs', async () => {
    const baseLength = await countConfigs(createBaseOptions())

    for (const tool of Object.values(Tool)) {
      const configLength = await countConfigs({
        ...createBaseOptions(),
        tools: [tool]
      })

      expect(configLength, `Tool "${tool}" is not mapped`).toBeGreaterThan(baseLength)
    }
  })
})

describe('eslintConfig framework contracts', () => {
  const frameworkNames: DetectedFrameworkName[] = [
    'react',
    'next',
    'astro',
    'expo',
    'vue',
    'svelte',
    'solid',
    'angular',
    'nest',
    'hono',
    'qwik',
    'remix',
    'react-router',
    'tanstack-start',
    'nuxt',
    'lit',
    'preact',
    'slidev',
    'vite'
  ]

  test('resolves all framework flags through bundled resolvers', async () => {
    const baseLength = await countConfigs(createBaseOptions())

    for (const frameworkName of frameworkNames) {
      const frameworkConfig = {
        [frameworkName]: true
      } as EslintConfigOptions['frameworks']

      const configLength = await countConfigs({
        ...createBaseOptions(),
        frameworks: frameworkConfig
      })

      expect(configLength, `Framework "${frameworkName}" is not mapped`).toBeGreaterThan(baseLength)
    }
  })
})
