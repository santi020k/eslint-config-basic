// @ts-check
import { eslintConfig } from '../../basic/dist/index.js'

export default eslintConfig({
  frameworks: {
    remix: true
  },
  tsconfigRootDir: import.meta.dirname,
  typescript: true
})
