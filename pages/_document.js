import { Html, Head, Main, NextScript } from 'next/document';
import { SITE, CORE_KEYWORDS } from '../lib/seo';

export default function Document() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    address: { '@type': 'PostalAddress', addressCountry: 'KW', addressLocality: 'Kuwait City' },
    serviceType: ['Web Development', 'Mobile App Development', 'SEO Optimisation', 'Custom Software Development', 'UI/UX Design'],
    areaServed: 'Worldwide',
    priceRange: '$$',
    email: SITE.email,
    logo: `${SITE.url}/logo.png`,
    image: `${SITE.url}/og/og-default.png`,
    sameAs: [`https://twitter.com/stackauradigital`, `https://linkedin.com/company/stackaura-digital`],
  };

  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#000129" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={SITE.name} />
        <meta name="keywords" content={CORE_KEYWORDS.join(', ')} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={SITE.twitter} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
