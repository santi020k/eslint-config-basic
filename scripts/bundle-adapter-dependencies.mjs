import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, realpathSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import process from 'node:process'

const adapters = {
  astro: ['eslint-plugin-astro'],
  extensions: ['@santi020k/eslint-plugin-astro-doctor'],
  formats: ['@graphql-eslint/eslint-plugin'],
  next: ['@next/eslint-plugin-next']
}

const externalPeers = new Set(['eslint', 'graphql', 'typescript'])
const packageDir = process.cwd()
const adapter = process.argv[2]
const plugins = adapters[adapter]

if (!plugins) throw new Error(`No guarded dependency bundle is defined for ${adapter}.`)

const vendorDir = join(packageDir, 'dist/vendor')
const rootModules = join(vendorDir, 'node_modules')
const installed = new Map()
const copiedSources = new Map()

const nearestCopy = (name, modulesDir) => {
  let current = dirname(modulesDir)

  while (true) {
    const source = copiedSources.get(join(current, 'node_modules', name))

    if (source) return source

    const parent = dirname(current)

    if (parent === current) return undefined

    current = parent
  }
}

const findDependency = (name, from) => {
  let current = from

  while (true) {
    const candidate = join(current, 'node_modules', name)

    if (existsSync(join(candidate, 'package.json'))) return realpathSync(candidate)

    const parent = dirname(current)

    if (parent === current) return undefined

    current = parent
  }
}

const getChildren = (name, source) => {
  const manifest = JSON.parse(readFileSync(join(source, 'package.json'), 'utf8'))
  const dependencies = { ...manifest.dependencies, ...manifest.optionalDependencies }

  return Object.keys(dependencies).sort().flatMap(dependency => {
    if (externalPeers.has(dependency)) return []

    const dependencySource = findDependency(dependency, source)

    if (!dependencySource && dependency in (manifest.optionalDependencies ?? {})) return []

    if (!dependencySource) throw new Error(`Cannot bundle ${dependency} required by ${name}.`)

    return [{ name: dependency, source: dependencySource }]
  })
}

const copyDependency = (name, source, modulesDir = rootModules) => {
  const rootCopy = installed.get(name)

  if (nearestCopy(name, modulesDir) === source) return

  const destinationModules = rootCopy ? modulesDir : rootModules
  const destination = join(destinationModules, name)

  if (copiedSources.has(destination)) throw new Error(`Conflicting bundle resolution for ${name}.`)

  if (!rootCopy) installed.set(name, source)

  copiedSources.set(destination, source)

  mkdirSync(dirname(destination), { recursive: true })

  cpSync(source, destination, {
    recursive: true,
    filter: path => !relative(source, path).split(/[\\/]/).includes('node_modules')
  })

  for (const dependency of getChildren(name, source)) {
    copyDependency(dependency.name, dependency.source, join(destination, 'node_modules'))
  }
}

for (const plugin of plugins) {
  const source = findDependency(plugin, packageDir)

  if (!source) throw new Error(`Cannot find the installed ${plugin} dependency.`)

  copyDependency(plugin, source)
}

// Resolve through a private package scope while leaving host peers outside it.
writeFileSync(join(vendorDir, 'package.json'), '{"private":true,"type":"commonjs"}\n')

for (const plugin of plugins) {
  const wrapperName = `${plugin.split('/').at(-1)}.mjs`

  writeFileSync(join(vendorDir, wrapperName),
    `import * as plugin from ${JSON.stringify(plugin)}\nexport default plugin.default ?? plugin\n`)

  for (const entry of readdirSync(join(packageDir, 'dist'))) {
    if (!entry.endsWith('.js')) continue

    const path = join(packageDir, 'dist', entry)
    const content = readFileSync(path, 'utf8')
    const specifier = JSON.stringify(plugin)
    const replacement = JSON.stringify(`./vendor/${wrapperName}`)

    const rewritten = content
      .replaceAll(`from ${specifier}`, `from ${replacement}`)
      .replaceAll(`import(${specifier})`, `import(${replacement})`)
      .replaceAll(`loadDefault(${specifier})`, `loadDefault(${replacement})`)

    if (content !== rewritten) writeFileSync(path, rewritten)
  }
}

process.stdout.write(`Bundled guarded runtime dependencies for ${adapter}.\n`)
