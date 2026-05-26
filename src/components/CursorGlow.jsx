import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (glowRef.current) glowRef.current.style.opacity = '1';
    };
    const onLeave = () => {
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };

    let raf;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.1;
      pos.current.y += (target.current.y - pos.current.y) * 0.1;
      if (glowRef.current) {
        glowRef.current.style.left = pos.current.x + 'px';
        glowRef.current.style.top = pos.current.y + 'px';
      }
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        width: 600,
        height: 600,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, rgba(139,92,246,0.03) 35%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        opacity: 0,
        transition: 'opacity 0.4s ease',
      }}
    />
  );
}
