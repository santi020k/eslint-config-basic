import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const BASIC_PACKAGE_NAME = '@santi020k/eslint-config-basic'
const INTEGRATIONS_PACKAGE_NAME = '@santi020k/eslint-config-integrations'
const LITE_PACKAGE_NAME = '@santi020k/eslint-config-lite'

export type CatalogPreference = false | string | true

export const createInstallCommand = (
  packageManager: string,
  packages: string[],
  workspaceRoot = false,
  catalog: CatalogPreference = false
): string => {
  const packageList = packages.join(' ')

  switch (packageManager) {
    case 'bun':
      return `bun add -d ${packageList}`

    case 'npm':
      return `npm install -D ${packageList}`

    case 'yarn':
      return `yarn add -D ${packageList}`

    default:
      return `pnpm add -D${workspaceRoot ? ' --workspace-root' : ''}` +
        (catalog === true ? ' --save-catalog' : '') +
        `${typeof catalog === 'string' ? ` --save-catalog-name=${catalog}` : ''} ${packageList}`
  }
}

export const createInstallInvocation = (
  packageManager: string,
  packages: string[],
  workspaceRoot = false,
  catalog: CatalogPreference = false
): [string, string[]] => {
  switch (packageManager) {
    case 'bun':
      return ['bun', ['add', '-d', ...packages]]

    case 'npm':
      return ['npm', ['install', '-D', ...packages]]

    case 'yarn':
      return ['yarn', ['add', '-D', ...packages]]

    default:
      return ['pnpm', [
        'add',
        '-D',
        ...(workspaceRoot ? ['--workspace-root'] : []),
        ...(catalog === true ? ['--save-catalog'] : []),
        ...(typeof catalog === 'string' ? [`--save-catalog-name=${catalog}`] : []),
        ...packages
      ]]
  }
}

export const findPnpmWorkspaceRoot = (cwd: string): string | undefined => {
  let current = cwd

  for (;;) {
    if (existsSync(join(current, 'pnpm-workspace.yaml'))) return current

    const parent = dirname(current)

    if (parent === current) return undefined

    current = parent
  }
}

export const detectPackageManager = (cwd: string): string => {
  if (findPnpmWorkspaceRoot(cwd) || existsSync(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm'

  if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn'

  if (existsSync(join(cwd, 'bun.lockb')) || existsSync(join(cwd, 'bun.lock'))) return 'bun'

  return 'npm'
}

const parseCatalog = (value: unknown): CatalogPreference => {
  if (typeof value !== 'string' || !value.startsWith('catalog:')) return false

  const name = value.slice('catalog:'.length)

  return name && name !== 'default' ? name : true
}

const isDependencyRecord = (value: unknown): value is Record<string, unknown> => (
  Boolean(value) && typeof value === 'object' && !Array.isArray(value)
)

const getDependencyRecords = (
  packageJson: null | Record<string, unknown>
): Record<string, unknown>[] => ['devDependencies', 'dependencies']
  .map(field => packageJson?.[field])
  .filter(isDependencyRecord)

export const getCatalogPreference = (
  packageJson: null | Record<string, unknown>
): CatalogPreference => {
  const dependencyRecords = getDependencyRecords(packageJson)

  const basicCatalog = dependencyRecords
    .map(dependencies => parseCatalog(Reflect.get(dependencies, BASIC_PACKAGE_NAME)))
    .find(Boolean)

  if (basicCatalog) return basicCatalog

  return dependencyRecords
    .flatMap(dependencies => Object.values(dependencies))
    .map(parseCatalog)
    .find(Boolean) ?? false
}

interface YamlMappingLine {
  indent: number
  key: string
  value: string
}

const parseYamlMappingLine = (line: string): undefined | YamlMappingLine => {
  const match = /^(\s*)(?:"([^"]+)"|'([^']+)'|([^'"].*?))\s*:\s*(.*?)\s*$/.exec(line)

  if (!match) return undefined

  const value = match[5].replace(/\s+#.*$/, '').trim()
  const key = match[2] || match[3] || match[4]

  return {
    indent: match[1].length,
    key: key.trim(),
    value: /^(['"]).*\1$/.test(value) ? value.slice(1, -1) : value
  }
}

const findRootMapping = (lines: string[], key: string): number => lines.findIndex(line => {
  const mapping = parseYamlMappingLine(line)

  return mapping?.indent === 0 && mapping.key === key && mapping.value === ''
})

const findNamedCatalogSection = (
  lines: string[],
  rootIndex: number,
  catalog: string
): { index: number, indent: number } | undefined => {
  if (rootIndex < 0) return undefined

  for (let index = rootIndex + 1; index < lines.length; index++) {
    const mapping = parseYamlMappingLine(lines.at(index) ?? '')

    if (!mapping) continue

    if (mapping.indent === 0) break

    if (mapping.key === catalog && mapping.value === '') {
      return { index, indent: mapping.indent }
    }
  }

  return undefined
}

const findCatalogSection = (
  lines: string[],
  catalog: string | true
): { index: number, indent: number } | undefined => {
  if (catalog !== true) return findNamedCatalogSection(lines, findRootMapping(lines, 'catalogs'), catalog)

  const rootIndex = findRootMapping(lines, 'catalog')

  return rootIndex < 0 ? undefined : { index: rootIndex, indent: 0 }
}

const getCatalogVersion = (
  workspaceRoot: string,
  packageName: string,
  catalog: string | true
): string | undefined => {
  const workspacePath = join(workspaceRoot, 'pnpm-workspace.yaml')

  if (!existsSync(workspacePath)) return undefined

  const lines = readFileSync(workspacePath, 'utf8').split(/\r?\n/)
  const section = findCatalogSection(lines, catalog)

  if (!section) return undefined

  for (let index = section.index + 1; index < lines.length; index++) {
    const mapping = parseYamlMappingLine(lines.at(index) ?? '')

    if (!mapping) continue

    if (mapping.indent <= section.indent) break

    if (mapping.key === packageName) return mapping.value || undefined
  }

  return undefined
}

export const getCompatibleConfigVersion = (
  packageJson: null | Record<string, unknown>,
  fallbackVersion: string,
  workspaceRoot?: string
): string => {
  const basicSpec = ['devDependencies', 'dependencies', 'peerDependencies']
    .map(field => packageJson?.[field])
    .filter(isDependencyRecord)
    .map(dependencies => dependencies[BASIC_PACKAGE_NAME])
    .find((value): value is string => typeof value === 'string')

  const catalogName = basicSpec?.startsWith('catalog:') ? basicSpec.slice('catalog:'.length) : undefined
  let selectedCatalog: string | true | undefined

  if (catalogName !== undefined) selectedCatalog = catalogName && catalogName !== 'default' ? catalogName : true

  const resolvedSpec = selectedCatalog && workspaceRoot ?
    getCatalogVersion(workspaceRoot, BASIC_PACKAGE_NAME, selectedCatalog) :
    basicSpec

  const match = /(\d+)\.(\d+)\.(\d+)/.exec(resolvedSpec ?? fallbackVersion)

  return match ? `^${match[1]}.${match[2]}.${match[3]}` : '^3.1.0'
}

export const addCompatibleConfigVersions = (
  packages: string[],
  version: string
): string[] => {
  const major = /\d+/.exec(version)?.[0]
  const companionVersion = major ? `^${major}.0.0` : version

  return packages.map(packageName => packageName.startsWith('@santi020k/eslint-config-') &&
    packageName !== LITE_PACKAGE_NAME &&
    packageName !== INTEGRATIONS_PACKAGE_NAME ?
    `${packageName}@${packageName === BASIC_PACKAGE_NAME ? version : companionVersion}` :
    packageName)
}
