// @ts-check
import { defineConfig, Testing } from '@santi020k/eslint-config-basic'

export default defineConfig({
  testing: [Testing.Jest]
}, {
  name: 'playground/jest-version',
  settings: {
    jest: {
      version: 30
    }
  }
})
