import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, ArrowUpRight, MessageCircle } from 'lucide-react';
import { SITE, SERVICES } from '../../lib/seo';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: '#000129', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#DB333D' }}>
                <span className="text-white font-bold text-sm" style={{ fontFamily: 'Syne,sans-serif' }}>S</span>
              </div>
              <span className="font-bold text-base text-white" style={{ fontFamily: 'Syne,sans-serif' }}>Stackaura <span style={{ color: '#DB333D' }}>Digital</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#8B93B8', maxWidth: '300px', fontFamily: 'DM Sans,sans-serif' }}>
              Professional web development, mobile apps, and SEO services. Building digital products that perform worldwide.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Github size={16} />, href: '#' },
                { icon: <Twitter size={16} />, href: '#' },
                { icon: <Linkedin size={16} />, href: '#' },
                { icon: <Mail size={16} />, href: `mailto:${SITE.email}` },
                { icon: <MessageCircle size={16} />, href: `https://wa.me/${SITE.whatsapp}` },
              ].map((s, i) => (
                <a key={i} href={s.href}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.07)', color: '#8B93B8' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#DB333D'; e.currentTarget.style.color = '#FFFFFF'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#8B93B8'; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-white" style={{ fontFamily: 'Syne,sans-serif' }}>Services</h4>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm transition-colors" style={{ color: '#8B93B8', fontFamily: 'DM Sans,sans-serif' }}
                    onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.target.style.color = '#8B93B8')}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-white" style={{ fontFamily: 'Syne,sans-serif' }}>Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Projects', href: '/projects' },
                { label: 'Blog', href: '/blog' },
                { label: 'Contact', href: '/contact' },
                { label: 'Get a Quote', href: '/contact' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm transition-colors" style={{ color: '#8B93B8', fontFamily: 'DM Sans,sans-serif' }}
                    onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.target.style.color = '#8B93B8')}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs" style={{ color: '#4B5573', fontFamily: 'DM Sans,sans-serif' }}>
            © {year} Stackaura Digital. All rights reserved. | Kuwait & Worldwide
          </p>
          <a href={SITE.url} className="text-xs flex items-center gap-1" style={{ color: '#4B5573', fontFamily: 'DM Sans,sans-serif' }}>
            Developed by <span style={{ color: '#DB333D' }} className="ml-1">Stackaura Digital</span>
            <ArrowUpRight size={11} style={{ color: '#DB333D' }} />
          </a>
        </div>
      </div>
    </footer>
  );
}
