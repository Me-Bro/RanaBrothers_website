import { expect, test } from '@playwright/test';

test('skip link is the first tab stop and moves focus to main', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await skip.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
});

test('header links home with an accessible name', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header').getByRole('link', { name: 'Rana Brothers home' })).toHaveAttribute('href', '/');
});

test('mobile menu opens, closes on Escape and returns focus', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile only');
  await page.goto('/');
  const button = page.getByRole('button', { name: 'Menu' });
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('navigation', { name: 'Mobile' }).getByRole('link', { name: 'Get an estimate' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(button).toBeFocused();
});

for (const [name, link] of [
  ['Services', 'Mobile apps'],
  ['AI', 'AI chatbots'],
] as const) {
  test(`desktop ${name} menu opens, lists links and closes with Escape`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'desktop only');
    await page.goto('/');
    const button = page.getByRole('navigation', { name: 'Main' }).getByRole('button', { name });
    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: link })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(button).toBeFocused();
  });
}

test('footer carries the copyright line', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('footer')).toContainText(`© ${new Date().getFullYear()} Rana Brothers`);
});
