import React from 'react';
import { Menu } from 'lucide-react';
import AppSelector from './AppSelector';
import Controls from './Controls';
import Timer from './Timer';
import { useAppContext } from '../contexts/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { selectedApp } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed top-4 left-4 p-2 hover:bg-gray-700 rounded-lg text-white z-50 transition-opacity duration-300 ${
          selectedApp ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Menu className="w-6 h-6" />
      </button>

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } z-40`}
      >
        <div className="p-4 space-y-4 h-full overflow-y-auto">
          <AppSelector />
          <Controls />
          <Timer />
        </div>
      </aside>

      <main
        className={`transition-all duration-200 ease-in-out h-screen ${
          isSidebarOpen ? 'pl-64' : 'pl-0'
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;