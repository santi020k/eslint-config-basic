import { test } from '@playwright/test'

test('foo', async ({ page }) => {
  await page.pause()
})
