import React, { useRef, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}

const Fireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { speed, brightness, isReducedMotion } = useAppContext();
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    let animationId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    const createFirework = (x: number, y: number) => {
      const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];
      const particleCount = 50;

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = (speed / 10) + Math.random() * 2;
        
        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const animate = () => {
      if (isReducedMotion) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.1; // gravity
        particle.alpha -= 0.01;

        if (particle.alpha > 0) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = particle.color.replace(')', `, ${particle.alpha * (brightness / 100)})`);
          ctx.fill();
          return true;
        }
        return false;
      });

      if (Math.random() < 0.05) {
        createFirework(
          Math.random() * canvas.width,
          canvas.height - Math.random() * canvas.height * 0.3
        );
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);
    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      createFirework(
        e.clientX - rect.left,
        e.clientY - rect.top
      );
    });

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [speed, brightness, isReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full bg-black cursor-pointer"
    />
  );
};

export default Fireworks;