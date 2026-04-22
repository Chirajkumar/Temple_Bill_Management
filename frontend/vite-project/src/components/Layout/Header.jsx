import React, { useState, useEffect, useCallback } from 'react';
import { FiMenu, FiUser, FiLogOut, FiBell, FiChevronDown, FiMaximize2, FiMinimize2 } from 'react-icons/fi';

const Header = ({ toggleSidebar, toggleMobileSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const notifications = [
    { id: 1, title: 'New Seva Booking', message: 'Abhishekam booked for tomorrow', time: '5 min ago', read: false },
    { id: 2, title: 'Low Stock Alert', message: 'Coconut stock below minimum level', time: '1 hour ago', read: false },
    { id: 3, title: 'Donation Received', message: '₹25,000 donated for Annadanam', time: '2 hours ago', read: true }
  ];

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        document.body.classList.add('fullscreen-mode');
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        document.body.classList.remove('fullscreen-mode');
        setIsFullscreen(false);
      });
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      if (!document.fullscreenElement) {
        document.body.classList.remove('fullscreen-mode');
      } else {
        document.body.classList.add('fullscreen-mode');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-3">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-lg hover:bg-gray-100"
        >
          <FiMenu className="h-5 w-5" />
        </button>
        <button
          onClick={toggleMobileSidebar}
          className="hidden md:block text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-lg hover:bg-gray-100"
        >
          <FiMenu className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100"
            >
              <FiBell className="h-5 w-5" />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-20">
                <div className="p-3 border-b">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notif => (
                    <div key={notif.id} className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-blue-50' : ''}`}>
                      <p className="font-medium text-sm">{notif.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 text-center border-t">
                  <button className="text-sm text-orange-600 hover:text-orange-700">View All</button>
                </div>
              </div>
            )}
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100"
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <FiMinimize2 className="h-5 w-5" /> : <FiMaximize2 className="h-5 w-5" />}
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white">
                <FiUser className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">Admin User</span>
              <FiChevronDown className="h-4 w-4" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20">
                <div className="py-1">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile Settings
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Change Password
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Reports
                  </button>
                  <hr className="my-1" />
                  <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    <FiLogOut className="inline mr-2" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

