// @ts-check
import { defineConfig } from '../../basic/dist/index.js'

export default defineConfig({
  frameworks: {
    vite: true
  },
  tsconfigRootDir: import.meta.dirname,
  typescript: true
})
