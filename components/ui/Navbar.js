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
        background: scrolled ? 'rgba(8,12,20,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(26,34,54,0.7)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div onClick={logoClick} className="cursor-pointer flex items-center gap-2.5 select-none">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#3B82F6,#06B6D4)' }}>
            <span className="text-white font-bold text-sm" style={{ fontFamily: 'Syne,sans-serif' }}>S</span>
          </div>
          <span className="font-bold text-base text-white" style={{ fontFamily: 'Syne,sans-serif' }}>
            Stackaura <span className="grad-blue">Digital</span>
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
                style={{ color: isActive(item.href) ? '#3B82F6' : '#94A3B8', fontFamily: 'DM Sans,sans-serif' }}
              >
                {item.label}
                {item.dropdown && <ChevronDown size={13} />}
              </Link>
              {item.dropdown && dropdown === item.href && (
                <div className="absolute top-full left-0 pt-2 w-56" style={{ zIndex: 100 }}>
                  <div className="rounded-xl p-2 shadow-2xl" style={{ background: '#0D1220', border: '1px solid #1A2236' }}>
                    {item.dropdown.map((d) => (
                      <Link key={d.href} href={d.href}
                        className="flex items-center px-3 py-2 rounded-lg text-sm transition-colors"
                        style={{ color: '#64748B', fontFamily: 'DM Sans,sans-serif' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#E2E8F0'; e.currentTarget.style.background = '#1A2236'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#64748B'; e.currentTarget.style.background = 'transparent'; }}>
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

        <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-1" style={{ background: 'rgba(8,12,20,0.98)', backdropFilter: 'blur(20px)' }}>
          {NAV.map((item) => (
            <div key={item.href}>
              <Link href={item.href} className="block py-3 text-sm border-b" style={{ color: '#94A3B8', borderColor: '#1A2236', fontFamily: 'DM Sans,sans-serif' }}>
                {item.label}
              </Link>
              {item.dropdown && (
                <div className="pl-4">
                  {item.dropdown.map((d) => (
                    <Link key={d.href} href={d.href} className="block py-2 text-xs" style={{ color: '#475569', fontFamily: 'DM Sans,sans-serif' }}>
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
