import Link from 'next/link';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import SEOHead from '../../components/ui/SEOHead';
import { useScrollReveal } from '../../lib/useScrollReveal';
import { pageSEO, SERVICES } from '../../lib/seo';
import SiteImage from '../../components/ui/SiteImage';
import { Globe, Smartphone, Search, Code2, Palette, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';

const ICONS = { 'web-development': <Globe size={24} />, 'mobile-apps': <Smartphone size={24} />, 'seo-optimisation': <Search size={24} />, 'custom-development': <Code2 size={24} />, 'ui-ux-design': <Palette size={24} />, maintenance: <Shield size={24} /> };
const DETAILS = {
  'web-development': { points: ['A modern, good-looking website', 'Works on phones and computers', 'Easy for Google to find', 'You can update it yourself'], color: '#DB333D' },
  'mobile-apps': { points: ['One app for iPhone and Android', 'Put on App Store and Google Play', 'Notifications to your customers', 'Fast and easy to use'], color: '#DB333D' },
  'seo-optimisation': { points: ['Check what is stopping you ranking', 'Choose the words customers search', 'Fix your website for Google', 'Monthly progress report'], color: '#DB333D' },
  'custom-development': { points: ['Online payments', 'Booking and ordering systems', 'Connect your business tools', 'Save time with automation'], color: '#DB333D' },
  'ui-ux-design': { points: ['Clean, modern look', 'Easy to understand and use', 'Matches your brand', 'See it before we build it'], color: '#DB333D' },
  maintenance: { points: ['Regular updates and backups', 'Security protection', 'We watch that your site stays online', 'Quick help when you need it'], color: '#DB333D' },
};
const PLAIN = {
  'web-development': 'A professional website for your business',
  'mobile-apps': 'Your own app for iPhone and Android',
  'seo-optimisation': 'Get found by more customers on Google',
  'custom-development': 'Special tools built for your business',
  'ui-ux-design': 'Simple, beautiful design that people like',
  maintenance: 'We look after your website for you',
};

export default function ServicesPage() {
  useScrollReveal();
  const seo = pageSEO({
    title: 'Our Services | Web Development, Mobile Apps & SEO Kuwait',
    description: 'stackaura.cc offers professional web development, custom website development, mobile app development, SEO optimisation, UI/UX design, and maintenance services worldwide.',
    path: '/services',
    extraKeywords: ['web development services', 'mobile app services', 'seo services kuwait', 'custom development services', 'professional development'],
  });

  return (
    <>
      <SEOHead {...seo} />
      <div style={{ background: '#000129', minHeight: '100vh' }}>
        <Navbar />

        <section className="pt-32 pb-16 px-6 grid-bg" style={{ borderBottom: '1px solid #DDE1EA' }}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="section-label mb-5 reveal" style={{ background: 'rgba(219,51,61,0.08)', border: '1px solid rgba(219,51,61,0.15)', color: '#DB333D' }}>
              <span style={{ fontFamily: 'IBM Plex Sans,sans-serif' }}>What we offer</span>
            </div>
            <h1 className="font-bold mb-4 reveal delay-1" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.5rem,6vw,4rem)', color: '#F3F4FA', lineHeight: 1.1 }}>
              Everything You Need<br /><span className="grad">To Grow Online</span>
            </h1>
            <p className="text-lg reveal delay-2" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif', maxWidth: 520, margin: '0 auto' }}>
              Websites, mobile apps, Google ranking and more. Pick what you need and we will take care of it.
            </p>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => {
              const detail = DETAILS[s.slug];
              return (
                <Link href={`/services/${s.slug}`} key={s.slug}
                  className={`card p-7 block reveal delay-${(i % 3) + 1}`}>
                  <SiteImage id={s.slug} rounded={4} fallback style={{ marginBottom: 20 }} />
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${detail.color}15`, color: detail.color }}>
                    {ICONS[s.slug]}
                  </div>
                  <h2 className="font-bold text-lg mb-2" style={{ fontFamily: 'Syne,sans-serif', color: '#F3F4FA' }}>{s.label}</h2>
                  <p className="text-sm mb-5 leading-relaxed" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>{PLAIN[s.slug]}</p>
                  <ul className="space-y-2 mb-5">
                    {detail.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>
                        <CheckCircle2 size={18} style={{ color: detail.color, flexShrink: 0 }} /> {p}
                      </li>
                    ))}
                  </ul>
                  <span className="flex items-center gap-1.5 text-sm" style={{ color: detail.color, fontFamily: 'IBM Plex Sans,sans-serif' }}>
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 text-center" style={{ background: '#14172E' }}>
          <div className="max-w-2xl mx-auto reveal">
            <h2 className="font-bold mb-4" style={{ fontFamily: 'Syne,sans-serif', fontSize: '2rem', color: '#F3F4FA' }}>Not Sure What You Need?</h2>
            <p className="mb-8" style={{ color: '#C3C7DB', fontFamily: 'IBM Plex Sans,sans-serif' }}>Just tell us what you want to achieve. We will suggest the best way, and the first chat is free.</p>
            <Link href="/contact" className="btn-primary mx-auto inline-flex">Get a Free Consultation <ArrowRight size={15} /></Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() { return { props: {} }; }
