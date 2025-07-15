import { useInfiniteQuery } from '@tanstack/react-query';
import { API_BASE_URL  } from '../useApi';

export const useInfiniteTransactions = (params = {}) => {
  return useInfiniteQuery({
    queryKey: ['transactions', params],
    queryFn: async ({ pageParam = 1 }) => {
      const queryString = new URLSearchParams({ ...params, page: pageParam }).toString();
      const res = await fetch(`${API_BASE_URL}/api/transactions/?${queryString}`);
      return res.json();
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        return url.searchParams.get('page');
      }
      return undefined;
    },
  });
};
