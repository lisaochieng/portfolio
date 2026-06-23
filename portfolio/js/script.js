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
  const mobileMedia = window.matchMedia('(max-width: 767px)');
  const hoverMedia = window.matchMedia('(hover: hover)');

  function isMobileViewport() {
    return mobileMedia.matches;
  }

  function canHover() {
    return hoverMedia.matches;
  }

  let progressTarget = 0;
  let progressCurrent = 0;
  let frameActive = false;
  let scrollPending = false;
  let heroInView = true;

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
      document.body.classList.toggle('nav-open', !expanded);
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('is-open');
        document.body.classList.remove('nav-open');
      });
    });
  }

  /* --- Active nav section highlight -------------------------------------- */
  const sections = ['hero', 'about', 'projects', 'experience', 'skills', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  function getScrollTop() {
    return scroller.scrollTop || window.scrollY || document.documentElement.scrollTop;
  }

  function getScrollHeight() {
    return Math.max(scroller.scrollHeight, document.documentElement.scrollHeight);
  }

  function getClientHeight() {
    return scroller.clientHeight || window.innerHeight;
  }

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

  function updateScrollMetrics() {
    if (prog) {
      const h = getScrollHeight() - getClientHeight();
      progressTarget = h > 0 ? Math.max(0, Math.min(100, (getScrollTop() / h) * 100)) : 0;
    }
    updateActiveNav();
  }

  function scheduleScrollWork() {
    if (scrollPending) return;
    scrollPending = true;
    requestAnimationFrame(function () {
      scrollPending = false;
      updateScrollMetrics();
      requestFrame();
    });
  }

  /* --- Scroll progress bar (smoothed, transform-based) ------------------- */
  function updateScrollProgressTarget() {
    scheduleScrollWork();
  }

  function tickProgress() {
    if (!prog) return false;
    const delta = progressTarget - progressCurrent;
    if (Math.abs(delta) < 0.05) {
      progressCurrent = progressTarget;
      prog.style.transform = 'scaleX(' + (progressCurrent / 100) + ')';
      prog.setAttribute('aria-valuenow', String(Math.round(progressCurrent)));
      if (Math.abs(progressCurrent) < 0.05 || Math.abs(progressCurrent - 100) < 0.05) {
        prog.style.willChange = 'auto';
      }
      return false;
    }
    progressCurrent += delta * 0.12;
    prog.style.willChange = 'transform';
    prog.style.transform = 'scaleX(' + (progressCurrent / 100) + ')';
    prog.setAttribute('aria-valuenow', String(Math.round(progressCurrent)));
    return true;
  }

  /* --- Nav state via hero visibility (initialized after hero ref) ---------- */
  function initNavHeroObserver(heroEl) {
    if (!siteHeader || !heroEl || !('IntersectionObserver' in window)) return;
    const navObserver = new IntersectionObserver(
      function (entries) {
        heroInView = entries[0].isIntersecting;
        siteHeader.classList.toggle('is-scrolled', !heroInView);
      },
      { root: null, threshold: 0, rootMargin: '-72px 0px 0px 0px' }
    );
    navObserver.observe(heroEl);
  }

  /* --- Stagger child chips inside revealed groups ------------------------ */
  function staggerSkillChips(parent) {
    const chips = parent.querySelectorAll('.skill-chip');
    chips.forEach(function (chip, i) {
      chip.style.transitionDelay = (i * 45) + 'ms';
      chip.classList.add('is-staggered');
    });
  }

  function clearRevealWillChange(el) {
    function onEnd(e) {
      if (e.target !== el) return;
      if (e.propertyName !== 'transform' && e.propertyName !== 'opacity') return;
      el.style.willChange = 'auto';
      el.removeEventListener('transitionend', onEnd);
    }
    el.addEventListener('transitionend', onEnd);
  }

  /* --- Reveal an element and its text children --------------------------- */
  function revealElement(el) {
    const delay = parseInt(el.getAttribute('data-delay') || '0', 10);

    setTimeout(function () {
      el.style.willChange = 'transform, opacity';
      el.classList.add('is-visible');
      clearRevealWillChange(el);
      staggerSkillChips(el);

      el.querySelectorAll('.text-fade-in').forEach(function (text) {
        text.classList.add('is-visible');
      });
    }, delay);
  }

  function revealAll(elements) {
    elements.forEach(function (el) {
      el.classList.add('is-visible');
      el.querySelectorAll('.text-fade-in').forEach(function (text) {
        text.classList.add('is-visible');
      });
      staggerSkillChips(el);
    });
  }

  /* --- Scroll reveal (IntersectionObserver — viewport root) -------------- */
  function initRevealObserver() {
    const revealEls = document.querySelectorAll('[data-reveal]:not(.project-card)');
    if (!revealEls.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealAll(revealEls);
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          revealElement(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { root: scroller, threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  initRevealObserver();

  /* --- Contact: reveal all CTAs when section enters view ----------------- */
  function initContactReveal() {
    const contact = document.getElementById('contact');
    if (!contact) return;

    const contactRevealEls = contact.querySelectorAll('[data-reveal]');
    if (!contactRevealEls.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealAll(contactRevealEls);
      return;
    }

    const contactObserver = new IntersectionObserver(
      function (entries) {
        if (!entries[0].isIntersecting) return;
        contactRevealEls.forEach(function (el) {
          revealElement(el);
        });
        contactObserver.disconnect();
      },
      { root: scroller, threshold: 0.05, rootMargin: '0px 0px 0px 0px' }
    );

    contactObserver.observe(contact);
  }

  initContactReveal();

  /* --- Project cards: alternating horizontal scroll reveal ----------------- */
  function initProjectCardScrollAnimation() {
    const cards = document.querySelectorAll('.project-card');
    console.log('Project cards found:', cards.length);

    if (!cards.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cards.forEach(function (card) {
        card.classList.remove('card-hidden-left', 'card-hidden-right');
        card.classList.add('card-visible');
        card.querySelectorAll('.text-fade-in').forEach(function (text) {
          text.classList.add('is-visible');
        });
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      cards.forEach(function (card) {
        card.classList.remove('card-hidden-left', 'card-hidden-right');
        card.classList.add('card-visible');
        card.querySelectorAll('.text-fade-in').forEach(function (text) {
          text.classList.add('is-visible');
        });
      });
      return;
    }

    cards.forEach(function (card, index) {
      if (index % 2 === 0) {
        card.classList.add('card-hidden-left');
      } else {
        card.classList.add('card-hidden-right');
      }
    });

    const cardObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const card = entry.target;
          card.classList.remove('card-hidden-left', 'card-hidden-right');
          card.classList.add('card-visible');
          card.querySelectorAll('.text-fade-in').forEach(function (text) {
            text.classList.add('is-visible');
          });
          cardObserver.unobserve(card);
        });
      },
      { root: scroller, threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );

    cards.forEach(function (card) {
      cardObserver.observe(card);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectCardScrollAnimation);
  } else {
    initProjectCardScrollAnimation();
  }

  /* --- Timeline line draw on scroll -------------------------------------- */
  function initTimelineLine() {
    const timeline = document.querySelector('[data-reveal-line]');
    if (!timeline) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      timeline.classList.add('is-line-visible');
      return;
    }

    const lineObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          timeline.classList.add('is-line-visible');
          lineObserver.unobserve(timeline);
        });
      },
      { root: null, threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );

    lineObserver.observe(timeline);
  }

  initTimelineLine();

  /* --- Hero pointer parallax --------------------------------------------- */
  let pmx = 0;
  let pmy = 0;
  let tpx = 0;
  let tpy = 0;
  let parallaxActive = false;

  const hero = document.getElementById('hero');
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  const mouseEls = document.querySelectorAll('[data-mouse]');

  initNavHeroObserver(hero);

  if (hero && !prefersReducedMotion && canHover() && !isMobileViewport()) {
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

  /* --- Project cards: lift + smooth screenshot pan ------------------------ */
  const projects = document.getElementById('projects');
  const projectPanStates = [];
  let projectsVisible = false;

  function autoPanPosition(state, now) {
    const duration = state.isRag ? 20000 : 17000;
    const minX = state.isRag ? 0 : 10;
    const maxX = state.isRag ? 100 : 90;
    const phase = ((now + state.phaseOffset) % duration) / duration;
    const wave = 0.5 - 0.5 * Math.cos(phase * Math.PI * 2);
    return {
      x: minX + wave * (maxX - minX),
      y: state.defaultY
    };
  }

  function applyPanTransform(state) {
    const baseScale = state.isRag ? 1.32 : 1.12;
    const hoverScale = state.hovered ? 1.03 : 1;
    const scale = baseScale * hoverScale;
    const panX = ((50 - state.x) / 50) * (state.isRag ? 12 : 5);
    const panY = ((50 - state.y) / 50) * (state.isRag ? 4 : 3);
    state.img.style.transform =
      'scale(' + scale.toFixed(3) + ') translate3d(' + panX.toFixed(2) + '%, ' + panY.toFixed(2) + '%, 0)';
  }

  function tickProjectPans() {
    if (!projectPanStates.length || !projectsVisible || prefersReducedMotion) return false;

    const now = performance.now();
    let moving = false;
    const ease = 0.09;

    for (let i = 0; i < projectPanStates.length; i++) {
      const state = projectPanStates[i];
      let tx;
      let ty;

      if (state.hovered) {
        tx = state.mouseX;
        ty = state.mouseY;
      } else {
        const auto = autoPanPosition(state, now);
        tx = auto.x;
        ty = auto.y;
      }

      const dx = tx - state.x;
      const dy = ty - state.y;
      state.x += dx * ease;
      state.y += dy * ease;

      if (Math.abs(dx) > 0.025 || Math.abs(dy) > 0.025) {
        moving = true;
      }

      applyPanTransform(state);
    }

    return moving || projectPanStates.some(function (s) { return !s.hovered; });
  }

  if (projects && !prefersReducedMotion) {
    const canHoverDevice = canHover();
    const panObserver = new IntersectionObserver(
      function (entries) {
        projectsVisible = entries[0].isIntersecting;
        if (projectsVisible) requestFrame();
      },
      { root: scroller, threshold: 0.12, rootMargin: '40px 0px' }
    );
    panObserver.observe(projects);

    if (canHoverDevice) {
      projects.querySelectorAll('.project-card').forEach(function (card) {
        card.addEventListener('mouseenter', function () {
          card.classList.add('is-lifted');
        });
        card.addEventListener('mouseleave', function () {
          card.classList.remove('is-lifted');
        });
      });
    }

    projects.querySelectorAll('.project-card__img-wrap').forEach(function (wrap, index) {
      const img = wrap.querySelector('.project-card__img');
      if (!img) return;

      const isRag = img.classList.contains('project-card__img--rag');
      const defaultX = isRag ? 72 : 50;
      const defaultY = isRag ? 42 : 50;
      const start = autoPanPosition(
        { isRag: isRag, defaultY: defaultY, phaseOffset: index * 3800 },
        performance.now()
      );
      const state = {
        img: img,
        isRag: isRag,
        x: start.x,
        y: start.y,
        mouseX: defaultX,
        mouseY: defaultY,
        defaultX: defaultX,
        defaultY: defaultY,
        phaseOffset: index * 3800,
        hovered: false
      };

      projectPanStates.push(state);
      applyPanTransform(state);

      if (canHoverDevice) {
        wrap.addEventListener('mouseenter', function () {
          state.hovered = true;
          state.img.style.willChange = 'transform';
          requestFrame();
        });

        wrap.addEventListener('mousemove', function (e) {
          const rect = wrap.getBoundingClientRect();
          state.mouseX = ((e.clientX - rect.left) / rect.width) * 100;
          state.mouseY = ((e.clientY - rect.top) / rect.height) * 100;
          requestFrame();
        });

        wrap.addEventListener('mouseleave', function () {
          state.hovered = false;
          state.img.style.willChange = 'auto';
          requestFrame();
        });
      }
    });

    requestFrame();
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
      if (tickProjectPans()) {
        keepRunning = true;
      }
    }

    if (!prefersReducedMotion && !isMobileViewport()) {
      const vh = getClientHeight();

      if (heroInView) {
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
    }

    frameActive = false;
    if (keepRunning) requestFrame();
  }

  scroller.addEventListener('scroll', updateScrollProgressTarget, { passive: true });
  window.addEventListener('scroll', updateScrollProgressTarget, { passive: true });
  window.addEventListener('resize', updateScrollProgressTarget);
  updateScrollProgressTarget();
  requestFrame();
})();
