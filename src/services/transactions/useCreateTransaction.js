import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest, productKeys, transactionKeys  } from '../useApi';

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (transactionData) => 
      apiRequest('/api/transactions/', {
        method: 'POST',
        body: JSON.stringify(transactionData),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: transactionKeys.latest });
      queryClient.invalidateQueries({ queryKey: transactionKeys.summary });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.lowStock });
      queryClient.invalidateQueries({ queryKey: productKeys.outOfStock });
      queryClient.invalidateQueries(['transactions']);
    },
  });
};
