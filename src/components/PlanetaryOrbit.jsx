import { useEffect, useRef } from 'react';

export default function PlanetaryOrbit() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create ambient gradient orbs
    const orbs = [
      { size: 600, x: 15, y: 10, color1: 'rgba(99,102,241,0.15)', color2: 'rgba(139,92,246,0.08)', duration: 25, delay: 0 },
      { size: 500, x: 75, y: 30, color1: 'rgba(34,211,238,0.12)', color2: 'rgba(99,102,241,0.06)', duration: 30, delay: -8 },
      { size: 700, x: 50, y: 60, color1: 'rgba(139,92,246,0.1)', color2: 'rgba(192,132,252,0.05)', duration: 35, delay: -15 },
      { size: 450, x: 85, y: 75, color1: 'rgba(99,102,241,0.12)', color2: 'rgba(34,211,238,0.06)', duration: 28, delay: -5 },
      { size: 550, x: 20, y: 85, color1: 'rgba(192,132,252,0.1)', color2: 'rgba(99,102,241,0.05)', duration: 32, delay: -12 },
    ];

    const orbElements = orbs.map((orb, i) => {
      const el = document.createElement('div');
      el.style.cssText = `
        position: absolute;
        width: ${orb.size}px;
        height: ${orb.size}px;
        left: ${orb.x}%;
        top: ${orb.y}%;
        transform: translate(-50%, -50%);
        background: radial-gradient(circle, ${orb.color1} 0%, ${orb.color2} 40%, transparent 70%);
        border-radius: 50%;
        filter: blur(60px);
        pointer-events: none;
        animation: orbFloat${i} ${orb.duration}s ease-in-out infinite;
        animation-delay: ${orb.delay}s;
      `;
      container.appendChild(el);
      return el;
    });

    // Add keyframe animations
    const style = document.createElement('style');
    style.textContent = orbs.map((orb, i) => {
      const rx = 30 + Math.random() * 40;
      const ry = 20 + Math.random() * 30;
      return `
        @keyframes orbFloat${i} {
          0%, 100% { transform: translate(-50%, -50%) translate(0px, 0px) scale(1); }
          25% { transform: translate(-50%, -50%) translate(${rx}px, -${ry}px) scale(1.05); }
          50% { transform: translate(-50%, -50%) translate(-${rx * 0.5}px, ${ry}px) scale(0.95); }
          75% { transform: translate(-50%, -50%) translate(-${rx}px, -${ry * 0.5}px) scale(1.02); }
        }
      `;
    }).join('\n');
    document.head.appendChild(style);

    return () => {
      orbElements.forEach(el => el.remove());
      style.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    />
  );
}
