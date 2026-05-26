import { motion } from 'framer-motion';
import './Experience.css';

const highlights = [
  'Designed highly available, distributed backend systems using **Node.js, TypeScript, and AWS Lambda** with event-driven microservices, supporting deployments across **7+ blockchain networks**.',
  'Engineered **cryptographic Merkle tree proof systems**, reducing persistent storage by **95%** while maintaining performance. Designed optimized reward allocation algorithms.',
  'Deployed production **smart contracts** with upgradeable proxies, access control, and reentrancy protection. Security reviews prevented **$100K+ financial impact**.',
  'Architected **REST, WebSocket, and GraphQL** services with RPC abstraction layers enabling cross-platform blockchain interoperability.',
  'Built cloud-native automation on **AWS (Lambda, CloudWatch, CI/CD)** with PagerDuty alerting for production resilience and high availability.',
  'Designed an experimental **AI-driven trading platform** with autonomous agents analyzing market data and executing simulated strategies.',
];

function formatText(text) {
  return text.split(/(\*\*.*?\*\*)/).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  );
}

const terminal = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
  </svg>
);

const tags = ['Node.js', 'TypeScript', 'AWS', 'Solidity', 'GraphQL', 'WebSocket', 'Merkle Trees'];

export default function Experience() {
  return (
    <section className="section section-dark" id="experience">
      <div className="container">
        <div className="section-header">
          <motion.span
            className="section-tag"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            02 / Experience
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Where I've <span className="gradient-text">made impact.</span>
          </motion.h2>
        </div>

        <div className="exp-timeline">
          <motion.div
            className="exp-item"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="exp-marker">
              <div className="exp-dot" />
              <div className="exp-line" />
            </div>
            <div className="exp-content">
              <span className="exp-date">Current</span>
              <h3 className="exp-role">SDE-2</h3>
              <span className="exp-company">Grip Invest &middot; India</span>
            </div>
          </motion.div>

          <motion.div
            className="exp-item"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="exp-marker">
              <div className="exp-dot" />
              <div className="exp-line" />
            </div>
            <div className="exp-content">
              <span className="exp-date">Mar 2023 &mdash; 2025</span>
              <h3 className="exp-role">Software Engineer</h3>
              <span className="exp-company">Magpie XYZ &middot; British Virgin Islands (Remote)</span>

              <div className="exp-highlights">
                {highlights.map((h, i) => (
                  <motion.div
                    className="exp-hl"
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  >
                    <span className="exp-hl-icon">{terminal}</span>
                    <p>{formatText(h)}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="exp-tags"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {tags.map(t => <span className="tag" key={t}>{t}</span>)}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
