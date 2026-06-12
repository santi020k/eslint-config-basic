import { defineConfig } from 'tsup'
export default defineConfig({
  entry: ['src/index.ts'],
  bundle: false,
  format: ['esm'],
  dts: {
    compilerOptions: {
      ignoreDeprecations: '6.0'
    }
  },
  clean: true,
  sourcemap: true,
  target: 'es2022',
  external: [/^node:/]})
