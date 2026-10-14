/* ============================================================
   KINDESSA™ shared behaviour
   Shared by index.html, truly.html and gracie.html.
   Every hook is optional, so a page that omits a section
   simply skips that block.
   ============================================================ */
(function(){
  "use strict";
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- header state ---------- */
  const header = document.getElementById('header');
  // inner pages have no dark hero behind the header, so they mark it
  // data-solid and it keeps the scrolled treatment at every scroll position
  const solidHeader = header.hasAttribute('data-solid');
  const onScroll = () => header.classList.toggle('scrolled', solidHeader || window.scrollY > 40);
  onScroll();

  /* ---------- mobile nav ---------- */
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  const setNav = (open) => {
    document.body.classList.toggle('nav-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setNav(!document.body.classList.contains('nav-open')));
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setNav(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setNav(false); });

  /* ---------- scroll reveal ---------- */
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    items.forEach(el => io.observe(el));
    // safety net: anything at or above the fold is shown on load, so a
    // zero-size or odd-layout frame can never leave content invisible
    window.addEventListener('load', () => {
      items.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 1.1) el.classList.add('in');
      });
    });
  } else {
    items.forEach(el => el.classList.add('in'));
  }

  if (reduced){ window.addEventListener('scroll', onScroll, {passive:true}); return; }

  /* ---------- ambient life: fireflies + stars ---------- */
  const rand = (min,max) => Math.random()*(max-min)+min;
  ['sparkles','sparkles2'].forEach(id => {
    const host = document.getElementById(id);
    if (!host) return;
    for (let i=0;i<3;i++){
      const f = document.createElement('i');
      f.className = 'firefly';
      f.style.left = rand(8,80)+'%';
      f.style.top  = rand(35,80)+'%';
      f.style.animationDelay = (i*5.2)+'s';
      f.style.animationDuration = rand(14,20)+'s';
      host.appendChild(f);
    }
    for (let i=0;i<16;i++){
      const s = document.createElement('i');
      s.className = 'star';
      s.style.left = rand(2,98)+'%';
      s.style.top  = rand(2,55)+'%';
      s.style.animationDelay = rand(0,5)+'s';
      s.style.animationDuration = rand(4,9)+'s';
      host.appendChild(s);
    }
  });

  /* bubbles ship as assets/web/bubbles.mp4 and are no longer generated here */


  /* ---------- twilight stars in the bedtime section ---------- */
  const night = document.getElementById('night');
  if (night){
    for (let i=0;i<26;i++){
      const s = document.createElement('i');
      s.className = 'star';
      s.style.position = 'absolute';
      s.style.left = rand(1,99)+'%';
      s.style.top  = rand(2,90)+'%';
      s.style.animationDelay = rand(0,6)+'s';
      s.style.animationDuration = rand(4,10)+'s';
      night.appendChild(s);
    }
  }

  /* ---------- hero parallax ---------- */
  const heroBg = document.getElementById('heroBg');
  let ticking = false;
  const frame = () => {
    const y = window.scrollY;
    if (heroBg && y < window.innerHeight * 1.2){
      heroBg.style.transform = 'translate3d(0,' + (y * 0.28) + 'px,0)';
    }
    onScroll();
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking){ ticking = true; requestAnimationFrame(frame); }
  }, {passive:true});

  /* the book tilt was removed: the cover is now a flat image with a CSS hover zoom */


  /* ---------- newsletter (mockup only) ---------- */
  const form = document.getElementById('joinForm');
  const thanks = document.getElementById('formThanks');
  if (form && thanks) form.addEventListener('submit', e => {
    e.preventDefault();
    const email = form.querySelector('#email');
    if (!email.value.includes('@')){ email.focus(); email.style.borderColor = 'var(--coral)'; return; }
    form.style.display = 'none';
    thanks.classList.add('show');
  });
})();
