import { useState, useEffect } from "react";
import { 
  Lock, MessageSquare, Plus, RefreshCw, Search, Users, Gamepad2, Clock, ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock rooms data
const mockRooms = [
  {
    id: 1,
    name: "Diamond+ Ranked Grind",
    game: "Valorant",
    map: "Any",
    players: 3,
    maxPlayers: 5,
    mode: "Competitive",
    region: "NA East",
    private: false,
    micRequired: true,
    owner: {
      name: "KingSlayer42",
      avatar: "https://i.pravatar.cc/150?img=33"
    },
    createdAt: "15 minutes ago"
  },
  {
    id: 2,
    name: "Chill Unrated Games",
    game: "Valorant",
    map: "Any",
    players: 2,
    maxPlayers: 5,
    mode: "Unrated",
    region: "NA West",
    private: false,
    micRequired: false,
    owner: {
      name: "ChillGamer99",
      avatar: "https://i.pravatar.cc/150?img=13"
    },
    createdAt: "30 minutes ago"
  },
  {
    id: 3,
    name: "Team Practice - Tournament Prep",
    game: "Valorant",
    map: "Split",
    players: 4,
    maxPlayers: 5,
    mode: "Custom",
    region: "EU West",
    private: true,
    micRequired: true,
    owner: {
      name: "ProSniper",
      avatar: "https://i.pravatar.cc/150?img=53"
    },
    createdAt: "45 minutes ago"
  },
  {
    id: 4,
    name: "High ELO Ranked",
    game: "League of Legends",
    map: "Summoner's Rift",
    players: 3,
    maxPlayers: 5,
    mode: "Ranked",
    region: "NA East",
    private: false,
    micRequired: true,
    owner: {
      name: "JungleDiff",
      avatar: "https://i.pravatar.cc/150?img=23"
    },
    createdAt: "1 hour ago"
  },
  {
    id: 5,
    name: "ARAM Fun Games",
    game: "League of Legends",
    map: "Howling Abyss",
    players: 2,
    maxPlayers: 5,
    mode: "ARAM",
    region: "EU West",
    private: false,
    micRequired: false,
    owner: {
      name: "MidOrFeed",
      avatar: "https://i.pravatar.cc/150?img=43"
    },
    createdAt: "2 hours ago"
  },
  {
    id: 6,
    name: "Apex Predator Push",
    game: "Apex Legends",
    map: "World's Edge",
    players: 2,
    maxPlayers: 3,
    mode: "Ranked",
    region: "NA East",
    private: false,
    micRequired: true,
    owner: {
      name: "WraithMain",
      avatar: "https://i.pravatar.cc/150?img=60"
    },
    createdAt: "3 hours ago"
  }
];

// Mock games data
const games = [
  { id: "valorant", name: "Valorant" },
  { id: "lol", name: "League of Legends" },
  { id: "apex", name: "Apex Legends" },
  { id: "ow2", name: "Overwatch 2" },
  { id: "csgo", name: "CS:GO" },
];

// Mock regions data
const regions = [
  { id: "na-east", name: "NA East" },
  { id: "na-west", name: "NA West" },
  { id: "eu-west", name: "EU West" },
  { id: "eu-east", name: "EU East" },
  { id: "asia", name: "Asia" },
];

const gameModes = {
  "Valorant": ["Competitive", "Unrated", "Spike Rush", "Deathmatch", "Custom"],
  "League of Legends": ["Ranked", "Normal", "ARAM", "TFT", "Custom"],
  "Apex Legends": ["Ranked", "Pubs", "Arena", "LTM"],
  "Overwatch 2": ["Competitive", "Quick Play", "Arcade", "Custom"],
  "CS:GO": ["Competitive", "Casual", "Deathmatch", "Arms Race", "Wingman"]
};

const Rooms = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    game: "all",
    region: "all",
    mode: "all",
    searchQuery: "",
    micRequired: false,
    hidePrivate: false,
    hideFullRooms: false,
  });
  
  // Create room form state
  const [createRoomData, setCreateRoomData] = useState({
    name: "",
    game: "valorant",
    mode: "Competitive",
    region: "na-east",
    maxPlayers: 5,
    micRequired: true,
    isPrivate: false,
  });
  
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("rankMatchToken");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    
    // Simulate loading delay
    setTimeout(() => {
      setRooms(mockRooms);
      setLoading(false);
    }, 1000);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      // For demo, we'll just shuffle the rooms
      setRooms([...mockRooms].sort(() => Math.random() - 0.5));
      setLoading(false);
      toast({
        title: "Rooms refreshed!",
        description: "Found 6 active game rooms.",
      });
    }, 1000);
  };
  
  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    toast({
      title: "Room created!",
      description: `Your room "${createRoomData.name}" has been created.`,
    });
    
    // Add the new room to the top of the list
    const newRoom = {
      id: rooms.length + 1,
      name: createRoomData.name,
      game: games.find(g => g.id === createRoomData.game)?.name || "Valorant",
      map: "Any",
      players: 1,
      maxPlayers: createRoomData.maxPlayers,
      mode: createRoomData.mode,
      region: regions.find(r => r.id === createRoomData.region)?.name || "NA East",
      private: createRoomData.isPrivate,
      micRequired: createRoomData.micRequired,
      owner: {
        name: "GamerPro99",
        avatar: "https://i.pravatar.cc/150?img=32"
      },
      createdAt: "Just now"
    };
    
    setRooms([newRoom, ...rooms]);
    
    // Reset form
    setCreateRoomData({
      name: "",
      game: "valorant",
      mode: "Competitive",
      region: "na-east",
      maxPlayers: 5,
      micRequired: true,
      isPrivate: false,
    });
  };
  
  const filteredRooms = rooms.filter(room => {
    if (filters.game !== "all" && room.game !== games.find(g => g.id === filters.game)?.name) return false;
    if (filters.region !== "all" && room.region !== regions.find(r => r.id === filters.region)?.name) return false;
    if (filters.mode !== "all" && room.mode !== filters.mode) return false;
    if (filters.searchQuery && !room.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
    if (filters.micRequired && !room.micRequired) return false;
    if (filters.hidePrivate && room.private) return false;
    if (filters.hideFullRooms && room.players >= room.maxPlayers) return false;
    return true;
  });

  const handleJoinRoom = (room: any) => {
    if (room.private) {
      toast({
        title: "This room is private",
        description: "You need an invitation to join this room.",
        variant: "destructive"
      });
      return;
    }
    
    if (room.players >= room.maxPlayers) {
      toast({
        title: "Room is full",
        description: "This room has reached its player limit.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Joined room!",
      description: `You've joined "${room.name}"`,
    });
    
    // Update player count
    const updatedRooms = rooms.map(r => 
      r.id === room.id ? { ...r, players: r.players + 1 } : r
    );
    setRooms(updatedRooms);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold neon-text mb-2">Game Rooms</h1>
            <p className="text-gray-400">Join existing rooms or create your own to find teammates</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline" className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="btn-neon">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Room
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-panel">
                <form onSubmit={handleCreateRoom}>
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold mb-2">Create Game Room</DialogTitle>
                    <DialogDescription>
                      Set up a room to find players and start playing together.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="room-name">Room Name</Label>
                      <Input 
                        id="room-name" 
                        placeholder="Enter a name for your room" 
                        className="bg-white/5 border-white/10"
                        value={createRoomData.name}
                        onChange={(e) => setCreateRoomData({...createRoomData, name: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="game">Game</Label>
                        <Select 
                          value={createRoomData.game} 
                          onValueChange={(value) => setCreateRoomData({...createRoomData, game: value})}
                        >
                          <SelectTrigger id="game" className="bg-white/5 border-white/10">
                            <SelectValue placeholder="Select a game" />
                          </SelectTrigger>
                          <SelectContent>
                            {games.map(game => (
                              <SelectItem key={game.id} value={game.id}>{game.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="mode">Game Mode</Label>
                        <Select 
                          value={createRoomData.mode} 
                          onValueChange={(value) => setCreateRoomData({...createRoomData, mode: value})}
                        >
                          <SelectTrigger id="mode" className="bg-white/5 border-white/10">
                            <SelectValue placeholder="Select mode" />
                          </SelectTrigger>
                          <SelectContent>
                            {gameModes[createRoomData.game === "valorant" ? "Valorant" : 
                                      createRoomData.game === "lol" ? "League of Legends" : 
                                      createRoomData.game === "apex" ? "Apex Legends" :
                                      createRoomData.game === "ow2" ? "Overwatch 2" : "CS:GO"]
                              .map((mode, index) => (
                                <SelectItem key={index} value={mode}>{mode}</SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="region">Region</Label>
                        <Select 
                          value={createRoomData.region} 
                          onValueChange={(value) => setCreateRoomData({...createRoomData, region: value})}
                        >
                          <SelectTrigger id="region" className="bg-white/5 border-white/10">
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent>
                            {regions.map(region => (
                              <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="max-players">Max Players</Label>
                        <Select 
                          value={String(createRoomData.maxPlayers)} 
                          onValueChange={(value) => setCreateRoomData({...createRoomData, maxPlayers: Number(value)})}
                        >
                          <SelectTrigger id="max-players" className="bg-white/5 border-white/10">
                            <SelectValue placeholder="Max players" />
                          </SelectTrigger>
                          <SelectContent>
                            {[2, 3, 4, 5, 6, 8, 10].map(num => (
                              <SelectItem key={num} value={String(num)}>{num} Players</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="mic-required" className="cursor-pointer">Microphone Required</Label>
                        <Switch 
                          id="mic-required" 
                          checked={createRoomData.micRequired} 
                          onCheckedChange={(checked) => setCreateRoomData({...createRoomData, micRequired: checked})} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="private-room" className="cursor-pointer">Private Room</Label>
                        <Switch 
                          id="private-room" 
                          checked={createRoomData.isPrivate} 
                          onCheckedChange={(checked) => setCreateRoomData({...createRoomData, isPrivate: checked})} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button type="submit" className="w-full btn-neon">
                      Create Room
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        {/* Filter Bar */}
        <div className="glass-panel p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search rooms..." 
                className="pl-8 bg-white/5 border-white/10" 
                value={filters.searchQuery}
                onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
              />
            </div>
            
            <Select 
              value={filters.game} 
              onValueChange={(value) => setFilters({...filters, game: value})}
            >
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue placeholder="Game" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Games</SelectItem>
                {games.map(game => (
                  <SelectItem key={game.id} value={game.id}>{game.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select 
              value={filters.region} 
              onValueChange={(value) => setFilters({...filters, region: value})}
            >
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {regions.map(region => (
                  <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              variant="ghost" 
              className="w-full md:w-auto"
              onClick={() => setFilters({
                game: "all",
                region: "all",
                mode: "all",
                searchQuery: "",
                micRequired: false,
                hidePrivate: false,
                hideFullRooms: false
              })}
            >
              Reset Filters
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="mic-filter" 
                className="rounded bg-white/5 border-white/20 mr-2"
                checked={filters.micRequired}
                onChange={(e) => setFilters({...filters, micRequired: e.target.checked})}
              />
              <label htmlFor="mic-filter" className="text-sm cursor-pointer">Mic Required</label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="private-filter" 
                className="rounded bg-white/5 border-white/20 mr-2"
                checked={filters.hidePrivate}
                onChange={(e) => setFilters({...filters, hidePrivate: e.target.checked})}
              />
              <label htmlFor="private-filter" className="text-sm cursor-pointer">Hide Private Rooms</label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="full-filter" 
                className="rounded bg-white/5 border-white/20 mr-2"
                checked={filters.hideFullRooms}
                onChange={(e) => setFilters({...filters, hideFullRooms: e.target.checked})}
              />
              <label htmlFor="full-filter" className="text-sm cursor-pointer">Hide Full Rooms</label>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="bg-background/80">
              <TabsTrigger value="all">All Rooms</TabsTrigger>
              <TabsTrigger value="my">My Rooms</TabsTrigger>
              <TabsTrigger value="recent">Recently Joined</TabsTrigger>
            </TabsList>
            <div className="text-sm text-gray-400">
              {filteredRooms.length} rooms found
            </div>
          </div>
          
          <TabsContent value="all" className="mt-0">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="glass-panel">
                    <CardHeader className="pb-2">
                      <div className="h-6 bg-white/5 rounded w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-white/5 rounded w-1/2 animate-pulse mt-2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-4 bg-white/5 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse"></div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="h-9 bg-white/5 rounded w-full animate-pulse"></div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.length > 0 ? filteredRooms.map((room) => (
                  <Card key={room.id} className="glass-panel overflow-hidden">
                    <div className={`h-1 ${
                      room.game === "Valorant" ? "bg-neon-blue" :
                      room.game === "League of Legends" ? "bg-neon-purple" :
                      "bg-neon-cyan"
                    }`}></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="font-semibold">
                          <div className="flex items-center gap-2">
                            {room.name}
                            {room.private && <Lock className="h-4 w-4 text-neon-yellow" />}
                          </div>
                        </CardTitle>
                        <Badge variant="outline" className="bg-white/5 border-white/10">
                          {room.mode}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <Gamepad2 className="h-3 w-3" /> {room.game}
                        {room.map !== "Any" && (
                          <>
                            <span className="mx-1">•</span>
                            <span>{room.map}</span>
                          </>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <div className="text-sm">Players</div>
                          <div className="text-sm font-medium">{room.players}/{room.maxPlayers}</div>
                        </div>
                        <div className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          room.players >= room.maxPlayers ? "bg-neon-red/10 text-neon-red" :
                          room.players >= room.maxPlayers / 2 ? "bg-neon-yellow/10 text-neon-yellow" :
                          "bg-neon-green/10 text-neon-green"
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            room.players >= room.maxPlayers ? "bg-neon-red" :
                            room.players >= room.maxPlayers / 2 ? "bg-neon-yellow" :
                            "bg-neon-green"
                          }`}></span>
                          {room.players >= room.maxPlayers ? "Full" :
                           room.players >= room.maxPlayers / 2 ? "Filling Up" :
                           "Open"
                          }
                        </div>
                      </div>
                      
                      <Progress 
                        value={(room.players / room.maxPlayers) * 100} 
                        className={`h-1.5 ${
                          room.players >= room.maxPlayers ? "bg-neon-red/20" :
                          room.players >= room.maxPlayers / 2 ? "bg-neon-yellow/20" :
                          "bg-neon-green/20"
                        }`}
                      />
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-300">{room.region}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm justify-end">
                          {room.micRequired ? (
                            <span className="flex items-center text-neon-green">
                              <MessageSquare className="h-4 w-4 mr-1" /> Mic Required
                            </span>
                          ) : (
                            <span className="flex items-center text-gray-400">
                              <MessageSquare className="h-4 w-4 mr-1" /> Mic Optional
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-4">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={room.owner.avatar} alt={room.owner.name} />
                          <AvatarFallback>{room.owner.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex items-center text-sm text-gray-400 justify-between w-full">
                          <span>Created by {room.owner.name}</span>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> {room.createdAt}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button 
                        className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90"
                        disabled={room.players >= room.maxPlayers}
                        onClick={() => handleJoinRoom(room)}
                      >
                        {room.players >= room.maxPlayers ? "Room Full" : 
                         room.private ? "Request to Join" : "Join Room"}
                      </Button>
                    </CardFooter>
                  </Card>
                )) : (
                  <div className="col-span-3 flex flex-col items-center justify-center py-12">
                    <div className="text-center">
                      <Users className="h-12 w-12 text-gray-500 mb-4 mx-auto" />
                      <h3 className="text-lg font-medium mb-1">No rooms found</h3>
                      <p className="text-gray-400 mb-6">Try adjusting your filters or create a new room</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="btn-neon">
                            <Plus className="h-4 w-4 mr-2" />
                            Create New Room
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="glass-panel">
                          {/* Same create room form as above */}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {filteredRooms.length > 6 && (
              <div className="mt-8 text-center">
                <Button variant="outline" className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10">
                  Load More Rooms
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="my" className="mt-0">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <Users className="h-12 w-12 text-gray-500 mb-4 mx-auto" />
                <h3 className="text-lg font-medium mb-1">No active rooms</h3>
                <p className="text-gray-400 mb-6">You haven't created any game rooms yet</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="btn-neon">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Room
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-panel">
                    {/* Same create room form as above */}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="mt-0">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <Clock className="h-12 w-12 text-gray-500 mb-4 mx-auto" />
                <h3 className="text-lg font-medium mb-1">No recently joined rooms</h3>
                <p className="text-gray-400 mb-6">Join some rooms to see your history here</p>
                <Button className="btn-neon">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Browse Available Rooms
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Rooms;
