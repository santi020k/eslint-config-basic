import path from 'node:path'

import { expect, test } from '@playwright/test'

import { getDocUrls } from './helpers/docs'

const productionOrigin = 'https://eslint.santi020k.com'

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

  test('robots and sitemap expose all current documentation on the canonical host', async ({ page, request }) => {
    await page.goto('/')

    const robots = await request.get('/robots.txt')

    expect(robots.ok()).toBe(true)

    expect(await robots.text()).toContain(`Sitemap: ${productionOrigin}/sitemap-index.xml`)

    const index = await request.get('/sitemap-index.xml')

    expect(index.ok()).toBe(true)

    const sitemapUrls = await page.evaluate(xml => {
      const document = new DOMParser().parseFromString(xml, 'application/xml')

      return Array.from(document.querySelectorAll('sitemap > loc'), element => element.textContent)
    }, await index.text())

    expect(sitemapUrls.length).toBeGreaterThan(0)

    const documentUrls: string[] = []

    for (const sitemapUrl of sitemapUrls) {
      const url = new URL(sitemapUrl)

      expect(url.origin).toBe(productionOrigin)

      const sitemap = await request.get(url.pathname)

      expect(sitemap.ok()).toBe(true)

      documentUrls.push(...await page.evaluate(xml => {
        const document = new DOMParser().parseFromString(xml, 'application/xml')

        return Array.from(document.querySelectorAll('url > loc'), element => element.textContent)
      }, await sitemap.text()))
    }

    expect(new Set(documentUrls).size).toBe(documentUrls.length)

    for (const documentUrl of documentUrls) {
      const url = new URL(documentUrl)

      expect(url.origin).toBe(productionOrigin)

      expect(url.search).toBe('')

      expect(url.hash).toBe('')

      expect(url.pathname).not.toMatch(/^\/404\/?$/u)
    }

    for (const route of getDocUrls(path.resolve('src/content/docs'))) {
      expect(documentUrls, `Sitemap is missing current documentation: ${route}`).toContain(`${productionOrigin}${route}`)
    }
  })

  for (const route of ['/', '/guide/installation/', '/guide/config-builder/', '/guide/releases/']) {
    test(`${route} has matching canonical metadata and a reachable social image`, async ({ page, request }) => {
      await page.goto(route)

      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${productionOrigin}${route}`)

      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', `${productionOrigin}${route}`)

      const socialImage = await page.locator('meta[property="og:image"]').getAttribute('content')

      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /^https:\/\//u)

      const imageURL = new URL(socialImage ?? '')

      expect(imageURL.origin).toBe(productionOrigin)

      const image = await request.get(imageURL.pathname)

      expect(image.ok()).toBe(true)

      expect(image.headers()['content-type']).toMatch(/^image\//u)
    })
  }

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
