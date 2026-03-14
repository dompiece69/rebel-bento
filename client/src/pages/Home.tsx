/*
 * DESIGN: Neon Vandal — Cyberpunk Graffiti Noir
 * Home Page: Full rebellious layout with:
 * - Rain effect background
 * - Graffiti hero section with generated art
 * - Privacy manifesto
 * - Bento grid with video/link flip cards
 * - Add card functionality
 * - Anti-corporate footer
 * Scan lines overlay on everything.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import RainEffect from '@/components/RainEffect';
import GlitchText from '@/components/GlitchText';
import NeonBorder from '@/components/NeonBorder';
import PrivacyManifesto from '@/components/PrivacyManifesto';
import BentoGrid from '@/components/BentoGrid';
import AddCardModal from '@/components/AddCardModal';
import { defaultCards } from '@/data/cards';
import type { BentoCardData } from '@/components/BentoCard';
import { Skull, Zap, X, ShieldOff } from 'lucide-react';

// Asset URLs from generated images
const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663141001476/Jp7xqxtMw5DRGk9u4ExkGL/hero-bg-UuhEiuKxKLyHpKpg6HHxtF.webp';
const GRAFFITI_TAG_1 = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663141001476/Jp7xqxtMw5DRGk9u4ExkGL/graffiti-tag-1-hjwoRfVbgdhRa7XMWB2Vqb.webp';
const GRAFFITI_TAG_2 = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663141001476/Jp7xqxtMw5DRGk9u4ExkGL/graffiti-tag-2-kTRDsZuBLfsHfgg2LWdh45.webp';
const NEON_SKULL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663141001476/Jp7xqxtMw5DRGk9u4ExkGL/neon-skull-kFs9poWTcPbVULMCVPoLSi.webp';

export default function Home() {
  const [cards, setCards] = useState<BentoCardData[]>(defaultCards);

  const handleAddCard = (newCard: BentoCardData) => {
    setCards(prev => [...prev, newCard]);
  };

  return (
    <div className="min-h-screen relative overflow-hidden scanlines">
      {/* Rain effect background */}
      <RainEffect />

      {/* Fixed background image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.25,
        }}
      />

      {/* Dark overlay */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, rgba(8,8,12,0.6) 0%, rgba(8,8,12,0.88) 40%, rgba(8,8,12,0.95) 100%)',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* ===== HEADER / HERO ===== */}
      <header className="relative z-10 pt-6 pb-2">
        {/* Top bar */}
        <div className="container flex items-center justify-between mb-6">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src={NEON_SKULL}
              alt="Rebel Bento"
              className="w-9 h-9 md:w-11 md:h-11"
              style={{ filter: 'drop-shadow(0 0 8px rgba(255, 45, 123, 0.5))' }}
              animate={{ rotate: [0, -2, 2, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span
              className="text-xs md:text-sm tracking-[0.25em] uppercase"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                color: '#FF2D7B',
                textShadow: '0 0 10px rgba(255, 45, 123, 0.5)',
              }}
            >
              REBEL//BENTO
            </span>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 text-[10px] md:text-xs tracking-[0.2em] uppercase"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              color: '#00FF9F',
            }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 0.7, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#00FF9F', boxShadow: '0 0 6px rgba(0,255,159,0.6)' }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            ZERO TRACKING
          </motion.div>
        </div>

        {/* Hero content */}
        <div className="container relative">
          {/* Floating graffiti tags */}
          <motion.img
            src={GRAFFITI_TAG_1}
            alt=""
            className="absolute -top-6 -left-10 w-28 md:w-44 opacity-15 pointer-events-none select-none"
            style={{ filter: 'blur(0.3px)' }}
            animate={{ y: [0, -6, 0], rotate: [-2, 0.5, -2] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.img
            src={GRAFFITI_TAG_2}
            alt=""
            className="absolute -top-10 -right-6 w-24 md:w-36 opacity-12 pointer-events-none select-none"
            style={{ filter: 'blur(0.3px)' }}
            animate={{ y: [0, 5, 0], rotate: [1, -1.5, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="text-center py-6 md:py-10">
            <GlitchText
              text="REBEL BENTO"
              className="text-3xl md:text-5xl lg:text-6xl mb-3"
              color="#FF2D7B"
              glowColor="rgba(255, 45, 123, 0.5)"
            />

            <motion.p
              className="text-xs md:text-sm tracking-[0.3em] uppercase mb-2"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                color: '#00D4FF',
                textShadow: '0 0 10px rgba(0, 212, 255, 0.4)',
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              YOUR LINKS. YOUR RULES.
            </motion.p>

            <motion.p
              className="text-[11px] tracking-wider uppercase max-w-lg mx-auto leading-relaxed"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: 'rgba(232, 232, 232, 0.35)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              No data collection. No corporate surveillance. No algorithmic manipulation.
              <br />
              Just your content, on your terms.
            </motion.p>

            {/* Decorative line */}
            <motion.div
              className="mt-5 mx-auto"
              style={{
                width: '100px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #FF2D7B, #00FF9F, #00D4FF, transparent)',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </div>
        </div>
      </header>

      {/* ===== PRIVACY MANIFESTO ===== */}
      <section className="relative z-10 mb-6">
        <NeonBorder color="multi" className="container max-w-2xl mx-auto">
          <div className="py-1">
            <PrivacyManifesto />
          </div>
        </NeonBorder>
      </section>

      {/* ===== BENTO GRID ===== */}
      <main className="relative z-10 mb-12">
        <div className="container">
          {/* Section header with add button */}
          <motion.div
            className="flex items-center justify-between mb-5 px-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-2">
              <Zap size={14} style={{ color: '#FFB800' }} />
              <span
                className="text-[10px] md:text-xs tracking-[0.2em] uppercase"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: '#FFB800',
                  textShadow: '0 0 6px rgba(255, 184, 0, 0.3)',
                }}
              >
                FLIP CARDS // DRAG CORNERS TO RESIZE
              </span>
            </div>

            <AddCardModal onAdd={handleAddCard} />
          </motion.div>

          <BentoGrid cards={cards} />
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 border-t border-white/[0.04] py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <motion.img
                src={NEON_SKULL}
                alt=""
                className="w-5 h-5"
                style={{ filter: 'drop-shadow(0 0 4px rgba(255, 45, 123, 0.3))' }}
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: 'rgba(232, 232, 232, 0.25)',
                }}
              >
                REBEL//BENTO
              </span>
            </div>

            <div className="flex items-center gap-3 flex-wrap justify-center">
              <motion.div
                className="flex items-center gap-1.5 px-2.5 py-1"
                style={{
                  border: '1px solid rgba(255, 45, 123, 0.15)',
                  borderRadius: '2px',
                  background: 'rgba(255, 45, 123, 0.03)',
                }}
                whileHover={{
                  borderColor: 'rgba(255, 45, 123, 0.4)',
                  boxShadow: '0 0 8px rgba(255, 45, 123, 0.15)',
                }}
              >
                <X size={10} style={{ color: '#FF2D7B' }} />
                <span className="text-[9px] tracking-[0.15em] uppercase" style={{ fontFamily: "'Orbitron', sans-serif", color: '#FF2D7B' }}>
                  NO COOKIES
                </span>
              </motion.div>

              <motion.div
                className="flex items-center gap-1.5 px-2.5 py-1"
                style={{
                  border: '1px solid rgba(0, 255, 159, 0.15)',
                  borderRadius: '2px',
                  background: 'rgba(0, 255, 159, 0.03)',
                }}
                whileHover={{
                  borderColor: 'rgba(0, 255, 159, 0.4)',
                  boxShadow: '0 0 8px rgba(0, 255, 159, 0.15)',
                }}
              >
                <Skull size={10} style={{ color: '#00FF9F' }} />
                <span className="text-[9px] tracking-[0.15em] uppercase" style={{ fontFamily: "'Orbitron', sans-serif", color: '#00FF9F' }}>
                  KILL THE ALGORITHM
                </span>
              </motion.div>

              <motion.div
                className="flex items-center gap-1.5 px-2.5 py-1"
                style={{
                  border: '1px solid rgba(0, 212, 255, 0.15)',
                  borderRadius: '2px',
                  background: 'rgba(0, 212, 255, 0.03)',
                }}
                whileHover={{
                  borderColor: 'rgba(0, 212, 255, 0.4)',
                  boxShadow: '0 0 8px rgba(0, 212, 255, 0.15)',
                }}
              >
                <ShieldOff size={10} style={{ color: '#00D4FF' }} />
                <span className="text-[9px] tracking-[0.15em] uppercase" style={{ fontFamily: "'Orbitron', sans-serif", color: '#00D4FF' }}>
                  NO SURVEILLANCE
                </span>
              </motion.div>
            </div>

            <span
              className="text-[9px] tracking-wider"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: 'rgba(232, 232, 232, 0.15)',
              }}
            >
              BUILT BY REBELS. FOR REBELS.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
