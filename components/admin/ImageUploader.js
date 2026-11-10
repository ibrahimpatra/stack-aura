import { useState } from 'react';
import { Image as ImageIcon, Plus, Loader2 } from 'lucide-react';
import { uploadImageSEO } from '../../lib/media';

// Step 1: describe the picture (this becomes the ALT text + the file name → Google Images).
// Step 2: choose the file. It is compressed to WebP, uploaded, and returned as {src, alt, title, caption, width, height}.
export default function ImageUploader({ onUploaded, defaultAlt = '', buttonLabel = 'Choose image & upload', allowUrl = false }) {
  const [alt, setAlt] = useState('');
  const [caption, setCaption] = useState('');
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState('');
  const [err, setErr] = useState('');
  const effectiveAlt = alt.trim() || defaultAlt;

  const onFile = async (e) => {
    const file = e.target.files?.[0]; e.target.value = '';
    if (!file) return;
    setBusy(true); setErr('');
    try {
      const img = await uploadImageSEO(file, { alt: effectiveAlt, caption: caption.trim() });
      onUploaded(img); setAlt(''); setCaption('');
    } catch (ex) { setErr(ex.message || 'Upload failed'); }
    setBusy(false);
  };

  const addUrl = () => { if (!url.trim()) return; onUploaded({ src: url.trim(), alt: effectiveAlt, title: effectiveAlt, caption: caption.trim() }); setUrl(''); setAlt(''); setCaption(''); };

  return (
    <div className="p-4 rounded-xl" style={{ background: '#F3F4F8', border: '1px solid #DDE1EA' }}>
      <label className="block mb-1 font-semibold" style={{ color: '#1F2937', fontSize: '1rem' }}>1. What is in this picture? <span style={{ color: '#DB333D' }}>(alt text, important for Google)</span></label>
      <input className="input mb-3" placeholder={defaultAlt || 'e.g. Home page of Kuwait India Driving School website on a laptop'} value={alt} onChange={(e) => setAlt(e.target.value)} />
      <input className="input mb-3" placeholder="Caption under the picture (optional)" value={caption} onChange={(e) => setCaption(e.target.value)} />
      <label className="block mb-1 font-semibold" style={{ color: '#1F2937', fontSize: '1rem' }}>2. Choose the file</label>
      <label className="inline-flex items-center gap-2 px-4 py-3 rounded-xl cursor-pointer btn-primary" style={{ opacity: busy ? 0.7 : 1 }}>
        {busy ? <Loader2 size={18} className="animate-spin" /> : <ImageIcon size={18} />} {busy ? 'Compressing & uploading…' : buttonLabel}
        <input type="file" accept="image/*" onChange={onFile} className="hidden" disabled={busy} />
      </label>
      {allowUrl && (
        <div className="flex gap-2 mt-3">
          <input className="input flex-1" placeholder="…or paste an image link" value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addUrl()} />
          <button type="button" onClick={addUrl} className="btn-primary" style={{ padding: '10px 16px' }}><Plus size={18} /></button>
        </div>
      )}
      {err && <p className="mt-2" style={{ color: '#B91C1C', fontSize: '0.95rem' }}>{err}</p>}
    </div>
  );
}
