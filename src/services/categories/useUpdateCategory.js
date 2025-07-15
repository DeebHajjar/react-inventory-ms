import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest, categoryKeys } from '../useApi';

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => 
      apiRequest(`/api/categories/${id}/`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(categoryKeys.detail(id), data);
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      queryClient.invalidateQueries(['categories']);
    },
  });
};
