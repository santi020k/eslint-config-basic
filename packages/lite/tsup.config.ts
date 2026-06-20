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
  target: 'es2020' as const,
  outDir: 'dist',
  external: [/^node:/, /^@santi020k\//],
}

export default defineConfig([
  {
    ...shared,
    entry: [
      'src/index.ts',
      'src/frameworks.ts',
      'src/integrations.ts',
      'src/resolvers.ts',
      'src/tailwind.ts',
    ],
  }
])
