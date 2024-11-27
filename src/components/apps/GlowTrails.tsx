import React, { useRef, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';

interface Point {
  x: number;
  y: number;
  age: number;
}

const GlowTrails: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const { speed, brightness, isReducedMotion } = useAppContext();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      if (isReducedMotion) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add new point
      if (mouseX !== 0 && mouseY !== 0) {
        pointsRef.current.push({ x: mouseX, y: mouseY, age: 0 });
      }

      // Update and draw points
      pointsRef.current = pointsRef.current
        .filter(point => point.age < 50)
        .map(point => {
          const alpha = 1 - point.age / 50;
          const size = 10 * (1 - point.age / 50);

          ctx.beginPath();
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${(point.age * 5) % 360}, 100%, 50%, ${alpha * (brightness / 100)})`;
          ctx.fill();

          return { ...point, age: point.age + (speed / 50) };
        });

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };

    resize();
    animate();

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [speed, brightness, isReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full bg-black cursor-none"
    />
  );
};

export default GlowTrails;