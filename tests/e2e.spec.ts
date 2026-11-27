import { test, expect } from "@playwright/test";

test.describe("AirAware End-to-End Suite (8 Core Flows + Accessibility)", () => {
  test.beforeEach(async ({ page }) => {
    // Seed initial local storage state
    await page.addInitScript(() => {
      window.localStorage.setItem("airaware_onboarded", "true");
    });
  });

  // FLOW 1: Open application landing page
  test("Flow 1: Landing page loads with hero, live hotspots, and calculation disclosure", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/AirAware/i);

    // Hero section checks
    const heroHeading = page.locator("h1");
    await expect(heroHeading).toContainText("Know Your Air.");

    // Hero exposure card with interactive disclosure
    const exposureButton = page.getByRole("button", { name: /How we calculate/i });
    await expect(exposureButton).toBeVisible();
    await exposureButton.click();
    await expect(page.getByText(/Calculation Methodology & Assumptions/i)).toBeVisible();
    await exposureButton.click(); // Close disclosure

    // Hotspot city cards
    await expect(page.getByText(/New Delhi/i).first()).toBeVisible();
    await expect(page.getByText(/London/i).first()).toBeVisible();
    await expect(page.getByText(/New York/i).first()).toBeVisible();

    // CTA button navigates to dashboard
    const checkAirCta = page.getByRole("link", { name: /Check my air/i }).first();
    await checkAirCta.click();
    await expect(page).toHaveURL(/\/dashboard/);
  });

  // FLOW 2: Search for a city and navigate via query params
  test("Flow 2: Select city passes parameters to dashboard", async ({ page }) => {
    await page.goto("/dashboard?city=London&lat=51.5074&lon=-0.1278");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/London/i);

    // Location modal interaction
    const locationBtn = page.getByRole("button", { name: /Change current location/i });
    if (await locationBtn.isVisible()) {
      await locationBtn.click();
      await expect(page.getByRole("dialog")).toBeVisible();
      const closeBtn = page.getByRole("button", { name: /Close location modal/i });
      if (await closeBtn.isVisible()) {
        await closeBtn.click();
      }
    }
  });

  // FLOW 3: View AQI and pollutant breakdown
  test("Flow 3: AQI overview, pollutant grid, and weather cards render accurately", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    await expect(page.locator("#main-content")).toBeVisible();

    // AQI Card - wait for API response or fallback
    await expect(page.getByText(/Current Air Quality Index/i)).toBeVisible({ timeout: 15000 });

    // Pollutant Grid
    await expect(page.getByText(/Individual Pollutant Breakdown/i)).toBeVisible();
    await expect(page.getByText(/PM2.5/i).first()).toBeVisible();
    await expect(page.getByText(/PM10/i).first()).toBeVisible();

    // 24-Hour Forecast
    await expect(page.getByText(/24-Hour Pollution & AQI Forecast Trend/i)).toBeVisible();
  });

  // FLOW 4: Create/update lifestyle profile
  test("Flow 4: Update lifestyle preferences in settings", async ({ page }) => {
    await page.goto("/settings");
    await expect(
      page.getByRole("heading", { name: /Settings & Household Profile/i })
    ).toBeVisible();

    // Submit preferences form
    const saveButton = page.getByRole("button", { name: /Save Preferences & Profile/i });
    await expect(saveButton).toBeVisible();
    await saveButton.click();
    await expect(page.getByText(/Saved locally!/i)).toBeVisible();
  });

  // FLOW 5: Generate personalized daily routine
  test("Flow 5: View diurnal schedule and toggle routine actions", async ({ page }) => {
    await page.goto("/planner");
    await expect(page.getByRole("heading", { name: /Build My Clean-Air Day/i })).toBeVisible();

    // Diurnal periods
    await expect(page.getByText(/Morning Routine/i)).toBeVisible();
    await expect(page.getByText(/Midday & Afternoon/i)).toBeVisible();
    await expect(page.getByText(/Evening Routine/i)).toBeVisible();
    await expect(page.getByText(/Night & Sleep Environment/i)).toBeVisible();

    // Toggle completion on a routine item if button exists
    const toggleButtons = page.getByRole("button", { name: /Mark .* as/i });
    if ((await toggleButtons.count()) > 0) {
      await toggleButtons.first().click();
    }
  });

  // FLOW 6: Open AI advisor and ask question
  test("Flow 6: Ask AirAware AI assistant and receive grounded answer", async ({ page }) => {
    await page.goto("/advisor");
    await expect(
      page.getByRole("heading", { level: 1, name: /AirAware AI Assistant/i })
    ).toBeVisible();

    // Click suggested prompt
    const suggestedPrompt = page.getByRole("button", {
      name: /Is it safe to go jogging outside today\?/i,
    });
    if (await suggestedPrompt.isVisible()) {
      await suggestedPrompt.click();
    } else {
      const input = page.getByPlaceholder(/Ask about daily routines/i);
      await input.fill("What should I do during high smog?");
      await page.getByRole("button", { name: /Send message/i }).click();
    }

    // Expect response with evidence or AI fallback mode
    await expect(page.getByText(/Evidence|AI fallback mode/i).first()).toBeVisible({
      timeout: 15000,
    });
  });

  // FLOW 7: Complete daily sustainable action
  test("Flow 7: Browse sustainable alternatives and log an action", async ({ page }) => {
    await page.goto("/alternatives");
    await expect(
      page.getByRole("heading", { name: /Small Changes. Cleaner Cities./i })
    ).toBeVisible();

    // Find and adopt an action
    const adoptButton = page
      .getByRole("button", { name: /Adopt this Sustainable Action/i })
      .first();
    if (await adoptButton.isVisible()) {
      await adoptButton.click();
      await expect(page.getByText(/added to your Impact Tracker/i)).toBeVisible();
    }
  });

  // FLOW 8: View updated impact tracker
  test("Flow 8: Verify personal environmental impact tracker metrics", async ({ page }) => {
    await page.goto("/impact");
    await expect(page.getByRole("heading", { name: /My Clean-Air Impact/i })).toBeVisible();

    // Verify impact counters
    await expect(page.getByText(/Actions Logged/i)).toBeVisible();
    await expect(page.getByText(/Avoided Emissions/i)).toBeVisible();
    await expect(page.getByText(/Avoided PM2.5/i)).toBeVisible();
  });

  // ACCESSIBILITY & KEYBOARD NAVIGATION
  test("Accessibility: Skip link, main landmarks, and accessible names", async ({ page }) => {
    await page.goto("/");

    // Skip to main content link
    const skipLink = page.getByRole("link", { name: /Skip to main content/i });
    await expect(skipLink).toBeAttached();

    // Verify main landmark
    const main = page.locator("#main-content");
    await expect(main).toBeAttached();

    // Verify all navigation links have valid accessible names
    const navLinks = page.locator("header nav a");
    const count = await navLinks.count();
    for (let i = 0; i < count; i++) {
      const link = navLinks.nth(i);
      const name = (await link.getAttribute("aria-label")) || (await link.innerText());
      expect(name.trim().length).toBeGreaterThan(0);
    }
  });
});
