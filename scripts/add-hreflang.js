// Runs after next-sitemap: gives every URL in sitemap-0.xml its exact English / Arabic / x-default alternates.
const fs = require('fs');
const path = require('path');
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.stackaura.cc').replace(/\/$/, '');
const file = path.join(__dirname, '..', 'public', 'sitemap-0.xml');
if (!fs.existsSync(file)) process.exit(0);

let xml = fs.readFileSync(file, 'utf8');
if (!xml.includes('xmlns:xhtml')) xml = xml.replace('<urlset ', '<urlset xmlns:xhtml="http://www.w3.org/1999/xhtml" ');

xml = xml.replace(/<url>([\s\S]*?)<\/url>/g, (m, inner) => {
  const loc = (inner.match(/<loc>([^<]+)<\/loc>/) || [])[1];
  if (!loc) return m;
  let p = loc.replace(SITE, '') || '/';
  p = p.replace(/^\/ar(\/|$)/, '/');
  const en = SITE + (p === '/' ? '' : p);
  const ar = SITE + '/ar' + (p === '/' ? '' : p);
  const links = `<xhtml:link rel="alternate" hreflang="en" href="${en || SITE}"/><xhtml:link rel="alternate" hreflang="ar" href="${ar}"/><xhtml:link rel="alternate" hreflang="x-default" href="${en || SITE}"/>`;
  const clean = inner.replace(/<xhtml:link[^>]*\/>/g, '');
  return `<url>${clean.replace(/(<priority>[^<]*<\/priority>)/, `$1${links}`)}</url>`;
});
fs.writeFileSync(file, xml);
console.log('hreflang alternates added to sitemap-0.xml');
