import React, { useState } from "react";
import SideBar from "./components/SideBar";
import TopNavbar from "./components/TopNavbar";
import { Outlet } from "react-router-dom";

const MusicLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white overflow-hidden">
      <SideBar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-2 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MusicLayout;
