import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const innerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (outerRef.current) outerRef.current.style.opacity = '1';
      if (innerRef.current) innerRef.current.style.opacity = '1';
    };
    const onLeave = () => {
      if (outerRef.current) outerRef.current.style.opacity = '0';
      if (innerRef.current) innerRef.current.style.opacity = '0';
    };

    let raf;
    const animate = () => {
      // Outer glow follows with more lag
      pos.current.x += (target.current.x - pos.current.x) * 0.06;
      pos.current.y += (target.current.y - pos.current.y) * 0.06;
      // Inner glow follows tighter
      innerPos.current.x += (target.current.x - innerPos.current.x) * 0.15;
      innerPos.current.y += (target.current.y - innerPos.current.y) * 0.15;

      if (outerRef.current) {
        outerRef.current.style.left = pos.current.x + 'px';
        outerRef.current.style.top = pos.current.y + 'px';
      }
      if (innerRef.current) {
        innerRef.current.style.left = innerPos.current.x + 'px';
        innerRef.current.style.top = innerPos.current.y + 'px';
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
    <>
      {/* Outer halo - large, soft */}
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          width: 700,
          height: 700,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.03) 30%, rgba(34,211,238,0.01) 50%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          transition: 'opacity 0.5s ease',
          mixBlendMode: 'screen',
        }}
      />
      {/* Inner core - smaller, brighter */}
      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          width: 200,
          height: 200,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
}
