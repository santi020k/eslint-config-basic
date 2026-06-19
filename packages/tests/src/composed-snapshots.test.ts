import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig, Extension, Format, Library, Preset, Runtime, Setting, Testing, Tool } from '@santi020k/eslint-config-basic'

import { describe, expect, test } from 'vitest'

import { extractConfigNames, getEffectiveRuleValue } from './test-utils.js'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../../..')

const summarizeConfig = async (options: Parameters<typeof defineConfig>[0]) => {
  const config = await defineConfig(options)

  return {
    names: extractConfigNames(config),
    rules: {
      '@next/next/no-html-link-for-pages': getEffectiveRuleValue(config, '@next/next/no-html-link-for-pages'),
      '@typescript-eslint/no-explicit-any': getEffectiveRuleValue(config, '@typescript-eslint/no-explicit-any'),
      'no-console': getEffectiveRuleValue(config, 'no-console'),
      'prettier/prettier': getEffectiveRuleValue(config, 'prettier/prettier'),
      'simple-import-sort/imports': getEffectiveRuleValue(config, 'simple-import-sort/imports')
    }
  }
}

describe('composed config snapshots', () => {
  test('snapshots the default no-detection JavaScript config', async () => {
    await expect(summarizeConfig({
      detection: false,
      settings: [Setting.NoGitignore],
      tools: []
    })).resolves.toMatchSnapshot()
  })

  test('snapshots TypeScript syntax mode with Prettier last', async () => {
    await expect(summarizeConfig({
      detection: false,
      settings: [Setting.NoGitignore],
      tools: [Tool.Prettier],
      typescript: 'syntax'
    })).resolves.toMatchSnapshot()
  })

  test('snapshots React app integrations', async () => {
    await expect(summarizeConfig({
      detection: false,
      extensions: [Extension.Boundaries],
      formats: [Format.Mdx],
      frameworks: { react: true },
      libraries: [Library.Tailwind],
      settings: [Setting.NoGitignore],
      testing: [Testing.Vitest],
      tools: [Tool.Prettier],
      typescript: 'syntax'
    })).resolves.toMatchSnapshot()
  })

  test('snapshots Next.js app router overrides', async () => {
    await expect(summarizeConfig({
      detection: false,
      frameworks: {
        next: true,
        react: true
      },
      nextMode: 'app-router',
      settings: [Setting.NoGitignore],
      tools: [],
      typescript: false
    })).resolves.toMatchSnapshot()
  })

  test('snapshots monorepo project scoping', async () => {
    await expect(summarizeConfig({
      detection: false,
      preset: Preset.Monorepo,
      projects: {
        'apps/api': {
          detection: false,
          preset: Preset.Library,
          runtime: Runtime.Node,
          settings: [Setting.NoGitignore],
          tools: [],
          tsconfigRootDir: repoRoot
        },
        'apps/web': {
          detection: false,
          frameworks: { react: true },
          preset: Preset.App,
          settings: [Setting.NoGitignore],
          tools: [],
          tsconfigRootDir: repoRoot
        }
      },
      settings: [Setting.NoGitignore],
      tools: []
    })).resolves.toMatchSnapshot()
  })
})
