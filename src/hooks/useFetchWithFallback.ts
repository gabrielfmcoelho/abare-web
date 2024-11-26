// src/hooks/useFetchWithFallback.ts

import { useQuery, UseQueryOptions, UseQueryResult, QueryKey } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { toast } from 'react-toastify'; // Ensure react-toastify is installed and set up

export const useFetchWithFallback = <T>(
  queryKey: QueryKey,
  url: string,
  fallbackData: T,
  options?: UseQueryOptions<T, Error>
): UseQueryResult<T, Error> => {
  return useQuery<T, Error>(
    queryKey,
    () => apiClient<T>(url),
    {
      ...options,
      initialData: fallbackData,
      onError: (error) => {
        console.error(`Failed to fetch ${queryKey.join(', ')}: ${error.message}`);
        toast.error(`Failed to fetch data for ${queryKey.join(', ')}. Showing offline data.`);
      },
    }
  );
};
