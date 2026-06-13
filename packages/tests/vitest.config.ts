import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vitest/config'

const testsDir = dirname(fileURLToPath(import.meta.url))
const rootDir = join(testsDir, '../..')
const packagesDir = join(rootDir, 'packages')

const workspacePackageAliases = Object.fromEntries(
  readdirSync(packagesDir)
    .map(packageDirName => join(packagesDir, packageDirName))
    .filter(packageDir => existsSync(join(packageDir, 'package.json')) && existsSync(join(packageDir, 'src/index.ts')))
    .map(packageDir => {
      const packageJson = JSON.parse(readFileSync(join(packageDir, 'package.json'), 'utf8')) as { name: string }

      return [packageJson.name, join(packageDir, 'src/index.ts')]
    })
)

const integrationSubpathAliases = {
  '@santi020k/eslint-config-integrations/extensions': join(packagesDir, 'integrations/src/extensions/index.ts'),
  '@santi020k/eslint-config-integrations/formats': join(packagesDir, 'integrations/src/formats/index.ts'),
  '@santi020k/eslint-config-integrations/libraries': join(packagesDir, 'integrations/src/libraries/index.ts'),
  '@santi020k/eslint-config-integrations/testing': join(packagesDir, 'integrations/src/testing/index.ts'),
  '@santi020k/eslint-config-integrations/tools': join(packagesDir, 'integrations/src/tools/index.ts')
}

export default defineConfig({
  resolve: {
    alias: {
      ...integrationSubpathAliases,
      ...workspacePackageAliases
    }
  },
  root: rootDir,
  test: {
    coverage: {
      exclude: [
        'node_modules/**',
        'apps/docs/**',
        'packages/tests/**',
        'packages/playground/**',
        '**/*.d.ts',
        '**/*.test.ts',
        '**/*.config.ts'
      ],
      include: ['packages/*/src/**/*.ts'],
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './packages/tests/coverage',
      thresholds: {
        100: false,
        branches: 80,
        functions: 90,
        lines: 85,
        statements: 85
      },
    },
    environment: 'node',
    globals: true,
    include: ['packages/tests/src/**/*.test.ts'],
    pool: 'forks',
    testTimeout: 60000
  }
})
