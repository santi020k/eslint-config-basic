// @ts-check
import { defineConfig } from '../../basic/dist/index.js'

export default defineConfig({
  frameworks: {
    qwik: true
  },
  tsconfigRootDir: import.meta.dirname,
  typescript: true
})
