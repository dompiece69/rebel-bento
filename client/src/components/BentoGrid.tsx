/*
 * DESIGN: Banksy Street Art — Raw Stencil Rebellion
 * BentoGrid: CSS Grid with enforced gaps.
 * Cards snap to grid cells when resized.
 * Rounded corners, shadows, no overlap.
 */

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import BentoCard, { type BentoCardData } from './BentoCard';

interface BentoGridProps {
  cards: BentoCardData[];
}

export default function BentoGrid({ cards }: BentoGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState({ w: 0, h: 0 });

  // Measure grid cell size for resize snapping
  useEffect(() => {
    const measure = () => {
      if (!gridRef.current) return;
      const gridStyles = getComputedStyle(gridRef.current);
      const cols = gridStyles.gridTemplateColumns.split(' ');
      const firstColWidth = parseFloat(cols[0]) || 0;
      // Row height is the auto-row value
      const rowHeight = 220; // matches gridAutoRows
      setCellSize({ w: firstColWidth, h: rowHeight });
    };

    measure();
    window.addEventListener('resize', measure);
    // Re-measure after a short delay to catch layout shifts
    const timer = setTimeout(measure, 100);
    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(timer);
    };
  }, []);

  return (
    <motion.div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full"
      style={{
        gap: '14px',
        gridAutoRows: '220px',
      }}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.06 },
        },
      }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className={getGridClasses(card)}
          style={{ minHeight: 0 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.45,
                delay: index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
        >
          <BentoCard
            card={card}
            gridCellWidth={cellSize.w}
            gridCellHeight={cellSize.h}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

function getGridClasses(card: BentoCardData): string {
  const w = card.defaultWidth;
  const h = card.defaultHeight;
  let classes = '';

  if (w >= 2) {
    classes += 'sm:col-span-2 ';
  } else {
    classes += 'col-span-1 ';
  }

  if (h >= 2) {
    classes += 'row-span-2 ';
  } else {
    classes += 'row-span-1 ';
  }

  return classes.trim();
}
