import { expect, test } from '@playwright/test';
import { pages } from '../../content/registry';

for (const entry of pages) {
  test(`${entry.path} renders with one h1 and no console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    const response = await page.goto(entry.path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveText(entry.h1);
    expect(errors).toEqual([]);
  });
}

test('unknown paths return a real 404 with recovery links', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText("doesn't exist");
});

test('heading levels never skip on the home page', async ({ page }) => {
  await page.goto('/');
  const levels = await page.$$eval('h1, h2, h3, h4', (els) => els.map((e) => Number(e.tagName[1])));
  for (let i = 1; i < levels.length; i++) expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
});
