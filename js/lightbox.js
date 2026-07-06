// Minimal vanilla-JS lightbox: open(images, startIndex) shows a full-size
// image with prev/next/keyboard navigation and close on click-outside/Esc.

(function () {
  let images = [];
  let currentIndex = 0;
  let root;

  function build() {
    root = document.createElement('div');
    root.className = 'lightbox';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.innerHTML = `
      <button class="lightbox__close" aria-label="Close">&times;</button>
      <button class="lightbox__prev" aria-label="Previous photo">&#10094;</button>
      <button class="lightbox__next" aria-label="Next photo">&#10095;</button>
      <figure class="lightbox__figure">
        <img class="lightbox__img" src="" alt="">
        <figcaption class="lightbox__caption">
          <span class="lightbox__caption-text"></span>
          <div class="lightbox__counter"></div>
        </figcaption>
      </figure>
    `;
    document.body.appendChild(root);

    root.querySelector('.lightbox__close').addEventListener('click', close);
    root.querySelector('.lightbox__prev').addEventListener('click', () => step(-1));
    root.querySelector('.lightbox__next').addEventListener('click', () => step(1));

    root.addEventListener('click', (e) => {
      if (e.target === root) close();
    });

    document.addEventListener('keydown', (e) => {
      if (!root.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }

  function render() {
    const photo = images[currentIndex];
    const img = root.querySelector('.lightbox__img');
    img.src = photo.full;
    img.alt = photo.alt;
    root.querySelector('.lightbox__caption-text').textContent = photo.alt;
    root.querySelector('.lightbox__counter').textContent =
      `${currentIndex + 1} / ${images.length}`;
  }

  function step(delta) {
    currentIndex = (currentIndex + delta + images.length) % images.length;
    render();
  }

  function open(imageList, startIndex) {
    if (!root) build();
    images = imageList;
    currentIndex = startIndex || 0;
    render();
    root.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (!root) return;
    root.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  window.ChinSpinLightbox = { open, close };
})();
