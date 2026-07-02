const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

/* ---------------- preloader ---------------- */
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  setTimeout(() => pre.classList.add('done'), reduceMotion ? 0 : 700);
});

/* ---------------- year ---------------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------------- role cycler ---------------- */
const roles = ['Full-Stack Developer', 'Mobile App Developer', 'Data Analyst'];
const roleEl = document.getElementById('roleCycler');
let roleIndex = 0;
function cycleRole() {
  if (!roleEl) return;
  roleEl.style.opacity = 0;
  roleEl.style.transform = 'translateY(8px)';
  setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleEl.textContent = roles[roleIndex];
    roleEl.style.opacity = 1;
    roleEl.style.transform = 'translateY(0)';
  }, 350);
}
if (roleEl) {
  roleEl.style.transition = 'opacity .35s ease, transform .35s ease';
  roleEl.textContent = roles[0];
  if (!reduceMotion) setInterval(cycleRole, 2400);
}

/* ---------------- custom cursor ---------------- */
if (!isTouch) {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  function animateRing() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });
}

/* ---------------- dark / light theme toggle ---------------- */
(function () {
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('nd-theme') || 'dark';
  if (savedTheme === 'light') html.setAttribute('data-theme', 'light');

  function syncIcons(isLight) {
    ['iconMoon','iconMoonM'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('hidden', isLight);
    });
    ['iconSun','iconSunM'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('hidden', !isLight);
    });
  }
  syncIcons(savedTheme === 'light');

  function toggleTheme() {
    const isLight = html.getAttribute('data-theme') === 'light';
    html.setAttribute('data-theme', isLight ? 'dark' : 'light');
    localStorage.setItem('nd-theme', isLight ? 'dark' : 'light');
    syncIcons(!isLight);
  }

  ['themeToggle','themeToggleMobile'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', toggleTheme);
  });
})();


document.querySelectorAll('.letters').forEach(el => {
  const text = el.textContent;
  el.textContent = '';
  text.split('').forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'letter';
    span.textContent = ch === ' ' ? '\u00A0' : ch;
    span.style.animationDelay = reduceMotion ? '0s' : (i * 0.045) + 's';
    el.appendChild(span);
  });
});

/* ---------------- cursor spotlight ---------------- */
const spotlight = document.getElementById('spotlight');
if (spotlight && !isTouch) {
  window.addEventListener('mousemove', (e) => {
    spotlight.style.setProperty('--x', e.clientX + 'px');
    spotlight.style.setProperty('--y', e.clientY + 'px');
  });
}

/* ---------------- parallax blobs ---------------- */
if (!isTouch && !reduceMotion) {
  const blobs = document.querySelectorAll('.blob');
  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
    blobs.forEach((b, i) => {
      const strength = (i + 1) * 10;
      b.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    });
  });
}

/* ---------------- button ripple ---------------- */
document.querySelectorAll('.magnetic, .ripple-host').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const r = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(r.width, r.height) * 1.6;
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - r.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - r.top - size / 2) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
});


if (!isTouch && !reduceMotion) {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
  });
}

/* ---------------- constellation canvas (hero) ---------------- */
(function constellation() {
  const canvas = document.getElementById('constellation');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const labels = ['React', 'Node.js', 'MongoDB', 'Flutter', 'R', 'Express', 'PHP', 'JWT', 'Figma', 'SQL'];
  let nodes = [];
  let w, h;

  function size() {
    w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    h = canvas.height = canvas.offsetHeight * devicePixelRatio;
  }
  size();
  window.addEventListener('resize', () => { size(); initNodes(); });

  function initNodes() {
    const count = w < 700 * devicePixelRatio ? 14 : 22;
    nodes = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      label: i < labels.length ? labels[i] : null,
    }));
  }
  initNodes();

  let mouseX = -9999, mouseY = -9999;
  window.addEventListener('mousemove', (e) => {
    const r = canvas.getBoundingClientRect();
    mouseX = (e.clientX - r.left) * devicePixelRatio;
    mouseY = (e.clientY - r.top) * devicePixelRatio;
  });

  function step() {
    ctx.clearRect(0, 0, w, h);
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        const maxD = 190 * devicePixelRatio;
        if (d < maxD) {
          ctx.strokeStyle = `rgba(139,92,246,${0.16 * (1 - d / maxD)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    nodes.forEach(n => {
      const dMouse = Math.hypot(n.x - mouseX, n.y - mouseY);
      const near = dMouse < 140 * devicePixelRatio;
      ctx.beginPath();
      ctx.arc(n.x, n.y, near ? 3.2 * devicePixelRatio : 2 * devicePixelRatio, 0, Math.PI * 2);
      ctx.fillStyle = near ? '#F472B6' : '#38BDF8';
      ctx.fill();

      if (n.label && near) {
        ctx.font = `${11 * devicePixelRatio}px Space Grotesk, sans-serif`;
        ctx.fillStyle = 'rgba(244,242,255,0.85)';
        ctx.fillText(n.label, n.x + 8 * devicePixelRatio, n.y - 8 * devicePixelRatio);
      }
    });

    if (!reduceMotion) requestAnimationFrame(step);
  }
  step();
})();

/* ---------------- scroll reveal ---------------- */
const revealEls = document.querySelectorAll('.reveal, .reveal-scale, .timeline-dot');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

/* ---------------- timeline line draw ---------------- */
document.querySelectorAll('.timeline-line').forEach(line => {
  const tio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.height = '100%'; tio.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  tio.observe(line);
});

/* ---------------- skill bars ---------------- */
document.querySelectorAll('.skill-bar-fill').forEach(bar => {
  const target = bar.getAttribute('data-width');
  const bio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.width = target + '%'; bio.unobserve(e.target); }
    });
  }, { threshold: 0.3 });
  bio.observe(bar);
});

/* ---------------- counters ---------------- */
document.querySelectorAll('.counter').forEach(el => {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        let start = 0;
        const dur = 1200;
        const t0 = performance.now();
        function tick(now) {
          const p = Math.min((now - t0) / dur, 1);
          el.textContent = Math.floor(p * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target + suffix;
        }
        if (reduceMotion) el.textContent = target + suffix;
        else requestAnimationFrame(tick);
        cio.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  cio.observe(el);
});

/* ---------------- active nav pill ---------------- */
const navLinks = document.querySelectorAll('.nav-link');
const navPill = document.getElementById('navPill');
function movePill(link) {
  if (!link || !navPill) return;
  navPill.style.left = link.offsetLeft + 'px';
  navPill.style.width = link.offsetWidth + 'px';
}
const sections = document.querySelectorAll('main section');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = '#' + entry.target.id;
      navLinks.forEach(l => l.classList.toggle('text-ink', l.getAttribute('href') === id));
      const active = [...navLinks].find(l => l.getAttribute('href') === id);
      if (active) movePill(active);
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => navObserver.observe(s));
window.addEventListener('load', () => movePill(navLinks[0]));

/* ---------------- 3D tilt card ---------------- */
if (!isTouch && !reduceMotion) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = 'rotateY(0) rotateX(0)'; });
  });
}

/* ---------------- mobile menu ---------------- */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
menuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));
document.querySelectorAll('.menu-link').forEach(a =>
  a.addEventListener('click', () => mobileMenu.classList.remove('open'))
);

/* ---------------- scroll progress ---------------- */
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progress.style.width = pct + '%';
});

/* ---------------- copy to clipboard ---------------- */
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const val = btn.getAttribute('data-copy');
    try {
      await navigator.clipboard.writeText(val);
      const original = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = original, 1200);
    } catch (e) {}
  });
});
