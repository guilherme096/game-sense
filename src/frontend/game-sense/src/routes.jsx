import Home from "./routes/Home";
import Template from "./routes/PageTemplate";
import LeaguePageBase from "./routes/LeaguePageBase";

export const routesList = [
  {
    path: "/",
    element: <Home />, 

    path: "/template",
    element: <Template />,

    path: "/leaguePage",
    element: <LeaguePageBase />,

  },
];  
