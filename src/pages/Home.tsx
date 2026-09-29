import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import CategoryChips from '@/components/CategoryChips';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';

const tabs = ['New Arrivals', 'Trending', 'Special Offers'] as const;
type Tab = typeof tabs[number];

const collectionMap: Record<Tab, 'new-arrivals' | 'trending' | 'special-offers'> = {
  'New Arrivals': 'new-arrivals',
  'Trending': 'trending',
  'Special Offers': 'special-offers',
};

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('New Arrivals');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { products: tabProducts } = useProducts({ collection: collectionMap[activeTab] });

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
            setSelectedCategory(cat);
            if (cat) navigate(`/brands?category=${cat}`);
          }}
        />
      </div>

      {/* Tabs */}
      <div className="mt-6 px-4">
        <div className="flex gap-1 p-1 bg-secondary rounded-xl">
          {tabs.map(tab => (
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

      {/* Tab Content - Product Grid */}
      <div className="grid grid-cols-2 gap-3 px-4 mt-4">
        {tabProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
        {tabProducts.length === 0 && (
          <div className="col-span-2 text-center py-8">
            <p className="text-muted-foreground text-sm">No products in this category yet</p>
          </div>
        )}
      </div>

      {/* See More */}
      <div className="px-4 mt-3">
        <button
          onClick={() => navigate('/brands')}
          className="w-full py-2.5 rounded-xl border border-primary text-primary text-xs font-semibold hover:bg-primary/5 transition-colors"
        >
          Browse All Shoes
        </button>
      </div>
    </div>
  );
};

export default Home;
