import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { routesList } from "./routes.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from "react-auth-kit";
import createStore from 'react-auth-kit/createStore';
import { ToastContainer } from "react-toastify"


const router = createBrowserRouter(routesList);
const queryClient = new QueryClient();

const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

ReactDOM.createRoot(document.getElementById("root")).render(

  <AuthProvider store={store}>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
          }}
        />
      </QueryClientProvider>
    </React.StrictMode>
  </AuthProvider>
);