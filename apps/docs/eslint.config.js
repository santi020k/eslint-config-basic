// @ts-check
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  detection: { libraries: false },
  frameworks: {
    astro: true
  },
  ignores: [
    'src/content/docs/api/reference/**'
  ],
  tsconfigRootDir: import.meta.dirname,
  typescript: 'syntax'
}, {
  files: ['**/*.astro'],
  languageOptions: {
    parserOptions: {
      project: false,
      projectService: false
    }
  },
  name: 'docs/astro-no-type-checking'
})
