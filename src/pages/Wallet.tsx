
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
import { useBlockchain } from "@/contexts/BlockchainContext";
import { Transaction, networks } from "@/types/blockchain";

const WalletPage = () => {
  const { 
    accounts,
    balance, 
    isConnected, 
    isLoading, 
    connectWallet, 
    disconnectWallet,
    sendTransaction,
    refreshBalance,
    web3
  } = useBlockchain();
  
  const [sendAmount, setSendAmount] = useState("");
  const [sendAddress, setSendAddress] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionFilter, setTransactionFilter] = useState("all");
  const [currentNetwork, setCurrentNetwork] = useState<number>(1);
  const [usdValue, setUsdValue] = useState("0.00");

  // Get current network and set it
  useEffect(() => {
    const checkNetwork = async () => {
      if (web3 && window.ethereum) {
        try {
          const chainId = await web3.eth.getChainId();
          setCurrentNetwork(chainId);
        } catch (error) {
          console.error("Error getting chain ID:", error);
        }
      }
    };
    
    checkNetwork();
  }, [web3, isConnected]);

  // Fetch USD value
  useEffect(() => {
    const fetchUsdValue = async () => {
      if (!balance || parseFloat(balance) === 0) {
        setUsdValue("0.00");
        return;
      }
      
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        const ethPrice = data.ethereum.usd;
        const usdAmount = (parseFloat(balance) * ethPrice).toFixed(2);
        setUsdValue(usdAmount);
      } catch (error) {
        console.error("Error fetching ETH price:", error);
        // Use a fallback value
        const estimatedPrice = 2500;
        setUsdValue((parseFloat(balance) * estimatedPrice).toFixed(2));
      }
    };
    
    if (isConnected) {
      fetchUsdValue();
    }
  }, [balance, isConnected]);

  const handleSendTransaction = async () => {
    if (!sendAmount || !sendAddress) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter both amount and address",
      });
      return;
    }

    const success = await sendTransaction(sendAddress, sendAmount);
    
    if (success) {
      // Add to local transaction history
      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        type: 'send',
        amount: sendAmount,
        address: sendAddress,
        timestamp: 'Just now',
        hash: 'pending' // This would be updated with real hash in a production app
      };
      
      setTransactions(prev => [newTx, ...prev]);
      setSendAmount("");
      setSendAddress("");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Wallet address copied to clipboard",
    });
  };

  const currentAddress = accounts.length > 0 ? accounts[0] : '';
  
  const filteredTransactions = transactions.filter(tx => {
    if (transactionFilter === "all") return true;
    return tx.type === transactionFilter;
  });
  
  const networkData = networks[currentNetwork] || networks[1];

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
                    <h2 className="text-2xl font-bold">Connect Your Wallet</h2>
                    <p className="text-gray-400">
                      Connect your Ethereum wallet to access blockchain features
                    </p>
                  </div>
                  <Button 
                    className="bg-neon-blue hover:bg-neon-blue/90 text-lg px-8 py-6" 
                    onClick={connectWallet}
                    disabled={isLoading}
                  >
                    {isLoading ? "Connecting..." : "Connect Wallet"}
                  </Button>
                  <div className="text-sm text-gray-400">
                    Make sure you have MetaMask or another Ethereum wallet installed
                  </div>
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
                        {networkData.name}
                      </CardTitle>
                      <Badge variant="outline">{networkData.symbol}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center space-y-4 mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                        <WalletIcon className="h-10 w-10 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-1">{balance} {networkData.symbol}</div>
                        <div className="text-sm text-gray-400">≈ ${usdValue} USD</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2"
                          onClick={refreshBalance}
                        >
                          <RefreshCw className="h-3 w-3 mr-1" /> Refresh
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-3 rounded-md bg-white/5 flex items-center justify-between">
                        <div className="text-sm text-gray-400">Wallet Address</div>
                        <div className="flex items-center gap-2">
                          <code className="text-xs">{currentAddress.substring(0, 10)}...{currentAddress.substring(currentAddress.length - 4)}</code>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => copyToClipboard(currentAddress)}
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
                              <DialogTitle>Send {networkData.symbol}</DialogTitle>
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
                                <label className="text-sm font-medium">Amount ({networkData.symbol})</label>
                                <Input 
                                  type="number"
                                  placeholder="0.00" 
                                  value={sendAmount}
                                  onChange={(e) => setSendAmount(e.target.value)}
                                />
                                <div className="text-xs text-gray-400 flex justify-between">
                                  <span>Available: {balance} {networkData.symbol}</span>
                                  <button 
                                    className="text-neon-blue"
                                    onClick={() => setSendAmount(balance)}
                                  >
                                    Max
                                  </button>
                                </div>
                              </div>
                              <div className="p-3 bg-amber-500/10 rounded-md">
                                <div className="flex items-center text-amber-400 text-xs gap-2">
                                  <AlertTriangle className="h-4 w-4" />
                                  <span>This will trigger a real blockchain transaction</span>
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
                              <DialogTitle>Receive {networkData.symbol}</DialogTitle>
                              <DialogDescription>
                                Share your wallet address with the sender
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="bg-white/5 p-4 rounded-md">
                                <div className="mb-2 text-sm text-center">Your Wallet Address</div>
                                <div className="bg-white/10 p-3 rounded-md break-all text-center text-xs">
                                  {currentAddress}
                                </div>
                              </div>
                              <div className="flex justify-center">
                                <div className="bg-white p-4 rounded-md w-40 h-40 flex items-center justify-center">
                                  <div className="text-black text-xs text-center">
                                    {/* In a production app, we'd generate an actual QR code here */}
                                    QR Code for: {currentAddress.substring(0, 10)}...
                                  </div>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button 
                                onClick={() => copyToClipboard(currentAddress)}
                                className="w-full"
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Address
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
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
                            networkUrl={networkData.explorerUrl}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-gray-400">No transactions found</div>
                        <p className="text-sm text-gray-500 mt-2">
                          Transactions will appear here once you send or receive funds
                        </p>
                      </div>
                    )}
                    
                    {filteredTransactions.length > 0 && (
                      <Button variant="outline" className="w-full mt-4">
                        View All in Explorer
                      </Button>
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
