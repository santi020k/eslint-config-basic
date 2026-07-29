import { defineConfig } from 'tsup'
export default defineConfig({
  entry: [
    'src/*.ts'
  ],
  bundle: false,
  format: ['esm'],
  // TODO(tsup): remove this once tsup's DTS pipeline supports TypeScript 6
  // without injecting deprecated baseUrl. See egoist/tsup#1388 and #1389.
  dts: {
    compilerOptions: {
      ignoreDeprecations: '6.0'
    }
  },
  clean: true,
  sourcemap: true,
  target: 'es2022',
  external: [/^node:/, /^@santi020k\//]
})
