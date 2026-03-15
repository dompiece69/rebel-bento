/*
 * DESIGN: Banksy Street Art — Raw Stencil Rebellion
 * PaintBorder: Raw painted border with drip effect.
 * Replaces neon glow with gritty street art edge.
 */

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface PaintBorderProps {
  children: ReactNode;
  color?: 'red' | 'white' | 'multi';
  className?: string;
}

const borderColors = {
  red: 'rgba(200, 50, 50, 0.25)',
  white: 'rgba(232, 224, 212, 0.15)',
  multi: 'rgba(200, 50, 50, 0.2)',
};

export default function NeonBorder({ children, color = 'multi', className = '' }: PaintBorderProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="relative"
        style={{
          border: `2px solid ${borderColors[color]}`,
          borderRadius: '14px',
          background: 'rgba(25, 23, 20, 0.6)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          overflow: 'hidden',
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: borderColors[color] }} />
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
