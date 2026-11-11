export const SITE = {
  name: 'stackaura.cc',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.stackaura.cc',
  tagline: 'Websites, Mobile Apps, AI & SEO in Kuwait',
  description: 'stackaura.cc builds websites, mobile apps and AI assistants in Kuwait, and gets your business found on Google. Arabic and English, budget-friendly, ready for Google from day one.',
  email: 'hello@stackaura.cc',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '96500000000', // ← set your real number in .env (country code, no +)
  location: 'Kuwait City, Kuwait',
  twitter: '@stackauradigital',
};

// Keywords by language. Kuwait first: local searches are far easier to win than worldwide ones.
export const CORE_KEYWORDS_EN = [
  'web development company kuwait', 'website design kuwait', 'web developer kuwait', 'mobile app development kuwait', 'app developer kuwait',
  'seo kuwait', 'google ranking kuwait', 'ai chatbot kuwait', 'ai assistant for business kuwait', 'ecommerce website kuwait',
  'affordable website design kuwait', 'domain and hosting kuwait', 'arabic website development', 'business email setup kuwait', 'stackaura',
];
export const CORE_KEYWORDS_AR = [
  'تصميم مواقع الكويت', 'شركة تصميم مواقع في الكويت', 'برمجة تطبيقات الكويت', 'تطوير مواقع الكويت', 'تحسين محركات البحث الكويت',
  'شات بوت ذكاء اصطناعي الكويت', 'تصميم متجر إلكتروني الكويت', 'تصميم مواقع بأسعار مناسبة', 'استضافة ودومين الكويت', 'ستاك أورا',
];
export const CORE_KEYWORDS = CORE_KEYWORDS_EN;

// Generate page SEO — merges project client names into keywords automatically
export function pageSEO({ title, description, extraKeywords = [], projectClients = [], locale = 'en', ogImage }) {
  const base = locale === 'ar' ? CORE_KEYWORDS_AR : CORE_KEYWORDS_EN;
  const allKeywords = [...extraKeywords, ...base, ...projectClients.map((c) => `${c} website`)];
  return {
    title: `${title} | ${SITE.name}`,
    description,
    keywords: allKeywords.join(', '),
    ogImage: ogImage || `${SITE.url}/og/og-default.png`,
  };
}

// Services (labels/descriptions live in lib/lang/*.js). `icon` is a lucide-react icon name — no emojis.
export const SERVICES = [
  { slug: 'web-development', icon: 'Globe' },
  { slug: 'mobile-apps', icon: 'Smartphone' },
  { slug: 'ai-solutions', icon: 'Bot' },
  { slug: 'seo-optimisation', icon: 'Search' },
  { slug: 'domain-hosting', icon: 'Server' },
  { slug: 'custom-development', icon: 'Code2' },
  { slug: 'ui-ux-design', icon: 'Palette' },
  { slug: 'maintenance', icon: 'ShieldCheck' },
];
