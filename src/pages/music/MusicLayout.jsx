import React, { useState } from "react";
import SideBar from "./components/SideBar";
import TopNavbar from "./components/TopNavbar";
import Player from "./components/Player";
import { Outlet } from "react-router-dom";

const MusicLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            <div className="flex flex-1 overflow-hidden">
                <SideBar isOpen={isSidebarOpen} onClose={closeSidebar} />
                <div className="flex-1 flex flex-col">
                    <TopNavbar toggleSidebar={toggleSidebar} />
                    <main className="flex-1 overflow-y-auto p-6">
                        <Outlet />
                    </main>
                </div>
            </div>
            <div className=" w-full absolute bottom-[-100px] md:bottom-0 md:z-99 bg-gray-800 border-t border-gray-700">
                <Player />
            </div>
        </div>
    );
};

export default MusicLayout;
