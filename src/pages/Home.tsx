import { useState } from 'react';
import { useClientNavigate } from '@/hooks/useClientNavigate';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import CategoryChips from '@/components/CategoryChips';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { useClientProfile } from '@/hooks/useClientProfile';

const TABS = ['New Arrivals', 'Trending', 'Special Offers'] as const;
type Tab = typeof TABS[number];
const collectionMap: Record<Tab, 'new-arrivals' | 'trending' | 'special-offers'> = {
  'New Arrivals': 'new-arrivals',
  'Trending': 'trending',
  'Special Offers': 'special-offers',
};

const Home = () => {
  const navigate = useClientNavigate();
  const { profile } = useClientProfile();
  const [activeTab, setActiveTab] = useState<Tab>('New Arrivals');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // When a client profile is loaded with products, show all in one flat list
  const hasProfileProducts = profile && profile.products.length > 0;

  const { products: tabProducts } = useProducts(
    hasProfileProducts
      ? { category: selectedCategory || undefined }
      : { collection: collectionMap[activeTab], category: selectedCategory || undefined }
  );

  return (
    <div className="pb-20">
      <Header />

      <HeroBanner />

      {/* Shop by Category */}
      <div className="mt-4">
        <h3 className="px-4 text-sm font-display font-bold text-foreground mb-1">Shop by Category</h3>
        <CategoryChips
          selected={selectedCategory}
          onSelect={cat => {
            setSelectedCategory(prev => prev === cat ? null : cat);
          }}
        />
      </div>

      {/* Tabs — only show for mock/fallback data, hide when profile products exist */}
      {!hasProfileProducts && (
        <div className="mt-6 px-4">
          <div className="flex gap-1 p-1 bg-secondary rounded-xl">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className={`grid grid-cols-2 gap-3 px-4 ${hasProfileProducts ? 'mt-4' : 'mt-4'}`}>
        {tabProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
        {tabProducts.length === 0 && (
          <div className="col-span-2 text-center py-8">
            <p className="text-muted-foreground text-sm">No products yet</p>
          </div>
        )}
      </div>

      {/* See More — only for mock data */}
      {!hasProfileProducts && (
        <div className="px-4 mt-3">
          <button
            onClick={() => navigate('/brands')}
            className="w-full py-2.5 rounded-xl border border-primary text-primary text-xs font-semibold hover:bg-primary/5 transition-colors"
          >
            Browse All
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
