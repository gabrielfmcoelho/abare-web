// src/pages/_app.tsx

import React from 'react';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './globals.css'; // Ensure you have global styles

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Refetch on window focus
      refetchOnWindowFocus: false,
      // Retry failed requests twice
      retry: 2,
      // Set default stale time
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* React Query Devtools for debugging */}
      <ReactQueryDevtools initialIsOpen={false} />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
