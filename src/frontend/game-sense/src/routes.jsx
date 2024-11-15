import Home from "./routes/Home";
import Template from "./routes/PageTemplate";
import LeaguePageBase from "./routes/LeaguePageBase";
import PlayerPageBase from "./routes/PlayerPageBase";
import Game from "./routes/Game";


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
  }
];
