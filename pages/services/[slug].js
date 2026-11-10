import Link from 'next/link';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import SEOHead from '../../components/ui/SEOHead';
import TechPill from '../../components/ui/TechPill';
import SiteImage from '../../components/ui/SiteImage';
import ContactSection from '../../components/sections/ContactSection';
import { useScrollReveal } from '../../lib/useScrollReveal';
import { pageSEO, SERVICES } from '../../lib/seo';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

const SERVICE_DATA = {
  'web-development': {
    headline: 'Website Development in Kuwait',
    subheadline: 'A professional website that looks great, loads fast and helps customers find you.',
    description: 'We build your business website from start to finish. It works perfectly on phones, tablets and computers, loads quickly, and is set up so Google can find it. Whether you need a simple company website, an online store or a custom web application, we build it to grow with your business.',
    color: '#DB333D',
    keywords: ['custom website development', 'web development kuwait', 'next.js developer', 'react developer kuwait', 'professional web development', 'build your website', 'website development company'],
    features: ['Modern, good-looking design', 'Works on phones and computers', 'Easy for Google to find (SEO)', 'Online store and payments', 'Easy dashboard to update your content', 'Contact forms and WhatsApp button', 'Visitor statistics (Google Analytics)', 'Fast loading speed'],
    process: ['We talk about your business and goals', 'We plan the pages and design', 'We build your website', 'We add your content and set up Google', 'We test everything carefully', 'We launch your website', 'We train you and stay available for help'],
    faq: [
      { q: 'How long does a website take?', a: 'Most websites are ready in 2–4 weeks, depending on how many pages and features you need.' },
      { q: 'Can I update the website myself?', a: 'Yes. We can add an easy dashboard so you can change text, photos and products without any technical skills.' },
      { q: 'Will my website show on Google?', a: 'Yes. Every website we build is set up for Google from day one, so people can find you.' },
    ],
  },
  'mobile-apps': {
    headline: 'Mobile App Development in Kuwait',
    subheadline: 'One app that works on both iPhone and Android, built for your business.',
    description: 'We build mobile apps for iPhone and Android at the same time, which saves you money and time. Your customers can order, book, chat or shop right from their phone, and we help you publish the app on the App Store and Google Play.',
    color: '#F3F4FA',
    keywords: ['mobile app development kuwait', 'ios app developer', 'android app developer', 'react native developer', 'cross platform app development'],
    features: ['Works on iPhone and Android', 'Simple, easy-to-use screens', 'Notifications to your customers', 'Customer accounts and login', 'Online payments', 'Works even with weak internet', 'We publish it on the App Store and Google Play', 'Usage statistics'],
    process: ['We talk about your app idea', 'We design the screens', 'We build the app', 'We connect it to your data', 'We test it on real phones', 'We publish it in the app stores', 'We support you after launch'],
    faq: [
      { q: 'Do I need two separate apps?', a: 'No. We build one app that works on both iPhone and Android, which saves you time and money.' },
      { q: 'Can you publish the app for me?', a: 'Yes. We handle the full App Store and Google Play process for you.' },
    ],
  },
  'seo-optimisation': {
    headline: 'SEO – Rank Higher on Google in Kuwait',
    subheadline: 'Help more customers find your business when they search on Google.',
    description: 'SEO means making your website easier for Google to understand, so it shows higher in search results. We check your website, find what is holding it back, fix it, and choose the right words your customers type into Google.',
    color: '#F3F4FA',
    keywords: ['seo optimisation kuwait', 'google ranking kuwait', 'local seo kuwait', 'seo expert kuwait', 'technical seo', 'website seo service'],
    features: ['Full check of your website', 'Finding the words customers search', 'Fixing problems that hurt your ranking', 'Better page titles and descriptions', 'Images that appear in Google Images', 'Google Search Console setup', 'Google Business Profile setup', 'Monthly progress reports'],
    process: ['We check your current website', 'We research what customers search for', 'We fix the technical problems', 'We improve your pages and images', 'We submit your website to Google', 'We track results every month'],
    faq: [
      { q: 'How long before I see results?', a: 'Small improvements can show in 2–6 weeks. Bigger ranking improvements usually take 2–4 months.' },
      { q: 'Do you promise first place on Google?', a: 'No honest company can promise that. But our careful, proven approach gives you the best chance to rank higher.' },
    ],
  },
  'custom-development': {
    headline: 'Custom Software Development',
    subheadline: 'Special tools built exactly for the way your business works.',
    description: 'Sometimes ready-made software does not fit. We build custom systems for you: online payments, booking and ordering, customer dashboards, and connections between the tools you already use. You tell us the problem, we build the solution.',
    color: '#DB333D',
    keywords: ['custom software development', 'custom web application', 'api development kuwait', 'backend development', 'stripe integration kuwait', 'custom development'],
    features: ['Online payment setup', 'Booking and ordering systems', 'Dashboards to see your business numbers', 'Connect your existing tools', 'Automatic emails and messages', 'Safe and secure data storage', 'Customer login areas', 'Reports and exports'],
    process: ['We learn how your business works', 'We plan the solution', 'We build it step by step', 'We connect it to your tools', 'We test security and speed', 'We launch and monitor it'],
    faq: [
      { q: 'I already have a website. Can you add features?', a: 'Yes. We can add new features to your current website without rebuilding everything.' },
      { q: 'Can it connect with the tools I already use?', a: 'In most cases, yes. We connect with payment services, email tools, customer systems and more.' },
    ],
  },
  'ui-ux-design': {
    headline: 'UI/UX Design in Kuwait',
    subheadline: 'Simple, beautiful design that turns visitors into customers.',
    description: 'Good design is not only about looks. It makes your website easy to understand and guides visitors to contact you or buy. We design clean, modern pages that match your brand, show you how it will look first, and then build it.',
    color: '#DB333D',
    keywords: ['ui ux design kuwait', 'web design kuwait', 'figma design', 'website design', 'app design kuwait', 'user interface design'],
    features: ['Modern design that fits your brand', 'Easy menus and clear pages', 'Designs for phone and computer', 'You see everything before we build', 'Colors, fonts and style guide', 'Clear buttons that get more enquiries', 'Design files given to you', 'We can build it too'],
    process: ['We learn your brand and goals', 'We sketch the pages', 'We create the full design', 'You review and we adjust', 'We prepare the files for building', 'We help while it is built'],
    faq: [
      { q: 'Do I get the design files?', a: 'Yes. You receive all design files, and they are yours to keep.' },
      { q: 'Can you design and build my website?', a: 'Yes. Most clients choose both, so design and building fit together perfectly.' },
    ],
  },
  maintenance: {
    headline: 'Website Care & Support',
    subheadline: 'We keep your website safe, fast and working, so you can focus on your business.',
    description: 'A website needs regular care, just like a car. We update it, protect it from security problems, watch that it stays online, and fix issues quickly. You get peace of mind and a website that always works.',
    color: '#DB333D',
    keywords: ['website maintenance kuwait', 'web support services', 'site updates kuwait', 'website care plan', 'technical support web'],
    features: ['Regular updates', 'Security protection', 'We watch that your site stays online', 'Backups of your website', 'Text and photo changes', 'Fixing bugs and errors', 'Monthly report', 'Fast support when you need help'],
    process: ['We check your website', 'We set up monitoring and backups', 'We update it every month', 'We scan for security problems', 'We send you a monthly report', 'We fix any issue quickly'],
    faq: [
      { q: 'Which websites do you look after?', a: 'Any website we built, and most other websites too.' },
      { q: 'What is included each month?', a: 'Updates, security checks, backups, small content changes, speed checks and a simple monthly report.' },
    ],
  },
};

export default function ServicePage({ slug, technologies = [] }) {
  useScrollReveal();
  const service = SERVICES.find((s) => s.slug === slug);
  const data = SERVICE_DATA[slug];

  if (!service || !data) return (
    <div style={{ background: '#000129', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="text-center">
        <p className="text-xl mb-4" style={{ fontFamily: 'Syne,sans-serif', color: '#F3F4FA' }}>Service not found</p>
        <Link href="/services" style={{ color: '#DB333D' }}>← All Services</Link>
      </div>
    </div>
  );

  const seo = pageSEO({
    title: `${data.headline} | stackaura.cc Kuwait`,
    description: data.description.slice(0, 160),
    path: `/services/${slug}`,
    extraKeywords: data.keywords,
  });

  const otherServices = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <SEOHead {...seo} />
      <div style={{ background: '#000129', minHeight: '100vh' }}>
        <Navbar />

        {/* Hero */}
        <section className="pt-32 pb-16 px-6 grid-bg" style={{ borderBottom: '1px solid #DDE1EA' }}>
          <div className="max-w-4xl mx-auto">
            <Link href="/services" className="inline-flex items-center gap-2 text-sm mb-8 reveal"
              style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>
              <ArrowLeft size={15} /> All Services
            </Link>
            <div className="flex items-center gap-3 mb-5 reveal">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: `${data.color}15`, color: data.color }}>
                {service.icon}
              </div>
              <span className="text-sm font-medium" style={{ color: data.color, fontFamily: 'IBM Plex Sans,sans-serif' }}>{service.label}</span>
            </div>
            <h1 className="font-bold mb-4 reveal delay-1" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.2rem,5vw,3.5rem)', color: '#F3F4FA', lineHeight: 1.15 }}>
              {data.headline}
            </h1>
            <p className="text-lg mb-6 reveal delay-2" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif', maxWidth: 560 }}>
              {data.subheadline}
            </p>
            <div className="flex flex-wrap gap-3 reveal delay-3">
              <Link href="/contact" className="btn-primary">Get a Free Quote <ArrowRight size={15} /></Link>
              <Link href="/projects" className="btn-ghost">See Our Work</Link>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2">
              <SiteImage id={slug} rounded={6} fallback style={{ marginBottom: 28 }} />
              <p className="text-base leading-relaxed mb-10 reveal" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif', fontSize: '1.2rem' }}>
                {data.description}
              </p>

              {technologies.length > 0 && (
                <div className="mb-10 reveal">
                  <h2 className="font-bold mb-4" style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.5rem', color: '#F3F4FA' }}>Technologies We Use</h2>
                  <div className="flex flex-wrap gap-3">{technologies.map((t) => <TechPill key={t} name={t} big />)}</div>
                </div>
              )}

              {/* Features */}
              <h2 className="font-bold mb-5 reveal" style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.5rem', color: '#F3F4FA' }}>What You Get</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12 reveal delay-1">
                {data.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 p-3 rounded-xl" style={{ background: '#14172E', border: '1px solid #DDE1EA' }}>
                    <CheckCircle2 size={20} style={{ color: data.color, flexShrink: 0, marginTop: 1 }} />
                    <span className="text-sm" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* Process */}
              <h2 className="font-bold mb-5 reveal" style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.5rem', color: '#F3F4FA' }}>How It Works</h2>
              <div className="space-y-3 mb-12 reveal delay-1">
                {data.process.map((step, i) => (
                  <div key={step} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: '#14172E', border: '1px solid #DDE1EA' }}>
                    <div className="w-9 h-9 rounded-full text-sm font-bold flex items-center justify-center flex-shrink-0"
                      style={{ background: `${data.color}20`, color: data.color, fontFamily: 'IBM Plex Sans,sans-serif' }}>{i + 1}</div>
                    <span className="text-sm" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>{step}</span>
                  </div>
                ))}
              </div>

              {/* FAQ */}
              <h2 className="font-bold mb-5 reveal" style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.5rem', color: '#F3F4FA' }}>Common Questions</h2>
              <div className="space-y-4 reveal delay-1">
                {data.faq.map((f) => (
                  <div key={f.q} className="p-5 rounded-xl" style={{ background: '#14172E', border: '1px solid #DDE1EA' }}>
                    <h3 className="font-bold text-sm mb-2" style={{ fontFamily: 'Syne,sans-serif', color: '#F3F4FA' }}>{f.q}</h3>
                    <p className="text-sm" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>{f.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* CTA Card */}
              <div className="card p-6 mb-6 reveal" style={{ position: 'sticky', top: '100px' }}>
                <h3 className="font-bold mb-2" style={{ fontFamily: 'Syne,sans-serif', color: '#F3F4FA' }}>Ready to Start?</h3>
                <p className="text-sm mb-5" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>Get a free chat and a clear price for your project.</p>
                <Link href="/contact" className="btn-primary w-full justify-center mb-3">Get a Free Quote</Link>
                <Link href="/projects" className="btn-ghost w-full justify-center">See Our Work</Link>
              </div>

              {/* Other services */}
              <div className="reveal delay-2">
                <h4 className="font-bold text-sm mb-4" style={{ fontFamily: 'Syne,sans-serif', color: '#F3F4FA' }}>Other Services</h4>
                <div className="space-y-2">
                  {otherServices.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`}
                      className="flex items-center gap-3 p-3 rounded-xl transition-colors block"
                      style={{ background: '#14172E', border: '1px solid #DDE1EA' }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#DB333D'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#2A2F57'}>
                      <span className="text-lg">{s.icon}</span>
                      <span className="text-sm" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>{s.label}</span>
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
  let technologies = [];
  try { const { getServiceTech } = await import('../../lib/taxonomy'); technologies = await getServiceTech(slug); } catch {}
  return { props: { slug, technologies } };
}
