// @ts-check
import { defineConfig, Library } from '../../../basic/dist/index.js'

export default [
  ...defineConfig({
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
