import { useFetch } from "../../../store/store.js";
import { useEffect } from "react";

const Explore = () => {
    const { fetchAlbums,fetchSongs,songs, albums,fetchArtists,artists } = useFetch();

    useEffect(() => {
        fetchAlbums();
        fetchSongs();
        fetchArtists();
        console.log(songs)
    }, [fetchAlbums,fetchSongs,fetchArtists]);

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-white mb-6">Explore</h2>

            {/* 🔥 Trending Songs Placeholder */}
            <section className="mb-10">
                <h3 className="text-2xl font-semibold text-[#5B76F7] mb-4">
                    🔥 Trending Songs
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {
                        songs.map((song,index)=>(
                            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition">
                                <img
                                    src={song.image?.[2]?.url || "https://via.placeholder.com/150"}
                                    alt={song.name || "Unknown Song"}
                                    className="w-full h-40 object-cover rounded-md mb-3"
                                />
                                <p className="text-white font-medium truncate">
                                    {song.name === "UNDEFINED" || !song.name ? "Unknown Title" : song.name}
                                </p>
                                <p className="text-sm text-gray-400">{song.artist || "Unknown Artist"}</p>
                            </div>
                        ))
                    }
                </div>
            </section>

            {/* 🌟 Top Artists Placeholder */}
            <section className="mb-10">
                <h3 className="text-2xl font-semibold text-[#5B76F7] mb-4">
                    🌟 Top Artists
                </h3>
                <div className="flex gap-6 overflow-x-auto">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                        <div key={index} className="min-w-[120px] text-center">
                            <img
                                src="https://via.placeholder.com/100"
                                alt="Artist"
                                className="w-24 h-24 rounded-full object-cover mx-auto mb-2 border-2 border-[#5B76F7]"
                            />
                            <p className="text-white text-sm">Artist {index + 1}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 📀 Latest Albums from API */}
            <section>
                <h3 className="text-2xl font-semibold text-[#5B76F7] mb-4">
                    📀 Latest Albums
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {albums && albums.length > 0 ? (
                        albums.map((album) => (
                            <a
                                href={album.url}
                                key={album.id}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-800 p-4 rounded-lg shadow text-center hover:bg-gray-700 transition"
                            >
                                <img
                                    src={album.image?.[2]?.url }
                                    alt={album.name || "Unknown Album"}
                                    className="w-full h-40 object-cover rounded-md mb-3"
                                />
                                <p className="text-white font-medium truncate">
                                    {album.name === "UNDEFINED" || !album.name
                                        ? "Unknown Title"
                                        : album.name}
                                </p>
                                <p className="text-sm text-gray-400">{album.year || "N/A"}</p>
                            </a>
                        ))
                    ) : (
                        <p className="text-gray-400">Loading albums...</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Explore;
