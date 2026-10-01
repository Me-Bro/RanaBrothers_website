import { expect, test } from '@playwright/test';

// Builds without NEXT_PUBLIC_WEB3FORMS_KEY render an email fallback instead of a form that could not deliver.
test('contact page offers a working way to reach us', async ({ page }) => {
  await page.goto('/contact');
  const form = page.locator('form[action="https://api.web3forms.com/submit"]');
  if ((await form.count()) === 0) {
    await expect(page.getByRole('link', { name: /Email hello@ranabrothers\.online/ })).toHaveAttribute('href', /^mailto:hello@ranabrothers\.online/);
    return;
  }
  await page.route('https://api.web3forms.com/submit', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) }),
  );
  await page.getByRole('button', { name: 'Send project details' }).click();
  await expect(page.getByLabel(/^Name/)).toBeFocused();
  await page.getByLabel(/^Name/).fill('Test Person');
  await page.getByLabel(/^Email/).fill('test@example.com');
  await page.getByLabel(/What do you need/).selectOption({ index: 1 });
  await page.getByLabel(/Tell us about the project/).fill('A short test message.');
  await page.getByLabel(/I agree to the/).check();
  await page.getByRole('button', { name: 'Send project details' }).click();
  await expect(page.locator('[data-form-status]')).toContainText('Thanks, we have your message');
});
