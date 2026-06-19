// @ts-check
import { defineConfig, Library } from '@santi020k/eslint-config-basic'

export default [
  ...(await defineConfig({
    libraries: [Library.Tailwind],
    tsconfigRootDir: import.meta.dirname
  })),
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
