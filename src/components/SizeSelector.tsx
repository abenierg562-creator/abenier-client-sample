interface SizeSelectorProps {
  sizes: number[];
  selected: number | null;
  onSelect: (size: number) => void;
}

const SizeSelector = ({ sizes, selected, onSelect }: SizeSelectorProps) => {
  return (
    <div>
      <h3 className="text-sm font-display font-bold text-foreground mb-2">Select Size</h3>
      <div className="grid grid-cols-4 gap-2">
        {sizes.map(size => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`h-11 rounded-xl text-sm font-semibold transition-all border ${
              selected === size
                ? 'bg-foreground text-background border-foreground'
                : 'bg-background text-foreground border-border hover:border-foreground/40'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
