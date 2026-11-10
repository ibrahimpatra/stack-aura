import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const STEPS = [
  { n: '01', title: 'You tell us your idea', desc: 'Send a message or chat with us on WhatsApp. Tell us what you need. It is free, and you get a clear price.' },
  { n: '02', title: 'We design and build it', desc: 'We create your website or app and show you the progress, so you always know what is happening.' },
  { n: '03', title: 'You launch and grow', desc: 'Your site goes live, ready to be found on Google. We stay with you for help and updates.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 relative z-10" style={{ background: '#000129' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 reveal">
          <div className="section-label mb-4">How it works</div>
          <h2 className="font-extrabold" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.1rem,4.4vw,3.4rem)', color: '#F3F4FA', letterSpacing: '-0.02em' }}>Three simple steps</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          <div className="hidden md:block absolute" style={{ left: '8%', right: '8%', top: 54, borderTop: '3px dashed #3A4073' }} />
          {STEPS.map((s, i) => (
            <div key={s.n} className={`relative reveal delay-${i + 1}`}>
              <div className="font-extrabold mb-5 inline-block px-3" style={{ fontFamily: 'Syne,sans-serif', fontSize: '5.2rem', lineHeight: 1, color: 'transparent', WebkitTextStroke: '3px #DB333D', background: '#000129' }}>{s.n}</div>
              <h3 className="font-bold mb-3" style={{ fontFamily: 'Syne,sans-serif', color: '#F3F4FA', fontSize: '1.55rem' }}>{s.title}</h3>
              <p style={{ color: '#C3C7DB', fontSize: '1.15rem', lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 reveal"><Link href="/contact" className="btn-primary">Start step 1 — it is free <ArrowRight size={20} /></Link></div>
      </div>
    </section>
  );
}
