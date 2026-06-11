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

export default defineConfig({
  resolve: {
    alias: workspacePackageAliases
  },
  test: {
    coverage: {
      all: true,
      exclude: [
        'node_modules/**',
        '../docs/**',
        '../tests/**',
        '../playground/**',
        '**/*.d.ts',
        '**/*.test.ts',
        '**/*.config.ts'
      ],
      include: ['../*/src/**/*.ts'],
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      thresholds: {
        100: false,
        branches: 50,
        functions: 65,
        lines: 70,
        statements: 70
      },
      thresholdsAutoUpdate: false
    },
    environment: 'node',
    globals: true,
    pool: 'forks'
  }
})
