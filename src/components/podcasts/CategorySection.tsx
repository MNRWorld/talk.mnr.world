
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Podcast } from "@/lib/types";
import { Button } from "@/components/ui/button";
import PodcastCard from "./PodcastCard";
import { Loader2 } from "lucide-react";

const getItemsPerRow = () => {
  if (typeof window === "undefined") {
    return 6; // Default for server-side rendering
  }
  if (window.innerWidth >= 1536) return 6; // 2xl
  if (window.innerWidth >= 1280) return 5; // xl
  if (window.innerWidth >= 1024) return 4; // lg
  if (window.innerWidth >= 768) return 3; // md
  if (window.innerWidth >= 640) return 3; // sm
  return 2; // mobile
};

const Loader = () => (
  <div className="col-span-full flex items-center justify-center py-8">
    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
  </div>
);

export default function CategorySection({
  title,
  podcasts,
}: {
  title: string;
  podcasts: Podcast[];
}) {
  const [itemsPerRow, setItemsPerRow] = useState(getItemsPerRow());
  const [visibleCount, setVisibleCount] = useState(itemsPerRow);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerRow = getItemsPerRow();
      setItemsPerRow(newItemsPerRow);
      // Reset visible count on resize if not expanded
      if (!isExpanded) {
        setVisibleCount(newItemsPerRow);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded]);
  
  const handleSeeAll = () => {
    setIsExpanded(true);
    setVisibleCount(itemsPerRow * 3);
  };
  
  const handleShowLess = () => {
    setIsExpanded(false);
    setVisibleCount(itemsPerRow);
  };

  const displayedPodcasts = podcasts.slice(0, visibleCount);
  const hasMore = podcasts.length > visibleCount;

  const loadMore = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + itemsPerRow, podcasts.length));
      setIsLoading(false);
    }, 500); // Simulate network delay
  }, [isLoading, itemsPerRow, podcasts.length]);

  useEffect(() => {
    if (!isExpanded || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" },
    );

    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [isExpanded, hasMore, loadMore]);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-headline text-2xl font-bold tracking-tight">
          {title}
        </h2>
        {podcasts.length > itemsPerRow &&
          (isExpanded ? (
            <Button variant="link" onClick={handleShowLess}>
              Show less
            </Button>
          ) : (
            <Button variant="link" onClick={handleSeeAll}>
              See all
            </Button>
          ))}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {displayedPodcasts.map((podcast) => (
          <PodcastCard
            key={`${title}-${podcast.id}`}
            podcast={podcast}
            playlist={podcasts}
          />
        ))}
        {isExpanded && isLoading && <Loader />}
      </div>
       <div ref={loaderRef} />
    </section>
  );
}
