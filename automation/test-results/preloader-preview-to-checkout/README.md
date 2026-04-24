# Test Results — Preloader Preview to Checkout

Place your screenshots and screen recordings here.

## Expected Files

| File | Description |
|------|-------------|
| `preloader-screen.png` | Screenshot of Preloader ("Preparing Your Checkout") |
| `checkout-page.png` | Screenshot of Checkout page after redirect |
| `preview-to-checkout-flow.mp4` | Full screen recording of the flow |

## How to Capture (Playwright)

Add these to `playwright.config.js` to auto-capture on test run:

```js
use: {
  screenshot: 'on',
  video: 'on',
}
```

Then re-run:
```bash
npx playwright test preloader-checkout.spec.js --headed
```

Artifacts will be saved automatically in this folder.
