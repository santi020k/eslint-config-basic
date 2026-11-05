import { expect, type Page, test } from '@playwright/test'

import basicPackage from '../../../packages/basic/package.json' with { type: 'json' }

const visualPackageVersion = '3.6.2'

const prepareHomepage = async (page: Page) => {
  const releaseCopy = page.locator('#card-tool-release > span').last()

  await expect(releaseCopy).toContainText(`v${basicPackage.version}.`)

  // Keep release digits stable in visual fixtures after checking the live version.
  await releaseCopy.evaluate((element, versions) => {
    element.textContent = element.textContent.replace(`v${versions.current}`, `v${versions.fixture}`)
  }, { current: basicPackage.version, fixture: visualPackageVersion })
}

const prepareInstallation = async (page: Page) => {
  await expect(page.getByRole('heading', { level: 1, name: 'Installation', exact: true })).toBeVisible()
}

for (const width of [390, 1440]) {
  for (const colorScheme of ['light', 'dark'] as const) {
    for (const { route, name, prepare } of [
      { route: '/', name: 'homepage', prepare: prepareHomepage },
      { route: '/guide/installation/', name: 'installation', prepare: prepareInstallation }
    ]) {
      test(`${name} ${width}px ${colorScheme} matches its baseline`, async ({ page }) => {
        await page.setViewportSize({ height: 900, width })

        await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' })

        await page.goto(route)

        await expect(page.locator('main h1')).toBeVisible()

        await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme)

        await prepare(page)

        await page.evaluate(async () => document.fonts.ready)

        await expect(page).toHaveScreenshot(`${name}-${width}-${colorScheme}.png`, {
          fullPage: true,
          mask: [page.locator('main time[datetime]')]
        })
      })
    }
  }
}
