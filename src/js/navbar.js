export function initNavbar() {
  const navbar = document.querySelector('.site-navbar');
  const toggler = document.getElementById('navToggler');
  const menu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.site-navbar .nav-link');
  const SCROLL_THRESHOLD = 50;

  function handleScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  }

  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Mobile menu toggle
  toggler.addEventListener('click', () => {
    const isExpanded = toggler.getAttribute('aria-expanded') === 'true';
    toggler.classList.toggle('active');
    menu.classList.toggle('show');
    toggler.setAttribute('aria-expanded', String(!isExpanded));
  });

  // Close mobile menu on link click
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggler.classList.remove('active');
      menu.classList.remove('show');
      toggler.setAttribute('aria-expanded', 'false');
    });
  });

  // Throttled scroll listener
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  handleScroll();
}
