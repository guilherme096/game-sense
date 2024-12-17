import Home from "./routes/Home";
import LeaguePageBase from "./routes/LeaguePageBase";
import PlayerPageBase from "./routes/PlayerPageBase";
import Game from "./routes/Game";
import GamesPage from "./routes/GamesPage";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Profile from "./routes/Profile";
import Club from "./routes/Club";
import { RequireAuth } from "./routes/RequireAuth";
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
        path: "/gamesPage",
        element: (
          <>
            <Helmet>
              <title>GameSense - Template</title>
            </Helmet>
            <GamesPage />
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
        path: "/live/:id",
        element: (
          <>
            <Helmet>
              <title>GameSense - Game</title>
            </Helmet>
            <Game isLive={true} />
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
          <Game isLive={false} />
        </>
      ),
    },

    {
        path: "/player/:id",
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
          <RequireAuth>
          <>
            <Helmet>
              <title>GameSense - Profile</title>
            </Helmet>
            <Profile />
          </>
          </RequireAuth>
        ),
    },

    {
        path: "/club/:id",
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
