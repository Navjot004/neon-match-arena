
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4">
        <div className="gradient-bg"></div>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            <span className="neon-text">Find Your Perfect</span> <br />
            <span className="neon-text-purple">Gaming Squad</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Connect with players who match your skill level and play style.
            No more random matchmaking, no more toxic teammates.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link 
              to="/login" 
              className="btn-neon text-lg px-8 py-3 inline-flex items-center justify-center gap-2 rounded-lg"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-8 py-3 rounded-lg border border-white/20 hover:border-white/40 transition-colors bg-white/5 backdrop-blur-sm text-white font-medium">
              How It Works
            </button>
          </div>
          <div className="mt-12 flex items-center justify-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold neon-text animate-pulse-neon-blue">500K+</span>
              <span className="text-gray-400 text-sm">Active Players</span>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold neon-text-purple animate-pulse-neon-purple">12+</span>
              <span className="text-gray-400 text-sm">Supported Games</span>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-neon-cyan animate-pulse-neon-cyan">24/7</span>
              <span className="text-gray-400 text-sm">Active Tournaments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
