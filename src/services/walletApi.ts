
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export interface WalletResponse {
  wallet_id: string;
  balance: number;
}

export interface Transaction {
  id: string;
  type: 'debit' | 'credit';
  amount: number;
  timestamp: number;
}

export interface EarnResponse {
  amount: number;
  new_balance: number;
  txn: Transaction;
}

export const createWallet = async (username: string): Promise<WalletResponse> => {
  const response = await axios.post(`${API_BASE_URL}/wallet/create`, { username });
  return response.data;
};

export const getBalance = async (walletId: string): Promise<number> => {
  const response = await axios.get(`${API_BASE_URL}/wallet/${walletId}/balance`);
  return response.data.balance;
};

export const transferFunds = async (walletId: string, amount: number): Promise<{
  new_balance: number;
  txn: Transaction;
}> => {
  const response = await axios.post(`${API_BASE_URL}/wallet/${walletId}/transfer`, { amount });
  return response.data;
};

export const getTransactions = async (walletId: string): Promise<Transaction[]> => {
  const response = await axios.get(`${API_BASE_URL}/wallet/${walletId}/transactions`);
  return response.data;
};

export const earnCoins = async (walletId: string): Promise<EarnResponse> => {
  try {
    // Simulate API call - in reality this would be an actual endpoint
    // In your backend, you would create a route like /wallet/:id/earn
    // For now, we'll simulate a successful response
    const amount = Math.floor(Math.random() * 20) + 5; // Random amount between 5-25 coins
    
    // This is a mock response that mimics what your backend would return
    // In a real implementation, this would be the response from an API call
    const mockResponse = {
      amount,
      new_balance: 0, // This will be calculated based on current balance
      txn: {
        id: `earn_${Date.now()}`,
        type: 'credit' as const,
        amount,
        timestamp: Math.floor(Date.now() / 1000)
      }
    };
    
    // Get current balance to update our mock
    const currentBalance = await getBalance(walletId);
    mockResponse.new_balance = currentBalance + amount;
    
    return mockResponse;
  } catch (error) {
    console.error("Error earning coins:", error);
    throw error;
  }
};
