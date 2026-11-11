# stackaura.cc — website

Customer-facing site (English + Arabic) + private admin panel + AI assistant.
Next.js · Firebase · Tailwind. Brand: **stackaura.cc**. Canonical host: **https://www.stackaura.cc** (change with `NEXT_PUBLIC_SITE_URL`).

## Setup
```bash
npm install
cp .env.local.example .env.local     # fill in Firebase keys, WhatsApp number, Gemini key
npm run dev
```
`npm run build` also generates `sitemap.xml` and `robots.txt` (next-sitemap).

## Languages (English + Arabic)
- English at `/…`, Arabic at `/ar/…` — same domain, so both languages build the same SEO strength.
- Every page automatically gets `canonical`, `hreflang` (en / ar / x-default), `og:locale`, RTL layout and Arabic fonts.
- All site copy lives in **`lib/lang/en.js`** and **`lib/lang/ar.js`** (Arabic is in friendly Kuwaiti dialect; headlines/meta keep the standard search words people actually type so it can rank).
- Projects and blog posts: use the **“Arabic version”** box in the admin editors. If empty, Arabic visitors see the English text.
- Marketing tone: edit the sentences in those two files. Nothing else needs touching.

## AI assistant (chat widget)
- Powered by **Google Gemini**. In `.env.local`:
  `GEMINI_API_KEY=...` (get one at aistudio.google.com/apikey — keep it server-side, no `NEXT_PUBLIC_`) and optionally `GEMINI_MODEL` (default `gemini-2.5-flash`).
- It answers from: your site copy, your **real projects and blog posts** (read live from Firestore), and the answers you teach it.
- **Admin → AI Assistant**: see leads (name + phone), see questions it could not answer, write the answer once → it remembers it. This is how it “learns” (it retrieves what you taught; it does not retrain a model).
- Safety: it only answers from the knowledge, never invents prices or facts, never talks about who works here (“we”), and has a per-visitor rate limit. Set a spending cap on your Google AI key.
- Without a key the widget shows a polite message with a WhatsApp button.

## Admin (private)
Triple-click the logo, or open `/login`.
- **Projects / Blog**: add and edit. Nothing shows on the public site until you add it (no sample content).
- **Tags & Technologies**: your saved library. In any editor press **“+ Other / Custom”** to add a new one — it is kept for next time. Also choose which technologies appear on each service page. New technology logo: drop `public/tech/<name>.svg`.
- **AI Assistant**: leads, unanswered questions, taught answers.

## Images & Google Images
| What | Where |
|---|---|
| 17 fixed SEO/brand images (`IMAGE-PROMPTS.md`) incl. **5 hero banner backgrounds** | `public/images/` |
| Admin uploads (projects, blog) | **Firebase Storage**, served from `https://www.stackaura.cc/media/<keyword-name>.webp` |
| ImgBB | fallback only |

Uploads are auto-compressed to WebP, named from the alt text, cached for a year, and added to the live image sitemap + structured data. Missing pictures show the branded default tile (`public/default-image.png`).

### One-time Firebase setup
1. Console → **Storage → Get started** (needs the pay-as-you-go plan; a small site normally stays in the free quota — check current pricing).
2. `firebase deploy --only firestore:rules,storage` (files `firestore.rules`, `storage.rules`). **Important:** these rules also keep leads and chat logs private.
3. `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` set.

## Sitemaps
Submit only `https://www.stackaura.cc/sitemap.xml` in Search Console. It lists `sitemap-0.xml` (static pages, both languages, images that exist) and `server-sitemap.xml` (live projects, posts and images, both languages).
Add the non-www domain as a redirect to `www` in Firebase Hosting and use a *Domain* property in Search Console.

## Before launch
- [ ] `NEXT_PUBLIC_WHATSAPP` = real number (currently a placeholder!)
- [ ] `hello@stackaura.cc` mailbox exists (or change `SITE.email` in `lib/seo.js`)
- [ ] `GEMINI_API_KEY` set on the server
- [ ] Storage enabled + rules published
- [ ] Images added to `public/images/`
- [ ] Social links in `components/ui/Footer.js` and `pages/_document.js`
