// URLs on this domain served by a separate app (Edge Verify, proxied under /edgeverify/).
// Listed in our sitemap until Edge Verify publishes its own sitemap at /edgeverify/sitemap.xml.
export const externalUrls = [
  '/edgeverify/',
  '/edgeverify/backtest/',
  '/edgeverify/paper-trading/',
  '/edgeverify/invest/',
  '/edgeverify/how-it-works/',
  '/edgeverify/about/',
  '/edgeverify/blog/',
  '/edgeverify/blog/why-90-percent-traders-lose/',
  '/edgeverify/privacy/',
  '/edgeverify/terms/',
].map((path) => ({ path, url: `https://ranabrothers.online${path}`, lastModified: '2026-07-03' }));
