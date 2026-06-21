/**
 * Lisa Ochieng Portfolio — interactions
 * Scroll progress, reveal animations, parallax, card tilt, mobile nav.
 */
(function () {
  'use strict';

  const scroller = document.getElementById('site-root');
  if (!scroller) return;

  const prog = document.getElementById('scroll-prog');
  const navToggle = document.querySelector('.site-nav__toggle');
  const navLinks = document.querySelector('.site-nav__links');

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

  /* --- Scroll progress bar ----------------------------------------------- */
  function updateScrollProgress() {
    if (!prog) return;
    const h = scroller.scrollHeight - scroller.clientHeight;
    const pct = h > 0 ? Math.max(0, Math.min(100, (scroller.scrollTop / h) * 100)) : 0;
    prog.style.width = pct + '%';
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

  /* --- Project card 3D tilt (event delegation) --------------------------- */
  const projects = document.getElementById('projects');
  if (projects) {
    projects.addEventListener(
      'mousemove',
      function (e) {
        const card = e.target.closest && e.target.closest('.project-card');
        if (!card) return;
        card.__hover = true;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease';
        card.style.transform =
          'rotateY(' +
          (px * 7).toFixed(2) +
          'deg) rotateX(' +
          (-py * 7).toFixed(2) +
          'deg) translateY(-8px) scale(1.025)';
        card.style.boxShadow = '0 26px 40px rgba(60,40,20,.30)';
        card.style.zIndex = '6';
      },
      { passive: true }
    );

    projects.addEventListener('mouseout', function (e) {
      const card = e.target.closest && e.target.closest('.project-card');
      if (!card) return;
      if (e.relatedTarget && card.contains(e.relatedTarget)) return;
      card.__hover = false;
      card.style.transition = 'transform 0.55s cubic-bezier(.2,.7,.2,1), box-shadow 0.35s ease';
      card.style.transform = card.getAttribute('data-rest') || 'none';
      card.style.boxShadow = '0 8px 16px rgba(60,40,20,.16)';
      card.style.zIndex = '';
    });
  }

  /* --- Main animation loop ----------------------------------------------- */
  function frame() {
    const vh = scroller.clientHeight;
    const scrollTop = scroller.scrollTop;

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
        if (!el.__hover && el.classList.contains('project-card')) {
          /* project cards manage transform via data-rest + is-visible in CSS */
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

  scroller.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('resize', updateScrollProgress);
  updateScrollProgress();
  requestAnimationFrame(frame);
})();
