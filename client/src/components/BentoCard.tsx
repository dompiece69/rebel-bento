/*
 * DESIGN: Neon Vandal — Cyberpunk Graffiti Noir
 * BentoCard: Flippable card — video front, animated link back.
 * Corner grab handles for resize. iFrame containment on back.
 * Neon glow borders, glitch hover, scan-line textures.
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
  neonColor: 'pink' | 'green' | 'blue' | 'amber';
  defaultWidth: number;
  defaultHeight: number;
  rotation?: number;
}

interface BentoCardProps {
  card: BentoCardData;
  style?: React.CSSProperties;
}

const neonColors = {
  pink: {
    border: 'rgba(255, 45, 123, 0.5)',
    glow: 'rgba(255, 45, 123, 0.25)',
    text: '#FF2D7B',
    bg: 'rgba(255, 45, 123, 0.06)',
    shadow: '0 0 12px rgba(255, 45, 123, 0.3), 0 0 30px rgba(255, 45, 123, 0.15)',
  },
  green: {
    border: 'rgba(0, 255, 159, 0.5)',
    glow: 'rgba(0, 255, 159, 0.25)',
    text: '#00FF9F',
    bg: 'rgba(0, 255, 159, 0.06)',
    shadow: '0 0 12px rgba(0, 255, 159, 0.3), 0 0 30px rgba(0, 255, 159, 0.15)',
  },
  blue: {
    border: 'rgba(0, 212, 255, 0.5)',
    glow: 'rgba(0, 212, 255, 0.25)',
    text: '#00D4FF',
    bg: 'rgba(0, 212, 255, 0.06)',
    shadow: '0 0 12px rgba(0, 212, 255, 0.3), 0 0 30px rgba(0, 212, 255, 0.15)',
  },
  amber: {
    border: 'rgba(255, 184, 0, 0.5)',
    glow: 'rgba(255, 184, 0, 0.25)',
    text: '#FFB800',
    bg: 'rgba(255, 184, 0, 0.06)',
    shadow: '0 0 12px rgba(255, 184, 0, 0.3), 0 0 30px rgba(255, 184, 0, 0.15)',
  },
};

export default function BentoCard({ card, style }: BentoCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<{
    startX: number; startY: number;
    startW: number; startH: number;
    corner: string;
  } | null>(null);

  const colors = neonColors[card.neonColor];

  useEffect(() => {
    if (cardRef.current && size.w === 0) {
      const rect = cardRef.current.getBoundingClientRect();
      setSize({ w: rect.width, h: rect.height });
    }
  }, [size.w]);

  const handleResizeStart = useCallback((e: React.MouseEvent | React.TouchEvent, corner: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    resizeRef.current = {
      startX: clientX, startY: clientY,
      startW: rect.width, startH: rect.height,
      corner,
    };
    setIsResizing(true);

    const handleMove = (ev: MouseEvent | TouchEvent) => {
      if (!resizeRef.current) return;
      const cx = 'touches' in ev ? ev.touches[0].clientX : ev.clientX;
      const cy = 'touches' in ev ? ev.touches[0].clientY : ev.clientY;
      const dx = cx - resizeRef.current.startX;
      const dy = cy - resizeRef.current.startY;

      let newW = resizeRef.current.startW;
      let newH = resizeRef.current.startH;

      if (corner.includes('right')) newW += dx;
      if (corner.includes('left')) newW -= dx;
      if (corner.includes('bottom')) newH += dy;
      if (corner.includes('top')) newH -= dy;

      setSize({ w: Math.max(180, newW), h: Math.max(140, newH) });
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
  }, []);

  const handleFlip = useCallback(() => {
    if (!isResizing) setIsFlipped(prev => !prev);
  }, [isResizing]);

  const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  const cornerPos: Record<string, React.CSSProperties> = {
    'top-left': { top: -3, left: -3, cursor: 'nw-resize' },
    'top-right': { top: -3, right: -3, cursor: 'ne-resize' },
    'bottom-left': { bottom: -3, left: -3, cursor: 'sw-resize' },
    'bottom-right': { bottom: -3, right: -3, cursor: 'se-resize' },
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      style={{
        ...style,
        width: size.w > 0 ? size.w : '100%',
        height: size.h > 0 ? size.h : '100%',
        perspective: '1200px',
        transform: `rotate(${card.rotation || 0}deg)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Flip container */}
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ===== FRONT: Video ===== */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: '3px',
            border: `1px solid ${isHovered ? colors.border : 'rgba(255,255,255,0.04)'}`,
            boxShadow: isHovered ? colors.shadow : '0 2px 15px rgba(0,0,0,0.5)',
            background: 'rgba(10, 10, 15, 0.95)',
            transition: 'border-color 0.4s, box-shadow 0.4s',
          }}
        >
          {/* Video iframe */}
          <iframe
            src={card.videoUrl}
            className="w-full h-full absolute inset-0"
            style={{ border: 'none' }}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={card.title}
            loading="lazy"
          />

          {/* Bottom gradient overlay */}
          <div
            className="absolute inset-x-0 bottom-0 z-10 flex items-end pointer-events-none"
            style={{
              height: '45%',
              background: 'linear-gradient(to top, rgba(8,8,12,0.92) 0%, rgba(8,8,12,0.5) 50%, transparent 100%)',
            }}
          >
            <div className="p-3 md:p-4 w-full pointer-events-auto">
              <h3
                className="text-xs md:text-sm font-bold uppercase tracking-wider mb-1.5"
                style={{
                  fontFamily: "'Russo One', sans-serif",
                  color: colors.text,
                  textShadow: `0 0 8px ${colors.glow}`,
                }}
              >
                {card.title}
              </h3>
              <button
                onClick={(e) => { e.stopPropagation(); handleFlip(); }}
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] opacity-50 hover:opacity-100 transition-all duration-300"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: '#e8e8e8',
                }}
              >
                <RotateCcw size={10} />
                FLIP FOR LINK
              </button>
            </div>
          </div>

          {/* Top-right neon color indicator */}
          <div
            className="absolute top-2 right-2 z-10 w-2 h-2 rounded-full"
            style={{
              background: colors.text,
              boxShadow: `0 0 6px ${colors.glow}, 0 0 12px ${colors.glow}`,
            }}
          />
        </div>

        {/* ===== BACK: Link + iFrame ===== */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: '3px',
            border: `1px solid ${colors.border}`,
            boxShadow: colors.shadow,
            background: `linear-gradient(145deg, rgba(8,8,12,0.97) 0%, ${colors.bg} 100%)`,
          }}
        >
          {/* Animated rain lines */}
          <div className="absolute inset-0 overflow-hidden opacity-15 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: '1px',
                  height: '100%',
                  background: `linear-gradient(to bottom, transparent, ${colors.text}, transparent)`,
                  left: `${15 + i * 14}%`,
                }}
                animate={{ y: ['-100%', '100%'], opacity: [0, 0.8, 0] }}
                transition={{
                  duration: 1.8 + Math.random() * 1.5,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'linear',
                }}
              />
            ))}
          </div>

          {/* Back content */}
          <div className="relative z-10 w-full h-full flex flex-col p-4">
            {/* Title */}
            <motion.h3
              className="text-sm md:text-base font-bold uppercase tracking-wider mb-3 text-center"
              style={{
                fontFamily: "'Russo One', sans-serif",
                color: colors.text,
                textShadow: `0 0 8px ${colors.glow}`,
              }}
              animate={isHovered ? { x: [0, -1, 1, 0] } : {}}
              transition={{ duration: 0.3, repeat: isHovered ? Infinity : 0 }}
            >
              {card.title}
            </motion.h3>

            {/* Link button */}
            <motion.a
              href={card.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center gap-2 px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] font-bold overflow-hidden mb-3 shrink-0"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                color: colors.text,
                border: `1px solid ${colors.border}`,
                borderRadius: '2px',
                background: 'rgba(8, 8, 12, 0.85)',
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: `0 0 20px ${colors.glow}, 0 0 40px ${colors.glow}`,
              }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="absolute inset-0"
                style={{ background: `linear-gradient(90deg, transparent, ${colors.bg}, transparent)` }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              />
              <ExternalLink size={12} className="relative z-10" />
              <span className="relative z-10">{card.linkLabel}</span>
            </motion.a>

            {/* iFrame preview */}
            <div
              className="flex-1 min-h-0 overflow-hidden"
              style={{
                border: `1px solid ${colors.border}`,
                borderRadius: '2px',
                background: 'rgba(0,0,0,0.3)',
              }}
            >
              <iframe
                src={card.linkUrl}
                className="w-full h-full"
                style={{
                  border: 'none',
                  filter: 'brightness(0.75) contrast(1.1)',
                }}
                title={`${card.title} preview`}
                sandbox="allow-scripts allow-same-origin allow-popups"
                loading="lazy"
              />
            </div>

            {/* Flip back */}
            <button
              onClick={(e) => { e.stopPropagation(); handleFlip(); }}
              className="mt-2 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-all duration-300 shrink-0"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                color: '#e8e8e8',
              }}
            >
              <RotateCcw size={10} />
              FLIP BACK
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
            width: 18,
            height: 18,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
          onMouseDown={(e) => handleResizeStart(e, corner)}
          onTouchStart={(e) => handleResizeStart(e, corner)}
        >
          <div
            className="absolute"
            style={{
              width: '100%',
              height: '2px',
              background: colors.text,
              boxShadow: `0 0 4px ${colors.glow}`,
              top: corner.includes('top') ? 0 : 'auto',
              bottom: corner.includes('bottom') ? 0 : 'auto',
            }}
          />
          <div
            className="absolute"
            style={{
              width: '2px',
              height: '100%',
              background: colors.text,
              boxShadow: `0 0 4px ${colors.glow}`,
              left: corner.includes('left') ? 0 : 'auto',
              right: corner.includes('right') ? 0 : 'auto',
            }}
          />
        </div>
      ))}

      {/* Resize dimension indicator */}
      <AnimatePresence>
        {isResizing && (
          <motion.div
            className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] z-50 whitespace-nowrap"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              color: colors.text,
              background: 'rgba(8,8,12,0.95)',
              border: `1px solid ${colors.border}`,
              borderRadius: '2px',
              textShadow: `0 0 4px ${colors.glow}`,
            }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
          >
            {Math.round(size.w)} x {Math.round(size.h)}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
