import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import test from 'node:test'

const require = createRequire(new URL('../package.json', import.meta.url))
const prismaRequire = createRequire(require.resolve('prisma/package.json'))
const configPath = prismaRequire.resolve('@prisma/config')
const configRequire = createRequire(configPath)
const schemaPath = configRequire.resolve('effect/Schema')

test('Prisma config uses the bounded template decoder and preserves config loading', () => {
  // Execute in an isolated process so a vulnerable decoder cannot hang the test runner.
  const output = execFileSync(process.execPath, ['--input-type=module', '-e', `
    import assert from 'node:assert/strict'
    import { createRequire } from 'node:module'
    const require = createRequire(import.meta.url)
    const Schema = require(process.argv[1])
    const { defineConfig } = require(process.argv[2])
    const template = Schema.TemplateLiteral(Schema.String, ':', Schema.String, ':', Schema.String, 'X')
    const decode = Schema.decodeUnknownSync(template)
    assert.equal(decode('first:second:thirdX'), 'first:second:thirdX')
    assert.throws(() => decode(':'.repeat(10000)))
    const config = defineConfig({ schema: 'prisma/schema.prisma' })
    assert.equal(config.schema, 'prisma/schema.prisma')
    process.stdout.write('verified')
  `, schemaPath, configPath], { encoding: 'utf8', timeout: 5000 })

  assert.equal(output, 'verified')
})
