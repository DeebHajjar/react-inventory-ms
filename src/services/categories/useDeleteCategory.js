import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest, categoryKeys } from '../useApi';

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => 
      apiRequest(`/api/categories/${id}/`, { method: 'DELETE' }),
    onSuccess: (data, id) => {
      queryClient.removeQueries({ queryKey: categoryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      queryClient.invalidateQueries(['categories']);
    },
  });
};
