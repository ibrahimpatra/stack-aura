export const SITE = {
  name: 'stackaura.cc',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.stackaura.cc',
  tagline: 'Web, Mobile & SEO Development Agency',
  description: 'stackaura.cc is a professional web development agency offering custom website development, mobile app development, SEO optimisation, and digital marketing services worldwide. Based in Kuwait, serving clients globally.',
  email: 'hello@stackaura.cc',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '96500000000', // ← set your real number in .env (country code, no +)
  location: 'Kuwait City, Kuwait',
  twitter: '@stackauradigital',
};

// Core SEO keywords — injected across all pages
export const CORE_KEYWORDS = [
  'web development agency kuwait',
  'custom website development',
  'professional web development',
  'build your website kuwait',
  'web developer kuwait',
  'next.js developer',
  'react developer kuwait',
  'mobile app development kuwait',
  'seo optimisation kuwait',
  'digital marketing kuwait',
  'full stack developer kuwait',
  'firebase developer',
  'best web development company',
  'affordable web development',
  'stackaura digital',
  'website design kuwait',
  'ecommerce development kuwait',
  'app developer kuwait',
  'google ranking kuwait',
  'local seo kuwait',
];

// Generate page SEO — merges project client names into keywords automatically
export function pageSEO({ title, description, path = '', extraKeywords = [], projectClients = [] }) {
  const allKeywords = [
    ...CORE_KEYWORDS,
    ...extraKeywords,
    ...projectClients.map((c) => `${c} website`),
    ...projectClients.map((c) => `${c} web development`),
  ];
  return {
    title: `${title} | ${SITE.name}`,
    description,
    keywords: allKeywords.join(', '),
    canonical: `${SITE.url}${path}`,
    ogImage: `${SITE.url}/og/og-default.png`,
  };
}

// Services list used across site
export const SERVICES = [
  { slug: 'web-development', label: 'Website Development', short: 'A professional website for your business', icon: '🌐', color: '#3B82F6' },
  { slug: 'mobile-apps', label: 'Mobile Apps', short: 'Your own app for iPhone and Android', icon: '📱', color: '#06B6D4' },
  { slug: 'seo-optimisation', label: 'Google Ranking (SEO)', short: 'Get found by more customers on Google', icon: '🔍', color: '#8B5CF6' },
  { slug: 'custom-development', label: 'Custom Software', short: 'Special tools built for your business', icon: '⚙️', color: '#10B981' },
  { slug: 'ui-ux-design', label: 'Design (UI/UX)', short: 'Simple, beautiful design people like', icon: '🎨', color: '#F59E0B' },
  { slug: 'maintenance', label: 'Care & Support', short: 'We look after your website for you', icon: '🛡️', color: '#EF4444' },
];
