
import { Trophy, Users, Shield, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Users className="h-10 w-10 text-neon-blue" />,
      title: "Smart Matchmaking",
      description: "Our algorithm finds players who match your exact skill level and play style preferences.",
    },
    {
      icon: <Shield className="h-10 w-10 text-neon-purple" />,
      title: "Verified Profiles",
      description: "All players are verified to ensure you're playing with real gamers who share your passion.",
    },
    {
      icon: <Zap className="h-10 w-10 text-neon-cyan" />,
      title: "Real-time Chat",
      description: "Communicate instantly with your teammates through our built-in voice and text chat.",
    },
    {
      icon: <Trophy className="h-10 w-10 text-neon-green" />,
      title: "Daily Tournaments",
      description: "Compete in daily tournaments with your squad and win exclusive prizes and recognition.",
    },
  ];

  return (
    <div className="py-16 bg-black/30 mt-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4 neon-text">Why Choose RankMatch?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We've built the ultimate platform designed by gamers, for gamers. Say goodbye to toxic random teammates forever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-panel rounded-lg p-6 relative overflow-hidden group hover:border-white/20 transition-all duration-300"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-radial from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
