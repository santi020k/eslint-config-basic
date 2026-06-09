// @ts-check
import { eslintConfig, Library } from '@santi020k/eslint-config-basic'

export default [
  ...eslintConfig({
    libraries: [Library.Tailwind],
    tsconfigRootDir: import.meta.dirname
  }),
  {
    name: 'playground/tailwind/settings',
    rules: {
      'better-tailwindcss/enforce-canonical-classes': 'off'
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: './src/index.css'
      }
    }
  }
]
