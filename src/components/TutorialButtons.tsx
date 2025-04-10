
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Game types
type GameType = "valorant" | "league" | "overwatch" | "apex";

// Tutorial video type expanded to include game information
type TutorialVideo = {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  gameType: GameType;
};

// Sample tutorial videos organized by game
const tutorialVideos: TutorialVideo[] = [
  // Valorant Tutorials
  {
    id: "valorant-basics",
    title: "Valorant Basics",
    description: "Learn the fundamentals of Valorant gameplay and agent selection.",
    youtubeId: "dQw4w9WgXcQ",
    gameType: "valorant",
  },
  {
    id: "valorant-aim",
    title: "Aim Training for Valorant",
    description: "Master your aim with these Valorant-specific exercises.",
    youtubeId: "xvFZjo5PgG0",
    gameType: "valorant",
  },
  
  // League of Legends Tutorials
  {
    id: "lol-laning",
    title: "LoL Laning Phase Guide",
    description: "Dominate the laning phase with these essential strategies.",
    youtubeId: "6_b7RDuLwcI",
    gameType: "league",
  },
  {
    id: "lol-jungle",
    title: "Jungle Pathing Basics",
    description: "Learn optimal jungle routes and ganking strategies.",
    youtubeId: "dQw4w9WgXcQ",
    gameType: "league",
  },
  
  // Overwatch Tutorials
  {
    id: "overwatch-positioning",
    title: "Overwatch Positioning Guide",
    description: "Master positioning with different hero roles in Overwatch 2.",
    youtubeId: "xvFZjo5PgG0",
    gameType: "overwatch",
  },
  {
    id: "overwatch-team-comp",
    title: "Team Composition Strategies",
    description: "Learn how to build effective team compositions for ranked play.",
    youtubeId: "6_b7RDuLwcI",
    gameType: "overwatch",
  },
  
  // Apex Legends Tutorials
  {
    id: "apex-movement",
    title: "Advanced Movement Techniques",
    description: "Master movement mechanics to outplay your opponents.",
    youtubeId: "dQw4w9WgXcQ",
    gameType: "apex",
  },
  {
    id: "apex-weapons",
    title: "Weapon Mastery Guide",
    description: "Detailed breakdown of recoil patterns and attachments.",
    youtubeId: "xvFZjo5PgG0",
    gameType: "apex",
  },
];

const gameOptions = [
  { value: "valorant", label: "Valorant" },
  { value: "league", label: "League of Legends" },
  { value: "overwatch", label: "Overwatch 2" },
  { value: "apex", label: "Apex Legends" },
];

const TutorialButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<TutorialVideo | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameType>("valorant");
  const [showAllGames, setShowAllGames] = useState(false);
  const isMobile = useIsMobile();

  const handleOpenVideo = (video: TutorialVideo) => {
    setSelectedVideo(video);
    setIsOpen(false);
  };

  // Filter videos based on selected game or show all if toggle is on
  const filteredVideos = showAllGames 
    ? tutorialVideos 
    : tutorialVideos.filter(video => video.gameType === selectedGame);

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
            
            {/* Game selection controls */}
            <div className="px-4 mb-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Label htmlFor="show-all" className="text-white">Show All Games</Label>
                  <Switch 
                    id="show-all" 
                    checked={showAllGames}
                    onCheckedChange={setShowAllGames}
                    className="data-[state=checked]:bg-neon-purple"
                  />
                </div>
                
                {!showAllGames && (
                  <div className="w-full sm:w-auto">
                    <Select 
                      value={selectedGame} 
                      onValueChange={(value) => setSelectedGame(value as GameType)}
                    >
                      <SelectTrigger className="w-full sm:w-[180px] bg-black/30 border-white/20">
                        <SelectValue placeholder="Select Game" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/80 border-white/20 text-white">
                        {gameOptions.map((game) => (
                          <SelectItem key={game.value} value={game.value}>
                            {game.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredVideos.map((video) => (
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
                    {/* Game type badge */}
                    <div className="absolute top-2 right-2 bg-black/60 text-xs px-2 py-1 rounded text-white backdrop-blur-sm">
                      {gameOptions.find(game => game.value === video.gameType)?.label}
                    </div>
                  </div>
                  <h3 className="font-semibold text-white">{video.title}</h3>
                  <p className="text-sm text-gray-300 mt-1">{video.description}</p>
                </div>
              ))}
            </div>
            
            {filteredVideos.length === 0 && (
              <div className="text-center py-6 text-gray-400">
                No tutorial videos available for this game yet.
              </div>
            )}
            
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
                <p className="text-sm text-neon-purple mt-2">
                  Game: {gameOptions.find(game => game.value === selectedVideo.gameType)?.label}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TutorialButtons;
