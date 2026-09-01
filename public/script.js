const GALLERY_IMAGES = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
  "/images/6.jpg",
  "/images/7.jpg",
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

  function setVisibleLayer(index) {
    layers.forEach((layer, i) => {
      layer.classList.toggle("is-visible", i === index);
      layer.style.transition = "";
    });
  }

  function showInitialImage() {
    layers[activeLayer].src = GALLERY_IMAGES[currentIndex];
    layers[activeLayer].alt = `Gallery image ${currentIndex + 1}`;
    layers[1 - activeLayer].alt = "";
    layers[1 - activeLayer].setAttribute("aria-hidden", "true");
    layers[activeLayer].removeAttribute("aria-hidden");
    setVisibleLayer(activeLayer);
  }

  function transitionToNext() {
    const nextIndex = pickRandomIndex(currentIndex);
    const current = layers[activeLayer];
    const incoming = layers[1 - activeLayer];

    incoming.src = GALLERY_IMAGES[nextIndex];
    incoming.alt = `Gallery image ${nextIndex + 1}`;
    incoming.removeAttribute("aria-hidden");
    current.setAttribute("aria-hidden", "true");

    incoming.classList.remove("is-visible");
    incoming.style.transition = "none";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        incoming.style.transition = `opacity ${FADE_MS}ms ease-in-out`;
        incoming.classList.add("is-visible");
      });
    });

    window.setTimeout(() => {
      current.classList.remove("is-visible");
      current.style.transition = "";
      activeLayer = 1 - activeLayer;
      currentIndex = nextIndex;
    }, FADE_MS);
  }

  showInitialImage();
  window.setInterval(transitionToNext, CYCLE_MS);
}

initGallery();
