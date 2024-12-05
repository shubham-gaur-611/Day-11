import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { getSearchHistory } from '../utils/storage';

interface SearchBarProps {
  onSearch: (username: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchHistory = getSearchHistory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Enter GitHub username"
          className="w-full px-4 py-2 pl-10 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </form>
      
      {showSuggestions && searchHistory.length > 0 && (
        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg">
          {searchHistory.map((username) => (
            <button
              key={username}
              onClick={() => {
                setQuery(username);
                onSearch(username);
                setShowSuggestions(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
            >
              {username}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}