import React from 'react';
import Dashboard from './sections/Dashboard';
import GeneratePaper from './sections/GeneratePaper';
import Templates from './sections/Templates';
import ResearchAssistant from './sections/ResearchAssistant';
import MyPapers from './sections/MyPapers';
import Citations from './sections/Citations';
import Analytics from './sections/Analytics';
import Settings from './sections/Settings';

const MainContent = ({ activeSection, sidebarOpen }) => {
  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'generate':
        return <GeneratePaper />;
      case 'templates':
        return <Templates />;
      case 'research':
        return <ResearchAssistant />;
      case 'papers':
        return <MyPapers />;
      case 'citations':
        return <Citations />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <main className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}`}>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderSection()}
        </div>
      </div>
    </main>
  );
};

export default MainContent;
