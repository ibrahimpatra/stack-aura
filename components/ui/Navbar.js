import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, ChevronDown, MessageCircle } from 'lucide-react';
import { SERVICES, SITE } from '../../lib/seo';
import Logo from './Logo';

// Plain, familiar menu names — easy for anyone to understand.
const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', dropdown: SERVICES.map((s) => ({ label: s.label, href: `/services/${s.slug}` })) },
  { label: 'Our Work', href: '/projects' },
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const router = useRouter();
  const logoClicks = useRef(0);
  const logoTimer = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); setDropdown(null); }, [router.asPath]);

  // Single click → home. Triple click → admin login (unchanged).
  const logoClick = () => {
    logoClicks.current++;
    clearTimeout(logoTimer.current);
    if (logoClicks.current >= 3) {
      logoClicks.current = 0;
      router.push('/login');
      return;
    }
    logoTimer.current = setTimeout(() => {
      if (logoClicks.current === 1) router.push('/');
      logoClicks.current = 0;
    }, 400);
  };

  const isActive = (href) => (href === '/' ? router.asPath === '/' : router.asPath === href || router.asPath.startsWith(href + '/'));

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid #DDE1EA' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 20px rgba(0,1,41,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div onClick={logoClick} className="cursor-pointer" role="link" aria-label="Stackaura Digital home">
          <Logo />
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <div key={item.href} className="relative"
              onMouseEnter={() => item.dropdown && setDropdown(item.href)}
              onMouseLeave={() => setDropdown(null)}>
              <Link
                href={item.href}
                className="flex items-center gap-1 px-4 py-2.5 rounded-lg transition-colors"
                style={{ fontSize: '1.05rem', color: isActive(item.href) ? '#DB333D' : '#1F2937', fontFamily: 'DM Sans,sans-serif', fontWeight: isActive(item.href) ? 700 : 500 }}
              >
                {item.label}
                {item.dropdown && <ChevronDown size={16} />}
              </Link>
              {item.dropdown && dropdown === item.href && (
                <div className="absolute top-full left-0 pt-2 w-72" style={{ zIndex: 100 }}>
                  <div className="rounded-xl p-2 shadow-xl" style={{ background: '#FFFFFF', border: '1px solid #DDE1EA' }}>
                    {item.dropdown.map((d) => (
                      <Link key={d.href} href={d.href}
                        className="flex items-center px-4 py-3 rounded-lg transition-colors"
                        style={{ fontSize: '1.05rem', color: '#374151', fontFamily: 'DM Sans,sans-serif' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#DB333D'; e.currentTarget.style.background = '#F0EFF2'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#374151'; e.currentTarget.style.background = 'transparent'; }}>
                        {d.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact" className="btn-primary">Get a Free Quote</Link>
        </div>

        <button className="lg:hidden p-2" style={{ color: '#000129' }} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden px-6 pb-6 flex flex-col" style={{ background: '#FFFFFF', borderTop: '1px solid #F0EFF2', maxHeight: 'calc(100vh - 72px)', overflowY: 'auto' }}>
          {NAV.map((item) => (
            <div key={item.href}>
              <Link href={item.href} className="block py-4 border-b" style={{ fontSize: '1.15rem', fontWeight: 600, color: isActive(item.href) ? '#DB333D' : '#1F2937', borderColor: '#F0EFF2', fontFamily: 'DM Sans,sans-serif' }}>
                {item.label}
              </Link>
              {item.dropdown && (
                <div className="pl-4 py-1">
                  {item.dropdown.map((d) => (
                    <Link key={d.href} href={d.href} className="block py-2.5" style={{ fontSize: '1.02rem', color: '#4B5563', fontFamily: 'DM Sans,sans-serif' }}>
                      → {d.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/contact" className="btn-primary justify-center mt-5">Get a Free Quote</Link>
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-ghost justify-center mt-3">
            <MessageCircle size={18} /> Chat on WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}
