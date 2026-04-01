import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ["src/index.ts", "src/rules.ts"],
  format: ['esm'],
  dts: true,
  splitting: false,
  bundle: false,
  sourcemap: true,
  clean: true,
  target: 'es2022',
  platform: 'node'
})
