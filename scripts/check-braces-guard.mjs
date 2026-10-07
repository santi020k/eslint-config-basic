import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { runInNewContext } from 'node:vm'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const nextRequire = createRequire(join(root, 'packages/next/package.json'))
const pluginRequire = createRequire(nextRequire.resolve('@next/eslint-plugin-next'))
const globRequire = createRequire(pluginRequire.resolve('fast-glob'))
const micromatchRequire = createRequire(globRequire.resolve('micromatch'))
const guardedRequire = createRequire(micromatchRequire.resolve('braces'))
const braces = micromatchRequire('braces')
const manifest = guardedRequire('./package.json')

assert.equal(manifest.name, '@santi020k/braces-depth-guard')

assert.equal(manifest.version, '3.0.3-santi.1')

const guard = /exceeds the maximum depth/
const nested = (open, close, depth) => `${open.repeat(depth)}a,b${close.repeat(depth)}`
let checks = 0

const check = action => { action();

 checks += 1 }

for (const [open, close] of [['{', '}'], ['(', ')']]) {
  for (const method of ['parse', 'compile', 'expand', 'stringify']) {
    check(() => assert.doesNotThrow(() => braces[method](nested(open, close, 100))))

    for (const depth of [101, 4998]) {
      check(() => assert.throws(() => braces[method](nested(open, close, depth)), guard))
    }
  }
}

const ast = depth => {
  let node = { type: 'text', value: 'a' }

  for (let index = 0; index < depth; index += 1) node = { type: 'paren', nodes: [node] }

  return { type: 'root', nodes: [node] }
}

for (const method of ['compile', 'expand', 'stringify']) {
  check(() => assert.throws(() => braces[method](ast(20000)), guard))

  const cycle = { type: 'root', nodes: [] }

  cycle.nodes.push(cycle)

  check(() => assert.throws(() => braces[method](cycle), guard))
}

const parent = { type: 'paren', queue: [] }

parent.parent = parent

check(() => assert.throws(() => braces.expand({
  type: 'root', nodes: [{ type: 'paren', parent, nodes: [] }]
}), guard))

for (const pattern of ['{('.repeat(51), '{'.repeat(101), '('.repeat(101)]) {
  check(() => assert.throws(() => braces.parse(pattern), guard))
}

for (const pattern of ['\\{'.repeat(500), `"${'{'.repeat(500)}"`, `[${'{'.repeat(500)}]`]) {
  check(() => assert.doesNotThrow(() => braces.compile(pattern)))
}

check(() => assert.deepEqual(braces.expand('a{b,c}{1..3}'), ['ab1', 'ab2', 'ab3', 'ac1', 'ac2', 'ac3']))

check(() => assert.deepEqual(braces.expand('{01..03}'), ['01', '02', '03']))

check(() => assert.deepEqual(braces.expand('{a,{b,c}}'), ['a', 'b', 'c']))

// Prove the regression catches the original recursive walker, not just an alias.
const originalSource = execFileSync('tar', [
  '-xOf', join(root, 'vendor/braces/upstream-3.0.3.tgz'), 'package/lib/compile.js'
], { encoding: 'utf8' })

const original = { exports: undefined }

runInNewContext(originalSource, {
  module: original,
  require: createRequire(guardedRequire.resolve('./lib/compile.js'))
})

check(() => assert.throws(() => original.exports(ast(20000)), /call stack/))

process.stdout.write(`${checks} braces depth, cycle, compatibility, and original-code regression checks passed.\n`)
