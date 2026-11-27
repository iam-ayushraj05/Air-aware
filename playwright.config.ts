import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: "list",
  timeout: 30000,
  expect: {
    timeout: 15000,
  },
  use: {
    baseURL: "http://127.0.0.1:3005",
    actionTimeout: 15000,
    navigationTimeout: 15000,
    trace: "off",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npx next start -p 3005 -H 127.0.0.1",
    url: "http://127.0.0.1:3005",
    reuseExistingServer: false,
    timeout: 120000,
  },
});
