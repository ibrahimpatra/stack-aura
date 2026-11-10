const items = ['Websites','·','Mobile Apps','·','Google Ranking','·','Online Stores','·','Design','·','Payments','·','Support','·','Next.js','·','React','·','Firebase','·'];

export default function TechMarquee() {
  return (
    <div className="py-6 overflow-hidden" style={{ background: '#000129' }} aria-label="What we work with">
      <div className="marquee flex gap-10 items-center">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex-shrink-0"
            style={{ color: item === '·' ? '#DB333D' : 'rgba(255,255,255,0.85)', fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: item === '·' ? '1.6rem' : '1.2rem' }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
