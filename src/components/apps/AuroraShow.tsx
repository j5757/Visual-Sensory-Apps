import React, { useRef, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const AuroraShow: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { speed, brightness, isReducedMotion } = useAppContext();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawAurora = () => {
      if (isReducedMotion) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, `rgba(0, 32, 64, ${brightness / 100})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 3; i++) {
        const yOffset = (canvas.height / 3) * i;
        
        ctx.beginPath();
        ctx.moveTo(0, yOffset);
        
        for (let x = 0; x < canvas.width; x++) {
          const y = yOffset + 
            Math.sin(x * 0.01 + time + i) * 50 +
            Math.sin(x * 0.02 - time * 2 + i) * 20;
          
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `hsla(${(i * 40 + time * 10) % 360}, 100%, 70%, ${brightness / 200})`;
        ctx.lineWidth = 30;
        ctx.stroke();
      }

      time += speed / 1000;
      animationId = requestAnimationFrame(drawAurora);
    };

    resize();
    drawAurora();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [speed, brightness, isReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full bg-black"
    />
  );
};

export default AuroraShow;