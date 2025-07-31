import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [particles, setParticles] = useState<{ x: number; y: number; id: number }[]>([]);
  const [hidden, setHidden] = useState(false);
  
  useEffect(() => {
    const addParticle = (x: number, y: number) => {
      const id = Date.now();
      setParticles((prev) => [...prev, { x, y, id }]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((particle) => particle.id !== id));
      }, 500);
    };

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (Math.random() > 0.92) {
        addParticle(e.clientX, e.clientY);
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none z-50 w-1 h-1 rounded-full bg-neon-blue"
          initial={{ opacity: 0.8, x: particle.x, y: particle.y }}
          animate={{ 
            opacity: 0,
            x: particle.x + (Math.random() * 100 - 50),
            y: particle.y + (Math.random() * 100 - 50),
          }}
          transition={{ duration: 0.5 }}
        />
      ))}

      <motion.div
        className={`fixed pointer-events-none z-50 w-6 h-6 rounded-full border border-neon-blue mix-blend-screen ${hidden ? 'opacity-0' : 'opacity-100'}`}
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          scale: clicked ? 0.8 : 1,
          boxShadow: clicked ? '0 0 10px rgba(0, 240, 255, 0.8)' : '0 0 5px rgba(0, 240, 255, 0.5)',
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
          mass: 0.5,
        }}
      />
      <motion.div
        className={`fixed pointer-events-none z-50 w-2 h-2 rounded-full bg-neon-blue mix-blend-screen ${hidden ? 'opacity-0' : 'opacity-100'}`}
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: clicked ? 1.2 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 10,
          stiffness: 400,
          mass: 0.1,
        }}
      />
    </>
  );
};

export default Cursor;