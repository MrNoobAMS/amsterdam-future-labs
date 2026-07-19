// 3D "scroll phone" scene voor de homepage-hero.
//
// Dit bestand wordt LAZY geladen (dynamic import) vanuit ScrollPhone.astro,
// zodat three.js (~560 KB) in een eigen chunk terechtkomt die alleen wordt
// gedownload wanneer de scene ook echt gaat draaien. Bezoekers met
// prefers-reduced-motion of zonder WebGL laden hem helemaal niet.
//
// De choreografie (hero → één rotatie → zoom de display in → fullscreen →
// zoom uit → app-showcase) leeft in scroll-timeline.ts; dit bestand bouwt de
// scene, voert de timeline uit en projecteert het scherm naar CSS-variabelen
// zodat de DOM-laag (fullscreen slides + contactformulier) er pixel-precies
// aan vast zit.

import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { boundaries, compute } from './scroll-timeline';

// Context creation throws on browsers/devices without WebGL — treat that the
// same as reduced motion (static fallback image + release the preloader)
// instead of letting the whole script die with the preloader stuck.
function createRenderer(el: HTMLCanvasElement): THREE.WebGLRenderer | null {
  try {
    return new THREE.WebGLRenderer({ canvas: el, antialias: true, alpha: true });
  } catch {
    return null;
  }
}

/**
 * Start de 3D-scene. Geeft `false` terug als er geen WebGL beschikbaar is —
 * de aanroeper toont dan de statische fallback en geeft de preloader vrij.
 */
export function initPhoneScene(
  section: HTMLElement,
  canvas: HTMLCanvasElement,
  fallback: HTMLElement | null,
  hint: HTMLElement | null,
  heroCta: HTMLElement | null,
): boolean {
  const maybeRenderer = createRenderer(canvas);
  if (!maybeRenderer) return false;
  // Alias met non-nullable type: geneste function-declaraties erven de
  // null-narrowing van de guard hierboven niet.
  const renderer = maybeRenderer;

  const screens: string[] = JSON.parse(section.dataset.screens || '[]');
  const faces = screens.length;
  const slideCount = parseInt(section.dataset.fsSlides || '0', 10);
  // Face 0 is the company/hero screen; the rest are the showcase apps.
  const B = boundaries(slideCount, faces - 1);

  // ---------- Renderer / scene / camera ----------
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.98;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  // Camera distance + contact-form zoom. `baseZ` is the resting distance
  // (set in resize); `contactZoom` is the 0→1 target the render loop eases
  // toward, pulling the camera closer when the contact form is open.
  // Declared here (before resize runs) to avoid a temporal-dead-zone error.
  let baseZ = 9;
  let contactZoom = 0;
  let zoomEase = 0;
  // Tell the CSS that WebGL is driving the phone, so the form scales from the
  // live --contact-zoom value rather than its own fallback transition — and
  // so the scroll spacers expand to the full cinematic length.
  section.dataset.phoneLive = 'true';
  window.addEventListener('contact:open', () => { contactZoom = 1; });
  window.addEventListener('contact:close', () => { contactZoom = 0; });

  // Image-based lighting: a soft room env drives realistic reflections on
  // the titanium frame and glass — the difference between a plastic toy and
  // a phone render.
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  // ---------- Accent lighting (on top of the IBL fill) ----------
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(4, 6, 8);
  scene.add(key);
  const rimA = new THREE.DirectionalLight(0x6366f1, 1.6);
  rimA.position.set(-6, 2, 3);
  scene.add(rimA);
  const rimB = new THREE.DirectionalLight(0x22d3ee, 1.3);
  rimB.position.set(5, -4, -4);
  scene.add(rimB);

  // ---------- Phone: real iPhone 17 Pro Max model (GLB) ----------
  const phone = new THREE.Group();
  scene.add(phone);

  // App-screen textures shown on the OLED. flipY=false to match glTF UVs.
  // Loaded lazily: only the first competes with the GLB download; the rest
  // start once the model is in, well before the user can scroll to them.
  const loader = new THREE.TextureLoader();
  const textures: (THREE.Texture | undefined)[] = [];
  function loadScreen(i: number) {
    if (textures[i] || !screens[i]) return;
    const t = loader.load(screens[i]);
    t.colorSpace = THREE.SRGBColorSpace;
    t.flipY = false;
    // The OLED UVs read mirrored for our textures — flip horizontally.
    t.wrapS = THREE.RepeatWrapping;
    t.repeat.x = -1;
    t.offset.x = 1;
    t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    textures[i] = t;
  }
  loadScreen(0);

  // The screen ("OLED") mesh + material — resolved once the model has loaded.
  let oledMat: THREE.MeshStandardMaterial | null = null;
  let oledMesh: THREE.Mesh | null = null;
  let currentFace = -1;

  // Display size in world units (measured from the OLED mesh at rest pose),
  // used to compute how far the camera must dolly to fill the viewport.
  let screenW = 0;
  let screenH = 0;
  let screenZ = 0; // world z of the display surface at rest pose
  let fullZ = 1; // camera z at zoom = 1 (recomputed on resize)

  function computeFullZ() {
    if (!screenW) return;
    const tanY = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    // Distance at which the display covers the viewport in BOTH dimensions,
    // then push 18% past it so bezels and Dynamic Island are fully off-screen
    // before the DOM layer takes over.
    const dFill = Math.min((screenW / 2) / (tanY * camera.aspect), (screenH / 2) / tanY);
    fullZ = screenZ + Math.max(dFill * 0.82, camera.near + 0.2);
  }

  const gltfLoader = new GLTFLoader();
  // The GLB is meshopt-compressed (EXT_meshopt_compression), ~2 MB instead
  // of the 24 MB uncompressed export.
  gltfLoader.setMeshoptDecoder(MeshoptDecoder);
  gltfLoader.load(
    '/models/iphone-17-pro-max.glb',
    (gltf) => {
    const model = gltf.scene;

    // Light the OLED like a display and prime it with the first app.
    model.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat && mat.name === 'OLED') {
        oledMesh = mesh;
        oledMat = mat;
        mat.map = textures[0] ?? null;
        mat.emissive = new THREE.Color(0xffffff);
        mat.emissiveMap = textures[0] ?? null;
        mat.emissiveIntensity = 1;
        mat.toneMapped = false;
        mat.needsUpdate = true;
      }
    });

    // The model's screen faces -Z by default; turn it to face the camera at
    // rotation 0 so panels show the display, not the back.
    model.rotation.y = Math.PI;

    // Normalize: scale to a consistent height, then recentre at the origin
    // so the scroll rotation spins around the phone's middle.
    const pre = new THREE.Box3().setFromObject(model);
    const size = pre.getSize(new THREE.Vector3());
    model.scale.setScalar(3.9 / size.y);
    const post = new THREE.Box3().setFromObject(model);
    model.position.sub(post.getCenter(new THREE.Vector3()));

    phone.add(model);

    // Measure the display at rest pose (group at identity) for the zoom
    // target; the user may already have scrolled, so reset → measure → the
    // next render frame restores the live pose anyway.
    if (oledMesh) {
      phone.rotation.set(0, 0, 0);
      phone.position.set(0, 0, 0);
      phone.updateWorldMatrix(true, true);
      const box = new THREE.Box3().setFromObject(oledMesh);
      screenW = box.max.x - box.min.x;
      screenH = box.max.y - box.min.y;
      screenZ = box.max.z;
      computeFullZ();
    }

    currentFace = -1; // force a screen refresh on the next frame
    // Model is in — fetch the remaining screen textures in the background.
    for (let i = 1; i < faces; i++) loadScreen(i);
    fallback?.style.setProperty('opacity', '0');
    window.dispatchEvent(new Event('phone:ready'));
    },
    (e) => {
      // Feed download progress to the preloader bar.
      if (e.total) {
        window.dispatchEvent(new CustomEvent('phone:progress', { detail: e.loaded / e.total }));
      }
    },
    () => {
      // On error, keep the fallback and release the loader.
      window.dispatchEvent(new Event('phone:ready'));
    }
  );

  // ---------- Resize ----------
  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // Frame the phone a touch smaller on narrow screens.
    baseZ = w / h < 0.7 ? 11.5 : 9;
    computeFullZ();
  }
  resize();
  window.addEventListener('resize', resize);

  // Fade the fallback out smoothly; it's hidden once the model loads.
  fallback?.style.setProperty('transition', 'opacity 0.5s ease');

  // ---------- Scroll-driven animation ----------
  // `P` counts viewports scrolled into the section; the timeline module maps
  // it to phone pose, camera zoom and DOM-layer state. Derived straight from
  // the section's viewport offset, so scrolling up reverses everything and
  // pausing/resuming the loop continues from the exact same progress.
  let targetP = 0;
  let smoothP = 0;

  function computeP() {
    const rect = section.getBoundingClientRect();
    const p = -rect.top / window.innerHeight;
    return Math.min(Math.max(p, 0), B.end);
  }

  function onScroll() {
    targetP = computeP();
    if (hint) hint.classList.toggle('is-hidden', targetP > 0.06);
    if (heroCta) heroCta.classList.toggle('is-hidden', targetP > 0.03);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  smoothP = targetP;

  // Screen → viewport projection scratch objects (no per-frame allocations).
  const projBox = new THREE.Box3();
  const projA = new THREE.Vector3();
  const projB = new THREE.Vector3();
  const layerStyle = section.style;

  function render() {
    // Inertia: ease toward the target for weight / momentum.
    smoothP += (targetP - smoothP) * 0.09;
    const tl = compute(smoothP, B, faces - 1);

    phone.rotation.set(tl.rotX, tl.rotY, tl.rotZ);
    phone.position.set(tl.posX, tl.posY, 0);

    // Camera: scroll-driven dolly into the display, composed with the
    // contact-form zoom (which only plays at the top, where tl.zoom is 0).
    zoomEase += (contactZoom - zoomEase) * 0.08;
    camera.position.z =
      (baseZ + (fullZ - baseZ) * tl.zoom) * (1 - zoomEase * 0.34);
    // Publish the zoom so the on-screen form can scale in lockstep with it.
    layerStyle.setProperty('--contact-zoom', zoomEase.toFixed(3));

    // Swap the OLED texture — the timeline only changes `face` while the
    // screen is hidden (facing away, or covered by the fullscreen layer).
    const screenTex = tl.face !== currentFace ? textures[tl.face] : undefined;
    if (screenTex) {
      currentFace = tl.face;
      if (oledMat) {
        oledMat.map = screenTex;
        oledMat.emissiveMap = screenTex;
        oledMat.needsUpdate = true;
      }
    }

    // ---------- DOM screen layer sync ----------
    // During the zoom the phone is exactly forward, so the display projects
    // to an axis-aligned rectangle; publish it as CSS vars and the fullscreen
    // layer (ScrollPhone.astro) stays glued to the glass, both directions.
    let covered = false;
    if (tl.zoom > 0.3 && oledMesh) {
      camera.updateMatrixWorld();
      projBox.setFromObject(oledMesh);
      projA.set(projBox.min.x, projBox.min.y, projBox.max.z).project(camera);
      projB.set(projBox.max.x, projBox.max.y, projBox.max.z).project(camera);
      const vw = canvas.clientWidth;
      const vh = canvas.clientHeight;
      const x1 = (projA.x * 0.5 + 0.5) * vw;
      const x2 = (projB.x * 0.5 + 0.5) * vw;
      const y1 = (-projA.y * 0.5 + 0.5) * vh; // bottom edge in px
      const y2 = (-projB.y * 0.5 + 0.5) * vh; // top edge in px
      const w = Math.abs(x2 - x1);
      const h = Math.abs(y1 - y2);
      layerStyle.setProperty('--screen-w', w.toFixed(1));
      layerStyle.setProperty('--screen-h', h.toFixed(1));
      layerStyle.setProperty('--screen-cx', ((x1 + x2) / 2).toFixed(1));
      layerStyle.setProperty('--screen-cy', ((y1 + y2) / 2).toFixed(1));
      // Display corner radius ≈ 5% of its width; corners scroll off-screen
      // naturally once the rect outgrows the viewport.
      layerStyle.setProperty('--screen-r', (w * 0.05).toFixed(1));
      // Content is authored at viewport size and scaled down with the glass;
      // it lands at exactly 1:1 the moment the display fills the width.
      layerStyle.setProperty('--screen-k', Math.min(w / vw, 1).toFixed(4));
      layerStyle.setProperty('--screen-o', tl.layerOpacity.toFixed(3));
      layerStyle.setProperty(
        '--fs-shift',
        (-tl.fs * Math.max(slideCount - 1, 0) * vh).toFixed(1)
      );
      covered = tl.layerOpacity >= 1 && w >= vw && h >= vh;
    } else {
      layerStyle.setProperty('--screen-o', '0');
    }

    // While the DOM layer fully covers the viewport there is nothing of the
    // 3D scene to see — skip the GPU work but keep the loop ticking so the
    // scroll inertia and CSS vars stay live for the reverse journey.
    if (!covered) renderer.render(scene, camera);
    rafId = stageVisible ? requestAnimationFrame(render) : 0;
  }

  // Only run the loop while the hero is on screen — otherwise it keeps
  // burning GPU/battery for the rest of the visit after scrolling past.
  // On exit, snap the smoothed progress to the real scroll position and draw
  // one last frame: the inertia may still be mid-journey (e.g. after a fast
  // scroll out of the fullscreen stretch), and without this the fixed screen
  // layer could freeze at a stale opacity over the content below. Re-entry
  // resumes from this exact progress — never a restart.
  let rafId = 0;
  let stageVisible = false;
  const stageObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !stageVisible) {
      stageVisible = true;
      rafId = requestAnimationFrame(render);
    } else if (!entry.isIntersecting && stageVisible) {
      stageVisible = false;
      cancelAnimationFrame(rafId);
      targetP = computeP();
      smoothP = targetP;
      render();
    }
  });
  stageObserver.observe(section);

  return true;
}
