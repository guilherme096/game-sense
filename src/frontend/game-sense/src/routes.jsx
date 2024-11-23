import Home from "./routes/Home";
import Template from "./routes/PageTemplate";
import LeaguePageBase from "./routes/LeaguePageBase";
import PlayerPageBase from "./routes/PlayerPageBase";
import Game from "./routes/Game";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Profile from "./routes/Profile";
import Club from "./routes/Club";

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
        path: "/game/:id",
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
        element: <Register />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "/club",
        element: <Club />,
    },
];
