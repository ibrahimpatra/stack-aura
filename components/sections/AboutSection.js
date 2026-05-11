import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const STACK = ['Next.js', 'React', 'React Native', 'Firebase', 'Node.js', 'Tailwind CSS', 'TypeScript', 'PostgreSQL', 'Stripe', 'Vercel', 'Figma', 'Google Cloud'];
const WHY = [
  'SSR-first builds — every site is SEO-ready from launch',
  'Clean, maintainable code — no bloat, no shortcuts',
  'Kuwait-based, serving clients globally',
  'Fast delivery — most sites live in 2–4 weeks',
  'Full transparency — you own all your code and accounts',
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6" style={{ background: '#F0EFF2' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="section-label mb-4 reveal" style={{ background: 'rgba(0,1,41,0.06)', border: '1px solid rgba(0,1,41,0.12)', color: '#000129' }}>
            <span style={{ fontFamily: 'JetBrains Mono,monospace' }}>// about us</span>
          </div>
          <h2 className="font-bold mb-5 reveal delay-1" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#000129' }}>
            A Studio That Ships Real Results.
          </h2>
          <p className="text-base mb-4 leading-relaxed reveal delay-2" style={{ color: '#6B7280', fontFamily: 'DM Sans,sans-serif' }}>
            Stackaura Digital is a professional web development agency based in Kuwait. We build custom websites, mobile apps, and SEO strategies that actually work — not just look good.
          </p>
          <p className="text-base mb-8 leading-relaxed reveal delay-3" style={{ color: '#6B7280', fontFamily: 'DM Sans,sans-serif' }}>
            Every project is SSR-ready for Google from day one, with structured data, sitemaps, and technical SEO built in — not bolted on after.
          </p>
          <div className="space-y-3 mb-8 reveal delay-4">
            {WHY.map((w) => (
              <div key={w} className="flex items-start gap-3">
                <CheckCircle2 size={16} style={{ color: '#DB333D', flexShrink: 0, marginTop: 2 }} />
                <span className="text-sm" style={{ color: '#4B5563', fontFamily: 'DM Sans,sans-serif' }}>{w}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 reveal delay-5">
            <Link href="/about" className="btn-primary">About Us <ArrowRight size={15} /></Link>
            <Link href="/contact" className="btn-ghost">Get in Touch</Link>
          </div>
        </div>

        <div className="reveal-right">
          <div className="card p-8">
            <div className="text-xs mb-5" style={{ color: '#DB333D', fontFamily: 'JetBrains Mono,monospace' }}>// tech_stack</div>
            <div className="flex flex-wrap gap-2 mb-8">
              {STACK.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-lg text-sm cursor-default transition-all"
                  style={{ background: '#F0EFF2', color: '#6B7280', fontFamily: 'DM Sans,sans-serif', border: '1px solid #DDE1EA' }}
                  onMouseEnter={(e) => { e.target.style.borderColor = '#DB333D'; e.target.style.color = '#000129'; e.target.style.background = '#FFFFFF'; }}
                  onMouseLeave={(e) => { e.target.style.borderColor = '#DDE1EA'; e.target.style.color = '#6B7280'; e.target.style.background = '#F0EFF2'; }}>
                  {t}
                </span>
              ))}
            </div>
            <div className="text-xs mb-4" style={{ color: '#DB333D', fontFamily: 'JetBrains Mono,monospace' }}>// process</div>
            {['Discovery & Planning', 'Design & Prototyping', 'Development & Testing', 'Launch & SEO Setup', 'Ongoing Support'].map((step, i) => (
              <div key={step} className="flex items-center gap-3 mb-3">
                <div className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(219,51,61,0.1)', color: '#DB333D', fontFamily: 'JetBrains Mono,monospace' }}>{i + 1}</div>
                <div className="flex-1 h-px" style={{ background: '#DDE1EA' }} />
                <span className="text-xs" style={{ color: '#6B7280', fontFamily: 'DM Sans,sans-serif' }}>{step}</span>
                <CheckCircle2 size={12} style={{ color: '#DB333D' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
