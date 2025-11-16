
"use client";

import type { Playlist, Podcast } from "@/lib/types";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import predefinedPlaylistsData from "@/lib/predefined-playlists.json";


const PLAYLIST_STORAGE_KEY = "podcast_playlists";

interface PlaylistContextType {
  playlists: Playlist[];
  createPlaylist: (name: string) => void;
  addPodcastToPlaylist: (playlistId: string, podcastId: string) => void;
  getPodcastsForPlaylist: (
    playlistId: string,
    allPodcasts: Podcast[],
  ) => Podcast[];
  getPlaylistById: (playlistId: string) => Playlist | undefined;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined,
);

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("usePlaylist must be used within a PlaylistProvider");
  }
  return context;
};

export const PlaylistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    try {
      const storedPlaylists = localStorage.getItem(PLAYLIST_STORAGE_KEY);
      const userPlaylists = storedPlaylists ? JSON.parse(storedPlaylists) : [];
      const predefinedPlaylists: Playlist[] = predefinedPlaylistsData.map(p => ({...p, isPredefined: true}));
      setPlaylists([...predefinedPlaylists, ...userPlaylists]);
    } catch (error) {
      console.error("Failed to load playlists from localStorage", error);
      const predefinedPlaylists: Playlist[] = predefinedPlaylistsData.map(p => ({...p, isPredefined: true}));
      setPlaylists(predefinedPlaylists);
    }
  }, []);

  const savePlaylists = (updatedUserPlaylists: Playlist[]) => {
    try {
      localStorage.setItem(
        PLAYLIST_STORAGE_KEY,
        JSON.stringify(updatedUserPlaylists),
      );
      const predefinedPlaylists: Playlist[] = predefinedPlaylistsData.map(p => ({...p, isPredefined: true}));
      setPlaylists([...predefinedPlaylists, ...updatedUserPlaylists]);
    } catch (error) {
      console.error("Failed to save playlists to localStorage", error);
    }
  };

  const createPlaylist = useCallback(
    (name: string) => {
      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        name,
        podcastIds: [],
        isPredefined: false,
      };
      const userPlaylists = playlists.filter(p => !p.isPredefined);
      const updatedPlaylists = [...userPlaylists, newPlaylist];
      savePlaylists(updatedPlaylists);
    },
    [playlists],
  );

  const addPodcastToPlaylist = useCallback(
    (playlistId: string, podcastId: string) => {
      const userPlaylists = playlists.filter(p => !p.isPredefined);
      const updatedPlaylists = userPlaylists.map((playlist) => {
        if (playlist.id === playlistId) {
          // Avoid adding duplicates
          if (!playlist.podcastIds.includes(podcastId)) {
            return { ...playlist, podcastIds: [...playlist.podcastIds, podcastId] };
          }
        }
        return playlist;
      });
      savePlaylists(updatedPlaylists);
    },
    [playlists],
  );

  const getPodcastsForPlaylist = useCallback(
    (playlistId: string, allPodcasts: Podcast[]) => {
      const playlist = playlists.find((p) => p.id === playlistId);
      if (!playlist) return [];
      return playlist.podcastIds
        .map((id) => allPodcasts.find((p) => p.id === id))
        .filter((p): p is Podcast => !!p);
    },
    [playlists],
  );

  const getPlaylistById = useCallback(
    (playlistId: string) => {
      return playlists.find((p) => p.id === playlistId);
    },
    [playlists],
  );

  const value = {
    playlists,
    createPlaylist,
    addPodcastToPlaylist,
    getPodcastsForPlaylist,
    getPlaylistById,
  };

  return (
    <PlaylistContext.Provider value={value}>{children}</PlaylistContext.Provider>
  );
};
