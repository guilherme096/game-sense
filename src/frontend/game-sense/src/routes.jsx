import Home from "./routes/Home";
import Template from "./routes/PageTemplate";
import LeaguePageBase from "./routes/LeaguePageBase";
import Game from "./routes/Game";
import Login from "./routes/Login";
import Register from "./routes/Register"; 

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
<<<<<<< HEAD
=======

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  }
>>>>>>> 85ba0d401cb040475b1758815725a79c402c881f
];
