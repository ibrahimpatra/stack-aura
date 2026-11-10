# stackaura.cc — website

Customer-facing website + private admin panel. Next.js · Firebase · Tailwind.
Brand: **stackaura.cc** · Canonical address: **https://www.stackaura.cc** (change in one place: `NEXT_PUBLIC_SITE_URL`).

## Setup
```bash
npm install
cp .env.local.example .env.local      # fill in Firebase keys, WhatsApp number, site URL
npm run dev
```
`npm run build` also generates `sitemap.xml`, `robots.txt` (via next-sitemap).

## Admin (private)
Triple-click the logo, or open `/login`.
- **Projects / Blog** — add and edit. Nothing is shown on the public site until you add it (no sample content).
- **Tags & Technologies** (`/admin/tags`) — your saved library.
  - In any editor, pick from the list or press **“+ Other / Custom”**, type a name → it is saved for every future project/post.
  - Choose which technologies appear as pills on each **service page**.
  - The home-page logo strip shows every technology in the library. A new technology gets its logo when you drop `public/tech/<name>.svg` (lowercase, no spaces); otherwise a letter badge is shown.

## Images & Google Images
Where images live:
| What | Where | Why |
|---|---|---|
| Fixed brand/SEO images (the 11 in `IMAGE-PROMPTS.md`) | `public/images/` | fastest, part of the site, own domain |
| Anything you upload in the admin (projects, blog) | **Firebase Storage**, served at `https://www.stackaura.cc/media/<keyword-name>.webp` | unlimited growth, no redeploy, own domain |
| ImgBB | fallback only (if Storage upload fails) | third-party domain, random file names — weaker for SEO |

Every admin upload is automatically: resized + converted to WebP, named from your alt text, given alt/title/caption, cached for a year, added to the image sitemap and to the page's structured data.
A missing picture is replaced by the branded default tile (`public/default-image.png`).

### One-time Firebase setup
1. Firebase Console → **Storage → Get started** (needs the pay-as-you-go *Blaze* plan; a small site normally stays inside the free quota — check current pricing).
2. Publish the rules: `firebase deploy --only firestore:rules,storage` (files `firestore.rules`, `storage.rules`).
3. Make sure `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` is set.

## Sitemaps (Google Search Console)
- `https://www.stackaura.cc/sitemap.xml` — **submit only this one** (it lists the others).
- `…/sitemap-0.xml` — static pages (+ their SEO images that exist).
- `…/server-sitemap.xml` — live: every project, blog post and image with alt text.

## Custom domain
Firebase Hosting → add both `www.stackaura.cc` and `stackaura.cc`; set the one you don't use as a **redirect** to the main one. Use a *Domain* property in Search Console.

## Before launch checklist
- [ ] `NEXT_PUBLIC_WHATSAPP` = your real number
- [ ] `hello@stackaura.cc` mailbox exists (or change `SITE.email` in `lib/seo.js`)
- [ ] Social links in `lib/seo.js` / `pages/_document.js`
- [ ] The 11 images in `public/images/`
- [ ] Storage enabled + rules published
