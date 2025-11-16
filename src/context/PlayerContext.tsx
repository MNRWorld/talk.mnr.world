
"use client";

import type { Podcast } from "@/lib/types";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { usePodcast } from "./PodcastContext";

const HISTORY_STORAGE_KEY = "podcast_history";

interface PlayerContextType {
  currentTrack: Podcast | null;
  isPlaying: boolean;
  play: (trackId?: string, playlist?: Podcast[]) => void;
  pause: () => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  progress: number;
  duration: number;
  seek: (time: number) => void;
  volume: number;
  setVolume: (volume: number) => void;
  history: Podcast[];
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const { podcasts } = usePodcast();
  const [currentTrack, setCurrentTrack] = useState<Podcast | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<Podcast[] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [history, setHistory] = useState<Podcast[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isPlayingRef = React.useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load history from localStorage", error);
    }
  }, []);

  const addToHistory = useCallback((track: Podcast) => {
    setHistory((prevHistory) => {
      const newHistory = [
        track,
        ...prevHistory.filter((item) => item.id !== track.id),
      ].slice(0, 50); // Keep history to a reasonable size

      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(newHistory));
      } catch (error) {
        console.error("Failed to save history to localStorage", error);
      }

      return newHistory;
    });
  }, []);

  const play = useCallback(
    (trackId?: string, playlist: Podcast[] = podcasts) => {
      setCurrentPlaylist(playlist);

      let trackToPlay: Podcast | undefined | null = null;
      if (trackId) {
        trackToPlay = playlist.find((p) => p.id === trackId);
      } else {
        trackToPlay = currentTrack || (playlist.length > 0 ? playlist[0] : null);
      }

      if (trackToPlay) {
        if (currentTrack?.id !== trackToPlay.id) {
          setCurrentTrack(trackToPlay);
          addToHistory(trackToPlay);
        } else {
          // If it's the same track, just play it
          audioRef.current
            ?.play()
            .then(() => setIsPlaying(true))
            .catch((e) => console.error("Playback failed", e));
        }
      }
    },
    [podcasts, currentTrack, addToHistory],
  );

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      if (audioRef.current.src !== currentTrack.audioUrl) {
        audioRef.current.src = currentTrack.audioUrl;
        setProgress(0);
      }
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.error("Playback failed", e));
    }
  }, [currentTrack]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    const playlist = currentPlaylist || podcasts;
    if (!currentTrack) {
      if (!playlist || playlist.length === 0) return;
      play(playlist[0].id, playlist);
      return;
    }

    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play, currentTrack, podcasts, currentPlaylist]);

  const findCurrentTrackIndex = useCallback(() => {
    const playlist = currentPlaylist || podcasts;
    return currentTrack ? playlist.findIndex((p) => p.id === currentTrack.id) : -1;
  }, [currentTrack, podcasts, currentPlaylist]);

  const nextTrack = useCallback(() => {
    const playlist = currentPlaylist || podcasts;
    if (!playlist || playlist.length === 0) return;
    const currentIndex = findCurrentTrackIndex();
    if (currentIndex === -1) {
      play(playlist[0].id, playlist);
      return;
    }
    const nextIndex = (currentIndex + 1) % playlist.length;
    play(playlist[nextIndex].id, playlist);
  }, [currentPlaylist, podcasts, play, findCurrentTrackIndex]);

  const prevTrack = useCallback(() => {
    const playlist = currentPlaylist || podcasts;
    if (!playlist || playlist.length === 0) return;
    const currentIndex = findCurrentTrackIndex();
    if (currentIndex === -1) {
      play(playlist[0].id, playlist);
      return;
    }
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    play(playlist[prevIndex].id, playlist);
  }, [currentPlaylist, podcasts, play, findCurrentTrackIndex]);

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const setVolume = (vol: number) => {
    if (audioRef.current) {
      audioRef.current.volume = vol;
      setVolumeState(vol);
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", onTimeUpdate);
      audio.addEventListener("loadedmetadata", onLoadedMetadata);
      audio.addEventListener("ended", nextTrack);

      return () => {
        audio.removeEventListener("timeupdate", onTimeUpdate);
        audio.removeEventListener("loadedmetadata", onLoadedMetadata);
        audio.removeEventListener("ended", nextTrack);
      };
    }
  }, [nextTrack]);

  const value = {
    currentTrack,
    isPlaying,
    play,
    pause,
    togglePlay,
    nextTrack,
    prevTrack,
    audioRef,
    progress,
    duration,
    seek,
    volume,
    setVolume,
    history,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} />
    </PlayerContext.Provider>
  );
};
