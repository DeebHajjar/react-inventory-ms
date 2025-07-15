import { useQuery } from '@tanstack/react-query';
import { apiRequest, productKeys } from '../useApi';

export const useProduct = (id) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => apiRequest(`/api/products/${id}/`),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
};
