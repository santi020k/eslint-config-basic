// @ts-check

import { eslintConfig, NextMode } from '@santi020k/eslint-config-basic'
import next from '@santi020k/eslint-config-next'
import react from '@santi020k/eslint-config-react'

export default eslintConfig({
  tsconfigRootDir: import.meta.dirname,
  typescript: true,
  nextMode: NextMode.AppRouter,
  frameworks: {
    next,
    react
  }

})
