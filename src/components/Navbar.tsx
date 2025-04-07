
import { useState } from "react";
import { Bell, Menu, Search, User, X, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("rankMatchToken") !== null;
  });

  const handleLogout = () => {
    localStorage.removeItem("rankMatchToken");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 glass-panel py-3">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-md animate-pulse-neon-blue"></div>
              <span className="relative text-white font-bold">RM</span>
            </div>
            <span className="font-bold text-xl neon-text">RankMatch</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="navbar-item">
              Dashboard
            </Link>
            <Link to="/matchmaking" className="navbar-item">
              Matchmaking
            </Link>
            <Link to="/rooms" className="navbar-item">
              Game Rooms
            </Link>
            <Link to="/tournaments" className="navbar-item">
              Tournaments
            </Link>
            <Link to="/wallet" className="navbar-item">
              Wallet
            </Link>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5 text-foreground/70 hover:text-neon-cyan" />
                        <span className="absolute -top-1 -right-1 bg-neon-red w-2 h-2 rounded-full"></span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Notifications</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Search className="h-5 w-5 text-foreground/70 hover:text-neon-cyan" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Search</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Link to="/wallet">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                          <Wallet className="h-5 w-5 text-foreground/70 hover:text-neon-cyan" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Wallet</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>

                <Link to="/profile">
                  <Avatar className="border-2 border-neon-blue/30 hover:border-neon-blue transition-colors">
                    <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="User" />
                    <AvatarFallback className="bg-neon-blue/10">U</AvatarFallback>
                  </Avatar>
                </Link>

                <Button variant="outline" onClick={handleLogout} className="border-neon-red text-neon-red hover:bg-neon-red/10">
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={() => window.location.href = "/login"} className="btn-neon">
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-panel mt-2 py-4 px-4 rounded-b-lg">
          <div className="flex flex-col gap-4">
            <Link to="/dashboard" className="navbar-item" onClick={() => setIsMenuOpen(false)}>
              Dashboard
            </Link>
            <Link to="/matchmaking" className="navbar-item" onClick={() => setIsMenuOpen(false)}>
              Matchmaking
            </Link>
            <Link to="/rooms" className="navbar-item" onClick={() => setIsMenuOpen(false)}>
              Game Rooms
            </Link>
            <Link to="/tournaments" className="navbar-item" onClick={() => setIsMenuOpen(false)}>
              Tournaments
            </Link>
            <Link to="/wallet" className="navbar-item" onClick={() => setIsMenuOpen(false)}>
              <Wallet className="h-4 w-4 mr-2" /> Wallet
            </Link>
            
            {isLoggedIn ? (
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <Link to="/profile" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <Avatar className="h-8 w-8 border-2 border-neon-blue/30">
                    <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="User" />
                    <AvatarFallback className="bg-neon-blue/10">U</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">GamerPro99</span>
                </Link>
                <Button size="sm" variant="outline" onClick={handleLogout} className="border-neon-red text-neon-red hover:bg-neon-red/10">
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={() => window.location.href = "/login"} className="btn-neon">
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
