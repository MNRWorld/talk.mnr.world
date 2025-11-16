
"use client";

import { usePlaylist } from "@/context/PlaylistContext";
import PlaylistCard from "./PlaylistCard";

export default function PlaylistList() {
  const { playlists } = usePlaylist();

  // Show user-created playlists first, then predefined, both newest first
  const userPlaylists = [...playlists.filter(p => !p.isPredefined)].reverse();
  const predefinedPlaylists = [...playlists.filter(p => p.isPredefined)].reverse();
  
  const sortedPlaylists = [...userPlaylists, ...predefinedPlaylists];

  return (
    <section>
      <h2 className="font-headline mb-4 text-2xl font-bold tracking-tight">
        Playlists
      </h2>
      {sortedPlaylists.length === 0 ? (
        <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
          <p className="text-muted-foreground">You haven't created any playlists yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {sortedPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      )}
    </section>
  );
}
