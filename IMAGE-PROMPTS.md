# Stackaura Digital — SEO Image Prompts

11 images for the website. Each one already has a slot in the code, so you only have to
**generate → save with the exact filename → put it in `/public/images/`**. That's all.
The page shows the image automatically, with the right alt text and size already set (see `lib/images.json`).

---

## 1. Rules (so Google Images can find them)

| Rule | Why |
|---|---|
| Save as **.webp**, quality ~80, **under 150 KB** each | Fast site = better Google ranking. Use squoosh.app (free) |
| Use the **exact filename** shown below | Filename is an SEO signal, and the code expects it |
| Use the **exact size** shown below (or the same ratio) | Prevents layout jumping |
| **No text inside the pictures** | AI draws text badly, and Google reads the alt text instead |
| No logos or real brands, no real people's faces | Avoids copyright/likeness problems |
| Add the images **before** you deploy | The image sitemap lists them, so they should exist |
| After deploying: Google Search Console → Sitemaps → submit `sitemap.xml` | Tells Google about the images |

## 2. Style line — paste at the END of every prompt

> Clean modern flat illustration with soft 3D depth, brand colors deep navy (#000129), vivid red (#DB333D) and light grey (#F0EFF2) on a bright white background, minimal, lots of empty space, professional tech-agency look, sharp, high quality, no text, no letters, no logos, no watermark

Keeping this the same on all 11 images makes the website look like one brand.
Works in ChatGPT/DALL·E, Midjourney, Gemini/Imagen, Ideogram, Firefly. In Midjourney add `--ar 16:9` (or the ratio listed).

---

## 3. The prompts

### 1) Hero (homepage) — `web-development-agency-kuwait-hero.webp` — 1600×900 (16:9)
**Prompt:** A wide scene of a modern laptop showing a clean business website, next to a smartphone showing a mobile app, floating over a glowing red upward growth arrow and small icons of a magnifying glass, shopping bag and chat bubble, suggesting a business growing online. + *style line*
**Alt text:** Web development agency in Kuwait building a business website and mobile app

### 2) Website Development — `website-development-services-kuwait.webp` — 1200×800 (3:2)
**Prompt:** An isometric illustration of a laptop and a tablet displaying a modern responsive website layout with blocks, image placeholders and buttons, with design tools around it. + *style line*
**Alt text:** Custom website development services in Kuwait on laptop and phone

### 3) Mobile Apps — `mobile-app-development-kuwait.webp` — 1200×800 (3:2)
**Prompt:** Two smartphones side by side, one iPhone-style and one Android-style (generic, no brand marks), showing simple colorful app screens with icons and cards, with small notification bubbles floating around. + *style line*
**Alt text:** Mobile app development in Kuwait for iPhone and Android

### 4) Google Ranking / SEO — `seo-services-google-ranking-kuwait.webp` — 1200×800 (3:2)
**Prompt:** A large magnifying glass over a search bar with a rising bar chart and a red number-one rank badge (a star or crown, no digits), small website cards climbing up a ladder of results. + *style line*
**Alt text:** SEO services in Kuwait to rank higher on Google search results

### 5) Custom Software — `custom-software-development-services.webp` — 1200×800 (3:2)
**Prompt:** Connected puzzle-piece blocks representing a credit card payment, a calendar booking, a dashboard chart and a gear, linked by glowing lines into one working system. + *style line*
**Alt text:** Custom software development connecting business tools, payments and dashboards

### 6) UI/UX Design — `ui-ux-design-services-kuwait.webp` — 1200×800 (3:2)
**Prompt:** A designer's desk viewed from above with wireframe sketches of a website and app on paper and on a tablet, a color palette, a stylus and a ruler, neat and creative. + *style line*
**Alt text:** UI UX design services in Kuwait showing website and app design sketches

### 7) Care & Support — `website-maintenance-support-services.webp` — 1200×800 (3:2)
**Prompt:** A large navy shield with a red checkmark protecting a website window, with a wrench, a refresh arrow and a small "online" green dot beside it, calm and secure feeling. + *style line*
**Alt text:** Website maintenance and support services keeping a website secure and online

### 8) About / Team — `stackaura-digital-team-kuwait.webp` — 1200×800 (3:2)
**Prompt:** A bright modern small-agency office with two or three developers (stylized illustrated people, faces simple and abstract) collaborating at desks with laptops, whiteboard with sticky notes and a plant, friendly and professional. + *style line*
**Alt text:** Stackaura Digital web development team working together in Kuwait
*(Tip: a real photo of you/your team is even better for trust. Save it with this same filename.)*

### 9) Kuwait location banner — `web-design-company-kuwait-city.webp` — 1600×600 (8:3 wide)
**Prompt:** A wide stylized skyline of Kuwait City featuring the Kuwait Towers and modern skyscrapers along the Gulf waterfront at sunrise, with a subtle network of glowing dots and lines above it suggesting digital connection worldwide. + *style line*
**Alt text:** Kuwait City skyline with Kuwait Towers, home of Stackaura Digital web design company
*(Helps local SEO for "Kuwait" searches.)*

### 10) Contact — `contact-web-developer-kuwait.webp` — 1200×600 (2:1)
**Prompt:** A friendly illustrated scene of a smartphone showing a chat conversation bubble and an envelope with a checkmark beside a laptop, with a clock icon suggesting a fast reply. + *style line*
**Alt text:** Contact a web developer in Kuwait for a free website quote

### 11) Blog cover template — `blog-cover-web-development-tips.webp` — 1200×630 (1.91:1)
**Prompt:** An abstract tech scene with floating browser windows, code brackets turned into simple shapes, a lightbulb and a rising chart, arranged with plenty of empty space on the left. + *style line*
**Alt text:** Web development and SEO tips from Stackaura Digital
*(Use as the default cover; for each new blog post, make one new image with a topic-specific filename like `firebase-vs-supabase-comparison.webp`.)*

---

## 4. Project screenshots (your real work)

For every project you add in the admin panel, upload **real screenshots** (1280×720). Google Images loves these.
- Filename: `client-name-website-project-kuwait.webp` (example: `alshaya-ecommerce-website-kuwait.webp`)
- Alt text pattern: `[Client] website built by Stackaura Digital – [what it does]`

## 5. How to add a new image slot later

1. Add an entry in `lib/images.json` (src, size, alt, title, pages).
2. Put `<SiteImage id="your-id" />` where you want it on a page.
3. Run the build — the image sitemap updates itself.

## 6. Files that are already done for you

| File | Use |
|---|---|
| `public/logo.svg` / `logo-white.svg` | Main logo (light / dark backgrounds) |
| `public/logo-mark.svg` | Icon only |
| `public/logo.png` | 512×512 for Google (set in structured data) |
| `public/logo-horizontal.png` | Transparent PNG, for documents and social |
| `public/favicon.svg / .ico / favicon-32.png` | Browser tab icon |
| `public/apple-touch-icon.png`, `icon-192/512.png` | Phone home-screen icons |
| `public/og/og-default.png` | Share image (WhatsApp, LinkedIn, Google) — was missing before |
