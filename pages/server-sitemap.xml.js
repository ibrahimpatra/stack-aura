// Live sitemap for content added from the admin panel: every project, every blog post,
// and every image on them (with alt text as title/caption) — this is what feeds Google Images.
// Available at https://stackaura.cc/server-sitemap.xml  (listed in robots.txt and sitemap.xml automatically)
import { SITE } from '../lib/seo';
import { normImages, absUrl } from '../lib/media';

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const imageTag = (im, fallback) =>
  `<image:image><image:loc>${esc(absUrl(im.src))}</image:loc>` +
  `<image:title>${esc(im.title || im.alt || fallback)}</image:title>` +
  `<image:caption>${esc(im.caption || im.alt || fallback)}</image:caption></image:image>`;

const urlTag = (path, lastmod, images = [], priority = '0.7') =>
  `<url><loc>${SITE.url}${path}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}<changefreq>weekly</changefreq><priority>${priority}</priority>${images.slice(0, 100).join('')}</url>`;

// pull <img src alt> out of a blog post's HTML
function contentImages(html = '') {
  const out = [];
  const re = /<img\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const src = /src=["']([^"']+)["']/i.exec(m[0])?.[1];
    const alt = /alt=["']([^"']*)["']/i.exec(m[0])?.[1] || '';
    if (src) out.push({ src, alt });
  }
  return out;
}

export async function getServerSideProps({ res }) {
  const urls = [];
  try {
    const { db } = await import('../lib/firebase');
    if (db) {
      const { collection, getDocs } = await import('firebase/firestore');
      const iso = (t) => t?.toDate?.()?.toISOString?.() || undefined;

      const projects = await getDocs(collection(db, 'projects'));
      projects.docs.forEach((d) => {
        const p = d.data(); const slug = p.slug || d.id;
        const imgs = normImages(p.images).map((im) => imageTag(im, `${p.title} website by stackaura.cc`));
        urls.push(urlTag(`/projects/${slug}`, iso(p.updatedAt) || iso(p.createdAt), imgs, '0.8'));
      });

      const posts = await getDocs(collection(db, 'posts'));
      posts.docs.forEach((d) => {
        const p = d.data(); const slug = p.slug || d.id;
        const all = [...(p.coverImage ? [{ src: p.coverImage, alt: p.coverAlt || p.title }] : []), ...contentImages(p.content)];
        urls.push(urlTag(`/blog/${slug}`, iso(p.updatedAt) || iso(p.createdAt), all.map((im) => imageTag(im, p.title)), '0.7'));
      });
    }
  } catch {}

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>`;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400');
  res.write(xml); res.end();
  return { props: {} };
}

export default function ServerSitemap() { return null; }
