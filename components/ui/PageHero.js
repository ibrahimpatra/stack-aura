// Dark page header used by every inner page.
export default function PageHero({ label, t1, t2, sub, children, align = 'center' }) {
  return (
    <section className="pt-36 pb-16 px-6 grid-bg relative overflow-hidden" style={{ background: 'var(--bg)', borderBottom: '5px solid #DB333D' }}>
      <div className="absolute pointer-events-none" style={{ width: 520, height: 520, borderRadius: '50%', background: '#DB333D', opacity: 0.13, insetInlineEnd: '-8%', top: '-45%' }} />
      <div className={`relative max-w-4xl mx-auto ${align === 'center' ? 'text-center' : ''}`}>
        {label && <div className="section-label mb-5 reveal">{label}</div>}
        <h1 className="font-extrabold mb-5 reveal delay-1" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.3rem,5.6vw,4.2rem)', color: 'var(--ink)', lineHeight: 1.12, letterSpacing: '-0.02em' }}>
          {t1}{t2 && <><br /><span className="scribble" style={{ color: '#DB333D' }}>{t2}</span></>}
        </h1>
        {sub && <p className="reveal delay-2" style={{ color: 'var(--body)', fontSize: '1.3rem', lineHeight: 1.65, maxWidth: 680, margin: align === 'center' ? '0 auto' : 0 }}>{sub}</p>}
        {children}
      </div>
    </section>
  );
}
