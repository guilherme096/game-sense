import Home from "./routes/Home";
import Template from "./routes/PageTemplate";
import Game from "./routes/Game";

export const routesList = [
  {
    path: "/",
    element: <Game />,
  },
  {
    path: "/game",
    element: <Game />,
  },
];
