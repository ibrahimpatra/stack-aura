import Link from 'next/link';
import { MessageSquare, PenTool, Rocket, ArrowRight } from 'lucide-react';

const STEPS = [
  { icon: <MessageSquare size={30} />, title: 'You tell us your idea', desc: 'Send us a message or chat on WhatsApp. Tell us what you need. It’s free, and you get a clear price.' },
  { icon: <PenTool size={30} />, title: 'We design and build it', desc: 'We create your website or app and show you the progress, so you always know what’s happening.' },
  { icon: <Rocket size={30} />, title: 'You launch and grow', desc: 'Your site goes live, ready to be found on Google. We stay with you for help and updates.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 reveal">
          <div className="section-label mb-4" style={{ background: 'rgba(219,51,61,0.08)', border: '1px solid rgba(219,51,61,0.2)', color: '#B91C26' }}>How it works</div>
          <h2 className="font-bold mb-3" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2rem,4vw,3rem)', color: '#000129' }}>Working With Us Is Simple</h2>
          <p style={{ color: '#4B5563', fontSize: '1.25rem', maxWidth: 560, margin: '0 auto' }}>Just 3 easy steps from your idea to a live website.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <div key={s.title} className={`card p-8 text-center reveal delay-${i + 1}`}>
              <div className="mx-auto mb-5 w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(219,51,61,0.1)', color: '#DB333D' }}>{s.icon}</div>
              <div className="font-bold mb-2" style={{ fontFamily: 'Syne,sans-serif', color: '#DB333D', fontSize: '1.1rem' }}>Step {i + 1}</div>
              <h3 className="font-bold mb-3" style={{ fontFamily: 'Syne,sans-serif', color: '#000129', fontSize: '1.4rem' }}>{s.title}</h3>
              <p style={{ color: '#4B5563', fontSize: '1.1rem', lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <Link href="/contact" className="btn-primary">Start Step 1 – It’s Free <ArrowRight size={20} /></Link>
        </div>
      </div>
    </section>
  );
}
