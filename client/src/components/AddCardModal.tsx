/*
 * DESIGN: Banksy Street Art — Raw Stencil Rebellion
 * AddCardModal: Modal for adding new link cards.
 * Raw concrete styling, stencil fonts, red accents.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import type { BentoCardData } from './BentoCard';

interface AddCardModalProps {
  onAdd: (card: BentoCardData) => void;
}

const colorOptions: Array<{ value: BentoCardData['neonColor']; label: string; color: string }> = [
  { value: 'red', label: 'REBEL RED', color: '#C83232' },
  { value: 'white', label: 'STENCIL WHITE', color: '#e8e0d4' },
  { value: 'grey', label: 'CONCRETE', color: '#8a8278' },
  { value: 'dark', label: 'SHADOW', color: '#5a5550' },
];

export default function AddCardModal({ onAdd }: AddCardModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkLabel, setLinkLabel] = useState('');
  const [neonColor, setNeonColor] = useState<BentoCardData['neonColor']>('red');
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
    };

    onAdd(newCard);
    setIsOpen(false);
    setTitle('');
    setVideoUrl('');
    setLinkUrl('');
    setLinkLabel('');
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: "'Special Elite', cursive",
    fontSize: '13px',
    background: 'rgba(20, 18, 15, 0.8)',
    border: '1px solid rgba(80, 75, 65, 0.3)',
    borderRadius: '8px',
    color: '#e8e0d4',
    padding: '10px 14px',
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
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '14px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#C83232',
          border: '2px solid rgba(200, 50, 50, 0.3)',
          borderRadius: '8px',
          background: 'rgba(200, 50, 50, 0.05)',
        }}
        whileHover={{
          borderColor: 'rgba(200, 50, 50, 0.6)',
          boxShadow: '0 0 15px rgba(200, 50, 50, 0.15)',
        }}
        whileTap={{ scale: 0.97 }}
      >
        <Plus size={16} />
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
                background: 'rgba(25, 23, 20, 0.98)',
                border: '2px solid rgba(200, 50, 50, 0.25)',
                borderRadius: '14px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 20px rgba(200,50,50,0.1)',
              }}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <h2
                  className="text-xl uppercase"
                  style={{
                    fontFamily: "'Permanent Marker', cursive",
                    color: '#C83232',
                    textShadow: '1px 1px 0 rgba(0,0,0,0.5)',
                  }}
                >
                  New Card
                </h2>
                <button onClick={() => setIsOpen(false)} className="opacity-40 hover:opacity-100 transition-opacity">
                  <X size={18} style={{ color: '#a09888' }} />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-1.5 stencil-text" style={{ color: '#8a8278' }}>
                    TITLE
                  </label>
                  <input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="SIGNAL PROTOCOL" />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider mb-1.5 stencil-text" style={{ color: '#8a8278' }}>
                    VIDEO EMBED URL
                  </label>
                  <input style={inputStyle} value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://youtube.com/embed/..." />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider mb-1.5 stencil-text" style={{ color: '#8a8278' }}>
                    LINK URL
                  </label>
                  <input style={inputStyle} value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://signal.org" />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider mb-1.5 stencil-text" style={{ color: '#8a8278' }}>
                    LINK LABEL
                  </label>
                  <input style={inputStyle} value={linkLabel} onChange={(e) => setLinkLabel(e.target.value)} placeholder="GET SIGNAL" />
                </div>

                {/* Color picker */}
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2 stencil-text" style={{ color: '#8a8278' }}>
                    ACCENT COLOR
                  </label>
                  <div className="flex gap-2">
                    {colorOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setNeonColor(opt.value)}
                        className="flex-1 py-2 text-[10px] uppercase tracking-wider transition-all"
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          letterSpacing: '0.1em',
                          color: opt.color,
                          border: `2px solid ${neonColor === opt.value ? opt.color : 'rgba(80,75,65,0.2)'}`,
                          borderRadius: '8px',
                          background: neonColor === opt.value ? `${opt.color}15` : 'transparent',
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size picker */}
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2 stencil-text" style={{ color: '#8a8278' }}>
                    CARD SIZE
                  </label>
                  <div className="flex gap-2">
                    {(['small', 'wide', 'tall', 'large'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setCardSize(s)}
                        className="flex-1 py-2 text-[10px] uppercase tracking-wider transition-all"
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          letterSpacing: '0.1em',
                          color: cardSize === s ? '#e8e0d4' : '#5a5550',
                          border: `2px solid ${cardSize === s ? 'rgba(232,224,212,0.3)' : 'rgba(80,75,65,0.2)'}`,
                          borderRadius: '8px',
                          background: cardSize === s ? 'rgba(232,224,212,0.05)' : 'transparent',
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
                  className="w-full py-3 mt-2 text-sm uppercase font-bold"
                  style={{
                    fontFamily: "'Permanent Marker', cursive",
                    color: '#e8e0d4',
                    border: '2px solid rgba(200, 50, 50, 0.4)',
                    borderRadius: '10px',
                    background: 'rgba(200, 50, 50, 0.12)',
                    letterSpacing: '0.1em',
                  }}
                  whileHover={{
                    boxShadow: '0 0 20px rgba(200, 50, 50, 0.2)',
                    borderColor: 'rgba(200, 50, 50, 0.6)',
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
