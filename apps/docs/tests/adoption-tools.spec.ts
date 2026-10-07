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

    await expect(page.locator('[data-feedback-issue]')).toBeHidden()

    await page.locator('[data-feedback-value="no"]').click()

    await expect(page.locator('[data-feedback-status]')).toContainText('more context')

    await expect(page.locator('[data-feedback-issue]')).toBeVisible()

    await expect(page.locator('[data-feedback-issue]')).toHaveAttribute('href', /github\.com/)

    const storedFeedback = await page.evaluate(
      () => window.localStorage.getItem(`s2k-docs-feedback:${window.location.pathname}`)
    )

    expect(storedFeedback).toBe('no')

    await page.reload()

    await expect(page.locator('[data-feedback-issue]')).toBeVisible()

    await expect(page.locator('[data-feedback-actions]')).toBeHidden()
  })
})

test('feedback works when browser storage is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new Error('Storage unavailable')
    }

    Storage.prototype.setItem = () => {
      throw new Error('Storage unavailable')
    }
  })

  await page.goto('/guide/releases/')

  await page.locator('[data-feedback-value="no"]').click()

  await expect(page.locator('[data-feedback-issue]')).toBeVisible()

  await expect(page.locator('[data-feedback-status]')).toContainText('will not persist')
})

test('GitHub reports share a canonical documentation path without query or fragment', async ({ page }) => {
  await page.goto('/guide/config-builder/?fw=react#private-context')

  const report = page.getByRole('link', { name: 'Improve this page' })
  const expectedURL = new URL('https://github.com/santi020k/eslint-config-basic/issues/new')

  expectedURL.searchParams.set('template', 'documentation.yml')

  expectedURL.searchParams.set('title', 'Docs: Config Builder')

  expectedURL.searchParams.set('page', 'https://eslint.santi020k.com/guide/config-builder/')

  await expect(report).toHaveAttribute('href', expectedURL.href)

  await expect(report).toHaveAttribute('rel', 'noopener noreferrer')

  await expect(page.getByRole('link', { name: 'Report a bug', exact: true })).toHaveAttribute('href', /template=bug_report.yml/)
})

test('package manager tabs support keyboard navigation and persist the selected runner', async ({ page }) => {
  await page.goto('/')

  const managers = page.getByRole('tablist', { name: 'Choose a package manager' }).first()

  await managers.getByRole('tab', { name: 'pnpm', exact: true }).focus()

  await page.keyboard.press('ArrowRight')

  await expect(managers.getByRole('tab', { name: 'npm', exact: true })).toHaveAttribute('aria-selected', 'true')

  await expect(page.locator('.s2k-quickstart [role="tabpanel"]:not([hidden])')).toContainText('npm install')

  await page.reload()

  await expect(managers.getByRole('tab', { name: 'npm', exact: true })).toHaveAttribute('aria-selected', 'true')
})

test('homepage content remains visible with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })

  await page.goto('/')

  const sections = page.locator('[data-ui-scroll-reveal]')

  await expect(sections).toHaveCount(6)

  for (const section of await sections.all()) {
    await expect(section).toHaveCSS('opacity', '1')
  }
})
