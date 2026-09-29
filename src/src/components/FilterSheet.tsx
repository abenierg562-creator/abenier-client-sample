import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FilterState {
  categories: string[];
  budget: string | null;
  collections: string[];
}

const collectionOptions = ['New Arrivals', 'Trending', 'Special Offers'];

const categoryOptions = ['Sneakers', 'Running', 'Casual', 'High Top', 'Low Top', 'Slides / Sandals'];

const budgetOptions = [
  { label: 'Under 3,000 ETB', value: 'under-3000' },
  { label: '3,000–5,000 ETB', value: '3000-5000' },
  { label: '5,000–8,000 ETB', value: '5000-8000' },
  { label: '8,000+ ETB', value: '8000+' },
];

interface FilterSheetProps {
  open: boolean;
  filters: FilterState;
  onApply: (filters: FilterState) => void;
  onClose: () => void;
}

const FilterSheet = ({ open, filters, onApply, onClose }: FilterSheetProps) => {
  const [local, setLocal] = useState<FilterState>({ ...filters });

  useEffect(() => {
    if (open) setLocal({ ...filters });
  }, [open, filters]);

  const toggleCategory = (cat: string) => {
    setLocal(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  const selectBudget = (val: string) => {
    setLocal(prev => ({ ...prev, budget: prev.budget === val ? null : val }));
  };

  const toggleCollection = (col: string) => {
    setLocal(prev => ({
      ...prev,
      collections: prev.collections.includes(col)
        ? prev.collections.filter(c => c !== col)
        : [...prev.collections, col],
    }));
  };

  const clearAll = () => setLocal({ categories: [], budget: null, collections: [] });

  const hasFilters = local.categories.length > 0 || local.budget !== null || local.collections.length > 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-2xl max-h-[80vh] overflow-y-auto pb-20"
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3">
              <h2 className="text-lg font-display font-bold text-foreground">Filters</h2>
              <button onClick={onClose} className="p-1.5 rounded-full hover:bg-secondary transition-colors">
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>

            {/* Category */}
            <div className="px-5 pb-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categoryOptions.map(cat => {
                  const active = local.categories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                        active
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-secondary text-foreground border-border hover:border-primary/40'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Collection */}
            <div className="px-5 pb-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Collection</h3>
              <div className="flex flex-wrap gap-2">
                {collectionOptions.map(col => {
                  const active = local.collections.includes(col);
                  return (
                    <button
                      key={col}
                      onClick={() => toggleCollection(col)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                        active
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-secondary text-foreground border-border hover:border-primary/40'
                      }`}
                    >
                      {col}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget */}
            <div className="px-5 pb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Budget</h3>
              <div className="grid grid-cols-2 gap-2">
                {budgetOptions.map(({ label, value }) => {
                  const active = local.budget === value;
                  return (
                    <button
                      key={value}
                      onClick={() => selectBudget(value)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all border text-center ${
                        active
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-secondary text-foreground border-border hover:border-primary/40'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 px-5 pb-5">
              <button
                onClick={() => { clearAll(); onApply({ categories: [], budget: null, collections: [] }); }}
                className="flex-1 py-3 rounded-xl text-sm font-semibold border border-border text-foreground hover:bg-secondary transition-colors active:scale-95"
              >
                Clear Filters
              </button>
              <button
                onClick={() => { onApply(local); onClose(); }}
                className="flex-1 py-3 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Apply
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterSheet;
