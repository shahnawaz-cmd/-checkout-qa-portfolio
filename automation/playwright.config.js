const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './code',
  timeout: 90000,
  use: {
    headless: false,
    video: {
      mode: 'on',
      dir: './test-results/preloader-preview-to-checkout',
    },
  },
  outputDir: './test-results/preloader-preview-to-checkout',
});
