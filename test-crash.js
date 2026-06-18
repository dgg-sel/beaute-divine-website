const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to the admin page
  await page.goto('http://localhost:3009/admin');
  
  // Wait for the button
  await page.waitForSelector('button:has-text("+ Nuevo Producto")');
  
  // Set up an error listener to catch client-side exceptions
  page.on('pageerror', exception => {
    console.error('Client-side exception caught:', exception);
  });
  
  // Click the button
  await page.click('button:has-text("+ Nuevo Producto")');
  
  // Wait a moment for the modal to render and potentially crash
  await page.waitForTimeout(2000);
  
  await browser.close();
})();
