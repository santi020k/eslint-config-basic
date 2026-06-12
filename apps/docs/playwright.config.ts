import { defineConfig, devices } from '@playwright/test'

const isGithubCi = Boolean(process.env.CI)
const previewHost = '127.0.0.1'
const previewPort = 4173
const previewURL = `http://${previewHost}:${previewPort}`
// Starlight docs might need a build before preview
const previewServerCommand = `pnpm run docs:preview --host ${previewHost} --port ${previewPort}`

export default defineConfig({
  expect: {
    timeout: 10_000
  },
  forbidOnly: isGithubCi,
  fullyParallel: !isGithubCi,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
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
    reuseExistingServer: !isGithubCi,
    timeout: 120_000,
    url: previewURL
  },
  workers: isGithubCi ? 1 : '50%'
})
