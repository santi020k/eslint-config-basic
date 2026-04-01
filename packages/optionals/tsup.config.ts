import { defineConfig } from 'tsup'
export default defineConfig({
  entry: [
    'src/index.ts',
    'src/tools/*.ts',
    'src/libraries/*.ts',
    'src/testing/*.ts',
    'src/formats/*.ts',
    'src/extensions/*.ts'
  ],
  format: ['esm'],
  dts: true,
  clean: true,
  bundle: false,
  sourcemap: true,
  target: 'es2022'
})
