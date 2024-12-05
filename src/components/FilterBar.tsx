import React from 'react';

interface FilterBarProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterBar({ currentFilter, onFilterChange }: FilterBarProps) {
  const filters = [
    { id: 'all', label: 'All Activities' },
    { id: 'push', label: 'Pushes' },
    { id: 'create', label: 'Creates' },
    { id: 'watch', label: 'Stars' },
    { id: 'fork', label: 'Forks' },
  ];

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2">
      {filters.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onFilterChange(id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${currentFilter === id 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}