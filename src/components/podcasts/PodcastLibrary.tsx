
"use client";

import { usePodcast } from "@/context/PodcastContext";
import PodcastCard from "./PodcastCard";
import { usePlayer } from "@/context/PlayerContext";
import { cn } from "@/lib/utils";
import { useMemo, useState, useEffect } from "react";
import type { Podcast } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { usePlaylist } from "@/context/PlaylistContext";
import PlaylistCard from "../playlists/PlaylistCard";

const getRowLimit = () => {
  if (typeof window === "undefined") {
    return null;
  }
  if (window.innerWidth >= 1536) return 6; // 2xl
  if (window.innerWidth >= 1280) return 5; // xl
  if (window.innerWidth >= 1024) return 4; // lg
  if (window.innerWidth >= 768) return 3; // md
  if (window.innerWidth >= 640) return 3; // sm
  return 2; // mobile
};

const CategorySection = ({
  title,
  podcasts,
}: {
  title: string;
  podcasts: Podcast[];
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [rowLimit, setRowLimit] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setRowLimit(getRowLimit());
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value on client-side mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayedPodcasts =
    isExpanded || rowLimit === null ? podcasts : podcasts.slice(0, rowLimit);
  const hasMore = rowLimit !== null && podcasts.length > rowLimit;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-headline text-2xl font-bold tracking-tight">
          {title}
        </h2>
        {hasMore &&
          (isExpanded ? (
            <Button variant="link" onClick={() => setIsExpanded(false)}>
              Show less
            </Button>
          ) : (
            <Button variant="link" onClick={() => setIsExpanded(true)}>
              See all
            </Button>
          ))}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {displayedPodcasts.map((podcast) => (
          <PodcastCard key={`${title}-${podcast.id}`} podcast={podcast} />
        ))}
      </div>
    </section>
  );
};

export default function PodcastLibrary({ showTitle = true }: { showTitle?: boolean }) {
  const { podcasts } = usePodcast();
  const { playlists } = usePlaylist();
  const { currentTrack } = usePlayer();

  const predefinedPlaylists = useMemo(() => {
    return [...playlists.filter(p => p.isPredefined)]
      .sort((a, b) => b.id.localeCompare(a.id));
  }, [playlists]);

  const categories = useMemo(() => {
    const categoryMap = new Map<string, Podcast[]>();
    podcasts.forEach((podcast) => {
      podcast.categories.forEach((category) => {
        if (!categoryMap.has(category)) {
          categoryMap.set(category, []);
        }
        categoryMap.get(category)?.push(podcast);
      });
    });
    return Array.from(categoryMap.entries());
  }, [podcasts]);

  return (
    <main
      className={cn("p-4 sm:p-6 lg:p-8", {
        "pb-28 md:pb-8": currentTrack,
      })}
    >
      {showTitle && (
        <h1 className="font-headline mb-6 text-3xl font-bold tracking-tight">
          Browse All
        </h1>
      )}

      <CategorySection title="Recently Added" podcasts={podcasts} />

      {predefinedPlaylists.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-headline text-2xl font-bold tracking-tight">
              Playlists
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {predefinedPlaylists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </section>
      )}

      {categories.map(([category, categoryPodcasts]) => (
        <CategorySection
          key={category}
          title={category}
          podcasts={categoryPodcasts}
        />
      ))}
    </main>
  );
}
