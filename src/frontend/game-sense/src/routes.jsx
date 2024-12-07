import Home from "./routes/Home";
import Template from "./routes/PageTemplate";
import LeaguePageBase from "./routes/LeaguePageBase";
import PlayerPageBase from "./routes/PlayerPageBase";
import Game from "./routes/Game";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Profile from "./routes/Profile";
import Club from "./routes/Club";
import { Helmet } from 'react-helmet';

export const routesList = [
    {
        path: "/home",
        element: (
          <>
            <Helmet>
              <title>GameSense - Home</title>
            </Helmet>
            <Home />
          </>
        ),
    },

    {
        path: "/template",
        element: (
          <>
            <Helmet>
              <title>GameSense - Template</title>
            </Helmet>
            <Template />
          </>
        ),
    },

    {
        path: "/leaguePage",
        element: (
          <>
            <Helmet>
              <title>GameSense - League</title>
            </Helmet>
            <LeaguePageBase />
          </>
        ),
    },

    {
        path: "/game/:id",
        element: (
          <>
            <Helmet>
              <title>GameSense - Game</title>
            </Helmet>
            <Game />
          </>
        ),
    },

    {
        path: "/playerPage",
        element: (
          <>
            <Helmet>
              <title>GameSense - Player</title>
            </Helmet>
            <PlayerPageBase />
          </>
        ),
    },

    {
        path: "/",
        element: (
          <>
            <Helmet>
              <title>GameSense - Login</title>
            </Helmet>
            <Login />
          </>
        ),
    },

    {
        path: "/register",
        element: (
          <>
            <Helmet>
              <title>GameSense - Register</title>
            </Helmet>
            <Register />
          </>
        ),
    },

    {
        path: "/profile",
        element: (
          <>
            <Helmet>
              <title>GameSense - Profile</title>
            </Helmet>
            <Profile />
          </>
        ),
    },

    {
        path: "/club",
        element: (
          <>
            <Helmet>
              <title>GameSense - Club</title>
            </Helmet>
            <Club />
          </>
        ),
    },
];
