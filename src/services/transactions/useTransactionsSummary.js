import { useQuery } from '@tanstack/react-query';
import { apiRequest, transactionKeys } from '../useApi';

export const useTransactionsSummary = () => {
  return useQuery({
    queryKey: transactionKeys.summary,
    queryFn: () => apiRequest('/api/transactions/summary/'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
