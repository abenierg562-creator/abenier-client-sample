import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartItemRow from '@/components/CartItemRow';
import { toast } from 'sonner';

const DELIVERY_FEE = 0;

const Cart = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    toast.success('Order placed! Confirm via Telegram to complete.');
    clearCart();
  };

  return (
    <div className="pb-24">
      <div className="sticky top-0 z-40 flex items-center gap-3 h-14 px-4 bg-background/95 backdrop-blur-sm border-b border-border">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-display font-bold text-foreground">My Cart</h1>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <ShoppingBag size={28} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate('/brands')}
            className="h-10 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-3 px-4 mt-4">
            {items.map(item => (
              <CartItemRow key={`${item.product.id}-${item.size}`} item={item} />
            ))}
          </div>

          {/* Summary */}
          <div className="mx-4 mt-6 p-4 bg-accent rounded-2xl space-y-2.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold text-foreground">${totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-semibold text-green-600">Free</span>
            </div>
            <div className="border-t border-border pt-2.5 flex justify-between">
              <span className="text-sm font-bold text-foreground">Total</span>
              <span className="text-lg font-display font-bold text-foreground">${totalPrice + DELIVERY_FEE}</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-3 px-4">
            Orders are confirmed via Telegram. We'll reach out to finalize delivery details.
          </p>

          <div className="fixed bottom-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border px-4 py-3">
            <button
              onClick={handleCheckout}
              className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors max-w-lg mx-auto block"
            >
              Confirm Order — ${totalPrice + DELIVERY_FEE}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
