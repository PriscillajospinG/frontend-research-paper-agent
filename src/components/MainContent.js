import React from 'react';
import Dashboard from './sections/Dashboard';
import PaperGenerator from './PaperGenerator';

const MainContent = ({ activeSection, sidebarOpen }) => {
  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'generate':
        return <PaperGenerator />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <main className="flex-1 transition-all duration-300 ease-in-out">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderSection()}
        </div>
      </div>
    </main>
  );
};

export default MainContent;
