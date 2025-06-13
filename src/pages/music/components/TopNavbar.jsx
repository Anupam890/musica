import React, { useState, useEffect } from "react";
import { Search, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TopNavbar = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchQuery.trim()) return;

    const timer = setTimeout(() => {
      navigate(`/music/search/${encodeURIComponent(searchQuery.trim())}`);
      console.log("Typing search:", searchQuery);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, navigate]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/music/search/${encodeURIComponent(searchQuery.trim())}`);
      console.log("Enter search:", searchQuery);
    }
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-gray-800 bg-gray-950 w-full">
      <div className="md:hidden cursor-pointer">
        <button onClick={toggleSidebar}>
          <Menu size={24} className="text-white cursor-pointer" />
        </button>
      </div>

      <div className="hidden md:flex space-x-6 text-sm font-medium"></div>

      <div className="flex-1 px-4 md:px-0 max-w-xs sm:max-w-sm md:max-w-md relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="w-full bg-gray-800 text-sm text-white rounded-full pl-10 pr-4 py-2 focus:outline-none placeholder:text-gray-400"
        />
        <Search
          size={18}
          className="absolute left-7 md:left-3 top-2.5 text-gray-400"
        />
      </div>

      <div className="sm:flex items-center gap-3 ml-2 cursor-pointer">
        <img
          src="https://ui-avatars.com/api/?name=Dave+Cooper&background=0D8ABC&color=fff"
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-sm font-medium hidden md:inline">
          Dave Cooper
        </span>
      </div>
    </header>
  );
};

export default TopNavbar;
