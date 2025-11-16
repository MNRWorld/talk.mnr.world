
"use client";

import { usePlayer } from "@/context/PlayerContext";
import { cn } from "@/lib/utils";
import PodcastCard from "./PodcastCard";

export default function HistoryList() {
  const { history } = usePlayer();

  return (
    <section>
      <h2 className="font-headline mb-4 text-2xl font-bold tracking-tight">
        Recently Played
      </h2>
      {history.length === 0 ? (
        <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
          <p className="text-muted-foreground">Your listening history is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {history.map((podcast) => (
            <PodcastCard key={`history-${podcast.id}`} podcast={podcast} />
          ))}
        </div>
      )}
    </section>
  );
}
