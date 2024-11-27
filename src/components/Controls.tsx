import React from 'react';
import { Sun, Contrast, Wind } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

const Controls: React.FC = () => {
  const {
    speed,
    setSpeed,
    brightness,
    setBrightness,
    contrast,
    setContrast,
    isHighContrast,
    setIsHighContrast,
  } = useAppContext();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Controls</h2>
      
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <Wind className="w-4 h-4" />
          <span>Speed</span>
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <Sun className="w-4 h-4" />
          <span>Brightness</span>
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <Contrast className="w-4 h-4" />
          <span>Contrast</span>
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={contrast}
          onChange={(e) => setContrast(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isHighContrast}
            onChange={(e) => setIsHighContrast(e.target.checked)}
            className="rounded"
          />
          <span>High Contrast Mode</span>
        </label>
      </div>
    </div>
  );
};

export default Controls;