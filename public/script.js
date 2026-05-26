/* ============================================
   1. NAVBAR — scroll effect + mobile menu
   ============================================ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.navbar__link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('navbar--scrolled', window.scrollY > 60);
  highlightNav();
}, { passive: true });

function highlightNav() {
  const scrollPos = window.scrollY + window.innerHeight / 3;
  let current = '';
  sections.forEach(s => {
    if (s.offsetTop <= scrollPos) current = s.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('navbar__link--active', link.getAttribute('href') === '#' + current);
  });
}

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-menu__link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      const offset = 72;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

/* ============================================
   2. REVEAL ON SCROLL (IntersectionObserver)
   ============================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '-40px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================
   3. ANIMATED COUNTERS
   ============================================ */
function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 2500;
  let start = null;

  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const value = Math.round(easeOutExpo(progress) * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

/* ============================================
   4. BACKGROUND CANVAS — hexagonal grid + particles
   ============================================ */
const canvas = document.getElementById('bgCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w, h, particles, mouse = { x: -1000, y: -1000 };
  let time = 0;

  function resize() {
    w = canvas.width = canvas.parentElement.clientWidth;
    h = canvas.height = canvas.parentElement.clientHeight;
  }

  function createParticles() {
    const count = Math.floor((w * h) / 10000);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.8 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  function drawHexGrid() {
    const size = 50;
    const hexH = size * Math.sqrt(3);
    const cols = Math.ceil(w / (size * 1.5)) + 2;
    const rows = Math.ceil(h / hexH) + 2;

    ctx.lineWidth = 0.3;

    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const cx = col * size * 1.5;
        const cy = row * hexH + (col % 2 ? hexH * 0.5 : 0);

        // Distance from mouse for interactive glow
        const dx = cx - mouse.x;
        const dy = cy - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / 250);

        const baseAlpha = 0.03 + proximity * 0.08;
        const r = Math.floor(99 + proximity * 60);
        const g = Math.floor(102 + proximity * 80);
        const b = Math.floor(241);

        ctx.strokeStyle = `rgba(${r},${g},${b},${baseAlpha})`;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6;
          const px = cx + size * 0.5 * Math.cos(angle);
          const py = cy + size * 0.5 * Math.sin(angle);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();

        // Glow at vertices near mouse
        if (proximity > 0.3) {
          const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.3);
          grd.addColorStop(0, `rgba(99,102,241,${proximity * 0.04})`);
          grd.addColorStop(1, 'rgba(99,102,241,0)');
          ctx.fillStyle = grd;
          ctx.fill();
        }
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    time += 0.01;

    drawHexGrid();

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      // Mouse attraction (gentle)
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200 && dist > 10) {
        const force = (200 - dist) / 200 * 0.15;
        p.vx += (dx / dist) * force * 0.1;
        p.vy += (dy / dist) * force * 0.1;
      }

      // Damping
      p.vx *= 0.99;
      p.vy *= 0.99;

      const pulse = 0.7 + 0.3 * Math.sin(time * 2 + p.phase);

      // Particle glow
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
      grd.addColorStop(0, `rgba(99,102,241,${p.alpha * 0.3 * pulse})`);
      grd.addColorStop(1, 'rgba(99,102,241,0)');
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Particle core
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(129,140,248,${p.alpha * pulse})`;
      ctx.fill();
    });

    // Draw gradient connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha = 0.08 * (1 - dist / 120);
          const grad = ctx.createLinearGradient(
            particles[i].x, particles[i].y,
            particles[j].x, particles[j].y
          );
          grad.addColorStop(0, `rgba(99,102,241,${alpha})`);
          grad.addColorStop(1, `rgba(34,211,238,${alpha * 0.7})`);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); createParticles(); });
  canvas.parentElement.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.parentElement.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000; });

  resize();
  createParticles();
  draw();
}
