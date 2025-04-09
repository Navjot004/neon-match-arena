
import React, { useState } from "react";
import { BrainCircuit, SearchCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

type Suggestion = {
  id: string;
  title: string;
  description: string;
  type: "strategy" | "improvement" | "insight";
};

const mockSuggestions: Suggestion[] = [
  {
    id: "1",
    title: "Improve your defensive positioning",
    description: "Based on your recent matches, you tend to position too aggressively when defending. Try staying back more to increase your defensive coverage.",
    type: "improvement",
  },
  {
    id: "2",
    title: "Consider using sniper rifles more",
    description: "Your accuracy stats with sniper rifles are significantly higher than with assault rifles. Consider utilizing sniper rifles more in open maps.",
    type: "strategy",
  },
  {
    id: "3",
    title: "Your peak performance time",
    description: "Your win rate is 23% higher during evening hours (7PM-10PM) compared to morning sessions. Consider scheduling important matches during this timeframe.",
    type: "insight",
  },
];

const AIAnalyse = () => {
  const [query, setQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>(mockSuggestions);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast({
        title: "Empty query",
        description: "Please enter something to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "Analysis complete",
        description: "New suggestions have been generated based on your query",
      });
      // In a real implementation, you would call an actual API here
    }, 2000);
  };

  const getSuggestionColor = (type: Suggestion["type"]) => {
    switch (type) {
      case "strategy":
        return "bg-neon-blue/10 border-neon-blue/30 hover:border-neon-blue";
      case "improvement":
        return "bg-neon-purple/10 border-neon-purple/30 hover:border-neon-purple";
      case "insight":
        return "bg-neon-cyan/10 border-neon-cyan/30 hover:border-neon-cyan";
      default:
        return "bg-card/50";
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold neon-text">AI Analysis</h1>
            <p className="text-muted-foreground mt-1">Get personalized gaming suggestions and insights</p>
          </div>
          <div className="hidden md:block">
            <BrainCircuit className="h-12 w-12 text-neon-purple animate-pulse" />
          </div>
        </div>

        <Card className="glass-panel border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Ask for gaming advice</CardTitle>
            <CardDescription>
              Our AI will analyze your gameplay data and provide personalized suggestions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="e.g., How can I improve my K/D ratio? What weapons should I use for map X?"
                className="min-h-[100px] border border-white/20 bg-black/30"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleSubmit} 
              className="btn-neon" 
              disabled={isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze"}
              {isAnalyzing ? <SearchCheck className="ml-2 h-4 w-4 animate-pulse" /> : <Send className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your AI Suggestions</h2>
            <Button variant="outline" size="sm" className="border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10">
              <BrainCircuit className="mr-2 h-4 w-4" /> Generate More
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestions.map((suggestion) => (
              <Card
                key={suggestion.id}
                className={`transition-all duration-300 hover:translate-y-[-5px] border ${getSuggestionColor(suggestion.type)}`}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                  <div className="flex items-center">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      {suggestion.type}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{suggestion.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalyse;
