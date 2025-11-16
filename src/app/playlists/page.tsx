
import { AnimatePresence } from "framer-motion";
import AppSidebar from "@/components/layout/AppSidebar";
import BottomNavBar from "@/components/layout/BottomNavBar";
import Player from "@/components/layout/Player";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import MobileHeader from "@/components/layout/MobileHeader";
import PlaylistList from "@/components/playlists/PlaylistList";
import { CreatePlaylistDialog } from "@/components/playlists/CreatePlaylistDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function PlaylistsPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen flex-col bg-background">
        <MobileHeader />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <SidebarInset className="flex flex-1 flex-col">
            <ScrollArea className="h-full">
              <main className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="font-headline text-3xl font-bold tracking-tight">
                    Playlists
                  </h1>
                  <CreatePlaylistDialog>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> New Playlist
                    </Button>
                  </CreatePlaylistDialog>
                </div>
                <PlaylistList />
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
}
