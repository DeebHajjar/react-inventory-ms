import { useQuery } from '@tanstack/react-query';
import { apiRequest, productKeys, buildQueryString } from '../useApi';

export const useOutOfStockProducts = (params = {}) => {
  return useQuery({
    queryKey: [productKeys.outOfStock, params],
    queryFn: async () => {
      const queryString = buildQueryString(params);
      const endpoint = queryString 
        ? `/api/products/out-of-stock/?${queryString}` 
        : '/api/products/out-of-stock/';
      return apiRequest(endpoint);
    },
    staleTime: 1 * 60 * 1000, 
  });
};
