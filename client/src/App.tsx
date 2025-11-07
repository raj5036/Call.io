import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HomePage from "./pages/Homepage/Homepage";
import ContextProvider from "./contexts/ContextProvider";
import AuthPage from "./pages/AuthPage/AuthPage";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <AuthPage/>
        {/* <HomePage /> */}
      </ContextProvider>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
};

export default App;
