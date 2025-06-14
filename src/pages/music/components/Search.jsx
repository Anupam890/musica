import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFetch, useStore } from "../../../store/store";
import { Play } from "lucide-react";

const Search = () => {
    const { query } = useParams();
    const { fetchSongs, songs, TopResults } = useFetch();
    const { setCurrentIndex, setIsPlaying, setPlaylist } = useStore();

    useEffect(() => {
        if (query?.trim()) {
            fetchSongs(query);
        }
    }, [query]);

    const playSong = (song) => {
        const index = songs.findIndex(
            (s) => s.id === song.id || s.name === song.name
        );
        setPlaylist(songs);
        setCurrentIndex(index >= 0 ? index : 0);
        setIsPlaying(true);
    };

    if (!query || query.trim() === "") return null;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">
                Search Results for: <span className="text-[#5B76F7]">"{query}"</span>
            </h2>

            {TopResults && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-300">Top Result</h3>
                    <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-4 shadow">
                        <img
                            src={TopResults.imageUrl || "https://via.placeholder.com/80"}
                            alt={TopResults.name}
                            className="w-20 h-20 object-cover rounded-md"
                        />
                        <div>
                            <p className="text-xl font-bold text-white">{TopResults.name}</p>
                            <p className="text-sm text-gray-400">
                                Album:{" "}
                                {typeof TopResults.album === "object"
                                    ? TopResults.album?.name || "N/A"
                                    : TopResults.album || "N/A"}
                            </p>
                            <p className="text-sm text-gray-400">
                                Track:{" "}
                                {typeof TopResults.track === "object"
                                    ? TopResults.track?.name || "N/A"
                                    : TopResults.track || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-300">Songs</h3>
                {songs && songs.length > 0 ? (
                    <ul className="space-y-2">
                        {songs.map((song, index) => {
                            const imageUrl =
                                song?.image?.find((img) => img.quality === "500x500")?.url ||
                                song?.image?.[0]?.url ||
                                "https://via.placeholder.com/80";

                            const albumName =
                                typeof song.album === "object"
                                    ? song.album?.name || "Unknown"
                                    : song.album || "Unknown";

                            const albumUrl =
                                typeof song.album === "object"
                                    ? song.album?.url || "#"
                                    : "#";

                            return (
                                <li
                                    key={index}
                                    className="group bg-gray-800 p-2 rounded-lg flex items-center gap-4 shadow relative"
                                >
                                    <div className="relative w-16 h-16">
                                        <img
                                            src={imageUrl}
                                            alt={song.name}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                        <button
                                            onClick={() => playSong(song)}
                                            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                        >
                                            <Play size={18} className="text-white" />
                                        </button>
                                    </div>

                                    <div>
                                        <button
                                            onClick={() => playSong(song)}
                                            className="text-white font-semibold text-lg hover:underline"
                                        >
                                            {song.name}
                                        </button>
                                        <p className="text-sm text-gray-400">
                                            Album:{" "}
                                            <a
                                                href={albumUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:underline text-[#5B76F7]"
                                            >
                                                {albumName}
                                            </a>
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Artist:{" "}
                                            {song.artists?.primary?.map((a, i) => (
                                                <span key={i}>
                          {a.name}
                                                    {i < song.artists.primary.length - 1 ? ", " : ""}
                        </span>
                                            )) || "Unknown"}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Year: {song.year || "N/A"}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <h2 className="text-gray-400">No songs found for "{query}".</h2>
                )}
            </div>
        </div>
    );
};

export default Search;
