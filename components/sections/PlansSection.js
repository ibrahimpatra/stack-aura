import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { useT } from '../../lib/i18n';

// "Budget-friendly" section. No invented prices: add a `price` to a plan below if you ever want one shown.
const PRICES = ['', '', ''];

export default function PlansSection() {
  const { t } = useT();
  const plans = t('plans.items');
  return (
    <section id="plans" className="light py-24 px-6 relative z-10" style={{ background: 'var(--bg2)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 max-w-3xl reveal">
          <div className="section-label mb-4">{t('plans.label')}</div>
          <h2 className="font-extrabold mb-4" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.1rem,4.4vw,3.4rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            {t('plans.t1')} <span className="scribble" style={{ color: '#DB333D' }}>{t('plans.t2')}</span>
          </h2>
          <p style={{ color: 'var(--body)', fontSize: '1.25rem', lineHeight: 1.7 }}>{t('plans.text')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch">
          {plans.map((p, i) => {
            const hot = i === 1;
            return (
              <div key={p.name} className={`relative p-8 flex flex-col reveal delay-${i + 1}`}
                style={{ background: hot ? '#000129' : '#FFFFFF', border: `2px solid ${hot ? '#000129' : 'var(--line)'}`, borderRadius: 6, boxShadow: hot ? '10px 10px 0 #DB333D' : '0 2px 0 rgba(0,1,41,0.06)', transform: hot ? 'translateY(-10px)' : 'none' }}>
                {hot && <span className="absolute font-bold" style={{ top: -16, insetInlineStart: 24, background: '#DB333D', color: '#fff', padding: '4px 14px', borderRadius: 3, fontSize: '0.95rem' }}>{t('plans.popular')}</span>}
                <h3 className="font-extrabold mb-2" style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.7rem', color: hot ? '#FFFFFF' : '#000129' }}>{p.name}</h3>
                {PRICES[i] && <div className="mb-2 font-bold" style={{ color: '#DB333D', fontSize: '1.4rem' }}>{PRICES[i]}</div>}
                <p className="mb-6" style={{ color: hot ? '#C9CEE8' : '#3A405F', fontSize: '1.1rem' }}>{p.desc}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.list.map((l) => (
                    <li key={l} className="flex items-start gap-3" style={{ color: hot ? '#E4E6F2' : '#14172E', fontSize: '1.08rem' }}>
                      <Check size={20} className="flex-shrink-0 mt-1" style={{ color: '#DB333D' }} /> {l}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={hot ? 'btn-primary' : 'btn-ghost'} style={hot ? undefined : { borderColor: '#000129', color: '#000129' }}>{t('plans.cta')} <ArrowRight size={18} className="flip-rtl" /></Link>
              </div>
            );
          })}
        </div>
        <p className="mt-10 reveal" style={{ color: 'var(--mute)', fontSize: '1.05rem' }}>{t('plans.note')}</p>
      </div>
    </section>
  );
}
