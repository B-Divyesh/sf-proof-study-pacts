import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 8_000 },
  fullyParallel: false,
  retries: 0,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }, testMatch: /mobile\.spec\.ts/ }
  ],
  webServer: {
    command: 'PORT=4173 DATABASE_PATH=/tmp/proof-pact-playwright.db RUST_LOG=warn cargo run',
    url: 'http://127.0.0.1:4173/health',
    reuseExistingServer: false,
    timeout: 120_000
  }
});
