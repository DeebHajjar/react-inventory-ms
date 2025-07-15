import { useQuery } from '@tanstack/react-query';
import { apiRequest, categoryKeys, buildQueryString } from '../useApi';

export const useCategories = (params = {}) => {
  return useQuery({
    queryKey: categoryKeys.list(params),
    queryFn: async () => {
      const queryString = buildQueryString(params);
      const endpoint = queryString ? `/api/categories/?${queryString}` : '/api/categories/';
      return apiRequest(endpoint);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
