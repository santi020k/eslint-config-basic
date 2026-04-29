// @ts-check

import { eslintConfig, NextMode } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  tsconfigRootDir: import.meta.dirname,
  typescript: true,
  nextMode: NextMode.AppRouter,
  frameworks: {
    next: true
  }

})
