import { Filter } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) => {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <span className="font-mono text-sm text-muted-foreground uppercase tracking-wider">
          Category:
        </span>
      </div>
      
      <div className="flex gap-2 flex-wrap">
        {['All', ...categories].map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all duration-200 rounded-full ${
              selectedCategory === category
                ? 'bg-foreground text-background scale-105'
                : 'bg-background border border-foreground text-foreground hover:bg-foreground hover:text-background hover:scale-105'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};