import { expect, test } from '@playwright/test'

for (const width of [390, 1440]) {
  for (const colorScheme of ['light', 'dark'] as const) {
    for (const { route, name } of [{ route: '/', name: 'homepage' }, { route: '/guide/installation/', name: 'installation' }]) {
      test(`${name} ${width}px ${colorScheme} matches its baseline`, async ({ page }) => {
        await page.setViewportSize({ height: 900, width })

        await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' })

        await page.goto(route)

        await expect(page.locator('main h1')).toBeVisible()

        await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme)

        await page.evaluate(async () => document.fonts.ready)

        await expect(page).toHaveScreenshot(`${name}-${width}-${colorScheme}.png`, {
          fullPage: true,
          mask: [page.locator('.sl-flex.last-updated')]
        })
      })
    }
  }
}
