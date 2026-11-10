import { useState, useRef, useEffect } from 'react';
import IMAGES from '../../lib/images.json';
import { BrandTile } from './BrandImage';

// Shows an SEO image defined in lib/images.json (filename, alt text, size).
// If the file hasn't been added to /public/images yet it renders nothing — or, with `fallback`,
// the branded stackaura.cc default tile — so the site never shows a broken-image icon.
export default function SiteImage({ id, className = '', style = {}, eager = false, rounded = 6, fit = 'cover', fallback = false }) {
  const img = IMAGES[id];
  const [failed, setFailed] = useState(false);
  const ref = useRef(null);

  // Catch images that failed before React attached onError (server-rendered pages).
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  if (!img) return null;
  if (failed) return fallback ? <BrandTile ratio={`${img.width} / ${img.height}`} rounded={rounded} style={style} /> : null;
  return (
    <img
      ref={ref}
      src={img.src}
      alt={img.alt}
      title={img.title}
      width={img.width}
      height={img.height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      className={className}
      style={{ width: '100%', height: 'auto', aspectRatio: `${img.width} / ${img.height}`, objectFit: fit, borderRadius: rounded, display: 'block', ...style }}
    />
  );
}
