import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ["src/index.ts", "src/rules.ts"],
  bundle: false,
  format: ['esm'],
  clean: true,
  splitting: false,
  sourcemap: true,
  external: [/^node:/]
})
