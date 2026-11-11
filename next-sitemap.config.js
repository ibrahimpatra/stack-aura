const fs = require('fs');
const path_ = require('path');
const IMAGES = require('./lib/images.json');
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.stackaura.cc';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin', '/admin/*', '/ar/admin', '/ar/admin/*', '/login', '/ar/login', '/server-sitemap.xml', '/ar/server-sitemap.xml', '/api/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/login', '/api/'] },
      // Let Google's image crawler see everything we want in Google Images
      { userAgent: 'Googlebot-Image', allow: ['/images/', '/media/', '/tech/', '/og/'] },
      { userAgent: 'facebookexternalhit', allow: '/' },
    ],
    // Dynamic sitemap: all projects, blog posts and their images (see pages/server-sitemap.xml.js)
    additionalSitemaps: [`${SITE_URL}/server-sitemap.xml`],
  },
  // Pages next-sitemap can't discover by itself: Arabic versions + the service pages (server-rendered)
  additionalPaths: async (config) => {
    const SERVICE_SLUGS = ['web-development', 'mobile-apps', 'ai-solutions', 'seo-optimisation', 'domain-hosting', 'custom-development', 'ui-ux-design', 'maintenance'];
    const base = ['/', '/about', '/blog', '/contact', '/projects', '/services', ...SERVICE_SLUGS.map((x) => `/services/${x}`)];
    const extra = [...SERVICE_SLUGS.map((x) => `/services/${x}`), ...base.map((b) => (b === '/' ? '/ar' : `/ar${b}`))];
    return Promise.all(extra.map((p) => config.transform(config, p)));
  },
  // Static pages + their SEO images (see lib/images.json)
  transform: async (config, path) => {
    const isAr = path === '/ar' || path.startsWith('/ar/');
    const base = isAr ? (path.replace(/^\/ar/, '') || '/') : path;
    const images = Object.values(IMAGES)
      .filter((img) => img.pages.includes(base) && fs.existsSync(path_.join(__dirname, 'public', img.src))) // only images that really exist
      .map((img) => ({ loc: new URL(img.src, SITE_URL), title: isAr ? img.title_ar : img.title, caption: isAr ? img.alt_ar : img.alt }));
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: path === '/' ? 1.0 : config.priority,
      lastmod: new Date().toISOString(),
      images,
    };
  },
};
