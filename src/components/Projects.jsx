import { motion } from 'framer-motion';
import './Projects.css';

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);

const ExternalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
);

const projects = [
  {
    num: '01',
    title: 'Silicon Coliseum',
    desc: 'AI-powered algorithmic crypto trading platform on Arbitrum One. Autonomous agents analyze market conditions using LLM-based decision-making (DeepSeek V3), execute real-time trades, and compete on a leaderboard. Features 7+ trading strategies including fear contrarian buying, social hype front-running, and sector rotation.',
    features: ['AI Agent Orchestration', 'Real-Time Trading', 'RAG Memory System', 'Multi-Route Swaps'],
    tech: ['Node.js', 'React', 'Ethers.js', 'OpenAI SDK', 'Solidity', 'TailwindCSS'],
    github: 'https://github.com/deepakpalrocks/SiliconColiseum-Live',
    featured: true,
  },
  {
    num: '02',
    title: 'Arbitrage Cross-Chain Seeker',
    desc: 'Sophisticated multi-DEX arbitrage bot executing profitable cross-chain opportunities across Arbitrum, Berachain, and Sonic. Identifies triangular and 2-hop arbitrage routes, executes via flash loans (Balancer/Aave) with zero capital requirement. Supports 10+ DEX types and 40+ tokens.',
    features: ['Flash Loan Arbitrage', '10+ DEX Support', 'Multi-Chain', 'Zero Capital'],
    tech: ['Solidity', 'Foundry', 'Hardhat', 'Ethers.js', 'Uniswap', 'Balancer'],
    github: 'https://github.com/deepakpalrocks',
    featured: true,
  },
  {
    num: '03',
    title: 'Salary Streamerz',
    desc: 'Decentralized salary streaming dApp on Arbitrum. StreamRewarder contract linearly distributes queued USDT rewards to employees based on token holdings over time. Built with React frontend featuring Web3 wallet integration and real-time earnings tracking.',
    features: ['Streaming Rewards', 'Web3 Wallet', 'Real-Time Earnings', 'CI/CD Pipeline'],
    tech: ['Solidity', 'React', 'Ethers.js', 'Arbitrum', 'GitHub Actions'],
    github: 'https://github.com/deepakpalrocks/TokenStream_contracts',
    github2: 'https://github.com/deepakpalrocks/TokenStream_frontend',
    featured: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Projects() {
  return (
    <section className="section section-dark" id="projects">
      <div className="container">
        <div className="section-header">
          <motion.span
            className="section-tag"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            03 / Projects
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Things I've <span className="gradient-text">built.</span>
          </motion.h2>
        </div>

        <div className="projects__grid">
          {projects.map((p, i) => (
            <motion.div
              className={`project-card ${p.featured ? 'project-card--featured' : ''}`}
              key={p.num}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={cardVariants}
            >
              <div className="project-card__inner">
                <div className="project-card__glow" />
                <span className="project-card__num">{p.num}</span>

                <div className="project-card__header">
                  <h3 className="project-card__title">{p.title}</h3>
                  <div className="project-card__links">
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-card__link"><GithubIcon /></a>
                    {p.github2 && <a href={p.github2} target="_blank" rel="noopener noreferrer" className="project-card__link"><ExternalIcon /></a>}
                  </div>
                </div>

                <p className="project-card__desc">{p.desc}</p>

                {p.features && (
                  <div className="project-card__features">
                    {p.features.map(f => <span className="project-card__feature" key={f}>{f}</span>)}
                  </div>
                )}

                <div className="project-card__tech">
                  {p.tech.map(t => <span key={t}><span className="project-card__hash">#</span>{t}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
