import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { PodcastProvider } from "@/context/PodcastContext";
import { PlayerProvider } from "@/context/PlayerContext";

export const metadata: Metadata = {
  title: "PodLink",
  description: "Your personalized podcast library.",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-body antialiased`}>
        <PodcastProvider>
          <PlayerProvider>
            {children}
            <Toaster />
          </PlayerProvider>
        </PodcastProvider>
      </body>
    </html>
  );
}
