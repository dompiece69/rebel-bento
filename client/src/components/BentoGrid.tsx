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

// Must match the grid gap and auto-row height used in the JSX below
const GRID_GAP = 16;
const GRID_ROW_HEIGHT = 260;

export default function BentoGrid({ cards }: BentoGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState({ w: 0, h: 0 });

  // Each card's current [colSpan, rowSpan] — lives here so the grid-item
  // wrapper (which actually controls the CSS grid placement) can update.
  const [spans, setSpans] = useState<Array<{ w: number; h: number }>>(
    cards.map(c => ({ w: c.defaultWidth, h: c.defaultHeight })),
  );

  // Sync spans array when new cards are added
  useEffect(() => {
    setSpans(prev => {
      if (cards.length <= prev.length) return prev;
      const added = cards
        .slice(prev.length)
        .map(c => ({ w: c.defaultWidth, h: c.defaultHeight }));
      return [...prev, ...added];
    });
  }, [cards.length]);

  // Measure a single grid column's pixel width so resize can snap to cells.
  // The step size for snapping is (columnTrackWidth + gap) because spanning
  // one extra column covers one more track AND one more gap.
  useEffect(() => {
    const measure = () => {
      if (!gridRef.current) return;
      const cols = getComputedStyle(gridRef.current).gridTemplateColumns.split(' ');
      const firstColWidth = parseFloat(cols[0]) || 0;
      if (firstColWidth > 0) {
        setCellSize({
          w: firstColWidth + GRID_GAP,
          h: GRID_ROW_HEIGHT + GRID_GAP,
        });
      }
    };

    measure();
    window.addEventListener('resize', measure);
    const timer = setTimeout(measure, 150);
    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(timer);
    };
  }, []);

  const handleSpanChange = (index: number, w: number, h: number) => {
    setSpans(prev => prev.map((s, i) => (i === index ? { w, h } : s)));
  };

  return (
    <motion.div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full"
      style={{
        gap: `${GRID_GAP}px`,
        gridAutoRows: `${GRID_ROW_HEIGHT}px`,
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
      {cards.map((card, index) => {
        const span = spans[index] ?? { w: card.defaultWidth, h: card.defaultHeight };
        return (
          <motion.div
            key={card.id}
            // This wrapper IS the CSS grid item — changing its class
            // immediately changes the card's grid placement/size.
            className={getSpanClasses(span.w, span.h)}
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
              currentSpanW={span.w}
              currentSpanH={span.h}
              onSpanChange={(w, h) => handleSpanChange(index, w, h)}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/**
 * Build responsive Tailwind col-span / row-span classes.
 * Responsive prefixes mirror the grid's own breakpoints so a wide card on a
 * large screen gracefully reduces its span on narrower viewports rather than
 * overflowing the grid.
 */
function getSpanClasses(w: number, h: number): string {
  // col-span: accumulate prefixed classes so each breakpoint caps correctly
  const colClass =
    w >= 4
      ? 'col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4'
      : w === 3
        ? 'col-span-1 sm:col-span-2 lg:col-span-3'
        : w === 2
          ? 'col-span-1 sm:col-span-2'
          : 'col-span-1';

  const rowClass = h >= 3 ? 'row-span-3' : h === 2 ? 'row-span-2' : 'row-span-1';

  return `${colClass} ${rowClass}`;
}
