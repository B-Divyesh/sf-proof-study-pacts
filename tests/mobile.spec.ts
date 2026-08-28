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

test('every visible interactive target is at least 44px on every public route', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ['/', '/demo', '/privacy', '/terms', '/missing-page']) {
    await page.goto(route);
    await expect(page.locator('main h1')).toBeVisible();
    const undersized = await page.locator('a, button, input, textarea, select, summary').evaluateAll(elements => elements.flatMap(element => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      if (style.display === 'none' || style.visibility === 'hidden' || rect.width === 0 || rect.height === 0) return [];
      return rect.width < 44 || rect.height < 44 ? [{ route: location.pathname, element: element.outerHTML.slice(0, 180), width: rect.width, height: rect.height }] : [];
    }));
    expect(undersized).toEqual([]);
  }
});
