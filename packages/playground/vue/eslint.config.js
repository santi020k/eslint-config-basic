// @ts-check
import { eslintConfig } from '../../basic/dist/index.js'

export default eslintConfig({
  detection: { libraries: false },
  frameworks: {
    vue: true
  },
  libraries: [],
  tsconfigRootDir: import.meta.dirname,
  typescript: true

})
