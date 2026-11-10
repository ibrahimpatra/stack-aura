// A red "tape" banner that keeps sliding across the page.
const WORDS = ['Websites', 'Mobile Apps', 'Google Ranking', 'Online Stores', 'Design', 'Care & Support'];

export default function Ticker() {
  const row = [...WORDS, ...WORDS].map((w, i) => (
    <span key={i} className="flex items-center flex-shrink-0" style={{ gap: 28, paddingRight: 28 }}>
      <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.7rem', textTransform: 'uppercase', letterSpacing: '0.02em', color: i % 2 ? 'transparent' : '#00001A', WebkitTextStroke: i % 2 ? '2px #00001A' : '0' }}>{w}</span>
      <span style={{ color: '#00001A', fontSize: '1.4rem' }}>✦</span>
    </span>
  ));
  return (
    <div aria-hidden="true" className="relative z-20" style={{ marginTop: -62, marginBottom: 28, height: 70, overflowX: 'clip' }}>
      <div style={{ background: '#DB333D', transform: 'rotate(-1.4deg)', margin: '0 -3%', padding: '10px 0', overflow: 'hidden', boxShadow: '0 6px 0 #6E0F17' }}>
        <div className="ticker-track">{row}{row}</div>
      </div>
    </div>
  );
}
