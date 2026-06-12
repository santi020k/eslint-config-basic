import { defineConfig } from 'tsup'
export default defineConfig({
  entry: ['src/index.ts'],
  bundle: false,
  format: ['esm'],
  clean: true,
  sourcemap: true,
  target: 'es2022',
  external: [/^node:/]})
