import { test, expect } from '@playwright/test';

test.describe('Verify page flows', () => {
  test('renders search input with placeholder', async ({ page }) => {
    await page.goto('/verify');
    const input = page.locator('#batch-code-input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('maxlength', '20');
  });

  test('shows error for unknown code', async ({ page }) => {
    await page.goto('/verify');
    await page.fill('#batch-code-input', 'VV-FAKE-9999-999');
    await page.press('#batch-code-input', 'Enter');
    await expect(page.getByText(/batch code not found/i)).toBeVisible({ timeout: 5000 });
  });

  test('shows report for known code VV-ASH-2026-001', async ({ page }) => {
    await page.goto('/verify');
    await page.fill('#batch-code-input', 'VV-ASH-2026-001');
    await page.press('#batch-code-input', 'Enter');
    await expect(page.getByText(/certificate of analysis/i)).toBeVisible({ timeout: 5000 });
  });
});
