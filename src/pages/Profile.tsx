
import { useState, useEffect } from "react";
import { Edit, MessageSquare, Trophy, User, UserPlus, Users, Medal, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock user data
const mockUserData = {
  username: "GamerPro99",
  level: 42,
  joinDate: "January 2023",
  bio: "Competitive gamer from NY. I main Jett in Valorant and jungle in LoL. Looking for serious teams to climb ranks!",
  stats: {
    matches: 432,
    winRate: "67%",
    kdRatio: 1.8,
    headshots: "24%",
    tournaments: 16,
    tournamentWins: 3,
  },
  games: [
    {
      name: "Valorant",
      role: "Duelist",
      rank: "Diamond 2",
      rankImage: "https://trackercdn.com/cdn/tracker.gg/valorant/icons/tiersv2/23.png",
      playTime: "342h",
      mainAgent: "Jett",
      winRate: "71%"
    },
    {
      name: "League of Legends",
      role: "Jungle",
      rank: "Platinum 1",
      rankImage: "https://opgg-static.akamaized.net/images/medals/platinum_1.png",
      playTime: "213h",
      mainAgent: "Lee Sin",
      winRate: "62%"
    },
    {
      name: "Apex Legends",
      role: "DPS",
      rank: "Diamond",
      rankImage: "https://trackercdn.com/cdn/apex.tracker.gg/ranks/diamond.png",
      playTime: "189h",
      mainAgent: "Wraith",
      winRate: "58%"
    }
  ],
  achievements: [
    {
      name: "Ranked Warrior",
      description: "Win 100 ranked matches",
      date: "Mar 2023",
      rarity: "Uncommon",
      icon: <Trophy className="w-5 h-5 text-gold" />
    },
    {
      name: "Tournament Champion",
      description: "Win a RankMatch tournament",
      date: "Feb 2023",
      rarity: "Rare",
      icon: <Medal className="w-5 h-5 text-neon-purple" />
    },
    {
      name: "Headshot Expert",
      description: "Achieve 30% headshot rate in 50 matches",
      date: "Jan 2023", 
      rarity: "Epic",
      icon: <Star className="w-5 h-5 text-neon-cyan" />
    }
  ],
  friends: [
    { id: 1, name: "NinjaSniper", avatar: "https://i.pravatar.cc/150?img=33", status: "Online" },
    { id: 2, name: "FragMaster", avatar: "https://i.pravatar.cc/150?img=13", status: "In Match" },
    { id: 3, name: "ValorantGod", avatar: "https://i.pravatar.cc/150?img=53", status: "Offline" },
    { id: 4, name: "HeadshotQueen", avatar: "https://i.pravatar.cc/150?img=23", status: "In Lobby" },
    { id: 5, name: "ProGamer123", avatar: "https://i.pravatar.cc/150?img=43", status: "Online" }
  ]
};

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState(mockUserData);
  
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("rankMatchToken");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    
    // Get user data
    const storedUser = localStorage.getItem("rankMatchUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Profile Header */}
        <div className="relative h-48 md:h-64 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute top-4 right-4 bg-black/50 border-white/20"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-start relative -mt-16 md:-mt-20">
            {/* Left Column - User Details */}
            <div className="w-full md:w-1/3 lg:w-1/4 z-10">
              <Card className="glass-panel overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6 text-center">
                    <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-background">
                      <AvatarImage src={user.avatar} alt={userData.username} />
                      <AvatarFallback className="bg-neon-blue/20 text-neon-blue text-2xl">
                        {userData.username.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                      <h1 className="text-2xl font-bold">{userData.username}</h1>
                      <div className="flex items-center justify-center gap-1 text-sm text-gray-400">
                        <span className="inline-flex items-center gap-1 bg-neon-blue/20 px-2 py-0.5 rounded-full">
                          <span className="h-2 w-2 rounded-full bg-neon-blue"></span>
                          Level {userData.level}
                        </span>
                        <span className="mx-1">•</span>
                        <span>Member since {userData.joinDate}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-center gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1 border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 border-neon-purple/30 text-neon-purple hover:bg-neon-purple/10">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Friend
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/10 p-6">
                    <p className="text-sm text-gray-300">{userData.bio}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="flex flex-col items-center p-3 rounded-lg bg-white/5">
                        <span className="text-neon-blue text-2xl font-bold">{userData.stats.matches}</span>
                        <span className="text-xs text-gray-400">Matches</span>
                      </div>
                      <div className="flex flex-col items-center p-3 rounded-lg bg-white/5">
                        <span className="text-neon-purple text-2xl font-bold">{userData.stats.winRate}</span>
                        <span className="text-xs text-gray-400">Win Rate</span>
                      </div>
                      <div className="flex flex-col items-center p-3 rounded-lg bg-white/5">
                        <span className="text-neon-cyan text-2xl font-bold">{userData.stats.kdRatio}</span>
                        <span className="text-xs text-gray-400">K/D Ratio</span>
                      </div>
                      <div className="flex flex-col items-center p-3 rounded-lg bg-white/5">
                        <span className="text-neon-green text-2xl font-bold">{userData.stats.tournaments}</span>
                        <span className="text-xs text-gray-400">Tournaments</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/10 p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-neon-blue" />
                      Friends ({userData.friends.length})
                    </h3>
                    
                    <div className="space-y-3">
                      {userData.friends.map((friend) => (
                        <div key={friend.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={friend.avatar} alt={friend.name} />
                              <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{friend.name}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <span className={`h-2 w-2 rounded-full ${
                              friend.status === "Online" ? "bg-neon-green" :
                              friend.status === "In Match" ? "bg-neon-red" :
                              friend.status === "In Lobby" ? "bg-neon-yellow" : "bg-gray-500"
                            }`}></span>
                            <span className="text-gray-400">{friend.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="ghost" size="sm" className="w-full mt-4 text-neon-blue">
                      View All Friends
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right Column - Tabbed Content */}
            <div className="w-full md:w-2/3 lg:w-3/4">
              <Tabs defaultValue="games" className="mb-10">
                <TabsList className="mb-6">
                  <TabsTrigger value="games" className="px-6">Games</TabsTrigger>
                  <TabsTrigger value="achievements" className="px-6">Achievements</TabsTrigger>
                  <TabsTrigger value="history" className="px-6">Match History</TabsTrigger>
                </TabsList>
                
                {/* Games Tab */}
                <TabsContent value="games">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {userData.games.map((game, index) => (
                      <Card key={index} className="glass-panel overflow-hidden">
                        <CardContent className="p-0">
                          <div className="relative h-20 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20">
                            <div className="absolute inset-0 opacity-30 bg-cover bg-center" 
                                 style={{ backgroundImage: `url(https://source.unsplash.com/random/800x600?${game.name.replace(/\s+/g, '')})` }}>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            <div className="absolute bottom-2 left-4 text-xl font-bold">{game.name}</div>
                          </div>
                          
                          <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                              <div className="flex items-center gap-3">
                                <img 
                                  src={game.rankImage} 
                                  alt={game.rank} 
                                  className="w-12 h-12 object-contain"
                                />
                                <div>
                                  <div className="text-sm text-gray-400">Current Rank</div>
                                  <div className="font-semibold">{game.rank}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-gray-400">Role</div>
                                <div className="font-semibold">{game.role}</div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2">
                              <div className="bg-white/5 p-2 rounded text-center">
                                <div className="text-xs text-gray-400">Win Rate</div>
                                <div className="font-semibold text-neon-green">{game.winRate}</div>
                              </div>
                              <div className="bg-white/5 p-2 rounded text-center">
                                <div className="text-xs text-gray-400">Main</div>
                                <div className="font-semibold">{game.mainAgent}</div>
                              </div>
                              <div className="bg-white/5 p-2 rounded text-center">
                                <div className="text-xs text-gray-400">Time</div>
                                <div className="font-semibold">{game.playTime}</div>
                              </div>
                            </div>
                            
                            <Button variant="outline" className="w-full mt-4 text-neon-blue border-neon-blue/30 hover:bg-neon-blue/10">
                              See Detailed Stats
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <Card className="glass-panel flex items-center justify-center p-6 h-full border-dashed border-2 border-white/10">
                      <div className="text-center">
                        <div className="mb-2 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                          <Plus className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="font-medium mb-1">Add a New Game</h3>
                        <p className="text-sm text-gray-400">Connect your other game accounts</p>
                        <Button variant="outline" size="sm" className="mt-4">
                          Connect Account
                        </Button>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
                
                {/* Achievements Tab */}
                <TabsContent value="achievements">
                  <Card className="glass-panel">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userData.achievements.map((achievement, index) => (
                          <div key={index} className="border border-white/10 rounded-lg p-4 bg-white/5">
                            <div className="flex gap-4">
                              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                {achievement.icon}
                              </div>
                              <div>
                                <h3 className="font-medium">{achievement.name}</h3>
                                <p className="text-sm text-gray-400">{achievement.description}</p>
                                <div className="mt-2 flex justify-between text-xs">
                                  <span className={`px-2 py-0.5 rounded-full ${
                                    achievement.rarity === "Common" ? "bg-gray-500/20 text-gray-300" :
                                    achievement.rarity === "Uncommon" ? "bg-neon-green/20 text-neon-green" :
                                    achievement.rarity === "Rare" ? "bg-neon-blue/20 text-neon-blue" :
                                    "bg-neon-purple/20 text-neon-purple"
                                  }`}>
                                    {achievement.rarity}
                                  </span>
                                  <span className="text-gray-500">{achievement.date}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <div className="border border-dashed border-white/10 rounded-lg p-4 flex items-center justify-center min-h-[150px]">
                          <div className="text-center">
                            <div className="text-gray-400 mb-1">Keep playing to earn more</div>
                            <span className="text-xs">12 more achievements available</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Match History Tab */}
                <TabsContent value="history">
                  <Card className="glass-panel">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {Array(5).fill(0).map((_, index) => (
                          <div 
                            key={index} 
                            className={`p-4 rounded-lg border flex justify-between items-center
                              ${index % 3 === 0 ? "border-neon-green/30 bg-neon-green/5" : 
                                index % 3 === 1 ? "border-neon-red/30 bg-neon-red/5" : 
                                "border-neon-yellow/30 bg-neon-yellow/5"}`}
                          >
                            <div className="flex items-center gap-4">
                              <img 
                                src={`https://source.unsplash.com/random/100x100?game&${index}`} 
                                alt="Game" 
                                className="w-12 h-12 rounded object-cover"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">
                                    {index % 3 === 0 ? "Valorant" : index % 3 === 1 ? "League of Legends" : "Apex Legends"}
                                  </span>
                                  <span className="text-xs bg-black/30 px-2 py-0.5 rounded">
                                    {index % 3 === 0 ? "Ascent" : index % 3 === 1 ? "Summoner's Rift" : "World's Edge"}
                                  </span>
                                </div>
                                <div className="text-sm text-gray-400">
                                  {index % 3 === 0 ? "Victory • 13-8" : index % 3 === 1 ? "Defeat • 32-41" : "Top 3 • #3"} • 
                                  {index === 0 ? " 2 hours ago" : index === 1 ? " Yesterday" : ` ${index + 1} days ago`}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                {index % 3 === 0 ? 
                                  <span className="text-neon-green">Win</span> : 
                                  index % 3 === 1 ? 
                                  <span className="text-neon-red">Loss</span> : 
                                  <span className="text-neon-yellow">Top 3</span>
                                }
                              </div>
                              <div className="text-xs text-gray-400">KDA: {
                                index % 3 === 0 ? "21/7/9" : index % 3 === 1 ? "8/5/13" : "6/2/2"
                              }</div>
                            </div>
                          </div>
                        ))}
                        
                        <Button variant="outline" className="w-full mt-2 text-white/70">
                          Load More Matches
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper component for Plus icon
const Plus = ({ className }: { className?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
};

export default Profile;
