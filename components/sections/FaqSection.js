import Head from 'next/head';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { useT } from '../../lib/i18n';

// Accordion + FAQ structured data (can earn rich answers in Google).
export default function FaqSection() {
  const { t } = useT();
  const items = t('faq.items');
  const [open, setOpen] = useState(0);
  const ld = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  return (
    <section id="faq" className="light py-24 px-6 relative z-10" style={{ background: 'var(--bg)' }}>
      <Head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} /></Head>
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 reveal">
          <div className="section-label mb-4">{t('faq.label')}</div>
          <h2 className="font-extrabold" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.1rem,4.4vw,3.2rem)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>{t('faq.title')}</h2>
        </div>
        <div style={{ borderTop: '2px solid #000129' }}>
          {items.map((f, i) => (
            <div key={f.q} style={{ borderBottom: '1px solid var(--line)' }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="w-full flex items-center justify-between gap-4 py-6 text-start">
                <span className="font-bold" style={{ fontFamily: 'Syne,sans-serif', color: 'var(--ink)', fontSize: 'clamp(1.15rem,2vw,1.4rem)' }}>{f.q}</span>
                <span className="flex-shrink-0 flex items-center justify-center" style={{ width: 38, height: 38, background: open === i ? '#DB333D' : 'transparent', border: '2px solid #DB333D', color: open === i ? '#fff' : '#DB333D', borderRadius: 4 }}>{open === i ? <Minus size={20} /> : <Plus size={20} />}</span>
              </button>
              {open === i && <p className="pb-6" style={{ color: 'var(--body)', fontSize: '1.15rem', lineHeight: 1.8, maxWidth: 760 }}>{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
