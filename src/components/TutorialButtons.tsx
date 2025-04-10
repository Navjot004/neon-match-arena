
import { useState } from "react";
import { Youtube, Video, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

type TutorialVideo = {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
};

const tutorialVideos: TutorialVideo[] = [
  {
    id: "getting-started",
    title: "Getting Started Guide",
    description: "Learn the basics of RankMatch and how to set up your profile.",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
  },
  {
    id: "matchmaking",
    title: "Matchmaking Tips & Tricks",
    description: "Advanced strategies to find the perfect teammates.",
    youtubeId: "xvFZjo5PgG0", // Replace with actual YouTube video ID
  },
  {
    id: "tournaments",
    title: "Tournament Strategy Guide",
    description: "How to prepare and compete in RankMatch tournaments.",
    youtubeId: "6_b7RDuLwcI", // Replace with actual YouTube video ID
  },
];

const TutorialButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<TutorialVideo | null>(null);
  const isMobile = useIsMobile();

  const handleOpenVideo = (video: TutorialVideo) => {
    setSelectedVideo(video);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating button container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Main tutorials button */}
        <Drawer>
          <DrawerTrigger asChild>
            <Button 
              size="icon" 
              className="h-14 w-14 rounded-full shadow-lg bg-neon-purple hover:bg-neon-purple/80 text-white"
            >
              <Youtube className="h-6 w-6" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="glass-panel border-none">
            <DrawerHeader>
              <DrawerTitle className="text-xl neon-text">Tutorial Videos</DrawerTitle>
              <DrawerDescription>
                Watch these videos to get the most out of RankMatch
              </DrawerDescription>
            </DrawerHeader>
            <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
              {tutorialVideos.map((video) => (
                <div
                  key={video.id}
                  className="glass-panel rounded-lg p-4 cursor-pointer hover:border-neon-purple/50 transition-all"
                  onClick={() => handleOpenVideo(video)}
                >
                  <div className="aspect-video bg-black/50 rounded-md flex items-center justify-center mb-3 relative overflow-hidden group">
                    <img 
                      src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`} 
                      alt={video.title} 
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Video className="h-10 w-10 text-white opacity-70 group-hover:text-neon-purple group-hover:opacity-100 transition-all" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-white">{video.title}</h3>
                  <p className="text-sm text-gray-300 mt-1">{video.description}</p>
                </div>
              ))}
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Video modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl">
            <Button 
              size="icon" 
              variant="ghost" 
              className="absolute -top-12 right-0 text-white hover:bg-white/10"
              onClick={() => setSelectedVideo(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            
            <div className="glass-panel rounded-lg overflow-hidden">
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold neon-text">{selectedVideo.title}</h2>
                <p className="text-gray-300 mt-1">{selectedVideo.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TutorialButtons;
