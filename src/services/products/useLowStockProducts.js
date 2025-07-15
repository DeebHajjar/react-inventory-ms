import { useQuery } from '@tanstack/react-query';
import { apiRequest, productKeys, buildQueryString } from '../useApi';

export const useLowStockProducts = (params = {}) => {
  return useQuery({
    queryKey: [productKeys.lowStock, params],
    queryFn: async () => {
      const queryString = buildQueryString(params);
      const endpoint = queryString 
        ? `/api/products/low-stock/?${queryString}` 
        : '/api/products/low-stock/';
      return apiRequest(endpoint);
    },
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};
