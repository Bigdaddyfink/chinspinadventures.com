// Mobile nav toggle, shared across all pages.

(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
})();

// Vimeo end-of-video replay overlay (requires player.vimeo.com/api/player.js).

(function () {
  if (typeof Vimeo === 'undefined') return;

  document.querySelectorAll('.vimeo-end-overlay').forEach((overlay) => {
    const iframe = overlay.previousElementSibling;
    if (!iframe || iframe.tagName !== 'IFRAME') return;
    const replayBtn = overlay.querySelector('.vimeo-replay-btn');
    const player = new Vimeo.Player(iframe);
    player.on('ended', () => overlay.classList.add('active'));
    replayBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
      player.play();
    });
  });
})();
