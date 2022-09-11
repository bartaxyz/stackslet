import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { PriceProvider } from "./src/contexts/PriceContext";
import { RootStack } from "./src/RootStack";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PriceProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </PriceProvider>
    </QueryClientProvider>
  );
}
