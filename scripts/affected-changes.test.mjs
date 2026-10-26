import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'

import { gitEnvironment, readChangedFiles } from './affected-changes.mjs'
import { selectAffectedTests } from './test-affected.mjs'

test('uncertain history and full-validation events never become an empty selection', () => {
  for (const env of [
    { GITHUB_EVENT_NAME: 'push' },
    { GITHUB_EVENT_NAME: 'workflow_dispatch' },
    { GITHUB_HEAD_REF: 'release/v3.6.2' },
    { GITHUB_HEAD_REF: 'changeset-release/main' }
  ]) assert.equal(readChangedFiles({ base: 'HEAD', env }), null)

  assert.equal(readChangedFiles({ base: 'missing-revision', env: {} }), null)
})

test('comparison preserves deletions, rename sides, whitespace, merge-base scope and local edits', () => {
  const directory = mkdtempSync(join(tmpdir(), 'eslint-affected-'))
  const env = { ...gitEnvironment(), GITHUB_EVENT_NAME: 'pull_request', GITHUB_HEAD_REF: 'ci/fixture' }
  const git = (...args) => execFileSync('git', args, { cwd: directory, env, stdio: 'pipe' })

  try {
    git('init', '--quiet', '-b', 'main')

    git('config', 'user.name', 'CI fixture')

    git('config', 'user.email', 'ci@example.test')

    mkdirSync(join(directory, 'packages/core'), { recursive: true })

    for (const name of ['deleted', 'moved', 'staged', 'unstaged']) writeFileSync(join(directory, 'packages/core', name), 'before')

    git('add', '.')

    git('commit', '-m', 'fixture')

    git('branch', 'feature')

    writeFileSync(join(directory, 'base-only'), 'unrelated')

    git('add', '.')

    git('commit', '-m', 'base changes')

    git('switch', 'feature')

    git('rm', 'packages/core/deleted')

    git('mv', 'packages/core/moved', 'renamed')

    git('commit', '-am', 'feature changes')

    writeFileSync(join(directory, 'packages/core/staged'), 'after')

    git('add', 'packages/core/staged')

    writeFileSync(join(directory, 'packages/core/unstaged'), 'after')

    writeFileSync(join(directory, ' leading\nname.ts'), 'new')

    assert.deepEqual(readChangedFiles({ cwd: directory, base: 'main', env: { ...env, GIT_DIR: '/missing/git', GIT_WORK_TREE: '/missing/tree' } }), [
      ' leading\nname.ts', 'packages/core/deleted', 'packages/core/moved', 'packages/core/staged', 'packages/core/unstaged', 'renamed'
    ])

    const head = git('rev-parse', 'HEAD').toString().trim()

    assert.deepEqual(readChangedFiles({ cwd: directory, base: 'main', head, env }), ['packages/core/deleted', 'packages/core/moved', 'renamed'])
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})


test('package selection retains contracts, dependents and removed-file coverage', () => {
  const directory = mkdtempSync(join(tmpdir(), 'eslint-test-selection-'))

  const write = (file, value) => {
    const path = join(directory, file)

    mkdirSync(join(path, '..'), { recursive: true })

    writeFileSync(path, value)
  }

  try {
    for (const [name, dependencies] of [['core', {}], ['react', { '@example/core': 'workspace:*' }], ['vue', {}]]) {
      write(`packages/${name}/package.json`, JSON.stringify({ name: `@example/${name}`, dependencies }))

      write(`packages/tests/src/${name}.test.ts`, `import '@example/${name}'`)
    }

    for (const name of ['contracts', 'integration', 'invariants', 'package-artifacts']) write(`packages/tests/src/${name}.test.ts`, '')

    write('packages/tests/package.json', JSON.stringify({ name: '@example/tests', private: true }))

    const files = result => result.relativeTests.map(file => file.replaceAll('\\', '/').split('/').at(-1)).sort()
    const contracts = ['contracts.test.ts', 'integration.test.ts', 'invariants.test.ts']
    const all = [...contracts, 'core.test.ts', 'react.test.ts', 'vue.test.ts', 'package-artifacts.test.ts'].sort()

    assert.deepEqual(files(selectAffectedTests(directory, ['packages/core/src/deleted.ts', '.changeset/fix.md'])), [...contracts, 'core.test.ts', 'react.test.ts', 'package-artifacts.test.ts'].sort())

    assert.deepEqual(files(selectAffectedTests(directory, ['packages/react/src/index.ts'])), [...contracts, 'react.test.ts', 'package-artifacts.test.ts'].sort())

    assert.deepEqual(files(selectAffectedTests(directory, ['docs/guide.md'])), contracts)

    assert.deepEqual(files(selectAffectedTests(directory, ['packages/tests/src/vue.test.ts'])), [...contracts, 'vue.test.ts'].sort())

    for (const comparison of [null, ['packages/deleted/src/index.ts'], ['packages/core/package.json'], ['vendor/guard.js'], ['.changeset/config.json'], ['scripts/test-affected.mjs'], ['unknown.toml']]) {
      const result = selectAffectedTests(directory, comparison)

      assert.equal(result.requiresFullSuite, true)

      assert.deepEqual(files(result), all)
    }
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
