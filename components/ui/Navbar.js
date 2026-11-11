import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, ChevronDown, ChevronRight, MessageCircle, Languages } from 'lucide-react';
import { SERVICES, SITE } from '../../lib/seo';
import { useT } from '../../lib/i18n';
import Logo from './Logo';

export default function Navbar() {
  const { t, locale, isAr } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const router = useRouter();
  const logoClicks = useRef(0);
  const logoTimer = useRef(null);

  const NAV = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.services'), href: '/services', dropdown: SERVICES.map((s) => ({ label: t(`services.items.${s.slug}.label`), href: `/services/${s.slug}` })) },
    { label: t('nav.work'), href: '/projects' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.blog'), href: '/blog' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    fn();
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => { setMenuOpen(false); setDropdown(null); }, [router.asPath]);

  // Single click → home. Triple click → admin login (hidden from visitors).
  const logoClick = () => {
    logoClicks.current++;
    clearTimeout(logoTimer.current);
    if (logoClicks.current >= 3) { logoClicks.current = 0; router.push('/login', '/login', { locale: 'en' }); return; }
    logoTimer.current = setTimeout(() => { if (logoClicks.current === 1) router.push('/'); logoClicks.current = 0; }, 400);
  };
  const isActive = (href) => (href === '/' ? router.asPath === '/' : router.asPath === href || router.asPath.startsWith(href + '/'));
  const otherLocale = isAr ? 'en' : 'ar';

  const LangSwitch = ({ block = false }) => (
    <Link href={router.asPath} locale={otherLocale} hrefLang={otherLocale} scroll={false}
      className={`flex items-center justify-center gap-2 ${block ? 'btn-ghost mt-4' : ''}`}
      style={block ? undefined : { color: '#F3F4FA', border: '2px solid #5B6290', borderRadius: 4, padding: '8px 14px', fontWeight: 700, fontSize: '1rem' }}
      aria-label={isAr ? 'Switch to English' : 'التبديل إلى العربية'}>
      <Languages size={18} /> {t('nav.switch')}
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: scrolled ? 'rgba(0,1,41,0.96)' : 'rgba(0,1,41,0.82)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${scrolled ? '#2A2F57' : 'transparent'}`, borderTop: '4px solid #DB333D' }}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <div onClick={logoClick} className="cursor-pointer" role="link" aria-label="stackaura.cc"><Logo dark /></div>

        <div className="hidden xl:flex items-center gap-1">
          {NAV.map((item) => (
            <div key={item.href} className="relative" onMouseEnter={() => item.dropdown && setDropdown(item.href)} onMouseLeave={() => setDropdown(null)}>
              <Link href={item.href} className="flex items-center gap-1 px-4 py-2.5 transition-colors relative"
                style={{ fontSize: '1.05rem', color: isActive(item.href) ? '#FFFFFF' : '#C3C7DB', fontWeight: isActive(item.href) ? 700 : 500 }}>
                {item.label}{item.dropdown && <ChevronDown size={16} />}
                {isActive(item.href) && <span className="absolute left-4 right-4 -bottom-0.5" style={{ height: 3, background: '#DB333D' }} />}
              </Link>
              {item.dropdown && dropdown === item.href && (
                <div className="absolute top-full pt-2 w-80" style={{ zIndex: 100, insetInlineStart: 0 }}>
                  <div className="p-2" style={{ background: '#070B3B', border: '1px solid #2A2F57', borderRadius: 6, boxShadow: '6px 6px 0 #DB333D' }}>
                    {item.dropdown.map((d) => (
                      <Link key={d.href} href={d.href} className="block px-4 py-3 transition-colors" style={{ fontSize: '1.05rem', color: '#C3C7DB', borderRadius: 4 }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.background = '#14172E'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#C3C7DB'; e.currentTarget.style.background = 'transparent'; }}>
                        {d.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden xl:flex items-center gap-3">
          <LangSwitch />
          <Link href="/contact" className="btn-primary" style={{ padding: '11px 22px', fontSize: '1rem' }}>{t('nav.quote')}</Link>
        </div>

        <button className="xl:hidden p-2 text-white" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? t('nav.close') : t('nav.menu')}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="xl:hidden px-6 pb-6 flex flex-col" style={{ background: '#00001A', borderTop: '1px solid #2A2F57', maxHeight: 'calc(100vh - 72px)', overflowY: 'auto' }}>
          {NAV.map((item) => (
            <div key={item.href}>
              <Link href={item.href} className="block py-4" style={{ fontSize: '1.2rem', fontWeight: 600, color: isActive(item.href) ? '#FF5A63' : '#F3F4FA', borderBottom: '1px solid #1D2140' }}>{item.label}</Link>
              {item.dropdown && (
                <div className="py-1" style={{ paddingInlineStart: 16 }}>
                  {item.dropdown.map((d) => (
                    <Link key={d.href} href={d.href} className="flex items-center gap-2 py-2.5" style={{ fontSize: '1.05rem', color: '#8D93B5' }}>
                      <ChevronRight size={16} className="flip-rtl" /> {d.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/contact" className="btn-primary mt-5">{t('nav.quote')}</Link>
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-4"><MessageCircle size={18} /> {t('nav.whatsapp')}</a>
          <LangSwitch block />
        </div>
      )}
    </nav>
  );
}
