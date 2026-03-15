import { motion } from 'framer-motion';
import { Link } from 'wouter';
import GlitchText from '@/components/GlitchText';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: 'rgba(20, 18, 15, 1)' }}
    >
      <GlitchText
        text="404"
        className="text-6xl md:text-8xl mb-4"
        color="#C83232"
        glowColor="rgba(200, 50, 50, 0.3)"
      />

      <motion.p
        className="text-sm tracking-widest uppercase mb-8 stencil-text"
        style={{ color: '#8a8278' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        THIS WALL IS BLANK
      </motion.p>

      <Link href="/">
        <motion.span
          className="px-6 py-3 text-xs uppercase tracking-wider inline-block stencil-text"
          style={{
            color: '#e8e0d4',
            border: '2px solid rgba(200, 50, 50, 0.3)',
            borderRadius: '8px',
            background: 'rgba(200, 50, 50, 0.08)',
          }}
          whileHover={{
            boxShadow: '0 0 15px rgba(200, 50, 50, 0.2)',
            borderColor: 'rgba(200, 50, 50, 0.6)',
          }}
        >
          BACK TO THE WALL
        </motion.span>
      </Link>
    </div>
  );
}
