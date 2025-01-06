"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const TanstackProvider = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // Keep data fresh for 5 minutes
            cacheTime: 10 * 60 * 1000, // Cache unused data for 10 minutes
            retry: 2, // Retry failed queries up to 2 times
            refetchOnWindowFocus: false, // Disable refetching on window focus by default
            refetchOnReconnect: true, // Refetch data when the app regains network connection
            refetchOnMount: false, // Do not refetch when a component remounts
          },
          mutations: {
            retry: 1, // Retry failed mutations once
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanstackProvider;
