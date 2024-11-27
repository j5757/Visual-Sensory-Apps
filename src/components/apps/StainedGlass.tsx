import React, { useRef, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';

interface Cell {
  x: number;
  y: number;
  color: string;
  size: number;
}

const StainedGlass: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellsRef = useRef<Cell[]>([]);
  const { brightness, isReducedMotion } = useAppContext();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createCells();
    };

    const createCells = () => {
      const cellSize = 100;
      const cols = Math.ceil(canvas.width / cellSize);
      const rows = Math.ceil(canvas.height / cellSize);
      
      cellsRef.current = [];
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          cellsRef.current.push({
            x: i * cellSize,
            y: j * cellSize,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`,
            size: cellSize,
          });
        }
      }
    };

    const drawCell = (cell: Cell) => {
      ctx.beginPath();
      ctx.rect(cell.x, cell.y, cell.size, cell.size);
      ctx.fillStyle = cell.color;
      ctx.globalAlpha = brightness / 100;
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const animate = () => {
      if (isReducedMotion) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cellsRef.current.forEach(drawCell);
      
      animationId = requestAnimationFrame(animate);
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      const clickX = (e.clientX - rect.left) * scaleX;
      const clickY = (e.clientY - rect.top) * scaleY;

      const clickedCell = cellsRef.current.find(cell => 
        clickX >= cell.x && clickX < cell.x + cell.size &&
        clickY >= cell.y && clickY < cell.y + cell.size
      );

      if (clickedCell) {
        clickedCell.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
      }
    };

    resize();
    animate();

    window.addEventListener('resize', resize);
    canvas.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationId);
    };
  }, [brightness, isReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full bg-black cursor-pointer"
    />
  );
};

export default StainedGlass;