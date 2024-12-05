import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Github } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import { ActivityList } from './components/ActivityList';
import { fetchUserEvents } from './utils/github';
import { addToSearchHistory } from './utils/storage';

function App() {
  const [username, setUsername] = useState('');
  const [filter, setFilter] = useState('all');

  const { data: events, isLoading, isError } = useQuery({
    queryKey: ['events', username],
    queryFn: () => fetchUserEvents(username),
    enabled: !!username,
  });

  const handleSearch = (searchedUsername: string) => {
    setUsername(searchedUsername);
    addToSearchHistory(searchedUsername);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Github className="h-10 w-10 text-gray-900" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            GitHub Activity Viewer
          </h1>
          <p className="text-gray-600">
            Track GitHub activities of any user in real-time
          </p>
        </div>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {username && (
          <div className="space-y-6">
            <FilterBar currentFilter={filter} onFilterChange={setFilter} />
            
            {isLoading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading activities...</p>
              </div>
            )}

            {isError && (
              <div className="text-center py-8">
                <p className="text-red-600">Failed to load user activities. Please try again.</p>
              </div>
            )}

            {events && events.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">No activities found for this user.</p>
              </div>
            )}

            {events && events.length > 0 && (
              <ActivityList events={events} filter={filter} />
            )}
          </div>
        )}

        {!username && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
            <p className="text-gray-600">
              Enter a GitHub username above to view their recent activities
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;