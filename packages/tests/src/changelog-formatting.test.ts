import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, test } from 'vitest'

import { formatGeneratedChangelogs, normalizeChangelogWhitespace } from '../../../scripts/format-changelogs.mjs'

describe('generated changelog formatting', () => {
  test('removes indented paragraph separators without changing release text or Markdown hard breaks', () => {
    const source = '# Changelog\n\n- Release summary  \n  \n  Detailed notes.\n\t\n    const example = true\n'

    expect(normalizeChangelogWhitespace(source)).toBe('# Changelog\n\n- Release summary  \n\n  Detailed notes.\n\n    const example = true\n')
  })

  test('preserves CRLF and remains idempotent', () => {
    const formatted = normalizeChangelogWhitespace('- Summary\r\n  \r\n  Details\r\n')

    expect(formatted).toBe('- Summary\r\n\r\n  Details\r\n')
    expect(normalizeChangelogWhitespace(formatted)).toBe(formatted)
  })

  test('formats only package changelogs and reports only files that changed', () => {
    const root = mkdtempSync(join(tmpdir(), 'eslint-changelog-'))

    try {
      for (const name of ['basic', 'core', 'playground']) mkdirSync(join(root, 'packages', name), { recursive: true })

      const changed = join(root, 'packages/basic/CHANGELOG.md')
      const clean = join(root, 'packages/core/CHANGELOG.md')
      const readme = join(root, 'packages/basic/README.md')

      writeFileSync(changed, '- Summary\n  \n  Details\n')
      writeFileSync(clean, '- Existing\n')
      writeFileSync(readme, 'Keep this\n  \n')

      expect(formatGeneratedChangelogs(root)).toEqual([changed])
      expect(readFileSync(changed, 'utf8')).toBe('- Summary\n\n  Details\n')
      expect(readFileSync(clean, 'utf8')).toBe('- Existing\n')
      expect(readFileSync(readme, 'utf8')).toBe('Keep this\n  \n')
      expect(formatGeneratedChangelogs(root)).toEqual([])
    } finally {
      rmSync(root, { force: true, recursive: true })
    }
  })
})
