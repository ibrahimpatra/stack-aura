import Link from 'next/link';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import SEOHead from '../../components/ui/SEOHead';
import { useScrollReveal } from '../../lib/useScrollReveal';
import { pageSEO, SERVICES } from '../../lib/seo';
import { Globe, Smartphone, Search, Code2, Palette, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';

const ICONS = { 'web-development': <Globe size={24} />, 'mobile-apps': <Smartphone size={24} />, 'seo-optimisation': <Search size={24} />, 'custom-development': <Code2 size={24} />, 'ui-ux-design': <Palette size={24} />, maintenance: <Shield size={24} /> };
const DETAILS = {
  'web-development': { points: ['Next.js & React', 'Firebase backend', 'SSR for SEO', 'Responsive design'], color: '#DB333D' },
  'mobile-apps': { points: ['iOS & Android', 'React Native', 'Expo framework', 'App Store ready'], color: '#06B6D4' },
  'seo-optimisation': { points: ['Technical SEO', 'Structured data', 'Sitemap & robots', 'Google Analytics'], color: '#8B5CF6' },
  'custom-development': { points: ['API integrations', 'Payment gateways', 'Custom backends', 'Automation'], color: '#10B981' },
  'ui-ux-design': { points: ['Figma design', 'Prototyping', 'Design systems', 'User testing'], color: '#F59E0B' },
  maintenance: { points: ['Monthly updates', 'Security patches', 'Uptime monitoring', 'Feature additions'], color: '#EF4444' },
};

export default function ServicesPage() {
  useScrollReveal();
  const seo = pageSEO({
    title: 'Our Services | Web Development, Mobile Apps & SEO Kuwait',
    description: 'Stackaura Digital offers professional web development, custom website development, mobile app development, SEO optimisation, UI/UX design, and maintenance services worldwide.',
    path: '/services',
    extraKeywords: ['web development services', 'mobile app services', 'seo services kuwait', 'custom development services', 'professional development'],
  });

  return (
    <>
      <SEOHead {...seo} />
      <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
        <Navbar />

        <section className="pt-32 pb-16 px-6 grid-bg" style={{ borderBottom: '1px solid #1A2236' }}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="section-label mb-5 reveal" style={{ background: 'rgba(219,51,61,0.08)', border: '1px solid rgba(219,51,61,0.15)', color: '#DB333D' }}>
              <span style={{ fontFamily: 'JetBrains Mono,monospace' }}>// what we offer</span>
            </div>
            <h1 className="font-bold mb-4 reveal delay-1" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.5rem,6vw,4rem)', color: '#000129', lineHeight: 1.1 }}>
              Professional Development<br /><span className="grad">Services Worldwide</span>
            </h1>
            <p className="text-lg reveal delay-2" style={{ color: '#6B7280', fontFamily: 'DM Sans,sans-serif', maxWidth: 520, margin: '0 auto' }}>
              From custom website development to mobile apps and SEO — everything your business needs to grow online.
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
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${detail.color}15`, color: detail.color }}>
                    {ICONS[s.slug]}
                  </div>
                  <h2 className="font-bold text-lg mb-2" style={{ fontFamily: 'Syne,sans-serif', color: '#000129' }}>{s.label}</h2>
                  <p className="text-sm mb-5 leading-relaxed" style={{ color: '#6B7280', fontFamily: 'DM Sans,sans-serif' }}>{s.short}</p>
                  <ul className="space-y-2 mb-5">
                    {detail.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm" style={{ color: '#4B5563', fontFamily: 'DM Sans,sans-serif' }}>
                        <CheckCircle2 size={13} style={{ color: detail.color, flexShrink: 0 }} /> {p}
                      </li>
                    ))}
                  </ul>
                  <span className="flex items-center gap-1.5 text-sm" style={{ color: detail.color, fontFamily: 'DM Sans,sans-serif' }}>
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 text-center" style={{ background: '#F0EFF2' }}>
          <div className="max-w-2xl mx-auto reveal">
            <h2 className="font-bold mb-4" style={{ fontFamily: 'Syne,sans-serif', fontSize: '2rem', color: '#000129' }}>Not Sure Which Service You Need?</h2>
            <p className="mb-8" style={{ color: '#6B7280', fontFamily: 'DM Sans,sans-serif' }}>Tell us your goal and we'll figure out the best approach together — free consultation.</p>
            <Link href="/contact" className="btn-primary mx-auto inline-flex">Get a Free Consultation <ArrowRight size={15} /></Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() { return { props: {} }; }
