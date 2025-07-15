import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest, productKeys, categoryKeys  } from '../useApi';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (productData) => {
      return apiRequest('/api/products/', {
        method: 'POST',
        body: JSON.stringify(productData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.lowStock });
      queryClient.invalidateQueries({ queryKey: productKeys.outOfStock });
    },
  });
};
