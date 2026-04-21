// @ts-check
import { eslintConfig, Library } from '@santi020k/eslint-config-basic'

export default [
  ...eslintConfig({
    tsconfigRootDir: import.meta.dirname,
    libraries: [Library.Tailwind]
  }),
  {
    name: 'playground/tailwind/settings',
    settings: {
      'better-tailwindcss': {
        entryPoint: './src/index.css'
      }
    }
  }
]
