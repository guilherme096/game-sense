import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { routesList } from "./routes.jsx";
import {QueryClient, QueryClientProvider} from "react-query";

const router = createBrowserRouter(routesList);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />,
    </QueryClientProvider>
);
