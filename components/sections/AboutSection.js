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
    <section id="about" className="py-24 px-6" style={{ background: '#080C14' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="section-label mb-4 reveal" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.15)', color: '#C4B5FD' }}>
            <span style={{ fontFamily: 'JetBrains Mono,monospace' }}>// about us</span>
          </div>
          <h2 className="font-bold mb-5 reveal delay-1" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#E2E8F0' }}>
            A Studio That Ships Real Results.
          </h2>
          <p className="text-base mb-4 leading-relaxed reveal delay-2" style={{ color: '#64748B', fontFamily: 'DM Sans,sans-serif' }}>
            Stackaura Digital is a professional web development agency based in Kuwait. We build custom websites, mobile apps, and SEO strategies that actually work — not just look good.
          </p>
          <p className="text-base mb-8 leading-relaxed reveal delay-3" style={{ color: '#64748B', fontFamily: 'DM Sans,sans-serif' }}>
            Every project is SSR-ready for Google from day one, with structured data, sitemaps, and technical SEO built in — not bolted on after.
          </p>
          <div className="space-y-3 mb-8 reveal delay-4">
            {WHY.map((w) => (
              <div key={w} className="flex items-start gap-3">
                <CheckCircle2 size={16} style={{ color: '#10B981', flexShrink: 0, marginTop: 2 }} />
                <span className="text-sm" style={{ color: '#94A3B8', fontFamily: 'DM Sans,sans-serif' }}>{w}</span>
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
            <div className="text-xs mb-5" style={{ color: '#3B82F6', fontFamily: 'JetBrains Mono,monospace' }}>// tech_stack</div>
            <div className="flex flex-wrap gap-2 mb-8">
              {STACK.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-lg text-sm cursor-default transition-all"
                  style={{ background: '#1A2236', color: '#94A3B8', fontFamily: 'DM Sans,sans-serif', border: '1px solid #1E2D45' }}
                  onMouseEnter={(e) => { e.target.style.borderColor = '#3B82F6'; e.target.style.color = '#E2E8F0'; }}
                  onMouseLeave={(e) => { e.target.style.borderColor = '#1E2D45'; e.target.style.color = '#94A3B8'; }}>
                  {t}
                </span>
              ))}
            </div>
            <div className="text-xs mb-4" style={{ color: '#3B82F6', fontFamily: 'JetBrains Mono,monospace' }}>// process</div>
            {['Discovery & Planning', 'Design & Prototyping', 'Development & Testing', 'Launch & SEO Setup', 'Ongoing Support'].map((step, i) => (
              <div key={step} className="flex items-center gap-3 mb-3">
                <div className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(59,130,246,0.15)', color: '#3B82F6', fontFamily: 'JetBrains Mono,monospace' }}>{i + 1}</div>
                <div className="flex-1 h-px" style={{ background: '#1A2236' }} />
                <span className="text-xs" style={{ color: '#475569', fontFamily: 'DM Sans,sans-serif' }}>{step}</span>
                <CheckCircle2 size={12} style={{ color: '#10B981' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
