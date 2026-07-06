// Renders the photo album wall from GALLERY_IMAGES and wires up the lightbox.

(function () {
  const wall = document.getElementById('photoWall');
  if (!wall || typeof GALLERY_IMAGES === 'undefined') return;

  const frag = document.createDocumentFragment();

  GALLERY_IMAGES.forEach((photo, index) => {
    const item = document.createElement('a');
    item.href = photo.full;
    item.className = 'photo-wall__item';
    item.dataset.index = String(index);

    const img = document.createElement('img');
    img.src = photo.thumb;
    img.alt = photo.alt;
    img.loading = 'lazy';
    img.width = photo.w;
    img.height = photo.h;

    item.appendChild(img);
    frag.appendChild(item);
  });

  wall.appendChild(frag);

  wall.addEventListener('click', (e) => {
    const item = e.target.closest('.photo-wall__item');
    if (!item) return;
    e.preventDefault();
    window.ChinSpinLightbox.open(GALLERY_IMAGES, Number(item.dataset.index));
  });
})();
