import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { angularConfig } from '@santi020k/eslint-config-angular'
import astro, { astroConfig } from '@santi020k/eslint-config-astro'
import { defineConfig, Format } from '@santi020k/eslint-config-basic'
import { expoConfig } from '@santi020k/eslint-config-expo'
import { honoConfig } from '@santi020k/eslint-config-hono'
import { nestConfig } from '@santi020k/eslint-config-nest'
import { nextConfig } from '@santi020k/eslint-config-next'
import { qwik as qwikConfig } from '@santi020k/eslint-config-qwik'
import { reactConfig } from '@santi020k/eslint-config-react'
import { reactRouter as reactRouterConfig } from '@santi020k/eslint-config-react-router'
import { slidev as slidevConfig } from '@santi020k/eslint-config-slidev'
import { svelteConfig } from '@santi020k/eslint-config-svelte'
import { vite as viteConfig } from '@santi020k/eslint-config-vite'
import { vueConfig } from '@santi020k/eslint-config-vue'

import { describe, expect, test } from 'vitest'

import { lintFile, lintText } from './test-utils.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const FIXTURES_DIR = join(__dirname, '../fixtures')

describe('Integration Tests', () => {
  describe('JavaScript', () => {
    test('should report warnings for stylistic issues in javascript.js', async () => {
      const config = await defineConfig({ detection: false, tools: [] })
      const filePath = join(FIXTURES_DIR, 'javascript.js')
      const results = await lintFile(filePath, config)

      const messages = results[0].messages
      const ruleIds = messages.map(m => m.ruleId)
      expect(ruleIds).toContain('@stylistic/quotes')
      expect(ruleIds).toContain('@stylistic/semi')
      expect(ruleIds).toContain('no-unused-vars')
      expect(ruleIds).toContain('no-empty')
    })

    test('should pass for clean javascript code', async () => {
      const config = await defineConfig({ detection: false, tools: [] })
      const code = 'const x = \'clean\'\n\nconsole.log(x)\n'
      const results = await lintText(code, config, 'clean.js')

      expect(results[0].errorCount).toBe(0)
      expect(results[0].warningCount).toBe(0)
    })
  })

  describe('TypeScript', () => {
    test('should report TypeScript-specific issues', async () => {
      const config = await defineConfig({
        detection: false,
        tools: [],
        tsconfigRootDir: FIXTURES_DIR,
        typescript: true
      })
      const filePath = join(FIXTURES_DIR, 'typescript.ts')
      const results = await lintFile(filePath, config)

      const messages = results[0].messages
      const ruleIds = messages.map(m => m.ruleId)

      expect(ruleIds).toContain('@typescript-eslint/no-explicit-any')
      expect(ruleIds).toContain('@stylistic/quotes')
    })

    test('should report issues in nest.ts', async () => {
      const config = await defineConfig({
        detection: false,
        tools: [],
        tsconfigRootDir: FIXTURES_DIR,
        typescript: true
      })
      const filePath = join(FIXTURES_DIR, 'nest.ts')
      const results = await lintFile(filePath, config)

      const messages = results[0].messages
      const ruleIds = messages.map(m => m.ruleId)

      expect(ruleIds).toContain('@typescript-eslint/no-explicit-any')
      expect(ruleIds).toContain('@stylistic/quotes')
    })

    test('should not run type-aware rules on Astro virtual TypeScript fragments', async () => {
      const config = await defineConfig({
        detection: false,
        frameworks: { astro: true },
        tools: [],
        tsconfigRootDir: FIXTURES_DIR,
        typescript: true
      })
      const code = 'const label: string = "hello"\n\nlabel\n'
      const results = await lintText(code, config, join(FIXTURES_DIR, 'astro.astro/1_1.ts'))

      expect(results[0].fatalErrorCount).toBe(0)
    })

    test('should parse Astro virtual JavaScript fragments that contain TypeScript syntax', async () => {
      const config = await defineConfig({
        detection: false,
        frameworks: { astro: true },
        tools: [],
        tsconfigRootDir: FIXTURES_DIR,
        typescript: true
      })
      const code = [
        'const target = document.querySelector("button") as HTMLButtonElement | null',
        '',
        'target?.focus()',
        ''
      ].join('\n')
      const results = await lintText(code, config, join(FIXTURES_DIR, 'astro.astro/1_1.js'))

      expect(results[0].fatalErrorCount).toBe(0)
    })

    test('should not report TypeScript-unrelated issues on typed code', async () => {
      // Use typescript: false to avoid projectService rejecting virtual file paths
      const config = await defineConfig({ typescript: false })
      const code = [
        'const greet = (name: string): string => `Hello, ${name}`',
        '',
        'console.log(greet(\'world\'))',
        ''
      ].join('\n')
      const results = await lintText(code, config, 'clean.ts')

      const ruleIds = results[0].messages.map(m => m.ruleId)

      // Core JS/TS rules should not fire on well-formatted code
      expect(ruleIds).not.toContain('@stylistic/quotes')
      expect(ruleIds).not.toContain('no-unused-vars')
    })
  })

  describe('React', () => {
    test('should report React hooks issues', async () => {
      const config = await defineConfig({
        frameworks: { react: reactConfig }
      })
      const filePath = join(FIXTURES_DIR, 'react.tsx')
      const results = await lintFile(filePath, config)

      const messages = results[0].messages
      const ruleIds = messages.map(m => m.ruleId)

      expect(ruleIds).toContain('@eslint-react/exhaustive-deps')
    })

    test('should pass for clean React JSX code', async () => {
      const config = await defineConfig({
        frameworks: { react: reactConfig },
        typescript: false
      })
      // Use plain JSX without TS type annotations since typescript: false
      // Use double quotes for JSX attributes to satisfy @stylistic/jsx-quotes
      const code = [

        'export const Button = ({ label }) => (',
        '  <button type="button">{label}</button>',
        ')',
        ''
      ].join('\n')
      const results = await lintText(code, config, 'Button.tsx')

      expect(results[0].errorCount).toBe(0)
    })
  })

  describe('Vue', () => {
    test('should detect Vue-specific issues in vue.vue', async () => {
      const config = await defineConfig({
        frameworks: { vue: vueConfig }
      })
      const filePath = join(FIXTURES_DIR, 'vue.vue')
      const results = await lintFile(filePath, config)

      const messages = results[0].messages
      const ruleIds = messages.map(m => m.ruleId)

      // Missing :key on v-for
      expect(ruleIds).toContain('vue/require-v-for-key')
    })
  })

  describe('Svelte', () => {
    test('should detect stylistic issues in svelte.svelte', async () => {
      const config = await defineConfig({
        detection: false,
        frameworks: { svelte: svelteConfig },
        tools: []
      })
      const filePath = join(FIXTURES_DIR, 'svelte.svelte')
      const results = await lintFile(filePath, config)

      const messages = results[0].messages
      const ruleIds = messages.map(m => m.ruleId)

      // Double quotes in script block
      expect(ruleIds).toContain('@stylistic/quotes')
    })
  })

  describe('Angular', () => {
    test('should include Angular-specific rules in config', async () => {
      const config = await defineConfig({
        frameworks: { angular: angularConfig },
        typescript: false
      })
      const names = config.flatMap(c => (c.name ? [c.name] : []))

      expect(names).toContain('eslint-config-angular/rules')
    })
  })

  describe('Astro', () => {
    test('should include Astro-specific rules in config', async () => {
      const config = await defineConfig({
        frameworks: { astro: astroConfig },
        typescript: false
      })
      const names = config.flatMap(c => (typeof c.name === 'string' ? [c.name] : []))

      expect(names.some(n => n.includes('astro'))).toBe(true)
    })

    test('should avoid Astro template false positives when TypeScript is enabled', async () => {
      const config = await defineConfig({
        frameworks: { astro },
        tsconfigRootDir: FIXTURES_DIR,
        typescript: true
      })
      const filePath = join(FIXTURES_DIR, 'astro.astro')
      const results = await lintFile(filePath, config)
      const ruleIds = results[0].messages.map(m => m.ruleId)

      expect(ruleIds).not.toContain('@typescript-eslint/no-unsafe-return')
      expect(ruleIds).not.toContain(null)
    })
  })

  describe('Expo', () => {
    test('should include Expo-specific rules in config', async () => {
      // Expo requires react to be passed alongside
      const config = await defineConfig({
        frameworks: {
          expo: expoConfig,
          react: reactConfig
        },
        typescript: false
      })

      expect(Array.isArray(config)).toBe(true)

      expect(config.length).toBeGreaterThan(0)
    })
  })

  describe('NestJS', () => {
    test('should include NestJS-specific rules in config', async () => {
      const config = await defineConfig({
        frameworks: { nest: nestConfig },
        typescript: false
      })
      const names = config.flatMap(c => (c.name ? [c.name] : []))

      expect(names).toContain('eslint-config-nest/custom')
    })
  })

  describe('Hono', () => {
    test('should include Hono-specific rules in config', async () => {
      const config = await defineConfig({
        frameworks: { hono: honoConfig },
        typescript: false
      })
      const names = config.flatMap(c => (c.name ? [c.name] : []))

      expect(names).toContain('eslint-config-hono/runtime')
    })
  })

  describe('Next.js', () => {
    test('should include Next.js-specific rules in config', async () => {
      const config = await defineConfig({
        frameworks: {
          next: nextConfig,
          react: reactConfig
        },
        typescript: false
      })
      const names = config.flatMap(c => (c.name ? [c.name] : []))

      expect(names).toContain('eslint-config-next/custom')
    })
  })

  describe('Qwik', () => {
    test('should include Qwik-specific rules in config', async () => {
      const config = await defineConfig({
        frameworks: { qwik: qwikConfig },
        typescript: false
      })
      const names = config.flatMap(c => (c.name ? [c.name] : []))

      expect(names).toContain('eslint-config-qwik/rules')
    })
  })

  describe('React Router', () => {
    test('should include React Router-specific rules in config', async () => {
      const config = await defineConfig({

        frameworks: { 'react-router': reactRouterConfig },
        typescript: false
      })
      const names = config.flatMap(c => (c.name ? [c.name] : []))

      expect(names).toContain('eslint-config-react-router/jsx-a11y')
    })
  })

  describe('Vite', () => {
    test('should include Vite-specific config entries', async () => {
      const config = await defineConfig({
        frameworks: { vite: viteConfig },
        typescript: false
      })
      const names = config.flatMap(c => (c.name ? [c.name] : []))

      expect(names).toContain('eslint-config-vite/runtime')
      expect(names).toContain('eslint-config-vite/config-files')
    })

    test('should report errors in the intentionally bad Vite fixture', async () => {
      const config = await defineConfig({
        detection: false,
        frameworks: { vite: viteConfig },
        tools: [],
        typescript: false
      })
      const filePath = join(FIXTURES_DIR, 'vite-bad.ts')
      const results = await lintFile(filePath, config)
      const ruleIds = results[0].messages.map(m => m.ruleId)

      expect(ruleIds).toContain('@stylistic/quotes')
      expect(ruleIds).toContain('@stylistic/semi')
      expect(ruleIds).not.toContain('no-undef')
    })

    test('should pass for the corrected Vite fixture', async () => {
      const config = await defineConfig({
        detection: false,
        frameworks: { vite: viteConfig },
        tools: [],
        typescript: false
      })
      const filePath = join(FIXTURES_DIR, 'vite.ts')
      const results = await lintFile(filePath, config)

      expect(results[0].errorCount).toBe(0)
      expect(results[0].warningCount).toBe(0)
    })
  })

  describe('Slidev', () => {
    test('should include Slidev-specific config entries', async () => {
      const config = await defineConfig({
        detection: false,
        formats: [Format.Markdown],
        frameworks: {
          slidev: slidevConfig,
          vue: vueConfig
        },
        typescript: false
      })
      const names = config.flatMap(c => (c.name ? [c.name] : []))

      expect(names).toContain('eslint-config-slidev/runtime')
      expect(names).toContain('eslint-config-slidev/deck-markdown')
    })

    test('should report errors in the intentionally bad Slidev fixture', async () => {
      const config = await defineConfig({
        detection: false,
        formats: [Format.Markdown],
        frameworks: {
          slidev: slidevConfig,
          vue: vueConfig
        },
        tools: [],
        typescript: false
      })
      const filePath = join(FIXTURES_DIR, 'slidev-bad.md')
      const results = await lintFile(filePath, config)
      const ruleIds = results[0].messages.map(m => m.ruleId)

      expect(ruleIds).toContain('markdown/fenced-code-language')
      expect(ruleIds).not.toContain('vue/multi-word-component-names')
    })

    test('should pass for the corrected Slidev fixture', async () => {
      const config = await defineConfig({
        detection: false,
        formats: [Format.Markdown],
        frameworks: {
          slidev: slidevConfig,
          vue: vueConfig
        },
        tools: [],
        typescript: false
      })
      const filePath = join(FIXTURES_DIR, 'slidev.md')
      const results = await lintFile(filePath, config)

      expect(results[0].errorCount).toBe(0)
      expect(results[0].warningCount).toBe(0)
    })
  })
}, 30000)
