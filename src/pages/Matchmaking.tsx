
import { useState, useEffect } from "react";
import { 
  ArrowRight, Filter, MapPin, Mic, RefreshCw, Search, Shield, ThumbsUp, User, Gamepad2 
} from "lucide-react";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

// Mock player data
const mockPlayers = [
  {
    id: 1,
    name: "KingSlayer42",
    avatar: "https://i.pravatar.cc/150?img=33",
    game: "Valorant",
    rank: "Diamond 2",
    role: "Duelist",
    region: "NA East",
    compatible: 92,
    hasMic: true,
    online: true,
    playtimes: ["Evenings", "Weekends"],
    playStyle: ["Aggressive", "Team-oriented"]
  },
  {
    id: 2,
    name: "NinjaGamer",
    avatar: "https://i.pravatar.cc/150?img=13",
    game: "Valorant",
    rank: "Diamond 1",
    role: "Sentinel",
    region: "NA East",
    compatible: 87,
    hasMic: true,
    online: true,
    playtimes: ["Nights", "Weekends"],
    playStyle: ["Strategic", "Communicative"]
  },
  {
    id: 3,
    name: "ProSniper",
    avatar: "https://i.pravatar.cc/150?img=53",
    game: "Valorant",
    rank: "Platinum 3",
    role: "Initiator",
    region: "EU West",
    compatible: 78,
    hasMic: true,
    online: false,
    playtimes: ["Afternoons", "Weekends"],
    playStyle: ["Defensive", "Support-focused"]
  },
  {
    id: 4,
    name: "FragMaster",
    avatar: "https://i.pravatar.cc/150?img=23",
    game: "Valorant",
    rank: "Diamond 3",
    role: "Controller",
    region: "NA East",
    compatible: 85,
    hasMic: false,
    online: true,
    playtimes: ["Evenings", "Nights"],
    playStyle: ["Aggressive", "Solo-carry"]
  },
  {
    id: 5,
    name: "ValorantPro",
    avatar: "https://i.pravatar.cc/150?img=43",
    game: "Valorant",
    rank: "Immortal 1",
    role: "Duelist",
    region: "NA West",
    compatible: 72,
    hasMic: true,
    online: true,
    playtimes: ["Morning", "Nights"],
    playStyle: ["Strategic", "Team-oriented"]
  },
  {
    id: 6,
    name: "HeadshotQueen",
    avatar: "https://i.pravatar.cc/150?img=60",
    game: "League of Legends",
    rank: "Platinum 1",
    role: "Mid",
    region: "NA East",
    compatible: 88,
    hasMic: true,
    online: true,
    playtimes: ["Evenings", "Weekends"],
    playStyle: ["Aggressive", "Roaming"]
  },
  {
    id: 7,
    name: "JungleKing",
    avatar: "https://i.pravatar.cc/150?img=67",
    game: "League of Legends",
    rank: "Diamond 4",
    role: "Jungle",
    region: "EU West",
    compatible: 81,
    hasMic: true,
    online: false,
    playtimes: ["Nights", "Weekends"],
    playStyle: ["Objective-focused", "Ganking"]
  },
  {
    id: 8,
    name: "TopLaner99",
    avatar: "https://i.pravatar.cc/150?img=48",
    game: "League of Legends",
    rank: "Diamond 2",
    role: "Top",
    region: "NA West",
    compatible: 76,
    hasMic: false,
    online: true,
    playtimes: ["Afternoons", "Evenings"],
    playStyle: ["Split-push", "Defensive"]
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

// Mock roles data
const roles = {
  "Valorant": ["Duelist", "Controller", "Sentinel", "Initiator"],
  "League of Legends": ["Top", "Jungle", "Mid", "ADC", "Support"],
  "Apex Legends": ["Assault", "Recon", "Support", "Defense"],
  "Overwatch 2": ["Tank", "Damage", "Support"],
  "CS:GO": ["Entry Fragger", "AWPer", "Support", "Lurker", "IGL"],
};

const Matchmaking = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState<any[]>([]);
  const [selectedGame, setSelectedGame] = useState("valorant");
  const [filters, setFilters] = useState({
    region: "all",
    role: "all",
    rank: 75, // Min rank percentile
    onlineOnly: true,
    micRequired: false,
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
      setPlayers(mockPlayers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulate API call for new players
      // For demo, we'll just randomize the compatibility scores
      const updatedPlayers = mockPlayers.map(player => ({
        ...player,
        compatible: Math.floor(Math.random() * 30) + 70 // 70-99% compatibility
      }));
      setPlayers(updatedPlayers);
      setLoading(false);
      toast({
        title: "Matches refreshed!",
        description: "Found 8 potential teammates for you.",
      });
    }, 1000);
  };
  
  const filteredPlayers = players.filter(player => {
    if (filters.onlineOnly && !player.online) return false;
    if (filters.micRequired && !player.hasMic) return false;
    if (filters.region !== "all" && player.region !== regions.find(r => r.id === filters.region)?.name) return false;
    if (filters.role !== "all" && player.role !== filters.role) return false;
    if (player.compatible < filters.rank) return false;
    return true;
  });

  const handleInvite = (player: any) => {
    toast({
      title: "Invitation sent!",
      description: `We've sent your invitation to ${player.name}.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold neon-text mb-2">Find Your Perfect Squad</h1>
            <p className="text-gray-400">Connect with players who match your skill level and play style</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline" className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button className="btn-neon">
              <Search className="h-4 w-4 mr-2" />
              Advanced Search
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Panel */}
          <div className="lg:col-span-1">
            <Card className="glass-panel sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Filter className="mr-2 h-5 w-5 text-neon-blue" />
                  Filters
                </CardTitle>
                <CardDescription>
                  Narrow down your perfect teammates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Game Selection */}
                <div className="space-y-2">
                  <Label>Game</Label>
                  <Select 
                    value={selectedGame} 
                    onValueChange={setSelectedGame}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="Select a game" />
                    </SelectTrigger>
                    <SelectContent>
                      {games.map(game => (
                        <SelectItem key={game.id} value={game.id}>{game.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Region Filter */}
                <div className="space-y-2">
                  <Label>Region</Label>
                  <Select 
                    value={filters.region} 
                    onValueChange={(value) => setFilters({...filters, region: value})}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="Select a region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      {regions.map(region => (
                        <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Role Filter */}
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select 
                    value={filters.role} 
                    onValueChange={(value) => setFilters({...filters, role: value})}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      {roles[selectedGame === "valorant" ? "Valorant" : 
                             selectedGame === "lol" ? "League of Legends" : 
                             selectedGame === "apex" ? "Apex Legends" :
                             selectedGame === "ow2" ? "Overwatch 2" : "CS:GO"]?.map((role, index) => (
                        <SelectItem key={index} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Compatibility Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Min. Compatibility</Label>
                    <span className="text-sm font-medium text-neon-blue">{filters.rank}%</span>
                  </div>
                  <Slider 
                    value={[filters.rank]} 
                    min={50} 
                    max={100} 
                    step={5} 
                    onValueChange={([value]) => setFilters({...filters, rank: value})} 
                    className="[&_[role=slider]]:shadow-md [&_[role=slider]]:shadow-neon-blue/50"
                  />
                </div>
                
                {/* Toggle Filters */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="online-toggle" className="cursor-pointer">Online Players Only</Label>
                    <Switch 
                      id="online-toggle" 
                      checked={filters.onlineOnly} 
                      onCheckedChange={(checked) => setFilters({...filters, onlineOnly: checked})} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="mic-toggle" className="cursor-pointer">Microphone Required</Label>
                    <Switch 
                      id="mic-toggle" 
                      checked={filters.micRequired} 
                      onCheckedChange={(checked) => setFilters({...filters, micRequired: checked})} 
                    />
                  </div>
                </div>
                
                {/* Search by Name */}
                <div className="space-y-2">
                  <Label>Search Player</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Player name or tag" className="pl-8 bg-white/5 border-white/10" />
                  </div>
                </div>
                
                {/* Clear Filters */}
                <Button 
                  variant="ghost" 
                  className="w-full mt-2" 
                  onClick={() => setFilters({
                    region: "all",
                    role: "all",
                    rank: 75,
                    onlineOnly: true,
                    micRequired: false,
                  })}
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Players Grid */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="recommended">
              <div className="flex justify-between items-center mb-6">
                <TabsList className="bg-background/80">
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                  <TabsTrigger value="recent">Recently Played With</TabsTrigger>
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                </TabsList>
                <div className="text-sm text-gray-400">
                  {filteredPlayers.length} players found
                </div>
              </div>
              
              <TabsContent value="recommended" className="mt-0">
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                      <Card key={i} className="glass-panel">
                        <CardContent className="p-6 flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-white/5 animate-pulse"></div>
                          <div className="space-y-2 flex-1">
                            <div className="h-4 bg-white/5 rounded w-1/3 animate-pulse"></div>
                            <div className="h-3 bg-white/5 rounded w-1/2 animate-pulse"></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPlayers.length > 0 ? filteredPlayers.map((player) => (
                      <Card key={player.id} className="glass-panel overflow-hidden">
                        <div className={`h-2 ${
                          player.compatible > 90 ? "bg-neon-green" :
                          player.compatible > 80 ? "bg-neon-blue" : "bg-neon-purple"
                        }`}></div>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <Avatar className="h-16 w-16 border-2 border-neon-blue/30">
                                  <AvatarImage src={player.avatar} alt={player.name} />
                                  <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {player.online && (
                                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-neon-green ring-2 ring-background"></span>
                                )}
                              </div>
                              <div>
                                <h3 className="font-medium">{player.name}</h3>
                                <div className="flex items-center gap-1 text-sm text-gray-400">
                                  <Gamepad2 className="h-3 w-3" />
                                  <span>{player.game}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold neon-text">{player.compatible}%</div>
                              <div className="text-xs text-gray-400">Compatible</div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-white/5 p-2 rounded text-center">
                              <div className="text-xs text-gray-400">Rank</div>
                              <div className="font-medium">{player.rank}</div>
                            </div>
                            <div className="bg-white/5 p-2 rounded text-center">
                              <div className="text-xs text-gray-400">Role</div>
                              <div className="font-medium">{player.role}</div>
                            </div>
                            <div className="bg-white/5 p-2 rounded flex items-center justify-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <div className="font-medium">{player.region}</div>
                            </div>
                            <div className="bg-white/5 p-2 rounded flex items-center justify-center gap-2">
                              <Mic className={`h-4 w-4 ${player.hasMic ? "text-neon-green" : "text-gray-400"}`} />
                              <div className="font-medium">{player.hasMic ? "Has Mic" : "No Mic"}</div>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="text-sm text-gray-400 mb-2">Play Style</div>
                            <div className="flex flex-wrap gap-2">
                              {player.playStyle.map((style, idx) => (
                                <Badge key={idx} variant="secondary" className="bg-white/5">{style}</Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              className="flex-1 bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90"
                              onClick={() => handleInvite(player)}
                            >
                              Invite to Party
                            </Button>
                            <Button variant="outline" size="icon" className="border-white/10">
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )) : (
                      <div className="col-span-2 flex flex-col items-center justify-center py-12">
                        <div className="text-center">
                          <User className="h-12 w-12 text-gray-500 mb-4 mx-auto" />
                          <h3 className="text-lg font-medium mb-1">No players found</h3>
                          <p className="text-gray-400 mb-6">Try adjusting your filters to see more results</p>
                          <Button onClick={() => setFilters({
                            region: "all",
                            role: "all", 
                            rank: 75,
                            onlineOnly: true,
                            micRequired: false,
                          })}>
                            Reset Filters
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {filteredPlayers.length > 0 && (
                  <div className="mt-8 text-center">
                    <Button variant="outline" className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10">
                      Load More Players
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="recent" className="mt-0">
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-center">
                    <Shield className="h-12 w-12 text-gray-500 mb-4 mx-auto" />
                    <h3 className="text-lg font-medium mb-1">No recent players</h3>
                    <p className="text-gray-400 mb-6">Start playing games to build your recent players list</p>
                    <Button className="btn-neon">
                      <ArrowRight className="h-4 w-4 mr-2" /> 
                      Find Matches Now
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="favorites" className="mt-0">
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-center">
                    <Shield className="h-12 w-12 text-gray-500 mb-4 mx-auto" />
                    <h3 className="text-lg font-medium mb-1">No favorite players</h3>
                    <p className="text-gray-400 mb-6">Add players to your favorites to see them here</p>
                    <Button className="btn-neon">
                      <ArrowRight className="h-4 w-4 mr-2" /> 
                      Find Players Now
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Matchmaking;
