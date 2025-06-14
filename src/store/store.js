import { create } from "zustand";
import Api from "../config/Api.js";

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
        set({ TopResults: topResult, songs: response.data.data.results.slice(0,5) });
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
  fetchArtists : async(query)=>{
    try{
      const artist = await Api(`/api/search/artists?query=${query}`);
      if (artist.data.data.results[0]) {
        set({ artists: artist.data.data.results });
      } else set({ artists: false });
    }catch (error) {
      console.error("Error fetching artists:", error);
    }
  }
}));

export const useStore = create((set) => ({
  playlist: [],
  musicId: null,
  isPlaying: false,
    setMusicId: (id) => set({ musicId: id }),
    setPlaylist: (playlist) => set({ playlist }),
  isUserLoggedIn: false,
  queue: [],
    setQueue: (queue) => set({ queue }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
  setIsUserLoggedIn: (isUserLoggedIn) => set({ isUserLoggedIn}),
    addToPlaylist: (song) => set((state) => ({
        playlist: [...state.playlist, song]
    })),

}));