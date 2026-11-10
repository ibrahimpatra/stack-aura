import { useState, useRef, useEffect } from 'react';
import { LogoMark, Wordmark } from './Logo';

// The default picture used everywhere: shows the image if it exists, otherwise a branded stackaura.cc tile.
// So a project, blog post or service without a picture still looks finished — never a broken icon or an empty hole.
export function BrandTile({ ratio = '3 / 2', rounded = 6, label = 'stackaura.cc', style = {}, compact = false }) {
  return (
    <div role="img" aria-label={label}
      style={{
        aspectRatio: ratio, width: '100%', borderRadius: rounded, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: compact ? 6 : 14, background: '#000129',
        backgroundImage: 'radial-gradient(circle at 50% 35%, rgba(219,51,61,0.32), transparent 62%), linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
        backgroundSize: 'auto, 40px 40px, 40px 40px', border: '1px solid #2A2F57', ...style,
      }}>
      <LogoMark size={compact ? 34 : 64} dark />
      <Wordmark dark size={compact ? '1rem' : '1.5rem'} />
    </div>
  );
}

export default function BrandImage({ src, alt = '', title, width = 1200, height = 800, eager = false, rounded = 6, fit = 'cover', style = {}, className = '', compact = false }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const el = ref.current; if (el && el.complete && el.naturalWidth === 0) setFailed(true); }, [src]);
  useEffect(() => setFailed(false), [src]);
  const ratio = `${width} / ${height}`;
  if (!src || failed) return <BrandTile ratio={ratio} rounded={rounded} label={alt || 'stackaura.cc'} style={style} compact={compact} />;
  return (
    <img ref={ref} src={src} alt={alt} title={title} width={width} height={height}
      loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} className={className}
      style={{ width: '100%', height: 'auto', aspectRatio: ratio, objectFit: fit, borderRadius: rounded, display: 'block', ...style }} />
  );
}
