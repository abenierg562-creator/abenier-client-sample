import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart, type CartItem } from '@/context/CartContext';

const CartItemRow = ({ item }: { item: CartItem }) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, size, quantity } = item;

  return (
    <div className="flex gap-3 p-3 bg-card rounded-2xl border border-border/50">
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary shrink-0">
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-foreground line-clamp-1">{product.name}</h4>
        <p className="text-xs text-muted-foreground mt-0.5">Size: {size}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-bold text-foreground">{(product.price * quantity).toLocaleString()} ETB</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(product.id, size, quantity - 1)}
              className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-foreground"
            >
              <Minus size={14} />
            </button>
            <span className="text-sm font-semibold w-5 text-center">{quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, size, quantity + 1)}
              className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-foreground"
            >
              <Plus size={14} />
            </button>
            <button
              onClick={() => removeItem(product.id, size)}
              className="w-7 h-7 rounded-lg bg-sale/10 flex items-center justify-center text-sale ml-1"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemRow;
