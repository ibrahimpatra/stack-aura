import { Globe, Smartphone, Bot, Search, Server, Code2, Palette, ShieldCheck } from 'lucide-react';

const MAP = { Globe, Smartphone, Bot, Search, Server, Code2, Palette, ShieldCheck };
// Icons (never emojis) for the services. `name` comes from SERVICES[].icon in lib/seo.js
export default function ServiceIcon({ name, size = 24, ...rest }) {
  const Icon = MAP[name] || Globe;
  return <Icon size={size} {...rest} />;
}
