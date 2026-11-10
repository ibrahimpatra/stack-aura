import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import SiteImage from '../ui/SiteImage';

const WHY = [
  'Your website is built to be found on Google from day one',
  'Clean, simple work with no extra mess or hidden costs',
  'Based in Kuwait and happy to work with clients worldwide',
  'Fast delivery: most websites go live in 2–4 weeks',
  'You own everything: your website, your code and your accounts',
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6" style={{ background: '#F0EFF2' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="section-label mb-4 reveal" style={{ background: 'rgba(0,1,41,0.06)', border: '1px solid rgba(0,1,41,0.12)', color: '#000129' }}>
            <span style={{ fontFamily: 'DM Sans,sans-serif' }}>About us</span>
          </div>
          <h2 className="font-bold mb-5 reveal delay-1" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#000129' }}>
            A Small Team That Delivers Real Results.
          </h2>
          <p className="text-base mb-4 leading-relaxed reveal delay-2" style={{ color: '#4B5563', fontFamily: 'DM Sans,sans-serif' }}>
            Stackaura Digital is a web development company in Kuwait. We build websites, mobile apps and Google ranking plans that actually work, not just look nice.
          </p>
          <p className="text-base mb-8 leading-relaxed reveal delay-3" style={{ color: '#4B5563', fontFamily: 'DM Sans,sans-serif' }}>
            Every website we build is ready for Google from the very first day. We don’t add it later as an extra.
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
          <SiteImage id="about-team" rounded={20} style={{ marginBottom: 24 }} />
          <div className="card p-8">
            <div className="font-bold mb-5" style={{ color: '#000129', fontFamily: 'Syne,sans-serif', fontSize: '1.3rem' }}>How a project goes</div>
            {['Talk about your idea', 'Design it', 'Build and test it', 'Launch it on Google', 'Support you after launch'].map((step, i) => (
              <div key={step} className="flex items-center gap-4 mb-4">
                <div className="w-9 h-9 rounded-full font-bold flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(219,51,61,0.12)', color: '#B91C26', fontFamily: 'DM Sans,sans-serif', fontSize: '1.05rem' }}>{i + 1}</div>
                <span style={{ color: '#1F2937', fontFamily: 'DM Sans,sans-serif', fontSize: '1.15rem' }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
