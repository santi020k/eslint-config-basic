import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { expect, test } from '@playwright/test'

import { expectNoUnexpectedAccessibilityViolations } from './helpers/accessibility.js'
import { getDocUrls } from './helpers/docs.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const docsDir = path.resolve(__dirname, '../src/content/docs')
const urls = getDocUrls(docsDir).sort()

test.describe('Accessibility', () => {
  for (const url of urls) {
    test(`page ${url} should have no accessibility violations in light mode`, async ({ page }) => {
      await page.goto(url)

      await expect(page.locator('body')).toBeVisible()

      await page.evaluate(() => {
        document.documentElement.dataset.theme = 'light'
      })

      await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')

      await expectNoUnexpectedAccessibilityViolations(page, [
        {
          htmlIncludes: 'role="region"',
          id: 'landmark-unique'
        }
      ])
    })

    test(`page ${url} should have no accessibility violations in dark mode`, async ({ page }) => {
      await page.goto(url)

      await expect(page.locator('body')).toBeVisible()

      await page.evaluate(() => {
        document.documentElement.dataset.theme = 'dark'
      })

      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

      await expectNoUnexpectedAccessibilityViolations(page, [
        {
          htmlIncludes: 'role="region"',
          id: 'landmark-unique'
        }
      ])
    })
  }
})
