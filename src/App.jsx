import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import ErrorFallback from "./ui/ErrorFallback";

import { DarkModeProvider } from "./context/DarkModeContext";
import GlobalStyles from "./styles/GlobalStyles";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import Checkin from "./pages/Checkin";
import Cabins from "./pages/Cabins";
import NewUsers from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      // staleTime: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace("/")}
      >
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      </ErrorBoundary>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/bookings", element: <Bookings /> },
      { path: "/bookings/:bookingId", element: <Booking /> },
      { path: "/checkin/:bookingId", element: <Checkin /> },
      { path: "/cabins", element: <Cabins /> },
      { path: "/users", element: <NewUsers /> },
      { path: "/settings", element: <Settings /> },
      { path: "/account", element: <Account /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "*", element: <PageNotFound /> },
]);

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
        <GlobalStyles />
        <RouterProvider router={router} />

        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
