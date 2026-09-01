const GALLERY_IMAGES = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
  "/images/6.jpg",
  "/images/7.jpg",
  "/images/8.jpg",
  "/images/9.jpg",
  "/images/10.jpg",
  "/images/11.jpg",
  "/images/12.jpg",
  "/images/13.jpg",
];

const FADE_MS = 2000;
const HOLD_MS = 3000;
const CYCLE_MS = FADE_MS + HOLD_MS;

function pickRandomIndex(exclude) {
  if (GALLERY_IMAGES.length <= 1) {
    return 0;
  }

  let next = exclude;
  while (next === exclude) {
    next = Math.floor(Math.random() * GALLERY_IMAGES.length);
  }
  return next;
}

function initGallery() {
  const layerA = document.getElementById("gallery-layer-a");
  const layerB = document.getElementById("gallery-layer-b");

  if (!layerA || !layerB) {
    return;
  }

  const layers = [layerA, layerB];
  let activeLayer = 0;
  let currentIndex = pickRandomIndex(-1);

  GALLERY_IMAGES.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  function active() {
    return layers[activeLayer];
  }

  function inactive() {
    return layers[1 - activeLayer];
  }

  function resetLayer(layer, { opacity, zIndex }) {
    layer.style.transition = "none";
    layer.style.opacity = String(opacity);
    layer.style.zIndex = String(zIndex);
  }

  function showInitialImage() {
    const visible = active();
    const hidden = inactive();

    visible.src = GALLERY_IMAGES[currentIndex];
    visible.alt = `Gallery image ${currentIndex + 1}`;
    hidden.alt = "";
    hidden.setAttribute("aria-hidden", "true");
    visible.removeAttribute("aria-hidden");

    resetLayer(visible, { opacity: 1, zIndex: 2 });
    resetLayer(hidden, { opacity: 0, zIndex: 1 });
  }

  function transitionToNext() {
    const nextIndex = pickRandomIndex(currentIndex);
    const current = active();
    const incoming = inactive();

    incoming.src = GALLERY_IMAGES[nextIndex];
    incoming.alt = `Gallery image ${nextIndex + 1}`;
    incoming.removeAttribute("aria-hidden");
    current.setAttribute("aria-hidden", "true");

    resetLayer(incoming, { opacity: 0, zIndex: 2 });
    resetLayer(current, { opacity: 1, zIndex: 1 });

    // Force the browser to apply opacity 0 before starting the fade.
    void incoming.offsetHeight;

    incoming.style.transition = `opacity ${FADE_MS}ms ease-in-out`;
    incoming.style.opacity = "1";

    window.setTimeout(() => {
      resetLayer(current, { opacity: 0, zIndex: 1 });
      activeLayer = 1 - activeLayer;
      currentIndex = nextIndex;
    }, FADE_MS);
  }

  showInitialImage();
  window.setInterval(transitionToNext, CYCLE_MS);
}

initGallery();
