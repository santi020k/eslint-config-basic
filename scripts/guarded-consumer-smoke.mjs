import assert from 'node:assert/strict'
import { mkdirSync, readdirSync, readFileSync, realpathSync, writeFileSync } from 'node:fs'
import { createRequire, findPackageJSON } from 'node:module'
import { dirname, join, sep } from 'node:path'
import { pathToFileURL } from 'node:url'

const consumerRequire = createRequire(join(process.cwd(), 'package.json'))
const consumerBase = pathToFileURL(join(process.cwd(), 'package.json'))
const composerPackage = process.argv[2] ?? '@santi020k/eslint-config-full'
const fullManifest = realpathSync(findPackageJSON(composerPackage, consumerBase))
const fullBase = pathToFileURL(fullManifest)
const { ESLint } = consumerRequire('eslint')

const adapters = {
  astro: 'eslint-plugin-astro',
  extensions: '@santi020k/eslint-plugin-astro-doctor',
  formats: '@graphql-eslint/eslint-plugin',
  next: '@next/eslint-plugin-next'
}

const bundles = new Map()

const checkTree = directory => {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)

    if (entry.isDirectory()) checkTree(path)

    if (entry.name !== 'package.json') continue

    const manifest = JSON.parse(readFileSync(path, 'utf8'))

    assert.notEqual(manifest.name, 'braces', 'An unpatched braces package was bundled')

    if (manifest.name !== '@santi020k/braces-depth-guard') continue

    assert.equal(manifest.version, '3.0.3-santi.1')

    assert.match(readFileSync(join(directory, 'LICENSE'), 'utf8'), /MIT/)

    const braces = createRequire(path)('./index.js')

    assert.doesNotThrow(() => braces.compile(`${'{'.repeat(100)}a,b${'}'.repeat(100)}`))

    assert.throws(() => braces.compile(`${'{'.repeat(101)}a,b${'}'.repeat(101)}`), /exceeds the maximum depth/)
  }
}

for (const [adapter, plugin] of Object.entries(adapters)) {
  const manifest = realpathSync(findPackageJSON(`@santi020k/eslint-config-${adapter}`, fullBase))
  const main = join(dirname(manifest), 'dist/index.js')
  const vendor = join(dirname(main), 'vendor')
  const bundledRequire = createRequire(join(vendor, 'package.json'))
  const bundledManifest = findPackageJSON(plugin, pathToFileURL(join(vendor, 'package.json')))
  const resolved = realpathSync(bundledManifest)

  assert.ok(resolved.startsWith(`${realpathSync(vendor)}${sep}`), `${plugin} must resolve inside its adapter`)

  assert.equal(realpathSync(bundledRequire.resolve('eslint')), realpathSync(consumerRequire.resolve('eslint')))

  checkTree(vendor)

  bundles.set(adapter, bundledRequire)
}

mkdirSync('fixtures/pages', { recursive: true })

mkdirSync('fixtures/schema', { recursive: true })

writeFileSync('fixtures/pages/index.js', 'export const home = true\n')

writeFileSync('fixtures/schema/query.graphql', 'type Query { hello: String }\n')

writeFileSync('fixtures/schema/other.gql', 'type Other { id: ID! }\n')

const nextRequire = bundles.get('next')
const pluginRequire = createRequire(nextRequire.resolve('@next/eslint-plugin-next'))
const { getRootDirs } = pluginRequire('./utils/get-root-dirs.js')

assert.deepEqual(getRootDirs({ cwd: process.cwd(), settings: { next: { rootDir: 'fixtures/{pages,missing}' } } }), [
  'fixtures/pages'
])

assert.throws(() => getRootDirs({
  cwd: process.cwd(), settings: { next: { rootDir: `${'{'.repeat(4998)}a,b${'}'.repeat(4998)}` } }
}), /exceeds the maximum depth/)

const formatsRequire = bundles.get('formats')
const graphqlModule = formatsRequire('@graphql-eslint/eslint-plugin')
const graphql = graphqlModule.default ?? graphqlModule

assert.equal(realpathSync(formatsRequire.resolve('graphql')), realpathSync(consumerRequire.resolve('graphql')))

writeFileSync('.graphqlrc.json', JSON.stringify({ schema: 'fixtures/schema/*.{graphql,gql}' }))

const lint = new ESLint({
  cwd: process.cwd(), ignore: false, overrideConfigFile: true,
  overrideConfig: [{
    files: ['**/*.graphql'], languageOptions: { parser: graphql.parser },
    plugins: { '@graphql-eslint': graphql }, rules: { '@graphql-eslint/known-type-names': 'error' }
  }]
})

const valid = await lint.lintText('query Hello { hello }\n', { filePath: 'fixtures/operations.graphql' })
const invalid = await lint.lintText('fragment Invalid on Missing { hello }\n', { filePath: 'fixtures/operations.graphql' })

assert.equal(valid[0].errorCount, 0)

assert.ok(invalid[0].messages.some(message => message.ruleId === '@graphql-eslint/known-type-names'))

const { GraphQLFileLoader } = formatsRequire('@graphql-tools/graphql-file-loader')

assert.throws(() => new GraphQLFileLoader().resolveGlobsSync(
  `fixtures/${'{'.repeat(101)}a,b${'}'.repeat(101)}/*.graphql`, { cwd: process.cwd() }
), /exceeds the maximum depth/)

const { defineConfig } = await import(pathToFileURL(join(dirname(fullManifest), 'dist/index.js')).href)

const config = await defineConfig({
  detection: false,
  features: { 'astro-doctor': true, graphql: true, jsdoc: true, 'package-json': true, regexp: true },
  frameworks: { astro: true, next: true },
  typeChecked: false
})

for (const name of ['astro-doctor', 'graphql', 'jsdoc', 'package-json', 'regexp', 'next']) {
  assert.ok(config.some(entry => entry.name?.includes(name)), `Full must load ${name} from the packed packages`)
}

const astroLint = new ESLint({
  cwd: process.cwd(), ignore: false, overrideConfigFile: true, overrideConfig: config
})

const missingAlt = await astroLint.lintText('<img src="/logo.svg" />\n', { filePath: 'fixture.astro' })
const accessibleImage = await astroLint.lintText('<img src="/logo.svg" alt="Logo" />\n', { filePath: 'fixture.astro' })

assert.ok(missingAlt[0].messages.some(message => message.ruleId === 'astro-doctor/no-missing-alt'))

assert.ok(!accessibleImage[0].messages.some(message => message.ruleId === 'astro-doctor/no-missing-alt'))

process.stdout.write('Packed adapters and Full deliver guarded globs and preserve host ESLint/GraphQL peers.\n')
