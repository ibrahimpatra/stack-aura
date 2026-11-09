import Link from 'next/link';
import { Globe, Smartphone, Search, Code2, Palette, Shield, ArrowRight } from 'lucide-react';

const ICONS = { 'web-development': <Globe size={22} />, 'mobile-apps': <Smartphone size={22} />, 'seo-optimisation': <Search size={22} />, 'custom-development': <Code2 size={22} />, 'ui-ux-design': <Palette size={22} />, maintenance: <Shield size={22} /> };

const SERVICES = [
  { slug: 'web-development', label: 'Web Development', desc: 'Custom websites and web apps built with Next.js and React. Fast, SEO-ready, and scalable from day one.', color: '#DB333D', tags: ['Next.js', 'React', 'Firebase', 'Tailwind'] },
  { slug: 'mobile-apps', label: 'Mobile Apps', desc: 'Cross-platform iOS and Android apps with React Native and Expo. Native performance, single codebase.', color: '#000129', tags: ['React Native', 'Expo', 'iOS', 'Android'] },
  { slug: 'seo-optimisation', label: 'SEO Optimisation', desc: 'Get found on Google. Technical SEO, structured data, sitemaps, and content strategy to rank higher.', color: '#DB333D', tags: ['Technical SEO', 'Schema', 'Analytics', 'Content'] },
  { slug: 'custom-development', label: 'Custom Development', desc: 'Tailored software, API integrations, payment gateways, and backend systems built for your exact needs.', color: '#000129', tags: ['APIs', 'Stripe', 'Node.js', 'PostgreSQL'] },
  { slug: 'ui-ux-design', label: 'UI/UX Design', desc: 'Beautiful, conversion-focused interfaces. From wireframes to pixel-perfect designs that users love.', color: '#DB333D', tags: ['Figma', 'Prototyping', 'Design Systems', 'UX'] },
  { slug: 'maintenance', label: 'Maintenance & Support', desc: 'Ongoing care — updates, security patches, performance monitoring, and feature additions.', color: '#000129', tags: ['Monitoring', 'Updates', 'Security', 'Backups'] },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6" style={{ background: '#F0EFF2' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 reveal">
          <div className="section-label mb-4" style={{ background: 'rgba(219,51,61,0.08)', border: '1px solid rgba(219,51,61,0.15)', color: '#DB333D' }}>
            <span style={{ fontFamily: 'JetBrains Mono,monospace' }}>// services</span>
          </div>
          <h2 className="font-bold mb-3" style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#000129' }}>
            What We Build
          </h2>
          <p className="text-base max-w-lg" style={{ color: '#6B7280', fontFamily: 'DM Sans,sans-serif' }}>
            End-to-end digital solutions — professional web development, mobile apps, SEO, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <Link href={`/services/${s.slug}`} key={s.slug}
              className={`card p-6 block reveal delay-${(i % 3) + 1}`}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${s.color}10`, color: s.color }}>
                {ICONS[s.slug]}
              </div>
              <h3 className="font-bold mb-2" style={{ fontFamily: 'Syne,sans-serif', color: '#000129' }}>{s.label}</h3>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: '#6B7280', fontFamily: 'DM Sans,sans-serif' }}>{s.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {s.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
              <span className="flex items-center gap-1 text-xs font-medium" style={{ color: s.color, fontFamily: 'DM Sans,sans-serif' }}>
                Learn more <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <Link href="/services" className="btn-ghost">View All Services</Link>
        </div>
      </div>
    </section>
  );
}
