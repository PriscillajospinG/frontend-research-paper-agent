import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          sidebarOpen={sidebarOpen}
        />
        
        <MainContent 
          activeSection={activeSection}
          sidebarOpen={sidebarOpen}
        />
      </div>
      
      <Footer />
    </div>
  );
}

export default App;