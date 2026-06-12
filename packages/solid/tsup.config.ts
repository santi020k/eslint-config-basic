import { defineConfig } from 'tsup'
export default defineConfig({
  entry: ['src/index.ts'],
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
  // eslint-plugin-solid's declaration file imports @typescript-eslint/utils,
  // causing rollup-plugin-dts to attempt to bundle the entire package and crash.
  // Mark it external so the import is preserved as-is in the output .d.ts.,
  external: [/^node:/, /@typescript-eslint/]
})
