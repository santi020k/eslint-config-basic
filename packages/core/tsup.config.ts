import { defineConfig } from 'tsup'
export default defineConfig({
  entry: ['src/index.ts', 'src/types.ts', 'src/rules.ts', 'src/utils/index.ts', 'src/utils/detection.ts', 'src/settings/index.ts', 'src/settings/gitignore.ts'],
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
  // Prevent rollup-plugin-dts from attempting to bundle node built-in types
  // (node:fs, node:path, etc.), which causes a silent worker crash,
  external: [/^node:/, /^@santi020k\//]
})
