// Technology helpers: names → slugs → logo files in /public/tech/<slug>.svg

// Logos that exist in /public/tech (drop a new <slug>.svg there to give any technology a logo).
export const LOGO_SLUGS = new Set([
  'android','angular','appstore','bootstrap','cloudflare','css3','dart','docker','expo','express','figma','firebase','flutter','git','github',
  'googleanalytics','googlecloud','googlemaps','googleplay','googlesearchconsole','graphql','html5','ios','java','javascript','jquery','kotlin',
  'laravel','mongodb','mysql','nextjs','nginx','nodejs','paypal','php','postgresql','prisma','python','react','reactnative','redis','redux','sass',
  'semrush','shopify','sqlite','stripe','supabase','swift','tailwindcss','typescript','vercel','vite','vuejs','webpack','whatsapp','woocommerce','wordpress',
]);

const ALIAS = {
  tailwind: 'tailwindcss', reactjs: 'react', node: 'nodejs', nodejs: 'nodejs', css: 'css3', html: 'html5', vue: 'vuejs', vue3: 'vuejs',
  postgres: 'postgresql', gcp: 'googlecloud', ga: 'googleanalytics', ga4: 'googleanalytics', apple: 'ios', iphone: 'ios', next: 'nextjs',
  js: 'javascript', ts: 'typescript', mongo: 'mongodb', gsc: 'googlesearchconsole', searchconsole: 'googlesearchconsole', expojs: 'expo',
  stripepayments: 'stripe', woocommerce: 'woocommerce', playstore: 'googleplay', googleplaystore: 'googleplay',
};

export const techSlug = (name = '') => {
  const s = String(name).toLowerCase().replace(/[^a-z0-9]/g, '');
  return ALIAS[s] || s;
};

export const techLogo = (name) => {
  const s = techSlug(name);
  return LOGO_SLUGS.has(s) ? `/tech/${s}.svg` : null;
};

// Starting library. Anything you add in the admin is saved to Firestore and joins this list.
export const DEFAULT_TECH = [
  'Next.js', 'React', 'React Native', 'Firebase', 'Node.js', 'Tailwind CSS', 'TypeScript', 'JavaScript', 'PostgreSQL',
  'Stripe', 'Vercel', 'Figma', 'Google Cloud', 'iOS', 'Android', 'Expo', 'WordPress', 'Shopify', 'WooCommerce', 'Google Analytics', 'SEO',
];

export const DEFAULT_BLOG_TAGS = ['Web Dev', 'SEO', 'Mobile', 'Backend', 'Business', 'Design'];

// Shown as pills on each service page until you choose your own in Admin → Tags & Technologies.
export const SERVICE_TECH_DEFAULTS = {
  'web-development': ['Next.js', 'React', 'Tailwind CSS', 'Firebase', 'Vercel'],
  'mobile-apps': ['React Native', 'Expo', 'iOS', 'Android', 'Firebase'],
  'seo-optimisation': ['Google Analytics', 'Next.js'],
  'custom-development': ['Node.js', 'PostgreSQL', 'Stripe', 'Firebase'],
  'ui-ux-design': ['Figma'],
  maintenance: ['Firebase', 'Vercel', 'Google Cloud'],
};
