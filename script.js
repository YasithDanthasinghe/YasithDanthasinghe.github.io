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
      title: "Key Addressing Concepts in Computer Networking",
      summary: "Understanding how devices communicate is the first step to mastering networking. From IP addresses to DNS and ports. It all connects.",
      tag: "Networking",
      date: "April 1, 2026",
      readTime: "5 min read",
      url: "https://www.linkedin.com/pulse/key-addressing-concepts-computer-networking-yasith-danthasinghe-q1yvc",
      image: "https://media.licdn.com/dms/image/v2/D5612AQF-Fmb2lXnRTA/article-cover_image-shrink_720_1280/B56Z1FYlCuJYAI-/0/1774985566585?e=1776902400&v=beta&t=0onF3l8R17NIhxWsc2N_EFEiB8irsDVRZVw3AA7RvEo"
    }
    
    ,{
    title: "What is SDN? Breaking Down Software-Defined Networking",
    summary: "Have you ever tried to manage a massive network of computers? In the traditional way, if you wanted to change how data moved through your network, you had to physically log in to every single switch and router to update them one by one. It was slow. It was expensive. It was prone to human error. So enter Software-Defined Networking (SDN).",
    tag: "Networking",
    date: "Nov 25, 2025",
    readTime: "5 min read",
    url: "https://www.linkedin.com/pulse/what-sdn-breaking-down-software-defined-networking-danthasinghe-ufkfc",
    image: "https://media.licdn.com/dms/image/v2/D5612AQH-ttfHHZEPSg/article-cover_image-shrink_720_1280/B56ZqxOTm1IsAI-/0/1763909952795?e=1776902400&v=beta&t=dttqtUdOSZq6Vw7mG_GEjuk28ihbriKcV6DxmKLBZh8"
    }
     
     ,{
    title: "Revolutionize Your Revision: How NotebookLM Becomes Every University Student's Ultimate Academic Ally",
    summary: "NotebookLM isn't just another chatbot; it's a game-changer for how we learn and research. It's already valued by tens of thousands of schools and students for study assistance, writing support, research, and interactive learning.",
    tag: "AI Tool",
    date: "Aug 9, 2025",
    readTime: "5 min read",
    url: "https://www.linkedin.com/pulse/revolutionize-your-revision-how-notebooklm-becomes-danthasinghe-srvpc",
    image: "https://media.licdn.com/dms/image/v2/D5612AQHbn3VQPdKVSQ/article-cover_image-shrink_720_1280/B56ZiP7b6GHcAQ-/0/1754761380554?e=1776902400&v=beta&t=zUPS7V5X_uSxFXYbGqdIWNsekFcnvc4Evy0D4emh9S4"
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
