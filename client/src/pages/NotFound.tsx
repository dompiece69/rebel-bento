import { motion } from 'framer-motion';
import { Link } from 'wouter';
import GlitchText from '@/components/GlitchText';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: 'rgba(8, 8, 12, 1)' }}
    >
      <GlitchText
        text="404"
        className="text-6xl md:text-8xl mb-4"
        color="#FF2D7B"
        glowColor="rgba(255, 45, 123, 0.5)"
      />

      <motion.p
        className="text-sm tracking-[0.3em] uppercase mb-8"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          color: '#00D4FF',
          textShadow: '0 0 10px rgba(0, 212, 255, 0.4)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        SIGNAL LOST
      </motion.p>

      <Link href="/">
        <motion.span
          className="px-6 py-3 text-xs uppercase tracking-[0.2em] inline-block"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            color: '#00FF9F',
            border: '1px solid rgba(0, 255, 159, 0.4)',
            borderRadius: '2px',
            background: 'rgba(0, 255, 159, 0.05)',
          }}
          whileHover={{
            boxShadow: '0 0 20px rgba(0, 255, 159, 0.3)',
            borderColor: 'rgba(0, 255, 159, 0.7)',
          }}
        >
          RETURN TO BASE
        </motion.span>
      </Link>
    </div>
  );
}
