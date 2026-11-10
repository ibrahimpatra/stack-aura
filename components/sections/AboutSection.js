import Link from 'next/link';
import { CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import SiteImage from '../ui/SiteImage';
import { SITE } from '../../lib/seo';

const WHY = [
  'Your website is built to be found on Google from day one',
  'Clean, honest work with no hidden costs',
  'We are in Kuwait and reply on WhatsApp',
  'Most websites go live in 2–4 weeks',
  'You own everything: your website, your code, your accounts',
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 relative z-10" style={{ background: '#000129' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="reveal-left">
          <div className="section-label mb-5">Who we are</div>
          <h2 className="font-extrabold mb-6" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.1rem,4.4vw,3.4rem)', color: '#F3F4FA', letterSpacing: '-0.02em' }}>
            A team that <span className="scribble" style={{ color: '#DB333D' }}>gets it done.</span>
          </h2>
          <p className="mb-8" style={{ color: '#C3C7DB', fontSize: '1.25rem', lineHeight: 1.7 }}>
            We build websites and mobile apps, and we help businesses get found on Google. Every website we make is ready for Google from the very first day, not as an extra later.
          </p>
          <ul className="space-y-4 mb-10">
            {WHY.map((w) => (
              <li key={w} className="flex items-start gap-3" style={{ color: '#E4E6F2', fontSize: '1.15rem' }}>
                <CheckCircle2 size={24} className="flex-shrink-0 mt-0.5" style={{ color: '#DB333D' }} /> {w}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-4">
            <Link href="/about" className="btn-primary">More about us <ArrowRight size={20} /></Link>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-ghost"><MessageCircle size={20} /> WhatsApp us</a>
          </div>
        </div>

        <div className="reveal-right relative">
          <div style={{ transform: 'rotate(1.6deg)', border: '3px solid #F3F4FA', background: '#14172E', boxShadow: '12px 12px 0 #DB333D', borderRadius: 4, overflow: 'hidden' }}>
            <SiteImage id="about-team" rounded={0} fallback />
          </div>
          <div className="absolute flex items-center justify-center text-center"
            style={{ right: -10, bottom: -26, width: 118, height: 118, borderRadius: '50%', background: '#DB333D', color: '#fff', transform: 'rotate(-12deg)', border: '3px dashed #fff', fontFamily: 'Syne,sans-serif', fontWeight: 800, lineHeight: 1.1, fontSize: '1.05rem' }}>
            Made in<br />Kuwait
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-px reveal" style={{ background: '#2A2F57', border: '1px solid #2A2F57' }}>
        {[
          { v: '20+', l: 'Projects finished' },
          { v: '100%', l: 'Happy clients' },
          { v: '2–4 wks', l: 'Typical time to launch' },
          { v: '24 hrs', l: 'We reply within' },
        ].map((s) => (
          <div key={s.l} className="p-7 text-center" style={{ background: '#000129' }}>
            <div className="font-extrabold" style={{ fontFamily: 'Syne,sans-serif', color: '#DB333D', fontSize: '2.4rem', lineHeight: 1.1 }}>{s.v}</div>
            <div className="mt-2" style={{ color: '#C3C7DB', fontSize: '1.05rem' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
