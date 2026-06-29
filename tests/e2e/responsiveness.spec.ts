import { test, expect } from '@playwright/test';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Verify', path: '/verify' }
];

const viewports = [
  { name: 'Mobile Narrow (iPhone SE)', width: 320, height: 568 },
  { name: 'Mobile Standard (iPhone 13)', width: 375, height: 812 },
  { name: 'Tablet Portrait (iPad)', width: 768, height: 1024 },
  { name: 'Simulated Desktop Site (Mobile)', width: 980, height: 1200 },
  { name: 'Desktop Standard', width: 1440, height: 900 }
];

test.describe('Responsiveness and Containment Audit', () => {
  for (const pageInfo of pages) {
    for (const vp of viewports) {
      test(`Page "${pageInfo.name}" at ${vp.name} (${vp.width}x${vp.height}) has no horizontal overflow`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(pageInfo.path);
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(500); // Allow animations/layout to settle

        // Detect horizontal scroll/overflow
        const overflowDetails = await page.evaluate(() => {
          const docWidth = document.documentElement.scrollWidth;
          const bodyWidth = document.body.scrollWidth;
          const winWidth = window.innerWidth;

          const overflows = docWidth > winWidth || bodyWidth > winWidth;

          let offender = null;
          if (overflows) {
            // Find the element(s) causing the overflow
            const elements = Array.from(document.querySelectorAll('*'));
            for (const el of elements) {
              const rect = el.getBoundingClientRect();
              if (rect.right > winWidth) {
                offender = {
                  tagName: el.tagName,
                  id: el.id,
                  className: el.className,
                  right: rect.right,
                  windowWidth: winWidth
                };
                break;
              }
            }
          }

          return {
            overflows,
            docWidth,
            bodyWidth,
            winWidth,
            offender
          };
        });

        // Assert that the page does not overflow horizontally
        expect(
          overflowDetails.overflows,
          `Horizontal scroll detected on "${pageInfo.name}" at viewport width ${vp.width}px! ` +
          `Document scrollWidth: ${overflowDetails.docWidth}px, Body scrollWidth: ${overflowDetails.bodyWidth}px, Window innerWidth: ${overflowDetails.winWidth}px. ` +
          `Potential offender: ${overflowDetails.offender ? JSON.stringify(overflowDetails.offender) : 'none'}`
        ).toBe(false);
      });
    }
  }
});
