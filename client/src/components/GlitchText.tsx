/*
 * DESIGN: Banksy Street Art — Raw Stencil Rebellion
 * StencilText: Spray-painted stencil text with drip effect.
 * Occasional glitch/shake to feel alive and raw.
 */

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  color?: string;
  glowColor?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
}

export default function GlitchText({
  text,
  className = '',
  color = '#C83232',
  glowColor = 'rgba(200, 50, 50, 0.3)',
  as: Tag = 'h1',
}: GlitchTextProps) {
  const [shakeActive, setShakeActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShakeActive(true);
      setTimeout(() => setShakeActive(false), 150);
    }, 4000 + Math.random() * 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      animate={shakeActive ? {
        x: [0, -3, 4, -2, 0],
        rotate: [0, -0.3, 0.3, 0],
      } : {}}
      transition={{ duration: 0.15 }}
    >
      {/* Main text */}
      <Tag
        className="relative z-10"
        style={{
          fontFamily: "'Permanent Marker', cursive",
          color,
          textShadow: `3px 3px 0 rgba(0, 0, 0, 0.5), 0 0 30px ${glowColor}`,
          lineHeight: 1.1,
        }}
      >
        {text}
      </Tag>

      {/* Stencil shadow layer */}
      <Tag
        className="absolute top-0 left-0 z-0"
        style={{
          fontFamily: "'Permanent Marker', cursive",
          color: 'rgba(0, 0, 0, 0.3)',
          transform: 'translate(4px, 4px)',
          lineHeight: 1.1,
        }}
        aria-hidden="true"
      >
        {text}
      </Tag>

      {/* Spray overshoot layer — visible during shake */}
      {shakeActive && (
        <Tag
          className="absolute top-0 left-0 z-0"
          style={{
            fontFamily: "'Permanent Marker', cursive",
            color,
            opacity: 0.15,
            transform: 'translate(-2px, -1px) scale(1.02)',
            filter: 'blur(3px)',
            lineHeight: 1.1,
          }}
          aria-hidden="true"
        >
          {text}
        </Tag>
      )}
    </motion.div>
  );
}
