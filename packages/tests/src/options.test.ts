import angular from '@santi020k/eslint-config-angular'
import { defineConfig, Extension, Format, Library, Testing, Tool } from '@santi020k/eslint-config-basic'
import qwik from '@santi020k/eslint-config-qwik'
import react from '@santi020k/eslint-config-react'
import svelte from '@santi020k/eslint-config-svelte'
import vue from '@santi020k/eslint-config-vue'

import { describe, expect, test, vi } from 'vitest'

import { extractConfigNames, extractRuleNames, getEffectiveRuleValue } from './test-utils.js'

describe('Deep Rule Assertions (#5)', () => {
  test('should include React-specific rules when React is enabled', async () => {
    const config = await defineConfig({ frameworks: { react } })
    const rules = extractRuleNames(config)

    expect(rules).toContain('@eslint-react/dom-no-unsafe-target-blank')

    expect(rules).toContain('@eslint-react/dom-no-missing-button-type')

    expect(rules).toContain('@eslint-react/exhaustive-deps')
  })

  test('should include TypeScript rules when typescript is enabled', async () => {
    const config = await defineConfig({ frameworks: {}, typescript: true })
    const rules = extractRuleNames(config)

    expect(rules).toContain('@typescript-eslint/no-explicit-any')

    expect(rules).toContain('@typescript-eslint/no-unused-vars')
  })

  test('should include core stylistic rules in all configs', async () => {
    const config = await defineConfig({})
    const rules = extractRuleNames(config)

    expect(rules).toContain('@stylistic/indent')

    expect(rules).toContain('@stylistic/quotes')

    expect(rules).toContain('@stylistic/semi')
  })

  test('should include config entry names', async () => {
    const config = await defineConfig({ frameworks: {}, typescript: true })
    const names = extractConfigNames(config)

    expect(names).toContain('@eslint/js/recommended')

    expect(names).toContain('eslint-config-typescript/standard-rules')
  })

  test('should NOT include React rules when only typescript is enabled', async () => {
    const config = await defineConfig({ autoFrameworks: false, frameworks: {}, typescript: true })
    const rules = extractRuleNames(config)

    expect(rules).not.toContain('react/jsx-pascal-case')

    expect(rules).not.toContain('react-hooks/exhaustive-deps')
  })

  test('should include unicorn rules when Unicorn optional is enabled', async () => {
    const config = await defineConfig({
      extensions: [Extension.Unicorn]
    })

    const rules = extractRuleNames(config)

    expect(rules).toContain('unicorn/prefer-array-flat-map')
  })

  test('should include Astro Doctor rules only when the extension is enabled', async () => {
    const baseConfig = await defineConfig({
      autoFrameworks: false,
      detection: false,
      frameworks: { astro: true }
    })
    const astroDoctorConfig = await defineConfig({
      autoFrameworks: false,
      detection: false,
      extensions: [Extension.AstroDoctor],
      frameworks: { astro: true }
    })

    expect(extractRuleNames(baseConfig)).not.toContain('astro-doctor/no-client-load-overuse')
    expect(extractConfigNames(astroDoctorConfig)).toContain('eslint-config-integrations/astro-doctor')
    expect(extractRuleNames(astroDoctorConfig)).toContain('astro-doctor/no-client-load-overuse')
  })

  test('should warn when Astro Doctor is enabled without Astro', async () => {
    const warningSpy = vi.spyOn(process, 'emitWarning').mockImplementation(() => {})

    await defineConfig({
      autoFrameworks: false,
      detection: false,
      features: { 'astro-doctor': true },
      frameworks: {}
    })

    expect(warningSpy).toHaveBeenCalledWith(expect.stringContaining('Astro Doctor is enabled without the Astro framework config'))
    warningSpy.mockRestore()
  })

  test('Preset.All enables Astro Doctor and an explicit feature false disables it', async () => {
    const allConfig = await defineConfig({
      autoFrameworks: false,
      detection: false,
      frameworks: { astro: true },
      preset: 'all'
    })
    const disabledConfig = await defineConfig({
      autoFrameworks: false,
      detection: false,
      features: { 'astro-doctor': false },
      frameworks: { astro: true },
      preset: 'all'
    })

    expect(extractRuleNames(allConfig)).toContain('astro-doctor/no-client-load-overuse')
    expect(extractRuleNames(disabledConfig)).not.toContain('astro-doctor/no-client-load-overuse')
  })

  test('should accept string optional names in existing option arrays', async () => {
    const config = await defineConfig({
      extensions: ['unicorn'],
      testing: ['playwright'],
      tools: ['prettier']
    })

    const names = extractConfigNames(config)
    const rules = extractRuleNames(config)

    expect(names).toContain('integrations/playwright')
    expect(names).toContain('eslint-config/prettier')
    expect(rules).toContain('unicorn/prefer-array-flat-map')
  })

  test('should enable optional configs from the features map', async () => {
    const config = await defineConfig({
      features: {
        'astro-doctor': true,
        playwright: true,
        prettier: true,
        zod: true
      }
    })

    const names = extractConfigNames(config)

    expect(names).toContain('integrations/playwright')
    expect(names).toContain('eslint-config-integrations/astro-doctor')
    expect(names).toContain('eslint-config/prettier')
    expect(names).toContain('eslint-config-integrations/zod')
  })

  test('should allow the features map to disable detected or default optional configs', async () => {
    const config = await defineConfig({
      features: {
        prettier: false,
        unicorn: false
      }
    })

    const names = extractConfigNames(config)
    const rules = extractRuleNames(config)

    expect(names).not.toContain('eslint-config/prettier')
    expect(rules).not.toContain('unicorn/prefer-array-flat-map')
  })

  test('should include boundary rules when the Boundaries extension is enabled', async () => {
    const config = await defineConfig({
      extensions: [Extension.Boundaries]
    })

    const names = extractConfigNames(config)
    const rules = extractRuleNames(config)

    expect(names).toContain('eslint-config-integrations/import-boundaries')
    expect(rules).toContain('import/no-relative-packages')
  })

  test('should include generated-code ignores by default and allow disabling them', async () => {
    const config = await defineConfig({})
    const defaultIgnoreBlock = config.find(entry => entry.name === 'eslint-config-basic/default-ignores')

    expect(defaultIgnoreBlock?.ignores).toContain('**/__generated__/**')

    const withoutGeneratedIgnores = await defineConfig({
      settings: ['no-generated-code-ignores']
    })
    const ignoreBlock = withoutGeneratedIgnores.find(entry => entry.name === 'eslint-config-basic/default-ignores')

    expect(ignoreBlock?.ignores).not.toContain('**/__generated__/**')
  })

  test('should support TypeScript syntax and strict modes', async () => {
    const syntaxConfig = await defineConfig({ typescript: 'syntax' })
    const syntaxNames = extractConfigNames(syntaxConfig)

    expect(syntaxNames).toContain('eslint-config-typescript/standard-rules')
    expect(syntaxNames).not.toContain('eslint-config-typescript/type-checked-rules')

    const strictConfig = await defineConfig({ typescript: 'strict' })
    const strictNames = extractConfigNames(strictConfig)

    expect(strictNames).toContain('eslint-config-typescript/type-checked-rules')
    expect(strictNames).toContain('eslint-config-typescript/strict-mode-rules')
  })

  test('should include new tool integrations from feature strings', async () => {
    const config = await defineConfig({
      features: {
        docker: true,
        'github-actions': true,
        nx: true
      }
    })

    const names = extractConfigNames(config)

    expect(names).toContain('eslint-config-integrations/docker')
    expect(names).toContain('eslint-config-integrations/github-actions')
    expect(names).toContain('eslint-config-integrations/nx')
  })

  test('should include sonarjs rules when Sonarjs optional is enabled', async () => {
    const config = await defineConfig({
      extensions: [Extension.Sonarjs]
    })

    const rules = extractRuleNames(config)

    expect(rules).toContain('sonarjs/no-duplicate-string')

    expect(rules).toContain('sonarjs/cognitive-complexity')
  })

  test('should include prettier config when Prettier optional is enabled', async () => {
    const config = await defineConfig({
      tools: [Tool.Prettier]
    })

    const names = extractConfigNames(config)

    expect(names).toContain('eslint-config/prettier')
  })

  test('should include regexp rules when Regexp optional is enabled', async () => {
    const config = await defineConfig({
      extensions: [Extension.Regexp]
    })

    const rules = extractRuleNames(config)

    expect(rules).toContain('regexp/no-super-linear-backtracking')

    expect(rules).toContain('regexp/no-useless-escape')
  })

  test('should include Vue rules when Vue is enabled', async () => {
    const config = await defineConfig({ frameworks: { vue } })
    const rules = extractRuleNames(config)

    expect(rules).toContain('vue/multi-word-component-names')

    expect(rules).toContain('vue/html-self-closing')
  })

  test('should include playwright rules when Playwright integration is enabled', async () => {
    const config = await defineConfig({
      testing: [Testing.Playwright]
    })

    const names = extractConfigNames(config)

    expect(names).toContain('integrations/playwright')
  })

  test('should append local flat-config overrides from defineConfig rest args', async () => {
    const config = await defineConfig({ detection: false, tools: [] }, {
      name: 'local/override',
      rules: {
        'no-console': 'off'
      }
    })

    const names = extractConfigNames(config)

    expect(names).toContain('local/override')
    expect(getEffectiveRuleValue(config, 'no-console')).toBe('off')
  })

  test('should allow Playwright file globs to be customized', async () => {
    const config = await defineConfig({
      testing: [Testing.Playwright],
      testingFiles: {
        playwright: ['tests/**/*.ts']
      }
    })

    const playwrightConfig = config.find(entry => entry.name === 'integrations/playwright')

    expect(playwrightConfig?.files).toEqual(['tests/**/*.ts'])
  })

  test('should allow any built-in testing file globs to be customized', async () => {
    const config = await defineConfig({
      testing: [Testing.Vitest],
      testingFiles: {
        vitest: ['src/**/*.test.ts']
      }
    })

    const vitestConfig = config.find(entry => entry.name === 'integrations/vitest')

    expect(vitestConfig?.files).toEqual(['src/**/*.test.ts'])
  })

  test('should configure Tailwind entry points and class ignores in one option', async () => {
    const config = await defineConfig({
      tailwind: {
        entryPoint: 'src/styles/global.css',
        ignore: ['^prose-custom$']
      }
    })

    const tailwindSettings = config.find(entry => entry.name === 'eslint-config-basic/tailwind-settings')

    expect(tailwindSettings?.plugins?.['better-tailwindcss']).toBeDefined()
    expect(tailwindSettings?.settings).toEqual({
      'better-tailwindcss': {
        cwd: process.cwd(),
        detectComponentClasses: true,
        entryPoint: 'src/styles/global.css',
        ignore: ['^prose-custom$']
      }
    })
    expect(tailwindSettings?.rules?.['better-tailwindcss/no-unknown-classes']).toEqual([
      'error',
      {
        entryPoint: 'src/styles/global.css',
        ignore: ['^prose-custom$']
      }
    ])
  })

  test('should allow Tailwind unknown-class checks to be disabled in the Tailwind option', async () => {
    const config = await defineConfig({
      tailwind: {
        entryPoint: 'src/styles/global.css',
        noUnknownClasses: false
      }
    })

    const tailwindSettings = config.find(entry => entry.name === 'eslint-config-basic/tailwind-settings')

    expect(tailwindSettings?.plugins?.['better-tailwindcss']).toBeDefined()
    expect(tailwindSettings?.settings).toEqual({
      'better-tailwindcss': {
        cwd: process.cwd(),
        detectComponentClasses: true,
        entryPoint: 'src/styles/global.css'
      }
    })
    expect(tailwindSettings?.rules?.['better-tailwindcss/no-unknown-classes']).toBe('off')
  })

  test('should resolve Tailwind from detectRootDir in monorepo package configs', async () => {
    const workspaceRoot = '/repo'
    const projectRoot = `${workspaceRoot}/apps/web`
    const config = await defineConfig({
      detectRootDir: workspaceRoot,
      detection: false,
      projects: {
        'apps/web': {
          detection: false,
          tailwind: {
            entryPoint: 'src/styles/global.css'
          }
        }
      }
    })

    const tailwindSettings = config.find(entry => entry.name === 'eslint-config-basic/tailwind-settings')

    expect(tailwindSettings?.settings).toMatchObject({
      'better-tailwindcss': {
        cwd: projectRoot,
        entryPoint: 'src/styles/global.css'
      }
    })
    expect(tailwindSettings?.files).toEqual(['apps/web/**/*'])
  })
})

describe('Framework Rule Assertions — Svelte, Angular, Qwik', () => {
  test('should include Svelte-specific rules when Svelte is enabled', async () => {
    const config = await defineConfig({ frameworks: { svelte } })
    const rules = extractRuleNames(config)

    expect(rules).toContain('svelte/no-at-html-tags')

    expect(rules).toContain('svelte/require-each-key')
  })

  test('should include Angular-specific rules when Angular is enabled', async () => {
    const config = await defineConfig({ frameworks: { angular } })
    const rules = extractRuleNames(config)

    expect(rules).toContain('@angular-eslint/component-class-suffix')

    expect(rules).toContain('@angular-eslint/directive-class-suffix')

    expect(rules).toContain('@angular-eslint/no-empty-lifecycle-method')
  })

  test('should include Qwik-specific rules when Qwik is enabled', async () => {
    const config = await defineConfig({ frameworks: { qwik } })
    const rules = extractRuleNames(config)

    expect(rules).toContain('qwik/valid-lexical-scope')

    expect(rules).toContain('qwik/use-method-usage')

    expect(rules).toContain('qwik/no-react-props')
  })

  test('should NOT include Svelte rules when Svelte is not enabled', async () => {
    const config = await defineConfig({ autoFrameworks: false, typescript: true })
    const rules = extractRuleNames(config)

    expect(rules).not.toContain('svelte/no-at-html-tags')
  })

  test('should NOT include Angular rules when Angular is not enabled', async () => {
    const config = await defineConfig({ autoFrameworks: false, typescript: true })
    const rules = extractRuleNames(config)

    expect(rules).not.toContain('@angular-eslint/component-class-suffix')
  })
})

describe('Integration Rule Assertions — Testing', () => {
  test('should include Jest rules when Jest integration is enabled', async () => {
    const config = await defineConfig({
      testing: [Testing.Jest]
    })

    const names = extractConfigNames(config)

    expect(names).toContain('integrations/jest')
  })

  test('should include Cypress rules when Cypress integration is enabled', async () => {
    const config = await defineConfig({
      testing: [Testing.Cypress]
    })

    const names = extractConfigNames(config)

    expect(names).toContain('integrations/cypress')
  })

  test('should include Testing Library rules when TestingLibrary integration is enabled', async () => {
    const config = await defineConfig({
      testing: [Testing.TestingLibrary]
    })

    const rules = extractRuleNames(config)

    expect(rules).toContain('testing-library/await-async-queries')

    expect(rules).toContain('testing-library/no-debugging-utils')
  })

  test('should include all testing integrations simultaneously', async () => {
    const config = await defineConfig({
      testing: [Testing.Vitest, Testing.Jest, Testing.Playwright, Testing.Cypress, Testing.TestingLibrary]
    })

    const names = extractConfigNames(config)

    expect(names).toContain('integrations/jest')
    expect(names).toContain('integrations/cypress')
    expect(names).toContain('integrations/playwright')
    expect(names).toContain('integrations/testing-library')
  })
})

describe('Integration Rule Assertions — Libraries', () => {
  test('should include AI SDK security rules when AiSdk library is enabled', async () => {
    const config = await defineConfig({
      libraries: [Library.AiSdk]
    })

    const names = extractConfigNames(config)
    const rules = extractRuleNames(config)

    expect(names).toContain('eslint-config-integrations/ai-sdk')
    expect(rules).toContain('vercel-ai-security/require-validated-prompt')
  })

  test('should include OpenAI Agents SDK import safety rules when OpenAiAgents library is enabled', async () => {
    const config = await defineConfig({
      libraries: [Library.OpenAiAgents]
    })

    const names = extractConfigNames(config)
    const ruleValue = getEffectiveRuleValue(config, 'no-restricted-imports') as [string, { paths?: { name: string }[] }] | undefined

    expect(names).toContain('eslint-config-integrations/openai-agents')
    expect(ruleValue).toBeDefined()
    const paths = ruleValue?.[1]?.paths?.map(p => p.name) ?? []
    expect(paths).toContain('openai/agents')
  })

  test('should include Mastra import safety rules when Mastra library is enabled', async () => {
    const config = await defineConfig({
      libraries: [Library.Mastra]
    })

    const names = extractConfigNames(config)
    const ruleValue = getEffectiveRuleValue(config, 'no-restricted-imports') as [string, { patterns?: { group: string[] }[] }] | undefined

    expect(names).toContain('eslint-config-integrations/mastra')
    expect(ruleValue).toBeDefined()
    const patternGroups = ruleValue?.[1]?.patterns?.flatMap(p => p.group) ?? []
    expect(patternGroups).toContain('@mastra/*/dist/*')
  })

  test('should include LangChain import safety rules when LangChain library is enabled', async () => {
    const config = await defineConfig({
      libraries: [Library.Langchain]
    })

    const names = extractConfigNames(config)
    const ruleValue = getEffectiveRuleValue(config, 'no-restricted-imports') as [string, { patterns?: { group: string[] }[] }] | undefined

    expect(names).toContain('eslint-config-integrations/langchain')
    expect(ruleValue).toBeDefined()
    const patternGroups = ruleValue?.[1]?.patterns?.flatMap(p => p.group) ?? []
    expect(patternGroups).toContain('langchain/dist/*')
  })

  test('should include LlamaIndex import safety rules when LlamaIndex library is enabled', async () => {
    const config = await defineConfig({
      libraries: [Library.LlamaIndex]
    })

    const names = extractConfigNames(config)
    const ruleValue = getEffectiveRuleValue(config, 'no-restricted-imports') as [string, { patterns?: { group: string[] }[] }] | undefined

    expect(names).toContain('eslint-config-integrations/llamaindex')
    expect(ruleValue).toBeDefined()
    const patternGroups = ruleValue?.[1]?.patterns?.flatMap(p => p.group) ?? []
    expect(patternGroups).toContain('llamaindex/dist/*')
  })

  test('should include Google GenAI import safety rules when GoogleGenAi library is enabled', async () => {
    const config = await defineConfig({
      libraries: [Library.GoogleGenAi]
    })

    const names = extractConfigNames(config)
    expect(names).toContain('eslint-config-integrations/google-genai')
  })

  test('should include AutoGen import safety rules when Autogen library is enabled', async () => {
    const config = await defineConfig({
      libraries: [Library.Autogen]
    })

    const names = extractConfigNames(config)
    expect(names).toContain('eslint-config-integrations/autogen')
  })

  test('should include Zod validation rules when Zod library is enabled', async () => {
    const config = await defineConfig({
      libraries: [Library.Zod]
    })

    const names = extractConfigNames(config)
    expect(names).toContain('eslint-config-integrations/zod')
  })

  test('should include tailwind config when Tailwind library is enabled', async () => {
    const config = await defineConfig({
      libraries: [Library.Tailwind]
    })

    const rules = extractRuleNames(config)

    // better-tailwindcss plugin is used; check for one of its rules
    expect(rules.some(r => r.startsWith('better-tailwindcss/'))).toBe(true)
  })

  test('should include i18next rules when i18next library is enabled', async () => {
    const config = await defineConfig({
      libraries: [Library.I18next]
    })

    const rules = extractRuleNames(config)

    expect(rules).toContain('i18next/no-literal-string')
  })

  test('should include TanStack Router rules when TanstackRouter library is enabled', async () => {
    const config = await defineConfig({
      libraries: [Library.TanstackRouter]
    })

    const names = extractConfigNames(config)

    expect(names).toContain('eslint-config-integrations/tanstack-router')
  })

  test('should include Storybook config when Storybook library is enabled', async () => {
    const config = await defineConfig({
      libraries: [Library.Storybook]
    })

    const names = extractConfigNames(config)

    expect(names).toContain('storybook:recommended:setup')
  })

  test('should include Stencil rules when Stencil library is enabled', async () => {
    const config = await defineConfig({
      libraries: [Library.Stencil]
    })

    const rules = extractRuleNames(config)

    expect(rules).toContain('@stencil-community/async-methods')
  })

  test('should include TanStack Query rules when TanstackQuery library is enabled', async () => {
    const config = await defineConfig({
      libraries: [Library.TanstackQuery]
    })

    const rules = extractRuleNames(config)

    expect(rules.some(r => r.startsWith('@tanstack/query/'))).toBe(true)
  })

  test('should include ORM import safety rules when ORM libraries are enabled', async () => {
    const config = await defineConfig({
      libraries: [
        Library.Typeorm,
        Library.Prisma,
        Library.Drizzle,
        Library.MikroOrm,
        Library.Sequelize
      ]
    })

    const names = extractConfigNames(config)
    const rules = extractRuleNames(config)

    expect(names).toContain('eslint-config-integrations/typeorm')
    expect(names).toContain('eslint-config-integrations/prisma')
    expect(names).toContain('eslint-config-integrations/drizzle')
    expect(names).toContain('eslint-config-integrations/mikro-orm')
    expect(names).toContain('eslint-config-integrations/sequelize')
    expect(rules).toContain('no-restricted-imports')
  })

  test('should include MCP SDK import safety rules when Mcp library is enabled', async () => {
    const config = await defineConfig({
      libraries: [Library.Mcp]
    })

    const names = extractConfigNames(config)
    const ruleValue = getEffectiveRuleValue(config, 'no-restricted-imports') as [string, { paths?: { name: string }[] }] | undefined

    expect(names).toContain('eslint-config-integrations/mcp')
    expect(ruleValue).toBeDefined()
    const paths = ruleValue?.[1]?.paths?.map(p => p.name) ?? []
    expect(paths).toContain('@modelcontextprotocol/sdk')
  })
})

describe('Integration Rule Assertions — Tools', () => {
  test('should include CSpell rules when CSpell tool is enabled', async () => {
    const config = await defineConfig({
      tools: [Tool.Cspell]
    })

    const rules = extractRuleNames(config)

    expect(rules).toContain('@cspell/spellchecker')
  })

  test('should include JSDoc and TSDoc rules when Jsdoc tool is enabled', async () => {
    const config = await defineConfig({
      tools: [Tool.Jsdoc],
      typescript: true
    })

    const rules = extractRuleNames(config)

    expect(rules).toContain('jsdoc/check-access')
    expect(rules).toContain('tsdoc/syntax')
  })

  test('should include Swagger rules when Swagger tool is enabled', async () => {
    const config = await defineConfig({
      tools: [Tool.Swagger]
    })

    const names = extractConfigNames(config)

    expect(names).toContain('integrations/swagger')
  })
})

describe('Integration Rule Assertions — Formats', () => {
  test('should include YAML rules when Yaml format is enabled', async () => {
    const config = await defineConfig({
      formats: [Format.Yaml]
    })

    const rules = extractRuleNames(config)

    expect(rules).toContain('yml/no-empty-mapping-value')
  })

  test('should include JSONC rules when Jsonc format is enabled', async () => {
    const config = await defineConfig({
      formats: [Format.Jsonc]
    })

    const rules = extractRuleNames(config)

    expect(rules).toContain('jsonc/sort-keys')
  })

  test('should include Markdown rules when Markdown format is enabled', async () => {
    const config = await defineConfig({
      formats: [Format.Markdown]
    })

    const rules = extractRuleNames(config)

    expect(rules).toContain('markdown/fenced-code-language')

    expect(rules).toContain('markdown/no-empty-links')
  })

  test('should include MDX config when Mdx format is enabled', async () => {
    const config = await defineConfig({
      formats: [Format.Mdx]
    })

    const names = extractConfigNames(config)

    expect(names).toContain('mdx/flat')
  })

  test('should include TOML config when Toml format is enabled', async () => {
    const config = await defineConfig({
      formats: [Format.Toml]
    })

    const rules = extractRuleNames(config)

    // eslint-plugin-toml rules use the 'toml/' prefix
    expect(rules.some(r => r.startsWith('toml/'))).toBe(true)
  })

  test('should include GraphQL config when Graphql format is enabled', async () => {
    const config = await defineConfig({
      formats: [Format.Graphql]
    })

    const names = extractConfigNames(config)

    expect(names).toContain('integrations/graphql/schema')

    expect(names).toContain('integrations/graphql/operations')
  })
})

describe('Integration Rule Assertions — Extensions', () => {
  test('should include Perfectionist rules when Perfectionist extension is enabled', async () => {
    const config = await defineConfig({
      extensions: [Extension.Perfectionist]
    })

    const rules = extractRuleNames(config)

    expect(rules).toContain('perfectionist/sort-imports')
  })

  test('should include Security rules when Security extension is enabled', async () => {
    const config = await defineConfig({
      extensions: [Extension.Security]
    })

    const rules = extractRuleNames(config)

    expect(rules).toContain('security/detect-object-injection')
  })

  test('should include A11y rules when A11y extension is enabled', async () => {
    const config = await defineConfig({
      extensions: [Extension.A11y]
    })

    const names = extractConfigNames(config)
    expect(names).toContain('eslint-config-integrations/a11y/jsx')
  })

  test('should include Biome rules when Biome extension is enabled', async () => {
    const config = await defineConfig({
      extensions: [Extension.Biome]
    })

    const names = extractConfigNames(config)
    expect(names).toContain('eslint-config-integrations/biome')
  })
})

describe('optionMergeStrategy', () => {
  const noDetect = '/__eslint-config_basic_strategy_tests_no_detect__'

  test('replace: explicit extensions: [] discards all preset-provided extensions', async () => {
    const config = await defineConfig({
      detection: false,
      detectRootDir: noDetect,
      extensions: [],
      optionMergeStrategy: 'replace',
      preset: 'all',
      typescript: false
    })
    const names = extractConfigNames(config)
    expect(names.some(n => n.includes('unicorn'))).toBe(false)
    expect(names.some(n => n.includes('perfectionist'))).toBe(false)
    expect(names.some(n => n.includes('sonarjs'))).toBe(false)
  })

  test('merge (default): preset extensions are combined with explicit extensions', async () => {
    const [mergeConfig, replaceConfig] = await Promise.all([
      defineConfig({
        detection: false,
        detectRootDir: noDetect,
        extensions: [Extension.Unicorn],
        optionMergeStrategy: 'merge',
        typescript: false
      }),
      defineConfig({
        detection: false,
        detectRootDir: noDetect,
        extensions: [Extension.Unicorn],
        optionMergeStrategy: 'replace',
        typescript: false
      })
    ])
    const mergeNames = extractConfigNames(mergeConfig)
    const replaceNames = extractConfigNames(replaceConfig)
    // Both have unicorn (explicit)
    expect(mergeNames.some(n => n.includes('unicorn'))).toBe(true)
    expect(replaceNames.some(n => n.includes('unicorn'))).toBe(true)
    // merge combined detected values → may have more config entries overall
    expect(mergeConfig.flat(Infinity).length).toBeGreaterThanOrEqual(replaceConfig.flat(Infinity).length)
  })

  test('replace: explicit testing: [] discards preset-provided testing configs', async () => {
    const config = await defineConfig({
      detection: false,
      detectRootDir: noDetect,
      extensions: [],
      optionMergeStrategy: 'replace',
      preset: 'all',
      testing: [],
      typescript: false
    })
    const names = extractConfigNames(config)
    expect(names.some(n => n.includes('vitest'))).toBe(false)
    expect(names.some(n => n.includes('playwright'))).toBe(false)
  })
})
