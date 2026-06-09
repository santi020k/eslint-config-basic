// @ts-check
import { defineConfig } from '../../basic/dist/index.js'

export default defineConfig({
  detection: { libraries: false },
  frameworks: {
    vue: true
  },
  libraries: [],
  tsconfigRootDir: import.meta.dirname,
  typescript: true

})
