import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const workingDirectory = process.cwd()

const repositoryRoot = existsSync(join(workingDirectory, 'packages/basic/package.json')) ?
  workingDirectory :
  resolve(workingDirectory, '../..')

const docsRoot = join(repositoryRoot, 'apps/docs/src/content/docs')
const coreTypesPath = join(repositoryRoot, 'packages/core/src/types.ts')
const packageManifestPath = join(repositoryRoot, 'packages/basic/package.json')

const frameworkGuideCount = readdirSync(join(docsRoot, 'frameworks'))
  .filter(filename => filename.endsWith('.md') || filename.endsWith('.mdx'))
  .length

const coreTypes = readFileSync(coreTypesPath, 'utf8')

const countEnumMembers = (name: string): number => {
  const body = new RegExp(`export enum ${name} \\{([\\s\\S]*?)\\n\\}`, 'u').exec(coreTypes)?.[1] ?? ''

  return [...body.matchAll(/^\s{2}[A-Z][A-Za-z0-9]*\s*=/gmu)].length
}

const optionalConfigCount = [
  'Extension',
  'Format',
  'Library',
  'Testing',
  'Tool'
].reduce((total, name) => total + countEnumMembers(name), 0)

const packageVersion = (JSON.parse(readFileSync(packageManifestPath, 'utf8')) as { version: string }).version

export const siteMetrics = Object.freeze({
  frameworkGuideCount,
  optionalConfigCount,
  packageVersion
})
