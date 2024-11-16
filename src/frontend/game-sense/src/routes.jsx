import Home from "./routes/Home";
import Template from "./routes/PageTemplate";
import LeaguePageBase from "./routes/LeaguePageBase";
import PlayerPageBase from "./routes/PlayerPageBase";
import Game from "./routes/Game";
import Login from "./routes/Login";
import Register from "./routes/Register"; 


export const routesList = [
  {
    path: "/",
    element: <Home />, 
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
    
  {
    path: "/playerPage",
    element: <PlayerPageBase />,
  },
  
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />
  }
];
