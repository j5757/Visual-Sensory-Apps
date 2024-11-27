export interface AppConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ControlsProps {
  speed: number;
  setSpeed: (speed: number) => void;
  brightness: number;
  setBrightness: (brightness: number) => void;
  contrast: number;
  setContrast: (contrast: number) => void;
  isHighContrast: boolean;
  setIsHighContrast: (isHighContrast: boolean) => void;
  isReducedMotion: boolean;
  setIsReducedMotion: (isReducedMotion: boolean) => void;
}

export interface TimerProps {
  duration: number;
  setDuration: (duration: number) => void;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
}