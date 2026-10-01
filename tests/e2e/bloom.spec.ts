import { expect, test } from '@playwright/test';

const SETTLE_MS = 7000;

test('phones keep the static poster and never start the 3D scene', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile only');
  const scripts: string[] = [];
  page.on('response', async (res) => {
    if (res.request().resourceType() === 'script') scripts.push(res.url());
  });
  await page.goto('/');
  await expect(page.locator('[data-bloom-poster] svg').first()).toHaveAttribute('aria-hidden', 'true');
  await page.waitForTimeout(SETTLE_MS);
  await expect(page.getByRole('button', { name: /motion/ })).toHaveCount(0);
  const before = scripts.length;
  await page.waitForTimeout(1000);
  expect(scripts.length).toBe(before);
});

test('reduced motion keeps the static poster on desktop', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop only');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.waitForTimeout(SETTLE_MS);
  await expect(page.getByRole('button', { name: /motion/ })).toHaveCount(0);
});

test('capable desktops get the live scene with a working pause control', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop only');
  await page.goto('/');
  const webgl2 = await page.evaluate(() => !!document.createElement('canvas').getContext('webgl2', { failIfMajorPerformanceCaveat: true }));
  test.skip(!webgl2, 'this browser has no hardware WebGL2, so the gate correctly keeps the poster');
  const pause = page.getByRole('button', { name: 'Pause motion' });
  await expect(pause).toBeVisible({ timeout: 15_000 });
  await pause.click();
  await expect(page.getByRole('button', { name: 'Resume motion' })).toHaveAttribute('aria-pressed', 'true');
});
