import { defineConfig } from 'tsup'
export default defineConfig({
  entry: [
    'src/index.ts',
    'src/lazy.ts',
    'src/tools/*.ts',
    'src/libraries/*.ts',
    'src/testing/*.ts',
    'src/formats/*.ts',
    'src/extensions/*.ts'
  ],
  bundle: false,
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'es2022'
})
