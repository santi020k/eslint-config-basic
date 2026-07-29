import { defineConfig } from 'tsup'

export default defineConfig({
  bundle: false,
  clean: true,
  dts: {
    compilerOptions: {
      ignoreDeprecations: '6.0'
    }
  },
  entry: ['src/index.ts'],
  external: [/^@santi020k\//],
  format: ['esm'],
  outDir: 'dist',
  skipNodeModulesBundle: true,
  target: 'es2022'
})
