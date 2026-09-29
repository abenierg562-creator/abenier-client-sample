interface CategoryChipsProps {
  selected?: string | null;
  onSelect: (category: string | null) => void;
}

const categories = ['Boots', 'Loafers', 'Casual', 'Heels', 'Formal'];

const CategoryChips = ({ selected, onSelect }: CategoryChipsProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-3">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(selected === cat ? null : cat)}
          className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
            selected === cat
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-secondary text-muted-foreground border-transparent hover:border-primary/40 hover:text-foreground'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
