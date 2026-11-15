// Interactive enhancements for Taylor's resume site.

document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  const printButton = document.querySelector('.print-button');
  printButton?.addEventListener('click', () => window.print());

  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#main-nav');

  const closeMenu = () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation');
    navigation?.classList.remove('is-open');
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navigation?.classList.toggle('is-open', !isOpen);
  });

  navigation?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Reveal sections gently as they enter the viewport; keep content visible if unsupported.
  const revealItems = document.querySelectorAll('.content-section, .education-card, .contact-band');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealItems.forEach((item) => item.classList.add('will-reveal'));
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  }
});
