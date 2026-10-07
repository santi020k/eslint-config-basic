import { defineConfig, devices } from '@playwright/test'

const isGithubCi = Boolean(process.env.CI)
const previewHost = '127.0.0.1'
const previewPort = Number(process.env.DOCS_TEST_PORT ?? 4173)

if (!Number.isInteger(previewPort) || previewPort < 1 || previewPort > 65535) {
  throw new Error('DOCS_TEST_PORT must be an integer between 1 and 65535.')
}

const previewURL = `http://${previewHost}:${previewPort}`

// Starlight docs might need a build before preview
const previewServerCommand =
  `pnpm run docs:preview --host ${previewHost} --port ${previewPort} --ignore-lock`

export default defineConfig({
  expect: {
    timeout: 10_000
  },
  forbidOnly: isGithubCi,
  fullyParallel: true,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      testMatch: ['navigation-controls.spec.ts', 'design-system.spec.ts'],
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      testMatch: ['navigation-controls.spec.ts', 'design-system.spec.ts'],
      use: { ...devices['Desktop Safari'] }
    }
  ],
  reporter: 'html',
  retries: isGithubCi ? 2 : 0,
  testDir: './tests',
  timeout: 60_000,
  use: {
    baseURL: previewURL,
    trace: 'on-first-retry'
  },
  webServer: {
    command: previewServerCommand,
    reuseExistingServer: false,
    timeout: 120_000,
    url: previewURL
  },
  workers: isGithubCi ? 2 : '50%'
})
