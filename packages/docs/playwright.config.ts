import { defineConfig, devices } from '@playwright/test'

const isGithubCi = Boolean(process.env.CI)

const previewHost = '127.0.0.1'
const previewPort = 4173
const previewURL = `http://${previewHost}:${previewPort}`

// Starlight docs might need a build before preview
const previewServerCommand = `pnpm run docs:preview --host ${previewHost} --port ${previewPort}`

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: !isGithubCi,
  forbidOnly: isGithubCi,
  retries: isGithubCi ? 2 : 0,
  workers: isGithubCi ? 1 : '50%',
  reporter: 'html',
  use: {
    baseURL: previewURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: previewServerCommand,
    timeout: 120_000,
    url: previewURL,
    reuseExistingServer: !isGithubCi,
  },
})
