/*
 * DESIGN: Neon Vandal — Cyberpunk Graffiti Noir
 * AddCardModal: Modal for adding new link cards to the grid.
 * Styled with neon borders and cyberpunk inputs.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import type { BentoCardData } from './BentoCard';

interface AddCardModalProps {
  onAdd: (card: BentoCardData) => void;
}

const neonColorOptions: Array<{ value: BentoCardData['neonColor']; label: string; color: string }> = [
  { value: 'pink', label: 'NEON PINK', color: '#FF2D7B' },
  { value: 'green', label: 'ACID GREEN', color: '#00FF9F' },
  { value: 'blue', label: 'LASER BLUE', color: '#00D4FF' },
  { value: 'amber', label: 'WARNING AMBER', color: '#FFB800' },
];

export default function AddCardModal({ onAdd }: AddCardModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkLabel, setLinkLabel] = useState('');
  const [neonColor, setNeonColor] = useState<BentoCardData['neonColor']>('pink');
  const [cardSize, setCardSize] = useState<'small' | 'wide' | 'tall' | 'large'>('small');

  const handleSubmit = () => {
    if (!title || !videoUrl || !linkUrl || !linkLabel) return;

    const sizeMap = {
      small: { w: 1, h: 1 },
      wide: { w: 2, h: 1 },
      tall: { w: 1, h: 2 },
      large: { w: 2, h: 2 },
    };

    const newCard: BentoCardData = {
      id: `card-${Date.now()}`,
      title,
      videoUrl,
      linkUrl,
      linkLabel,
      neonColor,
      defaultWidth: sizeMap[cardSize].w,
      defaultHeight: sizeMap[cardSize].h,
      rotation: (Math.random() - 0.5) * 2,
    };

    onAdd(newCard);
    setIsOpen(false);
    setTitle('');
    setVideoUrl('');
    setLinkUrl('');
    setLinkLabel('');
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    background: 'rgba(10, 10, 15, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '2px',
    color: '#e8e8e8',
    padding: '8px 12px',
    width: '100%',
    outline: 'none',
  };

  return (
    <>
      {/* Add button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#00FF9F',
          border: '1px solid rgba(0, 255, 159, 0.3)',
          borderRadius: '2px',
          background: 'rgba(0, 255, 159, 0.05)',
        }}
        whileHover={{
          borderColor: 'rgba(0, 255, 159, 0.6)',
          boxShadow: '0 0 15px rgba(0, 255, 159, 0.2), 0 0 30px rgba(0, 255, 159, 0.1)',
        }}
        whileTap={{ scale: 0.97 }}
      >
        <Plus size={14} />
        ADD CARD
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal content */}
            <motion.div
              className="relative z-10 w-full max-w-md p-6"
              style={{
                background: 'rgba(12, 12, 18, 0.98)',
                border: '1px solid rgba(255, 45, 123, 0.3)',
                borderRadius: '3px',
                boxShadow: '0 0 30px rgba(255, 45, 123, 0.15), 0 20px 60px rgba(0,0,0,0.5)',
              }}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <h2
                  className="text-sm uppercase tracking-[0.2em]"
                  style={{
                    fontFamily: "'Russo One', sans-serif",
                    color: '#FF2D7B',
                    textShadow: '0 0 8px rgba(255, 45, 123, 0.4)',
                  }}
                >
                  NEW CARD
                </h2>
                <button onClick={() => setIsOpen(false)} className="opacity-40 hover:opacity-100 transition-opacity">
                  <X size={16} style={{ color: '#e8e8e8' }} />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest mb-1" style={{ fontFamily: "'Orbitron', sans-serif", color: '#00D4FF', opacity: 0.7 }}>
                    TITLE
                  </label>
                  <input
                    style={inputStyle}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="SIGNAL PROTOCOL"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest mb-1" style={{ fontFamily: "'Orbitron', sans-serif", color: '#00D4FF', opacity: 0.7 }}>
                    VIDEO EMBED URL
                  </label>
                  <input
                    style={inputStyle}
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/embed/..."
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest mb-1" style={{ fontFamily: "'Orbitron', sans-serif", color: '#00D4FF', opacity: 0.7 }}>
                    LINK URL
                  </label>
                  <input
                    style={inputStyle}
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://signal.org"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest mb-1" style={{ fontFamily: "'Orbitron', sans-serif", color: '#00D4FF', opacity: 0.7 }}>
                    LINK LABEL
                  </label>
                  <input
                    style={inputStyle}
                    value={linkLabel}
                    onChange={(e) => setLinkLabel(e.target.value)}
                    placeholder="GET SIGNAL"
                  />
                </div>

                {/* Neon color picker */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest mb-2" style={{ fontFamily: "'Orbitron', sans-serif", color: '#00D4FF', opacity: 0.7 }}>
                    NEON COLOR
                  </label>
                  <div className="flex gap-2">
                    {neonColorOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setNeonColor(opt.value)}
                        className="flex-1 py-2 text-[9px] uppercase tracking-wider transition-all"
                        style={{
                          fontFamily: "'Orbitron', sans-serif",
                          color: opt.color,
                          border: `1px solid ${neonColor === opt.value ? opt.color : 'rgba(255,255,255,0.08)'}`,
                          borderRadius: '2px',
                          background: neonColor === opt.value ? `${opt.color}15` : 'transparent',
                          boxShadow: neonColor === opt.value ? `0 0 10px ${opt.color}30` : 'none',
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size picker */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest mb-2" style={{ fontFamily: "'Orbitron', sans-serif", color: '#00D4FF', opacity: 0.7 }}>
                    CARD SIZE
                  </label>
                  <div className="flex gap-2">
                    {(['small', 'wide', 'tall', 'large'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setCardSize(s)}
                        className="flex-1 py-2 text-[9px] uppercase tracking-wider transition-all"
                        style={{
                          fontFamily: "'Orbitron', sans-serif",
                          color: cardSize === s ? '#FFB800' : 'rgba(232,232,232,0.4)',
                          border: `1px solid ${cardSize === s ? 'rgba(255,184,0,0.5)' : 'rgba(255,255,255,0.08)'}`,
                          borderRadius: '2px',
                          background: cardSize === s ? 'rgba(255,184,0,0.08)' : 'transparent',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  onClick={handleSubmit}
                  className="w-full py-3 mt-2 text-xs uppercase tracking-[0.2em] font-bold"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: '#00FF9F',
                    border: '1px solid rgba(0, 255, 159, 0.4)',
                    borderRadius: '2px',
                    background: 'rgba(0, 255, 159, 0.08)',
                  }}
                  whileHover={{
                    boxShadow: '0 0 20px rgba(0, 255, 159, 0.3)',
                    borderColor: 'rgba(0, 255, 159, 0.7)',
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  DEPLOY CARD
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
