
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Web3 from 'web3';
import { toast } from "@/components/ui/use-toast";
import { Ethereum, EthereumEventHandler } from '@/types/ethereum';

interface BlockchainContextType {
  web3: Web3 | null;
  accounts: string[];
  balance: string;
  isConnected: boolean;
  isLoading: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  sendTransaction: (to: string, amount: string) => Promise<boolean>;
  refreshBalance: () => Promise<void>;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

export const BlockchainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [balance, setBalance] = useState('0');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Web3 if window.ethereum exists
  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        if (window.ethereum) {
          // Subscribe to accounts change
          const handleAccountsChanged: EthereumEventHandler<'accountsChanged'> = (newAccounts) => {
            handleAccountsChangedCallback(newAccounts);
          };
          
          window.ethereum.on('accountsChanged', handleAccountsChanged);
          
          // Subscribe to chainId change
          window.ethereum.on('chainChanged', () => {
            window.location.reload();
          });

          // Check if already connected
          // Fix: Create Web3 instance with provider type cast
          const web3Instance = new Web3(window.ethereum as any);
          setWeb3(web3Instance);

          // Check if already authorized
          const accounts = await web3Instance.eth.getAccounts();
          if (accounts.length > 0) {
            handleAccountsChangedCallback(accounts);
          }
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    };

    checkIfWalletIsConnected();

    // Cleanup
    return () => {
      if (window.ethereum) {
        // Need to use the same function reference for removal
        const handleAccountsChanged: EthereumEventHandler<'accountsChanged'> = (newAccounts) => {
          handleAccountsChangedCallback(newAccounts);
        };
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const handleAccountsChangedCallback = (newAccounts: string[]) => {
    if (newAccounts.length === 0) {
      // User disconnected their wallet
      setAccounts([]);
      setBalance('0');
      setIsConnected(false);
      return;
    }

    setAccounts(newAccounts);
    setIsConnected(true);

    if (web3) {
      try {
        // Get balance for the first account
        refreshBalance();
      } catch (error) {
        console.error("Error getting balance:", error);
      }
    }
  };

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      if (!window.ethereum) {
        toast({
          variant: "destructive",
          title: "No wallet detected",
          description: "Please install MetaMask or another Ethereum wallet",
        });
        setIsLoading(false);
        return;
      }

      // Fix: Cast the result to string[] because we expect an array of addresses
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      }) as string[];
      
      handleAccountsChangedCallback(accounts);
      
      toast({
        title: "Wallet connected",
        description: "Your wallet has been connected successfully",
      });
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      toast({
        variant: "destructive",
        title: "Failed to connect wallet",
        description: error.message || "An unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccounts([]);
    setBalance('0');
    setIsConnected(false);
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  const refreshBalance = async () => {
    if (!web3 || accounts.length === 0) return;
    
    try {
      const balance = await web3.eth.getBalance(accounts[0]);
      const etherBalance = web3.utils.fromWei(balance, 'ether');
      setBalance(parseFloat(etherBalance).toFixed(4));
    } catch (error) {
      console.error("Error refreshing balance:", error);
    }
  };

  const sendTransaction = async (to: string, amount: string): Promise<boolean> => {
    if (!web3 || !isConnected || accounts.length === 0) {
      toast({
        variant: "destructive",
        title: "Wallet not connected",
        description: "Please connect your wallet first",
      });
      return false;
    }

    setIsLoading(true);
    try {
      const weiAmount = web3.utils.toWei(amount, 'ether');
      
      // Fix: Cast the result to string to ensure it has substring method
      const tx = await window.ethereum!.request({
        method: 'eth_sendTransaction',
        params: [{
          from: accounts[0],
          to,
          value: web3.utils.toHex(weiAmount),
        }],
      }) as string;

      toast({
        title: "Transaction submitted",
        description: `Transaction hash: ${tx.substring(0, 10)}...`,
      });
      
      // Refresh balance after transaction
      await refreshBalance();
      return true;
    } catch (error: any) {
      console.error("Error sending transaction:", error);
      toast({
        variant: "destructive",
        title: "Transaction failed",
        description: error.message || "Failed to send transaction",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    web3,
    accounts,
    balance,
    isConnected,
    isLoading,
    connectWallet,
    disconnectWallet,
    sendTransaction,
    refreshBalance
  };

  return (
    <BlockchainContext.Provider value={value}>
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchain = (): BlockchainContextType => {
  const context = useContext(BlockchainContext);
  if (context === undefined) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
};
