import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFetch } from "../../../store/store.js";

const Search = () => {
  const { query } = useParams();
  const { fetchSongs, songs, Topresult } = useFetch();

  useEffect(() => {
    if (query) {
      fetchSongs(query);
    }
  }, [query, fetchSongs]);

  useEffect(() => {
    console.log("Fetched songs:", songs);
    if (songs && songs.length > 0) {
      console.log(songs[0]?.image);
    }
  }, [songs]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Search Results for: <span className="text-[#5B76F7]">"{query}"</span>
      </h2>

      {Topresult && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-300">Top Result</h3>
          <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-4 shadow">
            <img
              src={Topresult.imageUrl || "https://via.placeholder.com/80"}
              alt={Topresult.name || "Artist"}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div>
              <p className="text-xl font-bold text-white">{Topresult.name}</p>
              <p className="text-sm text-gray-400">
                Album: {Topresult.album || "N/A"}
              </p>
              <p className="text-sm text-gray-400">
                Track: {Topresult.track || "N/A"}
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

              return (
                <li
                  key={song.id || index}
                  className="bg-gray-800 p-4 rounded-lg flex items-center gap-4 shadow"
                >
                  <img
                    src={imageUrl}
                    alt={song.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <a
                      href={song.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-semibold text-lg hover:underline"
                    >
                      {song.name}
                    </a>
                    <p className="text-sm text-gray-400">
                      Album:{" "}
                      <a
                        href={song.album?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-[#5B76F7]"
                      >
                        {song.album?.name || "Unknown"}
                      </a>
                    </p>
                    <p className="text-sm text-gray-400">
                      Artist:{" "}
                      {song.artists?.primary?.length > 0
                        ? song.artists.primary.map((artist, i) => (
                            <span key={i}>
                              {artist.name}
                              {i < song.artists.primary.length - 1 ? ", " : ""}
                            </span>
                          ))
                        : "Unknown"}
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
