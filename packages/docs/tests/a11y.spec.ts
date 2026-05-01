import { test } from '@playwright/test'
import { expectNoUnexpectedAccessibilityViolations } from './helpers/accessibility.js'

test.describe('Accessibility', () => {
  test('homepage should have no accessibility violations', async ({ page }) => {
    await page.goto('/')
    // Wait for the page to be fully loaded and settled
    await page.waitForLoadState('networkidle')
    await expectNoUnexpectedAccessibilityViolations(page)
  })

  test('installation guide should have no accessibility violations', async ({ page }) => {
    await page.goto('/guide/installation/')
    await page.waitForLoadState('networkidle')
    await expectNoUnexpectedAccessibilityViolations(page)
  })

  test('v1 overview should have no accessibility violations', async ({ page }) => {
    await page.goto('/v1/')
    await page.waitForLoadState('networkidle')
    await expectNoUnexpectedAccessibilityViolations(page)
  })
})
