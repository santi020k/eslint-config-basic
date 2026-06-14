import { defineConfig } from 'tsup'

export default defineConfig({
  bundle: false,
  clean: true,
  entry: ['src/index.ts'],
  format: ['esm'],
  // TODO(tsup): remove this once tsup's DTS pipeline supports TypeScript 6
  // without injecting deprecated baseUrl. See egoist/tsup#1388 and #1389.
  dts: {
    compilerOptions: {
      ignoreDeprecations: '6.0'
    }
  },
  sourcemap: true,
  splitting: false,
  external: [/^node:/, /^@santi020k\//]
})
