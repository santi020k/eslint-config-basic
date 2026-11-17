import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import test from 'node:test'

import { verifyGate } from './quality-gate.mjs'

test('selected jobs cannot silently skip or fail', () => {
  const names = ['impact-plan', 'package-manager-consumers', 'windows-smoke', 'contracts', 'build', 'package-validation', 'release-candidate', 'release-node24']

  for (const head of ['feature/example', 'release/v3.8.0']) {
    const results = Object.fromEntries(names.map(name => [name, { result: 'success' }]))

    verifyGate(results, 'pull_request', head)

    const selected = head.startsWith('release/') ? 'release-candidate' : 'build'

    for (const result of ['skipped', 'cancelled', 'failure']) {
      assert.throws(() => verifyGate({ ...results, [selected]: { result } }, 'pull_request', head))
    }

    assert.throws(() => verifyGate({}, 'pull_request', head))
  }
})

test('published Quality plans package consumers and conservative fallbacks', () => {
  const cwd = mkdtempSync(join(tmpdir(), 'eslint-impact-'))
  const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith('GIT_')))
  const git = args => execFileSync('git', args, { cwd, env, encoding: 'utf8', stdio: 'pipe' }).trim()

  const write = (path, value) => {
    mkdirSync(dirname(join(cwd, path)), { recursive: true })

    writeFileSync(join(cwd, path), value)
  }

  const plan = base => JSON.parse(execFileSync('quality', ['impact', 'plan', '--base', base, '--head', 'HEAD', '--format', 'json'], { cwd, env, encoding: 'utf8' }))

  try {
    git(['init', '-q', '-b', 'main'])

    git(['config', 'user.name', 'Fixture'])

    git(['config', 'user.email', 'fixture@example.test'])

    write('quality-impact.json', readFileSync(new URL('../quality-impact.json', import.meta.url)))

    write('packages/react/src/index.ts', 'initial')

    git(['add', '.'])

    git(['commit', '-qm', 'initial'])

    const base = git(['rev-parse', 'HEAD'])

    write('packages/react/src/index.ts', 'changed')

    git(['add', '.'])

    git(['commit', '-qm', 'package'])

    const selected = plan(base).selected.map(node => node.id)

    for (const id of ['react', 'contracts', 'docs']) assert.ok(selected.includes(id))

    for (const path of ['pnpm-lock.yaml', 'unknown.txt']) {
      write(path, 'changed')

      git(['add', '.'])

      git(['commit', '-qm', 'fallback'])

      assert.equal(plan(base).mode, 'full')
    }

    assert.equal(plan('unavailable-baseline').mode, 'full')
  } finally {
    rmSync(cwd, { recursive: true, force: true })
  }
})
