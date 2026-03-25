/* ============================================================
   LA MERNA DC — main.js
   ============================================================ */

(function () {
  'use strict';

  // ── Nav: shrink on scroll ──────────────────────────────────
  const nav = document.getElementById('nav');

  function handleNavScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run once on load


  // ── Mobile nav toggle ─────────────────────────────────────
  const navToggle  = document.getElementById('nav-toggle');
  const navLinks   = document.getElementById('nav-links');

  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
    });
  });


  // ── Scroll-reveal ─────────────────────────────────────────
  // Add class="reveal" to any element you want to fade in on scroll.
  // JS will add .visible when it enters the viewport.
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }


  // ── Newsletter form ────────────────────────────────────────
  const form    = document.getElementById('newsletter-form');
  const success = document.getElementById('newsletter-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const emailInput = document.getElementById('newsletter-email');
      const email      = emailInput.value.trim();

      if (!email || !isValidEmail(email)) {
        emailInput.focus();
        emailInput.style.borderColor = 'rgba(220, 80, 80, 0.7)';
        return;
      }

      emailInput.style.borderColor = '';

      // TODO: Replace this block with your real form submission
      // e.g. POST to Mailchimp, Klaviyo, ConvertKit, etc.
      //
      // Example (fetch-based):
      // fetch('https://your-api.com/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // })
      // .then(() => showSuccess())
      // .catch(() => alert('Something went wrong. Please try again.'));

      // Placeholder success state:
      showNewsletterSuccess();
    });
  }

  function showNewsletterSuccess() {
    if (form && success) {
      form.hidden   = true;
      success.hidden = false;
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }


  // ── Smooth anchor offset (accounts for fixed nav height) ──
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      e.preventDefault();

      const navHeight = nav.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

})();
