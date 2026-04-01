import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/rules.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  splitting: false,
  bundle: false,
  sourcemap: true
})
