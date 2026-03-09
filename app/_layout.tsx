import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { JobActionsProvider } from "../src/providers/JobActionsProvider";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <JobActionsProvider>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="apply" options={{ title: "Apply to Job" }} />
          <Stack.Screen name="user-demo" options={{ title: "User Demo" }} />
        </Stack>
        <Toast />
      </JobActionsProvider>
    </QueryClientProvider>
  );
}
