import { create } from "zustand";
import Api from "../config/Api";

export const useFetch = create((set) => ({
  songs: null,
  albums: null,
  artists: null,
  TopResults: null,
  setTopResults: (data) => set({ TopResults: data }),

  fetchSongs: async (query) => {
    try {
      const response = await Api.get(`/api/search/songs?query=${query}`);
      if (response.data.data.results[0]) {
        const topResult = response.data.data.results[0];
        set({ TopResults: topResult, songs: response.data.data.results.slice(0, 5) });
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  },

  fetchAlbums: async (query) => {
    try {
      const res = await Api(`/api/search/albums?query=${query}`);
      if (res.data.data.results[0]) {
        set({ albums: res.data.data.results });
      } else set({ albums: false });
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  },

  fetchArtists: async (query) => {
    try {
      const artist = await Api(`/api/search/artists?query=${query}`);
      if (artist.data.data.results[0]) {
        set({ artists: artist.data.data.results });
      } else set({ artists: false });
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  },
}));
export const useStore = create((set) => ({
  playlist: [],
  currentIndex: 0,
  currentSong: null,
  isPlaying: false,

  setPlaylist: (playlist) => set({ playlist }),
  setCurrentIndex: (index) =>
      set((state) => ({
        currentIndex: index,
        currentSong: state.playlist[index] || null,
      })),

  nextSong: () =>
      set((state) => {
        const nextIndex = (state.currentIndex + 1) % state.playlist.length;
        return {
          currentIndex: nextIndex,
          currentSong: state.playlist[nextIndex],
        };
      }),

  previousSong: () =>
      set((state) => {
        const prevIndex =
            (state.currentIndex - 1 + state.playlist.length) %
            state.playlist.length;
        return {
          currentIndex: prevIndex,
          currentSong: state.playlist[prevIndex],
        };
      }),

  setIsPlaying: (isPlaying) => set({ isPlaying }),
}));