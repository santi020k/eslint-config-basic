// @ts-check
import { eslintConfig, Library } from '@santi020k/eslint-config-basic'

export default [
  ...eslintConfig({
    tsconfigRootDir: import.meta.dirname,
    libraries: [Library.Tailwind]
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
