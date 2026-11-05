import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, symlinkSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const coreRequire = createRequire(join(root, 'packages/core/package.json'))
const pluginRequire = createRequire(coreRequire.resolve('eslint-plugin-import-x'))
const guardedPath = pluginRequire.resolve('minimatch')
const guarded = pluginRequire('minimatch')
const manifest = pluginRequire('minimatch/package.json')
const temporary = mkdtempSync(join(tmpdir(), 'minimatch-guard-'))

assert.equal(manifest.name, '@santi020k/minimatch-optimization-guard')

assert.equal(manifest.version, '10.2.6-santi.1')

assert.equal(typeof guarded.makeRe, 'function')

try {
  execFileSync('tar', ['-xzf', join(root, 'vendor/minimatch/upstream-10.2.6.tgz'), '-C', temporary])

  mkdirSync(join(temporary, 'node_modules'))

  symlinkSync(dirname(createRequire(guardedPath).resolve('brace-expansion/package.json')), join(temporary, 'node_modules/brace-expansion'), 'dir')

  const original = await import(pathToFileURL(join(temporary, 'package/dist/esm/index.js')).href)
  const esm = await import(pathToFileURL(guardedPath.replace('/commonjs/', '/esm/')).href)
  const amplification = () => [['**', '..', 'a', 'b', '**', '..', 'c', 'd', '**', '..', 'e', 'f', '**', '..', 'g', 'h']]

  const bounded = api => {
    const matcher = new api.Minimatch('x', { braceExpandMax: 8 })

    assert.ok(matcher.firstPhasePreProcess(amplification()).length <= 8)

    matcher.partsMatch = () => { throw new Error('Quadratic comparison was reached') }

    assert.equal(matcher.secondPhasePreProcess(Array.from({ length: 1001 }, () => ['x'])).length, 1001)
  }

  bounded(guarded)

  bounded(esm)

  assert.throws(() => bounded(original), assert.AssertionError)

  const originalQuadratic = new original.Minimatch('x')

  originalQuadratic.partsMatch = () => { throw new Error('Quadratic comparison was reached') }

  assert.throws(() => originalQuadratic.secondPhasePreProcess(Array.from({ length: 1001 }, () => ['x'])), /Quadratic comparison was reached/)

  for (const optimizationLevel of [0, 1, 2]) {
    for (const pattern of ['src/**/*.ts', 'a/**/../b/c', '*.{js,ts}', '**/.*', '!**/*.js']) {
      for (const path of ['src/index.ts', 'src/lib/a.ts', 'a/b/c', 'index.js', '.config', 'README.md']) {
        const options = { optimizationLevel }

        assert.equal(guarded.minimatch(path, pattern, options), original.minimatch(path, pattern, options))

        assert.equal(esm.minimatch(path, pattern, options), original.minimatch(path, pattern, options))
      }
    }
  }

  assert.ok(guarded.makeRe('src/**/*.ts').test('src/index.ts'))

  process.stdout.write('Minimatch optimization bounds, ESM/CommonJS API compatibility, and original-code negative control passed.\n')
} finally {
  rmSync(temporary, { recursive: true, force: true })
}
