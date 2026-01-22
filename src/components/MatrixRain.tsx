import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MatrixRainProps {
  active: boolean;
  duration?: number;
}

const MatrixRain: React.FC<MatrixRainProps> = ({ active, duration = 10000 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (active) {
      setShouldRender(true);
    }
  }, [active]);

  useEffect(() => {
    if (!shouldRender) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [shouldRender, duration]);

  const handleAnimationComplete = () => {
    if (!active) {
      setShouldRender(false);
    }
  };

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.canvas
          ref={canvasRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          onAnimationComplete={handleAnimationComplete}
          className="fixed inset-0 z-50 pointer-events-none"
          style={{ mixBlendMode: 'screen' }}
        />
      )}
    </AnimatePresence>
  );
};

export default MatrixRain;
