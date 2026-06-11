# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> Accessibility >> page /v1/tooling/extensions/ should have no accessibility violations
- Location: tests/a11y.spec.ts:52:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:4173/v1/tooling/extensions/
Call log:
  - navigating to "http://127.0.0.1:4173/v1/tooling/extensions/", waiting until "load"

```

# Test source

```ts
  1  | import fs from 'node:fs'
  2  | import path from 'node:path'
  3  | import { fileURLToPath } from 'node:url'
  4  | 
  5  | import { expectNoUnexpectedAccessibilityViolations } from './helpers/accessibility.js'
  6  | 
  7  | import { test } from '@playwright/test'
  8  | 
  9  | const __filename = fileURLToPath(import.meta.url)
  10 | const __dirname = path.dirname(__filename)
  11 | 
  12 | /* eslint-disable security/detect-non-literal-fs-filename */
  13 | 
  14 | const getDocUrls = (dir: string, baseDir = dir): string[] => {
  15 |   const urls: string[] = []
  16 |   if (!fs.existsSync(dir)) {
  17 |     return urls
  18 |   }
  19 |   const files = fs.readdirSync(dir, { withFileTypes: true })
  20 |   for (const file of files) {
  21 |     const res = path.resolve(dir, file.name)
  22 |     if (file.isDirectory()) {
  23 |       urls.push(...getDocUrls(res, baseDir))
  24 |     } else if (file.name.endsWith('.md') || file.name.endsWith('.mdx')) {
  25 |       const relativePath = path.relative(baseDir, res)
  26 |       // Remove file extension
  27 |       const withoutExt = relativePath.replace(/\.(md|mdx)$/, '')
  28 |       
  29 |       // Convert to URL path format (using forward slashes, lowercase)
  30 |       let urlPath = '/' + withoutExt.split(path.sep).join('/').toLowerCase()
  31 |       
  32 |       // If it ends with /index, map to the directory itself
  33 |       if (urlPath === '/index') {
  34 |         urlPath = '/'
  35 |       } else if (urlPath.endsWith('/index')) {
  36 |         urlPath = urlPath.slice(0, -5) // keep trailing slash
  37 |       } else {
  38 |         urlPath = urlPath + '/'
  39 |       }
  40 |       
  41 |       urls.push(urlPath)
  42 |     }
  43 |   }
  44 |   return urls
  45 | }
  46 | 
  47 | const docsDir = path.resolve(__dirname, '../src/content/docs')
  48 | const urls = getDocUrls(docsDir).sort()
  49 | 
  50 | test.describe('Accessibility', () => {
  51 |   for (const url of urls) {
  52 |     test(`page ${url} should have no accessibility violations in light mode`, async ({ page }) => {
> 53 |       await page.goto(url)
     |                  ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:4173/v1/tooling/extensions/
  54 |       await page.waitForLoadState('networkidle')
  55 |       await page.evaluate(() => {
  56 |         document.documentElement.dataset.theme = 'light'
  57 |       })
  58 |       await expectNoUnexpectedAccessibilityViolations(page, [
  59 |         {
  60 |           htmlIncludes: 'role="region"',
  61 |           id: 'landmark-unique'
  62 |         }
  63 |       ])
  64 |     })
  65 | 
  66 |     test(`page ${url} should have no accessibility violations in dark mode`, async ({ page }) => {
  67 |       await page.goto(url)
  68 |       await page.waitForLoadState('networkidle')
  69 |       await page.evaluate(() => {
  70 |         document.documentElement.dataset.theme = 'dark'
  71 |       })
  72 |       // wait for theme to apply
  73 |       await page.waitForTimeout(100)
  74 |       await expectNoUnexpectedAccessibilityViolations(page, [
  75 |         {
  76 |           htmlIncludes: 'role="region"',
  77 |           id: 'landmark-unique'
  78 |         }
  79 |       ])
  80 |     })
  81 |   }
  82 | })
  83 | 
```