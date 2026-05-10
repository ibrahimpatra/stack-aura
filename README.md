# Stackaura Digital — Next.js Website

Full agency website with blog CMS, project portfolio, and admin panel.

## Pages
- `/` — Homepage (SSR, all sections)
- `/about` — About page
- `/contact` — Contact page
- `/services` — Services overview
- `/services/[slug]` — 6 service detail pages
- `/projects` — All projects with filter
- `/projects/[slug]` — Project detail + image carousel
- `/blog` — Blog listing with search
- `/blog/[slug]` — Blog post detail
- `/admin` — Dashboard (projects + blog tabs)
- `/admin/project-editor` — Add/edit projects
- `/admin/editor` — Add/edit blog posts
- `/login` — Admin login (triple-click logo)

## Setup

```bash
npm install
cp .env.local.example .env.local
# Fill in Firebase keys
npm run dev
```

## Firebase Setup
1. Firestore: create `posts` and `projects` collections
2. Auth: enable Email/Password, create admin user
3. Firestore rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Deploy to Firebase Hosting (web.app)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Public dir: out, SPA: yes
# Add to next.config.js: output: 'export'
npm run build
firebase deploy --only hosting
```

> Note: Static export = blog/projects update only on redeploy.
> Use Vercel for live SSR updates.

## Deploy to Vercel (Recommended)
1. Push to GitHub
2. Import on vercel.com
3. Add all env vars in Vercel dashboard
4. Deploy

## Admin Access
- Triple-click the S logo → goes to /login
- Or visit /login directly
- Star icon on projects = toggle featured (shows on homepage)
- Featured projects appear in homepage Projects section

## Adding Your First Project
1. Go to /admin → Projects tab → New Project
2. Fill title, client name, slug, description
3. Upload screenshots (they show in carousel on project page)
4. Toggle "Feature on homepage" to show on homepage
5. Add features and results for the project page
6. Save

## SEO Notes
- Every page has unique meta title, description, keywords
- Client/company names from projects are auto-injected into keywords
- So if you add "Kuwait India Driving School" as a client, searches for that name will surface your site
- All pages use SSR (getServerSideProps) for Google indexing
- Sitemap auto-generated on build via next-sitemap
- JSON-LD structured data on homepage and project pages

## Customization
- Update WhatsApp number: `lib/seo.js` → SITE.whatsapp
- Update email: `lib/seo.js` → SITE.email  
- Update site URL: `lib/seo.js` → SITE.url and `next-sitemap.config.js`
- Add OG image: place `og-default.png` (1200x630) in `public/og/`
