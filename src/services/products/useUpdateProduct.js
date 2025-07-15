import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest, productKeys, categoryKeys  } from '../useApi';

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => {
      return apiRequest(`/api/products/${id}/`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(productKeys.detail(id), data);
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.lowStock });
      queryClient.invalidateQueries({ queryKey: productKeys.outOfStock });
      queryClient.invalidateQueries(['products']);
    },
  });
};
