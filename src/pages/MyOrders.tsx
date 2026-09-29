import { ArrowLeft, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-40 flex items-center gap-3 h-14 px-4 bg-background/95 backdrop-blur-sm border-b border-border">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-display font-bold text-foreground">My Orders</h1>
      </div>

      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
          <Package size={28} className="text-muted-foreground" />
        </div>
        <p className="text-muted-foreground text-sm mb-1">No orders yet</p>
        <p className="text-muted-foreground text-xs text-center">Your order history will appear here once you make a purchase.</p>
      </div>
    </div>
  );
};

export default MyOrders;
