import { spawn } from 'node:child_process'
import { readFile } from 'node:fs/promises'

import { chromium } from '@playwright/test'
import { launch } from 'chrome-launcher'
import lighthouse from 'lighthouse'

const configUrl = new URL('../lighthouse.config.json', import.meta.url)
const config = JSON.parse(await readFile(configUrl, 'utf8'))

const delay = milliseconds => new Promise(resolve => {
  setTimeout(resolve, milliseconds)
})

const waitForServer = async (url, timeoutMs) => {
  const deadline = Date.now() + timeoutMs

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url)

      if (response.ok) return
    } catch {
      // The preview server is still starting.
    }

    await delay(250)
  }

  throw new Error(`Preview server did not become ready within ${timeoutMs}ms: ${url}`)
}

const stopServer = server => {
  if (!server.pid || server.exitCode !== null) return

  if (process.platform === 'win32') {
    server.kill('SIGTERM')

    return
  }

  try {
    process.kill(-server.pid, 'SIGTERM')
  } catch {
    server.kill('SIGTERM')
  }
}

const optimisticValue = (values, direction) => direction === 'minimum' ?
  Math.max(...values) :
  Math.min(...values)

const formatValue = (value, kind) => kind === 'score' ?
  value.toFixed(2) :
  value.toFixed(0)

const evaluateRuns = runs => {
  const failures = []

  for (const [categoryName, minimumScore] of Object.entries(config.categories)) {
    const values = runs.map(run => run.categories[categoryName]?.score)

    if (values.some(value => typeof value !== 'number')) {
      failures.push(`${categoryName}: Lighthouse did not return a category score`)

      continue
    }

    const actual = optimisticValue(values, 'minimum')
    const message = `${categoryName}: ${formatValue(actual, 'score')} (minimum ${minimumScore.toFixed(2)})`

    console.log(message)

    if (actual < minimumScore) failures.push(message)
  }

  for (const [auditName, maximumValue] of Object.entries(config.audits)) {
    const values = runs.map(run => run.audits[auditName]?.numericValue)

    if (values.some(value => typeof value !== 'number')) {
      failures.push(`${auditName}: Lighthouse did not return a numeric value`)

      continue
    }

    const actual = optimisticValue(values, 'maximum')
    const message = `${auditName}: ${formatValue(actual, 'numeric')} (maximum ${maximumValue})`

    console.log(message)

    if (actual > maximumValue) failures.push(message)
  }

  return failures
}

const server = spawn(config.server.command, config.server.args, {
  cwd: new URL('..', import.meta.url),
  detached: process.platform !== 'win32',
  stdio: 'inherit'
})

let chrome

try {
  await waitForServer(config.url, config.server.readyTimeoutMs)

  chrome = await launch({
    chromePath: process.env.CHROME_PATH || chromium.executablePath(),
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage']
  })

  const runs = []

  for (let index = 0; index < config.runs; index += 1) {
    console.log(`Running Lighthouse audit ${index + 1}/${config.runs}…`)

    const result = await lighthouse(config.url, {
      logLevel: 'error',
      onlyCategories: Object.keys(config.categories),
      output: 'json',
      port: chrome.port
    })

    if (!result) throw new Error(`Lighthouse audit ${index + 1} did not return a result`)

    if (result.lhr.runtimeError) {
      throw new Error(
        `Lighthouse audit ${index + 1} failed: ` +
        `${result.lhr.runtimeError.code}: ${result.lhr.runtimeError.message}`
      )
    }

    runs.push(result.lhr)
  }

  const failures = evaluateRuns(runs)

  if (failures.length > 0) {
    throw new Error(`Lighthouse budgets failed:\n${failures.map(failure => `- ${failure}`).join('\n')}`)
  }

  console.log(`Lighthouse budgets passed across ${config.runs} runs.`)
} finally {
  if (chrome) await chrome.kill()

  stopServer(server)
}
