/*
 * DESIGN: Neon Vandal — Cyberpunk Graffiti Noir
 * GlitchText: Text with a glitch/flicker effect.
 * Used for headers and rebellious messaging.
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
  color = '#FF2D7B',
  glowColor = 'rgba(255, 45, 123, 0.5)',
  as: Tag = 'h1',
}: GlitchTextProps) {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      animate={glitchActive ? {
        x: [0, -2, 3, -1, 0],
        skewX: [0, -1, 1, 0],
      } : {}}
      transition={{ duration: 0.2 }}
    >
      <Tag
        className="relative z-10"
        style={{
          fontFamily: "'Russo One', sans-serif",
          color,
          textShadow: `0 0 10px ${glowColor}, 0 0 30px ${glowColor}, 0 0 60px ${glowColor}`,
        }}
      >
        {text}
      </Tag>
      {/* Glitch layers */}
      {glitchActive && (
        <>
          <Tag
            className="absolute top-0 left-0 z-0"
            style={{
              fontFamily: "'Russo One', sans-serif",
              color: '#00D4FF',
              opacity: 0.7,
              transform: 'translate(-2px, -1px)',
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
              textShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
            }}
            aria-hidden="true"
          >
            {text}
          </Tag>
          <Tag
            className="absolute top-0 left-0 z-0"
            style={{
              fontFamily: "'Russo One', sans-serif",
              color: '#00FF9F',
              opacity: 0.7,
              transform: 'translate(2px, 1px)',
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
              textShadow: '0 0 10px rgba(0, 255, 159, 0.5)',
            }}
            aria-hidden="true"
          >
            {text}
          </Tag>
        </>
      )}
    </motion.div>
  );
}
