
import { Card, CardContent } from "@/components/ui/card";

const games = [
  {
    id: 1,
    name: "League of Legends",
    image: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt9a2715ced150cb6e/5ef1374f6aaf2924dad26b85/LOL_Logo.jpg",
    playerCount: "3.2M",
    ranks: ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Grandmaster", "Challenger"]
  },
  {
    id: 2,
    name: "Valorant",
    image: "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt8f4c0533cb8b8f48/636e6453cf47cd4886408ою/Valorant_2022_E5A3_PlayVALORANT_ContentStackThumbnail_1200x625_MB01.png",
    playerCount: "1.8M",
    ranks: ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Ascendant", "Immortal", "Radiant"]
  },
  {
    id: 3,
    name: "Overwatch 2",
    image: "https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt22081985cdd329ad/62ea9d02c9eb411846c59096/OW2_Watchpoint_Meta_Image.png",
    playerCount: "1.1M",
    ranks: ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Grandmaster", "Top 500"]
  },
  {
    id: 4,
    name: "Apex Legends",
    image: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/apex-featured-image-16x9.jpg.adapt.crop16x9.1023w.jpg",
    playerCount: "950K",
    ranks: ["Rookie", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Predator"]
  }
];

const FeaturedGames = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 neon-text">Featured Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <Card key={game.id} className="overflow-hidden game-card group">
              <div className="relative h-40">
                <img 
                  src={game.image} 
                  alt={game.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-3 flex justify-between w-full">
                  <h3 className="text-white font-bold">{game.name}</h3>
                  <div className="text-xs bg-neon-blue/20 backdrop-blur-sm px-2 py-1 rounded-full border border-neon-blue/30 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-neon-green animate-pulse"></span>
                    <span className="text-white font-medium">{game.playerCount} online</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-1">
                  {game.ranks.slice(0, 5).map((rank, index) => (
                    <span 
                      key={index} 
                      className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80 border border-white/20"
                    >
                      {rank}
                    </span>
                  ))}
                  {game.ranks.length > 5 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/60">
                      +{game.ranks.length - 5} more
                    </span>
                  )}
                </div>
                <button className="w-full mt-4 py-2 rounded-md bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium hover:opacity-90 transition-opacity border border-white/10">
                  Find Players
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedGames;
