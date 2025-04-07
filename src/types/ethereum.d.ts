
export interface EthereumEvent {
  connect: {
    chainId: string;
  };
  disconnect: unknown;
  accountsChanged: string[];
  chainChanged: string;
  message: {
    type: string;
    data: unknown;
  };
}

export type EthereumEventKeys = keyof EthereumEvent;
export type EthereumEventHandler<K extends EthereumEventKeys> = (payload: EthereumEvent[K]) => void;

export interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

export interface Ethereum {
  isMetaMask?: boolean;
  request<T = unknown>(args: RequestArguments): Promise<T>;
  on<K extends EthereumEventKeys>(eventName: K, handler: EthereumEventHandler<K>): void;
  removeListener<K extends EthereumEventKeys>(eventName: K, handler: EthereumEventHandler<K>): void;
  selectedAddress: string | undefined;
  chainId: string | undefined;
  isConnected(): boolean;
  _metamask?: {
    isUnlocked: () => Promise<boolean>;
  };
}

declare global {
  interface Window {
    ethereum?: Ethereum;
  }
}
