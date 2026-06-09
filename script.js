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

// Testimonials carousel
const testimonialsTrack = document.getElementById('testimonialsTrack');
const testimonialDots = document.getElementById('testimonialDots');
const prevReview = document.querySelector('.carousel-btn-prev');
const nextReview = document.querySelector('.carousel-btn-next');

if (testimonialsTrack && testimonialDots && prevReview && nextReview) {
  const reviews = Array.from(testimonialsTrack.querySelectorAll('.testimonial'));
  let activeReview = Math.min(1, reviews.length - 1);
  let carouselLocked = false;

  reviews.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Show review ${i + 1}`);
    dot.addEventListener('click', () => setActiveReview(i));
    testimonialDots.appendChild(dot);
  });

  const dots = Array.from(testimonialDots.querySelectorAll('.carousel-dot'));

  function setActiveReview(index) {
    activeReview = (index + reviews.length) % reviews.length;

    reviews.forEach((review, i) => {
      const isActive = i === activeReview;
      review.classList.toggle('is-active', isActive);
      review.setAttribute('aria-hidden', String(!isActive));
    });

    dots.forEach((dot, i) => {
      const isActive = i === activeReview;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });

    const activeCard = reviews[activeReview];
    const trackRect = testimonialsTrack.getBoundingClientRect();
    const cardRect = activeCard.getBoundingClientRect();
    const offset = cardRect.left - trackRect.left;
    const centeredOffset = testimonialsTrack.parentElement.clientWidth / 2 - cardRect.width / 2;

    testimonialsTrack.style.transform = `translateX(${centeredOffset - offset}px)`;
  }

  function moveReview(direction) {
    if (carouselLocked) return;
    carouselLocked = true;
    setActiveReview(activeReview + direction);
    window.setTimeout(() => { carouselLocked = false; }, 430);
  }

  prevReview.addEventListener('click', () => moveReview(-1));
  nextReview.addEventListener('click', () => moveReview(1));

  testimonialsTrack.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moveReview(-1);
    if (e.key === 'ArrowRight') moveReview(1);
  });

  window.addEventListener('resize', () => setActiveReview(activeReview));
  window.addEventListener('load', () => setActiveReview(activeReview));
  setActiveReview(activeReview);
}

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
