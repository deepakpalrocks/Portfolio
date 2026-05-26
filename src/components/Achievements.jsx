import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import './Achievements.css';

const achievements = [
  {
    platform: 'Codeforces',
    rank: 'Expert',
    rating: 1732,
    detail: 'Top 700 in India',
    color: '#1890ff',
    link: 'https://codeforces.com/profile/deepakpalrocks',
  },
  {
    platform: 'CodeChef',
    rank: '5 Star',
    rating: 2025,
    detail: 'Top 800 in India',
    color: '#e5a100',
    link: 'https://www.codechef.com/users/deepakpalrocks',
  },
  {
    platform: 'LeetCode',
    rank: 'Knight',
    rating: 2057,
    detail: 'Top 2% Globally',
    color: '#ffa116',
    link: 'https://leetcode.com/deepakpalrocks',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateY: -15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateY: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Achievements() {
  return (
    <section className="section" id="achievements">
      <div className="container">
        <div className="section-header">
          <motion.span
            className="section-tag"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            05 / Achievements
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Competitive <span className="gradient-text">programming.</span>
          </motion.h2>
        </div>

        <div className="ach__grid">
          {achievements.map((a, i) => (
            <motion.a
              href={a.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ach__card"
              key={a.platform}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.03 }}
              style={{ '--ach-color': a.color }}
            >
              <div className="ach__card-glow" />
              <div className="ach__card-ring" />

              <span className="ach__platform">{a.platform}</span>
              <span className="ach__rank">{a.rank}</span>

              <div className="ach__rating">
                <span className="ach__rating-number">
                  <AnimatedCounter target={a.rating} />
                </span>
                <span className="ach__rating-label">Rating</span>
              </div>

              <span className="ach__detail">{a.detail}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
