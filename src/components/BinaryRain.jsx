import { useEffect, useRef } from 'react';

export default function BinaryRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let w, h, nodes, time = 0;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      initNodes();
    }

    function initNodes() {
      const spacing = 140;
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;
      nodes = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          nodes.push({
            x: i * spacing + (j % 2 ? spacing * 0.5 : 0),
            y: j * spacing,
            baseX: i * spacing + (j % 2 ? spacing * 0.5 : 0),
            baseY: j * spacing,
            phase: Math.random() * Math.PI * 2,
            speed: 0.3 + Math.random() * 0.4,
            radius: 1 + Math.random() * 1.5,
            drift: 8 + Math.random() * 12,
          });
        }
      }
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.clearRect(0, 0, w, h);
      time += 0.008;

      // Update node positions with gentle drift
      nodes.forEach(n => {
        n.x = n.baseX + Math.sin(time * n.speed + n.phase) * n.drift;
        n.y = n.baseY + Math.cos(time * n.speed * 0.7 + n.phase) * n.drift * 0.6;
      });

      // Draw connections - circuit-style with gradient
      const maxDist = 180;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            // Color interpolation based on vertical position
            const midY = (nodes[i].y + nodes[j].y) * 0.5;
            const progress = midY / h;
            const r = Math.floor(99 - progress * 65 + 65);
            const g = Math.floor(102 + progress * 109);
            const b = Math.floor(241 - progress * 3);

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            // L-shaped connection for circuit feel
            if (Math.abs(dx) > Math.abs(dy)) {
              const midX = nodes[i].x - dx * 0.5;
              ctx.lineTo(midX, nodes[i].y);
              ctx.lineTo(midX, nodes[j].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
            } else {
              ctx.lineTo(nodes[j].x, nodes[j].y);
            }
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes with glow
      nodes.forEach(n => {
        const pulse = 0.5 + 0.5 * Math.sin(time * 2 + n.phase);
        const progress = n.y / h;
        const r = Math.floor(99 + progress * 60);
        const g = Math.floor(102 + progress * 109);
        const b = Math.floor(241 - progress * 3);

        // Outer glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 8);
        grd.addColorStop(0, `rgba(${r},${g},${b},${0.08 * pulse})`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 8, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${0.2 + pulse * 0.15})`;
        ctx.fill();
      });

      // Occasional data pulse along connections
      const pulseCount = 3;
      for (let p = 0; p < pulseCount; p++) {
        const t = (time * 0.5 + p * 1.3) % nodes.length;
        const idx = Math.floor(t);
        const frac = t - idx;
        if (idx < nodes.length - 1) {
          const px = nodes[idx].x + (nodes[idx + 1].x - nodes[idx].x) * frac;
          const py = nodes[idx].y + (nodes[idx + 1].y - nodes[idx].y) * frac;
          const grd = ctx.createRadialGradient(px, py, 0, px, py, 6);
          grd.addColorStop(0, 'rgba(34,211,238,0.4)');
          grd.addColorStop(1, 'rgba(34,211,238,0)');
          ctx.beginPath();
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }
      }

      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.5,
      }}
    />
  );
}
