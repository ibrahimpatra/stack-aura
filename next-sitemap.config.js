/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://stackauradigital.web.app',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin', '/admin/*', '/login'],
  robotsTxtOptions: {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/login'] },
      { userAgent: 'facebookexternalhit', allow: '/' },
    ],
  },
};
