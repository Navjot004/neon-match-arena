
import { useState } from "react";
import { 
  Wallet, ArrowRightLeft, Plus, Clock, Download, Upload, Eye, Copy, ExternalLink 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Wallet = () => {
  const [balance, setBalance] = useState("0.0384");
  const [address, setAddress] = useState("0x7a95AA9647531F3393CDCA212A12764D");
  const [sendAmount, setSendAmount] = useState("");
  const [sendAddress, setSendAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate blockchain transactions
  const handleSendTransaction = () => {
    if (!sendAmount || !sendAddress) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter both amount and address",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const newBalance = (parseFloat(balance) - parseFloat(sendAmount)).toFixed(4);
      setBalance(newBalance);
      setSendAmount("");
      setSendAddress("");
      setIsLoading(false);
      toast({
        title: "Transaction Sent",
        description: `Successfully transferred ${sendAmount} ETH to ${sendAddress.substring(0, 10)}...`,
      });
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Wallet address copied to clipboard",
    });
  };

  // Mock transaction history
  const transactions = [
    {
      id: 1,
      type: "receive",
      amount: "0.0125",
      address: "0x3a81cA64D77E8401AD533A700d9902C5",
      timestamp: "2 hours ago",
      status: "completed"
    },
    {
      id: 2,
      type: "send",
      amount: "0.0053",
      address: "0xD1279CBd92AFD30384E53E6CD645CC4a",
      timestamp: "Yesterday",
      status: "completed"
    },
    {
      id: 3,
      type: "receive",
      amount: "0.0312",
      address: "0x7BB66aDc15D4C95d161a607F63E929ec",
      timestamp: "3 days ago",
      status: "completed"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Wallet Card */}
            <div className="w-full md:w-1/3">
              <Card className="glass-panel h-full">
                <CardHeader className="border-b border-white/10 pb-6">
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-neon-blue" />
                    Crypto Wallet
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                      <Wallet className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1">{balance} ETH</div>
                      <div className="text-sm text-gray-400">≈ $89.76 USD</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-3 rounded-md bg-white/5 flex items-center justify-between">
                      <div className="text-sm text-gray-400">Wallet Address</div>
                      <div className="flex items-center gap-2">
                        <code className="text-xs">{address.substring(0, 10)}...{address.substring(address.length - 4)}</code>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => copyToClipboard(address)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-neon-blue hover:bg-neon-blue/90">
                            <Upload className="h-4 w-4 mr-2" />
                            Send
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="glass-panel border-white/10">
                          <DialogHeader>
                            <DialogTitle>Send Crypto</DialogTitle>
                            <DialogDescription>
                              Enter the recipient's address and amount to send
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Recipient Address</label>
                              <Input 
                                placeholder="0x..." 
                                value={sendAddress}
                                onChange={(e) => setSendAddress(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Amount (ETH)</label>
                              <Input 
                                type="number"
                                placeholder="0.00" 
                                value={sendAmount}
                                onChange={(e) => setSendAmount(e.target.value)}
                              />
                              <div className="text-xs text-gray-400 flex justify-between">
                                <span>Available: {balance} ETH</span>
                                <button 
                                  className="text-neon-blue"
                                  onClick={() => setSendAmount(balance)}
                                >
                                  Max
                                </button>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setSendAmount("");
                                setSendAddress("");
                              }}
                            >
                              Cancel
                            </Button>
                            <Button 
                              onClick={handleSendTransaction}
                              disabled={isLoading}
                            >
                              {isLoading ? "Processing..." : "Send"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-neon-purple hover:bg-neon-purple/90">
                            <Download className="h-4 w-4 mr-2" />
                            Receive
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="glass-panel border-white/10">
                          <DialogHeader>
                            <DialogTitle>Receive Crypto</DialogTitle>
                            <DialogDescription>
                              Share your wallet address with the sender
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="bg-white/5 p-4 rounded-md">
                              <div className="mb-2 text-sm text-center">Your Wallet Address</div>
                              <div className="bg-white/10 p-3 rounded-md break-all text-center text-xs">
                                {address}
                              </div>
                            </div>
                            <div className="flex justify-center">
                              <div className="bg-white p-4 rounded-md w-40 h-40 flex items-center justify-center">
                                {/* This would be a QR code - just a placeholder */}
                                <div className="text-black text-xs text-center">QR Code Placeholder</div>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button 
                              onClick={() => copyToClipboard(address)}
                              className="w-full"
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Address
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Transaction History */}
            <div className="w-full md:w-2/3">
              <Card className="glass-panel h-full">
                <CardHeader className="border-b border-white/10 pb-6">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowRightLeft className="h-5 w-5 text-neon-blue" />
                      Transactions
                    </div>
                    <Tabs defaultValue="all" className="w-[200px]">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="sent">Sent</TabsTrigger>
                        <TabsTrigger value="received">Received</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {transactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-3 bg-white/5 rounded-md">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            tx.type === 'receive' ? 'bg-neon-green/10 text-neon-green' : 'bg-neon-purple/10 text-neon-purple'
                          }`}>
                            {tx.type === 'receive' ? 
                              <Download className="h-5 w-5" /> : 
                              <Upload className="h-5 w-5" />
                            }
                          </div>
                          <div>
                            <div className="font-medium">
                              {tx.type === 'receive' ? 'Received' : 'Sent'}
                            </div>
                            <div className="text-xs text-gray-400 flex items-center">
                              <Clock className="h-3 w-3 mr-1" /> {tx.timestamp}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`font-medium ${
                            tx.type === 'receive' ? 'text-neon-green' : 'text-neon-purple'
                          }`}>
                            {tx.type === 'receive' ? '+' : '-'}{tx.amount} ETH
                          </div>
                          <div className="text-xs text-gray-400 truncate max-w-[150px]">
                            {tx.address.substring(0, 10)}...
                          </div>
                        </div>
                        
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full">
                      View All Transactions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Wallet;
