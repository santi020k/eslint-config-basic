import { defineConfig } from 'tsup'

export default defineConfig({
  bundle: false,
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['esm'],
  sourcemap: true,
  splitting: false
})
