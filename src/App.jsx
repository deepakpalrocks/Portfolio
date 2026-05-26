import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import BinaryRain from './components/BinaryRain';
import PlanetaryOrbit from './components/PlanetaryOrbit';
import CursorGlow from './components/CursorGlow';
import './App.css';

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <CursorGlow />
      <BinaryRain />
      <PlanetaryOrbit />
    </>
  );
}

export default App;
