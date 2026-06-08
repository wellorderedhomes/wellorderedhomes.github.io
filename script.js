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
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const success = document.getElementById('formSuccess');
  const error = document.getElementById('formError');
  const originalText = btn.textContent;

  success.classList.remove('visible');
  error.classList.remove('visible');

  if (form.action.includes('REPLACE_WITH_FORM_ID')) {
    error.classList.add('visible');
    return;
  }

  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error('Form submission failed');

    form.reset();
    success.classList.add('visible');
  } catch (err) {
    error.classList.add('visible');
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
}
