import { useState, useRef, useEffect } from "react";
import {
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat,
  Ellipsis, Volume2, Expand, X
} from "lucide-react";
import terehuve from "../../../assets/terehuve.jpg";
import { motion } from "framer-motion";
import teranaam from "../../../assets/teranaam.mp3";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [FullScreen, setFullScreen] = useState(false);

  const audioRef = useRef(null);

  const song = {
    title: "Tere Huve",
    artist: "Mitraz",
    url: teranaam,
    cover: terehuve,
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = () => {
    const { currentTime, duration } = audioRef.current;
    setProgress((currentTime / duration) * 100 || 0);
    setCurrentTime(currentTime);
    setDuration(duration);
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleProgress);
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });
    return () => {
      audio.removeEventListener("timeupdate", handleProgress);
    };
  }, []);

  return (
      <>
        <motion.div className="w-full relative bg-gray-800 text-white p-2 pt-3 shadow-xl">
          <audio ref={audioRef} src={song.url} preload="metadata" />
          <input
              type="range"
              value={progress}
              onChange={handleSeek}
              className="w-full absolute top-0 left-0 h-2 bg-[#5B76F7] cursor-pointer"
          />

          <div className="mt-2 px-2 py-2 flex flex-wrap md:flex-nowrap items-center justify-between gap-4 rounded-lg">
            {/* Song Info */}
            <div className="flex items-center gap-4 min-w-[180px]">
              <img
                  src={song.cover}
                  alt="Cover Art"
                  className="w-14 h-14 md:w-16 md:h-16 rounded-md object-cover"
              />
              <div className="flex flex-col">
                <h3 className="text-sm md:text-lg font-semibold truncate max-w-[120px] md:max-w-[180px]">
                  {song.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-400 truncate">
                  {song.artist}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex-1 flex items-center justify-center gap-3 min-w-[200px]">
              <button><Repeat size={20} className="text-gray-400 hover:text-white" /></button>
              <button onClick={() => (audioRef.current.currentTime -= 10)}><SkipBack size={24} /></button>
              <button onClick={togglePlay} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button onClick={() => (audioRef.current.currentTime += 10)}><SkipForward size={24} /></button>
              <button><Shuffle size={20} className="text-gray-400 hover:text-white" /></button>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:inline text-gray-300">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
              <button><Ellipsis size={20} className="text-gray-400 hover:text-white" /></button>
              <button><Volume2 size={20} className="text-gray-400 hover:text-white" /></button>
              <button onClick={() => setFullScreen(true)}><Expand size={20} className="text-gray-400 hover:text-white" /></button>
            </div>
          </div>
        </motion.div>

        {/* Fullscreen Modal */}
        {FullScreen && (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 bg-gray-900 text-white flex flex-col justify-center items-center px-4"
            >
              <button
                  onClick={() => setFullScreen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={28} />
              </button>

              <div className="flex items-center justify-between w-full max-w-3xl p-6  rounded-lg shadow-lg">
                <div>
                  <img
                      src={song.cover}
                      alt={song.title}
                      className="w-20 h-20 md:w-64 md:h-64  object-cover mb-6"
                  />
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">{song.title}</h2>
                    <p className="text-md text-gray-400">{song.artist}</p>
                  </div>
                </div>
                <div>
                  lyrics
                </div>
              </div>

              <input
                  type="range"
                  value={progress}
                  onChange={handleSeek}
                  className="w-full max-w-xl mb-2 cursor-pointer"
              />
              <p className="text-sm text-gray-400 mb-4">
                {formatTime(currentTime)} / {formatTime(duration)}
              </p>

              <div className="flex items-center justify-center gap-6">
                <button><Repeat size={24} /></button>
                <button onClick={() => (audioRef.current.currentTime -= 10)}><SkipBack size={28} /></button>
                <button onClick={togglePlay} className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
                  {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                </button>
                <button onClick={() => (audioRef.current.currentTime += 10)}><SkipForward size={28} /></button>
                <button><Shuffle size={24} /></button>
              </div>

              <div className="mt-6 flex items-center gap-6">
                <button><Ellipsis size={24} /></button>
                <button><Volume2 size={24} /></button>
              </div>
            </motion.div>
        )}
      </>
  );
};

export default Player;
