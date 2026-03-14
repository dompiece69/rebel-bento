/*
 * DESIGN: Neon Vandal — Cyberpunk Graffiti Noir
 * PrivacyManifesto: The rebellious anti-corporate message banner.
 * Typewriter effect, glitch text, neon accents.
 */

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Shield, EyeOff, Lock, Wifi } from 'lucide-react';

const messages = [
  'NO COOKIES. NO TRACKERS. NO CORPORATE BS.',
  'YOUR DATA STAYS YOURS. PERIOD.',
  'THEY WATCH. WE DON\'T.',
  'ZERO ANALYTICS. ZERO SURVEILLANCE.',
  'BUILT FOR THE PEOPLE, NOT THE ALGORITHM.',
];

export default function PrivacyManifesto() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const msg = messages[currentMessage];
    if (isTyping) {
      if (displayText.length < msg.length) {
        const timeout = setTimeout(() => {
          setDisplayText(msg.slice(0, displayText.length + 1));
        }, 30 + Math.random() * 40);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 15);
        return () => clearTimeout(timeout);
      } else {
        setCurrentMessage((prev) => (prev + 1) % messages.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, currentMessage]);

  const icons = [
    { Icon: Shield, color: '#FF2D7B', label: 'SHIELDED' },
    { Icon: EyeOff, color: '#00FF9F', label: 'INVISIBLE' },
    { Icon: Lock, color: '#00D4FF', label: 'ENCRYPTED' },
    { Icon: Wifi, color: '#FFB800', label: 'DECENTRALIZED' },
  ];

  return (
    <div className="w-full py-6 px-4">
      {/* Typewriter message */}
      <div className="text-center mb-6">
        <div
          className="inline-block text-sm md:text-base tracking-widest uppercase"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            color: '#00FF9F',
            textShadow: '0 0 10px rgba(0, 255, 159, 0.5), 0 0 30px rgba(0, 255, 159, 0.2)',
            minHeight: '1.5em',
          }}
        >
          {displayText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{ color: '#FF2D7B' }}
          >
            _
          </motion.span>
        </div>
      </div>

      {/* Privacy icons */}
      <div className="flex justify-center gap-6 md:gap-10 flex-wrap">
        {icons.map(({ Icon, color, label }, i) => (
          <motion.div
            key={label}
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.15 }}
          >
            <motion.div
              className="p-3 rounded-sm"
              style={{
                border: `1px solid ${color}40`,
                background: `${color}08`,
              }}
              whileHover={{
                boxShadow: `0 0 15px ${color}40, 0 0 30px ${color}20`,
                borderColor: `${color}80`,
              }}
              animate={{
                boxShadow: [
                  `0 0 5px ${color}20`,
                  `0 0 10px ${color}30`,
                  `0 0 5px ${color}20`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              <Icon size={20} style={{ color }} />
            </motion.div>
            <span
              className="text-[10px] tracking-widest uppercase"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                color,
                opacity: 0.7,
              }}
            >
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
