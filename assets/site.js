const button = document.querySelector('.menu');
const nav = document.querySelector('.nav');
const mobile = matchMedia('(max-width: 760px)');
function setMenu(open) {
  nav.hidden = mobile.matches && !open;
  button.setAttribute('aria-expanded', String(open));
  button.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
}
button.addEventListener('click', () => setMenu(nav.hidden));
button.closest('.header').addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !mobile.matches || nav.hidden) return;
  setMenu(false);
  button.focus();
});
mobile.addEventListener('change', () => setMenu(false));
setMenu(false);

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const reveal = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('scroll-reveal');
      reveal.unobserve(entry.target);
    }
  }, { threshold: 0.18 });

  const sections = '.section .card, .section .doctor-card, .section .visit-steps li, '
    + '.section .steps article, .section .faq details, .section .prose, .cta .wrap';
  document.querySelectorAll(sections).forEach((section) => reveal.observe(section));
}
