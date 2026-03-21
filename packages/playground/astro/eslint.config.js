// @ts-check
import astro from '@santi020k/eslint-config-astro'
import { eslintConfig } from '@santi020k/eslint-config-basic'
import react from '@santi020k/eslint-config-react'

export default [
  {
    ignores: ['**/.yalc/**', '**/yalc.lock', '**/node_modules/**', 'dist/**']
  },
  ...eslintConfig({
    typescript: true,
    frameworks: {
      react,
      astro
    }
  })
]
