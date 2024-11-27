import React from 'react';
import Layout from './components/Layout';
import { AppProvider } from './contexts/AppContext';
import AppContent from './components/AppContent';

function App() {
  return (
    <AppProvider>
      <Layout>
        <AppContent />
      </Layout>
    </AppProvider>
  );
}

export default App;