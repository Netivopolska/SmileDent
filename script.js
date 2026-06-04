// ── Nav scroll shadow (throttled)
const navbar = document.getElementById('navbar');
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// ── Modal
const overlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', () => overlay.classList.add('open'));
});
modalClose.addEventListener('click', () => overlay.classList.remove('open'));
overlay.addEventListener('click', e => {
  if (e.target === overlay) overlay.classList.remove('open');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') overlay.classList.remove('open');
});

// ── Mobile nav
const mobileNav = document.getElementById('mobileNav');
document.getElementById('hamburger').addEventListener('click', () => mobileNav.classList.add('open'));
document.getElementById('mobileClose').addEventListener('click', () => mobileNav.classList.remove('open'));
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// ── Scroll animations (tylko desktop)
const isMobile = window.innerWidth <= 768;

if (!isMobile) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(
    '.stat-item, .card, .doctor-card, .price-row, .fade-up'
  ).forEach(el => observer.observe(el));
} else {
  // Na mobile od razu pokaż wszystko
  document.querySelectorAll(
    '.stat-item, .card, .doctor-card, .price-row, .fade-up'
  ).forEach(el => el.classList.add('visible'));
}
