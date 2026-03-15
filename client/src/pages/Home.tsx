/*
 * DESIGN: Banksy Street Art — Raw Stencil Rebellion
 * Home Page: Concrete wall background, stencil art accents,
 * paint drip effects, raw anti-corporate messaging.
 * Bento grid with video/link flip cards.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import RainEffect from '@/components/RainEffect';
import GlitchText from '@/components/GlitchText';
import NeonBorder from '@/components/NeonBorder';
import PrivacyManifesto from '@/components/PrivacyManifesto';
import BentoGrid from '@/components/BentoGrid';
import AddCardModal from '@/components/AddCardModal';
import { defaultCards } from '@/data/cards';
import type { BentoCardData } from '@/components/BentoCard';
import { Skull, X, ShieldOff, Flame } from 'lucide-react';

// Banksy-style generated assets
const WALL_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663141001476/Jp7xqxtMw5DRGk9u4ExkGL/banksy-wall-bg-Rsnm8raa3CGob2pigimTKE.webp';
const RAT_STENCIL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663141001476/Jp7xqxtMw5DRGk9u4ExkGL/banksy-rat-stencil-Qs4ad5wzPQmY6a6aLyUyo5.webp';
const GIRL_BALLOON = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663141001476/Jp7xqxtMw5DRGk9u4ExkGL/banksy-girl-balloon-72yHC3f5mGdQwmDZ2ZQPnx.webp';
const MASKED_REBEL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663141001476/Jp7xqxtMw5DRGk9u4ExkGL/banksy-masked-rebel-Zh3k83zV3vReduPAcB8mhf.webp';
const PAINT_DRIP = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663141001476/Jp7xqxtMw5DRGk9u4ExkGL/paint-drip-border-RdK29dN5869TxpyFf5sFVr.webp';

export default function Home() {
  const [cards, setCards] = useState<BentoCardData[]>(defaultCards);

  const handleAddCard = (newCard: BentoCardData) => {
    setCards(prev => [...prev, newCard]);
  };

  return (
    <div className="min-h-screen relative overflow-hidden concrete-grain">
      <ThemeSwitcher />
      {/* Paint drip background effect */}
      <RainEffect />

      {/* Concrete wall background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${WALL_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.35,
        }}
      />

      {/* Dark overlay with warm tint */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, rgba(20,18,15,0.5) 0%, rgba(20,18,15,0.85) 35%, rgba(20,18,15,0.95) 100%)',
        }}
      />

      {/* ===== HEADER ===== */}
      <header className="relative z-10 pt-5 pb-2">
        <div className="container flex items-center justify-between mb-4">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={RAT_STENCIL}
              alt="Rebel Bento"
              className="w-10 h-10 md:w-12 md:h-12"
              style={{ filter: 'brightness(0.9) contrast(1.2)' }}
              animate={{ rotate: [0, -1, 1, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span
              className="text-xs md:text-sm tracking-[0.2em] uppercase stencil-text"
              style={{
                color: '#C83232',
                textShadow: '1px 1px 0 rgba(0,0,0,0.5)',
              }}
            >
              REBEL//BENTO
            </span>
          </motion.div>

          {/* Status badge */}
          <motion.div
            className="flex items-center gap-2 text-[10px] md:text-xs tracking-[0.15em] uppercase stencil-text"
            style={{ color: '#8a8278' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.6, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#C83232', boxShadow: '0 0 4px rgba(200,50,50,0.5)' }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            ZERO TRACKING
          </motion.div>
        </div>

        {/* Hero */}
        <div className="container relative">
          {/* Floating stencil art */}
          <motion.img
            src={GIRL_BALLOON}
            alt=""
            className="absolute -top-4 -left-8 w-20 md:w-32 opacity-[0.08] pointer-events-none select-none"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.img
            src={MASKED_REBEL}
            alt=""
            className="absolute -top-6 -right-4 w-16 md:w-28 opacity-[0.06] pointer-events-none select-none"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="text-center py-6 md:py-10">
            <GlitchText
              text="REBEL BENTO"
              className="text-4xl md:text-6xl lg:text-7xl mb-3"
              color="#C83232"
              glowColor="rgba(200, 50, 50, 0.3)"
            />

            <motion.p
              className="text-xs md:text-sm tracking-[0.25em] uppercase mb-2 stencil-text"
              style={{
                color: '#e8e0d4',
                textShadow: '1px 1px 0 rgba(0,0,0,0.4)',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              YOUR LINKS. YOUR RULES. YOUR WALL.
            </motion.p>

            <motion.p
              className="text-[11px] tracking-wider uppercase max-w-md mx-auto leading-relaxed typewriter-text"
              style={{ color: 'rgba(138, 130, 120, 0.5)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              No data collection. No corporate surveillance.
              <br />
              Just your content, sprayed on your wall.
            </motion.p>

            {/* Paint drip divider */}
            <motion.div
              className="mt-5 mx-auto overflow-hidden"
              style={{ maxWidth: '300px', height: '20px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.7 }}
            >
              <img
                src={PAINT_DRIP}
                alt=""
                className="w-full h-full object-cover"
                style={{ filter: 'invert(0.15) sepia(0.3) hue-rotate(340deg) brightness(0.4)' }}
              />
            </motion.div>
          </div>
        </div>
      </header>

      {/* ===== MANIFESTO ===== */}
      <section className="relative z-10 mb-6">
        <NeonBorder color="red" className="container max-w-2xl mx-auto">
          <div className="py-1">
            <PrivacyManifesto />
          </div>
        </NeonBorder>
      </section>

      {/* ===== BENTO GRID ===== */}
      <main className="relative z-10 mb-12">
        <div className="container">
          {/* Section header */}
          <motion.div
            className="flex items-center justify-between mb-5 px-1"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <Flame size={14} style={{ color: '#C83232' }} />
              <span
                className="text-[10px] md:text-xs tracking-[0.15em] uppercase stencil-text"
                style={{
                  color: '#8a8278',
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
                src={RAT_STENCIL}
                alt=""
                className="w-5 h-5"
                style={{ filter: 'brightness(0.7)' }}
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <span
                className="text-[10px] tracking-[0.15em] uppercase stencil-text"
                style={{ color: 'rgba(138, 130, 120, 0.3)' }}
              >
                REBEL//BENTO
              </span>
            </div>

            <div className="flex items-center gap-3 flex-wrap justify-center">
              {[
                { icon: X, label: 'NO COOKIES', color: '#C83232' },
                { icon: Skull, label: 'KILL THE ALGORITHM', color: '#8a8278' },
                { icon: ShieldOff, label: 'NO SURVEILLANCE', color: '#5a5550' },
              ].map(({ icon: Icon, label, color }) => (
                <motion.div
                  key={label}
                  className="flex items-center gap-1.5 px-2.5 py-1"
                  style={{
                    border: `1px solid ${color}30`,
                    borderRadius: '6px',
                    background: `${color}08`,
                  }}
                  whileHover={{
                    borderColor: `${color}60`,
                    boxShadow: `0 0 8px ${color}20`,
                  }}
                >
                  <Icon size={10} style={{ color }} />
                  <span
                    className="text-[9px] tracking-[0.12em] uppercase stencil-text"
                    style={{ color }}
                  >
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>

            <span
              className="text-[9px] tracking-wider typewriter-text"
              style={{ color: 'rgba(138, 130, 120, 0.2)' }}
            >
              BUILT BY REBELS. FOR REBELS.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
