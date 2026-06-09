// @ts-check
import { eslintConfig } from '../../basic/dist/index.js'

export default eslintConfig({
  detectRootDir: import.meta.dirname,
  frameworks: {
    astro: true
  },
  tsconfigRootDir: import.meta.dirname,
  typescript: true
})
