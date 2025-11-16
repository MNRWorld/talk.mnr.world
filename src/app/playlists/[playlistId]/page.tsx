
"use client";

import { AnimatePresence } from "framer-motion";
import AppSidebar from "@/components/layout/AppSidebar";
import BottomNavBar from "@/components/layout/BottomNavBar";
import Player from "@/components/layout/Player";
import PodcastCard from "@/components/podcasts/PodcastCard";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import MobileHeader from "@/components/layout/MobileHeader";
import { usePlaylist } from "@/context/PlaylistContext";
import { usePodcast } from "@/context/PodcastContext";

interface PlaylistPageProps {
  params: {
    playlistId: string;
  };
}

const PlaylistPage = ({ params }: PlaylistPageProps) => {
  const { playlistId } = params;
  const { getPlaylistById, getPodcastsForPlaylist } = usePlaylist();
  const { podcasts: allPodcasts } = usePodcast();

  const playlist = getPlaylistById(playlistId);
  const podcastsInPlaylist = getPodcastsForPlaylist(playlistId, allPodcasts);

  if (!playlist) {
    return (
      <SidebarProvider>
        <div className="flex h-screen flex-col bg-background">
          <MobileHeader />
          <div className="flex flex-1 overflow-hidden">
            <AppSidebar />
            <SidebarInset className="flex flex-1 flex-col items-center justify-center">
              <h1 className="font-headline text-3xl font-bold tracking-tight">
                Playlist not found
              </h1>
              <p className="text-muted-foreground">
                This playlist may have been deleted or does not exist.
              </p>
            </SidebarInset>
          </div>
          <AnimatePresence>
            <Player />
          </AnimatePresence>
          <BottomNavBar />
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen flex-col bg-background">
        <MobileHeader />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <SidebarInset className="flex flex-1 flex-col">
            <ScrollArea className="h-full">
              <main className="p-4 sm:p-6 lg:p-8">
                <h1 className="font-headline mb-6 text-3xl font-bold tracking-tight">
                  {playlist.name}
                </h1>
                {podcastsInPlaylist.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {podcastsInPlaylist.map((podcast) => (
                      <PodcastCard
                        key={podcast.id}
                        podcast={podcast}
                        playlist={podcastsInPlaylist}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex h-48 items-center justify-center rounded-md border border-dashed">
                    <p className="text-muted-foreground">
                      This playlist is empty. Add some podcasts to get started.
                    </p>
                  </div>
                )}
              </main>
            </ScrollArea>
          </SidebarInset>
        </div>
        <AnimatePresence>
          <Player />
        </AnimatePresence>
        <BottomNavBar />
      </div>
    </SidebarProvider>
  );
};

export default PlaylistPage;
