import { expect, test } from '@playwright/test'

test.describe('Adoption tools', () => {
  test('config builder generates and restores a shareable lean v3 setup', async ({ page }) => {
    await page.goto('/guide/config-builder/')

    await page.check('input[name="framework"][value="react"]')

    await page.check('input[name="feature"][value="vitest"]')

    const install = page.locator('[data-builder-install]')
    const config = page.locator('[data-builder-config]')

    await expect(install).toContainText('eslint@^10')

    await expect(install).toContainText('@santi020k/eslint-config-basic@^3')

    await expect(install).toContainText('@santi020k/eslint-config-react@^3')

    await expect(install).toContainText('@santi020k/eslint-config-testing@^3')

    await expect(config).toContainText('react: true')

    await expect(config).toContainText('vitest: true')

    await expect(page).toHaveURL(/fw=react/)

    await page.reload()

    await expect(page.locator('input[name="framework"][value="react"]')).toBeChecked()

    await expect(page.locator('input[name="feature"][value="vitest"]')).toBeChecked()
  })

  test('lean install command includes implied framework packages', async ({ page }) => {
    await page.goto('/guide/config-builder/?fw=next,nuxt')

    const install = page.locator('[data-builder-install]')

    await expect(install).toContainText('@santi020k/eslint-config-next')

    await expect(install).toContainText('@santi020k/eslint-config-nuxt')

    await expect(install).toContainText('@santi020k/eslint-config-react')

    await expect(install).toContainText('@santi020k/eslint-config-vue')
  })

  test('Full install stays compact and includes TypeScript when selected', async ({ page }) => {
    await page.goto('/guide/config-builder/?pkg=full&fw=react&features=vitest')

    const install = page.locator('[data-builder-install]')

    await expect(install).toContainText('@santi020k/eslint-config-full@^3')

    await expect(install).toContainText('typescript')

    await expect(install).not.toContainText('@santi020k/eslint-config-react')

    await expect(install).not.toContainText('@santi020k/eslint-config-testing')

    await expect(page.locator('[data-builder-package-badge]')).toHaveText('Full')
  })

  test('doctor viewer validates JSON and renders repair guidance', async ({ page }) => {
    await page.goto('/guide/doctor-report/')

    await page.locator('[data-doctor-input]').fill('{not json')

    await page.locator('[data-doctor-analyze]').click()

    await expect(page.locator('[data-doctor-status]')).toContainText('not valid JSON')

    await expect(page.locator('[data-doctor-results]')).toBeHidden()

    await page.locator('[data-doctor-example]').click()

    await page.locator('[data-doctor-analyze]').click()

    await expect(page.locator('[data-doctor-results]')).toBeVisible()

    await expect(page.locator('[data-doctor-heading]')).toHaveText('3 warnings to review')

    await expect(page.locator('.s2k-doctor-finding')).toHaveCount(3)

    await expect(page.getByRole('link', { name: 'Open migration guide' })).toBeVisible()

    await expect(page.getByRole('link', { name: 'Configure the monorepo' })).toBeVisible()
  })

  test('page feedback is stored locally and reveals a follow-up for negative feedback', async ({ page }) => {
    await page.goto('/guide/releases/')

    await page.locator('[data-feedback-value="no"]').click()

    await expect(page.locator('[data-feedback-status]')).toContainText('more context')

    await expect(page.locator('[data-feedback-issue]')).toBeVisible()

    await expect(page.locator('[data-feedback-issue]')).toHaveAttribute('href', /github\.com/)

    const storedFeedback = await page.evaluate(
      () => window.localStorage.getItem(`s2k-docs-feedback:${window.location.pathname}`)
    )

    expect(storedFeedback).toBe('no')
  })
})
