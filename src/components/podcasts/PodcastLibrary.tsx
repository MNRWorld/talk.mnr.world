"use client";

import { usePodcast } from "@/context/PodcastContext";
import PodcastCard from "./PodcastCard";

export default function PodcastLibrary() {
  const { podcasts } = usePodcast();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
}
