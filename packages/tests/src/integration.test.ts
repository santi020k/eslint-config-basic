import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import { lintFile, lintText } from './test-utils.js'

import { eslintConfig } from '@santi020k/eslint-config-basic'
import { reactConfig } from '@santi020k/eslint-config-react'
import { svelteConfig } from '@santi020k/eslint-config-svelte'
import { vueConfig } from '@santi020k/eslint-config-vue'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const FIXTURES_DIR = join(__dirname, '../fixtures')

describe('Integration Tests', () => {
  describe('JavaScript', () => {
    it('should report warnings for stylistic issues in javascript.js', async () => {
      const config = eslintConfig()
      const filePath = join(FIXTURES_DIR, 'javascript.js')
      const results = await lintFile(filePath, config)

      const messages = results[0].messages
      const ruleIds = messages.map(m => m.ruleId)
      expect(ruleIds).toContain('@stylistic/quotes')
      expect(ruleIds).toContain('@stylistic/semi')
      expect(ruleIds).toContain('no-unused-vars')
      expect(ruleIds).toContain('no-empty')
    })

    it('should pass for clean javascript code', async () => {
      const config = eslintConfig()
      const code = 'const x = \'clean\'\n\nconsole.log(x)\n'
      const results = await lintText(code, config, 'clean.js')

      expect(results[0].errorCount).toBe(0)
      expect(results[0].warningCount).toBe(0)
    })
  })

  describe('TypeScript', () => {
    it('should report TypeScript-specific issues', async () => {
      const config = eslintConfig({
        typescript: true,
        tsconfigRootDir: FIXTURES_DIR,
        frameworks: { react: false } // Explicitly disable React to avoid detection warnings
      })
      const filePath = join(FIXTURES_DIR, 'typescript.ts')
      const results = await lintFile(filePath, config)

      const messages = results[0].messages
      const ruleIds = messages.map(m => m.ruleId)

      expect(ruleIds).toContain('@typescript-eslint/no-explicit-any')
      expect(ruleIds).toContain('@stylistic/quotes')
    })

    it('should report issues in nest.ts', async () => {
      const config = eslintConfig({
        typescript: true,
        tsconfigRootDir: FIXTURES_DIR
      })
      const filePath = join(FIXTURES_DIR, 'nest.ts')
      const results = await lintFile(filePath, config)

      const messages = results[0].messages
      const ruleIds = messages.map(m => m.ruleId)

      expect(ruleIds).toContain('@typescript-eslint/no-explicit-any')
      expect(ruleIds).toContain('@stylistic/quotes')
    })

    it('should not report TypeScript-unrelated issues on typed code', async () => {
      // Use typescript: false to avoid projectService rejecting virtual file paths
      const config = eslintConfig({ typescript: false })
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
    it('should report React hooks issues', async () => {
      const config = eslintConfig({
        frameworks: { react: reactConfig }
      })
      const filePath = join(FIXTURES_DIR, 'react.tsx')
      const results = await lintFile(filePath, config)

      const messages = results[0].messages
      const ruleIds = messages.map(m => m.ruleId)

      expect(ruleIds).toContain('react-hooks/exhaustive-deps')
    })

    it('should pass for clean React JSX code', async () => {
      const config = eslintConfig({
        typescript: false,
        frameworks: { react: reactConfig }
      })
      // Use plain JSX without TS type annotations since typescript: false
      // Use double quotes for JSX attributes to satisfy @stylistic/jsx-quotes
      const code = [
        'import React from \'react\'',
        '',
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
    it('should detect Vue-specific issues in vue.vue', async () => {
      const config = eslintConfig({
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
    it('should detect stylistic issues in svelte.svelte', async () => {
      const config = eslintConfig({
        frameworks: { svelte: svelteConfig }
      })
      const filePath = join(FIXTURES_DIR, 'svelte.svelte')
      const results = await lintFile(filePath, config)

      const messages = results[0].messages
      const ruleIds = messages.map(m => m.ruleId)

      // Double quotes in script block
      expect(ruleIds).toContain('@stylistic/quotes')
    })
  })
}, 30000)
