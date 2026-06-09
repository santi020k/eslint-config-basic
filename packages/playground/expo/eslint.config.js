// @ts-check
import { defineConfig } from '../../basic/dist/index.js'

export default await defineConfig({
  frameworks: {
    expo: true
  },
  tsconfigRootDir: import.meta.dirname,
  typescript: true

})
