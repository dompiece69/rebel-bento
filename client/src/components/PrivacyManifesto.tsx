/*
 * DESIGN: Banksy Street Art — Raw Stencil Rebellion
 * PrivacyManifesto: Anti-corporate message with typewriter effect.
 * Stencil icons, raw messaging, Banksy attitude.
 */

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Shield, EyeOff, Lock, Wifi } from 'lucide-react';

const messages = [
  'NO COOKIES. NO TRACKERS. NO CORPORATE BS.',
  'YOUR DATA STAYS YOURS. PERIOD.',
  'THEY WATCH. WE DON\'T.',
  'ZERO ANALYTICS. ZERO SURVEILLANCE.',
  'THIS IS NOT A PRODUCT. THIS IS A PROTEST.',
  'THE REVOLUTION WILL NOT BE MONETIZED.',
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
        }, 25 + Math.random() * 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2500);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 12);
        return () => clearTimeout(timeout);
      } else {
        setCurrentMessage((prev) => (prev + 1) % messages.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, currentMessage]);

  const icons = [
    { Icon: Shield, label: 'SHIELDED' },
    { Icon: EyeOff, label: 'INVISIBLE' },
    { Icon: Lock, label: 'ENCRYPTED' },
    { Icon: Wifi, label: 'DECENTRALIZED' },
  ];

  return (
    <div className="w-full py-5 px-4">
      {/* Typewriter message */}
      <div className="text-center mb-5">
        <div
          className="inline-block text-sm md:text-base tracking-wider uppercase"
          style={{
            fontFamily: "'Permanent Marker', cursive",
            color: '#C83232',
            textShadow: '1px 1px 0 rgba(0,0,0,0.4)',
            minHeight: '1.5em',
          }}
        >
          {displayText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{ color: '#e8e0d4' }}
          >
            |
          </motion.span>
        </div>
      </div>

      {/* Privacy icons */}
      <div className="flex justify-center gap-6 md:gap-10 flex-wrap">
        {icons.map(({ Icon, label }, i) => (
          <motion.div
            key={label}
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.12 }}
          >
            <motion.div
              className="p-3"
              style={{
                border: '2px solid rgba(200, 50, 50, 0.2)',
                borderRadius: '10px',
                background: 'rgba(200, 50, 50, 0.04)',
              }}
              whileHover={{
                borderColor: 'rgba(200, 50, 50, 0.5)',
                boxShadow: '0 0 12px rgba(200, 50, 50, 0.15)',
              }}
            >
              <Icon size={20} style={{ color: '#C83232' }} />
            </motion.div>
            <span
              className="text-[10px] tracking-widest uppercase stencil-text"
              style={{ color: '#8a8278' }}
            >
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
