import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SiteImage from '../ui/SiteImage';

const SERVICES = [
  { slug: 'web-development', label: 'Website Development', desc: 'A professional website for your business. Looks great on phones and computers, loads fast, and is easy to find on Google.' },
  { slug: 'mobile-apps', label: 'Mobile Apps', desc: 'An app for iPhone and Android, built once and working on both. Your customers find you right on their phone.' },
  { slug: 'seo-optimisation', label: 'Google Ranking (SEO)', desc: 'We help your business appear higher when people search on Google, so more customers find you.' },
  { slug: 'custom-development', label: 'Custom Software', desc: 'Online payments, booking systems, dashboards — we build exactly what your business needs.' },
  { slug: 'ui-ux-design', label: 'Design (UI/UX)', desc: 'Clean, simple designs that make it easy for visitors to understand your business and contact you.' },
  { slug: 'maintenance', label: 'Care & Support', desc: 'We keep your website safe, fast and up to date, and fix problems quickly.' },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6 relative z-10" style={{ background: '#14172E' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 reveal">
          <div className="section-label mb-4">Our services</div>
          <h2 className="font-extrabold" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.1rem,4.4vw,3.4rem)', color: '#F3F4FA', letterSpacing: '-0.02em' }}>What we can do for you</h2>
        </div>

        <div style={{ borderTop: '2px solid #3A4073' }}>
          {SERVICES.map((s, i) => (
            <Link href={`/services/${s.slug}`} key={s.slug} className="group grid items-center gap-6 py-7 px-3 reveal transition-colors"
              style={{ gridTemplateColumns: 'auto 1fr auto', borderBottom: '1px solid #2A2F57' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#000129'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
              <span style={{ fontFamily: 'IBM Plex Mono,monospace', color: '#FF5A63', fontSize: '1.3rem', minWidth: 44 }}>0{i + 1}</span>
              <div>
                <h3 className="font-bold mb-1" style={{ fontFamily: 'Syne,sans-serif', color: '#F3F4FA', fontSize: 'clamp(1.35rem,2.4vw,1.9rem)' }}>{s.label}</h3>
                <p style={{ color: '#C3C7DB', fontSize: '1.1rem', maxWidth: 640 }}>{s.desc}</p>
              </div>
              <div className="flex items-center gap-5">
                <div className="hidden md:block" style={{ width: 170 }}><SiteImage id={s.slug} rounded={4} /></div>
                <span className="flex items-center justify-center transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" style={{ width: 52, height: 52, border: '2px solid #DB333D', color: '#FF5A63', borderRadius: 4 }}><ArrowUpRight size={24} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
