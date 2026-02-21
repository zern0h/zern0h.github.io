import '../scss/main.scss';

import { initNavbar } from './navbar.js';
import { initThemeToggle } from './theme-toggle.js';
import { initPortfolioFilter } from './portfolio-filter.js';
import { initScrollReveal } from './scroll-reveal.js';
import { initSmoothScroll } from './smooth-scroll.js';
import { initTypewriter } from './typewriter.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initThemeToggle();
  initPortfolioFilter();
  initScrollReveal();
  initSmoothScroll();
  initTypewriter();
  initLazyIframes();
  initCopyEmail();

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

function initCopyEmail() {
  const btn = document.getElementById('copyEmailBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    navigator.clipboard.writeText('adegbite.gbola@gmail.com').then(() => {
      btn.classList.add('is-copied');
      setTimeout(() => btn.classList.remove('is-copied'), 2000);
    });
  });
}

function initLazyIframes() {
  const iframes = document.querySelectorAll('iframe[data-src]');
  if (!iframes.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        iframe.src = iframe.dataset.src;
        iframe.removeAttribute('data-src');
        observer.unobserve(iframe);
      }
    });
  }, { rootMargin: '200px' });

  iframes.forEach((iframe) => observer.observe(iframe));
}
