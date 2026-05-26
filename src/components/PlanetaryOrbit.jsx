import { useEffect, useRef } from 'react';

export default function PlanetaryOrbit() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w, h, animId;
    let scrollY = 0;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight * 5;
    }
    resize();
    window.addEventListener('resize', resize);

    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Orbiting particles
    const orbitSystems = [
      { cx: 0.85, cy: 0.08, rings: 3, baseRadius: 80, particles: 5, speed: 0.3, color: [99,102,241] },
      { cx: 0.1, cy: 0.25, rings: 2, baseRadius: 120, particles: 4, speed: -0.2, color: [139,92,246] },
      { cx: 0.9, cy: 0.45, rings: 4, baseRadius: 60, particles: 6, speed: 0.25, color: [34,211,238] },
      { cx: 0.15, cy: 0.6, rings: 2, baseRadius: 100, particles: 3, speed: -0.35, color: [192,132,252] },
      { cx: 0.5, cy: 0.78, rings: 3, baseRadius: 90, particles: 5, speed: 0.15, color: [99,102,241] },
    ];

    // Floating particles / stars
    const stars = Array.from({ length: 60 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.0003 + 0.0001,
      opacity: Math.random() * 0.3 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    function draw() {
      ctx.clearRect(0, 0, w, h);

      time += 0.016;

      // Draw stars
      stars.forEach(s => {
        s.pulse += 0.02;
        const px = s.x * w;
        const py = s.y * h;
        const alpha = s.opacity * (0.5 + 0.5 * Math.sin(s.pulse));

        ctx.beginPath();
        ctx.arc(px, py, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150, 160, 255, ${alpha})`;
        ctx.fill();
      });

      // Draw orbit systems
      orbitSystems.forEach(sys => {
        const cx = sys.cx * w;
        const cy = sys.cy * h;

        // Draw orbit rings
        for (let r = 1; r <= sys.rings; r++) {
          const radius = sys.baseRadius * r;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${sys.color.join(',')}, ${0.04 / r})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Center glow
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20);
        grd.addColorStop(0, `rgba(${sys.color.join(',')}, 0.15)`);
        grd.addColorStop(1, `rgba(${sys.color.join(',')}, 0)`);
        ctx.beginPath();
        ctx.arc(cx, cy, 20, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Orbiting particles
        for (let r = 1; r <= sys.rings; r++) {
          const radius = sys.baseRadius * r;
          const count = sys.particles;
          for (let p = 0; p < count; p++) {
            const angle = (time * sys.speed / r) + (p * (Math.PI * 2 / count));
            const px = cx + Math.cos(angle) * radius;
            const py = cy + Math.sin(angle) * radius * 0.4; // elliptical

            const size = 2.5 - r * 0.3;
            const alpha = 0.6 / r;

            // Particle glow
            const pgrd = ctx.createRadialGradient(px, py, 0, px, py, size * 4);
            pgrd.addColorStop(0, `rgba(${sys.color.join(',')}, ${alpha * 0.5})`);
            pgrd.addColorStop(1, `rgba(${sys.color.join(',')}, 0)`);
            ctx.beginPath();
            ctx.arc(px, py, size * 4, 0, Math.PI * 2);
            ctx.fillStyle = pgrd;
            ctx.fill();

            // Particle core
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${sys.color.join(',')}, ${alpha})`;
            ctx.fill();
          }
        }
      });

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6,
      }}
    />
  );
}
