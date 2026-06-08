// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Hamburger
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// Animate on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('in-view'); });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card').forEach((el, i) => {
  el.style.setProperty('--i', i);
  observer.observe(el);
});
document.querySelectorAll('.process-step').forEach((el, i) => {
  el.style.setProperty('--i', i);
  observer.observe(el);
});

// Form
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    e.target.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
    btn.style.display = 'none';
    document.getElementById('formSuccess').classList.add('visible');
  }, 900);
}
