import Home from "./routes/Home";
import Template from "./routes/PageTemplate";
import LeaguePageBase from "./routes/LeaguePageBase";
import Game from "./routes/Game";

export const routesList = [
  {
    path: "/",
    element: <Game />,
  },

  {
    path: "/template",
    element: <Template />,
  },

  {
    path: "/leaguePage",
    element: <LeaguePageBase />,
  },

  {
    path: "/game",
    element: <Game />,
  },
];
