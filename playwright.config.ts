import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    headless: process.env.CI ? true : false,
    testIdAttribute: 'data-test'
  },

  projects: [
    {
      name: 'frontend',
      testDir: './tests/frontend',
      use: { ...devices['Desktop Chrome'],
      baseURL: 'https://www.saucedemo.com/',
      },
    },

    {
      name: 'backend',
      testDir: './tests/backend',
      use: { baseURL: 'https://reqres.in/api/' },
    },
  ],
});
