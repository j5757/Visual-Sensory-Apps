import React from 'react';
import { 
  Droplets, 
  Compass, 
  Sparkles, 
  Waves, 
  MousePointer2, 
  Square, 
  Globe
} from 'lucide-react';
import { AppConfig } from '../types';
import { useAppContext } from '../contexts/AppContext';

const apps: AppConfig[] = [
  { id: 'water', name: 'Flowing Water', description: 'Calming water animations', icon: 'Droplets' },
  { id: 'kaleidoscope', name: 'Kaleidoscope', description: 'Dynamic patterns', icon: 'Compass' },
  { id: 'fireworks', name: 'Fireworks', description: 'Vibrant displays', icon: 'Sparkles' },
  { id: 'aurora', name: 'Aurora Show', description: 'Northern lights', icon: 'Waves' },
  { id: 'glow', name: 'Glow Trails', description: 'Interactive trails', icon: 'MousePointer2' },
  { id: 'glass', name: 'Stained Glass', description: 'Light refractions', icon: 'Square' },
  { id: 'galaxy', name: 'Galaxy Viewer', description: 'Space exploration', icon: 'Globe' }
];

const iconMap = {
  Droplets,
  Compass,
  Sparkles,
  Waves,
  MousePointer2,
  Square,
  Globe
};

const AppSelector: React.FC = () => {
  const { selectedApp, setSelectedApp } = useAppContext();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Visual Sensory Apps</h2>
      <div className="space-y-2">
        {apps.map((app) => {
          const Icon = iconMap[app.icon as keyof typeof iconMap];
          return (
            <button
              key={app.id}
              onClick={() => setSelectedApp(app.id)}
              className={`w-full p-3 rounded-lg flex items-center space-x-3 transition-colors ${
                selectedApp === app.id
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">{app.name}</div>
                <div className="text-sm opacity-75">{app.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AppSelector;