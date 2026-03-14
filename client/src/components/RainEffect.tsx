/*
 * DESIGN: Neon Vandal — Cyberpunk Graffiti Noir
 * RainEffect: Animated rain/particle effect for the background.
 * Subtle neon-colored streaks falling down the screen.
 */

import { useEffect, useRef } from 'react';

export default function RainEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let drops: Array<{
      x: number;
      y: number;
      speed: number;
      length: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = [
      'rgba(255, 45, 123, ',   // pink
      'rgba(0, 255, 159, ',    // green
      'rgba(0, 212, 255, ',    // blue
      'rgba(255, 184, 0, ',    // amber
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initDrops = () => {
      drops = [];
      const count = Math.floor(window.innerWidth / 15);
      for (let i = 0; i < count; i++) {
        drops.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: 1 + Math.random() * 3,
          length: 15 + Math.random() * 30,
          opacity: 0.05 + Math.random() * 0.15,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.strokeStyle = `${drop.color}${drop.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    initDrops();
    animate();

    window.addEventListener('resize', () => {
      resize();
      initDrops();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
