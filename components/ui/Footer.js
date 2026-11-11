import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, MessageCircle, MapPin } from 'lucide-react';
import { SITE, SERVICES } from '../../lib/seo';
import { useT } from '../../lib/i18n';
import Logo from './Logo';

const LINK = { color: '#B4BAD6', fontSize: '1.05rem' };

export default function Footer() {
  const { t } = useT();
  const year = new Date().getFullYear();
  const quick = [
    { label: t('nav.home'), href: '/' }, { label: t('nav.about'), href: '/about' }, { label: t('nav.work'), href: '/projects' },
    { label: t('nav.blog'), href: '/blog' }, { label: t('nav.contact'), href: '/contact' },
  ];
  const hover = (on) => (e) => { e.currentTarget.style.color = on ? '#FFFFFF' : '#B4BAD6'; };
  return (
    <footer style={{ background: '#00001A', borderTop: '6px solid #DB333D', position: 'relative', zIndex: 2 }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="mb-5"><Logo dark /></div>
            <p className="leading-relaxed mb-5" style={{ color: '#B4BAD6', maxWidth: 400, fontSize: '1.05rem' }}>{t('footer.text')}</p>
            <div className="space-y-2 mb-6" style={{ fontSize: '1.05rem' }}>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2" style={{ color: '#FFFFFF' }}><Mail size={17} style={{ color: '#DB333D' }} /> <span dir="ltr">{SITE.email}</span></a>
              <a href={`https://wa.me/${SITE.whatsapp}`} className="flex items-center gap-2" style={{ color: '#FFFFFF' }}><MessageCircle size={17} style={{ color: '#DB333D' }} /> {t('contact.whatsapp')}: <span dir="ltr">+{SITE.whatsapp}</span></a>
              <span className="flex items-center gap-2" style={{ color: '#FFFFFF' }}><MapPin size={17} style={{ color: '#DB333D' }} /> {t('contact.location')}</span>
            </div>
            <div className="flex gap-3">
              {[{ icon: <Github size={20} />, href: '#', label: 'GitHub' }, { icon: <Twitter size={20} />, href: '#', label: 'Twitter' }, { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' }, { icon: <MessageCircle size={20} />, href: `https://wa.me/${SITE.whatsapp}`, label: 'WhatsApp' }].map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} className="w-11 h-11 rounded-lg flex items-center justify-center transition-all" style={{ background: 'rgba(255,255,255,0.08)', color: '#B4BAD6' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#DB333D'; e.currentTarget.style.color = '#FFFFFF'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#B4BAD6'; }}>{s.icon}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white" style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.15rem' }}>{t('footer.services')}</h4>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`} style={LINK} onMouseEnter={hover(true)} onMouseLeave={hover(false)}>{t(`services.items.${s.slug}.label`)}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white" style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.15rem' }}>{t('footer.links')}</h4>
            <ul className="space-y-3">
              {quick.map((l) => <li key={l.href}><Link href={l.href} style={LINK} onMouseEnter={hover(true)} onMouseLeave={hover(false)}>{l.label}</Link></li>)}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ color: '#9AA1C4', fontSize: '0.95rem' }}>© {year} stackaura.cc · {t('footer.rights')} · {t('footer.loc')}</p>
        </div>
      </div>
    </footer>
  );
}
