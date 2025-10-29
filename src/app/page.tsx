import { PlayerProvider } from "@/context/PlayerContext";
import { PodcastProvider } from "@/context/PodcastContext";
import AppSidebar from "@/components/layout/AppSidebar";
import Player from "@/components/layout/Player";
import PodcastLibrary from "@/components/podcasts/PodcastLibrary";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <PodcastProvider>
      <PlayerProvider>
        <SidebarProvider>
          <div className="flex h-screen flex-col bg-background">
            <div className="flex flex-1 overflow-hidden">
              <AppSidebar />
              <SidebarInset className="flex-1 overflow-y-auto pb-28">
                <main className="p-4 sm:p-6 lg:p-8">
                  <h1 className="font-headline mb-6 text-3xl font-bold tracking-tight">
                    Your Library
                  </h1>
                  <PodcastLibrary />
                </main>
              </SidebarInset>
            </div>
            <Player />
          </div>
        </SidebarProvider>
      </PlayerProvider>
    </PodcastProvider>
  );
}
