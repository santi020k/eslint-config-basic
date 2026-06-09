// @ts-check
import { eslintConfig } from '../../basic/dist/index.js'

export default eslintConfig({
  frameworks: {
    expo: true
  },
  tsconfigRootDir: import.meta.dirname,
  typescript: true

})
