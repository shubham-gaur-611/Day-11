import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { GitHubEvent } from '../types/github';
import { 
  GitBranch, 
  GitCommit, 
  Star, 
  GitFork,
  Activity
} from 'lucide-react';

interface ActivityListProps {
  events: GitHubEvent[];
  filter: string;
}

export function ActivityList({ events, filter }: ActivityListProps) {
  const filteredEvents = events.filter(event => 
    filter === 'all' || event.type.toLowerCase().includes(filter.toLowerCase())
  );

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'PushEvent':
        return <GitCommit className="h-5 w-5" />;
      case 'CreateEvent':
        return <GitBranch className="h-5 w-5" />;
      case 'WatchEvent':
        return <Star className="h-5 w-5" />;
      case 'ForkEvent':
        return <GitFork className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  const getEventDescription = (event: GitHubEvent) => {
    switch (event.type) {
      case 'PushEvent':
        return `pushed ${event.payload.commits?.length || 0} commits to`;
      case 'CreateEvent':
        return `created ${event.payload.ref_type} in`;
      case 'WatchEvent':
        return 'starred';
      case 'ForkEvent':
        return 'forked';
      default:
        return 'interacted with';
    }
  };

  return (
    <div className="space-y-4">
      {filteredEvents.map((event) => (
        <div key={event.id} className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="text-gray-600">
              {getEventIcon(event.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <img 
                  src={event.actor.avatar_url} 
                  alt={event.actor.login}
                  className="w-6 h-6 rounded-full"
                />
                <span className="font-medium">{event.actor.login}</span>
                <span className="text-gray-600">{getEventDescription(event)}</span>
                <a 
                  href={`https://github.com/${event.repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {event.repo.name}
                </a>
              </div>
              {event.type === 'PushEvent' && event.payload.commits && (
                <div className="mt-2 pl-8 space-y-1">
                  {event.payload.commits.map((commit) => (
                    <div key={commit.sha} className="text-sm text-gray-600">
                      <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                        {commit.sha.slice(0, 7)}
                      </code>
                      <span className="ml-2">{commit.message}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-1 text-sm text-gray-500">
                {formatDistanceToNow(new Date(event.created_at), { addSuffix: true })}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}