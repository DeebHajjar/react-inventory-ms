import { useInfiniteQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../useApi'

export const useInfiniteCategories = (params = {}) => {
  return useInfiniteQuery({
    queryKey: ['categories', params],
    queryFn: async ({ pageParam = 1 }) => {
      const queryString = new URLSearchParams({ ...params, page: pageParam }).toString();
      const res = await fetch(`${API_BASE_URL}/api/categories/?${queryString}`);
      return res.json();
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next, window.location.origin);
        return url.searchParams.get('page');
      }
      return undefined;
    },
  });
};
