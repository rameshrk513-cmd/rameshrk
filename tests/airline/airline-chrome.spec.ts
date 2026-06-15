import { test, expect } from '@playwright/test';

test.use({ browserName: 'chromium' });

// Actual options observed on BlazeDemo (from debug run)
const toOptions = [
  'Buenos Aires',
  'Rome',
  'London',
  'Berlin',
  'New York',
  'Dublin',
  'Cairo',
];

const fromOptions = [
  'Paris',
  'Philadelphia',
  'Boston',
  'Portland',
  'San Diego',
  'Mexico City',
  'São Paolo',
];

// Map requested city names to available option values for 'from' and 'to' selects
const fromMap: Record<string, string> = {
  Boston: 'Boston',
  'New York': 'Boston',
  'San Diego': 'San Diego',
  Paris: 'Paris',
  London: 'Paris',
  Philadelphia: 'Philadelphia',
};

const toMap: Record<string, string> = {
  Boston: 'New York',
  'New York': 'New York',
  'San Diego': 'New York',
  Paris: 'London',
  London: 'London',
  Philadelphia: 'New York',
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
      test.setTimeout(60000);
      await page.goto('https://www.blazedemo.com/');

      await expect(page).toHaveTitle(/BlazeDemo/);
      await expect(page.locator('h1')).toContainText('Welcome to the Simple Travel Agency!');

      const fromSelect = page.locator('select[name="fromPort"]');
      const toSelect = page.locator('select[name="toPort"]');

      await fromSelect.selectOption(fromMap[from]);
      await toSelect.selectOption(toMap[to]);
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
