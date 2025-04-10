
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlockchainProvider } from "./contexts/BlockchainContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Matchmaking from "./pages/Matchmaking";
import Rooms from "./pages/Rooms";
import Tournaments from "./pages/Tournaments";
import WalletPage from "./pages/Wallet";
import AIAnalyse from "./pages/AIAnalyse";
import NotFound from "./pages/NotFound";
import TutorialButtons from "./components/TutorialButtons";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BlockchainProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/matchmaking" element={<Matchmaking />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/ai-analyse" element={<AIAnalyse />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <TutorialButtons />
        </BrowserRouter>
      </TooltipProvider>
    </BlockchainProvider>
  </QueryClientProvider>
);

export default App;
