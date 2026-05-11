const items = ['Next.js','·','React','·','Firebase','·','React Native','·','Tailwind CSS','·','Node.js','·','TypeScript','·','SEO','·','Stripe','·','Vercel','·','PostgreSQL','·','Figma','·','Google Cloud','·','iOS','·','Android','·'];

export default function TechMarquee() {
  return (
    <div className="py-5 overflow-hidden" style={{ background: '#000129', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="marquee flex gap-8 items-center">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex-shrink-0 text-xs"
            style={{ color: item === '·' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.45)', fontFamily: item === '·' ? 'sans-serif' : 'JetBrains Mono,monospace', fontSize: item === '·' ? '1.2rem' : '0.75rem' }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
