/*
 * DESIGN: Banksy Street Art — Raw Stencil Rebellion
 * DripsEffect: Subtle paint drips falling down the screen.
 * Muted, slow, organic — like paint running down a wall.
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
    let drips: Array<{
      x: number;
      y: number;
      speed: number;
      length: number;
      opacity: number;
      width: number;
      color: string;
    }> = [];

    const colors = [
      'rgba(200, 50, 50, ',   // rebel red
      'rgba(60, 55, 48, ',    // dark concrete
      'rgba(100, 95, 85, ',   // grey
      'rgba(200, 50, 50, ',   // red again (weighted)
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initDrips = () => {
      drips = [];
      const count = Math.floor(window.innerWidth / 40); // fewer, thicker drips
      for (let i = 0; i < count; i++) {
        drips.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * -1,
          speed: 0.3 + Math.random() * 0.8, // slower
          length: 30 + Math.random() * 80, // longer drips
          opacity: 0.02 + Math.random() * 0.06, // very subtle
          width: 1 + Math.random() * 2.5, // variable width
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drips.forEach((drip) => {
        // Draw drip with rounded end
        const gradient = ctx.createLinearGradient(drip.x, drip.y, drip.x, drip.y + drip.length);
        gradient.addColorStop(0, `${drip.color}0)`);
        gradient.addColorStop(0.3, `${drip.color}${drip.opacity})`);
        gradient.addColorStop(0.8, `${drip.color}${drip.opacity * 0.8})`);
        gradient.addColorStop(1, `${drip.color}0)`);

        ctx.beginPath();
        ctx.moveTo(drip.x, drip.y);
        ctx.lineTo(drip.x, drip.y + drip.length);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = drip.width;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Bulge at bottom of drip
        ctx.beginPath();
        ctx.arc(drip.x, drip.y + drip.length, drip.width * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `${drip.color}${drip.opacity * 0.5})`;
        ctx.fill();

        drip.y += drip.speed;
        if (drip.y > canvas.height + drip.length) {
          drip.y = -drip.length - Math.random() * 200;
          drip.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    initDrips();
    animate();

    window.addEventListener('resize', () => {
      resize();
      initDrips();
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
      style={{ opacity: 0.5 }}
    />
  );
}
