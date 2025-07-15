import { useQuery } from '@tanstack/react-query';
import { apiRequest, productKeys, buildQueryString } from '../useApi';

export const useProductTransactions = (id, params = {}) => {
  return useQuery({
    queryKey: [...productKeys.transactions(id), params],
    queryFn: async () => {
      const queryString = buildQueryString(params);
      const endpoint = queryString 
        ? `/api/products/${id}/transactions/?${queryString}` 
        : `/api/products/${id}/transactions/`;
      return apiRequest(endpoint);
    },
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
  });
};
