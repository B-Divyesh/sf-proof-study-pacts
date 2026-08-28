import { expect, request, test } from '@playwright/test';
import { publicExercises } from '../frontend/src/exercises';

test('release gate: every selectable public Lean exercise URL is available', async () => {
  const client = await request.newContext({ timeout: 20_000 });
  try {
    expect(publicExercises.length).toBeGreaterThan(0);
    for (const exercise of publicExercises) {
      const response = await client.get(exercise.url, { failOnStatusCode: false, maxRedirects: 5 });
      expect(response.status(), `${exercise.title} (${exercise.url})`).toBeGreaterThanOrEqual(200);
      expect(response.status(), `${exercise.title} (${exercise.url})`).toBeLessThan(400);
    }
  } finally {
    await client.dispose();
  }
});
