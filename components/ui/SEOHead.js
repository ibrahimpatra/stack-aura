import Head from 'next/head';
import { useRouter } from 'next/router';
import { SITE } from '../../lib/seo';

// Canonical + hreflang (English / Arabic) are built automatically from the current URL, so every page gets them right.
export default function SEOHead({ title, description, keywords, ogImage, structuredData }) {
  const router = useRouter();
  const locale = router.locale || 'en';
  const path = (router.asPath || '/').split('?')[0].split('#')[0];
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  const urlFor = (l) => `${SITE.url}${l === 'ar' ? '/ar' : ''}${clean}` || SITE.url;
  const canonical = urlFor(locale) || `${SITE.url}/`;

  const fullTitle = title || `${SITE.name} | ${SITE.tagline}`;
  const desc = description || SITE.description;
  const img = ogImage || `${SITE.url}/og/og-default.png`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={SITE.name} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="en" href={urlFor('en') || `${SITE.url}/`} />
      <link rel="alternate" hrefLang="ar" href={urlFor('ar')} />
      <link rel="alternate" hrefLang="x-default" href={urlFor('en') || `${SITE.url}/`} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={locale === 'ar' ? 'ar_AR' : 'en_US'} />
      <meta property="og:locale:alternate" content={locale === 'ar' ? 'en_US' : 'ar_AR'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="stackaura.cc – websites, mobile apps, AI and SEO in Kuwait" />
      <meta property="og:url" content={canonical} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE.twitter} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />

      {structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />}
    </Head>
  );
}
