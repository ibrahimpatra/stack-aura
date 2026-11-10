import Link from 'next/link';
import { Globe, Smartphone, Search, Code2, Palette, Shield, ArrowRight } from 'lucide-react';
import SiteImage from '../ui/SiteImage';

const ICONS = { 'web-development': <Globe size={28} />, 'mobile-apps': <Smartphone size={28} />, 'seo-optimisation': <Search size={28} />, 'custom-development': <Code2 size={28} />, 'ui-ux-design': <Palette size={28} />, maintenance: <Shield size={28} /> };

// Plain-language descriptions: what it is + what you get.
const SERVICES = [
  { slug: 'web-development', label: 'Website Development', desc: 'A professional website for your business. Looks great on phones and computers, loads fast, and is easy to find on Google.', color: '#DB333D' },
  { slug: 'mobile-apps', label: 'Mobile Apps', desc: 'An app for iPhone and Android, built once and working on both. Your customers can find you right on their phone.', color: '#000129' },
  { slug: 'seo-optimisation', label: 'Google Ranking (SEO)', desc: 'We help your business appear higher when people search on Google, so more customers find you.', color: '#DB333D' },
  { slug: 'custom-development', label: 'Custom Software', desc: 'Need something special? Online payments, booking systems, dashboards — we build exactly what your business needs.', color: '#000129' },
  { slug: 'ui-ux-design', label: 'Design (UI/UX)', desc: 'Clean, simple designs that make it easy for visitors to understand your business and contact you.', color: '#DB333D' },
  { slug: 'maintenance', label: 'Care & Support', desc: 'We keep your website safe, fast and up to date, and fix problems quickly, so you can focus on your business.', color: '#000129' },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6" style={{ background: '#F0EFF2' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 reveal">
          <div className="section-label mb-4" style={{ background: 'rgba(219,51,61,0.08)', border: '1px solid rgba(219,51,61,0.2)', color: '#B91C26' }}>Our services</div>
          <h2 className="font-bold mb-3" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2rem,4vw,3rem)', color: '#000129' }}>What We Can Do For You</h2>
          <p style={{ color: '#4B5563', fontSize: '1.25rem', maxWidth: 640 }}>Everything you need to get your business online, in one place.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <Link href={`/services/${s.slug}`} key={s.slug} className={`card p-7 block reveal delay-${(i % 3) + 1}`}>
              <SiteImage id={s.slug} rounded={12} style={{ marginBottom: 20 }} />
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ background: `${s.color}12`, color: s.color }}>
                {ICONS[s.slug]}
              </div>
              <h3 className="font-bold mb-3" style={{ fontFamily: 'Syne,sans-serif', color: '#000129', fontSize: '1.4rem' }}>{s.label}</h3>
              <p className="mb-5" style={{ color: '#4B5563', fontSize: '1.1rem', lineHeight: 1.7 }}>{s.desc}</p>
              <span className="flex items-center gap-2 font-semibold" style={{ color: '#DB333D', fontSize: '1.1rem' }}>
                Learn more <ArrowRight size={18} />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <Link href="/services" className="btn-ghost">See All Services</Link>
        </div>
      </div>
    </section>
  );
}
