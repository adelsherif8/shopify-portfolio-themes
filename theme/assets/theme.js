/* ── CINEMATIC PORTFOLIO THEME — theme.js ── */

(function () {
  'use strict';

  /* ── PRELOADER ── */
  const preloader = document.getElementById('preloader');
  const fill = preloader?.querySelector('.preloader-fill');
  let progress = 0;

  function runPreloader() {
    const iv = setInterval(() => {
      progress += Math.random() * 14 + 4;
      if (fill) fill.style.width = Math.min(progress, 100) + '%';
      if (progress >= 100) {
        clearInterval(iv);
        setTimeout(() => {
          preloader?.classList.add('done');
          document.body.dispatchEvent(new CustomEvent('theme:ready'));
        }, 300);
      }
    }, 60);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runPreloader);
  } else {
    runPreloader();
  }


  /* ── SPOTLIGHT ── */
  const globalSpotlight = document.getElementById('global-spotlight');
  if (globalSpotlight) {
    window.addEventListener('mousemove', e => {
      if (!globalSpotlight.classList.contains('ready')) globalSpotlight.classList.add('ready');
      globalSpotlight.style.setProperty('--gsx', (e.clientX / window.innerWidth * 100).toFixed(1) + '%');
      globalSpotlight.style.setProperty('--gsy', (e.clientY / window.innerHeight * 100).toFixed(1) + '%');
    }, { passive: true });
  }

  /* ── SCROLL PROGRESS BAR ── */
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const max  = document.documentElement.scrollHeight - window.innerHeight;
    const pct  = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  }, { passive: true });

  /* ── HEADER SCROLL STATE ── */
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });

  /* ── SCENE COUNTER ── */
  const sceneNum = document.getElementById('scene-num');
  const sections = document.querySelectorAll('[data-section-num]');
  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && sceneNum) {
        sceneNum.textContent = entry.target.dataset.sectionNum || '001';
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => sectionObs.observe(s));

  /* ── THEME SWITCHER ── */
  const html = document.documentElement;
  const themes = ['dark', 'day', 'dc'];
  let themeIdx = 0;
  const saved = localStorage.getItem('portfolio-theme');
  if (saved) {
    themeIdx = themes.indexOf(saved);
    if (themeIdx < 0) themeIdx = 0;
    html.setAttribute('data-theme', saved);
  }

  document.getElementById('ctrl-theme')?.addEventListener('click', () => {
    themeIdx = (themeIdx + 1) % 2; // dark/day only
    const t = themes[themeIdx];
    html.setAttribute('data-theme', t);
    localStorage.setItem('portfolio-theme', t);
  });

  document.getElementById('ctrl-dc')?.addEventListener('click', () => {
    const isDC = html.getAttribute('data-theme') === 'dc';
    html.setAttribute('data-theme', isDC ? (themes[themeIdx] || 'dark') : 'dc');
    localStorage.setItem('portfolio-theme', html.getAttribute('data-theme'));
  });

  /* ── LANGUAGE TOGGLE ── */
  const translations = {
    en: {
      dir: 'ltr',
      'nav-about': 'About', 'nav-reel': 'Reel', 'nav-films': 'Films',
      'nav-gallery': 'Gallery', 'nav-craft': 'Craft', 'nav-breakdown': 'Breakdown',
      'nav-press': 'Press', 'nav-contact': 'Contact',
      'hero-eyebrow': 'Filmmaker · Scriptwriter · Creative Director',
      'hero-scroll': 'Scroll',
      'cart-title': 'Cart',
      'cart-empty': 'Your cart is empty.',
      'cart-subtotal': 'Subtotal',
      'cart-checkout': 'Checkout →',
      'cart-view': 'View cart',
      'search-placeholder': 'Search products, journal, pages…',
      'atc-btn': 'Add to Cart',
      'sold-out': 'Sold Out',
      'qty-label': 'Quantity',
      'menu-label': 'MENU',
      'secure-checkout': 'Secure checkout',
      'free-shipping': 'Free shipping',
      'easy-returns': 'Easy returns',
      'description-label': 'Description',
      'share-label': 'Share',
    },
    ar: {
      dir: 'rtl',
      'nav-about': 'من أنا', 'nav-reel': 'الشريط', 'nav-films': 'الأفلام',
      'nav-gallery': 'المعرض', 'nav-craft': 'الحرفة', 'nav-breakdown': 'تحليل السيناريو',
      'nav-press': 'العروض', 'nav-contact': 'تواصل',
      'hero-eyebrow': 'مخرج · كاتب سيناريو · مدير إبداعي',
      'hero-scroll': 'اسحب',
      'cart-title': 'السلة',
      'cart-empty': 'سلتك فارغة.',
      'cart-subtotal': 'المجموع الجزئي',
      'cart-checkout': 'إتمام الشراء ←',
      'cart-view': 'عرض السلة',
      'search-placeholder': 'ابحث عن المنتجات والمقالات...',
      'atc-btn': 'أضف إلى السلة',
      'sold-out': 'نفدت الكمية',
      'qty-label': 'الكمية',
      'menu-label': 'القائمة',
      'secure-checkout': 'دفع آمن',
      'free-shipping': 'شحن مجاني',
      'easy-returns': 'إرجاع سهل',
      'description-label': 'الوصف',
      'share-label': 'مشاركة',
    }
  };

  let lang = localStorage.getItem('portfolio-lang') || 'en';
  applyLang(lang);

  document.getElementById('ctrl-lang')?.addEventListener('click', () => {
    lang = lang === 'en' ? 'ar' : 'en';
    localStorage.setItem('portfolio-lang', lang);
    applyLang(lang);
    /* update toggle button label */
    const btn = document.getElementById('ctrl-lang');
    if (btn) btn.textContent = lang === 'ar' ? 'EN' : 'AR';
  });

  function applyLang(l) {
    const t = translations[l];
    html.setAttribute('data-lang', l);
    html.setAttribute('dir', t.dir);
    /* swap data-i18n text nodes */
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key] !== undefined) el.textContent = t[key];
    });
    /* swap data-i18n-ar / data-i18n-en attributes */
    document.querySelectorAll('[data-i18n-ar]').forEach(el => {
      if (l === 'ar') el.textContent = el.dataset.i18nAr;
      else if (el.dataset.i18nEn) el.textContent = el.dataset.i18nEn;
    });
    /* swap input placeholders */
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (t[key] !== undefined) el.placeholder = t[key];
    });
  }

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');
  if (window.Shopify && window.Shopify.designMode) {
    revealEls.forEach(el => el.classList.add('visible'));
  } else {
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObs.observe(el));
  }

  function reinitEditorCarousels() {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => el.classList.add('visible'));
    document.querySelectorAll('.films-carousel').forEach(el => {
      const id = el.id;
      const sid = id.replace('films-carousel-', '');
      initCarousel(id, 'films-track-' + sid, 'films-dots-' + sid, '.films-btn-prev', '.films-btn-next', 'films-dot');
    });
    document.querySelectorAll('.influences-carousel').forEach(el => {
      const id = el.id;
      const sid = id.replace('influences-carousel-', '');
      initCarousel(id, 'influences-track-' + sid, 'influences-dots-' + sid, '.influences-btn-prev', '.influences-btn-next', 'influences-dot');
    });
  }
  document.addEventListener('shopify:section:load', reinitEditorCarousels);
  document.addEventListener('shopify:block:select', reinitEditorCarousels);

  /* ── PAGE TRANSITION ── */
  const pt = document.getElementById('page-transition');
  window.__filmTransition = function (cb) {
    pt?.classList.add('active');
    setTimeout(() => { cb(); setTimeout(() => pt?.classList.remove('active'), 350); }, 350);
  };

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ── CAROUSEL (films + influences) ── */
  function initCarousel(carouselId, trackId, dotsId, btnPrevSel, btnNextSel, dotClass) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    const track   = document.getElementById(trackId);
    const dotsWrap = document.getElementById(dotsId);
    const slides  = track ? Array.from(track.children) : [];
    if (!slides.length) return;

    let idx = 0;

    /* build dots */
    slides.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = dotClass + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Slide ' + (i + 1));
      d.addEventListener('click', () => go(i));
      if (dotsWrap) dotsWrap.appendChild(d);
    });

    const dots = dotsWrap ? Array.from(dotsWrap.children) : [];
    const btnPrev = carousel.querySelector(btnPrevSel);
    const btnNext = carousel.querySelector(btnNextSel);

    function go(n) {
      idx = Math.max(0, Math.min(n, slides.length - 1));
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      if (btnPrev) btnPrev.disabled = idx === 0;
      if (btnNext) btnNext.disabled = idx === slides.length - 1;
    }

    if (btnPrev) btnPrev.addEventListener('click', () => go(idx - 1));
    if (btnNext) btnNext.addEventListener('click', () => go(idx + 1));

    /* swipe support */
    let touchStartX = 0;
    carousel.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', e => {
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      const diff = (touchStartX - e.changedTouches[0].clientX) * (isRTL ? -1 : 1);
      if (Math.abs(diff) > 40) go(diff > 0 ? idx + 1 : idx - 1);
    });

    go(0);
  }

  /* ── FILMS CAROUSEL (page-based, 3-per-view on desktop) ── */
  function initFilmsCarousel(carouselId, trackId, dotsId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    const track = document.getElementById(trackId);
    const dotsWrap = document.getElementById(dotsId);
    if (!track) return;
    const slides = Array.from(track.children);
    if (!slides.length) return;

    let pageIdx = 0;
    let perPage = 1;
    let pageCount = slides.length;

    const btnPrev = carousel.querySelector('.films-btn-prev');
    const btnNext = carousel.querySelector('.films-btn-next');

    function calcLayout() {
      const cw = carousel.offsetWidth;
      const sw = slides[0].offsetWidth;
      perPage = sw > 0 ? Math.round(cw / sw) : 1;
      perPage = Math.max(1, perPage);
      pageCount = Math.ceil(slides.length / perPage);
    }

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      for (let i = 0; i < pageCount; i++) {
        const d = document.createElement('button');
        d.className = 'films-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', 'Page ' + (i + 1));
        d.addEventListener('click', () => go(i));
        dotsWrap.appendChild(d);
      }
    }

    function go(n) {
      pageIdx = Math.max(0, Math.min(n, pageCount - 1));
      track.style.transform = `translateX(-${pageIdx * 100}%)`;
      if (dotsWrap) {
        Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle('active', i === pageIdx));
      }
      if (btnPrev) btnPrev.disabled = pageIdx === 0;
      if (btnNext) btnNext.disabled = pageIdx >= pageCount - 1;
    }

    function init() {
      calcLayout();
      buildDots();
      go(0);
    }

    if (btnPrev) btnPrev.addEventListener('click', () => go(pageIdx - 1));
    if (btnNext) btnNext.addEventListener('click', () => go(pageIdx + 1));

    let touchStartX = 0;
    carousel.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', e => {
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      const diff = (touchStartX - e.changedTouches[0].clientX) * (isRTL ? -1 : 1);
      if (Math.abs(diff) > 40) go(diff > 0 ? pageIdx + 1 : pageIdx - 1);
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 200);
    });

    init();
  }

  /* init all film carousels on the page */
  document.querySelectorAll('.films-carousel').forEach(el => {
    const sid = el.id.replace('films-carousel-', '');
    initFilmsCarousel(el.id, 'films-track-' + sid, 'films-dots-' + sid);
  });

  /* init all influences carousels */
  document.querySelectorAll('.influences-carousel').forEach(el => {
    const id = el.id;
    const sectionId = id.replace('influences-carousel-', '');
    initCarousel(
      id,
      'influences-track-' + sectionId,
      'influences-dots-' + sectionId,
      '.influences-btn-prev',
      '.influences-btn-next',
      'influences-dot'
    );
  });

  /* ── TESTIMONIALS CAROUSEL ── */
  const slides   = document.querySelectorAll('.testimonial-slide');
  const dots     = document.querySelectorAll('.testimonial-dot');
  let tIdx = 0;

  function setTestimonial(i) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    tIdx = i;
    slides[i]?.classList.add('active');
    dots[i]?.classList.add('active');
  }
  if (slides.length) {
    setTestimonial(0);
    setInterval(() => setTestimonial((tIdx + 1) % slides.length), 5000);
    dots.forEach((d, i) => d.addEventListener('click', () => setTestimonial(i)));
  }

  /* ── HERO CANVAS: PARTICLES + LIGHT LEAKS ── */
  const heroCanvas = document.getElementById('hero-canvas');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let W, H, rafId;
    const resize = () => {
      W = heroCanvas.width  = heroCanvas.offsetWidth;
      H = heroCanvas.height = heroCanvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const pts = Array.from({ length: 90 }, () => ({
      x: Math.random() * 1600, y: Math.random() * 900,
      r: Math.random() + .15, vx: (Math.random() - .5) * .12, vy: (Math.random() - .5) * .08 - .04,
      o: Math.random() * .28 + .04, life: Math.random(),
    }));
    const leaks = Array.from({ length: 4 }, () => ({
      x: Math.random() * 2000, y: Math.random() * 1000,
      angle: .18 + Math.random() * .28, len: 260 + Math.random() * 320,
      w: 45 + Math.random() * 75, speed: .3 + Math.random() * .22,
      o: .03 + Math.random() * .032, hue: Math.random() > .5 ? '184,120,30' : '110,55,15',
    }));

    function draw() {
      ctx.clearRect(0, 0, W, H);
      leaks.forEach(l => {
        ctx.save();
        ctx.translate(l.x / 1600 * W, l.y / 1000 * H);
        ctx.rotate(l.angle);
        const gr = ctx.createLinearGradient(0, 0, l.len, 0);
        gr.addColorStop(0, `rgba(${l.hue},0)`);
        gr.addColorStop(.45, `rgba(${l.hue},${l.o})`);
        gr.addColorStop(1, `rgba(${l.hue},0)`);
        ctx.fillStyle = gr;
        ctx.fillRect(0, -l.w / 2, l.len, l.w);
        ctx.restore();
        l.x += Math.cos(l.angle) * l.speed * 1600 / W;
        l.y += Math.sin(l.angle) * l.speed * 1000 / H;
        if (l.x > 1800 || l.y > 1100) { l.x = -200; l.y = Math.random() * 1000; }
      });
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life += .003;
        const a = p.o * Math.sin(p.life * Math.PI);
        ctx.beginPath();
        ctx.arc(p.x / 1600 * W, p.y / 900 * H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184,151,58,${Math.max(0, a)})`;
        ctx.fill();
        if (p.y < -5 || p.life > 1) { p.x = Math.random() * 1600; p.y = 900; p.life = 0; }
      });
      rafId = requestAnimationFrame(draw);
    }
    draw();
  }

  /* ── HERO SPOTLIGHT ── */
  const heroSection   = document.getElementById('section-hero');
  const heroSpotlight = document.getElementById('hero-spotlight');
  if (heroSection && heroSpotlight) {
    document.addEventListener('mousemove', e => {
      const r = heroSection.getBoundingClientRect();
      heroSpotlight.style.setProperty('--sx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      heroSpotlight.style.setProperty('--sy', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    }, { passive: true });
  }

  /* ── HERO PARALLAX ── */
  const heroContent = document.getElementById('hero-content');
  const heroSectionEl = document.getElementById('section-hero');
  window.addEventListener('scroll', () => {
    if (!heroContent || !heroSectionEl) return;
    const heroH = heroSectionEl.offsetHeight;
    if (window.scrollY > heroH) {
      heroContent.style.transform = '';
    } else {
      heroContent.style.transform = `translateY(${window.scrollY * .22}px)`;
    }
  }, { passive: true });

  /* ── HERO GLITCH ── */
  const heroName = document.getElementById('hero-name');
  if (heroName) {
    heroName.addEventListener('mouseenter', () => heroName.classList.add('glitch'));
    heroName.addEventListener('mouseleave', () => heroName.classList.remove('glitch'));
  }

  /* ── REEL CANVAS: BOKEH ── */
  const reelCanvas = document.getElementById('reel-canvas');
  if (reelCanvas) {
    const ctx = reelCanvas.getContext('2d');
    let W, H, rafId;
    const resize = () => {
      W = reelCanvas.width  = reelCanvas.offsetWidth;
      H = reelCanvas.height = reelCanvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const bk = Array.from({ length: 16 }, () => ({
      x: Math.random() * 2000, y: Math.random() * 1000, r: 25 + Math.random() * 80,
      vx: (Math.random() - .5) * .2, vy: (Math.random() - .5) * .15,
      o: .04 + Math.random() * .06, phase: Math.random() * Math.PI * 2,
    }));
    function drawReel() {
      ctx.clearRect(0, 0, W, H);
      bk.forEach(b => {
        b.x += b.vx; b.y += b.vy; b.phase += .007;
        const a = b.o * (.6 + .4 * Math.sin(b.phase));
        const gr = ctx.createRadialGradient(b.x / 2000 * W, b.y / 1000 * H, 0, b.x / 2000 * W, b.y / 1000 * H, b.r);
        gr.addColorStop(0, `rgba(184,151,58,${a})`);
        gr.addColorStop(1, 'rgba(184,151,58,0)');
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(b.x / 2000 * W, b.y / 1000 * H, b.r, 0, Math.PI * 2);
        ctx.fill();
        if (b.x < -b.r) b.x = 2000 + b.r;
        if (b.x > 2000 + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = 1000 + b.r;
        if (b.y > 1000 + b.r) b.y = -b.r;
      });
      rafId = requestAnimationFrame(drawReel);
    }
    drawReel();
  }

  /* ── REEL MODAL ── */
  const reelModal    = document.getElementById('reel-modal');
  const reelIframe   = document.getElementById('reel-iframe');
  const reelEmbedWrap = document.getElementById('reel-embed-wrap');
  const reelPlay     = document.getElementById('reel-play-btn');
  const reelClose    = document.getElementById('reel-close-btn');

  reelPlay?.addEventListener('click', () => {
    const type = reelPlay.dataset.videoType;
    const src  = reelPlay.dataset.videoSrc;
    const ytId = reelPlay.dataset.videoId;

    if (!reelEmbedWrap) return;
    reelEmbedWrap.innerHTML = '';

    if (type === 'native' && src) {
      const vid = document.createElement('video');
      vid.src = src; vid.autoplay = true; vid.controls = true; vid.playsinline = true;
      vid.style.cssText = 'width:100%;height:100%;display:block;background:#000;';
      reelEmbedWrap.appendChild(vid);
    } else if (type === 'url' && src) {
      let embedSrc = src;
      const ytMatch = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      const viMatch = src.match(/vimeo\.com\/(\d+)/);
      if (ytMatch) embedSrc = `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
      else if (viMatch) embedSrc = `https://player.vimeo.com/video/${viMatch[1]}?autoplay=1`;
      if (ytMatch || viMatch) {
        const fr = document.createElement('iframe');
        fr.src = embedSrc; fr.allowFullscreen = true; fr.allow = 'autoplay';
        fr.style.cssText = 'width:100%;height:100%;border:0;';
        reelEmbedWrap.appendChild(fr);
      } else {
        const vid = document.createElement('video');
        vid.src = src; vid.autoplay = true; vid.controls = true; vid.playsinline = true;
        vid.style.cssText = 'width:100%;height:100%;display:block;background:#000;';
        reelEmbedWrap.appendChild(vid);
      }
    } else if (ytId) {
      const fr = document.createElement('iframe');
      fr.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
      fr.allowFullscreen = true; fr.allow = 'autoplay';
      fr.style.cssText = 'width:100%;height:100%;border:0;';
      reelEmbedWrap.appendChild(fr);
    } else {
      alert('Add a video in the Reel section settings.');
      return;
    }
    reelModal?.classList.add('open');
  });

  const closeReel = () => {
    reelModal?.classList.remove('open');
    if (reelEmbedWrap) reelEmbedWrap.innerHTML = '';
  };
  reelClose?.addEventListener('click', closeReel);
  reelModal?.addEventListener('click', e => { if (e.target === reelModal) closeReel(); });

  /* ── CONTACT CANVAS: RIPPLES ── */
  const contactCanvas = document.getElementById('contact-canvas');
  if (contactCanvas) {
    const ctx = contactCanvas.getContext('2d');
    let W, H, rings = [], rafId;
    const resize = () => {
      W = contactCanvas.width  = contactCanvas.offsetWidth;
      H = contactCanvas.height = contactCanvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const spawn = () => rings.push({ r: 0, o: .2, spd: .45 });
    const tid = setInterval(spawn, 2800);
    spawn();
    function drawContact() {
      ctx.clearRect(0, 0, W, H);
      rings = rings.filter(r => r.o > 0);
      rings.forEach(r => {
        r.r += r.spd; r.o -= .0007;
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, r.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(184,151,58,${Math.max(0, r.o)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      rafId = requestAnimationFrame(drawContact);
    }
    drawContact();
  }

  /* ── CONTACT MAGNETIC BUTTON ── */
  const magBtn = document.getElementById('contact-email-btn');
  if (magBtn) {
    magBtn.addEventListener('mousemove', e => {
      const r = magBtn.getBoundingClientRect();
      magBtn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .2}px,${(e.clientY - r.top - r.height / 2) * .2}px)`;
      magBtn.style.transition = 'transform .1s';
    });
    magBtn.addEventListener('mouseleave', () => {
      magBtn.style.transform = 'translate(0,0)';
      magBtn.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
    });
  }

  /* ── RADAR CHART ── */
  const radarSvg = document.getElementById('craft-radar');
  if (radarSvg) {
    const radarData = [
      { name: 'Script Writing',    val: 0.95 },
      { name: 'Story Dev',         val: 0.90 },
      { name: 'Creative Dir',      val: 0.88 },
      { name: 'Visual Story',      val: 0.84 },
      { name: 'Film Production',   val: 0.80 },
      { name: 'Sound Recording',   val: 0.78 },
      { name: 'Set Collaboration', val: 0.82 },
      { name: 'Directing',         val: 0.76 },
    ];

    const cx = 200, cy = 200, maxR = 138;
    const n = radarData.length;
    const angle = i => (i * 2 * Math.PI / n) - Math.PI / 2;
    const pt    = (r, i) => ({ x: cx + r * Math.cos(angle(i)), y: cy + r * Math.sin(angle(i)) });

    const ns = 'http://www.w3.org/2000/svg';
    const rings = [0.25, 0.5, 0.75, 1.0];

    rings.forEach(r => {
      const poly = document.createElementNS(ns, 'polygon');
      poly.setAttribute('points', radarData.map((_, i) => { const p = pt(r * maxR, i); return `${p.x},${p.y}`; }).join(' '));
      poly.setAttribute('fill', 'none');
      poly.setAttribute('stroke', 'rgba(184,151,58,0.09)');
      poly.setAttribute('stroke-width', '1');
      radarSvg.insertBefore(poly, radarSvg.firstChild);
    });

    radarData.forEach((_, i) => {
      const o = pt(maxR, i);
      const line = document.createElementNS(ns, 'line');
      line.setAttribute('x1', cx); line.setAttribute('y1', cy);
      line.setAttribute('x2', o.x); line.setAttribute('y2', o.y);
      line.setAttribute('stroke', 'rgba(184,151,58,0.07)');
      line.setAttribute('stroke-width', '1');
      radarSvg.insertBefore(line, radarSvg.firstChild);
    });

    const center = document.createElementNS(ns, 'circle');
    center.setAttribute('cx', cx); center.setAttribute('cy', cy); center.setAttribute('r', 3);
    center.setAttribute('fill', 'rgba(184,151,58,0.3)');
    radarSvg.appendChild(center);

    let started = false;
    let vals = radarData.map(() => 0);
    const polygon = document.createElementNS(ns, 'polygon');
    polygon.setAttribute('fill', 'rgba(184,151,58,0.07)');
    polygon.setAttribute('stroke', 'rgba(184,151,58,0.55)');
    polygon.setAttribute('stroke-width', '1.5');
    radarSvg.appendChild(polygon);

    const dots = radarData.map((_, i) => {
      const c = document.createElementNS(ns, 'circle');
      c.setAttribute('r', '3.5');
      c.setAttribute('fill', 'var(--gold)');
      c.setAttribute('opacity', '0.75');
      radarSvg.appendChild(c);
      return c;
    });

    radarData.forEach((d, i) => {
      const p = pt(maxR + 26, i);
      const anchor = p.x < cx - 8 ? 'end' : p.x > cx + 8 ? 'start' : 'middle';
      const text = document.createElementNS(ns, 'text');
      text.setAttribute('x', p.x); text.setAttribute('y', p.y);
      text.setAttribute('text-anchor', anchor);
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('font-size', '8');
      text.setAttribute('fill', 'rgba(255,255,255,0.38)');
      text.setAttribute('font-family', 'Space Mono, monospace');
      text.setAttribute('letter-spacing', '1');
      text.textContent = d.name.toUpperCase();
      radarSvg.appendChild(text);
    });

    const radarObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        let frame = 0;
        const total = 70;
        const tick = () => {
          frame++;
          const t = Math.min(frame / total, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          vals = radarData.map(d => d.val * ease);
          polygon.setAttribute('points', vals.map((v, i) => { const p = pt(v * maxR, i); return `${p.x},${p.y}`; }).join(' '));
          dots.forEach((dot, i) => {
            const p = pt(vals[i] * maxR, i);
            dot.setAttribute('cx', p.x); dot.setAttribute('cy', p.y);
          });
          if (frame < total) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    radarObs.observe(radarSvg);
  }

  /* ── STAT COUNT-UP ── */
  document.querySelectorAll('[data-countup]').forEach(el => {
    const target = parseInt(el.dataset.countup);
    const suffix = el.dataset.suffix || '';
    const isInf  = isNaN(target);
    if (isInf) { el.textContent = '∞'; return; }

    let started = false;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        let cur = 0;
        const step = Math.ceil(target / 30);
        const iv = setInterval(() => {
          cur = Math.min(cur + step, target);
          el.textContent = cur + suffix;
          if (cur >= target) clearInterval(iv);
        }, 40);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
  });

  /* ── HAMBURGER / MOBILE MENU ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNav  = document.getElementById('mobile-nav');

  function openMenu() {
    hamburger?.classList.add('open');
    mobileMenu?.classList.add('open');
    hamburger?.setAttribute('aria-expanded', 'true');
    mobileMenu?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    mobileMenu?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });

  document.getElementById('mobile-close')?.addEventListener('click', closeMenu);

  mobileNav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      closeMenu();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 350);
    });
  });

  document.getElementById('mobile-theme')?.addEventListener('click', () => {
    document.getElementById('ctrl-theme')?.click();
  });
  document.getElementById('mobile-lang')?.addEventListener('click', () => {
    document.getElementById('ctrl-lang')?.click();
  });

  /* ── ANNOUNCEMENT BAR ── */
  (function() {
    const bar = document.getElementById('announcement-bar');
    const closeBtn = document.getElementById('announcement-close');
    if (!bar || !closeBtn) return;
    if (sessionStorage.getItem('ann-dismissed')) { bar.style.display = 'none'; return; }
    closeBtn.addEventListener('click', () => {
      bar.style.maxHeight = bar.offsetHeight + 'px';
      requestAnimationFrame(() => { bar.style.maxHeight = '0'; bar.style.overflow = 'hidden'; });
      setTimeout(() => bar.style.display = 'none', 350);
      sessionStorage.setItem('ann-dismissed', '1');
    });
  })();

  /* ── BACK TO TOP ── */
  (function() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 600), { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  })();

  /* ── SEARCH MODAL ── */
  (function() {
    const modal   = document.getElementById('search-modal');
    const input   = document.getElementById('search-modal-input');
    const results = document.getElementById('search-modal-results');
    const openBtn = document.getElementById('header-search-btn');
    const closeBtn = document.getElementById('search-modal-close');
    const bg      = document.getElementById('search-modal-bg');
    if (!modal) return;

    function openSearch() {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => input?.focus(), 80);
    }
    function closeSearch() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
    openBtn?.addEventListener('click', openSearch);
    closeBtn?.addEventListener('click', closeSearch);
    bg?.addEventListener('click', closeSearch);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); });

    let searchTimer;
    input?.addEventListener('input', () => {
      clearTimeout(searchTimer);
      const q = input.value.trim();
      if (q.length < 2) { results.innerHTML = ''; return; }
      searchTimer = setTimeout(async () => {
        try {
          const res = await fetch(`/search/suggest.json?q=${encodeURIComponent(q)}&resources[type]=product,article&resources[limit]=5`);
          const data = await res.json();
          const items = [...(data.resources?.results?.products || []), ...(data.resources?.results?.articles || [])];
          results.innerHTML = items.map(item => `
            <a href="${item.url}" class="search-suggest-item">
              ${item.image ? `<img src="${item.image}" alt="" class="search-suggest-img" width="48" height="48" loading="lazy">` : '<div class="search-suggest-placeholder"></div>'}
              <div class="search-suggest-body">
                <div class="search-suggest-title">${item.title}</div>
                ${item.price ? `<div class="search-suggest-price">${(item.price / 100).toLocaleString('en-US', {style:'currency',currency:'USD'})}</div>` : ''}
              </div>
            </a>
          `).join('') || '<div class="search-no-results">No results found.</div>';
        } catch(_) {}
      }, 280);
    });
  })();

  /* ── CART DRAWER ── */
  (function() {
    const drawer    = document.getElementById('cart-drawer');
    const overlay   = document.getElementById('cart-drawer-overlay');
    const closeBtn  = document.getElementById('cart-drawer-close');
    const body      = document.getElementById('cart-drawer-body');
    const foot      = document.getElementById('cart-drawer-foot');
    const countEl   = document.getElementById('cart-drawer-count');
    const totalEl   = document.getElementById('cart-drawer-total');
    const headerCount = document.getElementById('header-cart-count');
    if (!drawer) return;

    async function fetchCart() {
      const res = await fetch('/cart.js');
      return res.json();
    }

    function moneyFormat(cents) {
      return (cents / 100).toLocaleString('en-US', { style: 'currency', currency: window.Shopify?.currency?.active || 'USD' });
    }

    async function renderCart() {
      const cart = await fetchCart();
      const count = cart.item_count;
      if (countEl) countEl.textContent = count;
      if (headerCount) headerCount.textContent = count;
      headerCount?.classList.toggle('has-items', count > 0);

      if (count === 0) {
        body.innerHTML = '<div class="cart-drawer-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" width="40" height="40" style="color:var(--gold);opacity:.2;margin-bottom:12px;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg><p>Your cart is empty.</p></div>';
        if (foot) foot.style.display = 'none';
        return;
      }

      body.innerHTML = cart.items.map(item => `
        <div class="cart-drawer-item" data-key="${item.key}">
          <a href="${item.url}" class="cart-drawer-item-img-wrap">
            ${item.image ? `<img src="${item.image}" alt="${item.product_title}" class="cart-drawer-item-img" width="80" height="80" loading="lazy">` : '<div class="cart-drawer-item-placeholder"></div>'}
          </a>
          <div class="cart-drawer-item-body">
            <div class="cart-drawer-item-title">${item.product_title}</div>
            ${item.variant_title && item.variant_title !== 'Default Title' ? `<div class="cart-drawer-item-variant">${item.variant_title}</div>` : ''}
            <div class="cart-drawer-item-bottom">
              <div class="cart-drawer-item-qty">
                <button class="cart-qty-btn" data-key="${item.key}" data-change="-1">−</button>
                <span>${item.quantity}</span>
                <button class="cart-qty-btn" data-key="${item.key}" data-change="1">+</button>
              </div>
              <div class="cart-drawer-item-price">${moneyFormat(item.final_line_price)}</div>
            </div>
          </div>
        </div>
      `).join('');

      if (totalEl) totalEl.textContent = moneyFormat(cart.total_price);
      if (foot) foot.style.display = 'flex';

      body.querySelectorAll('.cart-qty-btn[data-key]').forEach(btn => {
        btn.addEventListener('click', async () => {
          const key = btn.dataset.key;
          const item = cart.items.find(i => i.key === key);
          if (!item) return;
          const newQty = item.quantity + parseInt(btn.dataset.change);
          await fetch('/cart/change.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: key, quantity: Math.max(0, newQty) }) });
          renderCart();
        });
      });
    }

    function openDrawer() {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      renderCart();
    }
    function closeDrawer() {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    document.getElementById('header-cart-btn')?.addEventListener('click', openDrawer);
    closeBtn?.addEventListener('click', closeDrawer);
    overlay?.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

    /* intercept add-to-cart forms */
    document.addEventListener('submit', async e => {
      const form = e.target;
      if (!form.matches('[action="/cart/add"], form[action*="/cart/add"]')) return;
      e.preventDefault();
      const data = new FormData(form);
      await fetch('/cart/add.js', { method: 'POST', body: data });
      openDrawer();
    });

    /* initial count */
    fetchCart().then(cart => {
      if (headerCount) headerCount.textContent = cart.item_count;
      headerCount?.classList.toggle('has-items', cart.item_count > 0);
    });
  })();

  /* ── QUICK VIEW ── */
  (function() {
    const modal   = document.getElementById('quick-view');
    const overlay = document.getElementById('quick-view-overlay');
    const closeBtn = document.getElementById('quick-view-close');
    const body    = document.getElementById('quick-view-body');
    if (!modal) return;

    function closeQV() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    closeBtn?.addEventListener('click', closeQV);
    overlay?.addEventListener('click', closeQV);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeQV(); });

    document.addEventListener('click', async e => {
      const btn = e.target.closest('.coll-qv-btn');
      if (!btn) return;
      e.preventDefault();
      const url = btn.dataset.productUrl;
      if (!url) return;

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      body.innerHTML = '<div class="cart-drawer-loading"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24" class="cart-drawer-spinner"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg></div>';

      try {
        const res = await fetch(`${url}?view=quick-view`, { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        /* extract key product info */
        const title = doc.querySelector('h1,h2')?.textContent || '';
        const price = doc.querySelector('.pdp-price,.price')?.textContent || '';
        const img   = doc.querySelector('.pdp-media-img,img[src*="products"]');
        const desc  = doc.querySelector('.pdp-description,.product-description,.rte');

        body.innerHTML = `
          <div class="qv-layout">
            <div class="qv-img-wrap">${img ? `<img src="${img.src}" alt="${title}" class="qv-img" width="480" height="480" loading="eager">` : '<div class="qv-img-placeholder"></div>'}</div>
            <div class="qv-info">
              <h2 class="qv-title">${title}</h2>
              <div class="qv-price">${price}</div>
              ${desc ? `<div class="qv-desc">${desc.innerHTML}</div>` : ''}
              <a href="${url}" class="qv-view-full">View full details →</a>
            </div>
          </div>
        `;
      } catch(_) {
        body.innerHTML = '<div class="cart-drawer-empty"><p>Unable to load product.</p></div>';
      }
    });
  })();

  /* ── STICKY ATC ── */
  (function() {
    const stickyBar = document.getElementById('sticky-atc');
    const stickyBtn = document.getElementById('sticky-atc-btn');
    const atcBtn    = document.getElementById('pdp-atc');
    if (!stickyBar || !atcBtn) return;

    const observer = new IntersectionObserver(entries => {
      stickyBar.classList.toggle('visible', !entries[0].isIntersecting);
    }, { threshold: 0 });
    observer.observe(atcBtn);

    stickyBtn?.addEventListener('click', () => {
      atcBtn.click();
    });
  })();

  /* ── VIDEO MODAL ── */
  const videoModal = document.getElementById('video-modal');
  const videoFrame = document.getElementById('video-modal-frame');
  function openVideoModal(embedUrl) {
    if (!videoModal || !videoFrame) return;
    videoFrame.innerHTML = `<iframe src="${embedUrl}" allowfullscreen allow="autoplay"></iframe>`;
    videoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeVideoModal() {
    if (!videoModal) return;
    videoModal.classList.remove('open');
    if (videoFrame) videoFrame.innerHTML = '';
    document.body.style.overflow = '';
  }
  document.querySelectorAll('.showreel-card').forEach(card => {
    card.addEventListener('click', () => {
      const url = card.dataset.embed;
      if (url) openVideoModal(url);
    });
  });
  document.getElementById('video-modal-bg')?.addEventListener('click', closeVideoModal);
  document.getElementById('video-modal-close')?.addEventListener('click', closeVideoModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeVideoModal(); });

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen   = btn.getAttribute('aria-expanded') === 'true';
      const answer   = btn.nextElementSibling;
      const allBtns  = document.querySelectorAll('.faq-question');

      allBtns.forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const ans = b.nextElementSibling;
        if (ans) ans.style.maxHeight = '0';
      });

      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ── COOKIE BANNER ── */
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner) {
    if (!localStorage.getItem('cookie-consent')) {
      setTimeout(() => cookieBanner.classList.add('visible'), 1500);
    } else {
      cookieBanner.classList.add('hidden');
    }
    function dismissCookie(val) {
      localStorage.setItem('cookie-consent', val);
      cookieBanner.classList.remove('visible');
      setTimeout(() => cookieBanner.classList.add('hidden'), 450);
    }
    document.getElementById('cookie-accept')?.addEventListener('click', () => dismissCookie('accepted'));
    document.getElementById('cookie-decline')?.addEventListener('click', () => dismissCookie('declined'));
  }

  /* ── PRODUCT PAGE ── */
  (function initPDP() {
    if (!document.getElementById('pdp')) return;

    /* gallery */
    const galleryMain = document.getElementById('pdp-gallery-main');
    const slides = galleryMain ? Array.from(galleryMain.querySelectorAll('.pdp-media-slide')) : [];
    const thumbs = Array.from(document.querySelectorAll('.pdp-thumb'));

    function goSlide(n) {
      slides.forEach((s, i) => s.classList.toggle('active', i === n));
      thumbs.forEach((t, i) => t.classList.toggle('active', i === n));
    }
    thumbs.forEach((t, i) => t.addEventListener('click', () => goSlide(i)));

    /* swipe on gallery */
    let gTouchX = 0;
    if (galleryMain) {
      galleryMain.addEventListener('touchstart', e => { gTouchX = e.touches[0].clientX; }, { passive: true });
      galleryMain.addEventListener('touchend', e => {
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        const diff = (gTouchX - e.changedTouches[0].clientX) * (isRTL ? -1 : 1);
        const cur = slides.findIndex(s => s.classList.contains('active'));
        if (Math.abs(diff) > 40) goSlide(diff > 0 ? Math.min(cur + 1, slides.length - 1) : Math.max(cur - 1, 0));
      });
    }

    /* quantity */
    const qtyInput  = document.getElementById('pdp-qty');
    const formQty   = document.getElementById('pdp-form-qty');
    document.getElementById('pdp-qty-minus')?.addEventListener('click', () => {
      const v = Math.max(1, parseInt(qtyInput.value) - 1);
      qtyInput.value = formQty.value = v;
    });
    document.getElementById('pdp-qty-plus')?.addEventListener('click', () => {
      const v = parseInt(qtyInput.value) + 1;
      qtyInput.value = formQty.value = v;
    });

    /* variant selection */
    const variantInput = document.getElementById('pdp-variant-id');
    const priceEl      = document.getElementById('pdp-price');
    const atcBtn       = document.getElementById('pdp-atc');
    let selectedOptions = {};

    document.querySelectorAll('.pdp-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const opt = btn.dataset.option;
        const val = btn.dataset.value;
        selectedOptions[opt] = val;
        document.querySelectorAll(`.pdp-option-btn[data-option="${opt}"]`).forEach(b => b.classList.toggle('active', b === btn));

        /* find matching variant via Shopify product JSON */
        const productJson = document.getElementById('product-json');
        if (!productJson) return;
        try {
          const data = JSON.parse(productJson.textContent);
          const match = data.variants.find(v =>
            Object.entries(selectedOptions).every(([k, val]) =>
              data.options.some((o, i) => o === k && v['option' + (i + 1)] === val)
            )
          );
          if (match) {
            variantInput.value = match.id;
            if (priceEl) priceEl.textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: data.currency || 'USD' }).format(match.price / 100);
            if (atcBtn) {
              atcBtn.disabled = !match.available;
              atcBtn.classList.toggle('pdp-atc--disabled', !match.available);
            }
          }
        } catch (_) {}
      });
    });

    /* ATC confirm flash */
    const confirm = document.getElementById('pdp-atc-confirm');
    document.getElementById('pdp-form')?.addEventListener('submit', e => {
      if (confirm) {
        setTimeout(() => {
          confirm.classList.add('show');
          setTimeout(() => confirm.classList.remove('show'), 3000);
        }, 200);
      }
    });

    /* accordion */
    document.querySelectorAll('.pdp-accordion-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
        const body   = trigger.nextElementSibling;
        trigger.setAttribute('aria-expanded', !isOpen);
        body.classList.toggle('open', !isOpen);
      });
    });

    /* wishlist toggle (visual only — extend with localStorage or customer tags) */
    document.getElementById('pdp-wishlist')?.addEventListener('click', function () {
      this.classList.toggle('active');
    });
  })();

  /* ── BEFORE / AFTER REVEAL ── */
  document.querySelectorAll('.ba-item').forEach(item => {
    let dragging = false;

    function setPos(clientX) {
      const rect = item.getBoundingClientRect();
      const pct  = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
      item.style.setProperty('--ba-pos', pct + '%');
    }

    item.addEventListener('pointerdown', e => {
      dragging = true;
      item.setPointerCapture(e.pointerId);
      setPos(e.clientX);
    });
    item.addEventListener('pointermove', e => {
      if (!dragging) return;
      setPos(e.clientX);
    });
    item.addEventListener('pointerup',     () => { dragging = false; });
    item.addEventListener('pointercancel', () => { dragging = false; });

    /* touch fallback */
    item.addEventListener('touchstart', e => { setPos(e.touches[0].clientX); }, { passive: true });
    item.addEventListener('touchmove',  e => { setPos(e.touches[0].clientX); e.preventDefault(); }, { passive: false });
  });

})();
