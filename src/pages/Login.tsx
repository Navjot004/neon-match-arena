
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import ParticlesBackground from "@/components/ParticlesBackground";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Demo account data
      if (loginForm.email === "demo@rankmatch.com" && loginForm.password === "password") {
        localStorage.setItem("rankMatchToken", "demo-token-12345");
        localStorage.setItem("rankMatchUser", JSON.stringify({
          id: "usr_123",
          username: "GamerPro99",
          email: "demo@rankmatch.com",
          avatar: "https://i.pravatar.cc/150?img=32"
        }));
        toast.success("Login successful! Welcome back.");
        navigate("/dashboard");
      } else {
        // For demo purposes, let's accept any input
        localStorage.setItem("rankMatchToken", "fake-token-12345");
        localStorage.setItem("rankMatchUser", JSON.stringify({
          id: "usr_" + Math.floor(Math.random() * 1000),
          username: loginForm.email.split("@")[0],
          email: loginForm.email,
          avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
        }));
        toast.success("Login successful! Welcome to RankMatch.");
        navigate("/dashboard");
      }
      setLoading(false);
    }, 1000);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate form
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error("Passwords don't match!");
      setLoading(false);
      return;
    }
    
    // Simulate API call delay
    setTimeout(() => {
      // For demo purposes, we'll create an account for any input
      localStorage.setItem("rankMatchToken", "new-user-token-12345");
      localStorage.setItem("rankMatchUser", JSON.stringify({
        id: "usr_" + Math.floor(Math.random() * 1000),
        username: registerForm.username,
        email: registerForm.email,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
      }));
      toast.success("Account created successfully! Welcome to RankMatch.");
      navigate("/dashboard");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <ParticlesBackground />
      <Card className="w-full max-w-md glass-panel">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-md"></div>
              <span className="relative text-white font-bold text-xl">RM</span>
            </div>
          </div>
          <CardTitle className="text-2xl neon-text">Welcome to RankMatch</CardTitle>
          <CardDescription className="text-gray-400">
            Sign in to find your perfect gaming squad
          </CardDescription>
        </CardHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 mx-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLoginSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-gray-300">Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="demo@rankmatch.com"
                    className="border-white/10 bg-white/5"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label htmlFor="password" className="text-sm text-gray-300">Password</label>
                    <Link to="#" className="text-sm text-neon-blue hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="border-white/10 bg-white/5"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                  />
                  <div className="text-xs text-gray-400 italic mt-1">
                    Demo login: demo@rankmatch.com / password
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full btn-neon" 
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegisterSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm text-gray-300">Username</label>
                  <Input
                    id="username"
                    placeholder="GamerPro99"
                    className="border-white/10 bg-white/5"
                    value={registerForm.username}
                    onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="reg-email" className="text-sm text-gray-300">Email</label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="youremail@example.com"
                    className="border-white/10 bg-white/5"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="reg-password" className="text-sm text-gray-300">Password</label>
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="••••••••"
                    className="border-white/10 bg-white/5"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="text-sm text-gray-300">Confirm Password</label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="border-white/10 bg-white/5"
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full btn-neon" 
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create account"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login;
