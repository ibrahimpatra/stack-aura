import { techLogo } from '../../lib/tech';

// A technology / tag pill. Shows the brand logo when we have one (public/tech/<slug>.svg).
export default function TechPill({ name, plain = false, big = false }) {
  const logo = plain ? null : techLogo(name);
  return (
    <span className="tech-pill" style={big ? { fontSize: '1.05rem', padding: '8px 14px' } : undefined}>
      {logo && <img src={logo} alt="" width={big ? 22 : 18} height={big ? 22 : 18} loading="lazy" />}
      {name}
    </span>
  );
}
