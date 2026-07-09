import { test, expect } from '@playwright/test';

test('mobile swipe does not open modal and advances slide', async ({ page }) => {
  // Set mobile viewport (iPhone 13 dimensions are defined in Playwright config, but ensure explicit size)
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');

  const carousel = page.locator('[data-testid="hero-carousel"]');

  // Ensure initial slide is visible
  await expect(page.getByAltText(/vedah vital ashwagandha bottle/i)).toBeVisible();

  // Perform swipe left (drag) gesture
  const boundingBox = await carousel.boundingBox();
  if (boundingBox) {
    const startX = boundingBox.x + boundingBox.width / 2;
    const startY = boundingBox.y + boundingBox.height / 2;
    const endX = startX - 100; // swipe left by 100px
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, startY, { steps: 10 });
    await page.mouse.up();
  }

  // Modal should not appear
  await expect(page.locator('[role="dialog"]')).toHaveCount(0);

  // Verify that the slide advanced (check for text from next slide)
  await expect(page.getByText(/Supplement Facts/i)).toBeVisible();
});
