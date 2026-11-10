// stackaura.cc logo — three stacked layers (the "stack", red top layer) + the domain as the brand name.
// <Logo /> on light backgrounds, <Logo dark /> on navy backgrounds (the whole site is navy, so use dark).

export function LogoMark({ size = 44, dark = false, className = '' }) {
  const mid = dark ? '#FFFFFF' : '#000129';
  const bot = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,1,41,0.4)';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} role="img" aria-label="stackaura.cc logo" style={{ flexShrink: 0 }}>
      <path d="M32 5 L58 18 L32 31 L6 18 Z" fill="#DB333D" stroke="#DB333D" strokeWidth="2" strokeLinejoin="round" />
      <path d="M7 30 L32 42.5 L57 30" fill="none" stroke={mid} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 42 L32 54.5 L57 42" fill="none" stroke={bot} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Wordmark({ dark = false, size = '1.7rem' }) {
  return (
    <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: size, color: dark ? '#FFFFFF' : '#000129', letterSpacing: '-0.01em', lineHeight: 1 }}>
      stackaura<span style={{ color: '#DB333D' }}>.cc</span>
    </span>
  );
}

export default function Logo({ dark = false, size = 44, text = '1.7rem' }) {
  return (
    <span className="inline-flex items-center gap-3 select-none">
      <LogoMark size={size} dark={dark} />
      <Wordmark dark={dark} size={text} />
    </span>
  );
}
