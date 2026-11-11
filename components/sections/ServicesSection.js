import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SiteImage from '../ui/SiteImage';
import ServiceIcon from '../ui/ServiceIcon';
import { SERVICES } from '../../lib/seo';
import { useT } from '../../lib/i18n';

export default function ServicesSection() {
  const { t } = useT();
  return (
    <section id="services" className="py-24 px-6 relative z-10" style={{ background: 'var(--bg2)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 reveal">
          <div className="section-label mb-4">{t('services.label')}</div>
          <h2 className="font-extrabold mb-3" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.1rem,4.4vw,3.4rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>{t('services.title')}</h2>
          <p style={{ color: 'var(--body)', fontSize: '1.25rem' }}>{t('services.sub')}</p>
        </div>

        <div style={{ borderTop: '2px solid #3A4073' }}>
          {SERVICES.map((s, i) => (
            <Link href={`/services/${s.slug}`} key={s.slug} className="group grid items-center gap-5 py-6 px-3 reveal transition-colors hover:bg-[#000129]"
              style={{ gridTemplateColumns: 'auto 1fr auto', borderBottom: '1px solid var(--line)' }}>
              <span className="flex items-center gap-4">
                <span className="mono-num" style={{ color: 'var(--red-hi)', fontSize: '1.2rem', minWidth: 30 }}>0{i + 1}</span>
                <span className="hidden sm:flex items-center justify-center" style={{ width: 52, height: 52, background: 'rgba(219,51,61,0.12)', color: '#FF5A63', borderRadius: 4 }}><ServiceIcon name={s.icon} size={26} /></span>
              </span>
              <div>
                <h3 className="font-bold mb-1" style={{ fontFamily: 'Syne,sans-serif', color: 'var(--ink)', fontSize: 'clamp(1.3rem,2.3vw,1.8rem)' }}>{t(`services.items.${s.slug}.label`)}</h3>
                <p style={{ color: 'var(--body)', fontSize: '1.08rem', maxWidth: 640 }}>{t(`services.items.${s.slug}.desc`)}</p>
              </div>
              <div className="flex items-center gap-5">
                <div className="hidden lg:block" style={{ width: 150 }}><SiteImage id={s.slug} rounded={4} /></div>
                <span className="flex items-center justify-center transition-transform group-hover:-translate-y-1" style={{ width: 50, height: 50, border: '2px solid #DB333D', color: '#FF5A63', borderRadius: 4 }}><ArrowUpRight size={24} className="flip-rtl" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
