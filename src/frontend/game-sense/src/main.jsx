import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { routesList } from "./routes.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "react-auth-kit"; 

const router = createBrowserRouter(routesList);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <AuthProvider
  //   authType="cookie" 
  //   authName="jwt" 
  //   cookieDomain={window.location.hostname} 
  //   cookieSecure={false} // for now
  //   cookiePath="/"
  // >
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true, // Enables the feature
        }}
      />
    </QueryClientProvider>
  // </AuthProvider>
);
