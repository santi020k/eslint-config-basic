import { expect, test } from '@playwright/test'

import { shouldRunVisualSnapshots, visualSnapshotSkipReason } from './helpers/visual-regression.js'

test.describe('Visual Regression', () => {
  // eslint-disable-next-line playwright/no-skipped-test -- Visual snapshots are opt-in in local/CI runs.
  test.skip(!shouldRunVisualSnapshots, visualSnapshotSkipReason)

  test('homepage should match snapshot', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('body')).toBeVisible()

    // Hide dynamic elements if necessary (e.g., date-based content)
    // await page.addStyleTag({ content: '.last-updated { display: none; }' })

    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      mask: [
        // Mask the "Last updated" section as it changes on every commit
        page.locator('.sl-flex.last-updated')
      ]
    })
  })

  test('dark mode homepage should match snapshot', async ({ page }) => {
    await page.goto('/')

    await page.emulateMedia({ colorScheme: 'dark' })

    await expect(page.locator('body')).toBeVisible()

    await expect(page).toHaveScreenshot('homepage-dark.png', {
      fullPage: true,
      mask: [
        page.locator('.sl-flex.last-updated')
      ]
    })
  })
})
