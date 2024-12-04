const { test, expect } = require('@playwright/test');

test('Google Reviews iframe - No errors', async ({ page }) => {
  // Go to the iframe URL
  await page.goto('https://widgets.sociablekit.com/google-reviews/iframe/25495168', {
    waitUntil: 'domcontentloaded', // Wait until the DOM is loaded
  });
  // Wait for the iframe to load by checking through page.frames()
  let iframe = null;
  const frames = page.frames();
  for (let frame of frames) {
    if (frame.url().includes("sociablekit")) {
      iframe = frame;
      break;
    }
  }
  // Ensure the iframe is found
  expect(iframe).toBeTruthy();

  // Check for any console errors
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // Wait for potential errors to be logged
  await page.waitForTimeout(5000); 
  // If any errors were logged, fail the test
  expect(consoleErrors).toHaveLength(0);
});
