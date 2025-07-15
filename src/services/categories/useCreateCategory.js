import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest, categoryKeys } from '../useApi';

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (categoryData) => 
      apiRequest('/api/categories/', {
        method: 'POST',
        body: JSON.stringify(categoryData),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      queryClient.invalidateQueries(['categories']);
    },
  });
};
