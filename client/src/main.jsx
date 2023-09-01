import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
// import Post from "./pages/Post";
import Home from "./Pages/Home";
import Forgot from "./pages/login/Forgot";
import Penerima from "./pages/penerima/Penerima";
export const pages = [
  {
    path: "/login",
    element: <Login />,
    title: "LOGIN",
  },
  {
    path: "/forgout",
    element: <Forgot />,
  },
  {
    path: "/register",
    element: <Register />,
    title: "Register",
  },
  {
    children: [
      {
        path: "/",
        element: <Home />,
        title: "HOME",
      },
      {
        path: "/penerima",
        element: <Penerima />,
        title: "HOME",
      },
    ],
  },
];

const router = createBrowserRouter([
  {
    element: <App />,
    children: pages,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
