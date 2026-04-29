import { defineConfig } from 'tsup'

const env = process.env.NODE_ENV

const shared = {
  splitting: true,
  clean: true,
  dts: true,
  bundle: false,
  format: ['esm' as const],
  minify: false,
  skipNodeModulesBundle: true,
  watch: env === 'development',
  target: 'es2020' as const,
  outDir: 'dist',
}

export default defineConfig([
  {
    ...shared,
    entry: [
      'src/agent-skill-generator.ts',
      'src/index.ts',
      'src/compose.ts',
      'src/optionals.ts',
      'src/resolvers.ts',
    ],
  },
  {
    ...shared,
    entry: ['src/cli.ts'],
    banner: { js: '#!/usr/bin/env node' },
  },
])
