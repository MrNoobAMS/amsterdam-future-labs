// 3D "scroll phone" scene voor de homepage-hero.
//
// Dit bestand wordt LAZY geladen (dynamic import) vanuit ScrollPhone.astro,
// zodat three.js (~560 KB) in een eigen chunk terechtkomt die alleen wordt
// gedownload wanneer de scene ook echt gaat draaien. Bezoekers met
// prefers-reduced-motion of zonder WebGL laden hem helemaal niet.

import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

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
  // live --contact-zoom value rather than its own fallback transition.
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

  // The screen ("OLED") material — resolved once the model has loaded.
  let oledMat: THREE.MeshStandardMaterial | null = null;
  let currentFace = -1;

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
  }
  resize();
  window.addEventListener('resize', resize);

  // Fade the fallback out smoothly; it's hidden once the model loads.
  fallback?.style.setProperty('transition', 'opacity 0.5s ease');

  // ---------- Scroll-driven animation ----------
  // `pp` is a floating panel index: 0 when panel 0 is centered, 1 for panel
  // 1, etc. Derived straight from the section's viewport offset, so the
  // phone faces forward with the matching app exactly when a panel centers.
  const N = faces;
  let targetPP = 0;
  let smoothPP = 0;

  function computePP() {
    const rect = section.getBoundingClientRect();
    const pp = -rect.top / window.innerHeight;
    return Math.min(Math.max(pp, 0), N - 1);
  }

  function onScroll() {
    targetPP = computePP();
    if (hint) hint.classList.toggle('is-hidden', targetPP > 0.06);
    if (heroCta) heroCta.classList.toggle('is-hidden', targetPP > 0.03);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  smoothPP = targetPP;

  function render() {
    // Inertia: ease toward the target for weight / momentum.
    smoothPP += (targetPP - smoothPP) * 0.09;
    const pp = smoothPP;
    const norm = N > 1 ? pp / (N - 1) : 0; // 0..1 across the whole scroll

    // One full turn between adjacent panels → faces forward at each panel.
    phone.rotation.y = pp * Math.PI * 2;
    // Gentle secondary motion for depth.
    phone.rotation.x = Math.sin(pp * Math.PI) * 0.1;
    phone.rotation.z = Math.sin(pp * Math.PI * 0.5) * 0.05;
    // Translate down + drift as you scroll through the section.
    phone.position.y = 0.4 - norm * 1.0;
    phone.position.x = Math.sin(norm * Math.PI) * 0.45;

    // Ease the camera toward the phone when the contact form opens (zoom in).
    zoomEase += (contactZoom - zoomEase) * 0.08;
    camera.position.z = baseZ * (1 - zoomEase * 0.34);
    // Publish the zoom so the on-screen form can scale in lockstep with it.
    section.style.setProperty('--contact-zoom', zoomEase.toFixed(3));

    // Swap the screen texture at the nearest panel — this lands on the
    // half-step where the phone faces away, so the change stays hidden.
    const face = Math.round(pp);
    const screenTex = face !== currentFace ? textures[face] : undefined;
    if (screenTex) {
      currentFace = face;
      if (oledMat) {
        oledMat.map = screenTex;
        oledMat.emissiveMap = screenTex;
        oledMat.needsUpdate = true;
      }
    }

    renderer.render(scene, camera);
    rafId = stageVisible ? requestAnimationFrame(render) : 0;
  }

  // Only run the loop while the hero is on screen — otherwise it keeps
  // burning GPU/battery for the rest of the visit after scrolling past.
  let rafId = 0;
  let stageVisible = false;
  const stageObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !stageVisible) {
      stageVisible = true;
      rafId = requestAnimationFrame(render);
    } else if (!entry.isIntersecting && stageVisible) {
      stageVisible = false;
      cancelAnimationFrame(rafId);
    }
  });
  stageObserver.observe(section);

  return true;
}
