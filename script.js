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

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', e => {
      if (!navbar.contains(e.target)) {
        navList.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Fade-in on scroll ---- */
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
    fadeTargets.forEach(el => el.classList.add('visible'));
  }

  /* ---- Stagger animation ---- */
  function applyStagger(selector, delay) {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.transitionDelay = (i * delay) + 'ms';
    });
  }

  applyStagger('.stat-card',      60);
  applyStagger('.skill-category', 80);
  applyStagger('.cert-card',      60);
  applyStagger('.contact-card',   60);

  /* ============================================
     BLOG — LinkedIn Articles
     ============================================ */

  /* =============================================
     ADD YOUR LINKEDIN ARTICLES HERE
     Newest article at the TOP of the list
     ============================================= */
  const linkedInArticles = [
    {
      title: "What Does a NOC Engineer Do at a Finance Company?",
      summary: "A behind-the-scenes look at day-to-day network operations — monitoring, incidents, and keeping the network alive 24/7.",
      tag: "NOC",
      date: "Mar 15, 2026",
      readTime: "5 min read",
      url: "https://www.linkedin.com/pulse/key-addressing-concepts-computer-networking-yasith-danthasinghe-q1yvc",
      image: ""
    }
    // TO ADD A NEW ARTICLE paste above this line:
    // ,{
    //   title: "Your New Article Title",
    //   summary: "Short description.",
    //   tag: "NOC",
    //   date: "Apr 1, 2026",
    //   readTime: "4 min read",
    //   url: "https://www.linkedin.com/pulse/your-url",
    //   image: ""
    // }
  ];

  /* ---- Render blog cards ---- */
  function renderBlogCards() {
    const grid = document.getElementById('blogGrid');
    if (!grid) return;

    if (linkedInArticles.length === 0) {
      grid.innerHTML = `
        <div class="blog-loading">
          <i class="fa-solid fa-pen-nib"></i>
          <span>Articles coming soon</span>
        </div>`;
      return;
    }

    grid.innerHTML = linkedInArticles.map(article => `
      <a href="${article.url}"
         target="_blank"
         rel="noopener noreferrer"
         class="blog-card"
         aria-label="Read: ${article.title} on LinkedIn">

        ${article.image
          ? `<img src="${article.image}"
                  alt="${article.title}"
                  class="blog-card-cover"
                  loading="lazy"
                  onerror="this.style.display='none'" />`
          : `<div class="blog-card-cover-placeholder">
               <i class="fa-brands fa-linkedin"></i>
             </div>`
        }

        <div class="blog-card-body">
          <div class="blog-card-meta">
            <span class="blog-card-tag">${article.tag}</span>
            <span class="blog-card-date">${article.date}</span>
          </div>
          <h3 class="blog-card-title">${article.title}</h3>
          <p class="blog-card-summary">${article.summary}</p>
        </div>

        <div class="blog-card-footer">
          <div class="blog-linkedin-badge">
            <i class="fa-brands fa-linkedin"></i>
            <span>${article.readTime}</span>
          </div>
          <span class="blog-card-read">
            Read on LinkedIn
            <i class="fa-solid fa-arrow-right"></i>
          </span>
        </div>

      </a>
    `).join('');
  }

  /* Run immediately — script loads at bottom of body so DOM is ready */
  renderBlogCards();

})();
