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
    status: 'coming-soon',
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
    status: 'coming-soon',
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
    icon: '/images/apps/meal-planner/icon.svg',
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
];

export function getApp(slug: string): AppMeta | undefined {
  return apps.find((a) => a.slug === slug);
}
