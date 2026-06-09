import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        'node_modules/**',
        'dist/**',
        '../tests/**',
        '../playground/**',
        '**/*.d.ts',
        '**/*.test.ts',
        '**/*.config.ts'
      ],
      include: ['../*/src/**/*.ts'],
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      thresholds: {
        branches: 70,
        functions: 80,
        lines: 80,
        statements: 80
      }
    },
    environment: 'node',
    globals: true
  }
})
