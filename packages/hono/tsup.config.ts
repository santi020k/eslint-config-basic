import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ["src/index.ts"],
  bundle: false,
  format: ['esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  target: 'es2022'
})
