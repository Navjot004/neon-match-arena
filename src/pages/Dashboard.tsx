
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Mail, Shield, Trophy, Users, Gamepad2, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock recent matches data
const recentMatches = [
  {
    id: 1,
    game: "Valorant",
    result: "Victory",
    score: "13-8",
    kda: "21/7/9",
    date: "2 hours ago",
    map: "Ascent"
  },
  {
    id: 2,
    game: "League of Legends",
    result: "Defeat",
    score: "32-41",
    kda: "8/5/13",
    date: "Yesterday",
    map: "Summoner's Rift"
  },
  {
    id: 3,
    game: "Apex Legends",
    result: "Top 3",
    score: "#3",
    kda: "6/2/2",
    date: "2 days ago",
    map: "World's Edge"
  }
];

// Mock active tournaments
const tournaments = [
  {
    id: 1,
    name: "Valorant Weekly Cup",
    participants: 64,
    prize: "$500",
    status: "Registering",
    date: "Starts in 2 days"
  },
  {
    id: 2,
    name: "LoL Championship",
    participants: 32,
    prize: "$1,200",
    status: "In Progress",
    date: "Live Now"
  }
];

// Mock friend activity
const friendActivity = [
  {
    id: 1,
    name: "KingSlayer42",
    game: "Valorant",
    status: "In Match",
    avatar: "https://i.pravatar.cc/150?img=33"
  },
  {
    id: 2,
    name: "NinjaGamer",
    game: "Apex Legends",
    status: "In Lobby",
    avatar: "https://i.pravatar.cc/150?img=13"
  },
  {
    id: 3,
    name: "ProSniper",
    game: "Overwatch 2",
    status: "Online",
    avatar: "https://i.pravatar.cc/150?img=53"
  }
];

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("rankMatchToken");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    
    // Get user data
    const userData = localStorage.getItem("rankMatchUser");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Show welcome toast
    toast({
      title: "Welcome back!",
      description: "You have 3 new match notifications.",
    });
  }, [toast]);
  
  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-neon-blue">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback className="bg-neon-blue/10">{user.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {user.username}!</h1>
              <p className="text-gray-400">Ready to find your perfect squad today?</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/matchmaking">
              <Button className="btn-neon">Find Players Now</Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-panel">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Users className="h-8 w-8 text-neon-blue mb-2" />
              <p className="text-sm text-gray-400">Total Matches</p>
              <p className="text-2xl font-bold">248</p>
            </CardContent>
          </Card>
          
          <Card className="glass-panel">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Trophy className="h-8 w-8 text-neon-purple mb-2" />
              <p className="text-sm text-gray-400">Tournaments</p>
              <p className="text-2xl font-bold">16</p>
            </CardContent>
          </Card>
          
          <Card className="glass-panel">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Mail className="h-8 w-8 text-neon-cyan mb-2" />
              <p className="text-sm text-gray-400">Messages</p>
              <p className="text-2xl font-bold">12</p>
            </CardContent>
          </Card>
          
          <Card className="glass-panel">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Shield className="h-8 w-8 text-neon-green mb-2" />
              <p className="text-sm text-gray-400">Win Rate</p>
              <p className="text-2xl font-bold">67%</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Matches */}
          <div className="col-span-1 lg:col-span-2">
            <Card className="glass-panel h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Gamepad2 className="mr-2 h-5 w-5 text-neon-blue" />
                  Recent Matches
                </CardTitle>
                <Link to="/matches" className="text-sm text-neon-blue hover:underline flex items-center">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMatches.map((match) => (
                    <div 
                      key={match.id} 
                      className={`p-3 rounded-lg border flex justify-between items-center
                        ${match.result === "Victory" ? "border-neon-green/30 bg-neon-green/5" : 
                          match.result === "Defeat" ? "border-neon-red/30 bg-neon-red/5" : 
                          "border-neon-yellow/30 bg-neon-yellow/5"}`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{match.game}</span>
                          <span className="text-xs bg-black/30 px-2 py-0.5 rounded">{match.map}</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          {match.result} • {match.score} • {match.date}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {match.result === "Victory" ? 
                            <span className="text-neon-green">Win</span> : 
                            match.result === "Defeat" ? 
                            <span className="text-neon-red">Loss</span> : 
                            <span className="text-neon-yellow">Top 3</span>
                          }
                        </div>
                        <div className="text-xs text-gray-400">KDA: {match.kda}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column */}
          <div className="col-span-1 space-y-6">
            {/* Active Tournaments */}
            <Card className="glass-panel">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-neon-purple" />
                  Tournaments
                </CardTitle>
                <Link to="/tournaments" className="text-sm text-neon-purple hover:underline flex items-center">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tournaments.map((tournament) => (
                    <div key={tournament.id} className="p-3 rounded-lg border border-white/10 bg-white/5">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{tournament.name}</h4>
                        <div className="text-neon-yellow">{tournament.prize}</div>
                      </div>
                      <div className="mt-1 flex justify-between text-sm text-gray-400">
                        <div>{tournament.participants} Teams</div>
                        <div className={tournament.status === "In Progress" ? "text-neon-green" : "text-neon-blue"}>
                          {tournament.status}
                        </div>
                      </div>
                      <div className="mt-3">
                        <Button variant="outline" size="sm" className="w-full text-neon-purple border-neon-purple/30 hover:bg-neon-purple/10">
                          {tournament.status === "In Progress" ? "View Matches" : "Register Now"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Friend Activity */}
            <Card className="glass-panel">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Users className="mr-2 h-5 w-5 text-neon-cyan" />
                  Friend Activity
                </CardTitle>
                <Link to="/friends" className="text-sm text-neon-cyan hover:underline flex items-center">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {friendActivity.map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 border border-white/20">
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{friend.name}</div>
                          <div className="text-xs text-gray-400">{friend.game}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <div className={`h-2 w-2 rounded-full ${
                          friend.status === "In Match" ? "bg-neon-green" : 
                          friend.status === "In Lobby" ? "bg-neon-yellow" : "bg-neon-blue"
                        }`}></div>
                        <span className="text-gray-400">{friend.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-4 text-neon-cyan">
                  Find More Friends
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Upcoming Events */}
          <Card className="glass-panel">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold flex items-center">
                <CalendarDays className="mr-2 h-5 w-5 text-neon-blue" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-3 rounded-lg border border-white/10 bg-white/5">
                  <div className="bg-neon-blue/20 h-12 w-12 rounded flex flex-col items-center justify-center mr-4">
                    <span className="text-xs text-gray-300">APR</span>
                    <span className="font-bold text-neon-blue">12</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Valorant Community Cup</h4>
                    <p className="text-sm text-gray-400">Registration closes in 2 days</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10">
                    Register
                  </Button>
                </div>
                <div className="flex items-center p-3 rounded-lg border border-white/10 bg-white/5">
                  <div className="bg-neon-purple/20 h-12 w-12 rounded flex flex-col items-center justify-center mr-4">
                    <span className="text-xs text-gray-300">APR</span>
                    <span className="font-bold text-neon-purple">15</span>
                  </div>
                  <div>
                    <h4 className="font-medium">League of Legends Clash</h4>
                    <p className="text-sm text-gray-400">Team-based tournament</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto border-neon-purple/30 text-neon-purple hover:bg-neon-purple/10">
                    Join
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Performance Stats */}
          <Card className="glass-panel">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-neon-green" />
                Performance Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Win Rate */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Win Rate</span>
                    <span className="text-sm font-medium">67%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded">
                    <div className="h-2 bg-gradient-to-r from-neon-blue to-neon-green rounded" style={{ width: "67%" }}></div>
                  </div>
                </div>
                
                {/* Kill/Death Ratio */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">K/D Ratio</span>
                    <span className="text-sm font-medium">1.8</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded">
                    <div className="h-2 bg-gradient-to-r from-neon-purple to-neon-pink rounded" style={{ width: "75%" }}></div>
                  </div>
                </div>
                
                {/* Average Score */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Avg. Score</span>
                    <span className="text-sm font-medium">18.5k</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded">
                    <div className="h-2 bg-gradient-to-r from-neon-cyan to-neon-blue rounded" style={{ width: "82%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
