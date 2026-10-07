import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

import { describe, expect, test } from 'vitest'

const root = fileURLToPath(new URL('../../../', import.meta.url))
const env = { ...process.env, RELEASE_SOURCE_PATH: root, GITHUB_REPOSITORY: 'santi020k/eslint-config-basic' }

describe('release recovery authority boundaries', () => {
  test('rejects mutation through the historical verification process', () => {
    const result = spawnSync(process.execPath, ['scripts/recover-release-records.mjs'], { cwd: root, env, encoding: 'utf8' })

    expect(result.status).toBe(1)
    expect(result.stderr).toContain('Run recovery verification with --dry-run')
  })

  test('rejects a different mutation source before calling GitHub', () => {
    const result = spawnSync(process.execPath, ['scripts/mutate-release-records.mjs', '--dry-run'], {
      cwd: root, env: { ...env, RELEASE_EXPECTED_COMMIT: '0'.repeat(40) }, encoding: 'utf8'
    })

    expect(result.status).toBe(1)
    expect(result.stderr).toContain('Mutation source differs from the verified release commit')
  })
})
