// Scroll timeline for the homepage phone experience.
//
// Single source of truth for the cinematic sequence:
//
//   hero hold → one full rotation → zoom into the screen → fullscreen
//   "inside the phone" slides → zoom back out → classic app showcase
//
// Everything is a pure function of scroll progress P (viewports scrolled into
// the section), so scrolling up reverses the entire experience exactly.
// Imported both by ScrollPhone.astro (build time, to size the scroll spacers)
// and by phone-scene.ts (runtime, to drive the 3D scene + DOM screen layer).

/** Scroll length of each segment, in viewport heights. */
export const SEG = {
  /** Hero rests before the rotation starts, so the opening reads calmly. */
  hold: 0.5,
  /** One complete 360° rotation (Apple-reveal pace). */
  rotate: 1.6,
  /** Camera dolly into the display until only the screen remains. */
  zoomIn: 1.4,
  /** Reverse dolly: the phone frame re-emerges around the display. */
  zoomOut: 1.2,
} as const;

export interface Boundaries {
  rotStart: number;
  rotEnd: number;
  /** Fullscreen slides start (zoom-in complete). */
  fsStart: number;
  fsEnd: number;
  /** Midpoint of the fullscreen stretch — where the hidden texture swap happens. */
  fsMid: number;
  /** First app panel of the showcase is centered here. */
  showStart: number;
  /** Last app panel centered = end of the section's scroll range. */
  end: number;
}

/** Segment boundaries in viewports, for `slideCount` fullscreen slides and
 *  `appCount` showcase apps. */
export function boundaries(slideCount: number, appCount: number): Boundaries {
  const rotStart = SEG.hold;
  const rotEnd = rotStart + SEG.rotate;
  const fsStart = rotEnd + SEG.zoomIn;
  const fsEnd = fsStart + Math.max(slideCount - 1, 0);
  const showStart = fsEnd + SEG.zoomOut;
  return {
    rotStart,
    rotEnd,
    fsStart,
    fsEnd,
    fsMid: (fsStart + fsEnd) / 2,
    showStart,
    end: showStart + Math.max(appCount - 1, 0),
  };
}

/** Smoothstep: gentle ease-in-out, C1-continuous at both ends — the premium
 *  "settle" at the end of the rotation and zoom comes from this. */
export function ease(t: number): number {
  const x = Math.min(Math.max(t, 0), 1);
  return x * x * (3 - 2 * x);
}

export interface TimelineState {
  rotX: number;
  rotY: number;
  rotZ: number;
  posX: number;
  posY: number;
  /** 0 = resting camera, 1 = fully inside the display. */
  zoom: number;
  /** Fullscreen slide progress 0..1 across all slides. */
  fs: number;
  /** Opacity of the DOM screen layer (crossfades over the WebGL screen). */
  layerOpacity: number;
  /** Which screen texture should be on the OLED right now. */
  face: number;
  /** Showcase panel float index (0..appCount-1), for parity with the old code. */
  sp: number;
}

export function compute(P: number, b: Boundaries, appCount: number): TimelineState {
  // Rotation: exactly one eased turn; the sway terms are sin(rπ)-shaped so
  // they are zero at both ends and the phone finishes perfectly forward.
  const r = ease((P - b.rotStart) / SEG.rotate);

  // Zoom composes as min(in, out): both are 1 across the fullscreen stretch,
  // so the same curve plays forward on the way in and mirrored on the way out.
  const zi = ease((P - b.rotEnd) / SEG.zoomIn);
  const zo = 1 - ease((P - b.fsEnd) / SEG.zoomOut);
  const zoom = Math.min(zi, zo);

  const fsSpan = b.fsEnd - b.fsStart;
  const fs = fsSpan > 0 ? Math.min(Math.max((P - b.fsStart) / fsSpan, 0), 1) : 0;

  // Showcase: same mapping as the original scene — one full turn per panel,
  // gentle x/z sway, slow downward drift.
  const sp = Math.min(Math.max(P - b.showStart, 0), Math.max(appCount - 1, 0));
  const spN = appCount > 1 ? sp / (appCount - 1) : 0;

  // Texture swaps always happen while the screen is hidden: the company →
  // first-app swap under the fullscreen DOM layer, the per-app swaps while
  // the phone faces away (round() lands on the half-turn).
  const face = P < b.fsMid ? 0 : P < b.showStart ? 1 : 1 + Math.round(sp);

  return {
    rotY: r * Math.PI * 2 + sp * Math.PI * 2,
    rotX: Math.sin(r * Math.PI) * 0.12 + Math.sin(sp * Math.PI) * 0.1,
    rotZ: Math.sin(r * Math.PI) * 0.05 + Math.sin(spN * Math.PI) * 0.04,
    posX: Math.sin(spN * Math.PI) * 0.45,
    posY: 0.4 * (1 - r) - spN * 0.6,
    zoom,
    fs,
    // The DOM layer fades in over the WebGL screen during the last stretch of
    // the zoom (and back out symmetrically), while both show the same dark
    // background — that overlap is what makes the "camera enters the phone"
    // moment cut-free in both directions.
    layerOpacity: ease((zoom - 0.55) / 0.3),
    face,
    sp,
  };
}
