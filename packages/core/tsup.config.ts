import { defineConfig } from 'tsup'
export default defineConfig({
  entry: ['src/index.ts', 'src/types.ts', 'src/rules.ts', 'src/utils/index.ts', 'src/utils/detection.ts', 'src/settings/index.ts', 'src/settings/gitignore.ts'],
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
  // Prevent rollup-plugin-dts from attempting to bundle node built-in types
  // (node:fs, node:path, etc.), which causes a silent worker crash,
  external: [/^node:/]
})
