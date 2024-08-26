import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // Look for test files in the "test/e2e" directory, relative to this configuration file.
  testDir: "./test/playwright",

  // Run all tests in parallel.
  fullyParallel: false,

  retries: 2,

  // Use half of the number of logical CPU cores for running tests in parallel.
  workers: undefined,
  timeout: 90000,

  use: {
    // We are using locally deployed MetaMask Test Dapp.
    baseURL: process.env.DAPP_URL,
  },

  // Synpress currently only supports Chromium, however, this will change in the future.
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  reporter: process.env.CI
    ? [
        [
          "html",
          {
            open: "never",
            outputFolder: `playwright-report-${
              process.env.HEADLESS ? "headless" : "headful"
            }`,
          },
        ],
      ]
    : "html",

  // Serve MetaMask Test Dapp locally before starting the tests.
  webServer: {
    command: "pnpm run serve:test-dapp",
    url: process.env.DAPP_URL,
    reuseExistingServer: true,
  },
});
