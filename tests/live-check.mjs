import { chromium, request } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, readFile } from 'node:fs/promises';

const baseURL = process.env.LIVE_URL || 'https://proof-study-pacts.sociobot.in';
const evidenceDir = process.env.EVIDENCE_DIR || '/tmp/proof-pact-polish-5-live';
await mkdir(evidenceDir, { recursive: true });

function check(condition, message) {
  if (!condition) throw new Error(message);
}

async function freshApi(method, path, options = {}) {
  const client = await request.newContext({ baseURL });
  const response = await client.fetch(path, { method, ...options });
  const result = { status: response.status(), headers: response.headers(), body: await response.body() };
  await client.dispose();
  return result;
}

const browser = await chromium.launch();
const requestOrigins = new Set();
const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await mobile.newPage();
page.on('request', value => requestOrigins.add(new URL(value.url()).origin));
const errors = [];
page.on('console', message => {
  const path = new URL(page.url()).pathname;
  const expectedNotFound = ['/missing-page', '/pact/missing-review-4', '/join/missing-review-4'].includes(path)
    && message.text().includes('status of 404');
  if (message.type() === 'error' && !expectedNotFound) errors.push(`${path}: ${message.text()}`);
});
page.on('pageerror', error => errors.push(`${new URL(page.url()).pathname}: ${error.message}`));

const landingResponse = await page.goto(`${baseURL}/`, { waitUntil: 'networkidle' });
check(landingResponse?.status() === 200, 'landing did not return 200');
check(await page.title() === 'Proof Pact — Work through Lean proofs together', 'landing title is wrong');
check((await page.locator('h1').count()) === 1, 'landing needs exactly one h1');
check((await page.getByText(/clear explanations/i).count()) === 0, 'subjective first-screen copy remains');
for (const text of ['Try it with sample data', 'Free to use', 'Partner-visible notes need consent', 'Records work; run Lean to check it']) {
  const box = await page.getByText(text, { exact: true }).boundingBox();
  check(Boolean(box && box.y + box.height <= 844), `${text} is below the first mobile screen`);
}
await page.screenshot({ path: `${evidenceDir}/landing-mobile.png`, fullPage: true });

const selectableExercises = await page.locator('#exercise-select option').evaluateAll(options => options.map((option, index) => ({
  index,
  title: option.textContent?.trim() || ''
})));
check(selectableExercises.length > 0, 'the pact form has no selectable public exercises');
const publicSources = await request.newContext({ timeout: 20_000 });
try {
  for (const exercise of selectableExercises) {
    await page.locator('#exercise-select').selectOption(String(exercise.index));
    const url = await page.locator('#exercise-url').inputValue();
    const response = await publicSources.get(url, { failOnStatusCode: false, maxRedirects: 5 });
    check(response.status() >= 200 && response.status() < 400, `${exercise.title} source returned ${response.status()}: ${url}`);
  }
} finally {
  await publicSources.dispose();
}

await page.goto(`${baseURL}/?demo=1`, { waitUntil: 'networkidle' });
check(new URL(page.url()).pathname === '/demo', '?demo=1 did not enter /demo');
await page.getByText('Mira’s attempt').waitFor();
await page.getByText('Demo — sample data, nothing is saved').waitFor();
for (const locator of [
  page.getByText('Mira — Prover', { exact: true }),
  page.getByText('Theo — Explainer', { exact: true }),
  page.getByRole('heading', { name: 'Mira’s saved attempt' }),
  page.locator('.demo-attempt-preview')
]) {
  const box = await locator.boundingBox();
  check(Boolean(box && box.y >= 0 && box.y + box.height <= 844), 'sample role or saved attempt is below the first mobile demo screen');
}
const initialDemo = JSON.parse(await page.evaluate(() => sessionStorage.getItem('demo:pact')));
await page.screenshot({ path: `${evidenceDir}/demo-mobile.png`, fullPage: true });
await page.getByLabel('Lean proof attempt').fill('by\n  exact Nat.add_zero 19');
await page.getByLabel('Explanation in your own words').fill('The existing theorem closes this exact goal.');
await page.getByLabel('Proof state').fill('⊢ 19 + 0 = 19');
await page.getByRole('button', { name: 'Save proof attempt' }).click();
await page.getByText('3 attempts').waitFor();
await page.reload({ waitUntil: 'networkidle' });
await page.getByText('exact Nat.add_zero 19').waitFor();
const downloadEvent = page.waitForEvent('download');
await page.getByRole('button', { name: 'Export Markdown note' }).click();
const download = await downloadEvent;
const markdown = await readFile(await download.path(), 'utf8');
for (const text of ['theorem add_zero', 'Mira — Prover', 'Theo — Explainer', 'I tried induction first.', 'Before simp', 'After induction', 'exact Nat.add_zero 19']) {
  check(markdown.includes(text), `live Markdown is missing ${text}`);
}
await page.evaluate(() => localStorage.setItem('real-live-sentinel', 'keep'));
await page.getByRole('button', { name: 'Reset demo' }).click();
await page.getByText('2 attempts').waitFor();
const resetDemo = JSON.parse(await page.evaluate(() => sessionStorage.getItem('demo:pact')));
check(resetDemo.id !== initialDemo.id, 'Reset demo reused the old workspace');
check(await page.evaluate(() => localStorage.getItem('real-live-sentinel')) === 'keep', 'demo changed real local data');

const staleContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
await staleContext.addInitScript(() => sessionStorage.setItem('demo:pact', JSON.stringify({ id: 'demo-missing-live', token: 'missing' })));
const stalePage = await staleContext.newPage();
await stalePage.goto(`${baseURL}/demo`, { waitUntil: 'networkidle' });
await stalePage.getByText('Mira’s attempt').waitFor();
check(JSON.parse(await stalePage.evaluate(() => sessionStorage.getItem('demo:pact'))).id !== 'demo-missing-live', 'missing demo did not recover');
await staleContext.close();

const routeExpectations = [
  ['/', 'Proof Pact — Work through Lean proofs together', '/', 'Work one Lean proof with a partner'],
  ['/demo', 'Demo — Proof Pact', '/demo', 'Natural Number Game — Add zero'],
  ['/privacy', 'Privacy — Proof Pact', '/privacy', 'Privacy for pact partners'],
  ['/terms', 'Terms — Proof Pact', '/terms', 'Terms for using Proof Pact'],
  ['/missing-page', 'Page not found — Proof Pact', '/404', 'Page not found']
];
for (const [route, title, canonicalPath, heading] of routeExpectations) {
  const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
  check(response?.status() === (route === '/missing-page' ? 404 : 200), `${route} returned ${response?.status()}`);
  check((await page.locator('main h1').count()) === 1, `${route} does not have one h1`);
  check(await page.locator('main h1').textContent() === heading, `${route} h1 is wrong`);
  check(await page.title() === title, `${route} title is wrong`);
  check(await page.locator('meta[property="og:title"]').getAttribute('content') === title, `${route} OG title is wrong`);
  check(await page.locator('meta[name="twitter:title"]').getAttribute('content') === title, `${route} Twitter title is wrong`);
  check(await page.locator('link[rel="canonical"]').getAttribute('href') === `${baseURL}${canonicalPath}`, `${route} canonical is wrong`);
  if (route === '/missing-page') await page.screenshot({ path: `${evidenceDir}/not-found-mobile.png`, fullPage: true });
  const axe = await new AxeBuilder({ page }).analyze();
  check(axe.violations.filter(item => ['serious', 'critical'].includes(item.impact)).length === 0, `${route} has serious axe violations`);
  const undersized = await page.locator('a, button, input, textarea, select, summary').evaluateAll(elements => elements.flatMap(element => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    if (style.display === 'none' || style.visibility === 'hidden' || rect.width === 0 || rect.height === 0) return [];
    return rect.width < 44 || rect.height < 44 ? [element.outerHTML.slice(0, 120)] : [];
  }));
  check(undersized.length === 0, `${route} has undersized targets: ${undersized.join(', ')}`);
}
check((await page.getByText(/Reading 404|This dial points nowhere/i).count()) === 0, '404 metaphor remains');

await page.evaluate(() => localStorage.setItem('pact:missing-review-4:token', 'missing-key'));
for (const [route, heading, screenshot] of [['/pact/missing-review-4', 'Your pact did not load', 'pact-error-mobile.png'], ['/join/missing-review-4', 'This invitation did not load', 'join-error-mobile.png']]) {
  await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { level: 1, name: heading }).waitFor();
  check((await page.locator('.error-page > .eyebrow').count()) === 0, `${route} has a decorative error label`);
  check((await page.getByText('The signal stopped').count()) === 0, `${route} retains the error metaphor`);
  check((await page.getByRole('alert').textContent()).includes('This pact was not found'), `${route} lacks a specific error reason`);
  check((await page.getByRole('link', { name: 'Return home' }).count()) === 1, `${route} lacks its recovery action`);
  await page.screenshot({ path: `${evidenceDir}/${screenshot}`, fullPage: true });
}
await page.goto(`${baseURL}/privacy`);
check((await page.getByRole('link', { name: 'privacy@sociobot.in' }).boundingBox()).height >= 44, 'privacy email target is undersized');
await page.goto(`${baseURL}/terms`);
check((await page.getByRole('link', { name: 'support@sociobot.in' }).boundingBox()).height >= 44, 'terms email target is undersized');

await page.goto(`${baseURL}/`);
await page.locator('#make').scrollIntoViewIfNeeded();
const landingScroll = await page.evaluate(() => scrollY);
await page.getByLabel('Main navigation').getByRole('link', { name: 'Privacy' }).click();
await page.goBack();
await page.getByRole('heading', { level: 1 }).waitFor();
check(await page.getByRole('heading', { level: 1 }).evaluate(element => element === document.activeElement), 'back navigation did not focus the landing h1');
check((await page.locator('#route-status').textContent()).includes('Work one Lean proof'), 'back navigation was not announced');
await page.waitForFunction(expected => scrollY >= expected - 1, landingScroll, { timeout: 2_000 });

await page.goto(`${baseURL}/`);
await page.getByLabel('Your name').fill('Ada live');
await page.getByLabel('Partner name').fill('Emmy live');
await page.getByLabel(/I agree that my partner/).check();
await page.getByRole('button', { name: 'Create pact and invite' }).click();
await page.getByText('Prover · joined').waitFor();
const invite = await page.getByLabel('Partner invite link').inputValue();
check((await page.evaluate(() => Object.keys(localStorage).some(key => /^pact:[a-z0-9]+:token$/.test(key)))), 'real private access link was not stored');
const partnerContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
const partner = await partnerContext.newPage();
await partner.goto(invite);
await partner.getByLabel(/I agree that my partner/).check();
await partner.getByRole('button', { name: 'Join pact as Explainer' }).click();
await partner.getByLabel('Lean proof attempt').fill('by\n  exact Nat.add_zero 41');
await partner.getByLabel('Explanation in your own words').fill('The existing theorem gives this equality directly.');
await partner.getByLabel('Proof state').fill('⊢ 41 + 0 = 41');
await partner.getByRole('button', { name: 'Save proof attempt' }).click();
await partner.getByText('1 attempt').waitFor();
await page.reload({ waitUntil: 'networkidle' });
const shared = page.locator('article.attempt').filter({ hasText: 'Nat.add_zero 41' });
await shared.getByText('Emmy live’s attempt').waitFor();
check((await shared.textContent()).includes('The existing theorem gives this equality directly.'), 'partner explanation did not sync');
await shared.getByText('1 proof-state snapshot').click();
await shared.getByText('⊢ 41 + 0 = 41').waitFor();
await page.getByLabel('Lean proof attempt').fill('by\n  exact Nat.add_zero 43');
await page.getByLabel('Explanation in your own words').fill('The same library theorem closes the Prover attempt.');
await page.getByLabel('Proof state').fill('⊢ 43 + 0 = 43');
await page.getByRole('button', { name: 'Save proof attempt' }).click();
await page.getByText('2 attempts').waitFor();
await page.getByRole('button', { name: 'Mark session complete' }).click();
await page.getByRole('button', { name: 'Create next week’s pact' }).click();
check(await page.getByLabel('Your name').inputValue() === 'Ada live', 'next-week creator was not prefilled');
check(await page.getByLabel('Partner name').inputValue() === 'Emmy live', 'next-week partner was not prefilled');
await partnerContext.close();

const createdRaw = await freshApi('POST', '/api/demo');
check(createdRaw.status === 200, 'fresh-connection demo create failed');
const created = JSON.parse(createdRaw.body.toString());
for (let index = 0; index < 8; index += 1) {
  const read = await freshApi('GET', `/api/pacts/${created.pact.id}`, { headers: { Authorization: `Bearer ${created.memberToken}` } });
  check(read.status === 200, `fresh-connection read ${index + 1} returned ${read.status}`);
}
const saved = await freshApi('POST', `/api/pacts/${created.pact.id}/attempts`, {
  headers: { Authorization: `Bearer ${created.memberToken}` },
  data: { proofText: 'by\n  exact Nat.add_zero 23', explanation: 'The shared theorem is the exact goal.', snapshots: [{ label: 'Live fresh connection', proofState: '⊢ 23 + 0 = 23' }] }
});
check(saved.status === 200, `fresh-connection save returned ${saved.status}`);
for (let index = 0; index < 8; index += 1) {
  const read = await freshApi('GET', `/api/pacts/${created.pact.id}`, { headers: { Authorization: `Bearer ${created.memberToken}` } });
  check(read.status === 200 && read.body.toString().includes('Live fresh connection'), `fresh-connection reload ${index + 1} lost saved work`);
}
const exported = await freshApi('POST', `/api/pacts/${created.pact.id}/export`, { headers: { Authorization: `Bearer ${created.memberToken}` } });
check(exported.status === 200 && exported.body.toString().includes('Live fresh connection'), 'fresh-connection export lost saved work');

const rejectedEmail = await freshApi('POST', '/api/pacts', { data: {
  creatorName: 'Ada', partnerName: 'Emmy', exerciseTitle: 'Natural Number Game — Add zero',
  exerciseUrl: 'https://adam.math.hhu.de/#/g/leanprover-community/nng4/world/Tutorial/level/4',
  theorem: 'theorem add_zero (n : ℕ) : n + 0 = n := by', weekOf: '2026-08-24', consent: true,
  email: 'ada@example.test'
} });
check(rejectedEmail.status === 422, `email field was not rejected: ${rejectedEmail.status}`);

check([...requestOrigins].every(origin => origin === baseURL), `third-party request observed: ${[...requestOrigins].join(', ')}`);
check(errors.length === 0, `browser errors: ${errors.join('; ')}`);
await page.goto(`${baseURL}/`);
await page.evaluate(() => navigator.serviceWorker.ready);
await page.reload();
await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller));
await mobile.setOffline(true);
await page.goto(`${baseURL}/privacy`, { waitUntil: 'domcontentloaded' });
await page.getByText('You are offline. Saved pages remain visible, but pact changes need a connection.').waitFor();
await mobile.setOffline(false);
await mobile.close();

const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await desktop.goto(`${baseURL}/`, { waitUntil: 'networkidle' });
await desktop.screenshot({ path: `${evidenceDir}/landing-desktop.png`, fullPage: true });
await desktop.close();
await browser.close();

console.log(JSON.stringify({ baseURL, evidenceDir, checks: 'passed', freshConnectionReads: 16, errors }, null, 2));
