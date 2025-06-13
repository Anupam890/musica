import {
  Activity,
  Globe,
  Search,
  Library,
  Clock,
  Heart,
  Download,
  FolderPlus,
  AudioWaveform,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const SideBar = ({ isOpen, onClose }) => {
  return (
    <aside
      className={`fixed md:static top-0 left-0 h-screen w-56 bg-gray-800 text-white p-5 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <div className="flex justify-end md:hidden mb-4">
        <button onClick={onClose}>
          <X size={24} className="text-white cursor-pointer" />
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-8">
          <Activity size={24} color="#5B76F7" /> Musica
        </h2>

        <div className="mb-6">
          <h4 className="text-gray-400 text-sm uppercase mb-2">Menu</h4>
          <ul className="space-y-3">
            <li>
              <Link
                to="explore"
                className="flex items-center gap-3 text-sm hover:text-indigo-400"
              >
                <Globe size={18} /> Explore
              </Link>
            </li>
            <li>
              <Link
                to="search"
                className="flex items-center gap-3 text-sm hover:text-indigo-400"
              >
                <Search size={18} /> Search
              </Link>
            </li>
            <li>
              <Link
                to="/library"
                className="flex items-center gap-3 text-sm hover:text-indigo-400"
              >
                <Library size={18} /> Library
              </Link>
            </li>
          </ul>
        </div>

        {/* Library */}
        <div className="mb-6">
          <h4 className="text-gray-400 text-sm uppercase mb-2">Library</h4>
          <ul className="space-y-3">
            <li>
              <Link
                to="recent"
                className="flex items-center gap-3 text-sm hover:text-indigo-400"
              >
                <Clock size={18} /> Recent
              </Link>
            </li>
            <li>
              <Link
                to="favorites"
                className="flex items-center gap-3 text-sm hover:text-indigo-400"
              >
                <Heart size={18} /> Favorites
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-gray-400 text-sm uppercase mb-2">Playlist</h4>
          <ul className="space-y-3">
            <li>
              <Link
                to="/create-playlist"
                className="flex items-center gap-3 text-sm hover:text-indigo-400"
              >
                <FolderPlus size={18} /> Create Playlist
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center gap-3 text-sm hover:text-indigo-400"
              >
                <AudioWaveform size={18} /> Listen Together
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
