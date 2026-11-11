import Link from 'next/link';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import SEOHead from '../../components/ui/SEOHead';
import SiteImage from '../../components/ui/SiteImage';
import TechPill from '../../components/ui/TechPill';
import ServiceIcon from '../../components/ui/ServiceIcon';
import { useScrollReveal } from '../../lib/useScrollReveal';
import { pageSEO, SERVICES, SITE } from '../../lib/seo';
import { useT } from '../../lib/i18n';
import { CheckCircle2, ArrowRight, ChevronRight, MessageCircle } from 'lucide-react';

export default function ServicePage({ slug, technologies = [] }) {
  useScrollReveal();
  const { t, locale } = useT();
  const svc = SERVICES.find((s) => s.slug === slug);
  const g = (k) => t(`services.items.${slug}.${k}`);
  const base = `${SITE.url}${locale === 'ar' ? '/ar' : ''}`;

  const seo = pageSEO({ title: g('headline'), description: g('sub') + ' ' + g('desc'), locale, extraKeywords: g('keywords') });
  const faq = g('faq');
  const ld = [
    { '@context': 'https://schema.org', '@type': 'Service', name: g('headline'), description: g('long'), serviceType: g('label'), provider: { '@id': `${SITE.url}/#organization` }, areaServed: { '@type': 'Country', name: 'Kuwait' }, url: `${base}/services/${slug}` },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: t('nav.home'), item: base || SITE.url }, { '@type': 'ListItem', position: 2, name: t('nav.services'), item: `${base}/services` }, { '@type': 'ListItem', position: 3, name: g('label'), item: `${base}/services/${slug}` }] },
  ];

  return (
    <>
      <SEOHead {...seo} structuredData={ld} />
      <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <Navbar />

        <section className="pt-36 pb-16 px-6 grid-bg relative overflow-hidden" style={{ background: 'var(--bg)', borderBottom: '5px solid #DB333D' }}>
          <div className="absolute pointer-events-none" style={{ width: 520, height: 520, borderRadius: '50%', background: '#DB333D', opacity: 0.13, insetInlineEnd: '-8%', top: '-45%' }} />
          <div className="relative max-w-6xl mx-auto">
            <Link href="/services" className="inline-flex items-center gap-1 mb-6 reveal" style={{ color: 'var(--mute)', fontSize: '1.02rem' }}><ChevronRight size={16} className="flip-rtl" style={{ transform: 'rotate(180deg)' }} /> {t('services.allServices')}</Link>
            <div className="flex items-center gap-3 mb-5 reveal">
              <span className="flex items-center justify-center" style={{ width: 52, height: 52, background: '#DB333D', color: '#fff', borderRadius: 4 }}><ServiceIcon name={svc.icon} size={26} /></span>
              <span className="section-label">{g('label')}</span>
            </div>
            <h1 className="font-extrabold mb-5 reveal delay-1" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.2rem,5.2vw,3.9rem)', color: 'var(--ink)', lineHeight: 1.12, letterSpacing: '-0.02em', maxWidth: 900 }}>{g('headline')}</h1>
            <p className="mb-8 reveal delay-2" style={{ color: 'var(--body)', fontSize: '1.3rem', lineHeight: 1.65, maxWidth: 720 }}>{g('sub')}</p>
            <div className="flex flex-wrap gap-4 reveal delay-3">
              <Link href="/contact" className="btn-primary">{t('common.quote')} <ArrowRight size={20} className="flip-rtl" /></Link>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-ghost"><MessageCircle size={20} /> {t('common.whatsappUs')}</a>
            </div>
          </div>
        </section>

        <section className="light py-16 px-6" style={{ background: 'var(--bg)' }}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <SiteImage id={slug} rounded={6} fallback style={{ marginBottom: 28 }} />
              <p className="mb-10 reveal" style={{ color: 'var(--body)', fontSize: '1.25rem', lineHeight: 1.85 }}>{g('long')}</p>

              {technologies.length > 0 && (
                <div className="mb-12 reveal">
                  <h2 className="font-extrabold mb-4" style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.6rem', color: 'var(--ink)' }}>{t('services.techTitle')}</h2>
                  <div className="flex flex-wrap gap-3">{technologies.map((tc) => <TechPill key={tc} name={tc} big />)}</div>
                </div>
              )}

              <h2 className="font-extrabold mb-5 reveal" style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.6rem', color: 'var(--ink)' }}>{t('services.whatYouGet')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
                {g('features').map((f, i) => (
                  <div key={f} className={`flex items-start gap-3 p-4 reveal delay-${(i % 2) + 1}`} style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 6 }}>
                    <CheckCircle2 size={22} className="flex-shrink-0 mt-0.5" style={{ color: '#DB333D' }} />
                    <span style={{ color: 'var(--ink2)', fontSize: '1.08rem' }}>{f}</span>
                  </div>
                ))}
              </div>

              <h2 className="font-extrabold mb-5 reveal" style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.6rem', color: 'var(--ink)' }}>{t('services.howItWorks')}</h2>
              <ol className="space-y-3 mb-12">
                {g('process').map((p, i) => (
                  <li key={p} className="flex items-center gap-4 p-4 reveal" style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 6 }}>
                    <span className="flex items-center justify-center flex-shrink-0 mono-num font-bold" style={{ width: 42, height: 42, background: '#DB333D', color: '#fff', borderRadius: 4 }}>{i + 1}</span>
                    <span style={{ color: 'var(--ink2)', fontSize: '1.1rem' }}>{p}</span>
                  </li>
                ))}
              </ol>

              <h2 className="font-extrabold mb-5 reveal" style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.6rem', color: 'var(--ink)' }}>{t('services.faq')}</h2>
              <div className="space-y-3">
                {faq.map((f) => (
                  <div key={f.q} className="p-5 reveal" style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 6 }}>
                    <h3 className="font-bold mb-2" style={{ fontFamily: 'Syne,sans-serif', color: 'var(--ink)', fontSize: '1.15rem' }}>{f.q}</h3>
                    <p style={{ color: 'var(--body)', fontSize: '1.08rem' }}>{f.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="space-y-6">
              <div className="p-7 reveal-right" style={{ background: '#000129', borderRadius: 6, boxShadow: '8px 8px 0 #DB333D', position: 'sticky', top: 100 }}>
                <h3 className="font-extrabold mb-2" style={{ fontFamily: 'Syne,sans-serif', color: '#fff', fontSize: '1.4rem' }}>{t('services.readyTitle')}</h3>
                <p className="mb-5" style={{ color: '#C3C7DB', fontSize: '1.05rem' }}>{t('services.readyText')}</p>
                <Link href="/contact" className="btn-primary w-full mb-3">{t('common.quote')}</Link>
                <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full" style={{ color: '#fff', borderColor: '#5B6290' }}><MessageCircle size={18} /> {t('common.whatsappUs')}</a>
                <div className="mt-7 pt-6" style={{ borderTop: '1px solid #2A2F57' }}>
                  <div className="font-bold mb-3" style={{ color: '#fff' }}>{t('services.otherServices')}</div>
                  {SERVICES.filter((s) => s.slug !== slug).map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="flex items-center gap-3 py-2.5" style={{ color: '#C3C7DB', fontSize: '1.02rem' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')} onMouseLeave={(e) => (e.currentTarget.style.color = '#C3C7DB')}>
                      <span style={{ color: '#FF5A63' }}><ServiceIcon name={s.icon} size={18} /></span> {t(`services.items.${s.slug}.label`)}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  if (!SERVICES.some((s) => s.slug === params.slug)) return { notFound: true };
  let technologies = [];
  try { const { getServiceTech } = await import('../../lib/taxonomy'); technologies = await getServiceTech(params.slug); } catch {}
  return { props: { slug: params.slug, technologies } };
}
