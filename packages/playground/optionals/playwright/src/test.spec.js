import { test } from "@playwright/test";
// eslint-disable-next-line playwright/no-pause
test("foo", async ({ page }) => { await page.pause(); });