// Makes app/opengraph-image.jpg, the link preview picture (handbook Section 12):
// the home page hero at 1200x630, with only the brand, headline and prices,
// centered so apps that crop the preview to a square still show them.
// Remake it whenever the hero's wording or prices change.
//
// How to run it (in Terminal, from the project folder):
//   1. npm run build, then npm run start -- -p 3111   (leave it running)
//   2. node tools/make-link-preview.cjs <path to the playwright package> app/opengraph-image.jpg
// Playwright is the browser-driving tool used for the checks; it is not part
// of this project, so its folder is passed in.
// The package path is only known when the script runs, so it is loaded with require().
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pw = require(process.argv[2]); const out = process.argv[3];
(async () => { const b = await pw.chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 630 }, reducedMotion: "reduce" });
  await p.goto("http://localhost:3111/"); await p.waitForTimeout(1500);
  await p.addStyleTag({ content: `
    header, #main > :not(:first-child), footer, a[href="#top"], nextjs-portal { display:none !important }
    #main { padding-top:0 !important }
    #main > :first-child { padding:0 !important }
    section[aria-labelledby=hero-title] { height:630px !important; border-radius:0 !important; border:0 !important; display:grid !important; place-items:center !important; padding:0 !important }
    section[aria-labelledby=hero-title] > div.grid { grid-template-columns:1fr !important; max-width:1000px !important; justify-items:center; text-align:center }
    section[aria-labelledby=hero-title] > div.grid > div:last-child { display:none !important }
    #hero-title { font-size:52px !important; line-height:1.15 !important; max-width:600px; margin-top:22px !important }
    #hero-title + p, #hero-title ~ div, #hero-title ~ a, #hero-title ~ span, #hero-title ~ p:last-child { display:none !important }
    #hero-title ~ p.inline-flex { display:inline-flex !important; font-size:20px; margin-top:24px !important }
    .og-brand { display:flex; width:max-content; align-items:center; gap:12px; margin:0 auto 18px; font-size:24px !important }
    .og-brand img { width:44px !important; height:44px !important }
  `});
  await p.evaluate(() => { const brand = document.querySelector("header a[href='/']").cloneNode(true); brand.removeAttribute("href"); brand.className = "og-brand font-display font-semibold"; const col = document.querySelector("#hero-title").parentElement; col.insertBefore(brand, col.firstChild); document.querySelector("#hero-title").previousElementSibling.style.display = "none"; });
  await p.waitForTimeout(500); await p.screenshot({ path: out, type: "jpeg", quality: 88 }); await b.close(); })();
