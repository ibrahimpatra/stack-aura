import Link from 'next/link';
import { CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import SiteImage from '../ui/SiteImage';
import { SITE } from '../../lib/seo';
import { useT } from '../../lib/i18n';

// LIGHT section — gives the page breathing room between the dark ones.
export default function AboutSection() {
  const { t } = useT();
  const stamp = t('about.stamp');
  return (
    <section id="about" className="light py-24 px-6 relative z-10" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="reveal-left">
          <div className="section-label mb-5">{t('about.label')}</div>
          <h2 className="font-extrabold mb-6" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.1rem,4.4vw,3.4rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            {t('about.t1')} <span className="scribble" style={{ color: '#DB333D' }}>{t('about.t2')}</span>
          </h2>
          <p className="mb-8" style={{ color: 'var(--body)', fontSize: '1.25rem', lineHeight: 1.75 }}>{t('about.text')}</p>
          <ul className="space-y-4 mb-10">
            {t('about.why').map((w) => (
              <li key={w} className="flex items-start gap-3" style={{ color: 'var(--ink2)', fontSize: '1.15rem' }}>
                <CheckCircle2 size={24} className="flex-shrink-0 mt-0.5" style={{ color: '#DB333D' }} /> {w}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-4">
            <Link href="/about" className="btn-primary">{t('common.moreAbout')} <ArrowRight size={20} className="flip-rtl" /></Link>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-ghost"><MessageCircle size={20} /> {t('common.whatsappUs')}</a>
          </div>
        </div>

        <div className="reveal-right relative">
          <div style={{ transform: 'rotate(1.6deg)', border: '3px solid #000129', background: '#14172E', boxShadow: '12px 12px 0 #DB333D', borderRadius: 4, overflow: 'hidden' }}>
            <SiteImage id="about-workspace" rounded={0} fallback />
          </div>
          <div className="absolute flex items-center justify-center text-center"
            style={{ insetInlineEnd: -10, bottom: -26, width: 120, height: 120, borderRadius: '50%', background: '#DB333D', color: '#fff', transform: 'rotate(-12deg)', border: '3px dashed #fff', fontFamily: 'Syne,sans-serif', fontWeight: 800, lineHeight: 1.15, fontSize: '1.05rem' }}>
            <span>{stamp[0]}<br />{stamp[1]}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-px reveal" style={{ background: 'var(--line)', border: '1px solid var(--line)' }}>
        {t('about.stats').map((s) => (
          <div key={s.l} className="p-7 text-center" style={{ background: 'var(--card)' }}>
            <div className="font-extrabold" style={{ fontFamily: 'Syne,sans-serif', color: '#DB333D', fontSize: '2.4rem', lineHeight: 1.15 }}>{s.v}</div>
            <div className="mt-2" style={{ color: 'var(--body)', fontSize: '1.05rem' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
