import React, { useRef, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const Kaleidoscope: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { speed, brightness } = useAppContext();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    let animationId: number;
    let angle = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawKaleidoscope = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.8;

      for (let i = 0; i < 12; i++) {
        const rotation = (i * Math.PI * 2) / 12 + angle;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);

        // Create multiple color layers
        for (let j = 0; j < 3; j++) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(radius * Math.cos(angle + j), radius * Math.sin(angle + j));
          
          const gradient = ctx.createLinearGradient(0, 0, radius, 0);
          const hue1 = (angle * 180 / Math.PI + i * 30 + j * 120) % 360;
          const hue2 = (hue1 + 60) % 360;
          
          gradient.addColorStop(0, `hsla(${hue1}, 100%, 50%, ${brightness / 100})`);
          gradient.addColorStop(1, `hsla(${hue2}, 100%, 50%, ${brightness / 100})`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 4;
          ctx.stroke();
        }
        
        ctx.restore();
      }

      angle += (speed / 5000);
      animationId = requestAnimationFrame(drawKaleidoscope);
    };

    resize();
    drawKaleidoscope();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [speed, brightness]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full bg-black"
    />
  );
};

export default Kaleidoscope;