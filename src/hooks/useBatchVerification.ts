import { useQuery } from '@tanstack/react-query';
import { fetchBatchReport } from '../services/api';

export const useBatchVerification = (batchCode: string, isEnabled: boolean) => {
  const normalizedCode = batchCode.trim().toUpperCase();

  return useQuery({
    queryKey: ['batchReport', normalizedCode],
    queryFn: () => fetchBatchReport(normalizedCode),
    enabled: isEnabled && normalizedCode.length > 0,
    staleTime: 1000 * 60 * 10, // Cache results for 10 minutes
    retry: false,
  });
};
