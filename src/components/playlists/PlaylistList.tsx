
"use client";

import { usePlaylist } from "@/context/PlaylistContext";
import PlaylistCard from "./PlaylistCard";

export default function PlaylistList() {
  const { playlists } = usePlaylist();

  // Show newest playlists first
  const reversedPlaylists = [...playlists].reverse();

  return (
    <section>
      <h2 className="font-headline mb-4 text-2xl font-bold tracking-tight">
        Playlists
      </h2>
      {reversedPlaylists.length === 0 ? (
        <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
          <p className="text-muted-foreground">You haven't created any playlists yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {reversedPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      )}
    </section>
  );
}
