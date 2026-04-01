import { defineConfig } from 'tsup'
export default defineConfig({
  entry: ['src/index.ts', 'src/types.ts', 'src/rules.ts', 'src/utils/index.ts', 'src/utils/detection.ts', 'src/settings/index.ts', 'src/settings/gitignore.ts'],
  bundle: false,
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'es2022'
})
