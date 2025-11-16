
"use client";

import Image from "next/image";
import Link from "next/link";
import { ListMusic } from "lucide-react";

import { usePodcast } from "@/context/PodcastContext";
import { usePlaylist } from "@/context/PlaylistContext";
import type { Playlist } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

interface PlaylistCardProps {
  playlist: Playlist;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  const { podcasts } = usePodcast();
  const { getPodcastsForPlaylist } = usePlaylist();

  const playlistPodcasts = getPodcastsForPlaylist(playlist.id, podcasts);
  const coverArt =
    playlistPodcasts.length > 0
      ? playlistPodcasts[0].coverArt
      : `https://picsum.photos/seed/${playlist.id}/500/500`;
  const coverArtHint =
    playlistPodcasts.length > 0
      ? playlistPodcasts[0].coverArtHint
      : "abstract art";

  return (
    <Link href={`/playlists/${playlist.id}`} passHref>
      <Card className="group relative w-full overflow-hidden border-none bg-card shadow-lg transition-colors duration-300 hover:bg-secondary/80">
        <CardContent className="p-4">
          <div className="relative mb-4 aspect-square">
            {playlistPodcasts.length > 0 ? (
              <Image
                src={coverArt}
                alt={playlist.name}
                fill
                className="rounded-md object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={coverArtHint}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-md bg-secondary">
                <ListMusic className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
          </div>
          <h3 className="h-6 font-semibold text-foreground line-clamp-1">
            {playlist.name}
          </h3>
          <p className="h-5 text-sm text-muted-foreground line-clamp-1">
            Playlist
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
