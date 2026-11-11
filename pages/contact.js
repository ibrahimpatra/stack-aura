import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import SEOHead from '../components/ui/SEOHead';
import PageHero from '../components/ui/PageHero';
import SiteImage from '../components/ui/SiteImage';
import ContactSection from '../components/sections/ContactSection';
import { useScrollReveal } from '../lib/useScrollReveal';
import { pageSEO, SITE } from '../lib/seo';
import { useT } from '../lib/i18n';
import { Clock, MessageCircle, Phone } from 'lucide-react';

const ICONS = [Clock, MessageCircle, Phone];

export default function Contact() {
  useScrollReveal();
  const { t, locale } = useT();
  const seo = pageSEO({ title: t('meta.contact.title'), description: t('meta.contact.description'), locale });
  const ld = { '@context': 'https://schema.org', '@type': 'ContactPage', name: t('meta.contact.title'), url: `${SITE.url}${locale === 'ar' ? '/ar' : ''}/contact`, mainEntity: { '@id': `${SITE.url}/#organization` } };
  return (
    <>
      <SEOHead {...seo} structuredData={ld} />
      <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <Navbar />
        <PageHero label={t('contact.label')} t1={t('contact.pageT1')} t2={t('contact.pageT2')} sub={t('contact.pageSub')} />

        <section className="light py-14 px-6" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">
            <SiteImage id="contact" rounded={6} style={{ marginBottom: 28 }} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {t('contact.cards').map((c, i) => { const Icon = ICONS[i]; return (
                <div key={c.t} className={`card p-6 flex items-start gap-4 reveal delay-${i + 1}`}>
                  <span className="flex items-center justify-center flex-shrink-0" style={{ width: 50, height: 50, background: 'rgba(219,51,61,0.12)', color: '#DB333D', borderRadius: 4 }}><Icon size={24} /></span>
                  <div><h3 className="font-bold mb-1" style={{ fontFamily: 'Syne,sans-serif', color: 'var(--ink)', fontSize: '1.2rem' }}>{c.t}</h3><p style={{ color: 'var(--body)', fontSize: '1.05rem' }}>{c.d}</p></div>
                </div>
              ); })}
            </div>
          </div>
        </section>

        <ContactSection full />
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() { return { props: {} }; }
