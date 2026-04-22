import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 md:flex-row flex-col">
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <Sidebar 
            isOpen={true} 
            setIsOpen={setMobileSidebarOpen} 
            mobile={true}
            className="!fixed z-50 inset-y-0 left-0 w-80 h-full overflow-y-auto bg-gradient-to-b from-orange-800 to-orange-900 transform transition-transform -translate-x-full md:!translate-x-0 md:!relative md:!w-64"
          />

        </>
      )}
      
      {/* Desktop sidebar */}
      {!mobileSidebarOpen && (
        <Sidebar 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen} 
          mobile={false}
          className="hidden md:block h-full overflow-y-auto transition-all duration-300"
        />

      )}
      
      <div className="flex-1 flex flex-col overflow-hidden">

        <Header 
          toggleSidebar={toggleSidebar}
          toggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;