import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import { lintFile, lintText } from './test-utils.js'

import { eslintConfig } from '@santi020k/eslint-config-basic'
import { reactConfig } from '@santi020k/eslint-config-react'

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
      // Note: unused-imports might only trigger if there are actually unused imports
      // Our fixture has an unused variable z, but maybe not an unused import.
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
  })
})
