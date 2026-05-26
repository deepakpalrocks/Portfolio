import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import DeviceShowcase from './components/DeviceShowcase';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
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
    <div className="app">
      <CursorGlow />
      <BinaryRain />
      <PlanetaryOrbit />
      <Navbar />
      <DeviceShowcase />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
