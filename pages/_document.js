import { Html, Head, Main, NextScript } from 'next/document';
import { SITE } from '../lib/seo';

export default function Document(props) {
  const locale = props.locale || 'en';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: ['Stackaura', 'ستاك أورا'],
    url: SITE.url,
    description: SITE.description,
    address: { '@type': 'PostalAddress', addressCountry: 'KW', addressLocality: 'Kuwait City' },
    serviceType: ['Web Development', 'Mobile App Development', 'AI Assistants and AI-powered Apps', 'SEO Optimisation', 'Domain and Hosting Management', 'Custom Software Development', 'UI/UX Design'],
    areaServed: [{ '@type': 'Country', name: 'Kuwait' }, { '@type': 'Place', name: 'Worldwide (remote)' }],
    availableLanguage: ['English', 'Arabic'],
    priceRange: '$$',
    email: SITE.email,
    logo: `${SITE.url}/logo.png`,
    image: `${SITE.url}/og/og-default.png`,
    sameAs: [`https://twitter.com/stackauradigital`, `https://linkedin.com/company/stackaura-digital`],
  };
  return (
    <Html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#000129" />
        <meta name="author" content={SITE.name} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
