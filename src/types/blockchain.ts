
export interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: string;
  address: string;
  timestamp: string;
  hash: string;
}

export interface BlockchainNetwork {
  name: string;
  chainId: number;
  symbol: string;
  explorerUrl: string;
}

export const networks: Record<number, BlockchainNetwork> = {
  1: {
    name: 'Ethereum Mainnet',
    chainId: 1,
    symbol: 'ETH',
    explorerUrl: 'https://etherscan.io'
  },
  11155111: {
    name: 'Sepolia Testnet',
    chainId: 11155111,
    symbol: 'ETH',
    explorerUrl: 'https://sepolia.etherscan.io'
  },
  137: {
    name: 'Polygon',
    chainId: 137,
    symbol: 'MATIC',
    explorerUrl: 'https://polygonscan.com'
  },
  80001: {
    name: 'Mumbai Testnet',
    chainId: 80001,
    symbol: 'MATIC',
    explorerUrl: 'https://mumbai.polygonscan.com'
  }
};
