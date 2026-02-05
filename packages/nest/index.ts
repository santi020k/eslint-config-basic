import core from '@santi020k/eslint-config-core'

export default [
  ...core,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  }
]
