/* ============================================================
   AISTORAGE TECHNOLOGY — main.js
   Interactions: navbar scroll, mobile menu, scroll reveal,
                 particles, form handling
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  const handleNavScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ===== MOBILE NAV TOGGLE =====
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      }
    });
  }

  // ===== SCROLL REVEAL ANIMATIONS =====
  const revealElements = document.querySelectorAll(
    '.service-card, .process-step, .solution-industry, .projects-table, ' +
    '.why-point, .contact-info-card, .mission-card, .diff-card, ' +
    '.brand-card-detail, .delivery-col, .about-highlight'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Staggered delay based on position
        const delay = (Array.from(entry.target.parentElement.children).indexOf(entry.target)) * 80;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== PARTICLE ANIMATION IN HERO =====
  const particlesContainer = document.getElementById('hero-particles');
  if (particlesContainer) {
    const PARTICLE_COUNT = 40;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = document.createElement('div');
      p.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: rgba(${Math.random() > 0.5 ? '14,165,233' : '20,184,166'}, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatParticle ${Math.random() * 8 + 6}s ${Math.random() * 6}s infinite ease-in-out alternate;
      `;
      particlesContainer.appendChild(p);
    }

    // Inject particle keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes floatParticle {
        0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
        50% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.floor(Math.random() * 40 + 10)}px, ${Math.random() > 0.5 ? '' : '-'}${Math.floor(Math.random() * 30 + 10)}px) scale(1.5); opacity: 0.8; }
        100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
      }
    `;
    document.head.appendChild(style);
  }

  // ===== CONTACT FORM HANDLING =====
  window.handleSubmit = function(event) {
    event.preventDefault();
    const form = event.target;
    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.textContent;

    // Simulate sending
    btn.textContent = 'Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';

      // Show success message
      const note = form.querySelector('.form-note');
      if (note) {
        note.textContent = 'Thank you! We will get back to you within 24 hours.';
        note.style.color = '#10B981';
      }

      // Reset after 4s
      setTimeout(() => {
        form.reset();
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.opacity = '';
        btn.style.background = '';
        if (note) {
          note.textContent = 'We typically respond within 24 hours in Chinese, English or Thai.';
          note.style.color = '';
        }
      }, 4000);
    }, 1600);
  };

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== ACTIVE NAV LINK HIGHLIGHT ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${entry.target.id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  // ===== NUMBER COUNTER ANIMATION =====
  const counters = document.querySelectorAll('.stat-number, .highlight-num');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const text = target.textContent;
        const num = parseInt(text.replace(/\D/g, ''));
        if (!isNaN(num) && num > 0) {
          let current = 0;
          const increment = num / 40;
          const timer = setInterval(() => {
            current = Math.min(current + increment, num);
            target.textContent = text.replace(/\d+/, Math.round(current));
            if (current >= num) clearInterval(timer);
          }, 30);
        }
        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

});
