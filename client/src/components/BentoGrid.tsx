/*
 * DESIGN: Neon Vandal — Cyberpunk Graffiti Noir
 * BentoGrid: Asymmetric scattered grid layout.
 * Cards have varying sizes for visual interest.
 * Responsive from 1 column mobile to multi-column desktop.
 */

import { motion } from 'framer-motion';
import BentoCard, { type BentoCardData } from './BentoCard';

interface BentoGridProps {
  cards: BentoCardData[];
}

// Define grid span classes for each card based on its data
function getGridClasses(card: BentoCardData): string {
  const w = card.defaultWidth;
  const h = card.defaultHeight;

  let classes = '';

  // Column span (on md+ screens)
  if (w >= 2) {
    classes += 'md:col-span-2 ';
  } else {
    classes += 'col-span-1 ';
  }

  // Row span
  if (h >= 2) {
    classes += 'md:row-span-2 ';
  } else {
    classes += 'row-span-1 ';
  }

  return classes.trim();
}

export default function BentoGrid({ cards }: BentoGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 w-full"
      style={{
        gridAutoRows: 'minmax(200px, 240px)',
      }}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08 },
        },
      }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className={getGridClasses(card)}
          style={{ minHeight: '200px' }}
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.92 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.55,
                delay: index * 0.07,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
        >
          <BentoCard card={card} />
        </motion.div>
      ))}
    </motion.div>
  );
}
