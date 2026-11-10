const IMAGES = require('./lib/images.json');
const SITE_URL = 'https://www.stackaura.cc';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin', '/admin/*', '/login'],
  robotsTxtOptions: {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/login'] },
      { userAgent: 'Googlebot-Image', allow: '/images/' },
      { userAgent: 'facebookexternalhit', allow: '/' },
    ],
  },
  // Image sitemap: tells Google which images live on which page (helps Google Images).
  transform: async (config, path) => {
    const images = Object.values(IMAGES)
      .filter((img) => img.pages.includes(path))
      .map((img) => ({ loc: new URL(img.src, SITE_URL), title: img.title, caption: img.alt }));
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: path === '/' ? 1.0 : config.priority,
      lastmod: new Date().toISOString(),
      images,
    };
  },
};
