import { defineConfig } from 'tsup'
export default defineConfig({
  entry: ['src/index.ts'],
  bundle: false,
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'es2022'
})
