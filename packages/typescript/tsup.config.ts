import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/rules.ts'],
  bundle: false,
  format: ['esm'],
  clean: true,
  splitting: false,
  sourcemap: true,
  // Prevent rollup-plugin-dts from attempting to bundle node built-in types
  // (node:fs), which causes a silent worker crash,
  external: [/^node:/]
})
