import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useT } from '../../lib/i18n';

export default function HowItWorks() {
  const { t } = useT();
  return (
    <section id="how-it-works" className="py-24 px-6 relative z-10" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 reveal">
          <div className="section-label mb-4">{t('how.label')}</div>
          <h2 className="font-extrabold" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.1rem,4.4vw,3.4rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>{t('how.title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          <div className="hidden md:block absolute" style={{ insetInline: '8%', top: 54, borderTop: '3px dashed #3A4073' }} />
          {t('how.steps').map((s, i) => (
            <div key={i} className={`relative reveal delay-${i + 1}`}>
              <div className="font-extrabold mb-5 inline-block px-3 mono-num" style={{ fontSize: '5.2rem', lineHeight: 1, color: 'transparent', WebkitTextStroke: '3px #DB333D', background: 'var(--bg)' }}>0{i + 1}</div>
              <h3 className="font-bold mb-3" style={{ fontFamily: 'Syne,sans-serif', color: 'var(--ink)', fontSize: '1.55rem' }}>{s.title}</h3>
              <p style={{ color: 'var(--body)', fontSize: '1.15rem', lineHeight: 1.75 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 reveal"><Link href="/contact" className="btn-primary">{t('how.cta')} <ArrowRight size={20} className="flip-rtl" /></Link></div>
      </div>
    </section>
  );
}
