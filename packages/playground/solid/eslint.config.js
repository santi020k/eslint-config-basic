// @ts-check
import { defineConfig } from '../../basic/dist/index.js'

export default await defineConfig({
  frameworks: {
    solid: true
  },
  tsconfigRootDir: import.meta.dirname,
  typescript: true

})
