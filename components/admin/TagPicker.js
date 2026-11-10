import { useState, useEffect } from 'react';
import { Plus, Check } from 'lucide-react';
import { getTaxonomy, addTaxonomyItem, cleanName } from '../../lib/taxonomy';
import { techLogo } from '../../lib/tech';

// Pick from your saved library — or add a new one with "+ Other". New ones are saved for next time.
// kind = 'technologies' | 'blogTags'
export default function TagPicker({ kind, value = [], onChange, showLogos = false }) {
  const [library, setLibrary] = useState([]);
  const [adding, setAdding] = useState(false);
  const [text, setText] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => { getTaxonomy(kind).then(setLibrary); }, [kind]);

  const has = (t) => value.some((v) => v.toLowerCase() === t.toLowerCase());
  const toggle = (t) => onChange(has(t) ? value.filter((v) => v.toLowerCase() !== t.toLowerCase()) : [...value, t]);

  const addNew = async () => {
    const n = cleanName(text);
    if (!n) return;
    setBusy(true);
    try {
      const next = await addTaxonomyItem(kind, n);
      setLibrary(next);
      const canonical = next.find((x) => x.toLowerCase() === n.toLowerCase()) || n;
      if (!has(canonical)) onChange([...value, canonical]);
      setNote(`“${canonical}” saved to your library — it will be here next time.`);
    } catch { setNote('Could not save to library (check you are logged in). It is still added to this item.'); if (!has(n)) onChange([...value, n]); }
    setBusy(false); setText(''); setAdding(false);
    setTimeout(() => setNote(''), 4000);
  };

  // show selected values that are not (yet) in the library, e.g. older data
  const all = [...library, ...value.filter((v) => !library.some((l) => l.toLowerCase() === v.toLowerCase()))];

  return (
    <div>
      <div className="flex flex-wrap gap-2 items-center">
        {all.map((t) => {
          const on = has(t); const logo = showLogos ? techLogo(t) : null;
          return (
            <button key={t} type="button" onClick={() => toggle(t)}
              className="px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-1.5"
              style={{ background: on ? 'rgba(219,51,61,0.12)' : '#E5E7EE', border: `1px solid ${on ? '#DB333D' : 'transparent'}`, color: on ? '#B91C26' : '#374151', fontFamily: 'IBM Plex Sans,sans-serif', fontWeight: on ? 600 : 400 }}>
              {logo && <img src={logo} alt="" width={14} height={14} style={{ filter: 'brightness(0.35)' }} />}
              {on && <Check size={13} />}{t}
            </button>
          );
        })}
        {!adding ? (
          <button type="button" onClick={() => setAdding(true)} className="px-3 py-1.5 rounded-lg text-sm flex items-center gap-1"
            style={{ border: '1.5px dashed #9CA3AF', color: '#4B5563', fontFamily: 'IBM Plex Sans,sans-serif' }}>
            <Plus size={14} /> Other / Custom
          </button>
        ) : (
          <span className="flex items-center gap-2">
            <input autoFocus className="input" style={{ width: 200, padding: '8px 12px', fontSize: '1rem' }} placeholder="Type a new name…" value={text}
              onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addNew(); } if (e.key === 'Escape') setAdding(false); }} />
            <button type="button" onClick={addNew} disabled={busy} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.95rem' }}>{busy ? 'Saving…' : 'Add & save'}</button>
          </span>
        )}
      </div>
      {note && <p className="mt-2 text-sm" style={{ color: '#047857', fontFamily: 'IBM Plex Sans,sans-serif' }}>{note}</p>}
    </div>
  );
}
