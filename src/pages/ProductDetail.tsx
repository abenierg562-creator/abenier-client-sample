import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Minus, Plus, MessageCircle, Truck, Shield } from 'lucide-react';
import { useProduct } from '@/hooks/useProducts';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import SizeSelector from '@/components/SizeSelector';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const { product, isLoading } = useProduct(id);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Always scroll to top when product page opens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  const fav = isFavorite(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addItem(product, selectedSize, quantity);
    toast.success('Added to cart!');
  };

  const handleOrderNow = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addItem(product, selectedSize, quantity);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Hero image — full width, top of page */}
      <div className="relative w-full aspect-square bg-secondary overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* Back button overlaid on image */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 rounded-full bg-background/70 backdrop-blur-sm"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        {/* Favorite button overlaid on image */}
        <button
          onClick={() => toggleFavorite(product.id)}
          className="absolute top-4 right-4 p-2 rounded-full bg-background/70 backdrop-blur-sm"
        >
          <Heart size={20} className={fav ? 'fill-sale text-sale' : 'text-foreground'} />
        </button>
        {product.oldPrice && (
          <span className="absolute top-4 left-16 bg-sale text-sale-foreground text-[10px] font-bold px-2 py-1 rounded-full">
            {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
          </span>
        )}
      </div>

      {/* Content scrolls below the image */}
      <div className="px-4 mt-4 space-y-5">
        {/* Info */}
        <div>
          <p className="text-xs text-primary font-semibold uppercase tracking-wider">Akotet Shoes</p>
          <h1 className="text-xl font-display font-bold text-foreground mt-1">
            {product.name}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-2xl font-display font-bold text-foreground">
              {product.price.toLocaleString()} ETB
            </span>
            {product.oldPrice && (
              <span className="text-base text-muted-foreground line-through">
                {product.oldPrice.toLocaleString()} ETB
              </span>
            )}
          </div>
          {product.stockCount && product.stockCount <= 5 && (
            <p className="text-xs text-sale font-medium mt-1">
              Only {product.stockCount} left in stock!
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

        {/* Size selector */}
        <SizeSelector sizes={product.sizes} selected={selectedSize} onSelect={setSelectedSize} />

        {/* Quantity */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-display font-bold text-foreground">Quantity</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center"
            >
              <Minus size={16} />
            </button>
            <span className="text-sm font-bold w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div>
            <h3 className="text-sm font-display font-bold text-foreground mb-2">Colors</h3>
            <div className="flex gap-2">
              {product.colors.map(color => (
                <span key={color} className="px-3 py-1.5 rounded-full bg-secondary text-xs font-medium text-foreground">
                  {color}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Details */}
        <div className="space-y-2">
          <h3 className="text-sm font-display font-bold text-foreground">Details</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {product.material && (
              <div className="bg-secondary rounded-xl p-3">
                <span className="text-muted-foreground">Material</span>
                <p className="font-medium text-foreground mt-0.5">{product.material}</p>
              </div>
            )}
            <div className="bg-secondary rounded-xl p-3">
              <span className="text-muted-foreground">Category</span>
              <p className="font-medium text-foreground mt-0.5">{product.category}</p>
            </div>
            {product.gender && (
              <div className="bg-secondary rounded-xl p-3">
                <span className="text-muted-foreground">Gender</span>
                <p className="font-medium text-foreground mt-0.5">{product.gender}</p>
              </div>
            )}
            <div className="bg-secondary rounded-xl p-3">
              <span className="text-muted-foreground">Availability</span>
              <p className="font-medium text-success mt-0.5">
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
          </div>
        </div>

        {/* Trust notes */}
        <div className="space-y-2 pt-2">
          {[
            { icon: Truck, text: 'Delivery available — details at checkout' },
            { icon: MessageCircle, text: 'Need help? Message us on Telegram' },
            { icon: Shield, text: 'Authentic products guaranteed' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5">
              <Icon size={16} className="text-primary shrink-0" />
              <span className="text-xs text-muted-foreground">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-[4.5rem] left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border px-4 py-3">
        <div className="flex gap-3 max-w-lg mx-auto">
          <button
            onClick={handleAddToCart}
            className="flex-1 h-12 rounded-2xl border-2 border-foreground text-foreground font-semibold text-sm hover:bg-secondary transition-colors"
          >
            Add to Cart
          </button>
          <button
            onClick={handleOrderNow}
            className="flex-1 h-12 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
