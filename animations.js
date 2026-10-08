"use strict";

/* ============================================================
   VIVEK MENON PORTFOLIO — GSAP PREMIUM ANIMATION LAYER (ULTRA-SAFE)
   ============================================================
   Guaranteed visibility: Elements are ALWAYS visible by default.
   Animations are purely additive micro-interactions and smooth reveals.
   Opacity is never left at 0, and no split-text artifacts are created.
   ============================================================ */

(function initAnimations() {

  if (typeof gsap === 'undefined') {
    console.warn('[animations.js] GSAP not found.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMob = () => window.innerWidth <= 768;
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => [...(c || document).querySelectorAll(s)];

  /* ============================================================
     SAFETY FIRST: Guarantee everything is 100% visible
     ============================================================ */
  function enforceVisibility() {
    const selectors = [
      '.hero-name', '.hero-subtitle', '.hero-desc', '.hero-btns', '.hero-socials',
      '.hero-illustration', '.hero-content', '.scroll-indicator',
      '#about', '.about-image-wrap', '.about-content', '.about-portrait-card',
      '.skills-wrap', '.skill-tag',
      '#education', '.edu-card',
      '#projects', '.project-card',
      '#experience', '.timeline-item', '.timeline-card',
      '#achievements', '.achievement-card',
      '#recommendations', '.testimonial-card',
      '#whats-new', '.whats-new-card', '.whats-new-track',
      '#contact', '.contact-info', '.contact-form-wrap',
      '.section-header', '.section-tag', '.section-title', '.section-subtitle',
      '#navbar', 'footer'
    ];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.style.visibility = 'visible';
        if (el.style.opacity === '0') {
          el.style.opacity = '1';
        }
      });
    });
  }

  enforceVisibility();
  window.addEventListener('DOMContentLoaded', enforceVisibility);
  window.addEventListener('load', () => {
    enforceVisibility();
    ScrollTrigger.refresh();
  });
  setTimeout(enforceVisibility, 300);
  setTimeout(enforceVisibility, 1000);

  /* ============================================================
     1. HERO PARTICLE CONSTELLATION (Additive canvas layer)
     ============================================================ */
  (function heroParticles() {
    const hero = $('#home');
    if (!hero || prefersReduced) return;

    // Prevent duplicate canvases
    const existing = document.getElementById('hero-particles');
    if (existing) existing.remove();

    const canvas = document.createElement('canvas');
    canvas.id = 'hero-particles';
    canvas.style.cssText =
      'position:absolute;top:0;left:0;width:100%;height:100%;' +
      'pointer-events:none;z-index:0;opacity:0.45;';
    hero.prepend(canvas);

    const ctx2d = canvas.getContext('2d');
    let W, H, particles = [];
    const mouse = { x: -9999, y: -9999 };
    const COUNT = isMob() ? 35 : 85;
    const CONNECT = isMob() ? 80 : 125;
    const PUSH = 90;

    function resize() {
      W = canvas.width = hero.offsetWidth;
      H = canvas.height = hero.offsetHeight;
    }

    function Particle() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.r = Math.random() * 1.6 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    function init() {
      particles = [];
      for (let i = 0; i < COUNT; i++) particles.push(new Particle());
    }

    function getCol() {
      return document.documentElement.getAttribute('data-theme') === 'dark'
        ? '160,140,255' : '90,80,210';
    }

    function draw() {
      ctx2d.clearRect(0, 0, W, H);
      const col = getCol();
      particles.forEach((p, i) => {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < PUSH && d > 0) {
          const f = (PUSH - d) / PUSH;
          p.vx += (dx / d) * f * 0.5;
          p.vy += (dy / d) * f * 0.5;
        }
        const sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (sp > 1.3) { p.vx *= 1.3 / sp; p.vy *= 1.3 / sp; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx2d.beginPath();
        ctx2d.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx2d.fillStyle = 'rgba(' + col + ',' + p.alpha + ')';
        ctx2d.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const ex = p.x - q.x, ey = p.y - q.y;
          const dist = Math.sqrt(ex * ex + ey * ey);
          if (dist < CONNECT) {
            ctx2d.beginPath();
            ctx2d.moveTo(p.x, p.y);
            ctx2d.lineTo(q.x, q.y);
            ctx2d.strokeStyle = 'rgba(' + col + ',' + (0.16 * (1 - dist / CONNECT)) + ')';
            ctx2d.lineWidth = 0.65;
            ctx2d.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    }

    hero.addEventListener('mousemove', e => {
      const r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });
    hero.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
    window.addEventListener('resize', () => { resize(); init(); });
    resize(); init(); draw();
  })();

  /* ============================================================
     2. FLOATING HERO ILLUSTRATION CARD
     ============================================================ */
  (function floatIllustration() {
    if (prefersReduced || isMob()) return;
    const card = $('.hero-illustration');
    if (!card) return;
    gsap.to(card, { y: -12, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  })();

  /* ============================================================
     3. MAGNETIC BUTTONS (Micro-interaction)
     ============================================================ */
  (function magneticButtons() {
    if (prefersReduced || isMob()) return;
    $$('.btn, .hero-socials a').forEach(btn => {
      let bounds;
      btn.addEventListener('mouseenter', () => {
        bounds = btn.getBoundingClientRect();
        gsap.to(btn, { scale: 1.06, duration: 0.22, ease: 'power2.out' });
      });
      btn.addEventListener('mousemove', e => {
        if (!bounds) return;
        const dx = (e.clientX - (bounds.left + bounds.width / 2)) * 0.25;
        const dy = (e.clientY - (bounds.top + bounds.height / 2)) * 0.25;
        gsap.to(btn, { x: dx, y: dy, duration: 0.18, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.42, ease: 'elastic.out(1,0.5)' });
        bounds = null;
      });
    });
  })();

  /* ============================================================
     4. HERO TITLE HOVER GLOW (NO letter splitting, preserves text)
     ============================================================ */
  (function heroNameHover() {
    const heroName = $('.hero-name');
    if (!heroName) return;
    // Guaranteed clean text without DOM splitting
    heroName.style.visibility = 'visible';
    heroName.style.opacity = '1';

    heroName.addEventListener('mouseenter', () => {
      gsap.to(heroName, {
        textShadow: '0 0 25px rgba(167,139,250,0.5), 0 0 50px rgba(99,102,241,0.3)',
        duration: 0.35,
        ease: 'power2.out'
      });
    });
    heroName.addEventListener('mouseleave', () => {
      gsap.to(heroName, { textShadow: 'none', duration: 0.45, ease: 'power2.out' });
    });
  })();

  /* ============================================================
     5. SAFE SCROLL-TRIGGERED REVEALS (Additive transforms only)
        Elements start fully visible; animations gently lift them into view.
     ============================================================ */
  (function scrollReveals() {
    if (prefersReduced) return;

    // Helper for subtle slide-up without ever leaving opacity at 0
    function subtleReveal(selector, startY, stagger) {
      const els = $$(selector);
      if (!els.length) return;

      els.forEach((el, i) => {
        el.style.visibility = 'visible';
        el.style.opacity = '1';

        ScrollTrigger.create({
          trigger: el,
          start: 'top 95%',
          once: true,
          onEnter: () => {
            gsap.fromTo(el,
              { y: startY || 20, opacity: 0.6 },
              {
                y: 0,
                opacity: 1,
                duration: 0.65,
                delay: (stagger || 0) * i,
                ease: 'power2.out',
                clearProps: 'all'
              }
            );
          }
        });
      });
    }

    subtleReveal('.section-tag', 15, 0);
    subtleReveal('.section-title', 20, 0);
    subtleReveal('.section-subtitle', 15, 0);

    // About Section
    const aboutImg = $('.about-image-wrap');
    if (aboutImg) {
      aboutImg.style.visibility = 'visible';
      aboutImg.style.opacity = '1';
      ScrollTrigger.create({
        trigger: aboutImg,
        start: 'top 95%',
        once: true,
        onEnter: () => {
          gsap.fromTo(aboutImg,
            { x: -30, opacity: 0.7 },
            { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out', clearProps: 'all' }
          );
        }
      });
    }

    const aboutContent = $('.about-content');
    if (aboutContent) {
      aboutContent.style.visibility = 'visible';
      aboutContent.style.opacity = '1';
      ScrollTrigger.create({
        trigger: aboutContent,
        start: 'top 95%',
        once: true,
        onEnter: () => {
          gsap.fromTo(aboutContent,
            { x: 30, opacity: 0.7 },
            { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out', clearProps: 'all' }
          );
        }
      });
    }

    // Skill tags subtle bounce
    $$('.skill-tag').forEach((tag, i) => {
      tag.style.visibility = 'visible';
      tag.style.opacity = '1';
      ScrollTrigger.create({
        trigger: tag,
        start: 'top 98%',
        once: true,
        onEnter: () => {
          gsap.fromTo(tag,
            { scale: 0.85, opacity: 0.7 },
            { scale: 1, opacity: 1, duration: 0.4, delay: i * 0.025, ease: 'back.out(2)', clearProps: 'all' }
          );
        }
      });
    });

    // Edu, Project, Timeline, Achievement, Testimonial cards
    subtleReveal('.edu-card', 25, 0.1);
    subtleReveal('.project-card', 25, 0.08);
    subtleReveal('.timeline-item', 20, 0.08);
    subtleReveal('.achievement-card', 25, 0.1);
    subtleReveal('.testimonial-card', 20, 0.08);
    subtleReveal('.whats-new-card', 20, 0.08);
    subtleReveal('.contact-info', 20, 0);
    subtleReveal('.contact-form-wrap', 25, 0);
  })();

  /* ============================================================
     6. PROJECT CARD 3D TILT
     ============================================================ */
  (function projectTilt() {
    if (prefersReduced || isMob()) return;
    $$('.project-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -10;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 10;
        gsap.to(card, {
          rotateX: rx,
          rotateY: ry,
          scale: 1.02,
          transformPerspective: 900,
          duration: 0.25,
          ease: 'power2.out'
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.45, ease: 'elastic.out(1,0.5)' });
      });
    });
  })();

  /* ============================================================
     7. CARD HOVER LIFTS (Purely additive)
     ============================================================ */
  (function cardHovers() {
    if (prefersReduced || isMob()) return;
    function hoverLift(sel, y, sc) {
      $$(sel).forEach(el => {
        el.addEventListener('mouseenter', () => gsap.to(el, { y: -y, scale: sc, duration: 0.28, ease: 'power2.out' }));
        el.addEventListener('mouseleave', () => gsap.to(el, { y: 0, scale: 1, duration: 0.4, ease: 'elastic.out(1,0.5)' }));
      });
    }
    hoverLift('.edu-card', 6, 1.015);
    hoverLift('.achievement-card', 7, 1.015);
    hoverLift('.testimonial-card', 5, 1.015);
  })();

  /* ============================================================
     8. TIMELINE DOT PULSE
     ============================================================ */
  (function timelinePulse() {
    $$('.timeline-dot').forEach(dot => {
      gsap.to(dot, {
        scale: 1.25,
        boxShadow: '0 0 0 10px rgba(99,102,241,0.12)',
        duration: 1.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
    if (prefersReduced || isMob()) return;
    $$('.timeline-card').forEach(card => {
      card.addEventListener('mouseenter', () => gsap.to(card, { x: 5, duration: 0.25, ease: 'power2.out' }));
      card.addEventListener('mouseleave', () => gsap.to(card, { x: 0, duration: 0.35, ease: 'power2.out' }));
    });
  })();

  /* ============================================================
     9. SCROLL PROGRESS GLOW
     ============================================================ */
  (function progressGlow() {
    const bar = document.getElementById('scroll-progress');
    if (!bar || prefersReduced) return;
    gsap.to(bar, {
      boxShadow: '0 0 10px rgba(99,102,241,0.85), 0 0 24px rgba(99,102,241,0.4)',
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  })();

  /* ============================================================
     10. CURSOR RING — SMOOTH FOLLOW
     ============================================================ */
  (function upgradeCursor() {
    if (isMob() || prefersReduced) return;
    const ring = document.getElementById('cursor-ring');
    if (!ring) return;
    let mx = -300, my = -300, rX = -300, rY = -300;
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function loop() {
      rX += (mx - rX) * 0.12;
      rY += (my - rY) * 0.12;
      ring.style.transform = 'translate(' + rX + 'px,' + rY + 'px)';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mousedown', () => {
      gsap.fromTo(ring,
        { scale: 1, opacity: 1 },
        {
          scale: 2.2, opacity: 0, duration: 0.4, ease: 'power2.out',
          onComplete: () => gsap.set(ring, { scale: 1, opacity: 1 })
        }
      );
    });
  })();

  /* ============================================================
     11. HAMBURGER MORPH
     ============================================================ */
  (function hamburgerMorph() {
    const ham = document.getElementById('hamburger');
    if (!ham || prefersReduced) return;
    const spans = $$('span', ham);
    if (spans.length < 3) return;
    ham.addEventListener('click', () => {
      const open = ham.classList.contains('open');
      if (open) {
        gsap.to(spans[0], { y: 0, rotation: 0, duration: 0.25, ease: 'power2.inOut' });
        gsap.to(spans[1], { opacity: 1, scaleX: 1, duration: 0.18 });
        gsap.to(spans[2], { y: 0, rotation: 0, duration: 0.25, ease: 'power2.inOut' });
      } else {
        gsap.to(spans[0], { y: 8, rotation: 45, duration: 0.25, ease: 'power2.inOut' });
        gsap.to(spans[1], { opacity: 0, scaleX: 0, duration: 0.18 });
        gsap.to(spans[2], { y: -8, rotation: -45, duration: 0.25, ease: 'power2.inOut' });
      }
    });
  })();

  /* ============================================================
     12. BUTTON RIPPLE ON CLICK
     ============================================================ */
  (function buttonRipple() {
    $$('.btn').forEach(btn => {
      const s = getComputedStyle(btn);
      if (s.position === 'static') btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.addEventListener('click', e => {
        const rpl = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const sz = Math.max(rect.width, rect.height) * 2.2;
        rpl.style.cssText =
          'position:absolute;border-radius:50%;background:rgba(255,255,255,0.25);' +
          'pointer-events:none;' +
          'width:' + sz + 'px;height:' + sz + 'px;' +
          'left:' + (e.clientX - rect.left - sz / 2) + 'px;' +
          'top:' + (e.clientY - rect.top - sz / 2) + 'px;' +
          'transform:scale(0);';
        btn.appendChild(rpl);
        gsap.to(rpl, { scale: 1, opacity: 0, duration: 0.55, ease: 'power2.out', onComplete: () => rpl.remove() });
      });
    });
  })();

  /* ============================================================
     13. SECTION TITLE ACCENT LINE
     ============================================================ */
  (function sectionDrawLines() {
    if (prefersReduced) return;
    $$('.section-title').forEach(title => {
      // Avoid duplicate line
      if (title.nextElementSibling && title.nextElementSibling.classList.contains('agy-section-line')) return;
      const line = document.createElement('div');
      line.className = 'agy-section-line';
      line.style.cssText =
        'height:2px;width:0;margin:8px 0 0;display:block;' +
        'background:linear-gradient(90deg,#6366f1,#a78bfa,transparent);border-radius:2px;';
      title.after(line);
      ScrollTrigger.create({
        trigger: title,
        start: 'top 95%',
        once: true,
        onEnter: () => gsap.to(line, { width: '80px', duration: 0.85, ease: 'power3.out' })
      });
    });
  })();

  /* ============================================================
     14. SMOOTH ANCHOR SCROLL
     ============================================================ */
  (function smoothAnchors() {
    if (prefersReduced) return;
    $$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        gsap.to(window, { scrollTo: { y: target, offsetY: 80 }, duration: 1.0, ease: 'power3.inOut' });
      });
    });
  })();

  /* ============================================================
     15. WHATS-NEW TRACK DRAG
     ============================================================ */
  (function wnDrag() {
    const track = document.getElementById('whats-new-track');
    if (!track) return;
    let down = false, startX, scrollLeft, vel = 0, lastX, rafId;
    track.addEventListener('mousedown', e => {
      down = true; track.style.cursor = 'grabbing';
      startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft;
      lastX = e.pageX; vel = 0; cancelAnimationFrame(rafId);
    });
    document.addEventListener('mouseup', () => {
      if (!down) return;
      down = false; track.style.cursor = '';
      (function coast() {
        if (Math.abs(vel) < 0.5) return;
        track.scrollLeft -= vel; vel *= 0.93; rafId = requestAnimationFrame(coast);
      })();
    });
    document.addEventListener('mousemove', e => {
      if (!down) return;
      e.preventDefault();
      vel = lastX - e.pageX; lastX = e.pageX;
      track.scrollLeft = scrollLeft - (e.pageX - track.offsetLeft - startX) * 1.1;
    });
  })();

  /* ============================================================
     16. ACHIEVEMENT GLOW PULSE
     ============================================================ */
  (function achievementPulse() {
    $$('.achievement-glow').forEach((g, i) => {
      gsap.to(g, {
        opacity: 0.4, scale: 1.2, duration: 2.2 + i * 0.35,
        repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.5
      });
    });
  })();

  /* ============================================================
     17. NAV LINK MICRO-SCALE
     ============================================================ */
  (function navHover() {
    if (prefersReduced || isMob()) return;
    $$('.nav-link').forEach(link => {
      link.addEventListener('mouseenter', () => gsap.to(link, { scale: 1.08, duration: 0.18, ease: 'power2.out' }));
      link.addEventListener('mouseleave', () => gsap.to(link, { scale: 1, duration: 0.28, ease: 'power2.out' }));
    });
  })();

  console.log('[animations.js] Ultra-safe premium GSAP layer loaded successfully.');
})();
