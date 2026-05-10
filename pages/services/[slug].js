import Link from 'next/link';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import SEOHead from '../../components/ui/SEOHead';
import ContactSection from '../../components/sections/ContactSection';
import { useScrollReveal } from '../../lib/useScrollReveal';
import { pageSEO, SERVICES } from '../../lib/seo';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

const SERVICE_DATA = {
  'web-development': {
    headline: 'Custom Web Development',
    subheadline: 'Professional websites and web apps built for performance, SEO, and growth.',
    description: 'We build custom websites and web applications using Next.js, React, and Firebase. Every site is server-side rendered (SSR) for maximum SEO performance, mobile-responsive, and built to scale. Whether you need a business website, e-commerce platform, or a full web app — we deliver.',
    color: '#3B82F6',
    keywords: ['custom website development', 'web development kuwait', 'next.js developer', 'react developer kuwait', 'professional web development', 'build your website', 'website development company'],
    features: ['Next.js & React development', 'Server-side rendering (SSR)', 'Firebase or PostgreSQL backend', 'Mobile-responsive design', 'SEO optimisation built-in', 'Admin dashboard & CMS', 'Payment gateway integration', 'Google Analytics setup'],
    process: ['Discovery & requirements', 'Wireframes & design', 'Frontend development', 'Backend & database', 'SEO & performance', 'Testing & QA', 'Launch & handover'],
    faq: [
      { q: 'How long does a website take?', a: 'Most websites take 2–4 weeks from kickoff to launch, depending on complexity.' },
      { q: 'Do you use WordPress?', a: 'We build with Next.js and React for superior performance and SEO. Far better than WordPress for business sites.' },
      { q: 'Will my site rank on Google?', a: 'Yes — every site includes SSR, structured data, sitemaps, and technical SEO from day one.' },
    ],
  },
  'mobile-apps': {
    headline: 'Mobile App Development',
    subheadline: 'iOS and Android apps built with React Native — native performance, one codebase.',
    description: 'We develop cross-platform mobile applications using React Native and Expo. Your app runs natively on both iOS and Android from a single codebase, reducing cost and development time without sacrificing performance.',
    color: '#06B6D4',
    keywords: ['mobile app development kuwait', 'ios app developer', 'android app developer', 'react native developer', 'cross platform app development'],
    features: ['Cross-platform iOS & Android', 'React Native & Expo', 'Firebase real-time backend', 'Push notifications', 'Offline support', 'App Store & Play Store submission', 'In-app purchases', 'Analytics integration'],
    process: ['App concept & scoping', 'UI/UX design', 'React Native development', 'API & backend integration', 'Testing on real devices', 'App Store submission', 'Post-launch support'],
    faq: [
      { q: 'Do you build native or cross-platform?', a: 'We use React Native which gives native performance on both iOS and Android from one codebase.' },
      { q: 'Can you submit to the App Store?', a: 'Yes — we handle the full App Store and Google Play submission process.' },
    ],
  },
  'seo-optimisation': {
    headline: 'SEO Optimisation',
    subheadline: 'Rank higher on Google and get found by customers searching for your business.',
    description: 'Our SEO service covers everything from technical audits to structured data implementation, sitemap generation, keyword strategy, and content optimisation. We\'ve helped businesses in Kuwait rank on Google\'s first page within weeks.',
    color: '#8B5CF6',
    keywords: ['seo optimisation kuwait', 'google ranking kuwait', 'local seo kuwait', 'seo expert kuwait', 'technical seo', 'website seo service'],
    features: ['Technical SEO audit', 'Structured data (Schema.org)', 'XML sitemap generation', 'robots.txt optimisation', 'Core Web Vitals', 'Google Search Console setup', 'Keyword research & strategy', 'Google Business Profile setup'],
    process: ['SEO audit of current site', 'Keyword research', 'Technical fixes', 'On-page optimisation', 'Structured data setup', 'Sitemap & robots.txt', 'Search Console submission', 'Monthly reporting'],
    faq: [
      { q: 'How long before I see results?', a: 'Technical SEO improvements can show results in 2–6 weeks. Full ranking improvements typically take 2–4 months.' },
      { q: 'Do you guarantee first page ranking?', a: 'No ethical SEO agency guarantees rankings — but our technical approach consistently delivers results.' },
    ],
  },
  'custom-development': {
    headline: 'Custom Software Development',
    subheadline: 'Tailored solutions built exactly for your business needs — APIs, integrations, and more.',
    description: 'Sometimes off-the-shelf software doesn\'t cut it. We build custom backends, REST APIs, third-party integrations, payment systems, automation tools, and dashboards designed precisely for your workflow.',
    color: '#10B981',
    keywords: ['custom software development', 'custom web application', 'api development kuwait', 'backend development', 'stripe integration kuwait', 'custom development'],
    features: ['REST API development', 'Third-party integrations', 'Stripe payment integration', 'Admin dashboards', 'Automation & webhooks', 'Database design', 'Firebase & cloud functions', 'CRM integrations'],
    process: ['Requirements analysis', 'Architecture planning', 'Backend development', 'API documentation', 'Frontend integration', 'Testing & security', 'Deployment & monitoring'],
    faq: [
      { q: 'What if I already have a frontend?', a: 'No problem — we can build just the backend API and integrate with your existing frontend.' },
      { q: 'Can you integrate with my existing tools?', a: 'Yes — we integrate with most CRMs, payment gateways, email services, and third-party APIs.' },
    ],
  },
  'ui-ux-design': {
    headline: 'UI/UX Design',
    subheadline: 'Beautiful, user-focused interfaces that convert visitors into customers.',
    description: 'Good design is not just about looks — it\'s about guiding users to take action. We design interfaces in Figma that are clean, intuitive, and conversion-optimised, then bring them to life in code.',
    color: '#F59E0B',
    keywords: ['ui ux design kuwait', 'web design kuwait', 'figma design', 'website design', 'app design kuwait', 'user interface design'],
    features: ['Figma UI design', 'Wireframing & prototyping', 'Design systems', 'Mobile-first approach', 'Component libraries', 'User flow mapping', 'Brand consistency', 'Handoff-ready assets'],
    process: ['Brand & goal discovery', 'Wireframes', 'High-fidelity mockups', 'Prototype & review', 'Design system docs', 'Developer handoff', 'Implementation support'],
    faq: [
      { q: 'Do you deliver Figma files?', a: 'Yes — all design files are fully handed over to you in Figma format.' },
      { q: 'Can you design and build?', a: 'Absolutely — most of our projects include both design and development as a package.' },
    ],
  },
  maintenance: {
    headline: 'Website Maintenance & Support',
    subheadline: 'Keep your site running perfectly with ongoing care, updates, and technical support.',
    description: 'A website isn\'t a one-time project — it needs regular updates, security patches, and monitoring. Our maintenance plans keep your site fast, secure, and up to date so you can focus on your business.',
    color: '#EF4444',
    keywords: ['website maintenance kuwait', 'web support services', 'site updates kuwait', 'website care plan', 'technical support web'],
    features: ['Monthly security updates', 'Performance monitoring', 'Uptime monitoring (99.9%)', 'Content updates', 'Bug fixes & patches', 'Firebase & hosting management', 'Monthly reports', 'Priority support'],
    process: ['Site audit & onboarding', 'Monitoring setup', 'Monthly update schedule', 'Regular security scans', 'Performance reports', 'On-demand fixes', 'Quarterly review'],
    faq: [
      { q: 'What sites do you maintain?', a: 'Any site we\'ve built, and most sites built with Next.js, React, or WordPress.' },
      { q: 'What\'s included in monthly updates?', a: 'Security patches, dependency updates, content changes, performance checks, and a monthly report.' },
    ],
  },
};

export default function ServicePage({ slug }) {
  useScrollReveal();
  const service = SERVICES.find((s) => s.slug === slug);
  const data = SERVICE_DATA[slug];

  if (!service || !data) return (
    <div style={{ background: '#080C14', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="text-center">
        <p className="text-xl mb-4" style={{ fontFamily: 'Syne,sans-serif', color: '#E2E8F0' }}>Service not found</p>
        <Link href="/services" style={{ color: '#3B82F6' }}>← All Services</Link>
      </div>
    </div>
  );

  const seo = pageSEO({
    title: `${data.headline} | Stackaura Digital Kuwait`,
    description: data.description.slice(0, 160),
    path: `/services/${slug}`,
    extraKeywords: data.keywords,
  });

  const otherServices = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <SEOHead {...seo} />
      <div style={{ background: '#080C14', minHeight: '100vh' }}>
        <Navbar />

        {/* Hero */}
        <section className="pt-32 pb-16 px-6 grid-bg" style={{ borderBottom: '1px solid #1A2236' }}>
          <div className="max-w-4xl mx-auto">
            <Link href="/services" className="inline-flex items-center gap-2 text-sm mb-8 reveal"
              style={{ color: '#475569', fontFamily: 'DM Sans,sans-serif' }}>
              <ArrowLeft size={15} /> All Services
            </Link>
            <div className="flex items-center gap-3 mb-5 reveal">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: `${data.color}15`, color: data.color }}>
                {service.icon}
              </div>
              <span className="text-sm font-medium" style={{ color: data.color, fontFamily: 'DM Sans,sans-serif' }}>{service.label}</span>
            </div>
            <h1 className="font-bold mb-4 reveal delay-1" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.2rem,5vw,3.5rem)', color: '#E2E8F0', lineHeight: 1.15 }}>
              {data.headline}
            </h1>
            <p className="text-lg mb-6 reveal delay-2" style={{ color: '#64748B', fontFamily: 'DM Sans,sans-serif', maxWidth: 560 }}>
              {data.subheadline}
            </p>
            <div className="flex flex-wrap gap-3 reveal delay-3">
              <Link href="/contact" className="btn-primary">Get a Quote <ArrowRight size={15} /></Link>
              <Link href="/projects" className="btn-ghost">See Our Work</Link>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2">
              <p className="text-base leading-relaxed mb-10 reveal" style={{ color: '#94A3B8', fontFamily: 'DM Sans,sans-serif', fontSize: '1.05rem' }}>
                {data.description}
              </p>

              {/* Features */}
              <h2 className="font-bold mb-5 reveal" style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.5rem', color: '#E2E8F0' }}>What's Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12 reveal delay-1">
                {data.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 p-3 rounded-xl" style={{ background: '#0D1220', border: '1px solid #1A2236' }}>
                    <CheckCircle2 size={15} style={{ color: data.color, flexShrink: 0, marginTop: 1 }} />
                    <span className="text-sm" style={{ color: '#94A3B8', fontFamily: 'DM Sans,sans-serif' }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* Process */}
              <h2 className="font-bold mb-5 reveal" style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.5rem', color: '#E2E8F0' }}>Our Process</h2>
              <div className="space-y-3 mb-12 reveal delay-1">
                {data.process.map((step, i) => (
                  <div key={step} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: '#0D1220', border: '1px solid #1A2236' }}>
                    <div className="w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0"
                      style={{ background: `${data.color}20`, color: data.color, fontFamily: 'JetBrains Mono,monospace' }}>{i + 1}</div>
                    <span className="text-sm" style={{ color: '#94A3B8', fontFamily: 'DM Sans,sans-serif' }}>{step}</span>
                  </div>
                ))}
              </div>

              {/* FAQ */}
              <h2 className="font-bold mb-5 reveal" style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.5rem', color: '#E2E8F0' }}>FAQ</h2>
              <div className="space-y-4 reveal delay-1">
                {data.faq.map((f) => (
                  <div key={f.q} className="p-5 rounded-xl" style={{ background: '#0D1220', border: '1px solid #1A2236' }}>
                    <h3 className="font-bold text-sm mb-2" style={{ fontFamily: 'Syne,sans-serif', color: '#E2E8F0' }}>{f.q}</h3>
                    <p className="text-sm" style={{ color: '#64748B', fontFamily: 'DM Sans,sans-serif' }}>{f.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* CTA Card */}
              <div className="card p-6 mb-6 reveal" style={{ position: 'sticky', top: '100px' }}>
                <h3 className="font-bold mb-2" style={{ fontFamily: 'Syne,sans-serif', color: '#E2E8F0' }}>Ready to Start?</h3>
                <p className="text-sm mb-5" style={{ color: '#64748B', fontFamily: 'DM Sans,sans-serif' }}>Get a free consultation and quote for your {service.label.toLowerCase()} project.</p>
                <Link href="/contact" className="btn-primary w-full justify-center mb-3">Get a Free Quote</Link>
                <Link href="/projects" className="btn-ghost w-full justify-center">See Our Work</Link>
              </div>

              {/* Other services */}
              <div className="reveal delay-2">
                <h4 className="font-bold text-sm mb-4" style={{ fontFamily: 'Syne,sans-serif', color: '#E2E8F0' }}>Other Services</h4>
                <div className="space-y-2">
                  {otherServices.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`}
                      className="flex items-center gap-3 p-3 rounded-xl transition-colors block"
                      style={{ background: '#0D1220', border: '1px solid #1A2236' }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1A2236'}>
                      <span className="text-lg">{s.icon}</span>
                      <span className="text-sm" style={{ color: '#94A3B8', fontFamily: 'DM Sans,sans-serif' }}>{s.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactSection full />
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  if (!SERVICE_DATA[slug]) return { notFound: true };
  return { props: { slug } };
}
