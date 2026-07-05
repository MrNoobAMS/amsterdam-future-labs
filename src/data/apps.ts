/**
 * Single source of truth for every app shown on the site.
 *
 * To add an app: append an entry here and drop its screenshots in
 * /public/images/apps/<slug>/ — every page (overview, detail, privacy,
 * FAQ, sitemap) is generated from this file.
 *
 * To replace placeholder screenshots with real ones: overwrite the files
 * referenced in `screenshots` (or change the paths here). Recommended
 * source size is the App Store 6.9" format (1320 × 2868).
 */

export interface AppFeature {
  icon: string; // key into the inline icon set in FeatureIcon.astro
  title: string;
  description: string;
}

export interface AppFAQ {
  question: string;
  answer: string;
}

export interface AppPrivacy {
  /** One-sentence summary shown on cards and the global privacy page. */
  summary: string;
  /** Drives the Ads fact on the global privacy page. */
  hasAds: boolean;
  dataCollected: string;
  ads: string;
  analytics: string;
  account: string;
  storage: string;
  /** Optional "Last updated" date for the full policy page; falls back to the site default. */
  updated?: string;
  /** Optional in-app purchase / subscription clause for the full policy page. */
  purchases?: string;
  /** Optional titled sections for app-specific topics (third-party services,
   * health data, …) rendered after the standard sections on the policy page. */
  extraSections?: { title: string; body: string }[];
  /** Extra app-specific clauses for the full policy page. */
  details: string[];
}

export interface AppMeta {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  description: string[];
  category: string;
  platform: string;
  price: string;
  status: 'available' | 'coming-soon';
  appStoreUrl?: string;
  /** Accent colors used for gradients, glows and card hovers. */
  accent: string;
  accentSoft: string;
  icon: string;
  /** When true, `screenshots` are pre-branded, captioned App Store images
   * shown flat (no device bezel) rather than raw screenshots in a frame. */
  framedScreenshots?: boolean;
  screenshots: { src: string; alt: string }[];
  features: AppFeature[];
  audience: string[];
  privacy: AppPrivacy;
  faq: AppFAQ[];
}

export const SUPPORT_EMAIL = 'support@amsterdamfuturelabs.com';
export const SITE_NAME = 'Amsterdam Future Labs';
export const SITE_URL = 'https://amsterdamfuturelabs.com';

export const apps: AppMeta[] = [
  {
    slug: 'breathwell',
    name: 'BreathWell',
    tagline: 'Breathe better. Feel better.',
    shortDescription:
      'A calm, beautifully crafted breathing app with 120 guided sessions for sleep, focus, energy and stress relief.',
    description: [
      'BreathWell is a premium breathing companion designed around one idea: a few minutes of intentional breathing can change the rest of your day. No streak guilt, no noisy gamification — just a quiet, Japandi-inspired space to slow down.',
      'Choose from six pathways — calm, sleep, focus, energy, balance and recovery — each with carefully tuned breathing patterns and soft, generative ambient soundscapes. A gentle daily check-in helps the app suggest the session that fits how you actually feel.',
      'Everything runs on your device. There is no account, no feed and nothing competing for your attention.',
    ],
    category: 'Health & Fitness',
    platform: 'iPhone · iOS 17+',
    price: 'Free · Pro upgrade available',
    status: 'available',
    appStoreUrl: 'https://apps.apple.com/nl/app/breathwell/id6779669203',
    accent: '#8FAE9B',
    accentSoft: 'rgba(143, 174, 155, 0.16)',
    icon: '/images/apps/breathwell/icon.png',
    framedScreenshots: true,
    screenshots: [
      { src: '/images/apps/breathwell/screen-1.png', alt: 'BreathWell home screen with daily recommendation' },
      { src: '/images/apps/breathwell/screen-2.png', alt: 'BreathWell breathing session player' },
      { src: '/images/apps/breathwell/screen-3.png', alt: 'BreathWell session catalog' },
      { src: '/images/apps/breathwell/screen-4.png', alt: 'BreathWell progress and statistics' },
    ],
    features: [
      {
        icon: 'wind',
        title: '120 guided sessions',
        description: 'Six pathways — calm, sleep, focus, energy, balance and recovery — each with sessions tuned to a specific moment of your day.',
      },
      {
        icon: 'heart',
        title: 'Emotion check-in',
        description: 'Tell BreathWell how you feel and it recommends the right session for that moment, aware of the time of day.',
      },
      {
        icon: 'sound',
        title: 'Ambient soundscapes',
        description: 'Soft, procedurally generated nature audio accompanies every session — never looping, never distracting.',
      },
      {
        icon: 'chart',
        title: 'Gentle progress',
        description: 'A calm view of your practice over time. Streaks without guilt, reminders without pressure.',
      },
      {
        icon: 'moon',
        title: 'Designed for calm',
        description: 'A warm, Japandi-inspired interface with serif typography and six unique breathing visuals.',
      },
      {
        icon: 'shield',
        title: 'Completely private',
        description: 'No account, no analytics, no ads. Your check-ins and progress never leave your iPhone.',
      },
    ],
    audience: [
      'People who want to manage everyday stress without another noisy productivity app',
      'Anyone struggling to wind down before sleep',
      'Focus seekers who use breathwork before deep work or workouts',
      'Meditation-curious users who find full meditation apps overwhelming',
    ],
    privacy: {
      summary: 'No data collected. No ads, no analytics, no account — everything stays on your device.',
      hasAds: false,
      dataCollected: 'BreathWell collects no personal data. Your check-ins, favorites and practice history are stored only on your device.',
      ads: 'BreathWell contains no advertising of any kind.',
      analytics: 'No analytics or tracking SDKs are included. We cannot see how you use the app.',
      account: 'No account or sign-up is required — the app works fully without one.',
      storage: 'All data is stored locally on your iPhone. Deleting the app deletes your data.',
      updated: 'June 13, 2026',
      purchases: 'BreathWell offers optional in-app purchases — BreathWell Pro is available as a monthly or yearly auto-renewing subscription, or as a one-time lifetime unlock. All payments are processed by Apple through the App Store; we never receive or store your card or payment details. To unlock Pro on your device, Apple shares only your purchase and subscription status with the app — nothing more. Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period, and can be managed or cancelled at any time in your Apple Account settings. Restoring a previous purchase uses your Apple Account and discloses no personal information to us.',
      details: [
        'The optional daily reminder uses local notifications scheduled on your device — no push servers are involved.',
        'BreathWell makes no network requests for its core functionality and works fully offline.',
      ],
    },
    faq: [
      { question: 'Is BreathWell free?', answer: 'BreathWell is free to download and includes free sessions in every category. BreathWell Pro unlocks the full catalog of 120 sessions, available as a monthly or yearly subscription or a one-time lifetime purchase.' },
      { question: 'Does BreathWell work offline?', answer: 'Yes — completely. Sessions, soundscapes and progress all work without an internet connection.' },
      { question: 'Is my data stored or shared?', answer: 'Your data never leaves your device. BreathWell has no servers, no analytics and no tracking.' },
      { question: 'Are there ads?', answer: 'No. BreathWell is and will remain entirely ad-free.' },
      { question: 'Do I need an account?', answer: 'No account is needed. Open the app and start breathing.' },
      { question: 'Which devices are supported?', answer: 'BreathWell is designed for iPhone and requires iOS 17 or later.' },
      { question: 'How do I get support?', answer: `Email us at ${'support@amsterdamfuturelabs.com'} — we read every message and aim to reply within two business days.` },
    ],
  },
  {
    slug: 'kamado-companion',
    name: 'Kamado Companion',
    tagline: 'Master fire. Create flavor.',
    shortDescription:
      'The complete cooking companion for your kamado BBQ — 65+ recipes, smart timers and a planner that tells you exactly when to light the fire.',
    description: [
      'Kamado Companion is built for ceramic grill cooking — Kamado Joe, Big Green Egg, The Bastard or any other kamado. Every one of its 65+ recipes is written specifically for the kamado, with dome and core temperatures in Celsius, European measurements and honest, step-by-step instructions.',
      'The BBQ planner works backwards from the moment you want to eat: it calculates when to start prepping, when to light the kamado and when the food goes on — and reminds you at fire-up time. Up to four named cook timers keep running even when the app is closed.',
      'A searchable temperature guide covers 35+ cuts, a private cook diary lets you photograph and rate your own creations, and a smart shopping list groups ingredients by supermarket aisle. All of it works fully offline, in English and Dutch.',
      'The app is free to use — every recipe, the temperature guide, timers, favorites and the shopping list are included. A Pro upgrade adds the BBQ planner and your personal cook diary, with a free trial on the yearly plan and a one-time lifetime option for anyone who prefers to pay once.',
    ],
    category: 'Food & Drink',
    platform: 'iPhone · iOS 17+',
    price: 'Free · Pro upgrade available',
    status: 'available',
    appStoreUrl: 'https://apps.apple.com/nl/app/kamado-companion/id6779634515',
    accent: '#E25A2C',
    accentSoft: 'rgba(226, 90, 44, 0.16)',
    icon: '/images/apps/kamado-companion/icon.svg',
    framedScreenshots: true,
    screenshots: [
      { src: '/images/apps/kamado-companion/screen-1.png', alt: 'Kamado Companion home screen with the featured recipe and categories' },
      { src: '/images/apps/kamado-companion/screen-2.png', alt: 'Kamado Companion recipe library with category, time and temperature filters' },
      { src: '/images/apps/kamado-companion/screen-3.png', alt: 'Kamado Companion recipe detail with dome and core temperatures' },
      { src: '/images/apps/kamado-companion/screen-4.png', alt: 'Kamado Companion BBQ planner counting back from serving time' },
      { src: '/images/apps/kamado-companion/screen-5.png', alt: 'Kamado Companion temperature guide for 35+ cuts' },
    ],
    features: [
      {
        icon: 'book',
        title: '65+ complete recipes',
        description: 'From reverse-sear ribeye and 14-hour brisket to wood-fired pizza and desserts — every recipe written for the kamado.',
      },
      {
        icon: 'calendar',
        title: 'BBQ planner',
        description: 'Pick a recipe and a serving time. The app calculates your whole timeline and reminds you exactly when to light up.',
      },
      {
        icon: 'timer',
        title: 'Four cook timers',
        description: 'Named timers for ribs, sauce, corn — and the beer you promised yourself. They keep notifying even when the app is closed.',
      },
      {
        icon: 'thermometer',
        title: 'Temperature guide',
        description: 'Dome temperature, core temperature, method and resting time for 35+ cuts — from steak rare to pulled pork.',
      },
      {
        icon: 'camera',
        title: 'Private cook diary',
        description: 'Photograph, rate and keep notes on your own cooks. Stored on your device only.',
      },
      {
        icon: 'cart',
        title: 'Smart shopping list',
        description: 'One tap adds a recipe’s ingredients to a list grouped by supermarket category.',
      },
      {
        icon: 'sparkle',
        title: 'Kamado Companion Pro',
        description: 'Unlock the BBQ planner and your personal cook diary. Try it free, then choose monthly, yearly or a one-time lifetime purchase.',
      },
    ],
    audience: [
      'Kamado owners — Kamado Joe, Big Green Egg, The Bastard or any ceramic grill',
      'Low-and-slow enthusiasts cooking brisket, ribs and pulled pork',
      'Weekend grillers who want exact temperatures instead of guesswork',
      'Anyone who has ever lit the fire too late for dinner',
    ],
    privacy: {
      summary: 'All data stays on your device. No account, no analytics. Free, with an optional Pro upgrade.',
      hasAds: false,
      dataCollected: 'The current version collects no personal data. Recipes, favorites, timers, plans, diary photos and shopping lists are stored only on your device.',
      ads: 'Kamado Companion contains no advertising. If ad-supported features are introduced in a future version, iOS will ask for your permission first via App Tracking Transparency where required, and this policy will be updated before that release.',
      analytics: 'No analytics or tracking SDKs are included.',
      account: 'No account or login is required — all functionality is available immediately.',
      storage: 'Everything is stored locally on your iPhone. Diary photos are never uploaded. Deleting the app deletes your data.',
      updated: 'June 14, 2026',
      purchases: 'Kamado Companion offers an optional Pro upgrade — available as a monthly or yearly auto-renewing subscription (the yearly plan includes a free trial) or as a one-time lifetime purchase. All payments are processed by Apple through the App Store; we never receive or store your card or payment details. To unlock Pro on your device, Apple shares only your purchase and subscription status with the app — nothing more. Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period, and can be managed or cancelled at any time in your Apple Account settings. Restoring a previous purchase uses your Apple Account and discloses no personal information to us.',
      details: [
        'All reminders (fire-up notifications, cook timers) are local notifications scheduled on your device — no push servers are involved.',
        'Sharing a diary entry uses the standard iOS share sheet; nothing is shared unless you choose to.',
        'The app works fully offline.',
      ],
    },
    faq: [
      { question: 'Is Kamado Companion free?', answer: 'Yes — the app is free to download, with all 65+ recipes, the temperature guide, timers, favorites and the shopping list included. A Pro upgrade unlocks the BBQ planner and your personal cook diary.' },
      { question: 'What does Pro include, and what does it cost?', answer: 'Pro unlocks the BBQ planner and the private cook diary with photos and ratings. It is available as a monthly or yearly subscription, or as a one-time lifetime purchase — and the yearly plan starts with a free trial so you can try everything first.' },
      { question: 'Can I try Pro for free?', answer: 'Yes. The yearly plan includes a free trial — explore every Pro feature first, and cancel before it ends in your Apple Account settings if it is not for you.' },
      { question: 'Does the app work offline?', answer: 'Yes. All recipes, timers, the planner and the temperature guide work without an internet connection.' },
      { question: 'Is my data stored or shared?', answer: 'Everything is stored on your device only. Photos in your cook diary are never uploaded.' },
      { question: 'Are there ads?', answer: 'No — Kamado Companion is ad-free.' },
      { question: 'Do I need an account?', answer: 'No. There is no login and no sign-up — everything works immediately.' },
      { question: 'Which devices are supported?', answer: 'Kamado Companion is designed for iPhone and requires iOS 17 or later. It is available in English and Dutch, following your iOS language.' },
      { question: 'Does it work with my grill?', answer: 'Yes — recipes are written for any ceramic kamado-style grill: Kamado Joe, Big Green Egg, The Bastard and others.' },
      { question: 'How do I get support?', answer: `Email ${'support@amsterdamfuturelabs.com'} and we will get back to you within two business days.` },
    ],
  },
  {
    slug: 'airfryer-companion',
    name: 'Airfryer Companion',
    tagline: 'Every dish, perfectly crisp.',
    shortDescription:
      'Recipes, oven-to-airfryer conversion, cheat sheets and smart timers — everything you need to get the most out of your air fryer.',
    category: 'Food & Drink',
    platform: 'iPhone · iOS 17+',
    price: 'Free · Pro one-time purchase',
    status: 'coming-soon',
    description: [
      'Airfryer Companion turns your air fryer into the most-used appliance in your kitchen. Convert any oven recipe to the right air fryer time and temperature in seconds, or cook straight from a growing collection of air-fryer-first recipes.',
      'Quick-reference cheat sheets cover the foods everyone actually makes — fries, chicken, vegetables, frozen snacks — with times and temperatures you can trust. Smart timers keep track of what is in the basket, and the My Cooks diary remembers what worked so you never have to guess twice.',
      'The app is free to use, with a single affordable one-time Pro upgrade that unlocks everything — no subscription.',
    ],
    accent: '#F5A623',
    accentSoft: 'rgba(245, 166, 35, 0.16)',
    icon: '/images/apps/airfryer-companion/icon.svg',
    screenshots: [
      { src: '/images/apps/airfryer-companion/screen-1.svg', alt: 'Airfryer Companion recipe overview' },
      { src: '/images/apps/airfryer-companion/screen-2.svg', alt: 'Airfryer Companion oven-to-airfryer converter' },
      { src: '/images/apps/airfryer-companion/screen-3.svg', alt: 'Airfryer Companion cheat sheets' },
      { src: '/images/apps/airfryer-companion/screen-4.svg', alt: 'Airfryer Companion timers' },
    ],
    features: [
      {
        icon: 'convert',
        title: 'Oven → air fryer converter',
        description: 'Enter any oven time and temperature and get the air fryer equivalent instantly — no more guessing.',
      },
      {
        icon: 'book',
        title: 'Air-fryer-first recipes',
        description: 'A curated recipe collection written for the air fryer, not adapted as an afterthought.',
      },
      {
        icon: 'list',
        title: 'Cheat sheets',
        description: 'Instant times and temperatures for fries, chicken, vegetables, frozen snacks and more.',
      },
      {
        icon: 'timer',
        title: 'Smart timers',
        description: 'Run multiple timers with notifications, so nothing in the basket ever overcooks.',
      },
      {
        icon: 'camera',
        title: 'My Cooks diary',
        description: 'Save what you cooked with your own notes and settings, so your best results are always one tap away.',
      },
      {
        icon: 'sparkle',
        title: 'One-time Pro, no subscription',
        description: 'A single small purchase unlocks unlimited conversions, all recipes, all cheat sheets and My Cooks — forever.',
      },
    ],
    audience: [
      'New air fryer owners figuring out what their machine can really do',
      'Busy households converting trusted oven recipes to faster air fryer versions',
      'Meal preppers who want consistent, repeatable results',
      'Anyone tired of scrolling blogs for a simple time and temperature',
    ],
    privacy: {
      summary: 'No data collected. No ads, no analytics, no account — your cooks stay on your device.',
      hasAds: false,
      dataCollected: 'Airfryer Companion collects no personal data. Recipes, favorites, timers and your My Cooks diary live only on your device.',
      ads: 'Airfryer Companion contains no advertising.',
      analytics: 'No analytics or tracking SDKs are included.',
      account: 'No account or sign-up is required.',
      storage: 'All data is stored locally on your iPhone. Deleting the app deletes your data.',
      updated: 'June 14, 2026',
      details: [
        'The Pro upgrade is a one-time purchase processed entirely by Apple through the App Store — we never see your payment details.',
        'Timer notifications are local notifications scheduled on your device.',
        'The app works fully offline.',
      ],
    },
    faq: [
      { question: 'Is Airfryer Companion free?', answer: 'The app is free to download and use. A one-time Pro purchase unlocks unlimited conversions, all recipes, all cheat sheets and the My Cooks diary — no subscription, ever.' },
      { question: 'Does the app work offline?', answer: 'Yes. The converter, recipes, cheat sheets and timers all work without an internet connection.' },
      { question: 'Is my data stored or shared?', answer: 'Everything stays on your device. There are no servers and no tracking.' },
      { question: 'Are there ads?', answer: 'No. Airfryer Companion is completely ad-free.' },
      { question: 'Do I need an account?', answer: 'No account is needed — everything works immediately.' },
      { question: 'Which devices are supported?', answer: 'Airfryer Companion is designed for iPhone and requires iOS 17 or later. It is available in English and Dutch.' },
      { question: 'Does it work with my air fryer?', answer: 'Yes — conversions and cheat sheets work for any basket or oven-style air fryer, regardless of brand.' },
      { question: 'How do I get support?', answer: `Email ${'support@amsterdamfuturelabs.com'} — we aim to reply within two business days.` },
    ],
  },
  {
    slug: 'sudoku-xl',
    name: 'Sudoku XL',
    tagline: 'Pure sudoku, beautifully made.',
    shortDescription:
      'A clean, fast sudoku experience with hand-tuned difficulty levels, smart hints that teach you techniques, and detailed statistics.',
    category: 'Games · Puzzle',
    platform: 'iPhone · iOS 17+',
    price: 'Free',
    status: 'coming-soon',
    description: [
      'Sudoku XL strips sudoku back to what makes it great: a beautiful board, fair puzzles and zero clutter. Every level is curated and ordered by difficulty, so progress always feels earned — never random.',
      'The smart hint engine does more than fill in a square. It shows you which technique applies — naked singles, hidden pairs and beyond — so every hint makes you a better solver.',
      'Your games save automatically, statistics track your solve times and accuracy per difficulty, and everything works offline. No account, no noise — just sudoku.',
    ],
    accent: '#5B6BF5',
    accentSoft: 'rgba(91, 107, 245, 0.16)',
    icon: '/images/apps/sudoku-xl/icon.png',
    screenshots: [
      { src: '/images/apps/sudoku-xl/screen-1.svg', alt: 'Sudoku XL game board' },
      { src: '/images/apps/sudoku-xl/screen-2.svg', alt: 'Sudoku XL level select' },
      { src: '/images/apps/sudoku-xl/screen-3.svg', alt: 'Sudoku XL hint explaining a technique' },
      { src: '/images/apps/sudoku-xl/screen-4.svg', alt: 'Sudoku XL statistics' },
    ],
    features: [
      {
        icon: 'grid',
        title: 'Curated levels',
        description: 'Hand-tuned puzzles across multiple difficulties, ordered so each level feels like fair progress.',
      },
      {
        icon: 'bulb',
        title: 'Hints that teach',
        description: 'The hint engine names the technique — naked single, hidden pair and more — so you learn while you solve.',
      },
      {
        icon: 'chart',
        title: 'Detailed statistics',
        description: 'Solve times, accuracy and progress per difficulty, tracked automatically.',
      },
      {
        icon: 'save',
        title: 'Auto-save',
        description: 'Leave any time. Your game is exactly where you left it, even after a restart.',
      },
      {
        icon: 'moon',
        title: 'Clean, focused design',
        description: 'A distraction-free board with pencil marks, error checking and comfortable one-handed play.',
      },
      {
        icon: 'shield',
        title: 'Offline & private',
        description: 'No account, no tracking, no internet needed. Just you and the puzzle.',
      },
    ],
    audience: [
      'Daily sudoku players who want a clean, fast app without clutter',
      'Beginners who want hints that actually explain the logic',
      'Experienced solvers chasing faster times across difficulties',
      'Anyone who prefers puzzles without ads interrupting their flow',
    ],
    privacy: {
      summary: 'No data collected. No account, no analytics — progress and statistics stay on your device.',
      hasAds: false,
      dataCollected: 'Sudoku XL collects no personal data. Your progress, saved games and statistics are stored only on your device.',
      ads: 'Sudoku XL contains no third-party advertising networks.',
      analytics: 'No analytics or tracking SDKs are included.',
      account: 'No account or sign-up is required.',
      storage: 'All data is stored locally on your iPhone. Deleting the app deletes your data.',
      updated: 'June 14, 2026',
      details: [
        'Any optional purchases (such as hint credits) are processed entirely by Apple through the App Store.',
        'The app makes no network requests and works fully offline.',
      ],
    },
    faq: [
      { question: 'Is Sudoku XL free?', answer: 'Yes, Sudoku XL is free to play. Optional hint credits are available if you want extra help on tough puzzles.' },
      { question: 'Does the app work offline?', answer: 'Yes — completely. All levels, hints and statistics work without an internet connection.' },
      { question: 'Is my data stored or shared?', answer: 'Your progress and statistics are stored on your device only. Nothing is collected or shared.' },
      { question: 'Are there ads?', answer: 'No third-party ad networks are included in Sudoku XL.' },
      { question: 'Do I need an account?', answer: 'No. Open the app and start solving.' },
      { question: 'Which devices are supported?', answer: 'Sudoku XL is designed for iPhone and requires iOS 17 or later.' },
      { question: 'How do hints work?', answer: 'Each hint highlights a real solving technique and explains why it applies, so you improve with every hint you use.' },
      { question: 'How do I get support?', answer: `Email ${'support@amsterdamfuturelabs.com'} — we aim to reply within two business days.` },
    ],
  },
  {
    slug: 'meal-planner',
    name: 'Meal Planner',
    tagline: 'Plan smarter. Eat better.',
    shortDescription:
      'Your week of meals in one tap — 156 bilingual recipes, an automatic week planner, live macros and a shopping list that builds itself.',
    description: [
      'Meal Planner answers the questions every kitchen asks: what should I eat today, what do I buy this week, and how do I hit my protein goal? Pick your goal, household size and budget, and Plan My Week fills a balanced week of breakfasts, lunches, dinners and snacks in one tap — no recipe repeats, calories allocated sensibly across the day.',
      'Behind it sits a library of 156 hand-written recipes in English and Dutch, each with per-serving macros, live portion scaling and honest step-by-step instructions. The shopping list generates itself from your planned week, merges duplicate ingredients and groups everything by supermarket aisle. Tick off your pantry and “What can I make?” shows recipes you can cook right now — and exactly which one or two items you are missing.',
      'A gentle onboarding estimates your calorie and protein targets, the home dashboard shows what is left for today, and everything runs offline on your device. No account, no tracking, no subscription.',
    ],
    category: 'Food & Drink',
    platform: 'iPhone · iOS 26+',
    price: 'Free · one-time Pro unlock',
    status: 'coming-soon',
    accent: '#3BAE6E',
    accentSoft: 'rgba(59, 174, 110, 0.16)',
    icon: '/images/apps/meal-planner/icon.png',
    screenshots: [
      { src: '/images/apps/meal-planner/screen-1.svg', alt: 'Meal Planner home dashboard with calories and protein remaining' },
      { src: '/images/apps/meal-planner/screen-2.svg', alt: 'Meal Planner week planner with four meal slots per day' },
      { src: '/images/apps/meal-planner/screen-3.svg', alt: 'Meal Planner recipe library with filters' },
      { src: '/images/apps/meal-planner/screen-4.svg', alt: 'Meal Planner self-building shopping list grouped by aisle' },
    ],
    features: [
      {
        icon: 'calendar',
        title: 'Plan My Week',
        description: 'People, goal, calories, budget and diet in — a full balanced week out, in one tap. Keep meals you already planned.',
      },
      {
        icon: 'book',
        title: '156 bilingual recipes',
        description: 'Hand-written breakfasts, lunches, dinners and snacks in English and Dutch, with filters for vegetarian, high-protein, budget, under 20 minutes and more.',
      },
      {
        icon: 'cart',
        title: 'A list that builds itself',
        description: 'The shopping list is generated from your planned week: duplicates merged, quantities scaled, grouped by supermarket aisle.',
      },
      {
        icon: 'chart',
        title: 'Live macros',
        description: 'Calories and protein remaining for today, day and week summaries, and per-serving macros that rescale with your portions.',
      },
      {
        icon: 'bulb',
        title: 'What can I make?',
        description: 'Select what is in your pantry and see perfect matches — plus recipes missing just one or two ingredients, named.',
      },
      {
        icon: 'shield',
        title: 'Private & offline',
        description: 'No account, no analytics, no ads. Your plans, pantry and targets never leave your iPhone.',
      },
    ],
    audience: [
      'Busy households tired of the daily “what are we eating?” debate',
      'Fitness-minded cooks tracking calorie and protein targets without a food scale app',
      'Budget shoppers who want one exact grocery list per week',
      'Meal preppers batch-cooking lunches and grab-and-go breakfasts',
    ],
    privacy: {
      summary: 'No data collected. No ads, no analytics, no account — plans and pantry stay on your device.',
      hasAds: false,
      dataCollected: 'Meal Planner collects no personal data. Your meal plans, pantry, shopping lists and nutrition targets are stored only on your device.',
      ads: 'Meal Planner contains no advertising.',
      analytics: 'No analytics or tracking SDKs are included.',
      account: 'No account or sign-up is required.',
      storage: 'All data is stored locally on your iPhone. Deleting the app deletes your data.',
      updated: 'June 14, 2026',
      details: [
        'The Pro upgrade is a one-time lifetime purchase processed entirely by Apple through the App Store — we never see your payment details.',
        'Calorie and protein targets are estimates calculated on your device and clearly labeled as such; they are not medical advice.',
        'The app makes no network requests for its core functionality and works fully offline.',
      ],
    },
    faq: [
      { question: 'Is Meal Planner free?', answer: 'The app is free to download and use. A single one-time Pro purchase unlocks everything for life — no subscription, ever.' },
      { question: 'Does the app work offline?', answer: 'Yes — completely. Recipes, the week planner, shopping lists and your pantry all work without an internet connection.' },
      { question: 'Is my data stored or shared?', answer: 'Everything stays on your device. There are no servers, no analytics and no tracking.' },
      { question: 'Are there ads?', answer: 'No. Meal Planner is completely ad-free.' },
      { question: 'Do I need an account?', answer: 'No account is needed — everything works immediately.' },
      { question: 'How does Plan My Week work?', answer: 'Tell the app how many people you cook for, your goal, your budget level and any dietary preference. It fills all four meal slots for every day of the week with balanced, non-repeating recipes — and you can keep any meals you already planned yourself.' },
      { question: 'Are the calorie targets medical advice?', answer: 'No. Targets are estimates based on the well-known Mifflin-St Jeor formula, are fully editable, and are clearly labeled as estimates — not medical or dietary advice.' },
      { question: 'Which devices and languages are supported?', answer: 'Meal Planner is designed for iPhone and requires iOS 26 or later. The full app — including every recipe — is available in English and Dutch, switchable instantly in settings.' },
      { question: 'How do I get support?', answer: `Email ${'support@amsterdamfuturelabs.com'} — we aim to reply within two business days.` },
    ],
  },
  {
    slug: 'ai-trainer',
    name: 'AI Trainer',
    tagline: 'Learn AI, calmly.',
    shortDescription:
      'A calm, beginner-friendly course app that teaches you to work with AI chatbots and agents — in bite-sized Dutch lessons, fully offline.',
    description: [
      'AI Trainer is for everyone who feels they should “do something with AI” but doesn’t know where to begin. No jargon, no hype — just a quiet, structured path from your very first chatbot conversation to confidently working with AI agents.',
      'The course is built as six modules of three lessons each. Every lesson follows the same reassuring rhythm: a plain-language explanation, a worked example, a practice prompt you can copy straight into your favourite AI app, a small homework assignment and a reflection question.',
      'A categorized prompt library, favorites, progress tracking and a rotating tip of the day round it out. Everything lives on your device — there is nothing to sign up for.',
    ],
    category: 'Education',
    platform: 'iPhone · iOS 26+',
    price: 'Free',
    status: 'coming-soon',
    accent: '#216B6B',
    accentSoft: 'rgba(33, 107, 107, 0.14)',
    icon: '/images/apps/ai-trainer/icon.png',
    screenshots: [
      { src: '/images/apps/ai-trainer/screen-1.svg', alt: 'AI Trainer learning path with six modules' },
      { src: '/images/apps/ai-trainer/screen-2.svg', alt: 'AI Trainer lesson with a copyable practice prompt' },
      { src: '/images/apps/ai-trainer/screen-3.svg', alt: 'AI Trainer prompt library organized by category' },
    ],
    features: [
      {
        icon: 'book',
        title: 'A structured learning path',
        description: 'Six modules, eighteen lessons — building calmly from your first chatbot chat toward working with AI agents.',
      },
      {
        icon: 'list',
        title: 'The same rhythm, every lesson',
        description: 'Explanation, example, practice prompt, homework and a reflection question — a format that never overwhelms.',
      },
      {
        icon: 'sparkle',
        title: 'Prompt library',
        description: 'Dozens of ready-to-use prompts, organized by category and skill level, each with a one-tap copy button.',
      },
      {
        icon: 'chart',
        title: 'Gentle progress',
        description: 'Progress bars and checkmarks show how far you’ve come — without streak pressure or guilt.',
      },
      {
        icon: 'heart',
        title: 'Favorites',
        description: 'Save the lessons and prompts you want to return to, right where you can find them.',
      },
      {
        icon: 'bulb',
        title: 'Tip of the day',
        description: 'Rotating beginner tips and small assignments keep you practicing between lessons.',
      },
    ],
    audience: [
      'Absolute beginners who want a calm, no-jargon introduction to AI',
      'Non-technical adults who’d rather learn step by step than dive in headfirst',
      'Anyone who wants practical prompts they can use immediately',
      'Dutch speakers — the full course is written in Dutch',
    ],
    privacy: {
      summary: 'No data collected. Fully offline, no account — your progress stays on your iPhone.',
      hasAds: false,
      dataCollected:
        'AI Trainer collects no personal data. Your progress, favorites and settings are stored only on your device.',
      ads: 'AI Trainer contains no advertising of any kind.',
      analytics: 'No analytics or tracking SDKs are included. We cannot see how you use the app.',
      account: 'No account or sign-up is required — the app works fully without one.',
      storage: 'All data is stored locally on your iPhone. Deleting the app deletes your data.',
      updated: 'July 5, 2026',
      extraSections: [
        {
          title: 'Using AI apps alongside the course',
          body: 'AI Trainer teaches you to work with AI chatbots, but it does not include one. Practice prompts are copied to your clipboard for use in the AI app of your choice; what you share with that app is governed by that provider’s privacy policy, not this one. The course explicitly teaches you what (not) to share with AI services.',
        },
      ],
      details: [
        'AI Trainer makes no network requests at all — the entire course works in airplane mode.',
        'Your lesson progress, favorites and settings never leave your device.',
      ],
    },
    faq: [
      { question: 'Is AI Trainer free?', answer: 'Yes — AI Trainer is completely free, with no ads and no in-app purchases.' },
      { question: 'Do I need an AI subscription to follow the course?', answer: 'No. The lessons work with any AI chatbot, including free ones. You copy the practice prompts into whichever AI app you already use.' },
      { question: 'Does it work offline?', answer: 'Fully. AI Trainer makes no network requests — every lesson, prompt and tip is on your device.' },
      { question: 'Which language is the course in?', answer: 'The full course is written in Dutch, designed for Dutch-speaking beginners.' },
      { question: 'Which devices are supported?', answer: 'AI Trainer is designed for iPhone and requires iOS 26 or later.' },
      { question: 'How do I get support?', answer: 'Email support@amsterdamfuturelabs.com — we aim to reply within two business days.' },
    ],
  },
  {
    slug: 'mindfirst',
    name: 'MindFirst',
    tagline: 'Mental first aid, in your pocket.',
    shortDescription:
      'Guided, offline first-aid protocols for panic, dissociation, overstimulation and crisis moments — with your safety plan and trusted contacts one tap away.',
    description: [
      'MindFirst is a digital first-aid kit for the mind. When a panic attack, dissociation or overstimulation hits, it guides you through short, calm, step-by-step protocols — grounding techniques like the 5-4-3-2-1 senses exercise and a slow breathing reset circle — until the moment passes or help is reached.',
      'A persistent SOS button can call a trusted contact or helpline through the system dialer with one tap. Your personal safety plan — what has helped you before — is always readable, even mid-crisis, and works entirely offline.',
      'MindFirst supplements professional care; it never replaces it. The app is explicit about that from the very first screen.',
    ],
    category: 'Health & Fitness',
    platform: 'iPhone · iOS 17+',
    price: 'Free',
    status: 'coming-soon',
    accent: '#56C2B3',
    accentSoft: 'rgba(86, 194, 179, 0.16)',
    icon: '/images/apps/mindfirst/icon.png',
    screenshots: [
      { src: '/images/apps/mindfirst/screen-1.svg', alt: 'MindFirst home with four support protocols and SOS button' },
      { src: '/images/apps/mindfirst/screen-2.svg', alt: 'MindFirst grounding exercise with breathing reset circle' },
      { src: '/images/apps/mindfirst/screen-3.svg', alt: 'MindFirst personal safety plan and emergency contacts' },
    ],
    features: [
      {
        icon: 'list',
        title: 'Four guided protocols',
        description: 'Step-by-step support for panic attacks, dissociation, overstimulation and crisis feelings — written to be followed mid-moment.',
      },
      {
        icon: 'wind',
        title: 'Grounding & reset circle',
        description: 'The 5-4-3-2-1 senses technique, orientation prompts and an animated breathing circle bring you back to the here and now.',
      },
      {
        icon: 'heart',
        title: 'Always-visible SOS',
        description: 'A persistent SOS button calls your chosen contact or helpline through the system dialer — one tap, no menus.',
      },
      {
        icon: 'save',
        title: 'Personal safety plan',
        description: 'Record what helps you when things get hard, and read it back in a calm, distraction-free view during a crisis.',
      },
      {
        icon: 'mail',
        title: 'Trusted contacts',
        description: 'Save the people you can lean on. Calling them works offline — no account, no server in between.',
      },
      {
        icon: 'moon',
        title: 'Designed for hard moments',
        description: 'Big targets, soft colors, short sentences — an interface built for when concentration is at its lowest.',
      },
    ],
    audience: [
      'People who experience panic attacks, dissociation or sensory overload',
      'Neurodivergent users looking for a discreet grounding tool',
      'Anyone bridging the gap between crisis moments and professional help',
      'Dutch speakers — the app is currently written in Dutch',
    ],
    privacy: {
      summary: 'No data collected. Contacts and your safety plan stay on your device — nothing ever leaves it.',
      hasAds: false,
      dataCollected:
        'MindFirst collects no personal data. Your safety plan and emergency contacts are stored only on your device.',
      ads: 'MindFirst contains no advertising of any kind.',
      analytics: 'No analytics or tracking SDKs are included. What you do in the app stays private.',
      account: 'No account or sign-up is required — help is available the moment you open the app.',
      storage: 'All data is stored locally on your iPhone. Deleting the app deletes your data.',
      updated: 'July 5, 2026',
      extraSections: [
        {
          title: 'A note on sensitive information',
          body: 'MindFirst deals with mental health, so we hold it to the strictest possible standard: your safety plan, check-ins and emergency contacts are stored only on your iPhone, are never transmitted anywhere, and are not visible to us or anyone else. When you tap SOS or call a contact, the phone number is handed to the iOS dialer — the call itself happens entirely outside the app, like any normal phone call.',
        },
        {
          title: 'Not a medical device',
          body: 'MindFirst offers self-help techniques for acute moments and makes it easier to reach your own contacts or a helpline. It does not diagnose, treat or replace professional care, and the app states this clearly during onboarding. If you are in immediate danger, contact local emergency services.',
        },
      ],
      details: [
        'MindFirst makes no network requests — every protocol, your safety plan and your contacts work fully offline.',
        'No third-party SDKs of any kind are included in the app.',
      ],
    },
    faq: [
      { question: 'Is MindFirst a replacement for therapy or professional help?', answer: 'No — and the app says so explicitly. MindFirst is first aid: it helps you through the acute moment and makes reaching your own contacts or a helpline easier. For treatment, always work with a professional.' },
      { question: 'Does it work offline?', answer: 'Yes. Every protocol, your safety plan and your contacts work without any internet connection.' },
      { question: 'Is my information private?', answer: 'Completely. Your safety plan and contacts never leave your iPhone — there is no account, no analytics and no server.' },
      { question: 'Is MindFirst free?', answer: 'Yes, MindFirst is free, with no ads and no in-app purchases.' },
      { question: 'Which language is the app in?', answer: 'MindFirst is currently written in Dutch.' },
      { question: 'Which devices are supported?', answer: 'MindFirst is designed for iPhone and requires iOS 17 or later.' },
    ],
  },
  {
    slug: 'supplementen-wijzer',
    name: 'Supplementen Wijzer',
    tagline: 'Understand what you’re really taking.',
    shortDescription:
      'Scan or search any supplement and get an objective 0–10 quality score, evidence-rated ingredient info and interaction checks — independent and educational.',
    description: [
      'Supplement marketing is loud; Supplementen Wijzer is quiet. Scan a barcode or search a product and get an objective quality score from 0 to 10, built from five criteria: dosing, scientific evidence, manufacturer transparency, unnecessary additives and value for money — each one explained, not just graded.',
      'The built-in ingredient encyclopedia ties every claim to an evidence level and independent sources such as EFSA, NIH, PubMed and Cochrane. The Pro Stack Checker looks across everything you take and flags interactions in plain green-orange-red terms, and a safety-first AI assistant answers questions while consistently pointing you to professionals for medical decisions.',
      'The app is deliberately educational and independent: it sells no supplements, shows no ads, and gives no diagnoses or treatment advice.',
    ],
    category: 'Health & Fitness',
    platform: 'iPhone · iOS 26+',
    price: 'Free · Pro upgrade available',
    status: 'coming-soon',
    accent: '#199E94',
    accentSoft: 'rgba(25, 158, 148, 0.14)',
    icon: '/images/apps/supplementen-wijzer/icon.svg',
    screenshots: [
      { src: '/images/apps/supplementen-wijzer/screen-1.svg', alt: 'Supplementen Wijzer product page with quality score and criteria' },
      { src: '/images/apps/supplementen-wijzer/screen-2.svg', alt: 'Supplementen Wijzer barcode scanner' },
      { src: '/images/apps/supplementen-wijzer/screen-3.svg', alt: 'Supplementen Wijzer stack checker with interaction results' },
    ],
    features: [
      {
        icon: 'chart',
        title: 'Objective quality score',
        description: 'A weighted 0–10 score across dosing, evidence, transparency, additives and value — with every criterion explained.',
      },
      {
        icon: 'camera',
        title: 'Barcode scanner',
        description: 'Point your camera at any supplement to look it up instantly, in the catalog or via the open product database.',
      },
      {
        icon: 'book',
        title: 'Ingredient encyclopedia',
        description: 'Benefits, drawbacks, side effects, interactions and safe dosing per ingredient — every claim tied to an evidence level and source.',
      },
      {
        icon: 'shield',
        title: 'Stack Checker',
        description: 'Pro analyzes everything you take together and flags interactions and doubled-up doses in clear green-orange-red terms.',
      },
      {
        icon: 'sparkle',
        title: 'Safety-first AI assistant',
        description: 'Ask anything about supplements; the Pro assistant asks clarifying questions and consistently refers medical decisions to professionals.',
      },
      {
        icon: 'grid',
        title: 'Discover by goal',
        description: 'Educational categories — from sleep to sport — help you explore ingredients without marketing noise.',
      },
    ],
    audience: [
      'Health-conscious people who want objective information before they buy',
      'Anyone taking multiple supplements who worries about interactions',
      'Skeptics who want claims backed by evidence, not marketing',
      'Dutch speakers — the app is currently written in Dutch',
    ],
    privacy: {
      summary: 'Saved supplements stay on your device. No account, no ads — lookups and the AI assistant are anonymous.',
      hasAds: false,
      dataCollected:
        'Supplementen Wijzer requires no account and collects no personal data. Your saved supplements, notes and favorites are stored only on your device.',
      ads: 'Supplementen Wijzer contains no advertising and sells no supplements.',
      analytics: 'No analytics or tracking SDKs are included.',
      account: 'No account or sign-up is required — Pro is unlocked through the App Store on your device.',
      storage: 'Saved products and notes are stored locally on your iPhone. Deleting the app deletes your data.',
      purchases:
        'Supplementen Wijzer offers an optional Pro upgrade — available as a monthly or yearly auto-renewing subscription or a one-time lifetime purchase. All payments are processed by Apple through the App Store; we never receive or store your payment details. Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period, and can be managed in your Apple Account settings.',
      updated: 'July 5, 2026',
      extraSections: [
        {
          title: 'Third-party services',
          body: 'Two features talk to the network, both anonymously. Scanning an unknown barcode sends only the product code to the public Open Food Facts database (openfoodfacts.org) to identify the product — nothing about you or your device is included. Questions to the AI assistant are forwarded through our own server proxy to an AI model to generate the answer; questions are not linked to your identity, are not stored by us, and are never used to build a profile of you.',
        },
        {
          title: 'Not medical advice',
          body: 'Supplementen Wijzer is educational. Quality scores, evidence ratings and interaction flags summarize published research — they are not a diagnosis, treatment or personal medical advice. Always consult your doctor or pharmacist before changing what you take, especially if you use medication.',
        },
      ],
      details: [
        'Browsing the catalog, quality scores and the ingredient encyclopedia works fully offline.',
        'Your saved supplements, notes and favorites never leave your device.',
      ],
    },
    faq: [
      { question: 'Is this medical advice?', answer: 'No. Supplementen Wijzer is educational: it explains evidence and flags interactions, but it never diagnoses or prescribes. For medical decisions, talk to your doctor or pharmacist — the app itself will tell you the same.' },
      { question: 'How is the quality score calculated?', answer: 'Five weighted criteria: dosing versus effective doses, strength of scientific evidence, manufacturer transparency, unnecessary additives, and price per effective dose. Every product page shows how each criterion contributed.' },
      { question: 'Does it work offline?', answer: 'Browsing, scores and the encyclopedia work offline. Scanning an unknown barcode and the AI assistant need a connection.' },
      { question: 'What does Pro include?', answer: 'Pro unlocks the Stack Checker and the AI assistant, as a monthly or yearly subscription or a one-time lifetime purchase.' },
      { question: 'Is my data private?', answer: 'Yes. No account, no analytics, and your saved supplements stay on your device. Barcode lookups and AI questions are anonymous.' },
      { question: 'Which devices are supported?', answer: 'Supplementen Wijzer is designed for iPhone, requires iOS 26 or later, and is currently written in Dutch.' },
    ],
  },
  {
    slug: 'mergeorbit',
    name: 'MergeOrbit',
    tagline: 'Launch. Bounce. Merge.',
    shortDescription:
      'A zero-gravity arcade merge game — sling balls into a frictionless arena, chain combos and climb the tiers before the board fills up.',
    description: [
      'MergeOrbit reimagines the merge puzzle as an air-hockey table in space. There is no gravity: balls glide, ricochet off the walls and merge on contact, so every shot is a little physics problem — and a little magic trick.',
      'Pull back the slingshot to aim, feel the power curve, and chain merges within the combo window for multipliers and satisfying screen shake. Three modes — endless Classic, a three-minute Timed sprint and Target Ball — plus coins, powerups, daily rewards and achievements keep the orbit spinning.',
      'MergeOrbit is free to play. It shows no banners and never interrupts a game: the only ads are optional rewarded ones you start yourself to earn bonus coins.',
    ],
    category: 'Games · Arcade',
    platform: 'iPhone · iOS 26+',
    price: 'Free · optional rewarded ads',
    status: 'coming-soon',
    accent: '#6C8CFF',
    accentSoft: 'rgba(108, 140, 255, 0.16)',
    icon: '/images/apps/mergeorbit/icon.png',
    screenshots: [
      { src: '/images/apps/mergeorbit/screen-1.svg', alt: 'MergeOrbit gameplay with slingshot launcher and gliding balls' },
      { src: '/images/apps/mergeorbit/screen-2.svg', alt: 'MergeOrbit mode selection with Classic, Timed and Target Ball' },
      { src: '/images/apps/mergeorbit/screen-3.svg', alt: 'MergeOrbit results screen with combo stats and coins' },
    ],
    features: [
      {
        icon: 'wind',
        title: 'Zero-gravity physics',
        description: 'A frictionless arena where balls glide and ricochet like air hockey — tuned damping, real momentum, no gravity.',
      },
      {
        icon: 'sparkle',
        title: 'Slingshot launcher',
        description: 'Pull back to aim and feel the power curve — from a gentle nudge to a full-speed rocket across the rink.',
      },
      {
        icon: 'grid',
        title: 'Three modes',
        description: 'Classic for the long game, a three-minute Timed sprint, and Target Ball for a focused tier chase.',
      },
      {
        icon: 'chart',
        title: 'Combo scoring',
        description: 'Merges within the chain window stack multipliers — three in a row and the screen starts to shake.',
      },
      {
        icon: 'feature',
        title: 'Coins & powerups',
        description: 'Earn coins as you play and spend them on powerups like the Magnet to bend the arena to your will.',
      },
      {
        icon: 'calendar',
        title: 'Daily rewards & achievements',
        description: 'A daily reason to come back, and a shelf of achievements for the completionists.',
      },
    ],
    audience: [
      'Casual players who love merge and 2048-style progression',
      'Physics-game fans who want skill in their aim, not just luck',
      'Score chasers — every mode keeps its own high score',
      'Anyone who wants a free game that never interrupts play with ads',
    ],
    privacy: {
      summary: 'Progress stays on your device. Free thanks to optional rewarded ads you start yourself — no banners, no interruptions.',
      hasAds: true,
      dataCollected:
        'MergeOrbit collects no personal data itself. Your scores, coins and progress are stored only on your device.',
      ads: 'MergeOrbit shows optional rewarded ads only: you choose to watch one to earn bonus coins (up to three per day). There are no banners and no forced ads between games.',
      analytics: 'MergeOrbit includes Google’s ads SDK to serve rewarded ads. Before any ad personalization, iOS asks your permission via App Tracking Transparency — decline it and ads stay non-personalized. We add no analytics of our own.',
      account: 'No account or sign-up is required.',
      storage: 'All game data is stored locally on your iPhone. Deleting the app deletes your progress.',
      updated: 'July 5, 2026',
      extraSections: [
        {
          title: 'Third-party advertising (Google AdMob)',
          body: 'Rewarded ads are served by Google AdMob. When you choose to watch one, Google processes device information — such as your IP address and, only with your permission, the advertising identifier — to serve and measure the ad. On first use iOS shows the App Tracking Transparency prompt; if you decline, ads remain non-personalized and no advertising identifier is shared. Where required (for example under the GDPR), a consent form is shown before any personalized ads. Google’s handling of this data is described in its own privacy policy at policies.google.com/privacy.',
        },
      ],
      details: [
        'Gameplay is fully offline; a connection is only needed when you choose to watch a rewarded ad.',
        'Watching ads is always optional and capped at three per day — the full game is playable without ever watching one.',
        'We receive no personal data from Google about you — only aggregate, anonymous ad statistics.',
      ],
    },
    faq: [
      { question: 'Is MergeOrbit free?', answer: 'Yes, completely free to play. You can optionally watch a rewarded ad (up to three per day) for bonus coins — that’s the only monetization.' },
      { question: 'Are there ads?', answer: 'Only ads you start yourself: optional rewarded ads for bonus coins. No banners, no interstitials, nothing during gameplay. iOS asks your permission before any ad personalization, and declining keeps ads non-personalized.' },
      { question: 'Does it work offline?', answer: 'Yes — gameplay is fully offline. You only need a connection if you choose to watch a rewarded ad.' },
      { question: 'What are the three modes?', answer: 'Classic is the endless mode, Timed gives you three minutes to score as high as you can, and Target Ball challenges you to reach a specific tier.' },
      { question: 'Which devices are supported?', answer: 'MergeOrbit is designed for iPhone and requires iOS 26 or later.' },
      { question: 'How do I get support?', answer: 'Email support@amsterdamfuturelabs.com — we aim to reply within two business days.' },
    ],
  },
  {
    slug: 'hiitclub',
    name: 'HIITClub',
    tagline: 'The whole group. One screen. Live heart rate.',
    shortDescription:
      'An iPad app for group HIIT classes: pair Bluetooth heart-rate straps and coach every block with live BPM, zones and end-of-class report cards.',
    category: 'Health & Fitness',
    platform: 'iPad · iOS 16+',
    price: 'Free',
    status: 'coming-soon',
    accent: '#2EB861',
    accentSoft: 'rgba(46, 184, 97, 0.15)',
    icon: '/images/apps/hiitclub/icon.png',
    description: [
      'HIITClub turns an iPad into the command center of a group HIIT class. Pair each participant’s Bluetooth chest strap once, and every heart rate appears live on one big screen — color-coded by zone, updating in real time while the class works.',
      'The built-in timer engine drives structured blocks of three sets by four exercises, with 45-second work intervals, transitions and 3-2-1 countdowns with audio cues. Between blocks the group sees standings; after class every member gets a personal report card.',
      'Rosters and cumulative member stats live on the iPad, with optional Apple iCloud sync so two iPads can run classes independently and still share totals — no third-party servers involved.',
    ],
    screenshots: [
      { src: '/images/apps/hiitclub/screen-1.svg', alt: 'HIITClub group view with live heart-rate tiles per participant' },
      { src: '/images/apps/hiitclub/screen-2.svg', alt: 'HIITClub workout timer with countdown and current exercise' },
      { src: '/images/apps/hiitclub/screen-3.svg', alt: 'HIITClub end-of-class report card with zone breakdown' },
    ],
    features: [
      {
        icon: 'heart',
        title: 'Live group heart rate',
        description: 'Every participant’s BPM from their Bluetooth strap, live on one screen — with automatic reconnection if a strap drops.',
      },
      {
        icon: 'timer',
        title: 'Structured HIIT engine',
        description: 'Blocks of 3 sets × 4 exercises with 45-second work and 15-second transitions — configurable per class.',
      },
      {
        icon: 'chart',
        title: 'Color-coded zones',
        description: 'Per-person heart-rate zones make effort visible at a glance, for the coach and the whole group.',
      },
      {
        icon: 'sound',
        title: 'Countdowns & audio cues',
        description: '3-2-1-GO countdowns with sound keep the class moving without the coach watching a stopwatch.',
      },
      {
        icon: 'list',
        title: 'Standings & report cards',
        description: 'Group standings between blocks, and a personal end-of-class report card for every member.',
      },
      {
        icon: 'convert',
        title: 'Two iPads, one roster',
        description: 'Optional iCloud sync keeps members and cumulative stats consistent across two iPads — no third-party server.',
      },
    ],
    audience: [
      'HIIT and bootcamp instructors running live group classes',
      'Boutique studios that want a shared big-screen heart-rate display',
      'Coaches using Polar H10/H9, Verity Sense or any standard Bluetooth strap',
      'Studios with multiple trainers who need shared member stats',
    ],
    privacy: {
      summary: 'Heart-rate data stays on the iPad. No accounts, no analytics — optional sync runs through Apple’s iCloud only.',
      hasAds: false,
      dataCollected:
        'HIITClub collects no data for us. Participant names, heart-rate readings and class stats are stored on the iPad itself.',
      ads: 'HIITClub contains no advertising of any kind.',
      analytics: 'No analytics or tracking SDKs are included.',
      account: 'No account or sign-up is required. Optional cross-iPad sync uses the studio’s own iCloud — we never see the data.',
      storage: 'Rosters and stats are stored locally on the iPad; deleting the app deletes them. iCloud sync, when enabled, is end-to-end between the studio’s own devices.',
      updated: 'July 5, 2026',
      extraSections: [
        {
          title: 'Heart-rate & health data',
          body: 'Heart-rate readings from Bluetooth straps are processed live on the iPad to drive the class display, zones and report cards, and summarized results are stored locally per member. This data is never transmitted to us or to any third party — we run no servers and cannot see it. Studios using HIITClub are responsible for informing participants that their heart rate is shown on the shared class screen.',
        },
        {
          title: 'iCloud sync between iPads',
          body: 'Optionally, member rosters and cumulative stats can sync between a studio’s own iPads via Apple’s iCloud (key-value storage) under the studio’s own Apple account. The data stays within Apple’s infrastructure and the studio’s account; we have no access to it. Sync can be left off entirely, in which case everything stays on a single iPad.',
        },
      ],
      details: [
        'The only permission HIITClub asks for is Bluetooth, to read heart-rate straps during class.',
        'HIITClub contains no third-party SDKs — no analytics, no ads, no external services.',
      ],
    },
    faq: [
      { question: 'Which heart-rate straps work with HIITClub?', answer: 'Any strap that speaks the standard Bluetooth heart-rate profile — including Polar H10, H9 and Verity Sense.' },
      { question: 'Is there an iPhone version?', answer: 'No — HIITClub is designed for iPad in landscape, as a big shared screen for the whole class.' },
      { question: 'Does it need internet during class?', answer: 'No. Classes run fully offline; only the optional cross-iPad roster sync uses iCloud when a connection is available.' },
      { question: 'Where does the heart-rate data go?', answer: 'Nowhere. It is displayed live and summarized into local report cards on the iPad. We run no servers and never see it.' },
      { question: 'Is HIITClub free?', answer: 'Yes — HIITClub is free, with no ads and no in-app purchases.' },
      { question: 'How do I get support?', answer: 'Email support@amsterdamfuturelabs.com — we aim to reply within two business days.' },
    ],
  },
];

/** Look up an app by slug; throws at build time on a typo instead of letting
 * `undefined` surface as a cryptic error somewhere down the template. */
export function getApp(slug: string): AppMeta {
  const app = apps.find((a) => a.slug === slug);
  if (!app) {
    const known = apps.map((a) => a.slug).join(', ');
    throw new Error(`Unknown app slug "${slug}" — known slugs: ${known}`);
  }
  return app;
}
