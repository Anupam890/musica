import { useEffect, useRef, useState } from "react";
import {
  Play, Pause, SkipBack, SkipForward,
  Volume2, VolumeX, Expand, Ellipsis, Shuffle, Repeat, X
} from "lucide-react";
import { motion } from "framer-motion";
import { useStore } from "../../../store/store";

const Player = () => {
  const {
    currentSong,
    isPlaying,
    setIsPlaying,
    nextSong,
    prevSong,
  } = useStore();

  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [FullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    if (isPlaying) {
      audio.play().catch(console.log);
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    nextSong();
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleSeek = (e) => {
    const value = parseFloat(e.target.value);
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  if (!currentSong) return null;

  return (
      <div className="min-w-full relative bg-gray-800 text-white p-2 pt-3 shadow-xl">
        <audio
            ref={audioRef}
            src={currentSong.downloadUrl?.[4]?.url || currentSong.downloadUrl?.[0]?.url}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
            autoPlay
        />
        <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            step="0.1"
            className="w-full absolute top-0 left-0 h-1 sm:h-2 bg-[#5B76F7] cursor-pointer"
        />
        <div className="mt-3 px-2 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg">
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <img
                src={
                    currentSong.image?.find(img => img.quality === "500x500")?.url ||
                    currentSong.image?.[0]?.url ||
                    "https://via.placeholder.com/60"
                }
                alt="cover"
                className="w-14 h-14 md:w-16 md:h-16 rounded-md object-cover"
            />
            <div className="flex flex-col">
              <h3 className="text-sm md:text-lg font-semibold truncate max-w-[100px] md:max-w-[180px]">{currentSong.name}</h3>
              <p className="text-xs md:text-sm text-gray-400 truncate">
                {currentSong.artists?.primary?.map(a => a.name).join(", ") || "Unknown Artist"}
              </p>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center gap-6 w-full sm:w-auto">
            <SkipBack
                size={20}
                onClick={prevSong}
                className="cursor-pointer text-gray-300 hover:text-white"
            />
            <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
              {isPlaying ? (
                  <Pause
                      size={26}
                      onClick={() => setIsPlaying(false)}
                      className="cursor-pointer text-white"
                  />
              ) : (
                  <Play
                      size={26}
                      onClick={() => setIsPlaying(true)}
                      className="cursor-pointer text-white"
                  />
              )}
            </button>
            <SkipForward
                size={20}
                onClick={nextSong}
                className="cursor-pointer text-gray-300 hover:text-white"
            />
          </div>

          <div className="flex items-center gap-3 text-sm w-full sm:w-auto justify-between sm:justify-end">
          <span className="hidden sm:inline text-gray-300">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
            {muted || volume === 0 ? (
                <VolumeX
                    size={20}
                    onClick={() => {
                      setMuted(false);
                      setVolume(0.5);
                    }}
                    className="cursor-pointer text-gray-300"
                />
            ) : (
                <Volume2
                    size={20}
                    onClick={() => setMuted(true)}
                    className="cursor-pointer text-gray-300"
                />
            )}
            <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => {
                  setMuted(false);
                  setVolume(parseFloat(e.target.value));
                }}
                className="w-20 accent-[#5B76F7]"
            />
            <button><Ellipsis size={20} className="text-gray-400 hover:text-white" /></button>
            <button onClick={() => setFullScreen(true)}><Expand size={20} className="text-gray-400 hover:text-white" /></button>
          </div>
        </div>

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

              <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-3xl p-6 rounded-lg shadow-lg gap-4">
                <div className="flex flex-col items-center">
                  <img
                      src={
                          currentSong.image?.find(img => img.quality === "500x500")?.url ||
                          currentSong.image?.[0]?.url ||
                          "https://via.placeholder.com/150"
                      }
                      alt={currentSong.name}
                      className="w-32 h-32 md:w-64 md:h-64 object-cover mb-6"
                  />
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">{currentSong.name}</h2>
                    <p className="text-md text-gray-400">{currentSong.artists?.primary?.map(a => a.name).join(", ")}</p>
                  </div>
                </div>
                <div className="hidden md:block">
                  <p>Lyrics</p>
                </div>
              </div>

              <input
                  type="range"
                  value={currentTime}
                  max={duration}
                  onChange={handleSeek}
                  className="w-full max-w-xl mb-2 cursor-pointer"
              />
              <p className="text-sm text-gray-400 mb-4">
                {formatTime(currentTime)} / {formatTime(duration)}
              </p>

              <div className="flex items-center justify-center gap-6">
                <button><Repeat size={24} /></button>
                <button onClick={() => (audioRef.current.currentTime -= 10)}><SkipBack size={28} /></button>
                <button onClick={() => setIsPlaying(!isPlaying)} className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
                  {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                </button>
                <button onClick={() => (audioRef.current.currentTime += 10)}><SkipForward size={28} /></button>
                <button><Shuffle size={24} /></button>
              </div>

              <div className="mt-6 flex items-center gap-6 cursor-pointer">
                <button><Ellipsis size={24} className="cursor-pointer" /></button>
                <button><Volume2 size={24} className="cursor-pointer" /></button>
              </div>
            </motion.div>
        )}
      </div>
  );
};

export default Player;
