// @ts-check
import { defineConfig, Format } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  detection: { libraries: false },
  formats: [Format.Mdx, Format.Markdown],
  frameworks: {
    astro: true
  },
  ignores: [
    'src/content/docs/api/reference/**',
    'src/content/docs/v2/api/reference/**'
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
}, {
  files: ['**/*.md/*.js', '**/*.md/*.ts', '**/*.mdx/*.js', '**/*.mdx/*.ts'],
  name: 'docs/markdown-code-blocks',
  rules: {
    'no-redeclare': 'off'
  }
})
