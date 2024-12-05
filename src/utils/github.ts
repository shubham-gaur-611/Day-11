const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchUserEvents(username: string): Promise<any> {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}/events/public`);
  if (!response.ok) {
    throw new Error('Failed to fetch user events');
  }
  return response.json();
}