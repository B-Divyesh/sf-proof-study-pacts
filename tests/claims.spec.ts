import { test, expect, request, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

type CreatedSession = { pact: { id: string }; memberToken: string };

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
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/?demo=1');
  await expect(page).toHaveURL(/\/demo$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Natural Number Game');
  const session = JSON.parse(await page.evaluate(() => sessionStorage.getItem('demo:pact') || '{}')) as { id: string; token: string };
  await expect(page.getByText('Demo — sample data, nothing is saved')).toBeVisible();
  await expect(page.getByText('Mira — Prover', { exact: true })).toBeInViewport();
  await expect(page.getByText('Theo — Explainer', { exact: true })).toBeInViewport();
  await expect(page.locator('.demo-attempt-preview')).toBeInViewport({ ratio: 1 });
  await expect(page.locator('.demo-attempt-preview')).toContainText('Mira’s saved attempt');
  await expect(page.locator('.demo-attempt-preview')).toContainText('induction n with');
  expect(session.id).toMatch(/^demo-/);
  expect(session.token.length).toBeGreaterThan(30);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
  expect(await page.evaluate(() => Object.keys(sessionStorage))).toEqual(['demo:pact']);

  await page.evaluate(() => localStorage.setItem('real-data-sentinel', 'unchanged'));
  await page.getByLabel('Lean proof attempt').fill('by\n  exact Nat.add_zero 7');
  await page.getByLabel('Explanation in your own words').fill('The existing theorem matches this goal without another lemma.');
  await page.getByLabel('Proof state').fill('⊢ 7 + 0 = 7');
  await page.getByRole('button', { name: 'Save proof attempt' }).click();
  await expect(page.getByText('3 attempts')).toBeVisible();
  await page.reload();
  await expect(page.getByText('exact Nat.add_zero 7')).toBeVisible();

  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.getByText('2 attempts')).toBeVisible();
  const resetSession = JSON.parse(await page.evaluate(() => sessionStorage.getItem('demo:pact') || '{}')) as { id: string };
  expect(resetSession.id).not.toBe(session.id);
  expect(await page.evaluate(() => localStorage.getItem('real-data-sentinel'))).toBe('unchanged');

  await page.getByRole('button', { name: 'Start for real' }).click();
  await expect(page).toHaveURL(/\/#make$/);
  await expect(page.getByText('Demo — sample data, nothing is saved')).toHaveCount(0);
  expect(await page.evaluate(() => sessionStorage.getItem('demo:pact'))).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('real-data-sentinel'))).toBe('unchanged');
});

test('@claim:markdown-export exports the theorem, both roles, attempts, explanations, and every proof state', async ({ page }) => {
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
  expect(text.match(/^## .+ — (Prover|Explainer)$/gm)).toHaveLength(2);
  expect(text).toContain('induction n with');
  expect(text).toContain('simpa using Nat.add_zero n');
  expect(text).toContain('I tried induction first. The goal closed, but this proof uses more machinery than the theorem needs.');
  expect(text).toContain('The library theorem states this equality directly. The simpa step matches its conclusion to our goal.');
  expect(text.match(/### Proof-state snapshots/g)).toHaveLength(1);
  expect(text).toContain('Before simp');
  expect(text).toContain('n : ℕ\n⊢ n + 0 = n');
  expect(text).toContain('After induction');
  expect(text).toContain('case succ n ih\n⊢ n + 1 = Nat.succ n');
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

test('@claim:real-access-link-storage creating a pact keeps its private access link in this browser', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('unrelated-sentinel', 'keep'));
  await page.getByLabel('Your name').fill('Ada');
  await page.getByLabel('Partner name').fill('Emmy');
  await page.getByLabel(/I agree that my partner/).check();
  await page.getByRole('button', { name: 'Create pact and invite' }).click();
  await expect(page.getByText('Ada', { exact: true })).toBeVisible();
  const keys = await page.evaluate(() => Object.keys(localStorage));
  expect(keys).toContain('unrelated-sentinel');
  expect(keys.filter(key => /^pact:[a-z0-9]+:token$/.test(key))).toHaveLength(1);
  expect(requests.every(url => new URL(url).origin === 'http://127.0.0.1:4173')).toBeTruthy();
});

test('@claim:records-without-checking invalid Lean is recorded without a correctness result', async ({ page }) => {
  const external: string[] = [];
  page.on('request', request => { if (new URL(request.url()).origin !== 'http://127.0.0.1:4173') external.push(request.url()); });
  await openDemo(page);
  await page.getByLabel('Lean proof attempt').fill('by\n  this is deliberately not Lean');
  await page.getByLabel('Explanation in your own words').fill('This is a deliberately invalid example for the study record.');
  await page.getByLabel('Proof state').fill('⊢ 2 + 0 = 2');
  await page.getByRole('button', { name: 'Save proof attempt' }).click();
  await expect(page.getByText('this is deliberately not Lean')).toBeVisible();
  await expect(page.getByText(/proof accepted|proof rejected|correctness result/i)).toHaveCount(0);
  expect(external).toEqual([]);
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

test('@claim:partner-note-sharing one partner saves an attributed note that the other partner can read', async ({ browser }) => {
  const creatorContext = await browser.newContext();
  const creator = await creatorContext.newPage();
  await creator.goto('/');
  await creator.getByLabel('Your name').fill('Ada');
  await creator.getByLabel('Partner name').fill('Emmy');
  await creator.getByLabel(/I agree that my partner/).check();
  await creator.getByRole('button', { name: 'Create pact and invite' }).click();
  const invite = await creator.getByLabel('Partner invite link').inputValue();

  const partnerContext = await browser.newContext();
  const partner = await partnerContext.newPage();
  await partner.goto(invite);
  await partner.getByLabel(/I agree that my partner/).check();
  await partner.getByRole('button', { name: 'Join pact as Explainer' }).click();
  const proof = 'by\n  exact Nat.add_zero 37';
  const explanation = 'The add-zero theorem gives the exact equality for thirty-seven.';
  const proofState = '⊢ 37 + 0 = 37';
  await partner.getByLabel('Lean proof attempt').fill(proof);
  await partner.getByLabel('Explanation in your own words').fill(explanation);
  await partner.getByLabel('Proof state').fill(proofState);
  await partner.getByRole('button', { name: 'Save proof attempt' }).click();
  await expect(partner.getByText('1 attempt')).toBeVisible();

  await creator.reload();
  const sharedAttempt = creator.locator('article.attempt').filter({ hasText: 'Nat.add_zero 37' });
  await expect(sharedAttempt).toContainText('Emmy’s attempt');
  await expect(sharedAttempt).toContainText(explanation);
  await sharedAttempt.getByText('1 proof-state snapshot').click();
  await expect(sharedAttempt.getByText(proofState)).toBeVisible();
  await creatorContext.close();
  await partnerContext.close();
});

test('@claim:stored-data-inventory pact records match the disclosed fields and reject email input', async ({ page }) => {
  await page.goto('/privacy');
  await expect(page.getByText('It does not ask for or store email addresses.')).toBeVisible();
  await page.goto('/');
  expect(await page.locator('form input[type="email"]').count()).toBe(0);
  const payload = {
    creatorName: 'Ada', partnerName: 'Emmy', exerciseTitle: 'Natural Number Game — Add zero',
    exerciseUrl: 'https://adam.math.hhu.de/#/g/leanprover-community/nng4/world/Tutorial/level/4',
    theorem: 'theorem add_zero (n : ℕ) : n + 0 = n := by', weekOf: '2026-08-24', consent: true
  };
  const rejected = await page.request.post('/api/pacts', { data: { ...payload, email: 'ada@example.test' } });
  expect(rejected.status()).toBe(422);
  const created = await page.request.post('/api/pacts', { data: payload });
  expect(created.ok()).toBeTruthy();
  const session = await created.json();
  const read = await page.request.get(`/api/pacts/${session.pact.id}`, { headers: { Authorization: `Bearer ${session.memberToken}` } });
  expect(read.ok()).toBeTruthy();
  expect(JSON.stringify(await read.json()).toLowerCase()).not.toContain('email');
});

test('@claim:offline-shell saved pages remain readable offline', async ({ page, context }) => {
  await page.goto('/');
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBeTruthy();
  await context.setOffline(true);
  await page.goto('/privacy', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Privacy for pact partners');
  await expect(page.getByText('You are offline. Saved pages remain visible, but pact changes need a connection.')).toBeVisible();
  await context.setOffline(false);
});

test('fresh HTTP connections preserve demo create, read, save, reload, and export', async () => {
  const baseURL = 'http://127.0.0.1:4173';
  const createClient = await request.newContext({ baseURL });
  const createdResponse = await createClient.post('/api/demo');
  expect(createdResponse.ok()).toBeTruthy();
  const created = await createdResponse.json() as CreatedSession;
  await createClient.dispose();

  const readClient = await request.newContext({ baseURL });
  expect((await readClient.get(`/api/pacts/${created.pact.id}`, { headers: { Authorization: `Bearer ${created.memberToken}` } })).ok()).toBeTruthy();
  await readClient.dispose();

  const saveClient = await request.newContext({ baseURL });
  const saved = await saveClient.post(`/api/pacts/${created.pact.id}/attempts`, {
    headers: { Authorization: `Bearer ${created.memberToken}` },
    data: { proofText: 'by\n  exact Nat.add_zero 11', explanation: 'The library statement closes this exact goal.', snapshots: [{ label: 'Fresh connection', proofState: '⊢ 11 + 0 = 11' }] }
  });
  expect(saved.ok()).toBeTruthy();
  await saveClient.dispose();

  const reloadClient = await request.newContext({ baseURL });
  const reloaded = await reloadClient.get(`/api/pacts/${created.pact.id}`, { headers: { Authorization: `Bearer ${created.memberToken}` } });
  expect(JSON.stringify(await reloaded.json())).toContain('Fresh connection');
  await reloadClient.dispose();

  const exportClient = await request.newContext({ baseURL });
  const exported = await exportClient.post(`/api/pacts/${created.pact.id}/export`, { headers: { Authorization: `Bearer ${created.memberToken}` } });
  expect(exported.ok()).toBeTruthy();
  expect(await exported.text()).toContain('Fresh connection');
  await exportClient.dispose();
});

for (const status of [404, 410]) {
  test(`a saved demo returning ${status} is replaced automatically`, async ({ browser }) => {
    const context = await browser.newContext();
    await context.addInitScript(({ staleStatus }) => {
      sessionStorage.setItem('demo:pact', JSON.stringify({ id: `demo-stale-${staleStatus}`, token: 'stale-token' }));
    }, { staleStatus: status });
    const page = await context.newPage();
    await page.route(`**/api/pacts/demo-stale-${status}`, route => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify({ error: status === 410 ? 'This demo pact expired.' : 'This demo pact was not found.' }) }));
    await page.goto('/demo');
    await expect(page.getByText('Demo — sample data, nothing is saved')).toBeVisible();
    await expect(page.getByText('Mira’s attempt')).toBeVisible();
    const replacement = JSON.parse(await page.evaluate(() => sessionStorage.getItem('demo:pact') || '{}')) as { id: string };
    expect(replacement.id).toMatch(/^demo-/);
    expect(replacement.id).not.toBe(`demo-stale-${status}`);
    await context.close();
  });
}

test('every public route has no serious or critical accessibility violations', async ({ page }) => {
  for (const route of ['/', '/demo', '/privacy', '/terms', '/missing-page']) {
    await page.goto(route);
    await expect(page.locator('main h1')).toBeVisible();
    const result = await new AxeBuilder({ page }).analyze();
    expect(result.violations.filter(v => ['serious', 'critical'].includes(v.impact || '')), route).toEqual([]);
  }
});

test('routes have titles, one h1, working deep links, and no console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', exception => errors.push(exception.message));
  for (const route of ['/', '/privacy', '/terms', '/demo']) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('main h1')).toHaveCount(1);
    expect(await page.title()).toContain('Proof Pact');
  }
  expect(errors).toEqual([]);
  const missing = await page.goto('/missing-page');
  expect(missing?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found');
  await expect(page.getByText('The page may have moved, or the pact link is incomplete.')).toBeVisible();
  await expect(page.getByText(/Reading 404|This dial points nowhere/i)).toHaveCount(0);
});

test('pact and invitation errors use specific recovery copy without decorative labels', async ({ browser }) => {
  const pactContext = await browser.newContext();
  await pactContext.addInitScript(() => localStorage.setItem('pact:missing-review-4:token', 'missing-key'));
  const pactPage = await pactContext.newPage();
  await pactPage.goto('/pact/missing-review-4');
  await expect(pactPage.getByRole('heading', { level: 1 })).toHaveText('Your pact did not load');
  await expect(pactPage.getByRole('alert')).toContainText('This pact was not found. Ask your partner for a fresh link.');
  await expect(pactPage.getByRole('link', { name: 'Return home' })).toBeVisible();
  await expect(pactPage.getByText('The signal stopped')).toHaveCount(0);
  await expect(pactPage.locator('.error-page > .eyebrow')).toHaveCount(0);
  await pactContext.close();

  const joinContext = await browser.newContext();
  const joinPage = await joinContext.newPage();
  await joinPage.goto('/join/missing-review-4');
  await expect(joinPage.getByRole('heading', { level: 1 })).toHaveText('This invitation did not load');
  await expect(joinPage.getByRole('alert')).toContainText('This pact was not found. Ask your partner for a fresh link.');
  await expect(joinPage.getByRole('link', { name: 'Return home' })).toBeVisible();
  await expect(joinPage.getByText('The signal stopped')).toHaveCount(0);
  await expect(joinPage.locator('.error-page > .eyebrow')).toHaveCount(0);
  await joinContext.close();
});

test('direct routes update social metadata and history restores focus, announcement, and scroll', async ({ page }) => {
  for (const [route, title] of [['/demo', 'Demo — Proof Pact'], ['/privacy', 'Privacy — Proof Pact'], ['/terms', 'Terms — Proof Pact'], ['/missing-page', 'Page not found — Proof Pact']]) {
    await page.goto(route);
    expect(await page.locator('meta[property="og:title"]').getAttribute('content')).toBe(title);
    expect(await page.locator('meta[name="twitter:title"]').getAttribute('content')).toBe(title);
    expect(await page.locator('meta[property="og:url"]').getAttribute('content')).toBe(`https://proof-study-pacts.sociobot.in${route === '/missing-page' ? '/404' : route}`);
  }
  await page.goto('/');
  await page.locator('#make').scrollIntoViewIfNeeded();
  const beforeScroll = await page.evaluate(() => scrollY);
  expect(beforeScroll).toBeGreaterThan(0);
  await page.getByRole('link', { name: 'Privacy' }).first().click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Privacy for pact partners');
  expect(Number(await page.evaluate(() => sessionStorage.getItem('route-scroll:/')))).toBeGreaterThanOrEqual(beforeScroll - 1);
  await page.goBack();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Work one Lean proof with a partner');
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  expect(await page.locator('#route-status').textContent()).toContain('Work one Lean proof');
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThanOrEqual(beforeScroll - 1);
});

test('completed pact starts a prefilled next-week pact and keeps local history', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Your name').fill('Ada'); await page.getByLabel('Partner name').fill('Emmy'); await page.getByLabel(/I agree that my partner/).check();
  await page.getByRole('button', { name: 'Create pact and invite' }).click();
  const privateLink = await page.getByRole('button', { name: 'Copy my private link' }).getAttribute('data-private-link');
  const invite = await page.getByLabel('Partner invite link').inputValue();
  const partner = await page.context().newPage();
  await partner.goto(invite); await partner.getByLabel(/I agree that my partner/).check(); await partner.getByRole('button', { name: 'Join pact as Explainer' }).click();
  for (const current of [page, partner]) {
    await current.getByLabel('Lean proof attempt').fill('by\n  rfl'); await current.getByLabel('Explanation in your own words').fill('Both sides reduce to the same natural number expression.'); await current.getByLabel('Proof state').fill('⊢ 1 = 1'); await current.getByRole('button', { name: 'Save proof attempt' }).click();
  }
  await page.goto(privateLink!);
  await page.getByRole('button', { name: 'Mark session complete' }).click();
  await expect(page.getByRole('button', { name: 'Create next week’s pact' })).toBeVisible();
  await page.getByRole('button', { name: 'Create next week’s pact' }).click();
  await expect(page.getByLabel('Your name')).toHaveValue('Ada');
  await expect(page.getByLabel('Partner name')).toHaveValue('Emmy');
  await expect(page.getByRole('heading', { name: 'Return to a saved pact' })).toBeVisible();
  await partner.close();
});

test('write endpoints return 429 with Retry-After during a burst', async ({ request }) => {
  const responses = await Promise.all(Array.from({ length: 28 }, () => request.post('/api/demo', { headers: { 'X-Forwarded-For': '198.51.100.42' } })));
  const limited = responses.filter(response => response.status() === 429);
  expect(limited.length).toBeGreaterThan(0);
  expect(limited[0].headers()['retry-after']).toBe('1');
});
