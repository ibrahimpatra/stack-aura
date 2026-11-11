# stackaura.cc — SEO Image Prompts (17 images)

Each image already has a slot in the website. **Generate → save with the exact filename → put it in `public/images/`.** The page shows it automatically, with English *and* Arabic alt text already set (see `lib/images.json`).

> **Good to know**
> - Until you add an image, the site shows the branded default picture (logo on navy) where an image is missing, and the hero keeps its striped design. Nothing looks broken.
> - **Hero banners 1–5 are BACKGROUNDS.** They sit behind the hero slide with a dark overlay. The illustration and text stay on top, so keep the left side of each banner calm and dark.
> - There are **no people** in any prompt: the site never says who or how many we are.

## 1. Rules (so Google Images can find them)

| Rule | Why |
|---|---|
| Save as **.webp**, quality ~80, **under 150 KB** (banners under 250 KB) | Fast site = better ranking. Use squoosh.app (free) |
| Use the **exact filename** below | Filename is an SEO signal, and the code expects it |
| Use the **exact size** below (or same ratio) | Prevents layout jumping |
| **No text inside the pictures** | AI draws text badly; Google reads the alt text instead |
| No logos, brands or real people | Avoids copyright/likeness problems |
| Add images **before** you deploy | The image sitemap only lists files that exist |
| After deploying: Search Console → Sitemaps → submit `sitemap.xml` | Tells Google about the images |

## 2. Style line — paste at the END of every prompt

> Clean modern flat illustration with soft 3D depth, on a deep navy (#000129) background with vivid red (#DB333D) and cool grey accents, subtle grid texture, minimal, plenty of empty space, professional tech look, sharp, high quality, no text, no letters, no logos, no watermark

Works in ChatGPT, Midjourney (add `--ar 16:9` / `--ar 3:2`), Gemini/Imagen, Ideogram, Firefly.

## 3. The prompts

### 1) `hero-banner-1` — `web-development-company-kuwait-banner.webp` — 1920×1080 (16:9)
**Prompt:** A wide cinematic scene of a laptop showing a clean business website next to a smartphone, glowing red upward-growth arrow in the background, small floating icons (shopping bag, chat bubble, magnifier). Leave the LEFT 45% of the image mostly empty and dark (text will sit there). + *style line*

**Alt (EN):** Web development company in Kuwait building a business website and mobile app

**Alt (AR):** شركة تصميم مواقع في الكويت تبني موقع شركة وتطبيق جوال

### 2) `hero-banner-2` — `mobile-app-development-kuwait-banner.webp` — 1920×1080 (16:9)
**Prompt:** Two smartphones (generic iPhone-style and Android-style, no brand marks) floating at an angle on the right, showing colourful app screens and notification bubbles. Leave the LEFT 45% mostly empty and dark. + *style line*

**Alt (EN):** Mobile app development in Kuwait for iPhone and Android

**Alt (AR):** برمجة تطبيقات جوال في الكويت للآيفون والأندرويد

### 3) `hero-banner-3` — `seo-google-ranking-kuwait-banner.webp` — 1920×1080 (16:9)
**Prompt:** A giant magnifying glass over a search bar with a rising bar chart and a red first-place badge (a crown or star, no digits), website cards climbing a ladder of results on the right. Leave the LEFT 45% mostly empty and dark. + *style line*

**Alt (EN):** SEO services in Kuwait to rank first on Google

**Alt (AR):** خدمات تحسين محركات البحث SEO في الكويت للظهور الأول في قوقل

### 4) `hero-banner-4` — `ai-assistant-chatbot-development-kuwait-banner.webp` — 1920×1080 (16:9)
**Prompt:** A friendly abstract AI assistant: a chat window with message bubbles and a glowing red spark, connected by thin lines to small icons (calendar, shopping cart, document). Right side composition, LEFT 45% mostly empty and dark. + *style line*

**Alt (EN):** AI assistant and chatbot development for businesses in Kuwait

**Alt (AR):** مساعد ذكاء اصطناعي وشات بوت لشركات في الكويت

### 5) `hero-banner-5` — `website-support-maintenance-kuwait-banner.webp` — 1920×1080 (16:9)
**Prompt:** A navy shield with a red check mark protecting a website window, wrench, refresh arrow and a small green online dot, calm and secure feeling, on the right. LEFT 45% mostly empty and dark. + *style line*

**Alt (EN):** Website support and maintenance in Kuwait

**Alt (AR):** صيانة ودعم المواقع في الكويت

### 6) `web-development` — `website-development-services-kuwait.webp` — 1200×800 (3:2)
**Prompt:** An isometric illustration of a laptop and a tablet showing a modern responsive website layout with blocks, image placeholders and buttons. + *style line*

**Alt (EN):** Custom website development services in Kuwait on laptop and phone

**Alt (AR):** خدمة تصميم وتطوير مواقع الكويت على لابتوب وجوال

### 7) `mobile-apps` — `mobile-app-development-kuwait.webp` — 1200×800 (3:2)
**Prompt:** Two smartphones side by side (generic, no brand marks) showing simple colourful app screens with icons and cards, notification bubbles floating around. + *style line*

**Alt (EN):** Mobile app development in Kuwait for iPhone and Android

**Alt (AR):** برمجة تطبيقات جوال في الكويت للآيفون والأندرويد

### 8) `ai-solutions` — `ai-assistant-chatbot-development-kuwait.webp` — 1200×800 (3:2)
**Prompt:** A friendly AI chat assistant window on a laptop answering a customer, with a glowing red spark and small icons for calendar, orders and documents connected by lines. + *style line*

**Alt (EN):** AI assistant and AI-powered apps for businesses in Kuwait

**Alt (AR):** مساعد ذكاء اصطناعي وتطبيقات ذكية لشركات في الكويت

### 9) `seo-optimisation` — `seo-services-google-ranking-kuwait.webp` — 1200×800 (3:2)
**Prompt:** A large magnifying glass over a search bar with a rising bar chart and a red first-place badge, website cards climbing a ladder of search results. + *style line*

**Alt (EN):** SEO services in Kuwait to rank higher on Google search results

**Alt (AR):** خدمات SEO في الكويت لتحسين ترتيب موقعك في قوقل

### 10) `domain-hosting` — `domain-hosting-business-email-kuwait.webp` — 1200×800 (3:2)
**Prompt:** A stylised browser address bar with a domain name shape (no readable text), a server rack, a padlock and an envelope icon, connected by glowing lines. + *style line*

**Alt (EN):** Domain, web hosting and business email management in Kuwait

**Alt (AR):** إدارة الدومين والاستضافة وإيميل الشركة في الكويت

### 11) `custom-development` — `custom-software-development-services.webp` — 1200×800 (3:2)
**Prompt:** Connected puzzle-piece blocks representing a credit-card payment, a calendar booking, a dashboard chart and a gear, linked into one working system. + *style line*

**Alt (EN):** Custom software connecting payments, bookings and dashboards

**Alt (AR):** برمجة أنظمة خاصة تربط الدفع والحجوزات ولوحات التحكم

### 12) `ui-ux-design` — `ui-ux-design-services-kuwait.webp` — 1200×800 (3:2)
**Prompt:** A designer's desk from above with wireframe sketches of a website and app on paper and tablet, a colour palette, a stylus and a ruler. + *style line*

**Alt (EN):** UI UX design services in Kuwait showing website and app sketches

**Alt (AR):** خدمات تصميم واجهات UI UX في الكويت: رسومات مواقع وتطبيقات

### 13) `maintenance` — `website-maintenance-support-services.webp` — 1200×800 (3:2)
**Prompt:** A large navy shield with a red check mark protecting a website window, with a wrench, a refresh arrow and a small green online dot. + *style line*

**Alt (EN):** Website maintenance and support keeping a website secure and online

**Alt (AR):** صيانة ودعم المواقع للحفاظ على موقعك آمن وشغّال

### 14) `about-workspace` — `web-developer-workspace-kuwait.webp` — 1200×800 (3:2)
**Prompt:** A tidy modern developer desk viewed at an angle: a large monitor and laptop showing a website design, a notebook, a coffee cup, a small plant. NO PEOPLE and no faces anywhere. + *style line*

**Alt (EN):** Developer workspace with a laptop showing a website design in Kuwait

**Alt (AR):** مكتب مطور مواقع في الكويت: لابتوب يعرض تصميم موقع

### 15) `kuwait` — `web-design-company-kuwait-city.webp` — 1600×600 (8:3)
**Prompt:** A wide stylised skyline of Kuwait City with the Kuwait Towers and modern skyscrapers along the Gulf waterfront at sunrise, with a subtle network of glowing dots and lines above it suggesting a digital connection worldwide. + *style line*

**Alt (EN):** Kuwait City skyline with Kuwait Towers, home of stackaura.cc web design company

**Alt (AR):** أفق مدينة الكويت وأبراج الكويت، شركة تصميم مواقع في الكويت

### 16) `contact` — `contact-web-developer-kuwait.webp` — 1200×600 (2:1)
**Prompt:** A smartphone with a chat bubble and an envelope with a check mark beside a laptop, with a clock icon suggesting a fast reply. + *style line*

**Alt (EN):** Contact a web developer in Kuwait for a free website quote

**Alt (AR):** تواصل مع مطور مواقع في الكويت للحصول على عرض سعر مجاني

### 17) `blog-cover` — `blog-cover-web-development-tips.webp` — 1200×630 (1.91:1)
**Prompt:** Abstract tech scene with floating browser windows, code brackets turned into simple shapes, a lightbulb and a rising chart, with plenty of empty space on the left. + *style line*

**Alt (EN):** Web development, SEO and AI tips from stackaura.cc

**Alt (AR):** نصايح تطوير مواقع وSEO وذكاء اصطناعي من stackaura.cc

## 4. Project screenshots (your real work)
For each project in the admin, upload **real screenshots** (1280×720). In the upload box, write the alt text first (it becomes the file name). Pattern: `[Client] website by stackaura.cc – what it does`. Add the Arabic text in the project's “Arabic version” box.

## 5. Adding a new image slot later
1. Add an entry in `lib/images.json` (src, size, alt, alt_ar, title, title_ar, pages).
2. Put `<SiteImage id="your-id" />` where you want it.
3. Rebuild — the image sitemap updates itself.

## 6. Brand files already done
| File | Use |
|---|---|
| `public/logo.svg` / `logo-white.svg` | Logo for light / dark backgrounds |
| `public/logo-mark.svg` | Icon only |
| `public/logo.png` | 512×512 for Google |
| `public/default-image.png` | Default picture used wherever an image is missing |
| `public/og/og-default.png` | Share image (WhatsApp, LinkedIn) |
| `public/favicon.*`, `apple-touch-icon.png`, `icon-*.png` | Browser + phone icons |
| `public/tech/*.svg` | 58 technology logos for the strip |
