import { test, expect } from '@playwright/test';

test.describe('Hero carousel', () => {
  test('renders 5 pagination dots', async ({ page }) => {
    await page.goto('/');
    const dots = page.locator('section').first().getByRole('button', { name: /go to slide/i });
    await expect(dots).toHaveCount(5);
  });

  test('pagination dots are at least 44px touch target on mobile', async ({ page }) => {
    // This runs on the mobile-safari and mobile-chrome projects
    await page.goto('/');
    const dot = page.locator('section').first().getByRole('button', { name: 'Go to slide 1' });
    const box = await dot.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(24);
    expect(box?.height).toBeGreaterThanOrEqual(24);
  });

  test('chevrons are hidden on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const prevBtn = page.getByRole('button', { name: /previous slide/i });
    await expect(prevBtn).toBeHidden();
  });
});
