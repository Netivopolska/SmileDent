// ── Nav scroll shadow
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

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

// ── Scroll animations (Intersection Observer)
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
