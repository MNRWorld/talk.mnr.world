
import { AnimatePresence } from "framer-motion";
import AppSidebar from "@/components/layout/AppSidebar";
import BottomNavBar from "@/components/layout/BottomNavBar";
import Player from "@/components/layout/Player";
import PodcastCard from "@/components/podcasts/PodcastCard";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { podcasts } from "@/lib/podcasts";
import { ScrollArea } from "@/components/ui/scroll-area";
import MobileHeader from "@/components/layout/MobileHeader";
import { cn } from "@/lib/utils";

interface CategoryPageProps {
  params: {
    categoryName: string;
  };
}

const CategoryPage = ({ params }: CategoryPageProps) => {
  const categoryName = decodeURIComponent(params.categoryName);
  const podcastsInCategory = podcasts.filter((p) =>
    p.categories.includes(categoryName),
  );

  return (
    <SidebarProvider>
      <div className="flex h-screen flex-col bg-background">
        <MobileHeader />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <SidebarInset className="flex flex-1 flex-col">
            <ScrollArea className="h-full">
              <main className={cn("p-4 sm:p-6 lg:p-8", "pb-24 md:pb-8")}>
                <h1 className="font-headline mb-6 text-3xl font-bold tracking-tight">
                  {categoryName}
                </h1>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {podcastsInCategory.map((podcast) => (
                    <PodcastCard key={podcast.id} podcast={podcast} />
                  ))}
                </div>
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

export default CategoryPage;
