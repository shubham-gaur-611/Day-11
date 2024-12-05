const SEARCH_HISTORY_KEY = 'github-search-history';

export const getSearchHistory = (): string[] => {
  const history = localStorage.getItem(SEARCH_HISTORY_KEY);
  return history ? JSON.parse(history) : [];
};

export const addToSearchHistory = (username: string) => {
  const history = getSearchHistory();
  const newHistory = [username, ...history.filter(u => u !== username)].slice(0, 5);
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
};