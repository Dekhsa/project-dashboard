import React, { useState, useEffect } from "react";
import { Menu, Bell, Search } from "lucide-react";

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 lg:left-64 h-16 flex items-center justify-between px-6 z-30 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b"
          : "bg-white shadow-sm border-b"
      }`}
    >
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden md:flex items-center ml-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search placeholder"
              className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-primary-500 focus:bg-white w-80"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          className="p-2 rounded-md hover:bg-gray-100 relative"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center space-x-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-gray-700">Andrew Forbist</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <div className="w-8 h-8 bg-primary-500 rounded-full items-center justify-center hidden">
              <span className="text-white text-sm font-medium">A</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
