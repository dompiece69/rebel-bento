/*
 * DESIGN: Banksy Street Art — Raw Stencil Rebellion
 * BentoCard: Flippable card — video front, animated link back.
 * Corner grab handles for resize within grid cell bounds.
 * Rounded edges, deep shadows, concrete texture. No overlap.
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, RotateCcw } from 'lucide-react';

export interface BentoCardData {
  id: string;
  title: string;
  videoUrl: string;
  linkUrl: string;
  linkLabel: string;
  neonColor: 'red' | 'white' | 'grey' | 'dark';
  defaultWidth: number;
  defaultHeight: number;
  rotation?: number;
}

interface BentoCardProps {
  card: BentoCardData;
  style?: React.CSSProperties;
  gridCellWidth?: number;
  gridCellHeight?: number;
}

const cardColors = {
  red: {
    accent: '#C83232',
    accentGlow: 'rgba(200, 50, 50, 0.25)',
    border: 'rgba(200, 50, 50, 0.35)',
    bg: 'rgba(200, 50, 50, 0.04)',
  },
  white: {
    accent: '#e8e0d4',
    accentGlow: 'rgba(232, 224, 212, 0.15)',
    border: 'rgba(232, 224, 212, 0.2)',
    bg: 'rgba(232, 224, 212, 0.03)',
  },
  grey: {
    accent: '#8a8278',
    accentGlow: 'rgba(138, 130, 120, 0.15)',
    border: 'rgba(138, 130, 120, 0.25)',
    bg: 'rgba(138, 130, 120, 0.04)',
  },
  dark: {
    accent: '#5a5550',
    accentGlow: 'rgba(90, 85, 80, 0.15)',
    border: 'rgba(90, 85, 80, 0.3)',
    bg: 'rgba(90, 85, 80, 0.05)',
  },
};

export default function BentoCard({ card, gridCellWidth, gridCellHeight }: BentoCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [spanW, setSpanW] = useState(card.defaultWidth);
  const [spanH, setSpanH] = useState(card.defaultHeight);
  const [isResizing, setIsResizing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<{
    startX: number; startY: number;
    startSpanW: number; startSpanH: number;
    corner: string;
    cellW: number; cellH: number;
  } | null>(null);

  const colors = cardColors[card.neonColor];

  // Notify parent of span changes
  const onSpanChange = useCallback((newW: number, newH: number) => {
    setSpanW(Math.max(1, Math.min(4, newW)));
    setSpanH(Math.max(1, Math.min(3, newH)));
  }, []);

  const handleResizeStart = useCallback((e: React.MouseEvent | React.TouchEvent, corner: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (!cardRef.current || !gridCellWidth || !gridCellHeight) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    resizeRef.current = {
      startX: clientX,
      startY: clientY,
      startSpanW: spanW,
      startSpanH: spanH,
      corner,
      cellW: gridCellWidth,
      cellH: gridCellHeight,
    };
    setIsResizing(true);

    const handleMove = (ev: MouseEvent | TouchEvent) => {
      if (!resizeRef.current) return;
      const cx = 'touches' in ev ? ev.touches[0].clientX : ev.clientX;
      const cy = 'touches' in ev ? ev.touches[0].clientY : ev.clientY;
      const dx = cx - resizeRef.current.startX;
      const dy = cy - resizeRef.current.startY;

      // Snap to grid: calculate how many cells the drag covers
      const cellDx = Math.round(dx / resizeRef.current.cellW);
      const cellDy = Math.round(dy / resizeRef.current.cellH);

      let newSpanW = resizeRef.current.startSpanW;
      let newSpanH = resizeRef.current.startSpanH;

      if (corner.includes('right')) newSpanW += cellDx;
      if (corner.includes('left')) newSpanW -= cellDx;
      if (corner.includes('bottom')) newSpanH += cellDy;
      if (corner.includes('top')) newSpanH -= cellDy;

      onSpanChange(newSpanW, newSpanH);
    };

    const handleEnd = () => {
      resizeRef.current = null;
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd);
  }, [spanW, spanH, gridCellWidth, gridCellHeight, onSpanChange]);

  const handleFlip = useCallback(() => {
    if (!isResizing) setIsFlipped(prev => !prev);
  }, [isResizing]);

  const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  const cornerPos: Record<string, React.CSSProperties> = {
    'top-left': { top: 4, left: 4, cursor: 'nw-resize' },
    'top-right': { top: 4, right: 4, cursor: 'ne-resize' },
    'bottom-left': { bottom: 4, left: 4, cursor: 'sw-resize' },
    'bottom-right': { bottom: 4, right: 4, cursor: 'se-resize' },
  };

  // Get grid span classes
  const getSpanClasses = () => {
    const colSpans: Record<number, string> = { 1: 'col-span-1', 2: 'sm:col-span-2', 3: 'sm:col-span-3', 4: 'sm:col-span-4' };
    const rowSpans: Record<number, string> = { 1: 'row-span-1', 2: 'row-span-2', 3: 'row-span-3' };
    return `${colSpans[spanW] || 'col-span-1'} ${rowSpans[spanH] || 'row-span-1'}`;
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative group ${getSpanClasses()}`}
      style={{ perspective: '1200px', minHeight: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      layout
    >
      {/* Flip container */}
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ===== FRONT: Video ===== */}
        <div
          className="absolute inset-0 bento-card"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderColor: isHovered ? colors.border : undefined,
          }}
        >
          {/* Video iframe */}
          <iframe
            src={card.videoUrl}
            className="w-full h-full absolute inset-0"
            style={{ border: 'none', borderRadius: '10px' }}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={card.title}
            loading="lazy"
          />

          {/* Bottom gradient overlay */}
          <div
            className="absolute inset-x-0 bottom-0 z-10 flex items-end pointer-events-none"
            style={{
              height: '50%',
              background: 'linear-gradient(to top, rgba(20,18,15,0.95) 0%, rgba(20,18,15,0.6) 50%, transparent 100%)',
              borderRadius: '0 0 10px 10px',
            }}
          >
            <div className="p-3 md:p-4 w-full pointer-events-auto">
              <h3
                className="text-sm md:text-base uppercase tracking-wide mb-1"
                style={{
                  fontFamily: "'Permanent Marker', cursive",
                  color: colors.accent,
                  textShadow: `1px 1px 0 rgba(0,0,0,0.6)`,
                }}
              >
                {card.title}
              </h3>
              <button
                onClick={(e) => { e.stopPropagation(); handleFlip(); }}
                className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider opacity-50 hover:opacity-100 transition-all duration-300"
                style={{ fontFamily: "'Special Elite', cursive", color: '#a09888' }}
              >
                <RotateCcw size={11} />
                flip for link
              </button>
            </div>
          </div>

          {/* Corner accent mark */}
          <div
            className="absolute top-3 right-3 z-10 w-3 h-3"
            style={{
              background: colors.accent,
              borderRadius: '2px',
              boxShadow: `0 0 8px ${colors.accentGlow}`,
              transform: 'rotate(45deg)',
            }}
          />
        </div>

        {/* ===== BACK: Link + iFrame ===== */}
        <div
          className="absolute inset-0 bento-card overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderColor: colors.border,
          }}
        >
          {/* Animated drip lines on back */}
          <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: '2px',
                  height: '100%',
                  background: `linear-gradient(to bottom, transparent, ${colors.accent}, transparent)`,
                  left: `${12 + i * 20}%`,
                  transformOrigin: 'top',
                }}
                animate={{ scaleY: [0, 1, 0], opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Back content */}
          <div className="relative z-10 w-full h-full flex flex-col p-4">
            {/* Title */}
            <h3
              className="text-sm md:text-base uppercase tracking-wide mb-3 text-center"
              style={{
                fontFamily: "'Permanent Marker', cursive",
                color: colors.accent,
                textShadow: `1px 1px 0 rgba(0,0,0,0.5)`,
              }}
            >
              {card.title}
            </h3>

            {/* Link button */}
            <motion.a
              href={card.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider font-bold overflow-hidden mb-3 shrink-0"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: '0.15em',
                color: card.neonColor === 'red' ? '#e8e0d4' : colors.accent,
                border: `2px solid ${colors.border}`,
                borderRadius: '8px',
                background: card.neonColor === 'red' ? 'rgba(200, 50, 50, 0.15)' : 'rgba(25, 23, 20, 0.8)',
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: `0 0 15px ${colors.accentGlow}`,
              }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={13} className="relative z-10" />
              <span className="relative z-10">{card.linkLabel}</span>
            </motion.a>

            {/* iFrame preview */}
            <div
              className="flex-1 min-h-0 overflow-hidden"
              style={{
                border: `1px solid rgba(80, 75, 65, 0.3)`,
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.25)',
              }}
            >
              <iframe
                src={card.linkUrl}
                className="w-full h-full"
                style={{
                  border: 'none',
                  borderRadius: '7px',
                  filter: 'brightness(0.7) contrast(1.05) sepia(0.1)',
                }}
                title={`${card.title} preview`}
                sandbox="allow-scripts allow-same-origin allow-popups"
                loading="lazy"
              />
            </div>

            {/* Flip back */}
            <button
              onClick={(e) => { e.stopPropagation(); handleFlip(); }}
              className="mt-2 flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-wider opacity-40 hover:opacity-100 transition-all duration-300 shrink-0"
              style={{ fontFamily: "'Special Elite', cursive", color: '#a09888' }}
            >
              <RotateCcw size={11} />
              flip back
            </button>
          </div>
        </div>
      </motion.div>

      {/* ===== Corner Resize Handles ===== */}
      {corners.map((corner) => (
        <div
          key={corner}
          className="absolute z-50"
          style={{
            ...cornerPos[corner],
            width: 20,
            height: 20,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
          onMouseDown={(e) => handleResizeStart(e, corner)}
          onTouchStart={(e) => handleResizeStart(e, corner)}
        >
          {/* L-shaped corner handle */}
          <div
            className="absolute"
            style={{
              width: '100%',
              height: '2px',
              background: '#C83232',
              borderRadius: '1px',
              top: corner.includes('top') ? 0 : 'auto',
              bottom: corner.includes('bottom') ? 0 : 'auto',
              boxShadow: '0 0 4px rgba(200,50,50,0.4)',
            }}
          />
          <div
            className="absolute"
            style={{
              width: '2px',
              height: '100%',
              background: '#C83232',
              borderRadius: '1px',
              left: corner.includes('left') ? 0 : 'auto',
              right: corner.includes('right') ? 0 : 'auto',
              boxShadow: '0 0 4px rgba(200,50,50,0.4)',
            }}
          />
        </div>
      ))}

      {/* Resize span indicator */}
      <AnimatePresence>
        {isResizing && (
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 text-[11px] z-50 whitespace-nowrap"
            style={{
              fontFamily: "'Special Elite', cursive",
              color: '#C83232',
              background: 'rgba(20, 18, 15, 0.95)',
              border: '1px solid rgba(200, 50, 50, 0.3)',
              borderRadius: '6px',
            }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
          >
            {spanW}x{spanH}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
