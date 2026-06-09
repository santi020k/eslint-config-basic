// @ts-check
import { eslintConfig, Library } from '../../../basic/dist/index.js'

export default eslintConfig({
  frameworks: {
    react: true
  },
  libraries: [Library.TanstackRouter],
  tsconfigRootDir: import.meta.dirname,
  typescript: true
})
