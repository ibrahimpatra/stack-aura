// Stackaura Digital logo — three stacked layers (the "stack") with a red top layer (the "aura").
// Usage: <Logo /> on light backgrounds, <Logo dark /> on navy backgrounds.

export function LogoMark({ size = 44, dark = false, className = '' }) {
  const mid = dark ? '#FFFFFF' : '#000129';
  const bot = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,1,41,0.4)';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} role="img" aria-label="Stackaura Digital logo" style={{ flexShrink: 0 }}>
      <path d="M32 5 L58 18 L32 31 L6 18 Z" fill="#DB333D" stroke="#DB333D" strokeWidth="2" strokeLinejoin="round" />
      <path d="M7 30 L32 42.5 L57 30" fill="none" stroke={mid} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 42 L32 54.5 L57 42" fill="none" stroke={bot} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Logo({ dark = false, size = 46 }) {
  return (
    <span className="inline-flex items-center gap-3 select-none">
      <LogoMark size={size} dark={dark} />
      <span className="flex flex-col" style={{ lineHeight: 1 }}>
        <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '1.55rem', color: dark ? '#FFFFFF' : '#000129', letterSpacing: '-0.01em' }}>
          Stackaura
        </span>
        <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.78rem', color: '#DB333D', letterSpacing: '0.42em', marginTop: 5 }}>
          DIGITAL
        </span>
      </span>
    </span>
  );
}
