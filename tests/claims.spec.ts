import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function openDemo(page: Page) {
  await page.goto('/demo');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Natural Number Game');
  await expect(page.getByText('Mira’s attempt')).toBeVisible();
  return JSON.parse(await page.evaluate(() => sessionStorage.getItem('demo:pact') || '{}')) as { id: string; token: string };
}

test('@claim:free-access landing and demo open without an account or payment step', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Free to use')).toBeVisible();
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await expect(page.getByText('Mira’s attempt')).toBeVisible();
  await expect(page.locator('input[type="password"]')).toHaveCount(0);
  await expect(page.getByText(/buy|payment|card number/i)).toHaveCount(0);
});

test('@claim:demo-sandbox sample data opens in an isolated session workspace', async ({ page }) => {
  const session = await openDemo(page);
  await expect(page.getByText('Demo — sample data, nothing is saved')).toBeVisible();
  expect(session.id).toMatch(/^demo-/);
  expect(session.token.length).toBeGreaterThan(30);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
  expect(await page.evaluate(() => Object.keys(sessionStorage))).toEqual(['demo:pact']);
});

test('@claim:markdown-export exports the theorem, both roles, and proof states', async ({ page }) => {
  await openDemo(page);
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export Markdown note' }).click();
  const download = await downloadEvent;
  const path = await download.path();
  expect(path).toBeTruthy();
  const text = await (await import('node:fs/promises')).readFile(path!, 'utf8');
  expect(text).toContain('# Proof Pact — Natural Number Game — Add zero');
  expect(text).toContain('Mira — Prover');
  expect(text).toContain('Theo — Explainer');
  expect(text).toContain('Proof-state snapshots');
  expect(text).toContain('Before simp');
});

test('@claim:same-origin-privacy demo work makes no third-party requests', async ({ page }) => {
  const thirdParty: string[] = [];
  page.on('request', request => {
    const url = new URL(request.url());
    if (url.origin !== 'http://127.0.0.1:4173') thirdParty.push(request.url());
  });
  await openDemo(page);
  await page.getByLabel('Lean proof attempt').fill('by\n  simpa using Nat.add_zero 2');
  await page.getByLabel('Explanation in your own words').fill('The library theorem closes the same goal directly.');
  await page.getByLabel('Proof state').fill('⊢ 2 + 0 = 2');
  await page.getByRole('button', { name: 'Save proof attempt' }).click();
  await expect(page.getByText('3 attempts')).toBeVisible();
  expect(thirdParty).toEqual([]);
});

test('@claim:demo-expiry demo workspace expiry is within 24 hours', async ({ page }) => {
  const before = Date.now();
  const response = await page.request.post('/api/demo');
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  const duration = new Date(body.pact.expiresAt).getTime() - before;
  expect(duration).toBeGreaterThan(23.9 * 60 * 60 * 1000);
  expect(duration).toBeLessThanOrEqual(24 * 60 * 60 * 1000 + 5_000);
});

test('@claim:private-notes pact notes reject a wrong access key', async ({ page }) => {
  const session = await openDemo(page);
  const response = await page.request.get(`/api/pacts/${session.id}`, { headers: { Authorization: 'Bearer wrong-key' } });
  expect(response.status()).toBe(403);
});

test('@claim:paired-roles creation and consent assign complementary roles', async ({ browser }) => {
  const creatorContext = await browser.newContext();
  const creator = await creatorContext.newPage();
  await creator.goto('/');
  await creator.getByLabel('Your name').fill('Ada');
  await creator.getByLabel('Partner name').fill('Emmy');
  await creator.getByLabel(/I agree that my partner/).check();
  await creator.getByRole('button', { name: 'Create pact and invite' }).click();
  await expect(creator.getByText('Ada', { exact: true })).toBeVisible();
  await expect(creator.getByText('Prover · joined')).toBeVisible();
  await expect(creator.getByText('Explainer · waiting')).toBeVisible();
  const invite = await creator.getByLabel('Partner invite link').inputValue();

  const partnerContext = await browser.newContext();
  const partner = await partnerContext.newPage();
  await partner.goto(invite);
  await expect(partner.getByRole('heading', { level: 1 })).toHaveText('Join one Lean proof pact');
  await partner.getByLabel(/I agree that my partner/).check();
  await partner.getByRole('button', { name: 'Join pact as Explainer' }).click();
  await expect(partner.getByText('Explainer · joined')).toBeVisible();
  expect(await partner.evaluate(() => Object.keys(localStorage).some(key => key.startsWith('pact:')))).toBeTruthy();
  await creatorContext.close(); await partnerContext.close();
});

test('landing and demo have no serious accessibility violations', async ({ page }) => {
  await page.goto('/');
  const landing = await new AxeBuilder({ page }).analyze();
  expect(landing.violations.filter(v => ['serious', 'critical'].includes(v.impact || ''))).toEqual([]);
  await openDemo(page);
  const demo = await new AxeBuilder({ page }).analyze();
  expect(demo.violations.filter(v => ['serious', 'critical'].includes(v.impact || ''))).toEqual([]);
});

test('routes have titles, one h1, working deep links, and no console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', exception => errors.push(exception.message));
  for (const route of ['/', '/privacy', '/terms', '/demo', '/missing-page']) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('main h1')).toHaveCount(1);
    expect(await page.title()).toContain('Proof Pact');
  }
  expect(errors).toEqual([]);
});

test('write endpoints return 429 with Retry-After during a burst', async ({ request }) => {
  const responses = await Promise.all(Array.from({ length: 28 }, () => request.post('/api/demo', { headers: { 'X-Forwarded-For': '198.51.100.42' } })));
  const limited = responses.filter(response => response.status() === 429);
  expect(limited.length).toBeGreaterThan(0);
  expect(limited[0].headers()['retry-after']).toBe('1');
});
