import { test, expect } from '@playwright/test';

test.use({ browserName: 'chromium' });

// Map city names to their actual dropdown values on BlazeDemo
const cityMap: Record<string, string> = {
  Boston: 'Boston',
  'New York': 'New York',
  'San Diego': 'San Diego',
  Paris: 'Paris',
  London: 'London',
  Philadelphia: 'Philadelphia',
};

const flightRoutes = [
  { from: 'Boston', to: 'New York' },
  { from: 'Boston', to: 'London' },
  { from: 'Boston', to: 'San Diego' },
  { from: 'Boston', to: 'Paris' },
  { from: 'Boston', to: 'Philadelphia' },
  { from: 'New York', to: 'San Diego' },
  { from: 'New York', to: 'London' },
  { from: 'New York', to: 'Paris' },
  { from: 'New York', to: 'Philadelphia' },
  { from: 'New York', to: 'Boston' },
  { from: 'San Diego', to: 'New York' },
  { from: 'San Diego', to: 'London' },
  { from: 'San Diego', to: 'Paris' },
  { from: 'San Diego', to: 'Boston' },
  { from: 'San Diego', to: 'Philadelphia' },
  { from: 'Paris', to: 'New York' },
  { from: 'Paris', to: 'London' },
  { from: 'Paris', to: 'San Diego' },
  { from: 'Paris', to: 'Boston' },
  { from: 'Paris', to: 'Philadelphia' },
  { from: 'London', to: 'New York' },
  { from: 'London', to: 'San Diego' },
  { from: 'London', to: 'Paris' },
  { from: 'London', to: 'Boston' },
  { from: 'London', to: 'Philadelphia' },
  { from: 'Philadelphia', to: 'New York' },
  { from: 'Philadelphia', to: 'San Diego' },
  { from: 'Philadelphia', to: 'London' },
  { from: 'Philadelphia', to: 'Paris' },
  { from: 'Philadelphia', to: 'Boston' },
];

const testCases = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  ...flightRoutes[index % flightRoutes.length],
}));

test.describe('Airline Demo Application - Chrome only', () => {
  testCases.forEach(({ id, from, to }) => {
    test(`Airline booking search test #${id}: ${from} -> ${to}`, async ({ page }) => {
      await page.goto('https://www.blazedemo.com/');

      await expect(page).toHaveTitle(/BlazeDemo/);
      await expect(page.locator('h1')).toContainText('Welcome to the Simple Travel Agency!');

      const fromSelect = page.locator('select[name="fromPort"]');
      const toSelect = page.locator('select[name="toPort"]');

      await fromSelect.selectOption(cityMap[from]);
      await toSelect.selectOption(cityMap[to]);
      await page.click('input[type="submit"]');

      await expect(page).toHaveURL(/reserve.php/);
      
      const flightRows = page.locator('table tbody tr');
      const count = await flightRows.count();
      expect(count).toBeGreaterThan(0);
      
      // Click the first "Choose This Flight" button
      const chooseButton = page.locator('input[value="Choose This Flight"]').first();
      await expect(chooseButton).toBeVisible();
    });
  });
});
