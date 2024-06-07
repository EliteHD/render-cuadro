// App.js
import React from "react";
import PageRouter from "./router/PageRouter";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PageRouter />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
