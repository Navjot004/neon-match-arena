
import { Link } from "react-router-dom";
import { Github, Twitter, MessagesSquare, Heart, Wallet } from "lucide-react";

const Footer = () => {
  return (
    <footer className="glass-panel py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-md"></div>
                <span className="relative text-white font-bold">RM</span>
              </div>
              <span className="font-bold text-xl neon-text">RankMatch</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Connect with players who match your skill level and play style. No more random matchmaking.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-purple transition-colors">
                <MessagesSquare className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-neon-blue transition-colors">Home</Link></li>
              <li><Link to="/matchmaking" className="text-gray-400 hover:text-neon-blue transition-colors">Matchmaking</Link></li>
              <li><Link to="/rooms" className="text-gray-400 hover:text-neon-blue transition-colors">Game Rooms</Link></li>
              <li><Link to="/tournaments" className="text-gray-400 hover:text-neon-blue transition-colors">Tournaments</Link></li>
              <li><Link to="/wallet" className="text-gray-400 hover:text-neon-blue transition-colors">Wallet</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Games</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">League of Legends</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">Valorant</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">Overwatch 2</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">Apex Legends</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} RankMatch Gaming. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart className="h-4 w-4 text-neon-red mx-1" /> for Hackathon
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
