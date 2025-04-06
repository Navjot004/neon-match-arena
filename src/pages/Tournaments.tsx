
import { useState, useEffect } from "react";
import { 
  Calendar, Clock, Trophy, Users, Shield, Swords, CalendarDays, Medal, 
  ChevronRight, Filter, ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticlesBackground from "@/components/ParticlesBackground";

// Mock tournaments data
const mockTournaments = [
  {
    id: 1,
    name: "Valorant Weekly Cup",
    game: "Valorant",
    type: "5v5",
    prize: "$500",
    participants: 32,
    maxParticipants: 64,
    date: "April 10, 2025",
    time: "6:00 PM EST",
    status: "registering",
    region: "NA",
    skill: "All Ranks",
    description: "Weekly Valorant tournament for players of all skill levels. Sign up with your team or join as a solo player to be matched with a team.",
    organizer: "RankMatch"
  },
  {
    id: 2,
    name: "League of Legends Championship",
    game: "League of Legends",
    type: "5v5",
    prize: "$1,000",
    participants: 16,
    maxParticipants: 32,
    date: "April 15, 2025",
    time: "7:00 PM EST",
    status: "registering",
    region: "NA/EU",
    skill: "Diamond+",
    description: "Monthly League of Legends tournament for high-ranked players. Teams must have an average rank of Diamond or higher.",
    organizer: "RankMatch"
  },
  {
    id: 3,
    name: "Apex Predator Showdown",
    game: "Apex Legends",
    type: "Trio",
    prize: "$750",
    participants: 20,
    maxParticipants: 20,
    date: "April 8, 2025",
    time: "5:00 PM EST",
    status: "in_progress",
    region: "NA",
    skill: "All Ranks",
    description: "Intense Apex Legends tournament with custom lobbies and scoring. Top 3 teams will receive cash prizes.",
    organizer: "RankMatch"
  },
  {
    id: 4,
    name: "CS:GO Masters",
    game: "CS:GO",
    type: "5v5",
    prize: "$1,500",
    participants: 8,
    maxParticipants: 16,
    date: "April 20, 2025",
    time: "4:00 PM EST",
    status: "registering",
    region: "EU",
    skill: "All Ranks",
    description: "CS:GO tournament with competitive ruleset. Teams will play in a double-elimination bracket.",
    organizer: "RankMatch"
  },
  {
    id: 5,
    name: "Overwatch 2 Cup",
    game: "Overwatch 2",
    type: "5v5",
    prize: "$300",
    participants: 12,
    maxParticipants: 16,
    date: "April 12, 2025",
    time: "3:00 PM EST",
    status: "registering",
    region: "NA",
    skill: "All Ranks",
    description: "Overwatch 2 tournament with map picks and bans. Teams must have at least 5 players registered.",
    organizer: "RankMatch"
  },
  {
    id: 6,
    name: "Valorant Pro League",
    game: "Valorant",
    type: "5v5",
    prize: "$3,000",
    participants: 8,
    maxParticipants: 8,
    date: "April 5, 2025",
    time: "1:00 PM EST",
    status: "completed",
    region: "Global",
    skill: "Immortal+",
    description: "Professional Valorant tournament for top-ranked players. Invitation only with strict eligibility requirements.",
    organizer: "RankMatch Pro League"
  },
];

// Mock games data
const games = [
  { id: "all", name: "All Games" },
  { id: "valorant", name: "Valorant" },
  { id: "lol", name: "League of Legends" },
  { id: "apex", name: "Apex Legends" },
  { id: "csgo", name: "CS:GO" },
  { id: "ow2", name: "Overwatch 2" },
];

// Mock regions
const regions = [
  { id: "all", name: "All Regions" },
  { id: "na", name: "North America" },
  { id: "eu", name: "Europe" },
  { id: "asia", name: "Asia" },
  { id: "global", name: "Global" },
];

const Tournaments = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    game: "all",
    region: "all",
    status: "all",
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
      setTournaments(mockTournaments);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredTournaments = tournaments.filter(tournament => {
    if (filters.game !== "all" && tournament.game !== games.find(g => g.id === filters.game)?.name) return false;
    if (filters.region !== "all" && !tournament.region.includes(filters.region.toUpperCase())) return false;
    if (filters.status !== "all" && tournament.status !== filters.status) return false;
    return true;
  });

  const handleRegister = (tournament: any) => {
    if (tournament.status === "completed") {
      toast({
        title: "Tournament completed",
        description: "This tournament has already ended.",
        variant: "destructive"
      });
      return;
    }
    
    if (tournament.status === "in_progress") {
      toast({
        title: "Tournament in progress",
        description: "This tournament has already started.",
        variant: "destructive"
      });
      return;
    }
    
    if (tournament.participants >= tournament.maxParticipants) {
      toast({
        title: "Tournament full",
        description: "This tournament has reached its participant limit.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Registration successful!",
      description: `You've registered for "${tournament.name}"`,
    });
    
    // Update participant count
    const updatedTournaments = tournaments.map(t => 
      t.id === tournament.id ? { ...t, participants: t.participants + 1 } : t
    );
    setTournaments(updatedTournaments);
  };

  const getTournamentStatusColor = (status: string) => {
    switch (status) {
      case "registering":
        return "bg-neon-blue/10 text-neon-blue";
      case "in_progress":
        return "bg-neon-green/10 text-neon-green";
      case "completed":
        return "bg-gray-500/10 text-gray-400";
      default:
        return "bg-neon-purple/10 text-neon-purple";
    }
  };

  const getTournamentStatusText = (status: string) => {
    switch (status) {
      case "registering":
        return "Registering";
      case "in_progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };
  
  const getButtonText = (tournament: any) => {
    switch (tournament.status) {
      case "registering":
        return tournament.participants >= tournament.maxParticipants ? "Full" : "Register";
      case "in_progress":
        return "View Matches";
      case "completed":
        return "View Results";
      default:
        return "Details";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ParticlesBackground />
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold neon-text mb-2">Tournaments</h1>
            <p className="text-gray-400">Register for upcoming tournaments or check the results of past events</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="btn-neon">
              Create Tournament
            </Button>
          </div>
        </div>
        
        {/* Featured Tournament */}
        <div className="glass-panel rounded-lg overflow-hidden mb-8">
          <div className="relative h-48 md:h-64 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-6">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="bg-neon-purple/20 text-neon-purple border-neon-purple/40">Featured</Badge>
                <Badge variant="outline" className="bg-white/10">Valorant</Badge>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-1">Valorant World Championship</h2>
              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-neon-yellow" />
                  <span>$10,000 Prize Pool</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>May 15, 2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>64 Teams</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  <span>Global</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="max-w-2xl">
              <p className="text-gray-300">
                The biggest Valorant tournament of the year, bringing together the best teams from around the world to compete for glory and a massive prize pool.
              </p>
            </div>
            <Button className="btn-neon">
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Filter Bar */}
        <div className="glass-panel p-4 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="h-4 w-4 text-neon-blue" />
            <span className="font-medium">Filter Tournaments</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select 
              value={filters.game} 
              onValueChange={(value) => setFilters({...filters, game: value})}
            >
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue placeholder="Game" />
              </SelectTrigger>
              <SelectContent>
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
                {regions.map(region => (
                  <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select 
              value={filters.status} 
              onValueChange={(value) => setFilters({...filters, status: value})}
            >
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="registering">Registering</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming" className="px-6">Upcoming</TabsTrigger>
            <TabsTrigger value="registered" className="px-6">Registered</TabsTrigger>
            <TabsTrigger value="past" className="px-6">Past Tournaments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-0">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTournaments.filter(t => t.status !== "completed").length > 0 ? 
                  filteredTournaments
                    .filter(t => t.status !== "completed")
                    .map((tournament) => (
                      <Card key={tournament.id} className="glass-panel overflow-hidden">
                        <div className="h-1 bg-gradient-to-r from-neon-blue to-neon-purple"></div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="font-semibold">{tournament.name}</CardTitle>
                              <CardDescription className="flex items-center gap-2">
                                <span>{tournament.game}</span>
                                <span className="text-xs mx-1">•</span>
                                <span>{tournament.type}</span>
                              </CardDescription>
                            </div>
                            <Badge variant="outline" className={getTournamentStatusColor(tournament.status)}>
                              {getTournamentStatusText(tournament.status)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Trophy className="h-4 w-4 text-neon-yellow" />
                              <span className="text-neon-yellow font-medium">{tournament.prize}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-gray-400" />
                              <span>{tournament.skill}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CalendarDays className="h-4 w-4 text-gray-400" />
                              <span>{tournament.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span>{tournament.time}</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                            {tournament.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-sm">
                              <span className="text-gray-400">Teams: </span>
                              <span className="font-medium">{tournament.participants}/{tournament.maxParticipants}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-400">Region: </span>
                              <span className="font-medium">{tournament.region}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-400">By: </span>
                              <span className="font-medium">{tournament.organizer}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button 
                            className={`w-full ${
                              tournament.status === "completed" ? "bg-gray-600 hover:bg-gray-700" :
                              tournament.status === "in_progress" ? "bg-neon-green hover:bg-neon-green/90" :
                              tournament.participants >= tournament.maxParticipants ? "bg-gray-600 hover:bg-gray-700" :
                              "bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90"
                            }`}
                            disabled={tournament.status === "completed" || 
                                     (tournament.status === "registering" && tournament.participants >= tournament.maxParticipants)}
                            onClick={() => handleRegister(tournament)}
                          >
                            {getButtonText(tournament)}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  : (
                    <div className="col-span-2 flex flex-col items-center justify-center py-12">
                      <div className="text-center">
                        <Calendar className="h-12 w-12 text-gray-500 mb-4 mx-auto" />
                        <h3 className="text-lg font-medium mb-1">No upcoming tournaments</h3>
                        <p className="text-gray-400 mb-6">No tournaments match your filter criteria</p>
                        <Button 
                          onClick={() => setFilters({game: "all", region: "all", status: "all"})}
                          className="bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90"
                        >
                          View All Tournaments
                        </Button>
                      </div>
                    </div>
                  )
                }
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="registered" className="mt-0">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <Medal className="h-12 w-12 text-gray-500 mb-4 mx-auto" />
                <h3 className="text-lg font-medium mb-1">No registered tournaments</h3>
                <p className="text-gray-400 mb-6">You haven't registered for any tournaments yet</p>
                <Button className="bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90">
                  <ArrowRight className="h-4 w-4 mr-2" /> 
                  Browse Tournaments
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="past" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTournaments.filter(t => t.status === "completed").length > 0 ? 
                filteredTournaments
                  .filter(t => t.status === "completed")
                  .map((tournament) => (
                    <Card key={tournament.id} className="glass-panel overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="font-semibold">{tournament.name}</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              <span>{tournament.game}</span>
                              <span className="text-xs mx-1">•</span>
                              <span>{tournament.type}</span>
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className={getTournamentStatusColor(tournament.status)}>
                            {getTournamentStatusText(tournament.status)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-neon-yellow" />
                            <span className="text-neon-yellow font-medium">{tournament.prize}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-gray-400" />
                            <span>{tournament.skill}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-gray-400" />
                            <span>{tournament.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>{tournament.time}</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-sm mb-2">
                            <span className="font-medium">Winners:</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-neon-yellow">
                              <Medal className="h-5 w-5" />
                              <span className="font-medium">Team Apex</span>
                            </div>
                            <div className="h-4 w-px bg-gray-700"></div>
                            <div className="text-sm text-gray-400">
                              View Bracket
                              <ChevronRight className="inline-block h-3 w-3 ml-1" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="text-gray-400">Teams: </span>
                            <span className="font-medium">{tournament.participants}/{tournament.maxParticipants}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-400">Region: </span>
                            <span className="font-medium">{tournament.region}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-400">By: </span>
                            <span className="font-medium">{tournament.organizer}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button 
                          className="w-full bg-gray-600 hover:bg-gray-700"
                        >
                          View Results
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                : (
                  <div className="col-span-2 flex flex-col items-center justify-center py-12">
                    <div className="text-center">
                      <Swords className="h-12 w-12 text-gray-500 mb-4 mx-auto" />
                      <h3 className="text-lg font-medium mb-1">No past tournaments</h3>
                      <p className="text-gray-400 mb-6">Check back later for completed tournament results</p>
                      <Button className="bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90">
                        View Upcoming Tournaments
                      </Button>
                    </div>
                  </div>
                )
              }
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tournaments;
