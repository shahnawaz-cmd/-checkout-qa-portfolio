const { test, expect } = require('@playwright/test');
const path = require('path');

const PREVIEW_URL =
  'https://dev.dodgewindowsticker.com/vin-check/ws-preview?vin=1FM5K7F88HGC38165&type=sticker&wpPage=homepage';

const EVIDENCE_DIR = path.join(__dirname, '..', 'test-results', 'KOD-preloader-preview-to-checkout');

test('VNCA KOD — Preview → Preloader → Checkout flow with timing', async ({ page }) => {
  // Step 1: Open Preview page
  await page.goto(PREVIEW_URL, { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: `${EVIDENCE_DIR}\\01-KOD-preview-page.png`, fullPage: true });

  // Step 2: Click "Access Records" on page to open popup
  await page.getByRole('button', { name: /access records/i }).first().click();

  // Step 3: Fill email in "Get your Window Sticker" popup
  const emailInput = page.locator('input[type="email"]').first();
  await emailInput.waitFor({ state: 'visible', timeout: 10000 });
  await emailInput.fill('test@example.com');
  await page.screenshot({ path: `${EVIDENCE_DIR}\\02-KOD-email-popup.png`, fullPage: true });

  // Step 4: Click "Access Records" button inside popup
  await page.locator('dialog, [role="dialog"], .modal, [class*="modal"], [class*="popup"]')
    .getByRole('button', { name: /access records/i }).click();

  const startTime = Date.now();

  // Step 5: Capture Preloader
  const preloader = page.locator('text=Preparing Your Checkout');
  await expect(preloader).toBeVisible({ timeout: 15000 });
  await page.screenshot({ path: `${EVIDENCE_DIR}\\03-KOD-preloader-screen.png`, fullPage: true });
  console.log('✅ KOD Preloader appeared');

  // Step 6: Wait for Checkout page
  await page.waitForURL('**/checkout**', { timeout: 60000, waitUntil: 'domcontentloaded' });
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`⏱ KOD Time from Preloader to Checkout: ${elapsed}s`);

  // Step 7: Capture Checkout page
  await expect(page.locator('text=Choose payment method')).toBeVisible({ timeout: 10000 });
  await page.screenshot({ path: `${EVIDENCE_DIR}\\04-KOD-checkout-page.png`, fullPage: true });
  console.log('✅ KOD Checkout page loaded successfully');

  expect(parseFloat(elapsed)).toBeLessThan(30);
});
