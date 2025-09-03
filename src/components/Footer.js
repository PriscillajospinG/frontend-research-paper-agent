import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-500">
              © 2025 IEEE Paper Generator. Powered by battle-ax.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Privacy
            </button>
            <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Terms
            </button>
            <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
