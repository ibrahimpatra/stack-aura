import { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

export default function ImageCarousel({ images = [], title = '' }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (!images.length) return null;

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <>
      <div className="relative rounded-2xl overflow-hidden" style={{ border: '1px solid #1A2236', background: '#000129' }}>
        {/* Main image */}
        <div className="relative" style={{ paddingBottom: '56.25%' }}>
          <img
            src={images[current]}
            alt={`${title} screenshot ${current + 1}`}
            className="absolute inset-0 w-full h-full object-cover cursor-zoom-in"
            onClick={() => setLightbox(true)}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/1280x720/0D1220/3B82F6?text=Screenshot'; }}
          />
          {/* Expand btn */}
          <button onClick={() => setLightbox(true)}
            className="absolute top-3 right-3 p-2 rounded-lg transition-all"
            style={{ background: 'rgba(8,12,20,0.8)', color: '#94A3B8' }}>
            <Maximize2 size={15} />
          </button>
        </div>

        {/* Controls */}
        {images.length > 1 && (
          <>
            <button onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all"
              style={{ background: 'rgba(8,12,20,0.8)', color: '#FFFFFF' }}>
              <ChevronLeft size={18} />
            </button>
            <button onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all"
              style={{ background: 'rgba(8,12,20,0.8)', color: '#FFFFFF' }}>
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="flex justify-center gap-1.5 py-3">
            {images.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className="rounded-full transition-all"
                style={{ width: i === current ? '20px' : '6px', height: '6px', background: i === current ? '#DB333D' : 'rgba(255,255,255,0.15)' }}
              />
            ))}
          </div>
        )}

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 px-4 pb-4 overflow-x-auto">
            {images.map((img, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className="flex-shrink-0 rounded-lg overflow-hidden transition-all"
                style={{ width: '72px', height: '48px', border: `2px solid ${i === current ? '#DB333D' : 'rgba(255,255,255,0.15)'}` }}>
                <img src={img} alt={`thumb ${i + 1}`} className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/72x48/0D1220/3B82F6?text=img'; }} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.95)' }}
          onClick={() => setLightbox(false)}>
          <button className="absolute top-4 right-4 p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.15)', color: '#FFFFFF' }}>
            <X size={20} />
          </button>
          <img src={images[current]} alt={title}
            className="max-w-full max-h-full rounded-xl object-contain"
            style={{ maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()} />
          {images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-xl"
                style={{ background: 'rgba(13,18,32,0.9)', color: '#FFFFFF' }}>
                <ChevronLeft size={22} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-xl"
                style={{ background: 'rgba(13,18,32,0.9)', color: '#FFFFFF' }}>
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
