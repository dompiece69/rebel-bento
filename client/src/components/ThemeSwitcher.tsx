/*
 * DESIGN: Theme Switcher
 * Toggle between Banksy, Pixel, and Futuristic themes.
 * Positioned in top-right corner with smooth transitions.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, type AppTheme } from '@/contexts/ThemeContext';
import { Palette } from 'lucide-react';

const themes: Array<{ value: AppTheme; label: string; icon: string }> = [
  { value: 'banksy', label: 'BANKSY', icon: '🎨' },
  { value: 'pixel', label: 'PIXEL', icon: '█' },
  { value: 'futuristic', label: 'FUTURE', icon: '◆' },
];

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  
  let theme: AppTheme = 'banksy';
  let setTheme: (t: AppTheme) => void = () => {};
  
  try {
    const ctx = useTheme();
    theme = ctx.theme;
    setTheme = ctx.setTheme;
  } catch (e) {
    // useTheme not available, use defaults
  }

  return (
    <motion.div
      className="fixed top-6 right-6 z-[200]"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2 }}
    >
      {/* Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full right-0 mt-2 flex flex-col gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {themes.map((t) => (
              <motion.button
                key={t.value}
                onClick={() => {
                  setTheme(t.value);
                  setIsOpen(false);
                }}
                className="px-3 py-2 text-xs uppercase tracking-wider whitespace-nowrap"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: '0.1em',
                  color: theme === t.value ? '#e8e0d4' : '#8a8278',
                  border: `1px solid ${theme === t.value ? 'rgba(200,50,50,0.4)' : 'rgba(80,75,65,0.2)'}`,
                  borderRadius: '6px',
                  background: theme === t.value ? 'rgba(200,50,50,0.08)' : 'rgba(25,23,20,0.8)',
                }}
                whileHover={{
                  borderColor: 'rgba(200,50,50,0.5)',
                }}
              >
                {t.icon} {t.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2.5"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#C83232',
          border: '2px solid rgba(200, 50, 50, 0.3)',
          borderRadius: '8px',
          background: 'rgba(200, 50, 50, 0.05)',
        }}
        whileHover={{
          borderColor: 'rgba(200, 50, 50, 0.6)',
          boxShadow: '0 0 12px rgba(200, 50, 50, 0.15)',
        }}
        whileTap={{ scale: 0.95 }}
      >
        <Palette size={14} />
        THEME
      </motion.button>
    </motion.div>
  );
}
