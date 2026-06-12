# Amsterdam Future Labs — website

Portfolio site for the iOS apps in this folder (BreathWell, Kamado Companion,
Airfryer Companion, Sudoku XL). Built with [Astro](https://astro.build) —
fully static output, zero client-side framework, ~no JS beyond a small
animation/menu script.

## Commands

```sh
npm install        # once
npm run dev        # dev server at http://localhost:4321
npm run build      # regenerates image assets, then builds to dist/
npm run preview    # serve the production build locally
npm run assets     # only regenerate screenshots/icons/OG images
```

## Where everything lives

| What | Where |
|---|---|
| All app content (copy, features, privacy, FAQ) | `src/data/apps.ts` |
| Pages | `src/pages/` (per-app pages are generated from the data file) |
| Components | `src/components/` (Header, Footer, AppCard, FAQAccordion, PrivacySection, AnimatedSection, CTAButton, PhoneFrame, PageHero, FeatureIcon) |
| Design tokens & base styles | `src/styles/global.css` |
| Screenshots, icons, OG images | `public/images/` |
| Asset pipeline | `scripts/generate-assets.mjs` |

## Adding or updating an app

1. Edit `src/data/apps.ts` — every page (overview card, detail page, privacy
   policy, FAQ, sitemap) is generated from it.
2. Drop screenshots in `public/images/apps/<slug>/`. Use the App Store 6.9"
   format (1320 × 2868) as the source; SVG placeholders can be replaced by
   PNGs with the same aspect ratio (update the paths in `apps.ts`).
3. BreathWell screenshots and icons are auto-resized from
   `../BreathWell/Media/` by `npm run assets` — point the script at new
   source files when you have them.

## App release status

Each app has `status: 'coming-soon' | 'available'` in `src/data/apps.ts`.
When an app ships, set `status: 'available'` and add its `appStoreUrl` —
all CTAs switch to real download buttons automatically.

## Deploying (Cloudflare Pages)

- Build command: `npm run build`
- Output directory: `dist`
- `public/_redirects` keeps the legacy
  `/kamado-companion/privacy.html` URL (referenced in the App Store
  submission kit) working.

App Store Connect URLs per app:

- Support URL: `https://amsterdamfuturelabs.com/apps/<slug>/#support`
- Privacy Policy URL: `https://amsterdamfuturelabs.com/apps/<slug>/privacy/`
