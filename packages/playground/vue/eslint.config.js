// @ts-check
import { defineConfig } from '../../basic/dist/index.js'

export default await defineConfig({
  detection: { libraries: false },
  frameworks: {
    vue: true
  },
  libraries: [],
  tsconfigRootDir: import.meta.dirname,
  typescript: true

})
