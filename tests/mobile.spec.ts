import { test, expect } from '@playwright/test';

test('mobile landing and demo fit a 390px viewport', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Work one Lean proof with a partner');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width);
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await expect(page.getByText('Demo — sample data, nothing is saved')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width);
});

test('keyboard reaches the first primary action', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Try it with sample data' })).toBeFocused();
});

test('primary links and controls meet the 44px touch target baseline', async ({ page }) => {
  await page.goto('/');
  for (const locator of [page.getByRole('link', { name: 'Proof Pact home' }), page.getByRole('link', { name: 'Demo' }), page.getByRole('link', { name: 'Make a pact' }), page.getByLabel('Main navigation').getByRole('link', { name: 'Privacy' }), page.getByLabel('Footer navigation').getByRole('link', { name: 'Privacy' })]) {
    const box = await locator.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }
  await page.goto('/demo');
  const exercise = page.getByRole('link', { name: /Open the public exercise/ });
  const box = await exercise.boundingBox();
  expect(box?.height).toBeGreaterThanOrEqual(44);
});
