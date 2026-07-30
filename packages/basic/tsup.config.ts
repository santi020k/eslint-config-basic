import { defineConfig } from 'tsup'

const env = process.env.NODE_ENV

const shared = {
  splitting: true,
  clean: true,
  // TODO(tsup): remove this once tsup's DTS pipeline supports TypeScript 6
  // without injecting deprecated baseUrl. See egoist/tsup#1388 and #1389.
  dts: {
    compilerOptions: {
      ignoreDeprecations: '6.0'
    }
  },
  bundle: false,
  format: ['esm' as const],
  minify: false,
  skipNodeModulesBundle: true,
  watch: env === 'development',
  target: 'es2022' as const,
  outDir: 'dist',
  external: [/^node:/, /^@santi020k\//]
}

export default defineConfig([
  {
    ...shared,
    entry: [
      'src/agent-skill-generator.ts',
      'src/cli-advanced.ts',
      'src/cli-migration.ts',
      'src/cli-preset.ts',
      'src/cli-workflows.ts',
      'src/define-config-metadata.ts',
      'src/index.ts',
      'src/frameworks.ts',
      'src/integrations.ts',
      'src/optional-package-errors.ts',
      'src/recommended.ts',
      'src/resolvers.ts',
      'src/tailwind.ts'
    ]
  },
  {
    ...shared,
    entry: ['src/cli.ts'],
    banner: { js: '#!/usr/bin/env node' }
  }
])
