import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { routesList } from "./routes.jsx";
<<<<<<< HEAD
import { QueryClient, QueryClientProvider } from "react-query";
=======
import {QueryClient, QueryClientProvider} from "react-query";
>>>>>>> 85ba0d401cb040475b1758815725a79c402c881f

const router = createBrowserRouter(routesList);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
<<<<<<< HEAD
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />,
  </QueryClientProvider>,
=======
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />,
    </QueryClientProvider>
>>>>>>> 85ba0d401cb040475b1758815725a79c402c881f
);
