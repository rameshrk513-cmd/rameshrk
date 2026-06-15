import { test, expect } from '@playwright/test';

test.describe('Login Automation Tests', () => {
  test('Test Case 1: Successful Login', async ({ page }) => {
    // Step 1: Launch the browser (handled by Playwright)
    
    // Step 2: Navigate to the login page URL
    await page.goto('https://practice.expandtesting.com/login');
    
    // Step 3: Verify that the login page is displayed successfully
    await expect(page).toHaveTitle(/Login/i);
    await expect(page.locator('h1')).toContainText('Login');
    
    // Step 4: Enter Username
    await page.fill('input[name="username"]', 'practice');
    
    // Step 5: Enter Password
    await page.fill('input[name="password"]', 'SuperSecretPassword!');
    
    // Step 6: Click the Login button
    await page.click('button[type="submit"]');
    
    // Step 7: Verify that the user is redirected to the /secure page
    await page.waitForURL('**/secure');
    expect(page.url()).toContain('/secure');
    
    // Step 8: Confirm the success message "You logged into a secure area!" is visible
    await expect(page.locator('text=You logged into a secure area!')).toBeVisible();
    
    // Step 9: Verify that a Logout button is displayed
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
  });
});
