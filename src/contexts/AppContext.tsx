import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  selectedApp: string;
  setSelectedApp: (id: string) => void;
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

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedApp, setSelectedApp] = useState('water');
  const [speed, setSpeed] = useState(50);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  return (
    <AppContext.Provider
      value={{
        selectedApp,
        setSelectedApp,
        speed,
        setSpeed,
        brightness,
        setBrightness,
        contrast,
        setContrast,
        isHighContrast,
        setIsHighContrast,
        isReducedMotion,
        setIsReducedMotion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};