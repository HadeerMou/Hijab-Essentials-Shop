/* Walks the buying flow end to end and captures each stage.
   usage: node tools/flow.mjs <baseUrl> <outDir> */
import { chromium } from 'playwright';

const base = process.argv[2] || 'http://localhost:3215';
const dir = process.argv[3] || '/tmp/claude-0';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--disable-background-networking', '--no-first-run'],
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 950 },
  reducedMotion: 'reduce',
});
await page.route('**/*', (r) =>
  r.request().url().startsWith('http://localhost') ? r.continue() : r.abort(),
);

const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));

// 1. product page → choose colour + size → add to bag
await page.goto(`${base}/product/signature-jersey-hijab`, { waitUntil: 'load' });
await page.getByRole('button', { name: 'Mocha' }).first().click();
await page.getByRole('button', { name: /Maxi/ }).click();
await page.getByRole('button', { name: /Add to bag/ }).click();
await page.waitForTimeout(700);
await page.screenshot({ path: `${dir}/flow-1-cart.png` });

// 2. add a second line from the shop grid
await page.goto(`${base}/shop?category=essentials`, { waitUntil: 'load' });
await page.locator('article').first().hover();
await page.getByRole('button', { name: 'Quick add' }).first().click();
await page.waitForTimeout(700);
const count = await page.locator('aside li').count();

// 3. currency switch
await page.getByRole('button', { name: 'Close bag' }).first().click();
await page.waitForTimeout(300);
await page.getByRole('button', { name: 'USD' }).first().click();
await page.waitForTimeout(400);
await page.screenshot({ path: `${dir}/flow-2-usd.png` });

// 4. checkout, all three steps
await page.goto(`${base}/checkout`, { waitUntil: 'load' });
await page.waitForTimeout(400);
await page.screenshot({ path: `${dir}/flow-3-checkout.png` });

await page.locator('#main').getByPlaceholder('Email address').fill('nour@example.com');
await page.getByPlaceholder('Phone (for the courier)').fill('01000000000');
await page.getByRole('button', { name: /Continue/ }).click();
await page.waitForTimeout(400);

await page.getByPlaceholder('First name').fill('Nour');
await page.getByPlaceholder('Last name').fill('Adel');
await page.getByPlaceholder('Address', { exact: true }).fill('14 Baghdad Street');
await page.getByPlaceholder('City').fill('Cairo');
await page.getByRole('button', { name: /Continue/ }).click();
await page.waitForTimeout(400);
await page.screenshot({ path: `${dir}/flow-4-payment.png` });

await page.getByPlaceholder('Card number').fill('4242424242424242');
await page.getByPlaceholder('MM / YY').fill('12/29');
await page.getByPlaceholder('CVC').fill('123');
await page.getByPlaceholder('Name on card').fill('Nour Adel');
await page.getByRole('button', { name: /Pay / }).click();
await page.waitForTimeout(700);
await page.screenshot({ path: `${dir}/flow-5-done.png` });

const heading = await page.locator('h1').first().innerText();

console.log(JSON.stringify({ linesInBag: count, finalHeading: heading, errors }, null, 2));
await browser.close();
