/* Screenshot helper used while building the storefront.
   usage: node tools/shot.mjs <url> <out.png> [height] [width] [fullPage] */
import { chromium } from 'playwright';

const url = process.argv[2];
const out = process.argv[3];
const height = Number(process.argv[4] || 1400);
const width = Number(process.argv[5] || 1440);
const fullPage = process.argv[6] === 'full';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: [
    '--disable-features=Translate,OptimizationHints,MediaRouter,AutofillServerCommunication',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-background-networking',
  ],
});

const page = await browser.newPage({
  viewport: { width, height },
  deviceScaleFactor: 1,
  // Renders every Reveal immediately so full-page captures are complete.
  reducedMotion: 'reduce',
});

// Block anything that tries to leave the machine.
await page.route('**/*', (route) => {
  const u = route.request().url();
  if (u.startsWith('http://localhost') || u.startsWith('data:') || u.startsWith('blob:')) {
    return route.continue();
  }
  return route.abort();
});

await page.goto(url, { waitUntil: 'load', timeout: 45000 });

// Trip every IntersectionObserver reveal, then return to the top.
await page.evaluate(async () => {
  const step = window.innerHeight * 0.75;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1400);

await page.screenshot({ path: out, fullPage });
await browser.close();
