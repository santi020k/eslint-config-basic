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
  // eslint-plugin-solid's declaration file imports @typescript-eslint/utils,
  // causing rollup-plugin-dts to attempt to bundle the entire package and crash.
  // Mark it external so the import is preserved as-is in the output .d.ts.,
  external: [/^node:/, /@typescript-eslint/]
})
