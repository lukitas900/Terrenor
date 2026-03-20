interface FilterOption {
  id: string;
  label: string;
  color?: string;
}

interface FilterTabsProps {
  options: FilterOption[];
  selected: string;
  onSelect: (id: string) => void;
}

export function FilterTabs({ options, selected, onSelect }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            selected === option.id
              ? 'bg-[#2d1b4e] text-[#e0e0e0] border border-[#9d4edd]/50'
              : 'bg-[#1a0b2e]/50 text-[#e0e0e0]/60 border border-transparent hover:border-[#2d1b4e] hover:text-[#e0e0e0]'
          }`}
          style={selected === option.id && option.color ? {
            borderColor: option.color,
            boxShadow: `0 0 15px ${option.color}30`
          } : {}}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
