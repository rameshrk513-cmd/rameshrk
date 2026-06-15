const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.blazedemo.com/');
  const values = await page.$$eval('select[name="toPort"] option', opts => opts.map(o => ({ value: o.value, text: o.textContent.trim() })));
  console.log(JSON.stringify(values, null, 2));
  await page.screenshot({ path: 'toPort-options.png' });
  await browser.close();
})();
