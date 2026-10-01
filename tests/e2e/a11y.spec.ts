import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const PATHS = [
  '/',
  '/services',
  '/services/mvp-development',
  '/ai',
  '/ai/rag-development',
  '/work',
  '/work/dusu-ai-english-coach',
  '/guides/how-to-build-an-mvp',
  '/about',
  '/process',
  '/faq',
  '/contact',
  '/privacy',
];

for (const path of PATHS) {
  test(`${path} has no serious or critical accessibility violations`, async ({ page }) => {
    await page.goto(path);
    const { violations } = await new AxeBuilder({ page }).analyze();
    const blocking = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(blocking.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(', ')}`)).toEqual([]);
  });
}
