import { expect, test } from '@playwright/test';
import { readFile, readdir } from 'node:fs/promises';

test('README opens with the job and the catalog description is verb-first', async () => {
  const readme = await readFile('README.md', 'utf8');
  expect(readme.split('\n')[0]).toBe('# Work through one Lean proof with a partner');
  expect(readme).not.toMatch(/^# Proof Pact$/m);

  const catalog = (await readFile('.factory/catalog-description.txt', 'utf8')).trim();
  expect(catalog.split('\n')).toHaveLength(1);
  expect(catalog.length).toBeLessThanOrEqual(120);
  expect(catalog).toMatch(/^Work\b/);
});

test('claim registry maps every claim to exactly one tagged test', async () => {
  const claims = JSON.parse(await readFile('.factory/claims.json', 'utf8')) as Array<{ id: string; test: string }>;
  const testFiles = (await readdir('tests')).filter(file => file.endsWith('.ts'));
  const testSource = (await Promise.all(testFiles.map(file => readFile(`tests/${file}`, 'utf8')))).join('\n');
  const ids = claims.map(claim => claim.id);

  expect(new Set(ids).size).toBe(ids.length);
  for (const claim of claims) {
    expect(claim.test).toBe(`npm test -- --grep @claim:${claim.id}`);
    const occurrences = testSource.split(`@claim:${claim.id}`).length - 1;
    expect(occurrences, claim.id).toBe(1);
  }
  expect((testSource.match(/@claim:[a-z0-9-]+/g) || []).length).toBe(claims.length);
});
