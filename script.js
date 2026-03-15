/* =============================================
   YASITH DANTHASINGHE — NOC ENGINEER PORTFOLIO
   script.js
   ============================================= */

(function () {
  'use strict';

  /* ---- Navbar: scroll shadow + active link ---- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  function updateNavbar() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  function updateActiveLink() {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }

  window.addEventListener('scroll', () => {
    updateNavbar();
    updateActiveLink();
  }, { passive: true });

  updateNavbar();

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const navList   = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a link is clicked
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      navList.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---- Fade-in on scroll (IntersectionObserver) ---- */
  const fadeTargets = document.querySelectorAll(
    '.stat-card, .skill-category, .timeline-card, .project-card, ' +
    '.cert-card, .contact-card, .about-text, .about-stats, ' +
    '.blog-coming-soon, .section-header'
  );

  fadeTargets.forEach(el => el.classList.add('fade-in'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    fadeTargets.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    fadeTargets.forEach(el => el.classList.add('visible'));
  }

  /* ---- Stagger animation delay for grid cards ---- */
  function applyStagger(selector, delay) {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.transitionDelay = (i * delay) + 'ms';
    });
  }

  applyStagger('.stat-card',    60);
  applyStagger('.skill-category', 80);
  applyStagger('.cert-card',    60);
  applyStagger('.contact-card', 60);

})();
