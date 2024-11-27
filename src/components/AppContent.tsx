import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import FlowingWater from './apps/FlowingWater';
import Kaleidoscope from './apps/Kaleidoscope';
import Fireworks from './apps/Fireworks';
import AuroraShow from './apps/AuroraShow';
import GlowTrails from './apps/GlowTrails';
import StainedGlass from './apps/StainedGlass';
import GalaxyViewer from './apps/GalaxyViewer';

const AppContent: React.FC = () => {
  const { selectedApp } = useAppContext();

  const renderApp = () => {
    switch (selectedApp) {
      case 'water':
        return <FlowingWater />;
      case 'kaleidoscope':
        return <Kaleidoscope />;
      case 'fireworks':
        return <Fireworks />;
      case 'aurora':
        return <AuroraShow />;
      case 'glow':
        return <GlowTrails />;
      case 'glass':
        return <StainedGlass />;
      case 'galaxy':
        return <GalaxyViewer />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full">
      {renderApp()}
    </div>
  );
};

export default AppContent;