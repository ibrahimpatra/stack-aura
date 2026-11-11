import Link from 'next/link';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import SEOHead from '../../components/ui/SEOHead';
import PageHero from '../../components/ui/PageHero';
import SiteImage from '../../components/ui/SiteImage';
import ServiceIcon from '../../components/ui/ServiceIcon';
import { useScrollReveal } from '../../lib/useScrollReveal';
import { pageSEO, SERVICES, SITE } from '../../lib/seo';
import { useT } from '../../lib/i18n';
import { CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';

export default function ServicesPage() {
  useScrollReveal();
  const { t, locale } = useT();
  const seo = pageSEO({ title: t('meta.services.title'), description: t('meta.services.description'), locale, extraKeywords: SERVICES.flatMap((s) => t(`services.items.${s.slug}.keywords`)) });
  const ld = { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: SERVICES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE.url}${locale === 'ar' ? '/ar' : ''}/services/${s.slug}`, name: t(`services.items.${s.slug}.label`) })) };

  return (
    <>
      <SEOHead {...seo} structuredData={ld} />
      <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <Navbar />
        <PageHero label={t('services.label')} t1={t('services.indexTitle1')} t2={t('services.indexTitle2')} sub={t('services.indexSub')} />

        <section className="light py-20 px-6" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {SERVICES.map((s, i) => {
              const it = (k) => t(`services.items.${s.slug}.${k}`);
              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className={`card block p-6 reveal delay-${(i % 3) + 1}`}>
                  <SiteImage id={s.slug} rounded={4} fallback style={{ marginBottom: 20 }} />
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center justify-center" style={{ width: 46, height: 46, background: 'rgba(219,51,61,0.12)', color: '#DB333D', borderRadius: 4 }}><ServiceIcon name={s.icon} size={24} /></span>
                    <h2 className="font-bold" style={{ fontFamily: 'Syne,sans-serif', color: 'var(--ink)', fontSize: '1.35rem' }}>{it('label')}</h2>
                  </div>
                  <p className="mb-4" style={{ color: 'var(--body)', fontSize: '1.08rem' }}>{it('desc')}</p>
                  <ul className="space-y-2 mb-5">
                    {it('features').slice(0, 3).map((f) => <li key={f} className="flex items-start gap-2" style={{ color: 'var(--ink2)', fontSize: '1rem' }}><CheckCircle2 size={18} className="flex-shrink-0 mt-1" style={{ color: '#DB333D' }} /> {f}</li>)}
                  </ul>
                  <span className="flex items-center gap-2 font-bold" style={{ color: 'var(--red-hi)', fontSize: '1.05rem' }}>{t('common.learnMore')} <ArrowRight size={18} className="flip-rtl" /></span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="py-20 px-6" style={{ background: 'var(--bg2)' }}>
          <div className="max-w-3xl mx-auto text-center reveal">
            <h2 className="font-extrabold mb-4" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(1.9rem,4vw,2.8rem)', color: 'var(--ink)' }}>{t('services.helpTitle')}</h2>
            <p className="mb-8" style={{ color: 'var(--body)', fontSize: '1.25rem' }}>{t('services.helpText')}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-primary">{t('services.getFree')} <ArrowRight size={20} className="flip-rtl" /></Link>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-ghost"><MessageCircle size={20} /> {t('common.whatsappUs')}</a>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() { return { props: {} }; }
