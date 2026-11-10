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
  exclude: ['/admin', '/admin/*', '/login', '/server-sitemap.xml', '/api/*'],
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
  // Static pages + their SEO images (see lib/images.json)
  transform: async (config, path) => {
    const images = Object.values(IMAGES)
      .filter((img) => img.pages.includes(path) && fs.existsSync(path_.join(__dirname, 'public', img.src))) // only images that really exist
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
