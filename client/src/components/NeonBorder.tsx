/*
 * DESIGN: Neon Vandal — Cyberpunk Graffiti Noir
 * NeonBorder: Animated rotating gradient border effect.
 * Wraps content with a pulsing neon border.
 */

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface NeonBorderProps {
  children: ReactNode;
  color?: 'pink' | 'green' | 'blue' | 'amber' | 'multi';
  className?: string;
  animate?: boolean;
}

const gradients = {
  pink: 'linear-gradient(90deg, #FF2D7B, #FF2D7B, transparent, #FF2D7B)',
  green: 'linear-gradient(90deg, #00FF9F, #00FF9F, transparent, #00FF9F)',
  blue: 'linear-gradient(90deg, #00D4FF, #00D4FF, transparent, #00D4FF)',
  amber: 'linear-gradient(90deg, #FFB800, #FFB800, transparent, #FFB800)',
  multi: 'linear-gradient(90deg, #FF2D7B, #00FF9F, #00D4FF, #FFB800, #FF2D7B)',
};

export default function NeonBorder({
  children,
  color = 'multi',
  className = '',
  animate = true,
}: NeonBorderProps) {
  return (
    <div className={`relative p-[1px] ${className}`}>
      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-sm"
        style={{
          background: gradients[color],
          backgroundSize: '300% 100%',
          opacity: 0.6,
        }}
        animate={animate ? {
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      {/* Glow layer */}
      <motion.div
        className="absolute inset-0 rounded-sm blur-sm"
        style={{
          background: gradients[color],
          backgroundSize: '300% 100%',
          opacity: 0.3,
        }}
        animate={animate ? {
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      {/* Content */}
      <div className="relative z-10 rounded-sm bg-background">
        {children}
      </div>
    </div>
  );
}
