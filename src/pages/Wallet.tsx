
import { useState, useEffect } from "react";
import { 
  WalletIcon, ArrowRightLeft, RefreshCw, Clock, Download, Upload, Copy, ExternalLink, AlertTriangle
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
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TransactionItem from "@/components/TransactionItem";
import { createWallet, getBalance, transferFunds, getTransactions, Transaction as ApiTransaction } from "@/services/walletApi";
import { Transaction } from "@/types/blockchain";

const WalletPage = () => {
  const [walletId, setWalletId] = useState<string | null>(null);
  const [username, setUsername] = useState("player1");
  const [balance, setBalance] = useState("0");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sendAmount, setSendAmount] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionFilter, setTransactionFilter] = useState("all");

  useEffect(() => {
    // Check if wallet already exists in localStorage
    const savedWalletId = localStorage.getItem("walletId");
    if (savedWalletId) {
      setWalletId(savedWalletId);
      setIsConnected(true);
      refreshBalance(savedWalletId);
      loadTransactions(savedWalletId);
    }
  }, []);

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      const response = await createWallet(username);
      setWalletId(response.wallet_id);
      setBalance(response.balance.toString());
      setIsConnected(true);
      
      // Save to localStorage
      localStorage.setItem("walletId", response.wallet_id);
      
      toast({
        title: "Wallet connected",
        description: "Your wallet has been created successfully",
      });
    } catch (error: any) {
      console.error("Error creating wallet:", error);
      toast({
        variant: "destructive",
        title: "Failed to create wallet",
        description: error.message || "An unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setWalletId(null);
    setBalance("0");
    setIsConnected(false);
    setTransactions([]);
    
    // Remove from localStorage
    localStorage.removeItem("walletId");
    
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  const refreshBalance = async (id: string | null = walletId) => {
    if (!id) return;
    
    try {
      const newBalance = await getBalance(id);
      setBalance(newBalance.toString());
    } catch (error) {
      console.error("Error refreshing balance:", error);
    }
  };

  const loadTransactions = async (id: string | null = walletId) => {
    if (!id) return;
    
    try {
      const apiTransactions = await getTransactions(id);
      
      // Convert API transactions to our internal format
      const formattedTransactions: Transaction[] = apiTransactions.map((tx: ApiTransaction) => ({
        id: tx.id,
        type: tx.type === 'credit' ? 'receive' : 'send',
        amount: tx.amount.toString(),
        address: 'Internal Transfer',
        timestamp: new Date(tx.timestamp * 1000).toLocaleString(),
        hash: tx.id
      }));
      
      setTransactions(formattedTransactions);
    } catch (error) {
      console.error("Error loading transactions:", error);
    }
  };

  const handleSendTransaction = async () => {
    if (!walletId || !sendAmount || parseFloat(sendAmount) <= 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid amount",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await transferFunds(walletId, parseFloat(sendAmount));
      
      // Update balance
      setBalance(result.new_balance.toString());
      
      // Add to local transaction history
      const newTx: Transaction = {
        id: result.txn.id,
        type: 'send',
        amount: result.txn.amount.toString(),
        address: 'Internal Transfer',
        timestamp: new Date(result.txn.timestamp * 1000).toLocaleString(),
        hash: result.txn.id
      };
      
      setTransactions(prev => [newTx, ...prev]);
      setSendAmount("");
      
      toast({
        title: "Transfer successful",
        description: `You've transferred ${result.txn.amount} coins`,
      });
    } catch (error: any) {
      console.error("Error sending transaction:", error);
      toast({
        variant: "destructive",
        title: "Transaction failed",
        description: error.response?.data?.error || "Failed to send transaction",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Wallet ID copied to clipboard",
    });
  };

  const filteredTransactions = transactions.filter(tx => {
    if (transactionFilter === "all") return true;
    return tx.type === transactionFilter;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {!isConnected ? (
            <Card className="glass-panel">
              <CardContent className="p-8">
                <div className="flex flex-col items-center space-y-6">
                  <WalletIcon className="h-20 w-20 text-neon-blue" />
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">Create Your Wallet</h2>
                    <p className="text-gray-400">
                      Create your game wallet to manage your in-game currency
                    </p>
                  </div>
                  <div className="w-full max-w-xs">
                    <Input
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="mb-4"
                    />
                  </div>
                  <Button 
                    className="bg-neon-blue hover:bg-neon-blue/90 text-lg px-8 py-6" 
                    onClick={connectWallet}
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create Wallet"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col md:flex-row gap-8">
              {/* Wallet Card */}
              <div className="w-full md:w-1/3">
                <Card className="glass-panel h-full">
                  <CardHeader className="border-b border-white/10 pb-6">
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-2">
                        <WalletIcon className="h-5 w-5 text-neon-blue" />
                        Game Wallet
                      </CardTitle>
                      <Badge variant="outline">RMCoins</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center space-y-4 mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                        <WalletIcon className="h-10 w-10 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-1">{balance} RMCoins</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            refreshBalance();
                            loadTransactions();
                          }}
                        >
                          <RefreshCw className="h-3 w-3 mr-1" /> Refresh
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-3 rounded-md bg-white/5 flex items-center justify-between">
                        <div className="text-sm text-gray-400">Wallet ID</div>
                        <div className="flex items-center gap-2">
                          <code className="text-xs">{walletId?.substring(0, 10)}...</code>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => copyToClipboard(walletId || '')}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full bg-neon-purple hover:bg-neon-purple/90">
                              <Upload className="h-4 w-4 mr-2" />
                              Transfer
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="glass-panel border-white/10">
                            <DialogHeader>
                              <DialogTitle>Transfer RMCoins</DialogTitle>
                              <DialogDescription>
                                Enter the amount to transfer
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Amount (RMCoins)</label>
                                <Input 
                                  type="number"
                                  placeholder="0.00" 
                                  value={sendAmount}
                                  onChange={(e) => setSendAmount(e.target.value)}
                                />
                                <div className="text-xs text-gray-400 flex justify-between">
                                  <span>Available: {balance} RMCoins</span>
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
                                onClick={() => setSendAmount("")}
                              >
                                Cancel
                              </Button>
                              <Button 
                                onClick={handleSendTransaction}
                                disabled={isLoading}
                              >
                                {isLoading ? "Processing..." : "Transfer"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Button className="w-full bg-neon-green hover:bg-neon-green/90">
                          Play to Earn
                        </Button>
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full text-neon-red hover:text-neon-red"
                        onClick={disconnectWallet}
                      >
                        Disconnect Wallet
                      </Button>
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
                      <Tabs 
                        defaultValue="all" 
                        className="w-[200px]"
                        value={transactionFilter}
                        onValueChange={setTransactionFilter}
                      >
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="all">All</TabsTrigger>
                          <TabsTrigger value="send">Sent</TabsTrigger>
                          <TabsTrigger value="receive">Received</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pt-6">
                    {filteredTransactions.length > 0 ? (
                      <div className="space-y-4">
                        {filteredTransactions.map((tx) => (
                          <TransactionItem
                            key={tx.id}
                            type={tx.type}
                            amount={tx.amount}
                            address={tx.address}
                            timestamp={tx.timestamp}
                            hash={tx.hash}
                            networkUrl={'#'}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-gray-400">No transactions found</div>
                        <p className="text-sm text-gray-500 mt-2">
                          Transactions will appear here once you make transfers
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WalletPage;
