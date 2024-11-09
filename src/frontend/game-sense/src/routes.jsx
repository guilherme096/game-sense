import Home from "./routes/Home";
import Template from "./routes/PageTemplate";

export const routesList = [
  {
    path: "/",
    element: <Home />, 

    path: "/template",
    element: <Template />,
  },
];  
