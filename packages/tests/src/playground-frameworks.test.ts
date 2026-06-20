import { execFile } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

import { describe, expect, test } from 'vitest'

const execFileAsync = promisify(execFile)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = join(__dirname, '../../..')

const lintPlayground = async (filter: string): Promise<void> => {
  const env = { ...process.env }
  delete env.VITEST

  await execFileAsync('pnpm', ['--filter', filter, 'run', 'lint'], {
    cwd: REPO_ROOT,
    env,
    timeout: 60_000
  })
}

describe('new framework playgrounds', () => {
  test('lints the Vite playground with the bundled framework config', async () => {
    await expect(lintPlayground('@santi020k/playground-vite')).resolves.toBeUndefined()
  })

  test('lints the Slidev playground with the bundled framework config', async () => {
    await expect(lintPlayground('@santi020k/playground-slidev')).resolves.toBeUndefined()
  })

  test('lints the Lit playground with the bundled framework config', async () => {
    await expect(lintPlayground('@santi020k/playground-lit')).resolves.toBeUndefined()
  })

  test('lints the Nuxt playground with the bundled framework config', async () => {
    await expect(lintPlayground('@santi020k/playground-nuxt')).resolves.toBeUndefined()
  })

  test('lints the React Router playground with the bundled framework config', async () => {
    await expect(lintPlayground('@santi020k/playground-react-router')).resolves.toBeUndefined()
  })

  test('lints the Preact playground with the bundled framework config', async () => {
    await expect(lintPlayground('@playground/preact')).resolves.toBeUndefined()
  })

  test('lints the TanStack Start playground with the bundled framework config', async () => {
    await expect(lintPlayground('@santi020k/playground-tanstack-start')).resolves.toBeUndefined()
  })
}, 360_000)
