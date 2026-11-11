import Link from 'next/link';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import SEOHead from '../components/ui/SEOHead';
import PageHero from '../components/ui/PageHero';
import SiteImage from '../components/ui/SiteImage';
import { useScrollReveal } from '../lib/useScrollReveal';
import { pageSEO, SITE } from '../lib/seo';
import { useT } from '../lib/i18n';
import { Code2, Zap, Search, Users, Award, MapPin, ArrowRight, MessageCircle } from 'lucide-react';

const ICONS = [Code2, Zap, Search, Users, Award, MapPin];

export default function About() {
  useScrollReveal();
  const { t, locale } = useT();
  const seo = pageSEO({ title: t('meta.about.title'), description: t('meta.about.description'), locale });
  return (
    <>
      <SEOHead {...seo} />
      <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <Navbar />
        <PageHero label={t('aboutPage.label')} t1={t('aboutPage.t1')} t2={t('aboutPage.t2')} sub={t('aboutPage.sub')} />

        {/* Story — light */}
        <section className="light py-20 px-6" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="font-extrabold mb-6 reveal" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(1.9rem,3.6vw,2.7rem)', color: 'var(--ink)' }}>{t('aboutPage.storyTitle')}</h2>
              {t('aboutPage.story').map((p, i) => <p key={i} className={`mb-5 reveal delay-${i + 1}`} style={{ color: 'var(--body)', fontSize: '1.22rem', lineHeight: 1.85 }}>{p}</p>)}
            </div>
            <div className="reveal-right">
              <div style={{ transform: 'rotate(1.4deg)', border: '3px solid #000129', boxShadow: '10px 10px 0 #DB333D', borderRadius: 4, overflow: 'hidden', marginBottom: 28 }}>
                <SiteImage id="about-workspace" rounded={0} fallback />
              </div>
              <div className="grid grid-cols-2 gap-px" style={{ background: 'var(--line)', border: '1px solid var(--line)' }}>
                {t('aboutPage.stats').map((s) => (
                  <div key={s.l} className="p-5 text-center" style={{ background: 'var(--card)' }}>
                    <div className="font-extrabold" style={{ fontFamily: 'Syne,sans-serif', color: '#DB333D', fontSize: '1.9rem' }}>{s.v}</div>
                    <div style={{ color: 'var(--body)', fontSize: '1rem' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-4 pt-0" style={{ background: 'var(--bg)' }}><div className="max-w-7xl mx-auto"><SiteImage id="kuwait" rounded={6} /></div></section>

        {/* Values — dark */}
        <section className="py-20 px-6" style={{ background: 'var(--bg2)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 reveal">
              <h2 className="font-extrabold mb-3" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(1.9rem,3.8vw,2.9rem)', color: 'var(--ink)' }}>{t('aboutPage.valuesTitle')}</h2>
              <p style={{ color: 'var(--body)', fontSize: '1.2rem' }}>{t('aboutPage.valuesSub')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t('aboutPage.values').map((v, i) => { const Icon = ICONS[i]; return (
                <div key={v.title} className={`card p-7 reveal delay-${(i % 3) + 1}`}>
                  <div className="flex items-center justify-center mb-5" style={{ width: 52, height: 52, background: 'rgba(219,51,61,0.14)', color: '#FF5A63', borderRadius: 4 }}><Icon size={26} /></div>
                  <h3 className="font-bold mb-2" style={{ fontFamily: 'Syne,sans-serif', color: 'var(--ink)', fontSize: '1.3rem' }}>{v.title}</h3>
                  <p style={{ color: 'var(--body)', fontSize: '1.08rem' }}>{v.desc}</p>
                </div>
              ); })}
            </div>
          </div>
        </section>

        {/* CTA — red */}
        <section className="py-16 px-6 relative overflow-hidden" style={{ background: '#DB333D' }}>
          <div className="relative max-w-4xl mx-auto text-center reveal">
            <h2 className="font-extrabold mb-3" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff' }}>{t('aboutPage.ctaT')}</h2>
            <p className="mb-7" style={{ color: '#fff', fontSize: '1.25rem' }}>{t('aboutPage.ctaD')}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-navy" style={{ background: '#00001A', color: '#fff', borderColor: '#00001A' }}>{t('common.quote')} <ArrowRight size={20} className="flip-rtl" /></Link>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ color: '#fff', borderColor: '#fff' }}><MessageCircle size={20} /> {t('common.whatsappUs')}</a>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() { return { props: {} }; }
