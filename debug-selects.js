const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.blazedemo.com/');
  const from = await page.$$eval('select[name="fromPort"] option', opts => opts.map(o => ({ value: o.value, text: o.textContent.trim() })));
  const to = await page.$$eval('select[name="toPort"] option', opts => opts.map(o => ({ value: o.value, text: o.textContent.trim() })));
  console.log('fromPort:', JSON.stringify(from, null, 2));
  console.log('toPort:', JSON.stringify(to, null, 2));
  await page.screenshot({ path: 'selects.png' });
  await browser.close();
})();
