// @ts-check
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  detection: { libraries: false },
  frameworks: {
    vue: true
  },
  libraries: [],
  tsconfigRootDir: import.meta.dirname,
  typescript: true

})
