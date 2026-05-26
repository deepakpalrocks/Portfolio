import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import './DeviceShowcase.css';

/* ========================================================
   SECTION 1: Monitor → Laptop morph (ONE element, scroll-driven)
   ======================================================== */
function MonitorToLaptop() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // --- MORPH SPREAD ACROSS FULL 0→1 RANGE ---
  // Stand + base: shrink and fade from the very start
  const standHeight   = useTransform(scrollYProgress, [0, 0.35],  [44, 0]);
  const standOpacity  = useTransform(scrollYProgress, [0, 0.3],   [1, 0]);
  const baseOpacity   = useTransform(scrollYProgress, [0, 0.25],  [1, 0]);

  // Chin shrinks from monitor chin → thin laptop hinge
  const chinHeight         = useTransform(scrollYProgress, [0.05, 0.45], [20, 7]);
  const bezelBottomRadius  = useTransform(scrollYProgress, [0.1, 0.5],  [16, 0]);

  // Keyboard + trackpad slide in
  const keyboardOpacity  = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);
  const keyboardY        = useTransform(scrollYProgress, [0.25, 0.55], [30, 0]);
  const trackpadOpacity  = useTransform(scrollYProgress, [0.4, 0.65],  [0, 1]);

  // Content crossfade — overlapping so it feels continuous
  const heroOpacity = useTransform(scrollYProgress, [0.1, 0.4], [1, 0]);
  const expOpacity  = useTransform(scrollYProgress, [0.35, 0.65], [0, 1]);

  // Scale: slight breathe across the whole range
  const deviceScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.97]);

  // Bezel width morphs slightly (monitor wider → laptop narrower)
  const bezelWidth = useTransform(scrollYProgress, [0.1, 0.6], [100, 94]);
  const bezelWidthPercent = useTransform(bezelWidth, (v) => `${v}%`);

  const highlights = [
    { bold: 'Node.js, TypeScript, AWS Lambda', text: ' — distributed microservices across 7+ blockchain networks' },
    { bold: 'Merkle tree proofs', text: ' — reduced storage by 95% with cryptographic verification' },
    { bold: 'Smart contracts', text: ' — upgradeable proxies, reentrancy protection, prevented $100K+ impact' },
    { bold: 'REST, WebSocket, GraphQL', text: ' — RPC abstraction for cross-chain interoperability' },
    { bold: 'AWS Lambda, CloudWatch, CI/CD', text: ' — cloud automation with PagerDuty alerting' },
    { bold: 'AI trading platform', text: ' — autonomous agents analyzing market data in real-time' },
  ];

  return (
    <section className="morph-section" id="about" ref={ref}>
      <div className="morph-sticky">
        <motion.div className="morph-device" style={{ scale: deviceScale }}>
          {/* BEZEL */}
          <motion.div
            className="morph-bezel"
            style={{
              borderBottomLeftRadius: bezelBottomRadius,
              borderBottomRightRadius: bezelBottomRadius,
              width: bezelWidthPercent,
            }}
          >
            <div className="morph-camera" />
            <div className="morph-screen">
              {/* HERO content */}
              <motion.div className="morph-content morph-content--hero" style={{ opacity: heroOpacity }}>
                <div className="device-badge">
                  <span className="device-badge__dot" />
                  Currently building at Grip Invest
                </div>
                <p className="device-intro">Hi, I'm</p>
                <h1 className="device-name">Deepak Pal</h1>
                <p className="device-role">Software Engineer</p>
                <p className="device-subtitle">
                  Building distributed systems, smart contracts, and AI-driven platforms.
                  Competitive programmer with expertise across blockchain, cloud, and full-stack engineering.
                </p>
                <div className="device-cta">
                  <a href="#projects" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
                    <span>View Projects</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                  </a>
                  <a href="#contact" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Get in Touch</a>
                </div>
                <div className="device-stats">
                  <div className="device-stat">
                    <span className="device-stat__num"><AnimatedCounter target={7} suffix="+" /></span>
                    <span className="device-stat__label">Blockchain Networks</span>
                  </div>
                  <div className="device-stat__divider" />
                  <div className="device-stat">
                    <span className="device-stat__num"><AnimatedCounter target={2057} /></span>
                    <span className="device-stat__label">Leetcode Rating</span>
                  </div>
                  <div className="device-stat__divider" />
                  <div className="device-stat">
                    <span className="device-stat__num"><AnimatedCounter target={2025} /></span>
                    <span className="device-stat__label">Codechef Rating</span>
                  </div>
                </div>
              </motion.div>

              {/* EXPERIENCE content */}
              <motion.div className="morph-content morph-content--exp" style={{ opacity: expOpacity }}>
                <div className="exp-inner">
                  <div className="exp-inner__header">
                    <span className="section-tag">Where I've made impact</span>
                    <div className="exp-inner__roles">
                      <span className="exp-inner__role-badge exp-inner__role-badge--active">SDE-2 &bull; Grip Invest <small>Current</small></span>
                      <span className="exp-inner__role-badge">Software Engineer &bull; Magpie XYZ <small>2023-25</small></span>
                    </div>
                  </div>
                  <div className="exp-inner__grid">
                    {highlights.map((h, i) => (
                      <div className="exp-inner__item" key={i}>
                        <span className="exp-inner__arrow">&#8250;</span>
                        <p><strong>{h.bold}</strong>{h.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="exp-inner__tags">
                    {['Node.js','TypeScript','AWS','Solidity','GraphQL','WebSocket','Merkle Trees'].map(t => (
                      <span className="tag" key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* CHIN / HINGE */}
          <motion.div className="morph-chin" style={{ height: chinHeight }} />

          {/* STAND (monitor only — disappears) */}
          <motion.div className="morph-stand" style={{ height: standHeight, opacity: standOpacity }} />
          <motion.div className="morph-base" style={{ opacity: baseOpacity }} />

          {/* KEYBOARD (laptop only — appears) */}
          <motion.div className="morph-keyboard" style={{ opacity: keyboardOpacity, y: keyboardY }}>
            <div className="morph-keys">
              {Array.from({ length: 50 }).map((_, i) => <span key={i} />)}
            </div>
            <motion.div className="morph-trackpad" style={{ opacity: trackpadOpacity }} />
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="morph-scroll-hint"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.03, 0.1], [1, 1, 0]) }}
        >
          <div className="morph-scroll-line" />
          <span>Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}

/* ========================================================
   SECTION 2: 4 Phones — Skills / Toolkit
   ======================================================== */
const skillCategories = [
  { title: 'Languages', icon: '{ }', items: ['C++', 'JavaScript', 'TypeScript', 'Python', 'Java', 'Solidity', 'C'] },
  { title: 'Backend & Cloud', icon: '> _', items: ['Node.js', 'Express.js', 'REST APIs', 'SQL', 'AWS Lambda', 'API Gateway', 'CloudWatch', 'OpenAI SDK'] },
  { title: 'Blockchain', icon: '0x', items: ['Solidity', 'Hardhat', 'Foundry', 'Web3.js', 'Ethers.js', 'Smart Contracts', 'DeFi'] },
  { title: 'Tools & DevOps', icon: '~/&thinsp;', items: ['GitHub', 'CI/CD', 'Postman', 'Tenderly', 'PagerDuty', 'Jira', 'Olympix', 'Hexagate'] },
];

function FourPhones() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <motion.span className="section-tag"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >03 / Skills</motion.span>
          <motion.h2 className="section-title"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          >My <span className="gradient-text">toolkit.</span></motion.h2>
        </div>
        <div className="four-phones">
          {skillCategories.map((cat, i) => (
            <motion.div
              className="mini-phone"
              key={cat.title}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="mini-phone__bezel">
                <div className="mini-phone__notch" />
                <div className="mini-phone__screen">
                  <div className="mini-phone__header">
                    <span className="mini-phone__icon" dangerouslySetInnerHTML={{ __html: cat.icon }} />
                    <h4>{cat.title}</h4>
                  </div>
                  <div className="mini-phone__pills">
                    {cat.items.map(s => <span key={s}>{s}</span>)}
                  </div>
                </div>
                <div className="mini-phone__bar" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================
   SECTION 3: 3 Monitors — Projects
   ======================================================== */
const projects = [
  {
    title: 'Silicon Coliseum',
    desc: 'AI-powered algorithmic crypto trading platform on Arbitrum One. Autonomous agents analyze market conditions using LLM-based decision-making, execute real-time trades, and compete on a leaderboard.',
    features: ['AI Agent Orchestration', 'Real-Time Trading', 'RAG Memory', '7+ Strategies'],
    tech: ['Node.js', 'React', 'Ethers.js', 'OpenAI SDK', 'Solidity'],
    github: 'https://github.com/deepakpalrocks/SiliconColiseum-Live',
  },
  {
    title: 'Arbitrage Cross-Chain Seeker',
    desc: 'Multi-DEX arbitrage bot across Arbitrum, Berachain, and Sonic. Finds triangular & 2-hop routes, executes via flash loans with zero capital. Supports 10+ DEX types and 40+ tokens.',
    features: ['Flash Loan Arbitrage', '10+ DEX Support', 'Multi-Chain', 'Zero Capital'],
    tech: ['Solidity', 'Foundry', 'Hardhat', 'Ethers.js', 'Balancer'],
    github: 'https://github.com/deepakpalrocks',
  },
  {
    title: 'Salary Streamerz',
    desc: 'Decentralized salary streaming dApp on Arbitrum. StreamRewarder contract distributes USDT rewards to employees based on token holdings with real-time earnings tracking.',
    features: ['Streaming Rewards', 'Web3 Wallet', 'Real-Time Earnings'],
    tech: ['Solidity', 'React', 'Ethers.js', 'Arbitrum', 'GitHub Actions'],
    github: 'https://github.com/deepakpalrocks/TokenStream_contracts',
    github2: 'https://github.com/deepakpalrocks/TokenStream_frontend',
  },
];

const GithubSVG = <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;

function ThreeMonitors() {
  return (
    <section className="section section-dark" id="projects">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <motion.span className="section-tag"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >04 / Projects</motion.span>
          <motion.h2 className="section-title"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          >Things I've <span className="gradient-text">built.</span></motion.h2>
        </div>
        <div className="three-monitors">
          {projects.map((p, i) => (
            <motion.div
              className="proj-monitor"
              key={p.title}
              initial={{ opacity: 0, y: 70, rotateY: i === 0 ? 8 : i === 2 ? -8 : 0 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
            >
              <div className="proj-monitor__bezel">
                <div className="proj-monitor__cam" />
                <div className="proj-monitor__screen">
                  <div className="proj-monitor__topbar">
                    <span className="proj-monitor__dot proj-monitor__dot--r" />
                    <span className="proj-monitor__dot proj-monitor__dot--y" />
                    <span className="proj-monitor__dot proj-monitor__dot--g" />
                  </div>
                  <div className="proj-monitor__body">
                    <h3 className="proj-monitor__title">{p.title}</h3>
                    <p className="proj-monitor__desc">{p.desc}</p>
                    <div className="proj-monitor__features">
                      {p.features.map(f => <span key={f}>{f}</span>)}
                    </div>
                    <div className="proj-monitor__tech">
                      {p.tech.map(t => <span key={t}># {t}</span>)}
                    </div>
                    <div className="proj-monitor__links">
                      <a href={p.github} target="_blank" rel="noopener noreferrer">{GithubSVG} Code</a>
                      {p.github2 && <a href={p.github2} target="_blank" rel="noopener noreferrer">{GithubSVG} Frontend</a>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="proj-monitor__chin" />
              <div className="proj-monitor__stand" />
              <div className="proj-monitor__base" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================
   MAIN EXPORT
   ======================================================== */
export default function DeviceShowcase() {
  return (
    <>
      <MonitorToLaptop />
      <FourPhones />
      <ThreeMonitors />
    </>
  );
}
