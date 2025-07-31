import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Re-initialize particles when canvas is resized
      initializeParticles();
    };
    
    const initializeParticles = () => {
      particles.current = [];
      const numberOfParticles = Math.floor(window.innerWidth * window.innerHeight / 10000);
      
      for (let i = 0; i < numberOfParticles; i++) {
        const colors = ['#00f0ff', '#b026ff', '#39ff14', '#ff2ded'];
        
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach(particle => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        else if (particle.x < 0) particle.x = canvas.width;
        
        if (particle.y > canvas.height) particle.y = 0;
        else if (particle.y < 0) particle.y = canvas.height;
      });
      
      // Draw connecting lines between nearby particles
      drawConnectionLines();
      
      animationFrameId.current = requestAnimationFrame(drawParticles);
    };
    
    const drawConnectionLines = () => {
      const maxDistance = 150; // Maximum distance for drawing connections
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 0.3;
      
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x;
          const dy = particles.current[i].y - particles.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            // Set opacity based on distance
            ctx.globalAlpha = 1 - (distance / maxDistance);
            ctx.beginPath();
            ctx.moveTo(particles.current[i].x, particles.current[i].y);
            ctx.lineTo(particles.current[j].x, particles.current[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    };
    
    // Initial setup
    resizeCanvas();
    drawParticles();
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 -z-10" />;
};

export default ParticleBackground;