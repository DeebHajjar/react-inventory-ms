import { useQuery } from '@tanstack/react-query';
import { apiRequest, productKeys, buildQueryString } from '../useApi';

export const useProducts = (params = {}) => {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: async () => {
      const queryString = buildQueryString(params);
      const endpoint = queryString ? `/api/products/?${queryString}` : '/api/products/';
      return apiRequest(endpoint);
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
