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

  let progressTarget = 0;
  let progressCurrent = 0;

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

  /* --- Scroll progress bar (smoothed) ------------------------------------ */
  function updateScrollProgressTarget() {
    if (!prog) return;
    const h = scroller.scrollHeight - scroller.clientHeight;
    progressTarget = h > 0 ? Math.max(0, Math.min(100, (scroller.scrollTop / h) * 100)) : 0;
    if (siteHeader) {
      siteHeader.classList.toggle('is-scrolled', scroller.scrollTop > 24);
    }
  }

  function tickProgress() {
    if (!prog) return;
    progressCurrent += (progressTarget - progressCurrent) * 0.14;
    if (Math.abs(progressTarget - progressCurrent) < 0.05) {
      progressCurrent = progressTarget;
    }
    prog.style.width = progressCurrent + '%';
    prog.setAttribute('aria-valuenow', String(Math.round(progressCurrent)));
  }

  /* --- Hero pointer parallax --------------------------------------------- */
  let pmx = 0;
  let pmy = 0;
  let tpx = 0;
  let tpy = 0;

  const hero = document.getElementById('hero');
  if (hero) {
    hero.addEventListener(
      'mousemove',
      function (e) {
        const r = hero.getBoundingClientRect();
        tpx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        tpy = ((e.clientY - r.top) / r.height - 0.5) * 2;
      },
      { passive: true }
    );
    hero.addEventListener('mouseleave', function () {
      tpx = 0;
      tpy = 0;
    });
  }

  /* --- Project cards: taped-top lift toward viewer ----------------------- */
  const projects = document.getElementById('projects');

  function resetCardLift(card) {
    const sheet = card.querySelector('.project-card__sheet');
    if (!sheet) return;
    card.classList.remove('is-lifted');
    sheet.style.setProperty('--lift-x', '0deg');
    sheet.style.setProperty('--lift-y', '0px');
    sheet.style.setProperty('--lift-z', '0px');
  }

  function applyCardLift(card, clientY) {
    const sheet = card.querySelector('.project-card__sheet');
    if (!sheet) return;
    const r = card.getBoundingClientRect();
    const py = Math.max(0, Math.min(1, (clientY - r.top) / r.height));
    /* Bottom of card lifts more — pivots from tape at top */
    const liftY = -(10 + py * 18);
    const liftX = -(5 + py * 11);
    const liftZ = 12 + py * 28;
    card.classList.add('is-lifted');
    sheet.style.setProperty('--lift-y', liftY.toFixed(1) + 'px');
    sheet.style.setProperty('--lift-x', liftX.toFixed(2) + 'deg');
    sheet.style.setProperty('--lift-z', liftZ.toFixed(1) + 'px');
  }

  if (projects) {
    projects.querySelectorAll('.project-card').forEach(function (card) {
      card.addEventListener('mouseenter', function (e) {
        applyCardLift(card, e.clientY);
      });
      card.addEventListener('mousemove', function (e) {
        applyCardLift(card, e.clientY);
      }, { passive: true });
      card.addEventListener('mouseleave', function () {
        resetCardLift(card);
      });
      card.addEventListener('touchstart', function () {
        applyCardLift(card, card.getBoundingClientRect().top + card.offsetHeight * 0.65);
      }, { passive: true });
      card.addEventListener('touchend', function () {
        resetCardLift(card);
      });
    });
  }

  /* --- Main animation loop ----------------------------------------------- */
  function frame() {
    const vh = scroller.clientHeight;

    tickProgress();

    /* Scroll reveal */
    const revs = scroller.querySelectorAll('[data-reveal]');
    for (let i = 0; i < revs.length; i++) {
      const el = revs[i];
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.9 && r.bottom > -40) {
        if (!el.__shown) {
          el.__shown = true;
          const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
          el.style.transitionDelay = delay + 'ms';
          el.classList.add('is-visible');
        }
      }
    }

    /* Timeline items */
    const timelineItems = scroller.querySelectorAll('.timeline__item[data-reveal]');
    for (let i = 0; i < timelineItems.length; i++) {
      const el = timelineItems[i];
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > -40) {
        if (!el.__shown) {
          el.__shown = true;
          const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
          el.style.transitionDelay = delay + 'ms';
          el.classList.add('is-visible');
        }
      }
    }

    /* Scroll parallax */
    const pxs = scroller.querySelectorAll('[data-parallax]');
    for (let i = 0; i < pxs.length; i++) {
      const el = pxs[i];
      if (el.__cur === undefined) el.__cur = 0;
      const r = el.getBoundingClientRect();
      const sp = parseFloat(el.getAttribute('data-parallax')) || 0.1;
      const target = -(r.top + r.height / 2 - vh / 2) * sp;
      el.__cur += (target - el.__cur) * 0.085;
      el.style.transform = 'translate3d(0,' + el.__cur.toFixed(2) + 'px,0)';
    }

    /* Pointer parallax on hero elements */
    pmx += (tpx - pmx) * 0.06;
    pmy += (tpy - pmy) * 0.06;
    const mEls = scroller.querySelectorAll('[data-mouse]');
    for (let i = 0; i < mEls.length; i++) {
      const el = mEls[i];
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

    requestAnimationFrame(frame);
  }

  scroller.addEventListener('scroll', updateScrollProgressTarget, { passive: true });
  window.addEventListener('resize', updateScrollProgressTarget);
  updateScrollProgressTarget();
  requestAnimationFrame(frame);
})();
