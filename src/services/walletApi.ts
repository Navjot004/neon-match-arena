
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
