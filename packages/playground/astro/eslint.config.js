// @ts-check
import { defineConfig } from '../../basic/dist/index.js'

export default await defineConfig({
  detectRootDir: import.meta.dirname,
  frameworks: {
    astro: true
  },
  tsconfigRootDir: import.meta.dirname,
  typescript: true
})
