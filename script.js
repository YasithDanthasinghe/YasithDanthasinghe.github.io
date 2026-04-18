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

   /* ---- Typing animation ---- */
  const tagline = document.querySelector('.hero-tagline');
  if (tagline) {
    const text = tagline.textContent.trim();
    tagline.textContent = '';
    tagline.style.minHeight = '1.4em';
    let i = 0;
    const type = () => {
      if (i < text.length) {
        tagline.textContent += text[i];
        i++;
        setTimeout(type, 65);
      }
    };
    setTimeout(type, 1000);
  }

   /* ---- Dark mode toggle ---- */
const darkToggle = document.getElementById('darkToggle');

if (darkToggle) {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    darkToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    darkToggle.innerHTML = isDark
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem('darkMode', String(isDark));
  });
}

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


  /* =============================================
     BLOG — LinkedIn Articles
     ADD YOUR LINKEDIN ARTICLES HERE
     Newest article at the TOP of the list
     ============================================= */
  const linkedInArticles = [ 

      {
      title: "Understanding the “Golden SAML” Threat in Simple Terms",
      summary: "Golden SAML” style attack is actively targeting FortiGate firewalls, allowing attackers to log in as admins without passwords",
      tag: "CyberSecurity",
      date: "April 18, 2026",
      readTime: "4 min read",
      url: "https://www.linkedin.com/pulse/understanding-golden-saml-threat-simple-terms-yasith-danthasinghe-u80dc",
      image: "https://media.licdn.com/dms/image/v2/D5612AQFqbiJiCSk0XQ/article-cover_image-shrink_720_1280/B56Z2fDnnNK4AI-/0/1776490020883?e=1778112000&v=beta&t=2gfeGpxVyiBuz_-fWifoYW_7df_iSFGWO5Qt43OAydI"
    },
     
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
    summary: "Managing large networks manually is slow, costly, and error-prone—SDN changes that with centralized, intelligent control.",
    tag: "Networking",
    date: "Nov 25, 2025",
    readTime: "5 min read",
    url: "https://www.linkedin.com/pulse/what-sdn-breaking-down-software-defined-networking-danthasinghe-ufkfc",
    image: "https://media.licdn.com/dms/image/v2/D5612AQH-ttfHHZEPSg/article-cover_image-shrink_720_1280/B56ZqxOTm1IsAI-/0/1763909952795?e=1776902400&v=beta&t=dttqtUdOSZq6Vw7mG_GEjuk28ihbriKcV6DxmKLBZh8"
    }
     
     ,{
    title: "Revolutionize Your Revision: How NotebookLM Becomes Every University Student's Ultimate Academic Ally",
    summary: "NotebookLM is transforming how we learn and research with powerful AI-driven study and writing support.",
    tag: "AI Tool",
    date: "Aug 9, 2025",
    readTime: "5 min read",
    url: "https://www.linkedin.com/pulse/revolutionize-your-revision-how-notebooklm-becomes-danthasinghe-srvpc",
    image: "https://media.licdn.com/dms/image/v2/D5612AQHbn3VQPdKVSQ/article-cover_image-shrink_720_1280/B56ZiP7b6GHcAQ-/0/1754761380554?e=1776902400&v=beta&t=zUPS7V5X_uSxFXYbGqdIWNsekFcnvc4Evy0D4emh9S4"
     }

   ,{
    title: "AI Prompt Engineering for Students: Mastering Academic Success Through Effective AI Communication",
    summary: "Prompt engineering is the art of guiding AI with precise instructions to produce accurate and meaningful results.",
    tag: "AI Prompt Engineering",
    date: "July 29, 2025",
    readTime: "10 min read",
    url: "https://www.linkedin.com/pulse/ai-prompt-engineering-students-mastering-academic-yasith-danthasinghe-ztc6c",
    image: "https://media.licdn.com/dms/image/v2/D5612AQFXZEPAAWw79Q/article-cover_image-shrink_720_1280/B56ZhW2OLYHMAM-/0/1753803713304?e=1776902400&v=beta&t=dDXVeSQou0otbzKgGoc-u1UpStLF8_HlJ_6_xX52kLU"
     }

   ,{
    title: "The AI Revolution: 10 Game-Changing Tools Every Network Engineer Must Master in 2025",
    summary:"AI in network engineering can instantly detect threats, provide root cause analysis, suggest fixes, and predict business impact—turning hours of manual work into seconds.",
    tag: "AI Tool",
    date: "July 28, 2025",
    readTime: "10 min read",
    url: "https://www.linkedin.com/pulse/ai-revolution-10-game-changing-tools-every-network-danthasinghe-ooajc",
    image: "https://media.licdn.com/dms/image/v2/D5612AQGoC7cLar9rUg/article-cover_image-shrink_720_1280/B56ZhPd5gMHQAM-/0/1753679896828?e=1776902400&v=beta&t=j_8VNYAHyUy4jkapUM3Y6OLsxTDb9fWeZDAcffd3mMc"
     }

   ,{
    title: "What Is a Network Operations Center (NOC) ?",
    summary:"A company's network is its nervous system, and the NOC acts like its ICU—monitoring, managing, and maintaining it to ensure smooth operations.",
    tag: "NOC",
    date: "Aug 2, 2024",
    readTime: "10 min read",
    url: "https://www.linkedin.com/pulse/what-network-operations-center-noc-yasith-danthasinghe-bzknc",
    image: "https://media.licdn.com/dms/image/v2/D5612AQFPeJjZgWPrkg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1722584494868?e=1776902400&v=beta&t=dArQKkBnRnvf1mS1x-m6HbL9o4OejTCa_dovcw77R5A"
     }

,{
  title: "",
  summary: "",
  tag: "Article",
  date: "Updated Regularly",
  readTime: "",
  url: "https://www.linkedin.com/in/yasithdanthasinghe/recent-activity/articles/",
  image: "https://yasithdanthasinghe.github.io/blognoc.png"
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
