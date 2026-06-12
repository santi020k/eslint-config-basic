import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ["src/index.ts", "src/rules.ts"],
  bundle: false,
  format: ['esm'],
  dts: {
    compilerOptions: {
      ignoreDeprecations: '6.0'
    }
  },
  clean: true,
  splitting: false,
  sourcemap: true,
  external: [/^node:/]
})
