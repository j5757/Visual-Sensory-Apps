import React, { useRef, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const FlowingWater: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { speed, brightness, isReducedMotion } = useAppContext();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    let animationId: number;
    let particles: Array<{ x: number; y: number; speed: number }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: (Math.random() + 0.2) * (speed / 50),
      }));
    };

    const animate = () => {
      if (isReducedMotion) return;
      
      ctx.fillStyle = `rgba(0, 0, 0, ${0.1 * (brightness / 100)})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.fillStyle = `rgba(64, 164, 255, ${brightness / 100})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();

        particle.y += particle.speed;
        if (particle.y > canvas.height) {
          particle.y = 0;
          particle.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [speed, brightness, isReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full bg-blue-900"
    />
  );
};

export default FlowingWater;