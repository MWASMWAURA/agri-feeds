import { Grid, List } from 'lucide-react';

interface ViewToggleProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export const ViewToggle = ({ viewMode, onViewModeChange }: ViewToggleProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm text-muted-foreground uppercase tracking-wider">
        View:
      </span>
      <div className="flex border border-foreground rounded-full overflow-hidden">
        <button
          onClick={() => onViewModeChange('grid')}
          className={`p-2 transition-all duration-200 ${
            viewMode === 'grid'
              ? 'bg-foreground text-background'
              : 'bg-background text-foreground hover:bg-accent'
          }`}
        >
          <Grid className="h-4 w-4" />
        </button>
        <button
          onClick={() => onViewModeChange('list')}
          className={`p-2 transition-all duration-200 ${
            viewMode === 'list'
              ? 'bg-foreground text-background'
              : 'bg-background text-foreground hover:bg-accent'
          }`}
        >
          <List className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};