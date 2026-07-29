import { defineConfig } from 'tsup'

export default defineConfig({
  bundle: false,
  clean: true,
  dts: { compilerOptions: { ignoreDeprecations: '6.0' } },
  entry: ['src/*.ts', '!src/*.d.ts'],
  external: [/^node:/, /^@santi020k\//],
  format: ['esm'],
  sourcemap: true,
  target: 'es2022'
})
