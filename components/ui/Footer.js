import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, ArrowUpRight, MessageCircle, MapPin } from 'lucide-react';
import { SITE, SERVICES } from '../../lib/seo';
import Logo from './Logo';

const LINK = { color: '#B4BAD6', fontFamily: 'DM Sans,sans-serif', fontSize: '1.05rem' };

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: '#000129', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="mb-5"><Logo dark /></div>
            <p className="leading-relaxed mb-5" style={{ color: '#B4BAD6', maxWidth: '380px', fontFamily: 'DM Sans,sans-serif', fontSize: '1.05rem' }}>
              We build websites and mobile apps, and help your business show up on Google. Based in Kuwait, working with clients worldwide.
            </p>
            <div className="space-y-2 mb-6" style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '1.05rem' }}>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2" style={{ color: '#FFFFFF' }}><Mail size={17} style={{ color: '#DB333D' }} /> {SITE.email}</a>
              <a href={`https://wa.me/${SITE.whatsapp}`} className="flex items-center gap-2" style={{ color: '#FFFFFF' }}><MessageCircle size={17} style={{ color: '#DB333D' }} /> WhatsApp: +{SITE.whatsapp}</a>
              <span className="flex items-center gap-2" style={{ color: '#FFFFFF' }}><MapPin size={17} style={{ color: '#DB333D' }} /> {SITE.location}</span>
            </div>
            <div className="flex gap-3">
              {[
                { icon: <Github size={20} />, href: '#', label: 'GitHub' },
                { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
                { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
                { icon: <Mail size={20} />, href: `mailto:${SITE.email}`, label: 'Email' },
                { icon: <MessageCircle size={20} />, href: `https://wa.me/${SITE.whatsapp}`, label: 'WhatsApp' },
              ].map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  className="w-11 h-11 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.08)', color: '#B4BAD6' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#DB333D'; e.currentTarget.style.color = '#FFFFFF'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#B4BAD6'; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white" style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.15rem' }}>Our Services</h4>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="transition-colors" style={LINK}
                    onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.target.style.color = '#B4BAD6')}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white" style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.15rem' }}>Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Our Work', href: '/projects' },
                { label: 'Blog', href: '/blog' },
                { label: 'Contact Us', href: '/contact' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition-colors" style={LINK}
                    onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.target.style.color = '#B4BAD6')}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ color: '#9AA1C4', fontFamily: 'DM Sans,sans-serif', fontSize: '0.95rem' }}>
            © {year} Stackaura Digital. All rights reserved. | Kuwait & Worldwide
          </p>
          <a href={SITE.url} className="flex items-center gap-1" style={{ color: '#9AA1C4', fontFamily: 'DM Sans,sans-serif', fontSize: '0.95rem' }}>
            Developed by <span style={{ color: '#FF6B73' }} className="ml-1">Stackaura Digital</span>
            <ArrowUpRight size={14} style={{ color: '#FF6B73' }} />
          </a>
        </div>
      </div>
    </footer>
  );
}
