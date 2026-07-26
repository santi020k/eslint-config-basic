import { expect, test } from '@playwright/test'

test.describe('SEO', () => {
  test('homepage should have valid meta tags', async ({ page }) => {
    await page.goto('/')

    // Check title and description
    await expect(page).toHaveTitle(/ESLint Config/)

    const metaDescription = page.locator('meta[name="description"]')

    await expect(metaDescription).toHaveAttribute('content', /.+/)

    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]')
    const ogDescription = page.locator('meta[property="og:description"]')
    const ogImage = page.locator('meta[property="og:image"]')

    await expect(ogTitle).toHaveAttribute('content', /.+/)

    await expect(ogDescription).toHaveAttribute('content', /.+/)

    await expect(ogImage).toHaveAttribute('content', /.+/)
  })

  test('installation guide should have valid meta tags', async ({ page }) => {
    await page.goto('/guide/installation/')

    await expect(page).toHaveTitle(/Installation/)

    const ogTitle = page.locator('meta[property="og:title"]')

    await expect(ogTitle).toHaveAttribute('content', /Installation/)
  })

  test('every page should have a canonical URL', async ({ page }) => {
    await page.goto('/')

    const canonical = page.locator('link[rel="canonical"]')

    await expect(canonical).toHaveAttribute('href', /https:\/\/eslint\.santi020k\.com/)
  })

  test('theme assets follow the selected color scheme', async ({ page }) => {
    await page.goto('/')

    const favicon = page.locator('#s2k-theme-favicon')
    const themeColor = page.locator('#s2k-theme-color')

    await page.evaluate(() => {
      document.documentElement.dataset.theme = 'light'
    })

    await expect(favicon).toHaveAttribute('href', '/favicon-light.svg')

    await expect(themeColor).toHaveAttribute('content', '#faf9fb')

    await page.evaluate(() => {
      document.documentElement.dataset.theme = 'dark'
    })

    await expect(favicon).toHaveAttribute('href', '/favicon-dark.svg')

    await expect(themeColor).toHaveAttribute('content', '#110c1d')
  })
})
