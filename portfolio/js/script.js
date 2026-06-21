/**
 * Lisa Ochieng Portfolio — interactions
 * Scroll progress, reveal animations, parallax, taped-card lift, mobile nav.
 */
(function () {
  'use strict';

  const scroller = document.getElementById('site-root');
  if (!scroller) return;

  const prog = document.getElementById('scroll-prog');
  const siteHeader = document.querySelector('.site-header');
  const navToggle = document.querySelector('.site-nav__toggle');
  const navLinks = document.querySelector('.site-nav__links');
  const navAnchors = document.querySelectorAll('.site-nav__link[href^="#"]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let progressTarget = 0;
  let progressCurrent = 0;
  let frameActive = false;

  /* --- Page ready -------------------------------------------------------- */
  function initPageReady() {
    document.body.classList.add('is-ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageReady);
  } else {
    initPageReady();
  }

  /* --- Mobile navigation ------------------------------------------------- */
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('is-open', !expanded);
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('is-open');
      });
    });
  }

  /* --- Active nav section highlight -------------------------------------- */
  const sections = ['hero', 'about', 'projects', 'experience', 'skills', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  function updateActiveNav() {
    if (!navAnchors.length) return;
    const offset = 120;
    let current = 'hero';
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const top = section.getBoundingClientRect().top;
      if (top - offset <= 0) current = section.id;
    }
    navAnchors.forEach(function (link) {
      const href = link.getAttribute('href');
      link.classList.toggle('is-active', href === '#' + current);
    });
  }

  /* --- Scroll progress bar (smoothed) ------------------------------------ */
  function updateScrollProgressTarget() {
    if (!prog) return;
    const h = scroller.scrollHeight - scroller.clientHeight;
    progressTarget = h > 0 ? Math.max(0, Math.min(100, (scroller.scrollTop / h) * 100)) : 0;
    if (siteHeader) {
      siteHeader.classList.toggle('is-scrolled', scroller.scrollTop > 24);
    }
    updateActiveNav();
    requestFrame();
  }

  function tickProgress() {
    if (!prog) return false;
    const delta = progressTarget - progressCurrent;
    if (Math.abs(delta) < 0.05) {
      progressCurrent = progressTarget;
      prog.style.width = progressCurrent + '%';
      prog.setAttribute('aria-valuenow', String(Math.round(progressCurrent)));
      return false;
    }
    progressCurrent += delta * 0.12;
    prog.style.width = progressCurrent + '%';
    prog.setAttribute('aria-valuenow', String(Math.round(progressCurrent)));
    return true;
  }

  /* --- Scroll reveal (IntersectionObserver) ------------------------------ */
  function initRevealObserver() {
    const revealEls = scroller.querySelectorAll('[data-reveal]');
    if (!revealEls.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) {
        el.classList.add('is-visible');
      });
      scroller.querySelectorAll('.text-fade-in').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
          el.style.transitionDelay = delay + 'ms';
          el.classList.add('is-visible');
          observer.unobserve(el);
        });
      },
      { root: scroller, threshold: 0.1, rootMargin: '0px 0px -4% 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });

    const textEls = scroller.querySelectorAll('.text-fade-in');
    const textObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          textObserver.unobserve(entry.target);
        });
      },
      { root: scroller, threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );

    textEls.forEach(function (el) {
      if (!el.closest('[data-reveal]') && !el.closest('.timeline__item')) {
        textObserver.observe(el);
      }
    });
  }

  initRevealObserver();

  /* --- Hero pointer parallax --------------------------------------------- */
  let pmx = 0;
  let pmy = 0;
  let tpx = 0;
  let tpy = 0;
  let parallaxActive = false;

  const hero = document.getElementById('hero');
  const parallaxEls = scroller.querySelectorAll('[data-parallax]');
  const mouseEls = scroller.querySelectorAll('[data-mouse]');

  if (hero && !prefersReducedMotion) {
    hero.addEventListener(
      'mousemove',
      function (e) {
        const r = hero.getBoundingClientRect();
        tpx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        tpy = ((e.clientY - r.top) / r.height - 0.5) * 2;
        parallaxActive = true;
        requestFrame();
      },
      { passive: true }
    );
    hero.addEventListener('mouseleave', function () {
      tpx = 0;
      tpy = 0;
      parallaxActive = true;
      requestFrame();
    });
  }

  /* --- Project cards: subtle taped hinge lift ----------------------------- */
  const projects = document.getElementById('projects');

  if (projects && !prefersReducedMotion) {
    projects.querySelectorAll('.project-card').forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        card.classList.add('is-lifted');
      });
      card.addEventListener('mouseleave', function () {
        card.classList.remove('is-lifted');
      });
      card.addEventListener('focusin', function () {
        card.classList.add('is-lifted');
      });
      card.addEventListener('focusout', function () {
        card.classList.remove('is-lifted');
      });
    });
  }

  /* --- Smooth anchor scroll ---------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  /* --- Animation loop (runs only when needed) ---------------------------- */
  function requestFrame() {
    if (frameActive) return;
    frameActive = true;
    requestAnimationFrame(frame);
  }

  function frame() {
    let keepRunning = tickProgress();

    if (!prefersReducedMotion) {
      const vh = scroller.clientHeight;

      for (let i = 0; i < parallaxEls.length; i++) {
        const el = parallaxEls[i];
        if (el.__cur === undefined) el.__cur = 0;
        const r = el.getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) continue;
        const sp = parseFloat(el.getAttribute('data-parallax')) || 0.1;
        const target = -(r.top + r.height / 2 - vh / 2) * sp;
        const prev = el.__cur;
        el.__cur += (target - el.__cur) * 0.06;
        if (Math.abs(el.__cur - prev) > 0.05) {
          el.style.transform = 'translate3d(0,' + el.__cur.toFixed(2) + 'px,0)';
          keepRunning = true;
        }
      }

      if (parallaxActive || Math.abs(tpx - pmx) > 0.002 || Math.abs(tpy - pmy) > 0.002) {
        pmx += (tpx - pmx) * 0.05;
        pmy += (tpy - pmy) * 0.05;
        for (let i = 0; i < mouseEls.length; i++) {
          const el = mouseEls[i];
          const depth = parseFloat(el.getAttribute('data-mouse')) || 10;
          const base = el.getAttribute('data-base') || '';
          el.style.transform =
            base +
            ' translate3d(' +
            (pmx * depth).toFixed(2) +
            'px,' +
            (pmy * depth).toFixed(2) +
            'px,0)';
        }
        if (Math.abs(tpx - pmx) > 0.002 || Math.abs(tpy - pmy) > 0.002) {
          keepRunning = true;
        } else {
          parallaxActive = false;
        }
      }
    }

    frameActive = false;
    if (keepRunning) requestFrame();
  }

  scroller.addEventListener('scroll', updateScrollProgressTarget, { passive: true });
  window.addEventListener('resize', updateScrollProgressTarget);
  updateScrollProgressTarget();
  requestFrame();
})();
