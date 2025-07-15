import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest, productKeys, categoryKeys  } from '../useApi';

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => 
      apiRequest(`/api/products/${id}/`, { method: 'DELETE' }),
    onSuccess: (data, id) => {
      queryClient.removeQueries({ queryKey: productKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.lowStock });
      queryClient.invalidateQueries({ queryKey: productKeys.outOfStock });
      queryClient.invalidateQueries(['products']);
    },
  });
};
