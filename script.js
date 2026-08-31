/* ============================================================
   RX STUDIO — Interactive Script
   Animations, Tabs, FAQ, Marquee, Pricing Spotlight, Scroll Effects
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. NAVBAR — Scroll Effect & Mobile Menu
  // ============================================================
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  const handleNavScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Initial check

  // Mobile menu toggle
  if (hamburger && mobileNav) {
    const closeMobileNav = () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    };

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        hamburger.classList.add('active');
        mobileNav.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
      }
    });

    // Close mobile nav when any link is clicked
    mobileNav.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });

    // Close when clicking outside of navbar and mobile menu
    document.addEventListener('click', (e) => {
      if (mobileNav.classList.contains('open')) {
        if (!mobileNav.contains(e.target) && !navbar.contains(e.target)) {
          closeMobileNav();
        }
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMobileNav();
      }
    });

    // Close when window resized to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && mobileNav.classList.contains('open')) {
        closeMobileNav();
      }
    }, { passive: true });
  }

  // ============================================================
  // 2. SCROLL REVEAL — Intersection Observer
  // ============================================================
  const revealElements = document.querySelectorAll('.reveal');

  // Immediately reveal hero elements above the fold
  document.querySelectorAll('.hero .reveal').forEach(el => {
    el.classList.add('revealed');
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================================
  // 3. TRUST BADGE TICKER — Smooth Rotating Metrics
  // ============================================================
  const trustTicker = document.getElementById('trust-ticker');

  if (trustTicker) {
    const badges = trustTicker.querySelectorAll('.trust-badge');
    if (badges.length > 0) {
      badges.forEach((b, i) => {
        if (i === 0) {
          b.classList.add('active');
          b.classList.remove('exit-up');
        } else {
          b.classList.remove('active', 'exit-up');
        }
      });
    }

    let currentBadge = 0;
    let isAnimating = false;

    const rotateBadge = () => {
      if (isAnimating || badges.length < 2) return;
      isAnimating = true;

      const current = badges[currentBadge];
      const nextIndex = (currentBadge + 1) % badges.length;
      const next = badges[nextIndex];

      // Current goes up and fades
      current.classList.remove('active');
      current.classList.add('exit-up');

      // Next comes in from below
      next.classList.add('active');

      setTimeout(() => {
        current.classList.remove('exit-up');
        currentBadge = nextIndex;
        isAnimating = false;
      }, 550);
    };

    setInterval(rotateBadge, 3200);
  }

  // ============================================================
  // 4. SERVICE TABS — Interactive Tab Switching
  // ============================================================
  const tabButtons = document.querySelectorAll('.service-tab');
  const tabContents = document.querySelectorAll('.service-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');

      // Remove active class from all buttons and contents
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Activate the targeted tab and content
      btn.classList.add('active');
      const targetContent = document.getElementById('tab-' + tabId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // ============================================================
  // 5. FAQ ACCORDION
  // ============================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other open FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      item.classList.toggle('open');
      question.setAttribute('aria-expanded', !isOpen);
    });
  });

  // ============================================================
  // 6. PRICING CARDS CURSOR SPOTLIGHT GLOW
  // ============================================================
  const pricingCards = document.querySelectorAll('.pricing-card');

  pricingCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.removeProperty('--mouse-x');
      card.style.removeProperty('--mouse-y');
    });
  });

  // ============================================================
  // 7. SMOOTH SCROLL — With Header Offset
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================================
  // 8. ACTIVE NAV LINK HIGHLIGHTING
  // ============================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  const updateActiveNav = () => {
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === '#' + sectionId) {
            link.style.color = '#FFFFFF';
            link.style.background = 'rgba(255, 255, 255, 0.08)';
          } else {
            link.style.color = '';
            link.style.background = '';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ============================================================
  // 9. HERO MOUSE PARALLAX GLOW
  // ============================================================
  const heroSection = document.querySelector('.hero');
  const glowRed = document.querySelector('.hero-bg .glow-red');
  const glowBlue = document.querySelector('.hero-bg .glow-blue');

  if (heroSection && glowRed && glowBlue) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const moveX = (x - 0.5) * 35;
      const moveY = (y - 0.5) * 35;

      requestAnimationFrame(() => {
        glowRed.style.transform = `translate(${moveX}px, ${moveY}px)`;
        glowBlue.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
      });
    });
  }

  // ============================================================
  // 10. INTERACTIVE PIPELINE — Hover-Activated Step Highlighting
  // ============================================================
  const pipelineTrack = document.getElementById('pipeline-track');

  if (pipelineTrack) {
    const steps = pipelineTrack.querySelectorAll('.pipeline-step-item');

    const activateStep = (stepItem) => {
      // Clear all steps
      steps.forEach(s => {
        s.classList.remove('active-step');
        const circle = s.querySelector('.pipeline-node-circle');
        const content = s.querySelector('.pipeline-step-content');
        const badge = s.querySelector('.pipeline-phase-badge');
        if (circle) circle.classList.remove('active-circle');
        if (content) content.classList.remove('highlight-content');
        if (badge) badge.classList.remove('active-phase');
      });

      // Activate target step
      stepItem.classList.add('active-step');
      const circle = stepItem.querySelector('.pipeline-node-circle');
      const content = stepItem.querySelector('.pipeline-step-content');
      const badge = stepItem.querySelector('.pipeline-phase-badge');
      if (circle) circle.classList.add('active-circle');
      if (content) content.classList.add('highlight-content');
      if (badge) badge.classList.add('active-phase');
    };

    // Hover or tap on each step activates it
    steps.forEach(step => {
      step.addEventListener('mouseenter', () => {
        activateStep(step);
      });
      step.addEventListener('click', () => {
        activateStep(step);
      });
    });

    // When cursor leaves the entire pipeline track, reset to step 1
    pipelineTrack.addEventListener('mouseleave', () => {
      const step1 = pipelineTrack.querySelector('[data-step="1"]');
      if (step1) {
        activateStep(step1);
      }
    });
  }

  // ============================================================
  // 11. EMAIL COPY-TO-CLIPBOARD + MAILTO
  // ============================================================
  const emailButtons = document.querySelectorAll('.email-copy-btn');

  // Create the toast element if it doesn't exist
  let copyToast = document.querySelector('.copy-toast');
  if (!copyToast) {
    copyToast = document.createElement('div');
    copyToast.className = 'copy-toast';
    copyToast.innerHTML = `
      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
      <span>Email copied to clipboard!</span>
    `;
    document.body.appendChild(copyToast);
  }

  let toastTimeout = null;

  const showCopyToast = () => {
    if (toastTimeout) clearTimeout(toastTimeout);
    copyToast.classList.add('show');
    toastTimeout = setTimeout(() => {
      copyToast.classList.remove('show');
    }, 2500);
  };

  emailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'rexciorx@gmail.com';

      // Copy to clipboard
      navigator.clipboard.writeText(email).then(() => {
        showCopyToast();
      }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopyToast();
      });

      // Also open mailto after a brief delay
      setTimeout(() => {
        window.location.href = 'mailto:' + email;
      }, 300);
    });
  });

});
