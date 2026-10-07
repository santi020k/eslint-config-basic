import { expect, test } from '@playwright/test'

for (const version of ['', 'v1/', 'v2/']) {
  test(`${version || 'current'} generated reference links navigate to their documented type`, async ({ page }) => {
    const anchor = 'EslintConfigOptions'.toLowerCase()
    const href = `/${version}api/reference/core/src/#${anchor}`

    await page.goto(`/${version}api/reference/basic/src/`)

    const reference = page.locator(`.sl-markdown-content a[href="${href}"]`).first()

    await expect(reference).toBeVisible()

    await reference.click()

    await expect(page).toHaveURL(new RegExp(`${href}$`, 'u'))

    await expect(page.locator(`#${anchor}`)).toBeVisible()
  })
}
