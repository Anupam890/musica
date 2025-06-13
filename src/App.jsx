import React from "react";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import MusicLayout from "./pages/music/MusicLayout";
import Search from "./pages/music/components/Search";
import Register from "./pages/auth/Register";
import Recent from "./pages/music/components/Recent";
import Favorites from "./pages/music/components/Favorites";
import Explore from "./pages/music/components/Explore";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "music",
      element: <MusicLayout />,
      children: [
        {
          path: "explore",
          index: true,
          element: <Explore />,
        },
        {
          path: "search/:query",
          element: <Search />,
        },
        {
          path: "search",
          element: <Search />,
        },
        {
          path: "recent",
          element: <Recent />,
        },
        {
          path: "favorites",
          element: <Favorites />,
        },
      ],
    },
    {
      path:"/sign-up",
      element:<Register/>
    }
  ]);
  return <RouterProvider router={routes} />;
};

export default App;
