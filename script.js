// script.js - safe, dependency-free JavaScript

document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobilePanel = document.getElementById('mobilePanel');
  const navMenu = document.getElementById('navMenu');

  mobileToggle?.addEventListener('click', () => {
    if (!mobilePanel) return;
    mobilePanel.classList.toggle('hidden');
  });

  // Ensure desktop nav visible on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      navMenu?.classList.remove('hidden');
      navMenu?.classList.add('flex');
      mobilePanel?.classList.add('hidden');
    }
  });

  // Sticky header show/hide on scroll
  const header = document.querySelector('header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScroll && st > 80) {
      header?.classList.add('scroll-down');
      header?.classList.remove('scroll-up');
    } else {
      header?.classList.remove('scroll-down');
      header?.classList.add('scroll-up');
    }
    lastScroll = st <= 0 ? 0 : st;
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 72; // header height adjustment
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        // close mobile panel when link clicked
        if (mobilePanel && !mobilePanel.classList.contains('hidden')) {
          mobilePanel.classList.add('hidden');
        }
      }
    });
  });

  // Reveal-on-scroll using IntersectionObserver
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Contact form submit (demo)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name')?.value?.trim() || 'Friend';
      const email = document.getElementById('email')?.value?.trim() || '';
      // Simple client-side validation
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      // Demo: show confirmation. Replace this with real API call later.
      alert(`Thank you, ${name}! Your message has been received. We'll contact you at ${email} soon.`);
      contactForm.reset();
    });
  }

  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

