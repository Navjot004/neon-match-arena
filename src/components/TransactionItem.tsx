
import React from 'react';
import { Clock, Download, Upload, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface TransactionItemProps {
  type: 'send' | 'receive';
  amount: string;
  address: string;
  timestamp: string;
  hash: string;
  networkUrl: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ 
  type, 
  amount, 
  address, 
  timestamp,
  hash,
  networkUrl
}) => {
  const openExplorer = () => {
    window.open(`${networkUrl}/tx/${hash}`, '_blank');
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-md">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          type === 'receive' ? 'bg-neon-green/10 text-neon-green' : 'bg-neon-purple/10 text-neon-purple'
        }`}>
          {type === 'receive' ? 
            <Download className="h-5 w-5" /> : 
            <Upload className="h-5 w-5" />
          }
        </div>
        <div>
          <div className="font-medium">
            {type === 'receive' ? 'Received' : 'Sent'}
          </div>
          <div className="text-xs text-gray-400 flex items-center">
            <Clock className="h-3 w-3 mr-1" /> {timestamp}
          </div>
        </div>
      </div>
      
      <div className="text-right">
        <div className={`font-medium ${
          type === 'receive' ? 'text-neon-green' : 'text-neon-purple'
        }`}>
          {type === 'receive' ? '+' : '-'}{amount} ETH
        </div>
        <div className="text-xs text-gray-400 truncate max-w-[150px]">
          {address.substring(0, 10)}...
        </div>
      </div>
      
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={openExplorer}>
        <ExternalLink className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TransactionItem;
