
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FeaturedGames from "@/components/FeaturedGames";
import ParticlesBackground from "@/components/ParticlesBackground";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ParticlesBackground />
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <Features />
        <FeaturedGames />
        
        {/* How It Works Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 neon-text">How RankMatch Works</h2>
              <p className="text-gray-300">
                Our platform uses advanced algorithms to match you with the perfect teammates based on your skill level, 
                play style, and personality, ensuring a seamless gaming experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-panel rounded-lg p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 w-full bg-neon-blue"></div>
                <div className="mb-6 w-16 h-16 rounded-full bg-neon-blue/20 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-neon-blue">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Create Your Profile</h3>
                <p className="text-gray-400">
                  Sign up and connect your gaming accounts to automatically import your stats, ranks, and achievements.
                </p>
              </div>
              
              <div className="glass-panel rounded-lg p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 w-full bg-neon-purple"></div>
                <div className="mb-6 w-16 h-16 rounded-full bg-neon-purple/20 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-neon-purple">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Find Your Match</h3>
                <p className="text-gray-400">
                  Our algorithm analyzes your playstyle and preferences to find players who complement your strengths and weaknesses.
                </p>
              </div>
              
              <div className="glass-panel rounded-lg p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 w-full bg-neon-cyan"></div>
                <div className="mb-6 w-16 h-16 rounded-full bg-neon-cyan/20 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-neon-cyan">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Team Up & Compete</h3>
                <p className="text-gray-400">
                  Join game rooms with your new teammates, communicate through in-app chat, and start dominating together.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/login">
                <Button className="btn-neon text-lg px-8 py-6 inline-flex items-center gap-2">
                  Get Started Now <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="py-16 bg-black/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 neon-text-purple">What Gamers Are Saying</h2>
              <p className="text-gray-300">
                Thousands of players are already finding their perfect squad with RankMatch.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-panel rounded-lg p-6 relative">
                <div className="absolute -top-4 -left-4 text-6xl text-neon-purple opacity-30">"</div>
                <p className="text-gray-300 mb-6 relative z-10">
                  I've climbed from Gold to Diamond since finding consistent teammates on RankMatch. The compatibility algorithm really works!
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img src="https://i.pravatar.cc/150?img=69" alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-semibold">Alex G.</div>
                    <div className="text-sm text-gray-400">Valorant Player</div>
                  </div>
                </div>
              </div>
              
              <div className="glass-panel rounded-lg p-6 relative">
                <div className="absolute -top-4 -left-4 text-6xl text-neon-blue opacity-30">"</div>
                <p className="text-gray-300 mb-6 relative z-10">
                  The tournament system is amazing! Met my current team here and we've already won 2 community cups together.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img src="https://i.pravatar.cc/150?img=27" alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-semibold">Sarah K.</div>
                    <div className="text-sm text-gray-400">League of Legends Player</div>
                  </div>
                </div>
              </div>
              
              <div className="glass-panel rounded-lg p-6 relative">
                <div className="absolute -top-4 -left-4 text-6xl text-neon-cyan opacity-30">"</div>
                <p className="text-gray-300 mb-6 relative z-10">
                  No more toxic teammates! The filtering system helps me find chill players who actually communicate and want to improve together.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img src="https://i.pravatar.cc/150?img=50" alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-semibold">Mike T.</div>
                    <div className="text-sm text-gray-400">Apex Legends Player</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-neon-blue/20 to-transparent opacity-70"></div>
          <div className="relative container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="neon-text">Ready to Find Your</span> <br />
              <span className="neon-text-purple">Perfect Gaming Squad?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of gamers connecting and climbing ranks together on RankMatch.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/login">
                <Button className="btn-neon text-lg px-8 py-6 inline-flex items-center gap-2">
                  Sign Up Free <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white/20 hover:border-white/40 text-lg px-8 py-6">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
