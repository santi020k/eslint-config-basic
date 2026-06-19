// @ts-check
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  tailwind: {
    entryPoint: './src/index.css'
  },
  tsconfigRootDir: import.meta.dirname
}, {
  name: 'playground/tailwind/rules',
  rules: {
    'better-tailwindcss/enforce-canonical-classes': 'off'
  }
})
