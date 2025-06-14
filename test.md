import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MusicLayout from "./pages/music/MusicLayout";
import Search from "./pages/music/components/Search";
import Register from "./pages/auth/Register";
import Recent from "./pages/music/components/Recent";
import Favorites from "./pages/music/components/Favorites";
import Explore from "./pages/music/components/Explore";
import Login from "./pages/auth/Login";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./pages/protected/ProtectedRoute";

const App = () => {
useEffect(() => {
if (window.location.hash.includes("access_token")) {
const cleanUrl = window.location.origin + window.location.pathname;
window.history.replaceState({}, document.title, cleanUrl);
}
}, []);

const routes = createBrowserRouter([
{
element: <ProtectedRoute />,
children: [
{
path: "/music",
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
],
},
{
path: "/sign-up",
element: <Register />,
},
{
path: "/login",
element: <Login />,
},
]);

return (
<>
<RouterProvider router={routes} />
<Toaster
position="top-right"
reverseOrder={false}
toastOptions={{
className: "",
duration: 3000,
}}
/>
</>
);
};

export default App;
