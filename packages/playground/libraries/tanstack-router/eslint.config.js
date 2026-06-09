// @ts-check
import { eslintConfig, Library } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  frameworks: {
    react: true
  },
  libraries: [Library.TanstackRouter],
  tsconfigRootDir: import.meta.dirname,
  typescript: true
})
