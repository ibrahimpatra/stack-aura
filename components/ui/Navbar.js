import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, ChevronDown } from 'lucide-react';
import { SERVICES } from '../../lib/seo';

const NAV = [
  { label: 'Services', href: '/services', dropdown: SERVICES.map((s) => ({ label: s.label, href: `/services/${s.slug}` })) },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
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

  const logoClick = () => {
    logoClicks.current++;
    clearTimeout(logoTimer.current);
    logoTimer.current = setTimeout(() => (logoClicks.current = 0), 1500);
    if (logoClicks.current >= 3) { logoClicks.current = 0; router.push('/login'); }
  };

  const isActive = (href) => router.asPath === href || router.asPath.startsWith(href + '/');

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid #DDE1EA' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 20px rgba(0,1,41,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div onClick={logoClick} className="cursor-pointer flex items-center gap-2.5 select-none">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#DB333D' }}>
            <span className="text-white font-bold text-sm" style={{ fontFamily: 'Syne,sans-serif' }}>S</span>
          </div>
          <span className="font-bold text-base" style={{ fontFamily: 'Syne,sans-serif', color: '#000129' }}>
            Stackaura <span style={{ color: '#DB333D' }}>Digital</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <div key={item.href} className="relative"
              onMouseEnter={() => item.dropdown && setDropdown(item.href)}
              onMouseLeave={() => setDropdown(null)}>
              <Link
                href={item.href}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors"
                style={{ color: isActive(item.href) ? '#DB333D' : '#4B5563', fontFamily: 'DM Sans,sans-serif', fontWeight: isActive(item.href) ? 600 : 400 }}
              >
                {item.label}
                {item.dropdown && <ChevronDown size={13} />}
              </Link>
              {item.dropdown && dropdown === item.href && (
                <div className="absolute top-full left-0 pt-2 w-56" style={{ zIndex: 100 }}>
                  <div className="rounded-xl p-2 shadow-xl" style={{ background: '#FFFFFF', border: '1px solid #DDE1EA' }}>
                    {item.dropdown.map((d) => (
                      <Link key={d.href} href={d.href}
                        className="flex items-center px-3 py-2 rounded-lg text-sm transition-colors"
                        style={{ color: '#6B7280', fontFamily: 'DM Sans,sans-serif' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#000129'; e.currentTarget.style.background = '#F0EFF2'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.background = 'transparent'; }}>
                        {d.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/contact" className="btn-primary text-sm px-5 py-2.5">Get a Quote</Link>
        </div>

        <button className="md:hidden p-2" style={{ color: '#000129' }} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-1" style={{ background: '#FFFFFF', borderTop: '1px solid #F0EFF2' }}>
          {NAV.map((item) => (
            <div key={item.href}>
              <Link href={item.href} className="block py-3 text-sm border-b" style={{ color: '#4B5563', borderColor: '#F0EFF2', fontFamily: 'DM Sans,sans-serif' }}>
                {item.label}
              </Link>
              {item.dropdown && (
                <div className="pl-4">
                  {item.dropdown.map((d) => (
                    <Link key={d.href} href={d.href} className="block py-2 text-xs" style={{ color: '#9CA3AF', fontFamily: 'DM Sans,sans-serif' }}>
                      → {d.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/contact" className="btn-primary text-sm justify-center mt-4">Get a Quote</Link>
        </div>
      )}
    </nav>
  );
}
