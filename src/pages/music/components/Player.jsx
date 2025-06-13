import { useState, useRef, useEffect } from "react";
import {
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat,
  Ellipsis, Volume2, Expand
} from "lucide-react";
import terehuve from "../../../assets/terehuve.jpg";
import { motion } from "framer-motion";
import teranaam from "../../../assets/teranaam.mp3";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const [FullScreen, setFullScreen] = useState(false);

  const song = {
    title: "Tere Huve",
    artist: "Mitraz",
    url: teranaam,
    cover: terehuve
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = () => {
    const { currentTime, duration } = audioRef.current;
    setProgress((currentTime / duration) * 100 || 0);
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };
  const  handleFullScreen = ()=>{
    setFullScreen(true);
  }

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleProgress);
    return () => audio.removeEventListener("timeupdate", handleProgress);
  }, []);

  return (
      <motion.div className="w-full relative bg-gray-800 text-white p-2 pt-3 shadow-xl">
        <audio ref={audioRef} src={song.url} preload="metadata" />

        {/* Top: Progress Bar */}
        <input
            type="range"
            value={progress}
            onChange={handleSeek}
            className="w-full bg-[#5B76F7] absolute top-0 left-0 h-2 cursor-pointer"
        />

        {/* Bottom: Player Controls */}
        <div className="mt-2 px-2 py-2 flex flex-wrap md:flex-nowrap items-center justify-between gap-4 rounded-lg">
          {/* Left: Song Info */}
          <div className="flex items-center gap-4 min-w-[180px]">
            <img
                src={song.cover}
                alt="Cover Art"
                className="w-14 h-14 md:w-16 md:h-16 rounded-md object-cover"
            />
            <div className="flex flex-col">
              <h3 className="text-sm md:text-lg font-semibold truncate max-w-[120px] md:max-w-[180px]">{song.title}</h3>
              <p className="text-xs md:text-sm text-gray-400 truncate">{song.artist}</p>
            </div>
          </div>

          {/* Center: Controls */}
          <div className="flex-1 flex items-center justify-center gap-3 min-w-[200px]">
            <button><Repeat size={20} className="text-gray-400 hover:text-white" /></button>
            <button onClick={() => (audioRef.current.currentTime -= 10)}><SkipBack size={24} /></button>
            <button onClick={togglePlay} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button onClick={() => (audioRef.current.currentTime += 10)}><SkipForward size={24} /></button>
            <button><Shuffle size={20} className="text-gray-400 hover:text-white" /></button>
          </div>

          {/* Right: Extras */}
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:inline text-gray-300">0:00 / 0:00</span>
            <button><Ellipsis size={20} className="text-gray-400 hover:text-white" /></button>
            <button><Volume2 size={20} className="text-gray-400 hover:text-white" /></button>
            <button onClick={handleFullScreen}><Expand size={20} className="text-gray-400 hover:text-white" /></button>
          </div>
        </div>
      </motion.div>
  );
};

export default Player;
